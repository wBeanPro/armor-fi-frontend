import { ReferralRewardsEvents } from './referralRewardsEvents'
import moment from 'moment'
import { RewardManagerEvents } from './rewardManagerEvents'

class ReferralRewardsContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(ReferralRewardsEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case ReferralRewardsEvents.GetEarned:
        await this.getEarned(payload)
        break
      case ReferralRewardsEvents.GetReferredUsers:
        await this.getReferredUsers(payload)
        break
      case ReferralRewardsEvents.GetRewardsPaid:
        await this.getRewardsPaid(payload)
        break
      case ReferralRewardsEvents.GetWithdrawals:
        await this.getWithdrawals(payload)
        break
      case ReferralRewardsEvents.GetReward:
        await this.getReward(payload)
        break
    }
  }

  async getEarned(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetEarned(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.setStore({ ReferralRewards_Earned: response })
    this.service.emit(ReferralRewardsEvents.EarnedReturned)
    return response
  }

  async _handleGetEarned(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.referralRewards.abi,
          this.service.config.referralRewards.address
        )

        let earned = await contract.methods
          .earned(account.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(earned, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getReferredUsers(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetReferredUsers(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.setStore({ ReferralRewards_ReferredUsers: response })
    this.service.emit(ReferralRewardsEvents.ReferredUsersReturned)
    return response
  }

  async _handleGetReferredUsers(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
        )

        let referredUsers = []

        await contract
          .getPastEvents('ReferralAdded', {
            fromBlock: '11688996',
          })
          .then((events) => {
            events.forEach((event) => {
              let address = account.address.toLowerCase()

              if (
                event.returnValues.affiliate &&
                event.returnValues.referral &&
                event.returnValues.timestamp
              ) {
                if (
                  event.returnValues.affiliate.toLowerCase() ===
                  address.toLowerCase()
                ) {
                  if (
                    event.returnValues.referral !=
                    '0x0000000000000000000000000000000000000000'
                  ) {
                    if (
                      !referredUsers.find(
                        (r) => r.address == event.returnValues.referral
                      )
                    ) {
                      referredUsers.push({
                        address: event.returnValues.referral,
                        timestampRaw: event.returnValues.timestamp,
                        timestamp: moment(
                          event.returnValues.timestamp * 1000
                        ).format('MMM Do'),
                      })
                    }
                  }
                }
              }
            })
          })
          .catch((err) => reject(err))

        resolve(referredUsers.reverse())
      } catch (e) {
        reject(e)
      }
    })
  }

  async getRewardsPaid(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetRewardsPaid(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.setStore({ ReferralRewards_RewardsPaid: response })
    this.service.emit(ReferralRewardsEvents.RewardsPaidReturned)
    return response
  }

  async _handleGetRewardsPaid(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.referralRewards.abi,
          this.service.config.referralRewards.address
        )
        const balanceManagerContract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
        )

        let rewardsPaid = []

        await balanceManagerContract
          .getPastEvents('AffiliatePaid', {
            fromBlock: '11688996',
          })
          .then((events) => {
            events.forEach((event) => {
              if (
                event.returnValues.affiliate.toLowerCase() ===
                account.address.toLowerCase()
              ) {
                rewardsPaid.push({
                  address: event.returnValues.referral,
                  reward: web3.utils.fromWei(
                    event.returnValues.amount,
                    'ether'
                  ),
                  protocol: 'arCore',
                  timestampRaw: event.returnValues.timestamp,
                  timestamp: moment(event.returnValues.timestamp * 1000).format(
                    'MMM Do'
                  ),
                })
              }
            })
          })
          .catch((err) => reject(err))

        resolve(rewardsPaid.reverse())
      } catch (e) {
        reject(e)
      }
    })
  }

  async getWithdrawals(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetWithdrawals(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.setStore({ ReferralRewards_Withdrawals: response })
    this.service.emit(ReferralRewardsEvents.WithdrawalsReturned)
    return response
  }

  async _handleGetWithdrawals(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.referralRewards.abi,
          this.service.config.referralRewards.address
        )
        const balanceManagerContract = this.service.makeContract(
          web3,
          this.service.config.balanceManager.abi,
          this.service.config.balanceManager.address
        )

        let withdraws = []

        await contract
          .getPastEvents('RewardPaid', {
            fromBlock: '11688996',
          })
          .then((events) => {
            events.forEach((event) => {
              if (
                event.returnValues.user.toLowerCase() ===
                account.address.toLowerCase()
              ) {
                let amount = event.returnValues.reward

                withdraws.push({
                  address: '-',
                  protocol: 'arNxm',
                  amount: web3.utils.fromWei(amount.toString(), 'ether'),
                  block: event.blockNumber,
                  timestampRaw: event.returnValues.timestamp,
                  timestamp: moment(event.returnValues.timestamp * 1000).format(
                    'MMM Do'
                  ),
                })
              }
            })
          })
          .catch((err) => reject(err))

        await balanceManagerContract
          .getPastEvents('Withdraw', {
            fromBlock: '11688996',
          })
          .then((events) => {
            events.forEach((event) => {
              if (
                event.returnValues.user.toLowerCase() ===
                account.address.toLowerCase()
              ) {
                let amount = event.returnValues.amount
                if (amount == null) {
                  amount = '0'
                }

                withdraws.push({
                  address: '-',
                  amount: web3.utils.fromWei(amount.toString(), 'ether'),
                  protocol: 'arCore',
                  block: event.blockNumber,
                  timestampRaw: 0,
                  timestamp: '',
                })
              }
            })
          })
          .catch((err) => reject(err))

        if (withdraws.length > 0) {
          for (let i = 0; i < withdraws.length; i++) {
            if (withdraws[i].timestamp === '') {
              let timestamp = 0
              await web3.eth.getBlock(withdraws[i].block, (error, block) => {
                timestamp = block.timestamp
              })

              withdraws[i].timestampRaw = timestamp
              withdraws[i].timestamp = moment(timestamp * 1000).format('MMM Do')
            }
          }

          withdraws.sort((a, b) => a.block - b.block)
        } else {
          withdraws = []
        }

        resolve(withdraws.reverse())
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
        this.service.emit(ReferralRewardsEvents.RewardCompleted, data)
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
          this.service.config.referralRewards.abi,
          this.service.config.referralRewards.address
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

export default ReferralRewardsContract
