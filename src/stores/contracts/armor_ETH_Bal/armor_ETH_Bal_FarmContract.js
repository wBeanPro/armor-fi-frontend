import { Armor_ETH_Bal_FarmEvents } from './armor_ETH_Bal_FarmEvents'
import { Armor_ETH_Bal_TokenEvents } from './armor_ETH_Bal_TokenEvents'
import * as BN from 'bn.js'

class Armor_ETH_Bal_FarmContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(Armor_ETH_Bal_FarmEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case Armor_ETH_Bal_FarmEvents.GetStakedArmor:
        await this.getStakedArmor(payload)
        break
      case Armor_ETH_Bal_FarmEvents.GetOwnedArmor:
        await this.getOwnedArmor(payload)
        break
      case Armor_ETH_Bal_FarmEvents.GetRewardsOwed:
        await this.getRewardsOwed(payload)
        break
      case Armor_ETH_Bal_FarmEvents.GetRewardsGiven:
        await this.getRewardsGiven(payload)
        break
      case Armor_ETH_Bal_FarmEvents.GetTotalRewardsGiven:
        await this.getTotalRewardsGiven(payload)
        break
      case Armor_ETH_Bal_FarmEvents.GetTotalStakers:
        await this.getTotalStakers(payload)
        break
      case Armor_ETH_Bal_FarmEvents.Stake:
        await this.stake(payload)
        break
      case Armor_ETH_Bal_FarmEvents.ClaimRewards:
        await this.claimRewards(payload)
        break
      case Armor_ETH_Bal_FarmEvents.Withdraw:
        await this.withdraw(payload)
        break
      case Armor_ETH_Bal_FarmEvents.Exit:
        await this.exit(payload)
        break
    }
  }

  async getStakedArmor(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetStakedArmor(account).catch((err) => {
      this.service.emitError(err)
      return false
    })

    this.service.setStore({
      Armor_ETH_Bal_Farm_StakedArmor: !response
        ? '0'
        : web3.utils.fromWei(response.toString(), 'ether'),
    })
    this.service.emit(Armor_ETH_Bal_FarmEvents.StakedArmorReturned)

    return response
  }

  async _handleGetStakedArmor(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
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

    let lpTokenTotal = await this.service.contracts.armor_ETH_Bal_Token
      .getBalance(account.address)
      .catch((err) => {
        this.service.emitError(err)
        return null
      })

    let total = new BN(lpFarmTotal).add(new BN(lpTokenTotal))

    this.service.setStore({
      Armor_ETH_Bal_Farm_OwnedArmor:
        total === null ? 0 : web3.utils.fromWei(total.toString(), 'ether'),
    })
    this.service.emit(Armor_ETH_Bal_FarmEvents.OwnedArmorReturned)

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

    this.service.setStore({ Armor_ETH_Bal_Farm_RewardsOwed: response })
    this.service.emit(Armor_ETH_Bal_FarmEvents.RewardsOwedReturned)

    return response
  }

  async _handleGetRewardsOwed(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
        )

        let balance = await contract.methods
          .earned(account.address)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        console.error(e)
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

    this.service.setStore({ Armor_ETH_Bal_Farm_RewardsGiven: response })
    this.service.emit(Armor_ETH_Bal_FarmEvents.RewardsGivenReturned)

    return response
  }

  async _handleGetRewardsGiven(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
        )

        await contract
          .getPastEvents('RewardPaid', {
            fromBlock: '7500000',
          })
          .then((events) => {
            let totalRewardsGiven = 0

            events.forEach((event) => {
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
            })

            resolve(totalRewardsGiven.toString())
          })
          .catch((err) => reject(err))
      } catch (e) {
        console.error(e)
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

    this.service.setStore({ Armor_ETH_Bal_Farm_TotalRewardsGiven: response })
    this.service.emit(Armor_ETH_Bal_FarmEvents.TotalRewardsGivenReturned)

    return response
  }

  async _handleGetTotalRewardsGiven(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
        )

        await contract
          .getPastEvents('RewardAdded', {
            fromBlock: '7500000',
          })
          .then((events) => {
            let totalRewardsGiven = 0

            events.forEach((event) => {
              totalRewardsGiven += parseFloat(
                web3.utils.fromWei(
                  event.returnValues.reward.toString(),
                  'ether'
                )
              )
            })

            resolve(totalRewardsGiven.toString())
          })
          .catch((err) => reject(err))
      } catch (e) {
        console.error(e)
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

    this.service.setStore({ Armor_ETH_Bal_Farm_TotalStakers: response })
    this.service.emit(Armor_ETH_Bal_FarmEvents.TotalStakersReturned)

    return response
  }

  async _handleGetTotalStakers() {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
        )

        let stakers = []

        await contract
          .getPastEvents('Staked', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              if (stakers.indexOf(event.returnValues.user) < 0) {
                stakers[event.returnValues.user] = 0
              }

              stakers[event.returnValues.user] += parseFloat(
                web3.utils.fromWei(event.returnValues.amount, 'ether')
              )
            })
          })
          .catch((err) => reject(err))

        await contract
          .getPastEvents('Withdrawn', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              stakers[event.returnValues.user] -= parseFloat(
                web3.utils.fromWei(event.returnValues.amount, 'ether')
              )
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
        console.error(e)
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

    let userAmount = web3.utils.toWei(amount)
    let ownedArmor = await this.service.contracts.armor_ETH_Bal_Token
      .getBalance(account.address)
      .catch((err) => {
        this.service.emitError(err)
        return null
      })

    if (new BN(ownedArmor).lt(new BN(userAmount))) {
      userAmount = ownedArmor
    }

    await this.service.contracts.armor_ETH_Bal_Token
      .approve({
        content: {
          toAddress: this.service.config.armor_ETH_Bal_Farm.address,
          amount: userAmount,
        },
      })
      .catch((err) => {
        this.service.emitError(err)
        return false
      })

    let response = await this._handleStake(account, userAmount).catch((err) => {
      this.service.emitError(err)
      return false
    })

    this.service.emit(Armor_ETH_Bal_TokenEvents.StakeCompleted, response)
    return response
  }

  async _handleStake(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
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

    this.service.emit(Armor_ETH_Bal_TokenEvents.ClaimRewardsCompleted, response)
    return response
  }

  async _handleClaimRewards(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
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

    this.service.emit(Armor_ETH_Bal_TokenEvents.WithdrawCompleted, response)
    return response
  }

  async _handleWithdraw(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
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

    let response = await this._handleExit(account).catch((err) => {
      this.service.emitError(err)
    })

    this.service.emit(Armor_ETH_Bal_TokenEvents.ClaimRewardsCompleted, response)
    return response
  }

  async _handleExit(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.armor_ETH_Bal_Farm.abi,
          this.service.config.armor_ETH_Bal_Farm.address
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
      type: Armor_ETH_Bal_TokenEvents.GetBalance,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: Armor_ETH_Bal_FarmEvents.GetStakedArmor,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: Armor_ETH_Bal_FarmEvents.GetOwnedArmor,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: Armor_ETH_Bal_FarmEvents.GetRewardsOwed,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: Armor_ETH_Bal_FarmEvents.GetRewardsGiven,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: Armor_ETH_Bal_TokenEvents.GetTotalArmorStaked,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: Armor_ETH_Bal_FarmEvents.GetTotalRewardsGiven,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: Armor_ETH_Bal_FarmEvents.GetTotalStakers,
      content: {},
    })
  }
}

export default Armor_ETH_Bal_FarmContract
