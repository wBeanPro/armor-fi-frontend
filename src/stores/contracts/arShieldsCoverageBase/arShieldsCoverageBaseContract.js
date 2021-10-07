import { ArShieldsCoverageBaseEvents } from './arShieldsCoverageBaseEvents'
import { fromWei } from 'web3-utils'

class ArShieldsCoverageBaseContract {
  constructor(service, prefix, coverageBaseAddress) {
    this.service = service
    this.prefix = prefix
    this.coverageBaseAddress = coverageBaseAddress
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(
      ArShieldsCoverageBaseEvents(this.prefix),
      payload
    )
  }

  async dispatch(payload) {
    switch (payload.type) {
      case `${this.prefix}.GetTotalEthValue`:
        await this.getTotalEthValue(payload)
        break
      case `${this.prefix}.GetCostPerEth`:
        await this.getCostPerEth(payload)
        break
      case `${this.prefix}.GetTotalEthCoverage`:
        await this.getTotalEthCoverage(payload)
        break
      case `${this.prefix}.GetShieldStats`:
        await this.getShieldStats(payload)
        break
    }
  }

  async getTotalEthValue(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }

    let response = await this._getTotalEthValue(account).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({ [`${this.prefix}_TotalEthValue`]: response })
    this.service.emit(
      ArShieldsCoverageBaseEvents(this.prefix).TotalEthValueReturned,
      response
    )

    return response
  }
  async _getTotalEthValue(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShieldsCoverageBase.abi,
          this.coverageBaseAddress
        )

        let totalEth = await contract.methods
          .totalEthValue()
          .call({ from: account.address })

        resolve(web3.utils.fromWei(totalEth, 'ether'))
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getCostPerEth(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }

    let response = await this._getCostPerEth(account).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({ [`${this.prefix}_CostPerEth`]: response })
    this.service.emit(
      ArShieldsCoverageBaseEvents(this.prefix).CostPerEthReturned,
      response
    )

    return response
  }
  async _getCostPerEth(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShieldsCoverageBase.abi,
          this.coverageBaseAddress
        )

        let totalEth = await contract.methods
          .costPerEth()
          .call({ from: account.address })

        resolve(totalEth)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getTotalEthCoverage(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }

    let response = await this._getTotalEthCoverage(account).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({ [`${this.prefix}_TotalEthCoverage`]: response })
    this.service.emit(
      ArShieldsCoverageBaseEvents(this.prefix).TotalEthCoverageReturned,
      response
    )

    return response
  }
  async _getTotalEthCoverage(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShieldsCoverageBase.abi,
          this.coverageBaseAddress
        )

        let totalEth = await contract.methods
          .totalEthCoverage()
          .call({ from: account.address })

        resolve(fromWei(totalEth, 'ether'))
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getShieldStats(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }
    const { shieldAddress } = payload.content

    let response = await this._getShieldStats(account, shieldAddress).catch(
      (err) => {
        this.service.emitError(err)
        return '0'
      }
    )

    this.service.setStore({ [`${this.prefix}_ShieldStats`]: response })
    this.service.emit(
      ArShieldsCoverageBaseEvents(this.prefix).ShieldStatsReturned,
      response
    )

    return response
  }

  async _getShieldStats(account, shieldAddress) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arShieldsCoverageBase.abi,
          this.coverageBaseAddress
        )

        let shieldStats = await contract.methods
          .shieldStats(shieldAddress)
          .call({ from: account.address })

        resolve(shieldStats)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
}

export default ArShieldsCoverageBaseContract
