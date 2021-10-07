import { UtilizationFarmBorrowersEvents } from './utilizationFarmBorrowersEvents'
import { ArNFTEvents } from '../../arNFTEvents'

class UtilizationFarmBorrowersContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(UtilizationFarmBorrowersEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case UtilizationFarmBorrowersEvents.GetArnftApy:
        await this.getArnftApy(payload)
        break
    }
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
    this.service.setStore({ UtilizationFarmBorrowers_ArnftApy: response })
    this.service.emit(UtilizationFarmBorrowersEvents.ArnftApyReturned)

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

        console.log({ borrowerSupply })
        console.log({ stakerSupply })

        resolve(borrowerSupply)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
}

export default UtilizationFarmBorrowersContract
