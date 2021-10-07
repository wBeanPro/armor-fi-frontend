import { RewardManagerEvents } from './rewardManagerEvents'
import * as BN from 'bn.js'

class RewardManagerContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(RewardManagerEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case RewardManagerEvents.GetBalance:
        await this.getBalance(payload)
        break
      case RewardManagerEvents.GetRewardsAddedAfterBlock:
        await this.getRewardsAddedAfterBlock(payload)
        break
      case RewardManagerEvents.Withdraw:
        await this.withdraw(payload)
        break
      case RewardManagerEvents.GetReward:
        await this.getReward(payload)
        break
      default:
        break
    }
  }

  async getBalance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    await this._handleGetBalance(account)
      .then((data) => {
        this.service.setStore({ RewardManager_Balance: data })
        this.service.emit(RewardManagerEvents.BalanceReturned)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetBalance(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.rewardManager.abi,
          this.service.config.rewardManager.address
        )

        let balance = await contract.methods
          .earned(account.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getRewardsAddedAfterBlock(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { block } = payload.content

    let response = await this._handleGetRewardsAddedAfterBlock(block).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )
    this.service.setStore({ RewardManager_RewardsAddedAfterBlock: response })
    this.service.emit(RewardManagerEvents.RewardsAddedAfterBlockReturned)

    return response
  }

  async _handleGetRewardsAddedAfterBlock(block) {
    return new Promise(async (resolve, reject) => {
      const web3 = await this.service.getWeb3()
      const contract = this.service.makeContract(
        web3,
        this.service.config.rewardManager.abi,
        this.service.config.rewardManager.address
      )
      let rewards = []

      await contract
        .getPastEvents('RewardAdded', {
          fromBlock: block,
        })
        .then((events) => {
          events.forEach((event) => {
            rewards.push({
              totalSupply: event.returnValues.totalSupply,
              reward: event.returnValues.reward,
            })
          })
          resolve(rewards)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  async withdraw(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    await this._handleWithdraw(account, amount)
      .then((data) => {
        this.service.emit(RewardManagerEvents.WithdrawCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleWithdraw(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.rewardManager.abi,
          this.service.config.rewardManager.address
        )

        await contract.methods
          .withdraw(
            account.address,
            amount,
            '0x0000000000000000000000000000000000000000'
          )
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

  async getReward(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetReward(account)
      .then((data) => {
        this.service.emit(RewardManagerEvents.RewardCompleted, data)
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
          this.service.config.rewardManager.abi,
          this.service.config.rewardManager.address
        )

        await contract.methods
          .getReward(account.address)
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

export default RewardManagerContract
