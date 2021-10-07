import { IbcoEvents } from './ibcoEvents'

class IbcoContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(IbcoEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case IbcoEvents.GetTransactions:
        await this.getTransactions(payload)
        break
      case IbcoEvents.GetTotalProvided:
        await this.getTotalProvided(payload)
        break
      case IbcoEvents.GetUserProvided:
        await this.getUserProvided(payload)
        break
      case IbcoEvents.GetTotalDistributed:
        await this.getTotalDistributed(payload)
        break
      case IbcoEvents.GetMinimalProvideAmount:
        await this.getMinimalProvideAmount(payload)
        break
      case IbcoEvents.BuyArmor:
        await this.buyArmor(payload)
        break
      case IbcoEvents.GetStartPrice:
        await this.getStartPrice(payload)
        break
    }
  }

  async getTransactions(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetTransactions()
      .then((data) => {
        this.service.setStore({ Ibco_Transactions: data })
        this.service.emit(IbcoEvents.TransactionsReturned)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetTransactions() {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.ibco.abi,
          this.service.config.ibco.address
        )
        let transactions = []

        await contract
          .getPastEvents('Received', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              transactions.push({
                amount: web3.utils.fromWei(event.returnValues.amount, 'ether'),
                address: event.returnValues.account,
                transactionId: event.transactionHash,
              })
            })
            resolve(transactions)
          })
          .catch((err) => reject(err))
      } catch (err) {
        reject(err)
      }
    })
  }

  async getUserProvided(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetUserProvided(account)
      .then((data) => {
        this.service.setStore({ Ibco_UserProvided: data })
        this.service.emit(IbcoEvents.UserProvidedReturned)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetUserProvided(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.ibco.abi,
          this.service.config.ibco.address
        )

        let balance = await contract.methods
          .provided(account.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        return reject(e)
      }
    })
  }

  async getTotalProvided(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetTotalProvided(account)
      .then((data) => {
        this.service.setStore({ Ibco_TotalProvided: data })
        this.service.emit(IbcoEvents.TotalProvidedReturned)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetTotalProvided(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.ibco.abi,
          this.service.config.ibco.address
        )

        let balance = await contract.methods
          .totalProvided()
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        return reject(e)
      }
    })
  }

  async getMinimalProvideAmount(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetMinimalProvideAmount(account)
      .then((data) => {
        this.service.setStore({ Ibco_MinimalProvideAmount: data })
        this.service.emit(IbcoEvents.MinimalProvideAmountReturned)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetMinimalProvideAmount(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.ibco.abi,
          this.service.config.ibco.address
        )

        let balance = await contract.methods
          .MINIMAL_PROVIDE_AMOUNT()
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        return reject(e)
      }
    })
  }

  async getTotalDistributed(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetTotalDistributed(account)
      .then((data) => {
        this.service.setStore({ Ibco_TotalDistributed: data })
        this.service.emit(IbcoEvents.TotalDistributedReturned)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetTotalDistributed(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.ibco.abi,
          this.service.config.ibco.address
        )

        let balance = await contract.methods
          .TOTAL_DISTRIBUTE_AMOUNT()
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        return reject(e)
      }
    })
  }

  async getStartPrice(payload) {
    try {
      const account = this.service.getAccount()
      if (!account || !account.address) {
        return false
      }
      let _totalDistributed = 0
      let _minimal = 0

      await this._handleGetTotalDistributed(account)
        .then((data) => {
          _totalDistributed = data
        })
        .catch((err) => this.service.emitError(err))

      await this._handleGetMinimalProvideAmount(account)
        .then((data) => {
          _minimal = data
        })
        .catch((err) => this.service.emitError(err))

      const _startingPrice = ((_minimal / _totalDistributed) * 512.37).toFixed(
        4
      )

      this.service.setStore({ Ibco_ArmorStartPrice: _startingPrice })
      this.service.emit(IbcoEvents.StartPriceReturned)
    } catch (e) {
      this.service.emitError(e)
    }
  }

  async buyArmor(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    await this._handleBuyArmor(account, amount)
      .then((data) => {
        if (typeof data === 'object' && data !== null) {
          this.service.emit(IbcoEvents.BuyArmorCompleted, data)
        }
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleBuyArmor(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const self = this

        await web3.eth
          .sendTransaction({
            from: account.address,
            to: this.service.config.ibco.address,
            value: web3.utils.toWei(amount, 'ether'),
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
          .then((deposit) => {
            self.getTotalProvided()
            self.getTotalDistributed()
            self.getTransactions()
            resolve(deposit)
          })
      } catch (e) {
        return reject(e)
      }
    })
  }
}

export default IbcoContract
