import Web3 from 'web3'
import {
  ERROR,
  SNACKBAR_ERROR,
  SNACKBAR_MESSAGE,
  SNACKBAR_TRANSACTION_CONFIRMED,
  SNACKBAR_TRANSACTION_RECEIPT,
} from '../../constants'
import IbcoContract from './ibcoContract'
import BalanceManagerContract from './balanceManagerContract'
import PlanManagerContract from './planManagerContract'
import RewardManagerContract from './rewardManagerContract'
import StakeManagerContract from './stakeManagerContract'
import ArNFTContract from './arNFTContract'
import ClaimManagerContract from './claimManagerContract'
import { RewardManagerEvents } from './rewardManagerEvents'
import ArNXMVaultContract from './arNXMVaultContract'
import WNXMContract from './wNXMContract'
import ArNXMTokenContract from './arNXMTokenContract'
import LpFarmContract from './lpFarmContract'
import LpTokenContract from './lpTokenContract'
import NXMContract from './NXMContract'
import { ArNXMVaultEvents as ArNxmVaultEvents } from './arNXMVaultEvents'
import { WNXMEvents } from './wNXMEvents'
import { ArNXMTokenEvents } from './arNXMTokenEvents'
import { NXMEvents } from './NXMEvents'
import BaseFarmContract from './baseFarming/baseFarmContract'
import BaseTokenContract from './baseFarming/baseTokenContract'
import cnf from '../../config/cnf'
import ArmorMasterContract from './armorMaster/armorMasterContract'
import ArmorTokenContract from './armorToken/armorTokenContract'
import NexusMutualStakingContract from './nexusMutualStakingContract'
import ReferralRewardsContract from './referralRewardsContract'
import axios from 'axios'
import ArShieldsContract from './arShields/arShieldsContract'
import ArShieldsCoverageBaseContract from './arShieldsCoverageBase/arShieldsCoverageBaseContract'
import ArShieldsOracleContract from './arShieldsOracle/arShieldsOracleContract'
import Erc20Contract from './erc20/erc20Contract'
import ArShieldControllerContract from './arShieldController/arShieldControllerContract'

class ContractService {
  constructor(config, store, emitter, dispatcher) {
    this.store = store
    this.emitter = emitter
    this.dispatcher = dispatcher
    this.config = config
    this.maxGasLimit = 10000000
    this.maxGasLimitErrorMessage =
      'Transaction will fail because of excessive gas limits'

    // core
    const arNFTContract = new ArNFTContract(this)
    const ibcoContract = new IbcoContract(this)
    const balanceManagerContract = new BalanceManagerContract(this)
    const planManagerContract = new PlanManagerContract(this)
    const rewardManagerContract = new RewardManagerContract(this)
    const stakeManagerContract = new StakeManagerContract(this)
    const claimManagerContract = new ClaimManagerContract(this)
    const referralRewardsContract = new ReferralRewardsContract(this)

    // nxm
    const arNXMVaultContract = new ArNXMVaultContract(this)
    const wNXMContract = new WNXMContract(this)
    const arNXMTokenContract = new ArNXMTokenContract(this)
    const nxmContract = new NXMContract(this)
    const nexusMutualStakingContract = new NexusMutualStakingContract(this)

    // farming
    const lpFarmContract = new LpFarmContract(this)
    const lpTokenContract = new LpTokenContract(this)

    // armor
    const armorTokenContract = new ArmorTokenContract(this)
    const armorMasterContract = new ArmorMasterContract(this)

    // utilization farms
    const utilizationFarmBorrowersTokenContract = new BaseTokenContract(
      this,
      'utilizationFarmBorrowers_Token',
      cnf.ARMOR_TOKEN_ADDRESS
    )
    const utilizationFarmBorrowersFarmContract = new BaseFarmContract(
      this,
      'utilizationFarmBorrowers_Farm',
      cnf.UTILIZATION_FARM_BORROWERS_ADDRESS,
      utilizationFarmBorrowersTokenContract,
      cnf.ARMOR_TOKEN_ADDRESS
    )

    const utilizationFarmStakersTokenContract = new BaseTokenContract(
      this,
      'utilizationFarmStakers_Token',
      cnf.ARMOR_TOKEN_ADDRESS
    )
    const utilizationFarmStakersFarmContract = new BaseFarmContract(
      this,
      'utilizationFarmStakers_Farm',
      cnf.UTILIZATION_FARM_STAKERS_ADDRESS,
      utilizationFarmBorrowersTokenContract,
      cnf.ARMOR_TOKEN_ADDRESS
    )

    const arNXM_wNXM_Sushi_TokenContract = new BaseTokenContract(
      this,
      'ArNXM_wNXM_Sushi_Token',
      cnf.ARNXM_WNXM_SUSHI_TOKEN_ADDRESS
    )
    const arNXM_wNXM_Sushi_FarmContract = new BaseFarmContract(
      this,
      'ArNXM_wNXM_Sushi_Farm',
      cnf.ARNXM_WNXM_SUSHI_FARM_ADDRESS,
      arNXM_wNXM_Sushi_TokenContract,
      cnf.ARNXM_WNXM_SUSHI_TOKEN_ADDRESS
    )

    const arNXM_wNXM_Uni_TokenContract = new BaseTokenContract(
      this,
      'ArNXM_wNXM_Uni_Token',
      cnf.ARNXM_WNXM_UNI_TOKEN_ADDRESS
    )
    const arNXM_wNXM_Uni_FarmContract = new BaseFarmContract(
      this,
      'ArNXM_wNXM_Uni_Farm',
      cnf.ARNXM_WNXM_UNI_FARM_ADDRESS,
      arNXM_wNXM_Uni_TokenContract,
      cnf.ARNXM_WNXM_UNI_TOKEN_ADDRESS
    )

    const arNXM_ETH_Uni_TokenContract = new BaseTokenContract(
      this,
      'ArNXM_ETH_Uni_Token',
      cnf.ARNXM_ETH_UNI_TOKEN_ADDRESS
    )
    const arNXM_ETH_Uni_FarmContract = new BaseFarmContract(
      this,
      'ArNXM_ETH_Uni_Farm',
      cnf.ARNXM_ETH_UNI_FARM_ADDRESS,
      arNXM_ETH_Uni_TokenContract,
      cnf.ARNXM_ETH_UNI_TOKEN_ADDRESS
    )

    const arNXM_ETH_Sushi_TokenContract = new BaseTokenContract(
      this,
      'ArNXM_ETH_Sushi_Token',
      cnf.ARNXM_ETH_SUSHI_TOKEN_ADDRESS
    )
    const arNXM_ETH_Sushi_FarmContract = new BaseFarmContract(
      this,
      'ArNXM_ETH_Sushi_Farm',
      cnf.ARNXM_ETH_SUSHI_FARM_ADDRESS,
      arNXM_ETH_Sushi_TokenContract,
      cnf.ARNXM_ETH_SUSHI_TOKEN_ADDRESS
    )

    const arNXM_ETH_1inch_TokenContract = new BaseTokenContract(
      this,
      'ArNXM_ETH_1inch_Token',
      cnf.ARNXM_ETH_1INCH_TOKEN_ADDRESS
    )
    const arNXM_ETH_1inch_FarmContract = new BaseFarmContract(
      this,
      'ArNXM_ETH_1inch_Farm',
      cnf.ARNXM_ETH_1INCH_FARM_ADDRESS,
      arNXM_ETH_1inch_TokenContract,
      cnf.ARNXM_ETH_1INCH_TOKEN_ADDRESS
    )

    const arNXM_ETH_Bal_TokenContract = new BaseTokenContract(
      this,
      'ArNXM_ETH_Bal_Token',
      cnf.ARNXM_ETH_BAL_TOKEN_ADDRESS
    )
    const arNXM_ETH_Bal_FarmContract = new BaseFarmContract(
      this,
      'ArNXM_ETH_Bal_Farm',
      cnf.ARNXM_ETH_BAL_FARM_ADDRESS,
      arNXM_ETH_Bal_TokenContract,
      cnf.ARNXM_ETH_BAL_TOKEN_ADDRESS
    )

    const armor_ETH_Uni_TokenContract = new BaseTokenContract(
      this,
      'Armor_ETH_Uni_Token',
      cnf.ARMOR_ETH_UNI_TOKEN_ADDRESS
    )
    const armor_ETH_Uni_FarmContract = new BaseFarmContract(
      this,
      'Armor_ETH_Uni_Farm',
      cnf.ARMOR_ETH_UNI_FARM_ADDRESS,
      armor_ETH_Uni_TokenContract,
      cnf.ARMOR_ETH_UNI_TOKEN_ADDRESS
    )

    const armor_ETH_Sushi_TokenContract = new BaseTokenContract(
      this,
      'Armor_ETH_Sushi_Token',
      cnf.ARMOR_ETH_SUSHI_TOKEN_ADDRESS
    )
    const armor_ETH_Sushi_FarmContract = new BaseFarmContract(
      this,
      'Armor_ETH_Sushi_Farm',
      cnf.ARMOR_ETH_SUSHI_FARM_ADDRESS,
      armor_ETH_Sushi_TokenContract,
      cnf.ARMOR_ETH_SUSHI_TOKEN_ADDRESS
    )

    const armor_ETH_1inch_TokenContract = new BaseTokenContract(
      this,
      'Armor_ETH_1inch_Token',
      cnf.ARMOR_ETH_1INCH_TOKEN_ADDRESS
    )
    const armor_ETH_1inch_FarmContract = new BaseFarmContract(
      this,
      'Armor_ETH_1inch_Farm',
      cnf.ARMOR_ETH_1INCH_FARM_ADDRESS,
      armor_ETH_1inch_TokenContract,
      cnf.ARMOR_ETH_1INCH_TOKEN_ADDRESS
    )

    const armor_ETH_Bal_TokenContract = new BaseTokenContract(
      this,
      'Armor_ETH_Bal_Token',
      cnf.ARMOR_ETH_BAL_TOKEN_ADDRESS
    )
    const armor_ETH_Bal_FarmContract = new BaseFarmContract(
      this,
      'Armor_ETH_Bal_Farm',
      cnf.ARMOR_ETH_BAL_FARM_ADDRESS,
      armor_ETH_Bal_TokenContract,
      cnf.ARMOR_ETH_BAL_TOKEN_ADDRESS
    )

    const arnxm_ARMOR_Uni_TokenContract = new BaseTokenContract(
      this,
      'Arnxm_ARMOR_Uni_Token',
      cnf.ARNXM_ARMOR_UNI_TOKEN_ADDRESS
    )
    const arnxm_ARMOR_Uni_FarmContract = new BaseFarmContract(
      this,
      'Arnxm_ARMOR_Uni_Farm',
      cnf.ARNXM_ARMOR_UNI_FARM_ADDRESS,
      arnxm_ARMOR_Uni_TokenContract,
      cnf.ARNXM_ARMOR_UNI_TOKEN_ADDRESS
    )

    const armor_DAI_Uni_TokenContract = new BaseTokenContract(
      this,
      'Armor_DAI_Uni_Token',
      cnf.ARMOR_DAI_UNI_TOKEN_ADDRESS
    )
    const armor_DAI_Uni_FarmContract = new BaseFarmContract(
      this,
      'Armor_DAI_Uni_Farm',
      cnf.ARMOR_DAI_UNI_FARM_ADDRESS,
      armor_DAI_Uni_TokenContract,
      cnf.ARMOR_DAI_UNI_TOKEN_ADDRESS
    )

    const armor_DAI_Sushi_TokenContract = new BaseTokenContract(
      this,
      'Armor_DAI_Sushi_Token',
      cnf.ARMOR_DAI_SUSHI_TOKEN_ADDRESS
    )
    const armor_DAI_Sushi_FarmContract = new BaseFarmContract(
      this,
      'Armor_DAI_Sushi_Farm',
      cnf.ARMOR_DAI_SUSHI_FARM_ADDRESS,
      armor_DAI_Sushi_TokenContract,
      cnf.ARMOR_DAI_SUSHI_TOKEN_ADDRESS
    )

    const armor_DAI_1inch_TokenContract = new BaseTokenContract(
      this,
      'Armor_DAI_1inch_Token',
      cnf.ARMOR_DAI_1INCH_TOKEN_ADDRESS
    )
    const armor_DAI_1inch_FarmContract = new BaseFarmContract(
      this,
      'Armor_DAI_1inch_Farm',
      cnf.ARMOR_DAI_1INCH_FARM_ADDRESS,
      armor_DAI_1inch_TokenContract,
      cnf.ARMOR_DAI_1INCH_TOKEN_ADDRESS
    )

    const armor_DAI_Bal_TokenContract = new BaseTokenContract(
      this,
      'Armor_DAI_Bal_Token',
      cnf.ARMOR_DAI_BAL_TOKEN_ADDRESS
    )
    const armor_DAI_Bal_FarmContract = new BaseFarmContract(
      this,
      'Armor_DAI_Bal_Farm',
      cnf.ARMOR_DAI_BAL_FARM_ADDRESS,
      armor_DAI_Bal_TokenContract,
      cnf.ARMOR_DAI_BAL_TOKEN_ADDRESS
    )

    const armor_WBTC_Uni_TokenContract = new BaseTokenContract(
      this,
      'Armor_WBTC_Uni_Token',
      cnf.ARMOR_WBTC_UNI_TOKEN_ADDRESS
    )
    const armor_WBTC_Uni_FarmContract = new BaseFarmContract(
      this,
      'Armor_WBTC_Uni_Farm',
      cnf.ARMOR_WBTC_UNI_FARM_ADDRESS,
      armor_WBTC_Uni_TokenContract,
      cnf.ARMOR_WBTC_UNI_TOKEN_ADDRESS
    )

    const armor_WBTC_Sushi_TokenContract = new BaseTokenContract(
      this,
      'Armor_WBTC_Sushi_Token',
      cnf.ARMOR_WBTC_SUSHI_TOKEN_ADDRESS
    )
    const armor_WBTC_Sushi_FarmContract = new BaseFarmContract(
      this,
      'Armor_WBTC_Sushi_Farm',
      cnf.ARMOR_WBTC_SUSHI_FARM_ADDRESS,
      armor_WBTC_Sushi_TokenContract,
      cnf.ARMOR_WBTC_SUSHI_TOKEN_ADDRESS
    )

    const armor_WBTC_1inch_TokenContract = new BaseTokenContract(
      this,
      'Armor_WBTC_1inch_Token',
      cnf.ARMOR_WBTC_1INCH_TOKEN_ADDRESS
    )
    const armor_WBTC_1inch_FarmContract = new BaseFarmContract(
      this,
      'Armor_WBTC_1inch_Farm',
      cnf.ARMOR_WBTC_1INCH_FARM_ADDRESS,
      armor_WBTC_1inch_TokenContract,
      cnf.ARMOR_WBTC_1INCH_TOKEN_ADDRESS
    )

    this.contracts = {
      // core
      arNFT: arNFTContract,
      ibco: ibcoContract,
      balanceManager: balanceManagerContract,
      planManager: planManagerContract,
      rewardManager: rewardManagerContract,
      stakeManager: stakeManagerContract,
      claimManager: claimManagerContract,
      referralRewards: referralRewardsContract,

      // nxm
      arNXMVault: arNXMVaultContract,
      wNXM: wNXMContract,
      arNXMToken: arNXMTokenContract,
      NXM: nxmContract,
      nexusMutualStaking: nexusMutualStakingContract,
      // farming
      lpFarm: lpFarmContract,
      lpToken: lpTokenContract,
      // armor
      armorToken: armorTokenContract,
      armorMaster: armorMasterContract,

      // utilization farms
      utilizationFarmBorrowers_Farm: utilizationFarmBorrowersFarmContract,
      utilizationFarmBorrowers_Token: utilizationFarmBorrowersTokenContract,

      utilizationFarmStakers_Farm: utilizationFarmStakersFarmContract,
      utilizationFarmStakers_Token: utilizationFarmStakersTokenContract,

      // rewards arNXM->wNXM
      arNXM_wNXM_Uni_Farm: arNXM_wNXM_Uni_FarmContract,
      arNXM_wNXM_Uni_Token: arNXM_wNXM_Uni_TokenContract,
      arNXM_wNXM_Sushi_Farm: arNXM_wNXM_Sushi_FarmContract,
      arNXM_wNXM_Sushi_Token: arNXM_wNXM_Sushi_TokenContract,

      // rewards arNXM->ETH
      arNXM_ETH_Uni_Farm: arNXM_ETH_Uni_FarmContract,
      arNXM_ETH_Uni_Token: arNXM_ETH_Uni_TokenContract,
      arNXM_ETH_Sushi_Farm: arNXM_ETH_Sushi_FarmContract,
      arNXM_ETH_Sushi_Token: arNXM_ETH_Sushi_TokenContract,
      arNXM_ETH_1inch_Farm: arNXM_ETH_1inch_FarmContract,
      arNXM_ETH_1inch_Token: arNXM_ETH_1inch_TokenContract,
      arNXM_ETH_Bal_Farm: arNXM_ETH_Bal_FarmContract,
      arNXM_ETH_Bal_Token: arNXM_ETH_Bal_TokenContract,

      // rewards ARMOR->ETH
      armor_ETH_Uni_Farm: armor_ETH_Uni_FarmContract,
      armor_ETH_Uni_Token: armor_ETH_Uni_TokenContract,
      armor_ETH_Sushi_Farm: armor_ETH_Sushi_FarmContract,
      armor_ETH_Sushi_Token: armor_ETH_Sushi_TokenContract,
      armor_ETH_1inch_Farm: armor_ETH_1inch_FarmContract,
      armor_ETH_1inch_Token: armor_ETH_1inch_TokenContract,
      armor_ETH_Bal_Farm: armor_ETH_Bal_FarmContract,
      armor_ETH_Bal_Token: armor_ETH_Bal_TokenContract,

      // rewards arNXM->ARMOR
      arnxm_ARMOR_Uni_Farm: arnxm_ARMOR_Uni_FarmContract,
      arnxm_ARMOR_Uni_Token: arnxm_ARMOR_Uni_TokenContract,

      // rewards ARMOR->ETH
      armor_DAI_Uni_Farm: armor_DAI_Uni_FarmContract,
      armor_DAI_Uni_Token: armor_DAI_Uni_TokenContract,
      armor_DAI_Sushi_Farm: armor_DAI_Sushi_FarmContract,
      armor_DAI_Sushi_Token: armor_DAI_Sushi_TokenContract,
      armor_DAI_1inch_Farm: armor_DAI_1inch_FarmContract,
      armor_DAI_1inch_Token: armor_DAI_1inch_TokenContract,
      armor_DAI_Bal_Farm: armor_DAI_Bal_FarmContract,
      armor_DAI_Bal_Token: armor_DAI_Bal_TokenContract,

      // rewards ARMOR->ETH
      armor_WBTC_Uni_Farm: armor_WBTC_Uni_FarmContract,
      armor_WBTC_Uni_Token: armor_WBTC_Uni_TokenContract,
      armor_WBTC_Sushi_Farm: armor_WBTC_Sushi_FarmContract,
      armor_WBTC_Sushi_Token: armor_WBTC_Sushi_TokenContract,
      armor_WBTC_1inch_Farm: armor_WBTC_1inch_FarmContract,
      armor_WBTC_1inch_Token: armor_WBTC_1inch_TokenContract,

      // arshield
      arShieldController: new ArShieldControllerContract(this),
    }

    this.addShieldsIntoContractsObject()
  }

  addShieldsIntoContractsObject() {
    let shields = {}
    Object.keys(cnf.SHIELDS).forEach((protocol, i) => {
      Object.keys(cnf.SHIELDS[protocol]).forEach((key, j) => {
        switch (key) {
          case 'config':
            this.contracts[`ArShield.${protocol}.CoverageBase`] =
              new ArShieldsCoverageBaseContract(
                this,
                `ArShield.${protocol}.CoverageBase`,
                cnf.SHIELDS[protocol][key].coverageBaseAddress
              )

            this.contracts[`ArShield.${protocol}.Oracle`] =
              new ArShieldsOracleContract(
                this,
                `ArShield.${protocol}.Oracle`,
                cnf.SHIELDS[protocol][key].oracleAddress
              )
            return
          case 'shields':
            console.log('keys', Object.keys(cnf.SHIELDS[protocol][key]))
            Object.keys(cnf.SHIELDS[protocol][key]).forEach((shield, j) => {
              shields[protocol] = {}
              this.contracts[`ArShield.${protocol}.${shield}`] =
                new ArShieldsContract(
                  this,
                  `ArShield.${protocol}.${shield}`,
                  cnf.SHIELDS[protocol].shields[shield]['shieldAddress'],
                  cnf.SHIELDS[protocol].shields[shield][
                    'underlyingTokenAddress'
                  ],
                  cnf.SHIELDS[protocol].shields[shield]['armorTokenAddress']
                )
            })
        }
      })
    })

    return shields
  }

  async getWeb3() {
    return this._getProvider()
  }

  getAccount() {
    return this.getStore('account')
  }

  getReferrer() {
    return this.getStore('referrer')
  }

  async getGasPrice() {
    try {
      const gasPriceType = this.getStore('gasPriceType') || 'standard' // fallback to standard
      const priceJSON = (
        await axios(`${this.config.backendUrl}/api/gas-prices`)
      ).data.gas
      if (priceJSON) {
        return priceJSON[gasPriceType].toFixed(0)
      }
      return this.getStore('universalGasPrice')
    } catch (e) {
      return this.getStore('universalGasPrice')
    }
  }

  emitError(err) {
    this.emitter.emit(ERROR, err)
    this.emitter.emit(SNACKBAR_ERROR, err)
  }

  emit(event) {
    this.emitter.emit(event)
  }

  setStore(event) {
    this.store.setStore(event)
  }

  getStore(event) {
    return this.store.getStore(event)
  }

  getRef(event) {
    return this.store.getRef(event)
  }

  makeContract(web3, abi, address) {
    return new web3.eth.Contract(abi, address)
  }

  async handleTransactionHash(hash, callback) {
    this.emitter.emit(SNACKBAR_TRANSACTION_RECEIPT, hash)
  }

  async handleReceipt(receipt) {
    this.emitter.emit(SNACKBAR_TRANSACTION_RECEIPT, receipt.transactionHash)
  }

  async handleConfirmation(confirmationNumber, receipt) {
    if (confirmationNumber === 2) {
      this.emitter.emit(SNACKBAR_TRANSACTION_CONFIRMED, receipt.transactionHash)
    }
  }

  shouldDispatch(contractEventClass, payload) {
    for (const [key, event] of Object.entries(contractEventClass)) {
      if (event === payload.type) {
        return true
      }
    }
    return false
  }

  async handleError(error) {
    if (!error.toString().includes('-32601')) {
      if (error.message) {
        return error.message
      }
      return error
    }
  }

  dispatchVaultEvents() {
    this.dispatcher.dispatch({
      type: ArNxmVaultEvents.GetWNxmValue,
      content: { amount: 1e18 },
    })
    this.dispatcher.dispatch({
      type: ArNxmVaultEvents.GetWithdrawableAssets,
      content: {},
    })
    this.dispatcher.dispatch({
      type: WNXMEvents.GetBalance,
      content: {},
    })
    this.dispatcher.dispatch({
      type: ArNXMTokenEvents.GetBalance,
      content: {},
    })
    this.dispatcher.dispatch({
      type: NXMEvents.GetBalance,
      content: {},
    })
  }

  _getProvider() {
    const web3context = this.store.getStore('web3context')
    if (!web3context) {
      return null
    }
    const provider = web3context.library.provider
    if (!provider) {
      return null
    }
    const web3 = new Web3(provider)
    return web3
  }
}

export default ContractService
