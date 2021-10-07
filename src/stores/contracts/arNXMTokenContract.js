import { ArNXMTokenEvents } from './arNXMTokenEvents'
import { ArNXMVaultEvents } from './arNXMVaultEvents'
import { WNXMEvents } from './wNXMEvents'

class ArNXMTokenContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(ArNXMTokenEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case ArNXMTokenEvents.GetBalance:
        await this.getBalance(payload)
        break
      case ArNXMTokenEvents.Approve:
        await this.approve(payload)
        break
      case ArNXMTokenEvents.GetAllowance:
        await this.getAllowance(payload)
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
    this.service.setStore({ ArNXMToken_Balance: data })
    this.service.emit(ArNXMTokenEvents.BalanceReturned)
    return data
  }

  async _handleGetBalance(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMToken.abi,
          this.service.config.arNXMToken.address
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

  async approve(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { amount, toAddress } = payload.content

    let response = await this._handleApprove(account, amount, toAddress).catch(
      (err) => this.service.emitError(err)
    )

    this.service.emit(ArNXMTokenEvents.ApproveCompleted, response)
    return response
  }

  async _handleApprove(account, amount, toAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMToken.abi,
          this.service.config.arNXMToken.address
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

  async getAllowance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let data = await this._handleGetAllowance(account).catch((err) => {
      this.service.emitError(err)
      return false
    })

    this.service.setStore({ ArNXMToken_Allowance: data })
    this.service.emit(ArNXMTokenEvents.AllowanceReturned)
    return data
  }

  async _handleGetAllowance(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMToken.abi,
          this.service.config.arNXMToken.address
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

export default ArNXMTokenContract
