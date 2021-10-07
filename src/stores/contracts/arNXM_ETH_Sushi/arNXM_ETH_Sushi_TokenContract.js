import { ArNXM_ETH_Sushi_TokenEvents } from './arNXM_ETH_Sushi_TokenEvents'
import * as BN from 'bn.js'

class ArNXM_ETH_Sushi_TokenContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(ArNXM_ETH_Sushi_TokenEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case ArNXM_ETH_Sushi_TokenEvents.GetBalance:
        await this.getBalance(payload)
        break
      case ArNXM_ETH_Sushi_TokenEvents.GetTotalArmorStaked:
        await this.getTotalArmorStaked(payload)
        break
      case ArNXM_ETH_Sushi_TokenEvents.Approve:
        await this.approve(payload)
        break
    }
  }

  async getBalance(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetBalance(account).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({
      ArNXM_ETH_Sushi_Token_Balance: !response
        ? '0'
        : web3.utils.fromWei(response.toString(), 'ether'),
    })

    this.service.emit(ArNXM_ETH_Sushi_TokenEvents.BalanceReturned)

    return response
  }

  async _handleGetBalance(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXM_ETH_Sushi_Token.abi,
          this.service.config.arNXM_ETH_Sushi_Token.address
        )

        let balance = await contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })

        resolve(new BN(balance.toString()))
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getTotalArmorStaked(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetTotalArmorStaked(account).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )
    this.service.setStore({
      ArNXM_ETH_Sushi_Token_TotalArmorStaked: !response
        ? '0'
        : web3.utils.fromWei(response.toString(), 'ether'),
    })
    this.service.emit(ArNXM_ETH_Sushi_TokenEvents.TotalArmorStakedReturned)

    return response
  }

  async _handleGetTotalArmorStaked(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXM_ETH_Sushi_Token.abi,
          this.service.config.arNXM_ETH_Sushi_Token.address
        )

        let balance = await contract.methods
          .balanceOf(this.service.config.arNXM_ETH_Sushi_Farm.address)
          .call({ from: account.address })

        resolve(new BN(balance.toString()))
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

    let response = await this._handleApprove(
      account,
      amount,
      toAddress
    ).catch((err) => this.service.emitError(err))

    this.service.emit(ArNXM_ETH_Sushi_TokenEvents.ApproveCompleted, response)
    return response
  }

  async _handleApprove(account, amount, toAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXM_ETH_Sushi_Token.abi,
          this.service.config.arNXM_ETH_Sushi_Token.address
        )

        const allowance = await contract.methods
          .allowance(account.address, toAddress)
          .call({ from: account.address })

        if (new BN(amount).lt(new BN(allowance))) {
          return resolve()
        }

        const infiniteAmount = web3.utils
          .toBN(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
          )
          .toString()

        await contract.methods
          .approve(toAddress, infiniteAmount)
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
}

export default ArNXM_ETH_Sushi_TokenContract
