import { BalanceManagerEvents } from './balanceManagerEvents'
import { NexusMutualStakingEvents } from './nexusMutualStakingEvents'
import { ArNXMTokenEvents } from './arNXMTokenEvents'
import cnf from '../../config/cnf'

class NexusMutualStakingContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(NexusMutualStakingEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case NexusMutualStakingEvents.GetStakerContractsArray:
        await this.getStakerContractsArray(payload)
        break
      case NexusMutualStakingEvents.GetStakerContractStake:
        await this.getStakerContractsStake(payload)
        break
    }
  }

  async getStakerContractsArray(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let data = await this._handleGetStakerContractsArray(account).catch(
      (err) => {
        this.service.emitError(err)
        return 0
      }
    )
    this.service.setStore({ NexusMutualStaking_StakerContractsArray: data })
    this.service.emit(NexusMutualStakingEvents.StakerContractsArrayReturned)
    return data
  }

  async _handleGetStakerContractsArray(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.nexusMutualStaking.abi,
          this.service.config.nexusMutualStaking.address
        )

        let contracts = await contract.methods
          .stakerContractsArray(cnf.ARNXM_VAULT_ADDRESS)
          .call({ from: account.address })

        resolve(contracts)
      } catch (e) {
        reject(e)
      }
    })
  }

  async getStakerContractsStake(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }
    const { address } = payload

    let data = await this._handleGetStakerContractsStake(
      account,
      address
    ).catch((err) => {
      this.service.emitError(err)
      return 0
    })
    this.service.setStore({ NexusMutualStaking_StakerContractsStake: data })
    this.service.emit(NexusMutualStakingEvents.StakerContractStakeReturned)
    return data
  }

  async _handleGetStakerContractsStake(account, protocolAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.nexusMutualStaking.abi,
          this.service.config.nexusMutualStaking.address
        )

        let balance = await contract.methods
          .stakerContractStake(cnf.ARNXM_VAULT_ADDRESS, protocolAddress)
          .call({ from: account.address })

        resolve(web3.utils.fromWei(balance, 'ether'))
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default NexusMutualStakingContract
