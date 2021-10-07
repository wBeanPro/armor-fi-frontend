import { ArmorTokenEvents } from './armorTokenEvents'

class ArmorTokenContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(ArmorTokenEvents, payload)
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

export default ArmorTokenContract
