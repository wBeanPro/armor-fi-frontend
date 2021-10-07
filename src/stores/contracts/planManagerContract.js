import { PlanManagerEvents } from './planManagerEvents'
import * as BN from 'bn.js'
import { logoMapper } from '../../helpers'
import axios from 'axios'
import PlanBuilder from '../../classes/planBuilder'
import moment from 'moment'
import config from '../../config'
import { toWei } from 'web3-utils'

class PlanManagerContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(PlanManagerEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case PlanManagerEvents.GetCurrentPlans:
        await this.getCurrentPlans(payload)
        break
      case PlanManagerEvents.UpdatePlan:
        await this.updatePlan(payload)
        break
      case PlanManagerEvents.GetCoverageLeft:
        await this.getCoverageLeft(payload)
        break
      case PlanManagerEvents.GetPlanStartAndEnd:
        await this.getPlanStartAndEnd(payload)
        break
      case PlanManagerEvents.GetCost:
        await this.getCost(payload)
    }
  }

  async getCoverageLeft(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { protocol } = payload.content

    let response = await this._handleGetCoverageLeft(account, protocol).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )

    this.service.setStore({
      PlanManager_CoverageLeft: {
        protocol: protocol,
        amount: response,
      },
    })
    this.service.emit(PlanManagerEvents.CoverageLeftReturned)

    return response
  }

  async _handleGetCoverageLeft(account, protocol) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.planManager.abi,
          this.service.config.planManager.address
        )

        let coverageLeft = await contract.methods
          .coverageLeft(protocol)
          .call({ from: account.address })

        resolve(coverageLeft)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getPlanStartAndEnd(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetPlanStartAndEnd(account).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )

    if (response === null) {
      this.service.setStore({
        PlanManager_StartAndEnd: {
          start: 0,
          end: 0,
        },
      })
      this.service.emit(PlanManagerEvents.PlanStartAndEndReturned)
      return [0, 0]
    }

    this.service.setStore({
      PlanManager_StartAndEnd: {
        start: response.start,
        end: response.end,
      },
    })
    this.service.emit(PlanManagerEvents.PlanStartAndEndReturned)

    return response
  }

  async _handleGetPlanStartAndEnd(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.planManager.abi,
          this.service.config.planManager.address
        )

        let plan = await contract.methods
          .getCurrentPlan(account.address)
          .call({ from: account.address })

        resolve(plan)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getCurrentPlans(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { manuallyAdded } = payload.content

    if (this.service.getStore('nexusMutualContracts').length === 0) {
      await this.service.store.fetchNexusMutualContractsFromApi()
    }
    const nmContracts = this.service.getStore('nexusMutualContracts')

    const pricesAndAmounts = await this.service.store
      .fetchPricesAndAmountsFromApi(account.address)
      .catch((e) => this.service.emitError(e))

    // initiate plan builder class and add manual
    const planBuilder = new PlanBuilder(nmContracts)
    //planBuilder.addNewCoveragePlansFromArray(manuallyAdded, true)
    planBuilder.addNewCoveragePlansFromArray(pricesAndAmounts)

    let startEnd = await this._handleGetPlanStartAndEnd(account).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )

    let plan = await this._handleGetCurrentPlans(account, planBuilder).catch(
      (e) => this.service.emitError(e)
    )

    if (startEnd == null || startEnd.start === '0') {
      planBuilder.clearCoveragesFromPlans()
    }

    this.service.setStore({ PlanManager_CurrentPlans: planBuilder.plan })
    this.service.emit(PlanManagerEvents.CurrentPlansReturned)
  }

  async _handleGetCurrentPlans(account, planBuilder) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.planManager.abi,
          this.service.config.planManager.address
        )

        let coverage = []
        await axios
          .get(`${this.service.config.backendUrl}/api/plan/available-coverage`)
          .then((x) => {
            coverage = x.data.available_coverage
          })
          .catch((e) => {
            coverage = []
          })

        let ethPrice = 0
        await axios
          .get(`${this.service.config.backendUrl}/api/price/eth`)
          .then((x) => {
            ethPrice = x.data.price
          })
          .catch((e) => {
            ethPrice = 1
          })

        await contract
          .getPastEvents('PlanUpdate', {
            fromBlock: 'earliest',
          })
          .then((events) => {
            events.forEach((event) => {
              if (
                event.returnValues.user &&
                event.returnValues.protocols &&
                event.returnValues.amounts
              ) {
                if (
                  event.returnValues.user.toLowerCase() ===
                  account.address.toLowerCase()
                ) {
                  for (
                    let i = 0;
                    i < event.returnValues.protocols.length;
                    i++
                  ) {
                    let protocolAddress =
                      event.returnValues.protocols[i].toLowerCase()

                    // let endTime = event.returnValues.endTime
                    // console.log({protocolAddress})
                    // console.log({endTime})
                    // console.log('event.returnValues.amounts[i]', event.returnValues.amounts[i])
                    //
                    // if (endTime > moment().utc().unix()) {
                    if (!planBuilder.hasProtocolInPlan(protocolAddress)) {
                      planBuilder.addNewCoverageToPlan(
                        protocolAddress,
                        0,
                        event.returnValues.amounts[i]
                      )
                    }

                    planBuilder.setProtocolCoverage(
                      protocolAddress,
                      event.returnValues.amounts[i]
                    )
                    // }
                  }
                }
              }
            })
          })
          .catch((err) => reject(err))

        planBuilder.removeInvalidPlans()

        let markup = await contract.methods
          .markup()
          .call({ from: account.address })

        let index = planBuilder.plan.length - 1
        while (index >= 0) {
          let nftCoverPrice = await contract.methods
            .nftCoverPrice(planBuilder.plan[index].address)
            .call({ from: account.address })

          let pricePerSecond =
            (parseFloat(nftCoverPrice) * parseFloat(markup)) / 100

          let pricePerSecondEth = web3.utils.fromWei(
            Math.round(pricePerSecond).toString(),
            'ether'
          )

          planBuilder.plan[index].availability.eth = this.getCoverAvailable(
            coverage,
            planBuilder.plan[index].address
          )
          planBuilder.plan[index].availability.wei = toWei(
            planBuilder.plan[index].availability.eth
          )
          planBuilder.plan[index].availability.usd =
            planBuilder.plan[index].availability.eth * ethPrice

          if (parseFloat(planBuilder.plan[index].coverage.eth) > 0) {
            planBuilder.plan[index].pricePerSecond =
              parseFloat(pricePerSecondEth) *
              parseFloat(planBuilder.plan[index].coverage.eth)
          } else {
            planBuilder.plan[index].pricePerSecond =
              parseFloat(pricePerSecondEth) *
              parseFloat(planBuilder.plan[index].balance.eth)
          }
          planBuilder.plan[index].pricePerYearPercent =
            parseFloat(pricePerSecondEth) * 86400 * 365.2425 * 100

          index -= 1
        }

        planBuilder.setUsdValues(ethPrice)
        resolve(planBuilder)
      } catch (e) {
        reject(e)
      }
    })
  }

  getCoverAvailable(coverage, _address) {
    if (coverage == null) {
      return '0'
    }
    const _protocol = coverage.find(
      (p) => p.address.toLowerCase() === _address.toLowerCase()
    )

    if (_protocol && _protocol.coverage_left > 0) {
      return _protocol.coverage_left.toString()
    } else {
      return '0'
    }
  }

  async updatePlan(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._callUpdatePlan(account, payload.content)
      .then((data) => {
        const _data = { ...data }
        if (payload.content.withdrawAll) {
          _data.withdrawAll = true
        }
        this.service.emit(PlanManagerEvents.UpdatePlanCompleted, _data)
      })
      .catch((e) => this.service.emitError(e))
  }

  async _callUpdatePlan(account, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { protocols, coverAmounts } = payload
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.planManager.abi,
          this.service.config.planManager.address
        )

        await contract.methods
          .updatePlan(protocols, coverAmounts)
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
          .then((response) => {
            resolve(response)
          })
      } catch (e) {
        reject(e)
      }
    })
  }

  async _convertProtocolDataIntoArmorPlan(protocols, pricesAndAmounts, web3) {
    const plans = []
    let ethPrice = 0

    await axios
      .get(`${this.service.config.backendUrl}/api/price/eth`)
      .then((x) => {
        ethPrice = x.data.price
      })
      .catch((e) => {
        ethPrice = 1
      })

    for (const protocol of protocols) {
      let tokenValueUsd = protocol.balance
      let tokenValueEth = tokenValueUsd / ethPrice
      let tokenValueWei = web3.utils.toWei(tokenValueEth.toString(), 'ether')

      let coveredPercentage = 0
      if (new BN(protocol.covered).gt(new BN('0'))) {
        coveredPercentage =
          (parseFloat(protocol.covered) / parseFloat(tokenValueWei)) * 100
      }
      if (tokenValueWei === '0') {
        coveredPercentage = 100
      }

      let coveredUsd = new BN(protocol.covered).mul(new BN(ethPrice * 100))
      let coveredEth = web3.utils.fromWei(protocol.covered, 'ether')
      let coveredWei = protocol.covered

      if (tokenValueWei > 0 || coveredWei > 0) {
        plans.push({
          name: protocol.name,
          address: protocol.address,
          icon: logoMapper(protocol.name),
          logo: logoMapper(protocol.name),
          link: 'https://www.google.com/',
          tokenValueUsd: tokenValueUsd,
          tokenValueEth: tokenValueEth,
          tokenValueWei: tokenValueWei,
          coveredPercent: coveredPercentage,
          coveredUsd: coveredUsd,
          coveredEth: coveredEth,
          coveredWei: coveredWei.toString(),
          extraPercent: protocol.availablePercentage,
          extraUsd: '0.00',
          extraEth: web3.utils.fromWei(protocol.available, 'ether'),
        })
      }
    }

    return plans
  }

  async getCost(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { nftAddress, addedMarkup } = payload.content

    let response = await this._getCost(account, nftAddress, addedMarkup).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )

    this.service.setStore({
      PlanManager_Cost: {
        nftAddress: nftAddress,
        cost: response,
      },
    })
    this.service.emit(PlanManagerEvents.CostReturned)

    return response
  }

  async _getCost(account, nftAddress, addedMarkup) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.planManager.abi,
          this.service.config.planManager.address
        )

        let markup = await contract.methods
          .markup()
          .call({ from: account.address })

        markup = markup + addedMarkup

        let nftCoverPrice = await contract.methods
          .nftCoverPrice(nftAddress)
          .call({ from: account.address })

        let cost = (parseFloat(nftCoverPrice) * parseFloat(markup)) / 100

        resolve(cost)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
}

export default PlanManagerContract
