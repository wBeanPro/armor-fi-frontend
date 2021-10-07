import { BalanceManagerEvents } from './balanceManagerEvents'
import { countDecimals } from '../../helpers'
import ReferralSystem from '../../classes/referralSystem'
import config from '../../config'
import { RewardManagerEvents } from './rewardManagerEvents'

class BalanceManagerContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(BalanceManagerEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case BalanceManagerEvents.GetBalance:
        await this.getBalance(payload)
        break
      case BalanceManagerEvents.Deposit:
        await this.deposit(payload)
        break
      case BalanceManagerEvents.Withdraw:
        await this.withdraw(payload)
        break
      case BalanceManagerEvents.GetLastUpdateTime:
        await this.getLastUpdateTime(payload)
        break
      case BalanceManagerEvents.GetPricePerSecond:
        await this.getPricePerSecond(payload)
        break
      case BalanceManagerEvents.GetReward:
        await this.getReward(payload)
        break
    }
  }

  async getReward(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetReward(account)
      .then((data) => {
        this.service.emit(BalanceManagerEvents.RewardCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetReward(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
        )

        let amount = await this._handleGetBalance(account).catch((err) =>
          this.service.emitError(err)
        )

        await contract.methods
          .withdraw(web3.utils.toWei(amount, 'ether'))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(
              await this.service.getGasPrice(),
              'gwei'
            ),
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
          .then((response) => {
            resolve(response)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async getBalance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetBalance(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.setStore({ BalanceManager_Balance: response })
    this.service.emit(BalanceManagerEvents.BalanceReturned)
    return response
  }

  async _handleGetBalance(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
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

  async getPricePerSecond(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetPricePerSecond(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.setStore({ BalanceManager_PricePerSecond: response })
    this.service.emit(BalanceManagerEvents.PricePerSecondReturned)
    return response
  }

  async _handleGetPricePerSecond(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
        )

        let balance = await contract.methods
          .perSecondPrice(account.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getLastUpdateTime(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    await this._handleGetLastUpdateTime(account)
      .then((data) => {
        this.service.setStore({ BalanceManager_LastUpdateTime: data })
        this.service.emit(BalanceManagerEvents.LastUpdateTimeReturned)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetLastUpdateTime(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
        )

        let balance = await contract.methods
          .balances(account.address)
          .call({ from: account.address })

        resolve(balance.lastTime)
      } catch (e) {
        reject(e)
      }
    })
  }

  async deposit(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    await this._handleDeposit(account, amount)
      .then((data) => {
        if (typeof data === 'object' && data !== null) {
          this.service.emit(BalanceManagerEvents.DepositCompleted, data)
        }
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleDeposit(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
        )
        const self = this
        let decimals = countDecimals(amount)
        let weiValue = 0
        if (decimals > 18) {
          weiValue = web3.utils.toWei(parseFloat(amount).toFixed(18), 'ether')
        } else {
          weiValue = web3.utils.toWei(amount, 'ether')
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

        await contract.methods
          .deposit(referrer)
          .send({
            from: account.address,
            value: weiValue,
            gasPrice: web3.utils.toWei(
              await this.service.getGasPrice(),
              'gwei'
            ),
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
            self.getBalance()
            resolve(deposit)
          })
      } catch (e) {
        return reject(e)
      }
    })
  }

  async withdraw(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    await this._handleWithdraw(account, amount)
      .then((data) =>
        this.service.emit(BalanceManagerEvents.WithdrawCompleted, data)
      )
      .catch((err) => this.service.emitError(err))
  }

  async _handleWithdraw(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const self = this
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
        )

        let response = await contract.methods
          .withdraw(web3.utils.toWei(amount, 'ether'))
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(
              await this.service.getGasPrice(),
              'gwei'
            ),
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
          .then((response) => {
            self.getBalance()
            resolve(response)
          })
      } catch (e) {
        return reject(e)
      }
    })
  }
}

export default BalanceManagerContract
