import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Store from '../../stores/store'
import TopUpModal from './topUpModal/TopUpModal'
import WithdrawModal from './withdrawModal/WithdrawModal'
import ConfirmCoverModal from './confirmCoverModal/ConfirmCoverModal'
import EditNotCoveredModal from './editNotCoveredModal/EditNotCoveredModal'
import EditCoveredModal from './editCoveredModal/EditCoveredModal'
import { withTheme } from 'styled-components'
import { toWei } from 'web3-utils'
import Tooltip from '@material-ui/core/Tooltip'
import {
  ACCOUNT_BALANCES_RETURNED,
  AVAILABLE_COVERAGE_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
  ETH_PRICE_RETURNED,
  GET_ACCOUNT_BALANCES,
  GET_AVAILABLE_COVERAGE,
  GET_ETH_PRICE,
  GET_ARMOR_PRICE,
  ARMOR_PRICE_RETURNED,
  UPDATE_MANUAL_INPUTS,
  UPDATE_MANUAL_INPUTS_COMPLETED,
} from '../../constants'
import { BalanceManagerEvents } from '../../stores/contracts/balanceManagerEvents'
import { PlanManagerEvents } from '../../stores/contracts/planManagerEvents'
import {
  Description,
  ModalWrapper,
  ActionButton,
  ButtonText,
  SwitchWrapper,
  ToggleSwitchButton,
} from './styled'
import { ArNFTEvents } from '../../stores/contracts/arNFTEvents'
import { removeEmitterListeners, turnOnEmitterListeners } from '../../helpers'
import BaseUtilizationFarmingCombined from '../baseFarm/BaseUtilizationFarmingCombined'
import { StakeManagerEvents } from '../../stores/contracts/stakeManagerEvents'
import moment from 'moment'
import WalletDisconnected from './walletDisconnected/WalletDisconnected'
import WalletAnalyzing from './walletAnalyzing/WalletAnalyzing'
import CoverAssets from './coverAssets/CoverAssets'
import AssetsToCover from './assetsToCover/AssetsToCover'
import CoveredAssets from './coveredAssets/CoveredAssets'
import CancelCoverModal from './cancelCoverModal/CancelCoverModal'
import Container from '../common/container/Container'
import { Title } from '../common/Title'
import cnf from '../../config/cnf'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const Protect = ({ theme, network, isWalletConnected, t }) => {
  const currentlyUpdating = useRef(false)
  const coversToUpdateArr = useRef([])
  const isRemovingLocalStorage = useRef(false)
  const activeCoversToUpdateArr = useRef([])
  const [covers, setCovers] = useState([])
  const [manuallyAddedProtocols, setManuallyAddedProtocols] = useState([])
  const [overviewDataArr, setOverviewData] = useState([])
  const [currentPlans, setCurrentPlans] = useState([])
  const [totals, setTotals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingAssets, setIsLoadingAssets] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState(999999999999)
  const [account, setAccount] = useState(null)
  const [accountBalances, setAccountBalances] = useState(null)
  const [balanceManagerBalance, setBalanceManagerBalance] = useState(null)
  const [ethBalance, setEthBalance] = useState(0)
  const [assetObject, setAssetObject] = useState(null)
  const [asset, setAsset] = useState('eth')
  const [ethPrice, setEthPrice] = useState(0)
  const [armorPrice, setArmorPrice] = useState(0)
  const [availableCoverage, setAvailableCoverage] = useState([])
  const [startAndEndOfPlan, setStartAndEndOfPlan] = useState([0, 0])
  const [pricePerSecond, setPricePerSecond] = useState(0)
  const [currentLoadingText, setCurrentLoadingText] = useState(null)
  const [pricePerMonth, setPricePerMonth] = useState(0)
  const [isTopUpModalOpened, setIsTopUpModalOpened] = useState(false)
  const [isTopUpConfirmationModalOpened, setIsTopUpConfirmationModalOpened] =
    useState(false)
  const [isCancelModalOpened, setIsCancelModalOpened] = useState(false)
  const [isEditNotCoveredModalOpened, setIsEditNotCoveredModalOpened] =
    useState(false)
  const [isEditCoveredModalOpened, setIsEditCoveredModalOpened] =
    useState(false)
  const [editManuallyAddedValue, setEditManuallyAddedValue] = useState(null)
  const [isWithdrawModalOpened, setIsWithdrawModalOpened] = useState(false)
  const [showUpdateWarning, setShowUpdateWarning] = useState(false)
  const [, setForceUpdate] = useState(Date.now())
  const [coverConfirmationArr, setCoverConfirmationArr] = useState([])
  const [cancelCoverArr, setCancelCoverArr] = useState([])
  const [isUsdPrimary, setIsUsdPrimary] = useState(
    !!localStorage.getItem('armor-website-usd-primary')
  )

  const { colors } = theme

  function getStoredProtocolsFromLocalStorage() {
    const _storedProtocolsStr =
      localStorage.getItem('armor-website-manual-protocols') || '[]'

    try {
      return JSON.parse(_storedProtocolsStr)
    } catch (e) {
      return []
    }
  }

  function getStoredEditedZapperValuesFromLocalStorage() {
    const _storedProtocolsStr =
      localStorage.getItem('armor-website-edited-zapper-values') || '[]'

    try {
      return JSON.parse(_storedProtocolsStr)
    } catch (e) {
      return []
    }
  }

  function dispatchUpdateEvents() {
    dispatcher.dispatch({ type: GET_ACCOUNT_BALANCES, content: {} })
    dispatcher.dispatch({
      type: BalanceManagerEvents.GetBalance,
      content: {},
    })
    dispatcher.dispatch({
      type: BalanceManagerEvents.GetPricePerSecond,
      content: {},
    })
    dispatcher.dispatch({
      type: BalanceManagerEvents.GetLastUpdateTime,
      content: {},
    })
    dispatcher.dispatch({
      type: PlanManagerEvents.GetCurrentPlans,
      content: {
        manuallyAdded: getStoredProtocolsFromLocalStorage(),
      },
    })
    dispatcher.dispatch({
      type: GET_ETH_PRICE,
      content: {},
    })
    dispatcher.dispatch({
      type: GET_ARMOR_PRICE,
      content: {},
    })
    dispatcher.dispatch({
      type: GET_AVAILABLE_COVERAGE,
      content: {},
    })
    dispatcher.dispatch({
      type: PlanManagerEvents.GetPlanStartAndEnd,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNFTEvents.GetTokens,
      content: {},
    })
  }

  useEffect(() => {
    if (isWalletConnected) {
      setIsLoading(true)
      const _account = store.getStore('account')
      setAccount(_account)

      const _accountBalances = store.getStore('balances')
      setAccountBalances(_accountBalances)

      if (_accountBalances && _accountBalances.length > 0) {
        const returned = _accountBalances.filter((bal) => bal.id === asset)
        setAssetObject(returned[0] || null)
      }

      if (_account && _account.address) {
        updateOldManualInputs()
        dispatchUpdateEvents()
        setIsLoadingAssets(true)
      }

      let events = [
        [ERROR, errorReturned],
        [CONNECTION_CONNECTED, connectionConnected],
        [CONNECTION_DISCONNECTED, connectionDisconnected],
        [ACCOUNT_BALANCES_RETURNED, accountBalancesReturned],
        [ETH_PRICE_RETURNED, ethPriceReturned],
        [ARMOR_PRICE_RETURNED, armorPriceReturned],
        [AVAILABLE_COVERAGE_RETURNED, availableCoverageReturned],
        [UPDATE_MANUAL_INPUTS_COMPLETED, updateManualInputsCompleted],
        [PlanManagerEvents.CurrentPlansReturned, currentPlansReturned],
        [PlanManagerEvents.UpdatePlanCompleted, updatePlanCompleted],
        [PlanManagerEvents.PlanStartAndEndReturned, planStartAndEndReturned],
        [StakeManagerEvents.TotalAvailableReturned, totalAvailableReturned],
        [BalanceManagerEvents.BalanceReturned, balanceManagerBalanceReturned],
        [BalanceManagerEvents.PricePerSecondReturned, pricePerSecondReturned],
        [
          BalanceManagerEvents.DepositCompleted,
          depositToBalanceManagerReturned,
        ],
        [BalanceManagerEvents.LastUpdateTimeReturned, lastUpdateTimeReturned],
        [
          BalanceManagerEvents.WithdrawCompleted,
          withdrawToBalanceManagerReturned,
        ],
        [ArNFTEvents.TokensReturned, tokensReturned],
      ]
      turnOnEmitterListeners(emitter, events)

      return () => {
        removeEmitterListeners(emitter, events)
      }
    }
  }, [network, isWalletConnected])

  const updateOldManualInputs = () => {
    const _storedProtocols = getStoredProtocolsFromLocalStorage()
    if (_storedProtocols.length > 0) {
      let _updatePlans = []
      _storedProtocols.forEach((p) => {
        if (
          !_updatePlans.find(
            (x) => x.address === p.addresses.contract.toLowerCase()
          )
        ) {
          _updatePlans.push({
            address: p.addresses.contract.toLowerCase(),
            eth: p.balances.eth,
            wei: toWei(p.balances.eth),
          })
        }
      })
      isRemovingLocalStorage.current = true
      const _account = store.getStore('account')
      dispatcher.dispatch({
        type: UPDATE_MANUAL_INPUTS,
        content: {
          address: _account.address,
          protocols: _updatePlans,
        },
      })
    }
  }

  const tokensReturned = () => {
    const _tokens = store.getStore('ArNFT_Tokens')
  }

  const accountBalancesReturned = () => {
    const _accountBalances = store.getStore('balances')
    setAccountBalances(_accountBalances)
    const _ethBalance = _accountBalances.filter((b) => b.id === 'eth')[0]
      .balance
    setEthBalance(_ethBalance)
  }

  const ethPriceReturned = (price) => {
    setEthPrice(price)
  }

  const armorPriceReturned = (price) => {
    setArmorPrice(price)
  }

  const availableCoverageReturned = (coverage) => {
    setAvailableCoverage(coverage)
  }

  const updateManualInputsCompleted = () => {
    dispatcher.dispatch({
      type: PlanManagerEvents.GetCurrentPlans,
      content: {},
    })

    if (isRemovingLocalStorage.current) {
      isRemovingLocalStorage.current = false
      localStorage.removeItem('armor-website-manual-protocols')
      localStorage.removeItem('armor-website-edited-zapper-values')
    }
  }

  const totalAvailableReturned = () => {
    const { totals: _totals } = store.getStore('StakeManager_TotalAvailable')
    setTotals(_totals)
  }

  const balanceManagerBalanceReturned = () => {
    const _balance = store.getStore('BalanceManager_Balance')
    setBalanceManagerBalance(parseFloat(_balance).toFixed(3))
  }

  const planStartAndEndReturned = () => {
    const _startEnd = store.getStore('PlanManager_StartAndEnd')
    setStartAndEndOfPlan(_startEnd)
  }

  const pricePerSecondReturned = () => {
    const _perSecond = store.getStore('BalanceManager_PricePerSecond')

    setPricePerSecond(_perSecond)
    setPricePerMonth(_perSecond * 2592000)
  }

  const currentPlansReturned = async () => {
    const _plans = store.getStore('PlanManager_CurrentPlans')

    //setCurrentPlans(_storedProtocols || [])
    setOverviewData(_plans)
    setCovers(_plans)
    setShowUpdateWarning(false)
    setIsLoadingAssets(false)
    setIsLoading(false)
  }

  const updatePlanCompleted = (data) => {
    setIsUpdating(false)
    currentlyUpdating.current = false
    coversToUpdateArr.current = []
    activeCoversToUpdateArr.current = []
    setCurrentLoadingText(null)
    dispatchUpdateEvents()
    if (data.withdrawAll) {
      handleWithdrawSubmit({ amount: balanceManagerBalance })
    }
  }

  const depositToBalanceManagerReturned = () => {
    setIsDepositing(false)
    if (currentlyUpdating.current) {
      setCurrentLoadingText(t('Protect.Loading.UpdatingPlan'))
      const [_protocols, _amounts] = getNewCoverageValues(
        activeCoversToUpdateArr.current,
        coversToUpdateArr.current
      )
      dispatcher.dispatch({
        type: PlanManagerEvents.UpdatePlan,
        content: {
          protocols: _protocols,
          coverAmounts: _amounts,
        },
      })
      return
    }

    setCurrentLoadingText(null)
    setIsLoading(false)
  }

  const lastUpdateTimeReturned = () => {
    const lastUpdate = store.getStore('BalanceManager_LastUpdateTime')
    setLastUpdateTime(lastUpdate)
  }

  const withdrawToBalanceManagerReturned = () => {
    setIsWithdrawing(false)
    setIsLoading(false)
    setCurrentLoadingText(null)
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    setAccount(_account)
    if (_account && _account.address) {
      dispatcher.dispatch({ type: GET_ACCOUNT_BALANCES, content: {} })
      dispatcher.dispatch({
        type: BalanceManagerEvents.GetBalance,
        content: {},
      })
    }
  }

  const connectionDisconnected = () => setAccount(null)

  const errorReturned = (error) => {
    setIsLoadingAssets(false)
    setIsLoading(false)
    setIsUpdating(false)
  }

  // BUTTON EVENT HANDLERS
  const onUpdatePlan = () => {
    let _protocols = []
    let _amounts = []
    const activeCovers = coveredAssets

    activeCovers.forEach((p) => {
      _protocols.push(p.address)
      _amounts.push(p.coverage.wei)
    })

    coverConfirmationArr.forEach((p) => {
      if (p.coverage.wei > 0) {
        _protocols.push(p.address)
        _amounts.push(p.coverage.wei)
      }
    })
  }

  const getNewCoverageValues = (activeArr, arr) => {
    let _protocols = []
    let _amounts = []

    activeArr.forEach((p) => {
      _protocols.push(p.address)
      _amounts.push(p.coverage.wei)
    })

    arr.forEach((p) => {
      if (parseFloat(p.balance.wei) > 0) {
        _protocols.push(p.address)
        _amounts.push(p.balance.wei)
      }
    })

    return [_protocols, _amounts]
  }

  const onUpdateSelectedPlan = (assets, cost) => {
    const activeCovers = coveredAssets
    const [_protocols, _amounts] = getNewCoverageValues(
      activeCovers,
      coverConfirmationArr
    )

    setIsLoading(true)
    setIsUpdating(true)
    currentlyUpdating.current = true
    //let difference = parseFloat(cost) - balanceManagerBalance
    // check if top up is needed
    if (cost) {
      setIsDepositing(true)
      // need refs here
      coversToUpdateArr.current = coverConfirmationArr
      activeCoversToUpdateArr.current = activeCovers

      setCurrentLoadingText(t('Protect.Loading.ToppingUp'))

      dispatcher.dispatch({
        type: BalanceManagerEvents.Deposit,
        content: { amount: cost.toString() },
      })
      return
    }

    setCurrentLoadingText(t('Protect.Loading.UpdatingPlan'))
    dispatcher.dispatch({
      type: PlanManagerEvents.UpdatePlan,
      content: {
        protocols: _protocols,
        coverAmounts: _amounts,
      },
    })
  }

  const isFullyCovered = () => {
    let activeCovers = coveredAssets
    if (activeCovers.length === 0) return false
    let totalCovered = 0
    activeCovers.forEach((c) => {
      if (c.coverage.percentage >= 100) {
        totalCovered++
      }
    })

    return totalCovered === activeCovers.length
  }

  const onCancelSelected = () => {
    let _protocols = []
    let _amounts = []
    const activeCovers = coveredAssets

    activeCovers.forEach((p) => {
      _protocols.push(p.address)
      _amounts.push(p.coverage.wei)
    })

    cancelCoverArr.forEach((c, i) => {
      let pIndex = _protocols.findIndex(
        (p) => p.toLowerCase() === c.address.toLowerCase()
      )
      _amounts[pIndex] = '0'
    })

    setCurrentLoadingText(t('Protect.Loading.Cancelling'))
    setIsLoading(true)
    setIsUpdating(true)
    dispatcher.dispatch({
      type: PlanManagerEvents.UpdatePlan,
      content: {
        protocols: _protocols,
        coverAmounts: _amounts,
      },
    })
  }

  const onCancelAndWithdrawAll = () => {
    let _protocols = []
    let _amounts = []
    const activeCovers = coveredAssets

    activeCovers.forEach((p) => {
      _protocols.push(p.address)
      _amounts.push('0')
    })

    setCurrentLoadingText(t('Protect.Loading.Cancelling'))
    setIsLoading(true)
    setIsUpdating(true)
    dispatcher.dispatch({
      type: PlanManagerEvents.UpdatePlan,
      content: {
        protocols: _protocols,
        coverAmounts: _amounts,
        withdrawAll: true,
      },
    })
  }

  const handleOpenTopupModal = () => {
    setIsTopUpModalOpened(true)
  }

  const handleCloseTopUpModal = () => {
    setIsTopUpModalOpened(false)
  }

  const handleOpenCoverConfirmationModal = () => {
    setIsTopUpConfirmationModalOpened(true)
  }

  const handleCloseCoverConfirmationModal = () => {
    setIsTopUpConfirmationModalOpened(false)
  }

  const handleOpenCancelCoverModal = () => {
    setIsCancelModalOpened(true)
  }

  const handleCloseCancelCoverModal = () => {
    setIsCancelModalOpened(false)
  }

  const handleTopUpModalSubmit = (data) => {
    setIsLoading(true)
    setIsDepositing(true)
    setCurrentLoadingText(t('Protect.Loading.ToppingUp'))
    dispatcher.dispatch({
      type: BalanceManagerEvents.Deposit,
      content: { amount: data.amount },
    })
  }

  const handleOpenWithdrawModal = () => {
    if (lastUpdateTime > moment.utc().subtract(1, 'hours').unix()) {
      alert('You must wait an hour after your last update to withdraw.')
      return true
    }

    setIsWithdrawModalOpened(true)
  }

  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpened(false)
  }

  const handleWithdrawSubmit = (data) => {
    setIsLoading(true)
    setIsWithdrawing(true)

    setCurrentLoadingText(t('Protect.Loading.Withdrawing'))
    dispatcher.dispatch({
      type: BalanceManagerEvents.Withdraw,
      content: { amount: data.amount },
    })
  }

  const handleOpenEditNotCoveredModal = () => {
    setIsEditNotCoveredModalOpened(true)
  }

  const handleOpenEditCoveredModal = () => {
    setIsEditCoveredModalOpened(true)
  }

  const handleCloseNotCoveredModal = () => {
    setIsEditNotCoveredModalOpened(false)
  }

  const handleCloseCoveredModal = () => {
    setIsEditCoveredModalOpened(false)
  }

  const handleEditModalSubmit = (newAmount) => {
    dispatcher.dispatch({
      type: UPDATE_MANUAL_INPUTS,
      content: {
        address: account.address,
        protocols: [
          {
            address: editManuallyAddedValue.address.toLowerCase(),
            eth: newAmount,
            wei: toWei(newAmount),
          },
        ],
      },
    })

    setIsLoading(true)
    setCurrentLoadingText(t('Protect.Loading.ApplyingChanges'))
  }

  const hasEnoughBalance = () => {
    return balanceManagerBalance > 0
  }

  const handleCoverArr = (arr) => {
    handleOpenCoverConfirmationModal(true)
    setCoverConfirmationArr(arr)
  }

  const handleDeleteArr = (arr) => {
    let _removeProtocols = []

    arr.forEach((a) => {
      _removeProtocols.push({
        address: a.address.toLowerCase(),
        eth: 0,
        wei: 0,
      })
    })

    dispatcher.dispatch({
      type: UPDATE_MANUAL_INPUTS,
      content: {
        address: account.address,
        protocols: _removeProtocols,
      },
    })

    setIsLoading(true)
    setCurrentLoadingText(t('Protect.Loading.ApplyingChanges'))
    //
    // localStorage.setItem(
    //   'armor-website-manual-protocols',
    //   JSON.stringify(_newStored)
    // )

    // setIsLoading(true)
    // dispatcher.dispatch({
    //   type: PlanManagerEvents.GetCurrentPlans,
    //   content: {
    //     manuallyAdded: _newStored,
    //   },
    // })
  }

  const handleCancelCoverArr = (arr) => {
    handleOpenCancelCoverModal(true)
    setCancelCoverArr(arr)
  }

  const handleUpdateCoverArr = (arr) => {
    let _protocols = []
    let _amounts = []

    arr.forEach((p) => {
      _protocols.push(p.address)
      _amounts.push(p.balance.wei)
    })

    setIsLoading(true)
    setIsUpdating(true)
    setCurrentLoadingText(t('Protect.Loading.UpdatingPlan'))
    dispatcher.dispatch({
      type: PlanManagerEvents.UpdatePlan,
      content: {
        protocols: _protocols,
        coverAmounts: _amounts,
      },
    })
  }

  const handleUpdateSelectedCoverArr = (arr) => {
    let _protocols = []
    let _amounts = []
    const activeCovers = coveredAssets

    activeCovers.forEach((p) => {
      _protocols.push(p.address)
      _amounts.push(p.coverage.wei)
    })

    arr.forEach((c, i) => {
      let pIndex = _protocols.findIndex(
        (p) => p.toLowerCase() === c.address.toLowerCase()
      )

      if (pIndex >= 0) {
        _amounts[pIndex] = c.balance.wei
      }
    })

    setIsLoading(true)
    setIsUpdating(true)
    dispatcher.dispatch({
      type: PlanManagerEvents.UpdatePlan,
      content: {
        protocols: _protocols,
        coverAmounts: _amounts,
      },
    })
  }

  const costPerMonth = () => {
    let pricePerSecond = 0
    let covs = coveredAssets
    covs.forEach((p) => {
      pricePerSecond += parseFloat(p.pricePerSecond)
    })
    // let nonCovered = covers.filter((x) => x.balance.wei > 0)
    // nonCovered.forEach((p) => {
    //   pricePerSecond += parseFloat(p.pricePerSecond)
    // })
    return parseFloat(pricePerSecond) * 2592000
  }

  const handleClickPoweredByZapper = () => {
    window.open(`https://zapper.fi/?address=${account.address}`, '_blank')
  }

  const handleClickSkipAnalizing = () => {
    setIsLoading(false)
  }

  const handleSetUsdPrimary = () => {
    if (isUsdPrimary) {
      setIsUsdPrimary(false)
      localStorage.removeItem('armor-website-usd-primary')
    } else {
      setIsUsdPrimary(true)
      localStorage.setItem('armor-website-usd-primary', true)
    }
  }

  const coveredAssets = covers.filter((x) => x.coverage.wei > 0)
  const uncoveredAsssets = covers.filter((x) => x.coverage.wei <= 0)

  return (
    <Container lg noaccount={!account}>
      <Title>{t('Protect.Title')}</Title>
      {account && !isLoading && (
        <>
          <Description
            blur={
              isTopUpConfirmationModalOpened ||
              isTopUpModalOpened ||
              isWithdrawModalOpened ||
              isEditNotCoveredModalOpened ||
              isEditCoveredModalOpened ||
              isCancelModalOpened
            }
            center
          >
            {t('Protect.Description.P4')}
          </Description>
          <Description
            blur={
              isTopUpConfirmationModalOpened ||
              isTopUpModalOpened ||
              isWithdrawModalOpened ||
              isEditNotCoveredModalOpened ||
              isEditCoveredModalOpened ||
              isCancelModalOpened
            }
            center
          >
            {t('Protect.Description.P5')}
          </Description>
        </>
      )}

      {!account ? (
        <WalletDisconnected />
      ) : isLoading ? (
        <WalletAnalyzing
          text={currentLoadingText}
          handleSkip={handleClickSkipAnalizing}
        />
      ) : (
        <>
          {isTopUpConfirmationModalOpened ||
          isTopUpModalOpened ||
          isWithdrawModalOpened ||
          isEditNotCoveredModalOpened ||
          isEditCoveredModalOpened ||
          isCancelModalOpened ? (
            <ModalWrapper>
              {isTopUpConfirmationModalOpened && (
                <ConfirmCoverModal
                  closeModal={handleCloseCoverConfirmationModal}
                  handleSubmit={() => onUpdateSelectedPlan()}
                  ethPrice={ethPrice}
                  handleTopUpSubmit={(assets, cost) =>
                    onUpdateSelectedPlan(assets, cost)
                  }
                  monthlyCost={pricePerMonth}
                  covers={coveredAssets}
                  ethBalance={ethBalance}
                  arcoreBalance={balanceManagerBalance}
                  selectedUnstakedAssets={coverConfirmationArr}
                  isUsdPrimary={isUsdPrimary}
                />
              )}
              {isCancelModalOpened && (
                <CancelCoverModal
                  closeModal={handleCloseCancelCoverModal}
                  handleSubmit={() => onCancelSelected()}
                  handleCancelAndWithdraw={() => onCancelAndWithdrawAll()}
                  monthlyCost={pricePerMonth}
                  ethBalance={ethBalance}
                  arcoreBalance={balanceManagerBalance}
                  selectedAssets={cancelCoverArr}
                  isSelectedAll={cancelCoverArr.length === coveredAssets.length}
                  ethPrice={ethPrice}
                  isUsdPrimary={isUsdPrimary}
                />
              )}
              {isTopUpModalOpened && (
                <TopUpModal
                  closeModal={handleCloseTopUpModal}
                  handleSubmit={handleTopUpModalSubmit}
                  monthlyCost={costPerMonth()}
                  ethBalance={ethBalance}
                  ethPrice={ethPrice}
                  isUsdPrimary={isUsdPrimary}
                />
              )}
              {isWithdrawModalOpened && (
                <WithdrawModal
                  closeModal={handleCloseWithdrawModal}
                  handleSubmit={handleWithdrawSubmit}
                  arcoreBalance={balanceManagerBalance}
                />
              )}
              {isEditNotCoveredModalOpened && (
                <EditNotCoveredModal
                  availableCoverage={availableCoverage}
                  closeModal={handleCloseNotCoveredModal}
                  isModalOpened={isEditNotCoveredModalOpened}
                  handleSubmit={handleEditModalSubmit}
                  editNotCoveredValue={editManuallyAddedValue}
                  ethPrice={ethPrice}
                />
              )}
              {isEditCoveredModalOpened && (
                <EditCoveredModal
                  availableCoverage={availableCoverage}
                  closeModal={handleCloseCoveredModal}
                  isModalOpened={isEditCoveredModalOpened}
                  handleSubmit={handleEditModalSubmit}
                  editCoveredValue={editManuallyAddedValue}
                  ethPrice={ethPrice}
                />
              )}
            </ModalWrapper>
          ) : (
            <>
              {isWalletConnected && (
                <>
                  <Tooltip
                    arrow
                    placement="top"
                    enterTouchDelay={50}
                    title={'Main currency to display'}
                  >
                    <SwitchWrapper primary={isUsdPrimary}>
                      <ToggleSwitchButton onClick={handleSetUsdPrimary}>
                        USD
                      </ToggleSwitchButton>
                      <ToggleSwitchButton onClick={handleSetUsdPrimary}>
                        ETH
                      </ToggleSwitchButton>
                    </SwitchWrapper>
                  </Tooltip>
                  {coveredAssets.length === 0 && uncoveredAsssets > 0 && (
                    <CoverAssets
                      assetsToCover={covers.filter((x) => x.coverage.wei <= 0)}
                      onCoverArr={handleCoverArr}
                    />
                  )}
                  <BaseUtilizationFarmingCombined
                    network={network}
                    prefix="utilizationFarmBorrowers"
                    title={'Smart Cover User Rewards'}
                    liquidityUrl={
                      'https://uniswap.exchange/add/0x1337def18c680af1f9f45cbcab6309562975b1dd/ETH'
                    }
                    infoUrl={
                      'https://info.uniswap.org/pair/0x7ca51456b20697a0e5be65e5aeb65dfe90f21150'
                    }
                    address={cnf.UTILIZATION_FARM_BORROWERS_ADDRESS}
                    stakeHelpText={'Ether paid per year for your cover'}
                    claimValue={2.65}
                    handleOpenTopupModal={handleOpenTopupModal}
                    handleOpenWithdrawModal={handleOpenWithdrawModal}
                    monthlyCost={pricePerMonth}
                    ethBalance={ethBalance}
                    arCoreCredit={balanceManagerBalance}
                    ethPrice={ethPrice}
                    armorPrice={armorPrice}
                    isUsdPrimary={isUsdPrimary}
                  />
                </>
              )}
              {/* <ArcoreBalance
                  handleOpenTopupModal={handleOpenTopupModal}
                  handleOpenWithdrawModal={handleOpenWithdrawModal}
                  monthlyCost={pricePerMonth}
                  ethBalance={ethBalance}
                  arCoreCredit={balanceManagerBalance}
                /> */}
              {covers.length > 0 && (
                <CoveredAssets
                  covers={coveredAssets}
                  manuallyAddedProtocols={manuallyAddedProtocols}
                  isUpdating={isUpdating}
                  hasEnoughBalance={hasEnoughBalance}
                  onUpdatePlan={onUpdatePlan}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  isFullyCovered={isFullyCovered()}
                  onCancelArr={handleCancelCoverArr}
                  onUpdateArr={handleUpdateCoverArr}
                  onUpdateSelectedArr={handleUpdateSelectedCoverArr}
                  openEditModal={handleOpenEditCoveredModal}
                  setEditManuallyAddedValue={setEditManuallyAddedValue}
                  availableCoverage={availableCoverage}
                  ethPrice={ethPrice}
                  isUsdPrimary={isUsdPrimary}
                />
              )}
              <AssetsToCover
                overviewDataArr={uncoveredAsssets}
                manuallyAddedProtocols={manuallyAddedProtocols}
                isUpdating={isUpdating}
                hasEnoughBalance={hasEnoughBalance}
                onUpdatePlan={onUpdatePlan}
                onCoverArr={handleCoverArr}
                onDeleteArr={handleDeleteArr}
                openEditModal={handleOpenEditNotCoveredModal}
                ethPrice={ethPrice}
                arCoreCredit={balanceManagerBalance}
                setEditManuallyAddedValue={setEditManuallyAddedValue}
                availableCoverage={availableCoverage}
                isUsdPrimary={isUsdPrimary}
              />
              {/*<AssetsNotAvailable*/}
              {/*  overviewDataArr={overviewDataArr}*/}
              {/*  manuallyAddedProtocols={manuallyAddedProtocols}*/}
              {/*  setManuallyAddedProtocols={setManuallyAddedProtocols}*/}
              {/*  isUpdating={isUpdating}*/}
              {/*  hasEnoughBalance={hasEnoughBalance}*/}
              {/*  onUpdatePlan={onUpdatePlan}*/}
              {/*  onCoverArr={handleCoverArr}*/}
              {/*  openEditModal={handleOpenEditManuallyAddedModal}*/}
              {/*  ethPrice={ethPrice}*/}
              {/*  setEditManuallyAddedValue={setEditManuallyAddedValue}*/}
              {/*/>*/}
              <ActionButton onClick={handleClickPoweredByZapper}>
                <ButtonText>Portfolio Dashboard Powered By Zapper</ButtonText>
              </ActionButton>
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Protect)))
