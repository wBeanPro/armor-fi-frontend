import BN, { toWei } from 'web3-utils'
import { logoMapper, fixTail, countDecimals } from '../helpers'
import axios from 'axios'

export default class PlanBuilder {
  constructor(nexusMutualProtocols) {
    this.nexusMutualProtocols = nexusMutualProtocols
    this.apiUrl = ''
    this.plan = []
  }

  hasProtocolByAddress(address) {
    return (
      Object.keys(this.nexusMutualProtocols).indexOf(address.toLowerCase()) >= 0
    )
  }

  getProtocolByAddress(address) {
    if (!this.hasProtocolByAddress(address)) {
      return null
    }

    return this.nexusMutualProtocols[address]
  }

  getProtocolContractAddress(address) {
    if (!this.hasProtocolByAddress(address)) {
      return null
    }

    return this.nexusMutualProtocols[address].addresses['contract']
  }

  getProtocolTokenAddress(address) {
    if (!this.hasProtocolByAddress(address)) {
      return null
    }

    return this.nexusMutualProtocols[address].addresses['token']
  }

  addProtocolCoverage(address, coverage) {
    if (!this.hasProtocolByAddress(address)) {
      throw 'nexus mutual contract not found'
    }
    if (!this.hasProtocolInPlan(address)) {
      throw 'coverage not found in plan'
    }

    const protocolIndex = this.findProtocolIndexInPlan(address)

    this.plan[protocolIndex].coverage.wei = (
      parseFloat(this.plan[protocolIndex].coverage.wei) + parseFloat(coverage)
    ).toString()
    this.plan[protocolIndex].coverage.eth = BN.fromWei(
      this.plan[protocolIndex].coverage.wei
    )

    const totalCovered = parseFloat(this.plan[protocolIndex].coverage.wei)
    const totalBalance = parseFloat(this.plan[protocolIndex].balance.wei)

    let percentage = 0
    if (coverage.toString() === '0') {
      percentage = 100
    } else {
      percentage = (totalCovered / totalBalance) * 100
    }

    this.plan[protocolIndex].coverage.percentage = percentage.toString()

    return this.plan[protocolIndex]
  }

  setProtocolCoverage(address, coverage) {
    if (!this.hasProtocolByAddress(address)) {
      throw 'nexus mutual contract not found'
    }
    if (!this.hasProtocolInPlan(address)) {
      throw 'coverage not found in plan'
    }

    const protocolIndex = this.findProtocolIndexInPlan(address)

    this.plan[protocolIndex].coverage.eth = BN.fromWei(coverage.toString())
    this.plan[protocolIndex].coverage.wei = coverage.toString()

    const totalCovered = parseFloat(this.plan[protocolIndex].coverage.wei)
    const totalBalance = parseFloat(this.plan[protocolIndex].balance.wei)

    let percentage = 0
    if (coverage.toString() === '0') {
      percentage = 100
    } else {
      percentage = (totalCovered / totalBalance) * 100
    }

    this.plan[protocolIndex].coverage.percentage = percentage.toString()

    return this.plan[protocolIndex]
  }

  setBalance(address, balance) {
    if (!this.hasProtocolByAddress(address)) {
      throw 'nexus mutual contract not found'
    }
    if (!this.hasProtocolInPlan(address)) {
      throw 'coverage not found in plan'
    }

    const protocolIndex = this.findProtocolIndexInPlan(address)
    this.plan[protocolIndex].balance.eth = BN.fromWei(balance.toString())
    this.plan[protocolIndex].balance.wei = balance.toString()

    // set protocol coverage automatically because balance has changed
    this.setProtocolCoverage(address, this.plan[protocolIndex].coverage.wei)

    return this.plan[protocolIndex]
  }

  setProtocolAvailability(address, coverageLeft, totalStaked) {
    if (!this.hasProtocolByAddress(address)) {
      throw 'nexus mutual contract not found'
    }
    if (!this.hasProtocolInPlan(address)) {
      throw 'coverage not found in plan'
    }

    const protocolIndex = this.findProtocolIndexInPlan(address)
    const totalStakedFloat = parseFloat(BN.fromWei(totalStaked.toString()))
    const coverageLeftFloat = parseFloat(BN.fromWei(coverageLeft.toString()))

    let percentage = 0
    if (totalStakedFloat === 0) {
      percentage = 100
    } else {
      percentage = (coverageLeftFloat / totalStakedFloat) * 100
    }

    this.plan[protocolIndex].availability.eth = BN.fromWei(
      coverageLeft.toString()
    )
    this.plan[protocolIndex].availability.wei = coverageLeft.toString()
    this.plan[protocolIndex].availability.percentage = percentage.toString()

    return this.plan[protocolIndex]
  }

  setUsdValues(ethPrice) {
    if (this.plan.length === 0) {
      return false
    }

    for (let i = 0; i < this.plan.length; i++) {
      let ethBalance = this.plan[i].balance.eth
      let ethCoverage = this.plan[i].coverage.eth
      let ethAvailability = this.plan[i].availability.eth

      this.plan[i].balance.usd = (ethBalance * ethPrice).toString()
      this.plan[i].coverage.usd = (ethCoverage * ethPrice).toString()
      this.plan[i].availability.usd = (ethAvailability * ethPrice).toString()
    }

    return this
  }

  hasProtocolInPlan(address) {
    return this.findProtocolIndexInPlan(address) >= 0
  }

  findProtocolIndexInPlan(address) {
    return this.plan.findIndex((p) => p.address === address.toLowerCase())
  }

  addNewCoverageToPlan(
    protocolAddress,
    total,
    balance,
    isManual,
    detectedBalances
  ) {
    if (!this.hasProtocolByAddress(protocolAddress)) {
      return null
    }
    if (this.hasProtocolInPlan(protocolAddress)) {
      return this.setBalance(protocolAddress, balance)
    }
    if (!isManual) {
      isManual = false
    }

    if (!balance) {
      balance = 0
    }

    const protocol = this.getProtocolByAddress(protocolAddress)

    const coverage = {
      name: protocol['name'],
      address: protocolAddress,
      icon: logoMapper(protocol['name']),
      isManual: isManual,
      pricePerSecond: '0',
      balance: {
        total: total.toString(),
        usd: BN.fromWei('0'),
        eth: BN.fromWei(balance.toString()),
        wei: balance.toString(),
      },
      detectedBalances: detectedBalances
        ? detectedBalances
        : { total: 0, usd: 0, eth: 0 },
      coverage: {
        usd: BN.fromWei('0'),
        eth: BN.fromWei('0'),
        wei: BN.fromWei('0'),
        percentage: 0,
      },
      availability: {
        usd: BN.fromWei('0'),
        eth: BN.fromWei('0'),
        wei: BN.fromWei('0'),
        percentage: 0,
      },
    }
    this.plan.push(coverage)

    return coverage
  }

  clearCoveragesFromPlans() {
    this.plan.forEach((plan, index) => {
      this.plan[index].coverage = {
        total: '0',
        usd: '0',
        eth: '0',
        wei: '0',
      }
    })
  }

  removeInvalidPlans() {
    this.plan = this.plan.filter(
      (p) =>
        p.isManual ||
        !(!p.isManual && p.balance.total == 0 && p.coverage.wei == 0)
    )

    let cleanedPlans = []
    this.plan.forEach((p) => {
      if (p.balance.eth < 0.05 && p.coverage.wei == 0) {
        return
      }
      cleanedPlans.push(p)
    })
    this.plan = cleanedPlans
  }

  addNewCoveragePlansFromArray(protocols, isManual) {
    if (protocols == null) {
      return
    }

    protocols.forEach((p) => {
      let protocolAddress = p.addresses['contract'].toLowerCase()
      if (!this.hasProtocolByAddress(protocolAddress)) {
        return null
      }

      let decimals = countDecimals(p.balances['eth'].toString())
      let weiValue = 0
      if (decimals > 18) {
        weiValue = toWei(
          parseFloat(p.balances['eth'].toString()).toFixed(18),
          'ether'
        )
      } else {
        weiValue = toWei(p.balances['eth'].toString(), 'ether')
      }

      this.addNewCoverageToPlan(
        protocolAddress,
        p.balances['total'].toString(),
        weiValue,
        isManual ? isManual : p.is_manual,
        p.detected_balances
      )
    })
  }

  fetchProtocolBalancesFromZapperAPI(address) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiUrl}/api/plan?address=${address}`)
        .then((r) => {
          resolve(r.data.tokens)
        })
        .catch((err) => reject(err))
    })
  }

  getListOfProtocolAddresses() {
    return this.plan.map((p) => p.address)
  }

  getCurrentPlan() {
    return this.plan
  }

  // merge manual inputs and zapper assets together
  // rotate through protocols to apply coverage values and percentages
  // rotate through protocols to apply availability and percentages
  // fetch the price of ethereum
  // apply the usd values after all calculations are done
}
