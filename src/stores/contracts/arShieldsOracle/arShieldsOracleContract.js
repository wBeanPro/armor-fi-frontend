import { ArShieldsOracleEvents } from './arShieldsOracleEvents.js'

class ArShieldsOracleContract {
  constructor(service, prefix, oracleAddress) {
    this.service = service
    this.prefix = prefix
    this.oracleAddress = oracleAddress
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(
      ArShieldsOracleEvents(this.prefix),
      payload
    )
  }

  async dispatch(payload) {
    switch (
      payload.type
      //case IbcoEvents.GetTransactions:
      //await this.getTransactions(payload)
      //break
    ) {
    }
  }
}

export default ArShieldsOracleContract
