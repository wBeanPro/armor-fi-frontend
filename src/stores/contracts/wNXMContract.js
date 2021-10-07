import { WNXMEvents } from './wNXMEvents'
import { ArNFTEvents } from './arNFTEvents'
import { ArNXMVaultEvents } from './arNXMVaultEvents'
import { NXMEvents } from './NXMEvents'
import { ArNXMTokenEvents } from './arNXMTokenEvents'

class WNXMContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(WNXMEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case WNXMEvents.GetBalance:
        await this.getBalance(payload)
        break
      case WNXMEvents.Approve:
        await this.approve(payload)
        break
      case WNXMEvents.Allowance:
        await this.getAllowance(payload)
        break
      case WNXMEvents.Wrap:
        await this.wrap(payload)
        break
    }
  }

  async getBalance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let data = await this._handleGetBalance(account).catch((err) => {
      this.service.emitError(err)
      return 0
    })
    this.service.setStore({ wNXM_Balance: data })
    this.service.emit(WNXMEvents.BalanceReturned)
    return data
  }

  async _handleGetBalance(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.wNXM.abi,
          this.service.config.wNXM.address
        )

        let balance = await contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }

  async isApproved(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId, toAddress } = payload.content

    let response = await this._handleGetApproved(account, nftId).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )

    if (response.toLowerCase() === toAddress.toLowerCase()) {
      return true
    }

    return false
  }

  async getApproved(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId } = payload.content

    let response = await this._handleGetApproved(account, nftId).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )
    this.service.setStore({ arNFTBalance: response })
    this.service.emit(ArNFTEvents.GetApprovedReturned)

    return response
  }

  async _handleGetApproved(account, nftId) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.wNXM.abi,
          this.service.config.wNXM.address
        )

        let operator = await contract.methods
          .getApproved(nftId)
          .call({ from: account.address })

        resolve(operator)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async approve(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { amount, toAddress } = payload.content

    let response = await this._handleApprove(account, amount, toAddress).catch(
      (err) => {
        this.service.emitError(err)
        throw err
      }
    )

    this.service.emit(WNXMEvents.ApproveCompleted, response)
    return response
  }

  async _handleApprove(account, amount, toAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.wNXM.abi,
          this.service.config.wNXM.address
        )

        await contract.methods
          .approve(toAddress, amount)
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
          .then((data) => resolve(data))
      } catch (e) {
        reject(e)
      }
    })
  }

  async wrap(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    let allowance = await this.service.contracts.NXM.getAllowance(
      account
    ).catch((err) => {
      this.service.emitError(err)
      throw err
    })

    if (parseInt(allowance) < parseInt(amount)) {
      await this.service.contracts.NXM.approve({
        content: {
          toAddress: this.service.config.wNXM.address,
          amount: web3.utils.toWei(amount),
        },
      })
    }

    this.service.emit(NXMEvents.ApproveCompleted, [])

    let response = await this._handleWrap(
      account,
      web3.utils.toWei(amount)
    ).catch((err) => {
      this.service.emitError(err)
      throw err
    })

    this.service.emit(WNXMEvents.WrapCompleted, response)
    return response
  }

  async _handleWrap(account, amount, toAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const self = this
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.wNXM.abi,
          this.service.config.wNXM.address
        )

        // let gasEstimate = await contract.methods.wrap(amount).estimateGas({
        //   from: account.address,
        //   gas: web3.utils.toWei(await this.service.getGasPrice(), 'gwei'),
        // })
        //
        // if (gasEstimate > this.service.maxGasLimit) {
        //   reject(this.service.maxGasLimitErrorMessage)
        //   return
        // }

        await contract.methods
          .wrap(amount)
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
            self.getAssetsUnderManagement()
            self.getAPY()
            self.getTotalDepositsAndWithdrawals()

            self.service.dispatchVaultEvents()
            resolve(data)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async getAllowance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let data = await this._handleGetAllowance(account).catch((err) => {
      this.service.emitError(err)
      return 0
    })
    this.service.setStore({ wNXM_Allowance: data })
    this.service.emit(WNXMEvents.AllowanceReturned)
    return data
  }

  async _handleGetAllowance(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.wNXM.abi,
          this.service.config.wNXM.address
        )

        let allowance = await contract.methods
          .allowance(account.address, this.service.config.arNXMVault.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(allowance, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default WNXMContract
