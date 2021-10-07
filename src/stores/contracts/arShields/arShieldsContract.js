import { ArShieldsEvents } from './arShieldsEvents'
import { fromWei } from 'web3-utils'
import { BaseFarmEvents } from '../baseFarming/baseFarmEvents'
import * as BN from 'bn.js'
import { BaseFarmTokenEvents } from '../baseFarming/baseFarmTokenEvents'
import ReferralSystem from '../../../classes/referralSystem'
import Erc20Contract from '../erc20/erc20Contract'
import cnf from '../../../config/cnf'

class ArShieldsContract {
  constructor(
    service,
    prefix,
    shieldAddress,
    underlyingTokenAddress,
    armorTokenAddress
  ) {
    this.service = service
    this.prefix = prefix
    this.shieldAddress = shieldAddress

    this.underlyingTokenAddress = underlyingTokenAddress
    this.underlyingTokenContract = new Erc20Contract(
      service,
      `${prefix}.UnderlyingToken`,
      this.underlyingTokenAddress
    )

    this.armorTokenAddress = armorTokenAddress
    this.armorTokenContract = new Erc20Contract(
      service,
      `${prefix}.ArmorToken`,
      this.armorTokenAddress
    )
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(ArShieldsEvents(this.prefix), payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case `${this.prefix}.Mint`:
        await this.mint(payload)
        break
      case `${this.prefix}.Redeem`:
        await this.redeem(payload)
        break
      case `${this.prefix}.ClaimFunds`:
        await this.claim(payload)
        break
      case `${this.prefix}.GetFindFeePct`:
        await this.getFindFeePct(payload)
        break
      case `${this.prefix}.GetShieldBalance`:
        await this.getShieldBalance(payload)
        break
      case `${this.prefix}.GetUnderlyingTokenBalance`:
        await this.getUnderlyingTokenBalance(payload)
        break
      case `${this.prefix}.GetLiquidatedAmounts`:
        await this.getLiquidatedAmounts(payload)
        break
      case `${this.prefix}.GetPayAmounts`:
        await this.getPayAmounts(payload)
        break
      case `${this.prefix}.GetArTokenValueOfPToken`:
        await this.getArTokenValueOfPToken(payload)
        break
      case `${this.prefix}.GetPTokenValueOfArToken`:
        await this.getPTokenValueOfArToken(payload)
        break
    }
  }

  async mint(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    let amountInWei = web3.utils.toWei(amount.toString(), 'ether')
    let balance = await this.underlyingTokenContract
      .getBalance({
        content: {
          address: account.address,
        },
      })
      .catch((err) => console.error(err))
    if (amountInWei > balance) {
      amountInWei = balance
    }

    let success = false
    await this.underlyingTokenContract
      .approve({
        content: {
          toAddress: this.shieldAddress,
          amount: amountInWei,
        },
      })
      .then((resp) => {
        this.service.emit(
          ArShieldsEvents(this.prefix).DepositApproveCompleted,
          resp
        )
        success = true
      })
      .catch((err) => {
        this.service.emitError(err)
        return false
      })

    if (!success) {
      return false
    }

    let referralSystem = new ReferralSystem(this.service.config)
    let referrer = '0x0000000000000000000000000000000000000000'
    await referralSystem
      .getReferrer(account.address)
      .then((res) => {
        referrer = res
      })
      .catch((err) => {
        console.error(err)
      })

    let response = await this._mint(account, amountInWei, referrer).catch(
      (err) => {
        this.service.emitError(err)
        return false
      }
    )

    this.service.emit(ArShieldsEvents(this.prefix).MintCompleted, response)
    return response
  }
  async _mint(account, amount, referrer) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShields.abi,
          this.shieldAddress
        )
        const self = this

        //let amountInWei = web3.utils.toWei(amount.toString(), 'ether')
        await contract.methods
          .mint(amount, referrer)
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
          })
          .once('transactionHash', (hash) =>
            this.service.handleTransactionHash(hash)
          )
          .once('receipt', (receipt) => this.service.handleReceipt(receipt))
          .on('confirmation', (confirmationNumber, receipt) =>
            this.service.handleConfirmation(confirmationNumber, receipt)
          )
          .on('error', (error) => {
            this.service.handleError(error)
            reject(error)
          })
          .then((data) => {
            resolve(data)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async redeem(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    let amountInWei = web3.utils.toWei(amount.toString(), 'ether')
    let balance = await this.armorTokenContract
      .getBalance({
        content: {
          address: account.address,
        },
      })
      .catch((err) => console.error(err))
    if (amountInWei > balance) {
      amountInWei = balance
    }

    let success = false
    await this.armorTokenContract
      .approve({
        content: {
          toAddress: this.shieldAddress,
          amount: amountInWei,
        },
      })
      .then((resp) => {
        this.service.emit(
          ArShieldsEvents(this.prefix).WithdrawApproveCompleted,
          resp
        )
        success = true
      })
      .catch((err) => {
        this.service.emitError(err)
        return false
      })

    let referralSystem = new ReferralSystem(this.service.config)
    let referrer = '0x0000000000000000000000000000000000000000'
    await referralSystem
      .getReferrer(account.address)
      .then((res) => {
        referrer = res
      })
      .catch((err) => {
        console.error(err)
      })

    let response = await this._redeem(account, amountInWei, referrer).catch(
      (err) => {
        this.service.emitError(err)
        return false
      }
    )

    this.service.emit(ArShieldsEvents(this.prefix).RedeemCompleted, response)
    return response
  }
  async _redeem(account, amount, referrer) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShields.abi,
          this.shieldAddress
        )
        const self = this

        await contract.methods
          .redeem(amount, referrer)
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
          })
          .once('transactionHash', (hash) =>
            this.service.handleTransactionHash(hash)
          )
          .once('receipt', (receipt) => this.service.handleReceipt(receipt))
          .on('confirmation', (confirmationNumber, receipt) =>
            this.service.handleConfirmation(confirmationNumber, receipt)
          )
          .on('error', (error) => {
            this.service.handleError(error)
            reject(error)
          })
          .then((data) => {
            resolve(data)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async claim(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }

    // await this.tokenContract
    //   .approve({
    //     content: {
    //       toAddress: this.farmAddress,
    //       amount: userAmount,
    //     },
    //   })
    //   .catch((err) => {
    //     this.service.emitError(err)
    //     return false
    //   })

    let response = await this._claim(account).catch((err) => {
      this.service.emitError(err)
      return false
    })

    this.service.emit(
      ArShieldsEvents(this.prefix).ClaimFundsCompleted,
      response
    )
    return response
  }
  async _claim(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShields.abi,
          this.shieldAddress
        )
        const self = this

        await contract.methods
          .claim()
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
          })
          .once('transactionHash', (hash) =>
            this.service.handleTransactionHash(hash)
          )
          .once('receipt', (receipt) => this.service.handleReceipt(receipt))
          .on('confirmation', (confirmationNumber, receipt) =>
            this.service.handleConfirmation(confirmationNumber, receipt)
          )
          .on('error', (error) => {
            this.service.handleError(error)
            reject(error)
          })
          .then((data) => {
            resolve(data)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async getShieldBalance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }

    let response = await this._getShieldBalance(account).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    if (response == null) {
      response = 0
    }

    this.service.setStore({
      [`${this.prefix}_ShieldBalance`]: response,
    })
    this.service.emit(
      ArShieldsEvents(this.prefix).ShieldBalanceReturned,
      response
    )

    return response
  }
  async _getShieldBalance(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        let balance = await this.armorTokenContract.getBalance(account.address)
        resolve(fromWei(balance, 'ether'))
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getUnderlyingTokenBalance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }

    let address = this.underlyingTokenAddress
    if (payload != null && payload.content != null && payload.content.address) {
      address = payload.content.address
    }

    let response = await this._getUnderlyingTokenBalance(
      account,
      address
    ).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({
      [`${this.prefix}_UnderlyingTokenBalance`]: {
        tokenAddress: address,
        tokenBalance: response,
      },
    })
    this.service.emit(
      ArShieldsEvents(this.prefix).UnderlyingTokenBalanceReturned,
      {
        tokenAddress: address,
        tokenBalance: response,
      }
    )

    return response
  }
  async _getUnderlyingTokenBalance(account, address) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        let balance = await this.underlyingTokenContract.getBalance({
          content: { address: address },
        })
        resolve(fromWei(balance, 'ether'))
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getFindFeePct(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }
    const { amount } = payload

    let response = await this._getFindFeePct(account, amount).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({
      [`${this.prefix}_FindFeePct`]: response,
    })
    this.service.emit(ArShieldsEvents(this.prefix).FindFeePctReturned, response)

    return response
  }
  async _getFindFeePct(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShields.abi,
          this.shieldAddress
        )

        let balance = await contract.methods
          .findFeePct()
          .call({ from: account.address })

        resolve(balance)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getLiquidatedAmounts(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }
    const { coverId } = payload

    let response = await this._getLiquidatedAmounts(account, coverId).catch(
      (err) => {
        this.service.emitError(err)
        return '0'
      }
    )

    this.service.setStore({
      [`${this.prefix}_LiquidatedAmounts`]: response,
    })
    this.service.emit(
      ArShieldsEvents(this.prefix).LiquidatedAmountsReturned,
      response
    )

    return response
  }
  async _getLiquidatedAmounts(account, coverId) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShields.abi,
          this.shieldAddress
        )

        let balance = await contract.methods
          .liqAmts(coverId)
          .call({ from: account.address })

        resolve(balance)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getPayAmounts(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }
    const { ethIn } = payload

    let response = await this._getPayAmounts(account, ethIn).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({
      [`${this.prefix}_PayAmounts`]: response,
    })
    this.service.emit(ArShieldsEvents(this.prefix).PayAmountsReturned, response)

    return response
  }
  async _getPayAmounts(account, ethIn) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShields.abi,
          this.shieldAddress
        )

        let balance = await contract.methods
          .payAmts(ethIn)
          .call({ from: account.address })

        resolve(balance)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getArTokenValueOfPToken(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }
    const { pTokenAmount } = payload.content

    let response = await this._getArTokenValueOfPToken(
      account,
      pTokenAmount
    ).catch((err) => {
      //this.service.emitError(err)
      return '0'
    })

    this.service.setStore({
      [`${this.prefix}_ArTokenValue`]: response,
    })
    this.service.emit(
      ArShieldsEvents(this.prefix).ArTokenValueOfPTokenReturned,
      response
    )

    return response
  }
  async _getArTokenValueOfPToken(account, pTokenAmount) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShields.abi,
          this.shieldAddress
        )

        let balance = await contract.methods
          .arValue(pTokenAmount)
          .call({ from: account.address })

        resolve(fromWei(balance, 'ether'))
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getPTokenValueOfArToken(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }
    const { arTokenAmount } = payload.content

    let response = await this._getPTokenValueOfArToken(
      account,
      arTokenAmount
    ).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({
      [`${this.prefix}_PTokenValue`]: response,
    })
    this.service.emit(
      ArShieldsEvents(this.prefix).PTokenValueOfArTokenReturned,
      response
    )

    return response
  }
  async _getPTokenValueOfArToken(account, arTokenAmount) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShields.abi,
          this.shieldAddress
        )

        let balance = await contract.methods
          .pValue(arTokenAmount)
          .call({ from: account.address })

        resolve(fromWei(balance, 'ether'))
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
}

export default ArShieldsContract
