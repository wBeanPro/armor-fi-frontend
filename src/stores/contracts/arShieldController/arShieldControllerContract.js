import { ArShieldControllerEvents } from './arShieldControllerEvents.js'
import moment from 'moment'
import cnf from '../../../config/cnf'

class ArShieldControllerContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(ArShieldControllerEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case ArShieldControllerEvents.GetReferrals:
        await this.getReferrals(payload)
        break
      case ArShieldControllerEvents.GetBalance:
        await this.getBalance(payload)
        break
      case ArShieldControllerEvents.GetReward:
        await this.getReward(payload)
        break
    }
  }

  async getReferrals(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetReferrals(account).catch((err) =>
      this.service.emitError(err)
    )

    this.service.setStore({ ArShieldController_Referrals: response })
    this.service.emit(ArShieldControllerEvents.ReferralsReturned)
    return response
  }

  async _handleGetReferrals(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShieldController.abi,
          this.service.config.arShieldController.address
        )

        let shields = this.getShields()

        let referrals = []

        await contract
          .getPastEvents('ShieldAction', {
            fromBlock: '11688996',
          })
          .then((events) => {
            events.forEach((event) => {
              let address = account.address.toLowerCase()

              let affiliate = event.returnValues.referral
              let user = event.returnValues.user
              let shieldAddress = event.returnValues.shield
              let tokenAddress = event.returnValues.token
              let timestamp = event.returnValues.timestamp
              let refFee = web3.utils.fromWei(
                event.returnValues.refFee,
                'ether'
              )
              let mint = event.returnValues.mint

              if (affiliate === address.toLowerCase()) {
                referrals.push({
                  address: user,
                  shieldAddress: shieldAddress,
                  tokenAddress: tokenAddress,
                  protocol: this.findShieldByAddress(shields, shieldAddress),
                  reward: refFee,
                  timestampRaw: timestamp,
                  timestamp: moment(event.returnValues.timestamp * 1000).format(
                    'MMM Do'
                  ),
                })
              }
            })
          })
          .catch((err) => reject(err))

        resolve(referrals.reverse())
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

    if (response && response.tokens) {
      this.service.setStore({
        ArShieldController_Balance: {
          tokens: response.tokens,
          balances: response.balances,
        },
      })
    }

    this.service.emit(ArShieldControllerEvents.BalanceReturned)
    return response
  }

  async _handleGetBalance(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShieldController.abi,
          this.service.config.arShieldController.address
        )

        let balance = await contract.methods
          .getBalances(account.address, '0', '0')
          .call({ from: account.address })

        resolve(balance)
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
        this.service.emit(ArShieldControllerEvents.RewardCompleted, data)
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

  getShields() {
    let shields = []
    Object.keys(cnf.SHIELDS).forEach((protocol, i) => {
      Object.keys(cnf.SHIELDS[protocol]).forEach((key, j) => {
        if (key == 'shields') {
          console.log('shields found')
          Object.keys(cnf.SHIELDS[protocol][key]).forEach((shield, j) => {
            shields.push({
              name: shield,
              shieldAddress:
                cnf.SHIELDS[protocol].shields[shield]['shieldAddress'],
              underlyingTokenAddress:
                cnf.SHIELDS[protocol].shields[shield]['underlyingTokenAddress'],
              armorTokenAddress:
                cnf.SHIELDS[protocol].shields[shield]['armorTokenAddress'],
            })
          })
        }
      })
    })
    return shields
  }
  findShieldByAddress(shields, shieldAddress) {
    let shield = { name: '' }
    shields.forEach((s) => {
      if (s.shieldAddress.toLowerCase() === shieldAddress.toLowerCase()) {
        shield = s
      }
    })
    return shield.name
  }
}

export default ArShieldControllerContract
