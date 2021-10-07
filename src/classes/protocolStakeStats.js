import axios from 'axios'

export class ProtocolStakeStats {
  constructor(contractService) {
    this.contractService = contractService
    this.protocols = []
    this.whitelist = [
      'Uniswap V2',
      'SushiSwap',
      'BadgerDAO',
      'Aave V2',
      'Compound V2',
      'Curve All Pools (incl staking)',
      'yearn finance',
      'Balancer',
      'RenVM',
      'UMA',
      'Synthetix',
      '1Inch (DEX & Liquidity Pools)',
      'Pool Together V3',
      '0x V3',
      'Hegic',
      'dydx',
      'Alpha Homora',
      'Argent',
      'C.R.E.A.M.',
      'Perpetual Protocol',
      'Keeper DAO',
      'Bancor Network',
    ]
  }

  sortProtocols(arr) {
    let order = this.protocols

    return arr.sort((a, b) => {
      if (order.indexOf(a.name) === -1) return 1
      if (order.indexOf(b.name) === -1) return -1
      return order.indexOf(a.name) - order.indexOf(b.name)
    })
  }

  findProtocolByName(name) {
    let index = null
    Object.keys(this.protocols).forEach((p) => {
      if (this.protocols[p].name === name) {
        index = p
        return index
      }
    })

    return index != null ? this.protocols[index] : index
  }

  getTotalStakedAmount(protocol) {
    return new Promise((resolve, reject) => {
      this.contractService.contracts.nexusMutualStaking
        .getStakerContractsStake({ address: protocol })
        .then((stake) => resolve(stake))
        .catch((err) => reject(err))
    })
  }

  fetchNexusMututalContrats() {
    let self = this
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.nexusmutual.io/coverables/contracts.json`)
        .then((r) => {
          let contracts = []
          for (const address of Object.keys(r.data)) {
            if (!r.data[address].deprecated) {
              const contractData = r.data[address]
              delete r.data[address]
              if (this.whitelist.includes(contractData.name)) {
                if (
                  address.toLowerCase() ===
                  '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b'
                ) {
                  contracts[
                    '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'.toLowerCase()
                  ] = contractData
                } else {
                  contracts[address.toLowerCase()] = contractData
                }
              }
            }
          }

          self.protocols = contracts
          resolve(contracts)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }
}
