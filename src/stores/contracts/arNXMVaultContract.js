import { ArNXMVaultEvents } from './arNXMVaultEvents'
import ReferralSystem from '../../classes/referralSystem'
import moment from 'moment'
import * as BN from 'bn.js'

class ArNXMVaultContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(ArNXMVaultEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case ArNXMVaultEvents.GetAssetsUnderManagement:
        await this.getAssetsUnderManagement(payload)
        break
      case ArNXMVaultEvents.GetWithdrawableAssets:
        await this.getWithdrawableAssets(payload)
        break
      case ArNXMVaultEvents.GetTotalDepositsAndWithdrawals:
        await this.getTotalDepositsAndWithdrawals(payload)
        break
      case ArNXMVaultEvents.GetAPY:
        await this.getAPY(payload)
        break
      case ArNXMVaultEvents.GetMonthlyAPY:
        await this.getMonthlyAPY(payload)
        break
      case ArNXMVaultEvents.GetAllTimeAPY:
        await this.getAllTimeAPY(payload)
        break
      case ArNXMVaultEvents.Deposit:
        await this.deposit(payload)
        break
      case ArNXMVaultEvents.Withdrawal:
        await this.withdraw(payload)
        break
      case ArNXMVaultEvents.GetProtocols:
        await this.getProtocols(payload)
        break
      case ArNXMVaultEvents.GetWNxmValue:
        await this.getWNxmValue(payload)
        break
      case ArNXMVaultEvents.FinalizeWithdraw:
        await this.finalizeWithdraw(payload)
        break
      case ArNXMVaultEvents.GetRequestedWithdrawals:
        await this.getRequestedWithdrawals(payload)
        break
    }
  }

  async getAssetsUnderManagement(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let data = await this._handleGetAssetsUnderManagement(account).catch(
      (err) => this.service.emitError(err)
    )
    this.service.setStore({ ArNXMVault_AssetsUnderManagement: data })
    this.service.emit(ArNXMVaultEvents.AssetsUnderManagementReturned)
    return data
  }

  async _handleGetAssetsUnderManagement(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let total = await contract.methods.aum().call({ from: account.address })

        resolve(web3.utils.fromWei(total, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getWithdrawableAssets(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let data = await this._handleGetWithdrawableAssets(account).catch((err) => {
      this.service.emitError(err)
      return 0
    })

    this.service.setStore({ ArNXMVault_WithdrawableAssets: data })
    this.service.emit(ArNXMVaultEvents.WithdrawableAssetsReturned)
    return data
  }

  async _handleGetWithdrawableAssets(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.NXM.abi,
          this.service.config.NXM.address
        )
        const arNXMVaultContract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let total = await contract.methods
          .balanceOf(this.service.config.arNXMVault.address)
          .call({ from: account.address })

        let pending = await arNXMVaultContract.methods
          .totalPending()
          .call({ from: account.address })

        let newTotal = new BN(total).sub(new BN(pending))
        resolve(web3.utils.fromWei(newTotal, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getProtocols(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let data = await this._handleGetProtocols(account).catch((err) =>
      this.service.emitError(err)
    )
    this.service.setStore({ ArNXMVault_Protocols: data })
    this.service.emit(ArNXMVaultEvents.ProtocolsReturned)
    return data
  }

  async _handleGetProtocols(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let protocols = await contract.methods
          .protocols(0)
          .call({ from: account.address })

        resolve(protocols)
      } catch (e) {
        reject(e)
      }
    })
  }

  async getTotalDepositsAndWithdrawals(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    await this._handleGetTotalDepositsAndWithdrawals(account)
      .then((data) => {
        this.service.setStore({ ArNXMVault_TotalDepositsAndWithdrawals: data })
        this.service.emit(ArNXMVaultEvents.TotalDepositsAndWithdrawalsReturned)
      })
      .catch((e) => this.service.emitError(e))
  }

  async _handleGetTotalDepositsAndWithdrawals(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let totalDeposits = 0.0
        let totalWithdrawals = 0.0

        await contract
          .getPastEvents('Deposit', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              let eventValues = event.returnValues
              if (
                eventValues.user.toLowerCase() === account.address.toLowerCase()
              ) {
                totalDeposits += parseFloat(
                  web3.utils.fromWei(eventValues.wAmount, 'ether')
                )
              }
            })
          })

        await contract
          .getPastEvents('Withdrawal', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              let eventValues = event.returnValues
              if (
                eventValues.user.toLowerCase() === account.address.toLowerCase()
              ) {
                totalWithdrawals += parseFloat(
                  web3.utils.fromWei(eventValues.arAmount, 'ether')
                )
              }
            })
          })

        let arNxmBalance = await this.service.contracts.arNXMToken
          .getBalance()
          .catch((err) => {
            this.service.emitError(err)
            return false
          })

        let wNxmValue = 0
        if (arNxmBalance > 0) {
          wNxmValue = await contract.methods
            .nxmValue(arNxmBalance)
            .call({ from: account.address })
        }

        resolve({
          deposits: totalDeposits,
          withdrawals: parseFloat(totalWithdrawals) + parseFloat(wNxmValue),
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  async getAPY(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetAPY()
      .then((data) => {
        this.service.setStore({ ArNXMVault_APY: data })
        this.service.emit(ArNXMVaultEvents.APYReturned)
      })
      .catch((e) => this.service.emitError(e))
  }

  async _handleGetAPY() {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let userReward = 0
        let totalAum = 0

        await contract
          .getPastEvents('Restake', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            if (events.length > 0) {
              let lastEvent = events[events.length - 1]
              userReward = lastEvent.returnValues.userReward
              totalAum = lastEvent.returnValues.totalAum
            }
          })

        if (userReward === 0) {
          resolve(0)
        }

        let apy = (parseFloat(userReward) / parseFloat(totalAum)) * 52
        resolve(apy)
      } catch (e) {
        reject(e)
      }
    })
  }

  async getMonthlyAPY(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetMonthlyAPY()
      .then((data) => {
        this.service.setStore({ ArNXMVault_MonthlyAPY: data })
        this.service.emit(ArNXMVaultEvents.MonthlyAPYReturned)
      })
      .catch((e) => this.service.emitError(e))
  }

  async _handleGetMonthlyAPY() {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let userRewards = 0
        let totalAum = 0

        await contract
          .getPastEvents('Restake', {
            fromBlock: 'earliest',
          })
          .then((_events) => {
            const events = _events.slice(-4) // last 4 events
            events.forEach((event) => {
              let lastEvent = events[events.length - 1]
              userRewards += parseFloat(lastEvent.returnValues.userReward)
              totalAum += parseFloat(lastEvent.returnValues.totalAum)
            })
          })

        if (userRewards === 0) {
          resolve(0)
        }

        let apy = (parseFloat(userRewards) / parseFloat(totalAum)) * 52
        resolve(apy)
      } catch (e) {
        reject(e)
      }
    })
  }

  async getAllTimeAPY(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetAllTimeAPY()
      .then((data) => {
        this.service.setStore({ ArNXMVault_AllTimeAPY: data })
        this.service.emit(ArNXMVaultEvents.AllTimeAPYReturned)
      })
      .catch((e) => this.service.emitError(e))
  }

  async _handleGetAllTimeAPY() {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let userRewards = 0
        let totalAum = 0

        await contract
          .getPastEvents('Restake', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              let lastEvent = events[events.length - 1]
              userRewards += parseFloat(lastEvent.returnValues.userReward)
              totalAum += parseFloat(lastEvent.returnValues.totalAum)
            })
          })

        if (userRewards === 0) {
          resolve(0)
        }

        let apy = (parseFloat(userRewards) / parseFloat(totalAum)) * 52
        resolve(apy)
      } catch (e) {
        reject(e)
      }
    })
  }

  async deposit(payload) {
    try {
      const account = this.service.getAccount()
      const web3 = await this.service.getWeb3()
      if (!account || !account.address) {
        return false
      }
      const { amount, isNxm } = payload.content

      let allowance = await this.service.contracts[isNxm ? 'NXM' : 'wNXM']
        .getAllowance(account)
        .catch((err) => {
          this.service.emitError(err)
          throw err
        })

      if (parseInt(allowance) < parseInt(amount)) {
        await this.service.contracts[isNxm ? 'NXM' : 'wNXM'].approve({
          content: {
            toAddress: this.service.config.arNXMVault.address,
            amount: web3.utils.toWei(amount),
          },
        })
      }

      this.service.emit(ArNXMVaultEvents.ApprovalCompleted, [])

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

      const _data = await this._handleDeposit(
        account,
        web3.utils.toWei(amount),
        referrer,
        isNxm
      )

      if (typeof _data === 'object' && _data !== null) {
        this.service.emit(ArNXMVaultEvents.DepositCompleted, _data)
      } else {
        this.service.emitError('Something went wrong!')
      }
    } catch (e) {
      this.service.emitError(e)
    }
  }

  async _handleDeposit(account, amount, referrer, isNxm) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )
        const self = this

        let deposit = contract.methods
          .deposit(amount, referrer, isNxm)
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
          .then((deposit) => {
            self.getAssetsUnderManagement()
            self.getAPY()
            self.getTotalDepositsAndWithdrawals()

            self.service.dispatchVaultEvents()
            resolve(deposit)
          })
      } catch (e) {
        return reject(e)
      }
    })
  }

  async withdraw(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { amount, withFee } = payload.content

    await this._handleWithdraw(
      account,
      web3.utils.toWei(amount.toString()),
      withFee
    )
      .then((data) =>
        this.service.emit(ArNXMVaultEvents.WithdrawalCompleted, data)
      )
      .catch((err) => this.service.emitError(err))
  }

  async _handleWithdraw(account, amount, withFee) {
    return new Promise(async (resolve, reject) => {
      try {
        const self = this
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        if (!withFee) {
          let allowance = await this.service.contracts['arNXMToken']
            .getAllowance(account)
            .catch((err) => {
              this.service.emitError(err)
            })

          if (parseInt(allowance) < parseInt(amount)) {
            let response = await this.service.contracts['arNXMToken']
              .approve({
                content: {
                  toAddress: this.service.config.arNXMVault.address,
                  amount: web3.utils.toWei(amount),
                },
              })
              .catch((err) => {
                this.service.emitError(err)
              })

            if (response === undefined) {
              return reject('Approval was rejected')
            }
          }
          this.service.emit(ArNXMVaultEvents.ApprovalCompleted, [])
        }

        let response = await contract.methods
          .withdraw(amount, withFee)
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
            self.getAssetsUnderManagement()
            self.getAPY()
            self.getTotalDepositsAndWithdrawals()

            self.service.dispatchVaultEvents()
            resolve(response)
          })
      } catch (e) {
        return reject(e)
      }
    })
  }

  async getWNxmValue(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }
    const { amount } = payload

    let data = await this._handleGetWNxmValue(account, amount).catch((err) => {
      this.service.emitError(err)
      return 0
    })

    this.service.setStore({ ArNXMVault_WNxmValue: data })
    this.service.emit(ArNXMVaultEvents.WNxmValueReturned)
    return data
  }

  async _handleGetWNxmValue(account, amount) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let wNxmValue = await contract.methods
          .nxmValue((1e18).toString())
          .call({ from: account.address })

        resolve(web3.utils.fromWei(wNxmValue, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }

  async finalizeWithdraw(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }

    await this._handleFinalizeWithdraw(account)
      .then((data) =>
        this.service.emit(ArNXMVaultEvents.FinalizeWithdrawCompleted, data)
      )
      .catch((err) => this.service.emitError(err))
  }

  async _handleFinalizeWithdraw(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const self = this
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let response = await contract.methods
          .withdrawFinalize()
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
        return reject(e)
      }
    })
  }

  async getRequestedWithdrawals(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    await this._getRequestedWithdrawals(account)
      .then((data) => {
        this.service.setStore({ ArNXMVault_RequestedWithdrawals: data })
        this.service.emit(ArNXMVaultEvents.RequestedWithdrawalsReturned)
      })
      .catch((e) => this.service.emitError(e))
  }

  async _getRequestedWithdrawals(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNXMVault.abi,
          this.service.config.arNXMVault.address
        )

        let withdrawalsPaused = await contract.methods
          .withdrawalsPaused()
          .call({ from: account.address })
        // console.log({ withdrawalsPaused })

        let pauseDuration = await contract.methods
          .pauseDuration()
          .call({ from: account.address })
        // console.log({ pauseDuration })

        let withdrawDelay = await contract.methods
          .withdrawDelay()
          .call({ from: account.address })
        // console.log({ withdrawDelay })

        let withdrawalRequest = await contract.methods
          .withdrawals(account.address)
          .call({ from: account.address })
        // console.log({ withdrawalRequest })

        let withdrawFee = await contract.methods
          .withdrawFee()
          .call({ from: account.address })
        withdrawFee = parseFloat(withdrawFee) / 10

        let withdrawalTime = 0
        let requestTime = null

        if (withdrawalRequest['requestTime'] > 0) {
          withdrawalTime =
            parseInt(withdrawalRequest['requestTime']) + parseInt(withdrawDelay)
          requestTime = moment(withdrawalTime * 1000)
          // console.log({ withdrawalTime })
          // console.log({ requestTime })
        }

        console.log('resolving from contract', {
          request: withdrawalRequest,
          withdrawalTime: withdrawalTime,
          requestTime: requestTime,
          withdrawalsPaused: withdrawalsPaused,
          withdrawDelay: withdrawDelay,
          withdrawFee: withdrawFee,
        })

        resolve({
          request: withdrawalRequest,
          withdrawalTime: withdrawalTime,
          requestTime: requestTime,
          withdrawalsPaused: withdrawalsPaused,
          withdrawDelay: withdrawDelay,
          withdrawFee: withdrawFee,
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default ArNXMVaultContract
