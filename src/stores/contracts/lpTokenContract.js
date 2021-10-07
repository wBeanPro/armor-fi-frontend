import { LpTokenEvents } from './lpTokenEvents'

class LpTokenContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(LpTokenEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case LpTokenEvents.GetBalance:
        await this.getBalance(payload)
        break
      case LpTokenEvents.GetTotalArmorStaked:
        await this.getTotalArmorStaked(payload)
        break
      case LpTokenEvents.Approve:
        await this.approve(payload)
        break
    }
  }

  async getBalance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetBalance(account).catch((err) => {
      this.service.emitError(err)
      return 0
    })
    this.service.setStore({ LpToken_Balance: response })
    this.service.emit(LpTokenEvents.BalanceReturned)

    return response
  }

  async _handleGetBalance(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpToken.abi,
          this.service.config.lpToken.address
        )

        let balance = await contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getTotalArmorStaked(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetTotalArmorStaked(account).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )
    this.service.setStore({ LpToken_TotalArmorStaked: response })
    this.service.emit(LpTokenEvents.TotalArmorStakedReturned)

    return response
  }

  async _handleGetTotalArmorStaked(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpToken.abi,
          this.service.config.lpToken.address
        )

        let balance = await contract.methods
          .balanceOf(this.service.config.lpFarm.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
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

    this.service.emit(LpTokenEvents.ApproveCompleted, response)
    return response
  }

  async _handleApprove(account, amount, toAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpToken.abi,
          this.service.config.lpToken.address
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
}

export default LpTokenContract
