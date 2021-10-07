import { BaseFarmEvents } from './baseFarmEvents'
import { BaseFarmTokenEvents } from './baseFarmTokenEvents'
import { fromWei } from 'web3-utils'
import * as BN from 'bn.js'
import axios from 'axios'
import { UtilizationFarmBorrowersEvents } from '../utilizationFarms/borrowers/utilizationFarmBorrowersEvents'

class BaseFarmContract {
  constructor(service, prefix, farmAddress, tokenContract, tokenAddress) {
    this.service = service
    this.prefix = prefix
    this.farmAddress = farmAddress
    this.tokenContract = tokenContract
    this.tokenAddress = tokenAddress
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(BaseFarmEvents(this.prefix), payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case `${this.prefix}.GetStakedArmor`:
        await this.getStakedArmor(payload)
        break
      case `${this.prefix}.GetOwnedArmor`:
        await this.getOwnedArmor(payload)
        break
      case `${this.prefix}.GetRewardsOwed`:
        await this.getRewardsOwed(payload)
        break
      case `${this.prefix}.GetRewardsGiven`:
        await this.getRewardsGiven(payload)
        break
      case `${this.prefix}.GetTotalRewardsGiven`:
        await this.getTotalRewardsGiven(payload)
        break
      case `${this.prefix}.GetTotalStakers`:
        await this.getTotalStakers(payload)
        break
      case `${this.prefix}.GetLastReward`:
        await this.getLastReward(payload)
        break
      case `${this.prefix}.GetWeeklyArmor`:
        await this.getWeeklyArmor(payload)
        break
      case `${this.prefix}.Stake`:
        await this.stake(payload)
        break
      case `${this.prefix}.ClaimRewards`:
        await this.claimRewards(payload)
        break
      case `${this.prefix}.Withdraw`:
        await this.withdraw(payload)
        break
      case `${this.prefix}.Exit`:
        await this.exit(payload)
        break
      case `${this.prefix}.GetArnftApy`:
        await this.getArnftApy(payload)
        break
    }
  }

  async getStakedArmor(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return '0'
    }

    let response = await this._handleGetStakedArmor(account).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({
      [`${this.prefix}_StakedArmor`]:
        response === null ? 0 : fromWei(response.toString(), 'ether'),
    })
    this.service.emit(BaseFarmEvents(this.prefix).StakedArmorReturned)

    return response
  }

  async _handleGetStakedArmor(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.farmAddress
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
    if (!account || !account.address) {
      return false
    }

    let lpFarmTotal = await this.getStakedArmor().catch((err) => {
      this.service.emitError(err)
      return null
    })

    let lpTokenTotal = await this.tokenContract
      .getBalance(account.address)
      .catch((err) => {
        this.service.emitError(err)
        return null
      })

    let total = new BN(lpFarmTotal).add(new BN(lpTokenTotal))

    this.service.setStore({
      [`${this.prefix}_OwnedArmor`]:
        total === null ? 0 : fromWei(total.toString(), 'ether'),
    })

    this.service.emit(BaseFarmEvents(this.prefix).OwnedArmorReturned)

    return total
  }

  async getRewardsOwed(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }

    let response = await this._handleGetRewardsOwed(account).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    const _value = fromWei(response.toString(), 'ether')

    this.service.setStore({
      [`${this.prefix}_RewardsOwed`]: _value,
    })
    this.service.emit(BaseFarmEvents(this.prefix).RewardsOwedReturned)

    return response
  }

  async _handleGetRewardsOwed(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.farmAddress
        )

        let balance = await contract.methods
          .earned(account.address)
          .call({ from: account.address })

        resolve(balance)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getRewardsGiven(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }

    let response = await this._handleGetRewardsGiven(account).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({ [`${this.prefix}_RewardsGiven`]: response })
    this.service.emit(BaseFarmEvents(this.prefix).RewardsGivenReturned)

    return response
  }

  async _handleGetRewardsGiven(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.farmAddress
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
                    fromWei(event.returnValues.reward.toString(), 'ether')
                  )
                }
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

  async getWeeklyArmor(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetWeeklyArmor(account).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({ [`${this.prefix}_WeeklyArmor`]: response })
    this.service.emit(BaseFarmEvents(this.prefix).WeeklyArmorReturned)

    return response
  }

  async _handleGetWeeklyArmor(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.farmAddress
        )

        let totalSupply = await contract.methods
          .totalSupply()
          .call({ from: account.address })

        let balance = await contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })

        await contract
          .getPastEvents('RewardAdded', {
            fromBlock: '7500000',
          })
          .then((events) => {
            let lastReward = 0

            events.forEach((event) => {
              if (event.returnValues.reward) {
                lastReward = event.returnValues.reward.toString()
              }
            })

            let x =
              (web3.utils.fromWei(lastReward.toString(), 'ether') *
                web3.utils.fromWei(balance.toString(), 'ether')) /
              web3.utils.fromWei(totalSupply.toString(), 'ether')
            //
            // let x = web3.utils.fromWei(
            //   new BN(lastReward)
            //     .mul(new BN(balance))
            //     .div(new BN(totalSupply))
            //     .toString(),
            //   'ether'
            // )

            resolve(x)
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getLastReward(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetLastReward(account).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({ [`${this.prefix}_LastReward`]: response })
    this.service.emit(BaseFarmEvents(this.prefix).LastRewardReturned)

    return response
  }

  async _handleGetLastReward(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.farmAddress
        )

        let armorEthPrice = 0

        await axios
          .get(
            'https://api.coingecko.com/api/v3/simple/price?ids=armor%2Carmor-nxm&vs_currencies=eth'
          )
          .then((x) => {
            armorEthPrice = x.data.armor.eth
          })
          .catch((e) => {
            armorEthPrice = 1
          })

        let totalSupply = await contract.methods
          .totalSupply()
          .call({ from: account.address })

        let balance = await contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })

        await contract
          .getPastEvents('RewardAdded', {
            fromBlock: '7500000',
          })
          .then((events) => {
            let totalRewards = 0
            let rewards = []

            events.forEach((event) => {
              if (event.returnValues.reward) {
                rewards.push(event.returnValues.reward.toString())
              }
            })

            let lastRewards =
              rewards.length >= 1 ? rewards.slice(rewards.length - 1) : rewards
            lastRewards.forEach((r) => {
              totalRewards += parseFloat(web3.utils.fromWei(r, 'ether'))
            })

            let secondsInYear = 3.154e7
            let base =
              web3.utils.fromWei(totalSupply.toString(), 'ether') *
              secondsInYear
            let yearRewards = totalRewards * 52 * armorEthPrice
            let apy = (yearRewards / base) * 100

            let percentOfTotal =
              (parseFloat(balance.toString()) /
                parseFloat(totalSupply.toString())) *
              100

            resolve({
              lastReward: totalRewards,
              totalSupply: totalSupply,
              balance: balance,
              armorEthPrice: armorEthPrice,
              apy: apy,
              percentOfTotal: percentOfTotal,
            })
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
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

    this.service.setStore({ [`${this.prefix}_TotalRewardsGiven`]: response })
    this.service.emit(BaseFarmEvents(this.prefix).TotalRewardsGivenReturned)

    return response
  }

  async _handleGetTotalRewardsGiven(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.farmAddress
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
                  fromWei(event.returnValues.reward.toString(), 'ether')
                )
              }
            })
            resolve(totalRewardsGiven.toString())
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })
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

    this.service.setStore({ [`${this.prefix}_TotalStakers`]: response })
    this.service.emit(BaseFarmEvents(this.prefix).TotalStakersReturned)

    return response
  }

  async _handleGetTotalStakers() {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.lpFarm.abi,
          this.farmAddress
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
                  fromWei(event.returnValues.amount, 'ether')
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
                  fromWei(event.returnValues.amount, 'ether')
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
    let ownedArmor = await this.tokenContract
      .getBalance(account.address)
      .catch((err) => {
        this.service.emitError(err)
        return null
      })

    if (new BN(ownedArmor).lt(new BN(userAmount))) {
      userAmount = ownedArmor
    }

    await this.tokenContract
      .approve({
        content: {
          toAddress: this.farmAddress,
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

    this.service.emit(BaseFarmTokenEvents(this.prefix).StakeCompleted, response)
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
          this.farmAddress
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

    this.service.emit(
      BaseFarmTokenEvents(this.prefix).ClaimRewardsCompleted,
      response
    )
    return response
  }

  isUtilizationFarmPrefix(_prefix) {
    const allowedArr = [
      'utilizationFarmBorrowers_Farm',
      'utilizationFarmStakers_Farm',
    ]
    return allowedArr.includes(_prefix)
  }

  async _handleClaimRewards(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()

        const contract = this.service.makeContract(
          web3,
          this.isUtilizationFarmPrefix(this.prefix)
            ? this.service.config.utilizationFarmBorrowers.abi
            : this.service.config.lpFarm.abi,
          this.farmAddress
        )

        const self = this

        const getRewardMethod =
          this.prefix === 'utilizationFarmBorrowers_Farm' ||
          this.prefix === 'utilizationFarmStakers_Farm'
            ? contract.methods.getReward(account.address)
            : contract.methods.getReward()

        // const gasEstimate = await getRewardMethod.estimateGas({
        //   from: account.address,
        //   gas: web3.utils.toWei(await this.service.getGasPrice(), 'gwei'),
        // })
        //
        // if (gasEstimate > this.service.maxGasLimit) {
        //   reject(this.service.maxGasLimitErrorMessage)
        //   return
        // }

        await getRewardMethod
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

    this.service.emit(
      BaseFarmTokenEvents(this.prefix).WithdrawCompleted,
      response
    )
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
          this.farmAddress
        )
        const self = this

        // let gasEstimate = await contract.methods.withdraw(amount).estimateGas({
        //   from: account.address,
        //   gas: web3.utils.toWei(await this.service.getGasPrice(), 'gwei'),
        // })
        //
        // if (gasEstimate > this.service.maxGasLimit) {
        //   reject(this.service.maxGasLimitErrorMessage)
        //   return
        // }

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

    this.service.emit(
      BaseFarmTokenEvents(this.prefix).ClaimRewardsCompleted,
      response
    )
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
          this.farmAddress
        )
        const self = this

        // let gasEstimate = await contract.methods.exit().estimateGas({
        //   from: account.address,
        //   gas: web3.utils.toWei(await this.service.getGasPrice(), 'gwei'),
        // })
        //
        // if (gasEstimate > this.service.maxGasLimit) {
        //   reject(this.service.maxGasLimitErrorMessage)
        //   return
        // }

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

  async getArnftApy(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetArnftApy(account).catch((err) => {
      this.service.emitError(err)
      return null
    })
    this.service.setStore({ [`${this.prefix}_ArnftApy`]: response })
    this.service.emit(BaseFarmEvents(this.prefix).ArnftApyReturned)

    return response
  }

  async _handleGetArnftApy(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const borrowerContract = this.service.makeContract(
          web3,
          this.service.config.utilizationFarmBorrowers.abi,
          this.service.config.utilizationFarmBorrowers.address
        )

        let borrowerSupply = await borrowerContract.methods
          .totalSupply()
          .call({ from: account.address })

        const stakerContract = this.service.makeContract(
          web3,
          this.service.config.utilizationFarmStakers.abi,
          this.service.config.utilizationFarmStakers.address
        )

        let stakerSupply = await stakerContract.methods
          .totalSupply()
          .call({ from: account.address })

        let apy = ((borrowerSupply - borrowerSupply / 5) / stakerSupply) * 100

        resolve(apy)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  dispatchAll() {
    this.service.dispatcher.dispatch({
      type: BaseFarmTokenEvents(this.prefix).GetBalance,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: BaseFarmEvents(this.prefix).GetStakedArmor,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: BaseFarmEvents(this.prefix).GetOwnedArmor,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: BaseFarmEvents(this.prefix).GetRewardsOwed,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: BaseFarmEvents(this.prefix).GetRewardsGiven,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: BaseFarmTokenEvents(this.prefix).GetTotalArmorStaked,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: BaseFarmEvents(this.prefix).GetTotalRewardsGiven,
      content: {},
    })
    this.service.dispatcher.dispatch({
      type: BaseFarmEvents(this.prefix).GetTotalStakers,
      content: {},
    })
  }
}

export default BaseFarmContract
