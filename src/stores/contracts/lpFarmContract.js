import { LpFarmEvents } from './lpFarmEvents'
import { LpTokenEvents } from './lpTokenEvents'

class LpFarmContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(LpFarmEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case LpFarmEvents.GetStakedArmor:
        await this.getStakedArmor(payload)
        break
      case LpFarmEvents.GetOwnedArmor:
        await this.getOwnedArmor(payload)
        break
      case LpFarmEvents.GetRewardsOwed:
        await this.getRewardsOwed(payload)
        break
      case LpFarmEvents.GetRewardsGiven:
        await this.getRewardsGiven(payload)
        break
      case LpFarmEvents.GetTotalRewardsGiven:
        await this.getTotalRewardsGiven(payload)
        break
      case LpFarmEvents.GetTotalStakers:
        await this.getTotalStakers(payload)
        break
      case LpFarmEvents.Stake:
        await this.stake(payload)
        break
      case LpFarmEvents.ClaimRewards:
        await this.claimRewards(payload)
        break
      case LpFarmEvents.Withdraw:
        await this.withdraw(payload)
        break
      case LpFarmEvents.Exit:
        await this.exit(payload)
        break
    }
  }

  async getStakedArmor(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetStakedArmor(account).catch((err) => {
      this.service.emitError(err)
      return false
    })

    this.service.setStore({ LpFarm_StakedArmor: response })
    this.service.emit(LpFarmEvents.StakedArmorReturned)

    return response
  }

  async _handleGetStakedArmor(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
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

  async getOwnedArmor(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }

    let lpFarmTotal = await this.getStakedArmor().catch((err) => {
      this.service.emitError(err)
      return null
    })

    let lpTokenTotal = await this.service.contracts.lpToken
      .getBalance(account.address)
      .catch((err) => {
        this.service.emitError(err)
        return null
      })

    let total = parseFloat(lpFarmTotal) + parseFloat(lpTokenTotal)

    this.service.setStore({ LpFarm_OwnedArmor: total })
    this.service.emit(LpFarmEvents.OwnedArmorReturned)

    return total
  }

  async getRewardsOwed(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetRewardsOwed(account).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({ LpFarm_RewardsOwed: response })
    this.service.emit(LpFarmEvents.RewardsOwedReturned)

    return response
  }

  async _handleGetRewardsOwed(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
        )

        let balance = await contract.methods
          .earned(account.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getRewardsGiven(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetRewardsGiven(account).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({ LpFarm_RewardsGiven: response })
    this.service.emit(LpFarmEvents.RewardsGivenReturned)

    return response
  }

  async _handleGetRewardsGiven(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
        )

        await contract
          .getPastEvents('RewardPaid', {
            fromBlock: '7500000',
          })
          .then((events) => {
            let totalRewardsGiven = 0

            events.forEach((event) => {
              if (event.returnValues.user && event.returnValues.reward) {
                if (
                  event.returnValues.user.toLowerCase() ===
                  account.address.toLowerCase()
                ) {
                  totalRewardsGiven += parseFloat(
                    web3.utils.fromWei(
                      event.returnValues.reward.toString(),
                      'ether'
                    )
                  )
                }
              }
            })

            resolve(totalRewardsGiven.toString())
          })
          .catch((err) => reject(err))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getTotalRewardsGiven(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetTotalRewardsGiven(account).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )

    this.service.setStore({ LpFarm_TotalRewardsGiven: response })
    this.service.emit(LpFarmEvents.TotalRewardsGivenReturned)

    return response
  }

  async _handleGetTotalRewardsGiven(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
        )

        await contract
          .getPastEvents('RewardAdded', {
            fromBlock: '7500000',
          })
          .then((events) => {
            let totalRewardsGiven = 0

            events.forEach((event) => {
              if (event.returnValues.reward) {
                totalRewardsGiven += parseFloat(
                  web3.utils.fromWei(
                    event.returnValues.reward.toString(),
                    'ether'
                  )
                )
              }
            })

            resolve(totalRewardsGiven.toString())
          })
          .catch((err) => reject(err))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getTotalStakers(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetTotalStakers().catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({ LpFarm_TotalStakers: response })
    this.service.emit(LpFarmEvents.TotalStakersReturned)

    return response
  }

  async _handleGetTotalStakers() {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
        )

        let stakers = []

        await contract
          .getPastEvents('Staked', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              if (event.returnValues.user && event.returnValues.amount) {
                if (stakers.indexOf(event.returnValues.user) < 0) {
                  stakers[event.returnValues.user] = 0
                }

                stakers[event.returnValues.user] += parseFloat(
                  web3.utils.fromWei(event.returnValues.amount, 'ether')
                )
              }
            })
          })
          .catch((err) => reject(err))

        await contract
          .getPastEvents('Withdrawn', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              if (event.returnValues.user && event.returnValues.amount) {
                stakers[event.returnValues.user] -= parseFloat(
                  web3.utils.fromWei(event.returnValues.amount, 'ether')
                )
              }
            })
          })
          .catch((err) => reject(err))

        let count = 0
        Object.keys(stakers).forEach((s) => {
          if (stakers[s] > 0) {
            count++
          }
        })

        resolve(count)
      } catch (e) {
        reject(e)
      }
    })
  }

  async stake(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    await this.service.contracts.lpToken
      .approve({
        content: {
          toAddress: this.service.config.lpFarm.address,
          amount: web3.utils.toWei(amount),
        },
      })
      .catch((err) => {
        this.service.emitError(err)
        return false
      })

    let response = await this._handleStake(
      account,
      web3.utils.toWei(amount)
    ).catch((err) => {
      this.service.emitError(err)
      return false
    })

    this.service.emit(LpTokenEvents.StakeCompleted, response)
    return response
  }

  async _handleStake(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
        )
        const self = this

        await contract.methods
          .stake(amount)
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
            self.dispatchAll()
            resolve(data)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async claimRewards(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleClaimRewards(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.emit(LpTokenEvents.ClaimRewardsCompleted, response)
    return response
  }

  async _handleClaimRewards(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
        )
        const self = this

        await contract.methods
          .getReward()
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
            self.dispatchAll()
            resolve(data)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async withdraw(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { amount } = payload.content

    let response = await this._handleWithdraw(
      account,
      web3.utils.toWei(amount)
    ).catch((err) => this.service.emitError(err))

    this.service.emit(LpTokenEvents.WithdrawCompleted, response)
    return response
  }

  async _handleWithdraw(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
        )
        const self = this

        await contract.methods
          .withdraw(amount)
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
            self.dispatchAll()
            resolve(data)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async exit(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleExit(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.emit(LpTokenEvents.ClaimRewardsCompleted, response)
    return response
  }

  async _handleExit(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.service.config.lpFarm.address
        )
        const self = this

        await contract.methods
          .exit()
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
            self.dispatchAll()
            resolve(data)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  dispatchAll() {
    this.service.dispatcher.dispatch({
      type: LpTokenEvents.GetBalance,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: LpFarmEvents.GetStakedArmor,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: LpFarmEvents.GetOwnedArmor,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: LpFarmEvents.GetRewardsOwed,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: LpFarmEvents.GetRewardsGiven,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: LpTokenEvents.GetTotalArmorStaked,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: LpFarmEvents.GetTotalRewardsGiven,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: LpFarmEvents.GetTotalStakers,
      content: {},
    })
  }
}

export default LpFarmContract
