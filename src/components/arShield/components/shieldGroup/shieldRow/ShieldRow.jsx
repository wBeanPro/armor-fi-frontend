import { Row } from '../styled'
import React, { useEffect, useMemo, useState } from 'react'
import ShieldTitle from './ShieldTitle'
import ArShieldActionButtonCell from './ArShieldActionButtonCell'
import PercentageCell from './PercentageCell'
import Store from '../../../../../stores/store'
import { ERROR } from '../../../../../constants'
import {
  commas,
  removeEmitterListeners,
  turnOnEmitterListeners,
} from '../../../../../helpers'
import NumberSelectionModal from '../../../../common/numberSelectionModal/NumberSelectionModal'
import * as BN from 'bn.js'
import { fromWei, toWei } from 'web3-utils'
import AboutCircleIcon from '../../../../icons/AboutCircleIcon'
import BalanceCell from './BalanceCell'

const dispatcher = Store.dispatcher
const emitter = Store.emitter
const store = Store.store

const ShieldRow = ({
  colors,
  account,
  network,
  isDepositing,
  setIsDepositing,
  isWithdrawing,
  setIsWithdrawing,
  setModalText,
  groupTitle,
  shieldTitle,
  address,
  underlyingTokenAddress,
  logo,
  holdingsDecimalPlaces = 2,
  underlyingTokenDecimalPlaces = 3,
  maxCoverage,
  apy,
}) => {
  //const { colors } = theme

  const [isLoading, setIsLoading] = useState(true)
  const [isUnderlyingTokenBalanceLoading, setIsUnderlyingTokenBalanceLoading] =
    useState(true)
  const [isShieldAssetsBalanceLoading, setIsShieldAssetsBalanceLoading] =
    useState(true)
  const [isFindFeePctLoading, setIsFindFeePctLoading] = useState(true)
  const [isShieldBalanceLoading, setIsShieldBalanceLoading] = useState(true)

  const [shieldBalance, setShieldBalance] = useState(0)
  const [cost, setCost] = useState(0.0)
  const [findFeePct, setFindFeePct] = useState(0.0)
  const [arTokenValue, setArTokenValue] = useState(0.0)
  const [pTokenValue, setPTokenValue] = useState(0.0)
  const [depositWillReceive, setDepositWillReceive] = useState(0.0)
  const [withdrawWillReceive, setWithdrawWillReceive] = useState(0.0)
  const [fee, setFee] = useState(0.0)
  const [underlyingTokenBalance, setUnderlyingTokenBalance] = useState(0)
  const [shieldAssetsBalance, setShieldAssetsBalance] = useState(0)
  const [isMintModalOpened, setIsMintModalOpened] = useState(false)
  const [isRedeemModalOpened, setIsRedeemModalOpened] = useState(false)
  const eventPrefix = `ArShield.${groupTitle}.${shieldTitle}`
  const coverageBasePrefix = `ArShield.${groupTitle}.CoverageBase`

  const areEventsLoading = () => {
    return (
      isUnderlyingTokenBalanceLoading ||
      isShieldBalanceLoading ||
      isShieldAssetsBalanceLoading ||
      isFindFeePctLoading
    )
  }
  const isConnected = () => {
    return account && !areEventsLoading()
  }

  const dispatch = (prefix, type, content) => {
    if (content == null) {
      content = {}
    }
    dispatcher.dispatch({
      type: `${prefix}.${type}`,
      content: content,
    })
  }
  const getStore = (prefix, key) => {
    return store.getStore(`${prefix}_${key}`)
  }
  const eventKey = (prefix, key) => {
    return `${prefix}.${key}`
  }

  useEffect(() => {
    if (account == null) {
      return
    }
    setIsLoading(false)

    let events = [
      [ERROR, errorReturned],
      [eventKey(eventPrefix, `ShieldBalanceReturned`), onShieldBalanceReturned],
      [
        eventKey(eventPrefix, `UnderlyingTokenBalanceReturned`),
        onUnderlyingTokenBalanceReturned,
      ],
      [eventKey(eventPrefix, `MintCompleted`), onMintCompleted],
      [
        eventKey(eventPrefix, `WithdrawApproveCompleted`),
        onWithdrawApproveCompleted,
      ],
      [
        eventKey(eventPrefix, `DepositApproveCompleted`),
        onDepositApproveCompleted,
      ],
      [eventKey(eventPrefix, `RedeemCompleted`), onRedeemCompleted],
      [eventKey(eventPrefix, `FindFeePctReturned`), onFindFeePctReturned],
      [
        eventKey(eventPrefix, `ArTokenValueOfPTokenReturned`),
        onArTokenValueOfPTokenReturned,
      ],
      [
        eventKey(eventPrefix, `PTokenValueOfArTokenReturned`),
        onPTokenValueOfArTokenReturned,
      ],
      [
        eventKey(coverageBasePrefix, `CostPerEthReturned`),
        onCostPerEthReturned,
      ],
    ]
    turnOnEmitterListeners(emitter, events)

    dispatchBalanceEvents()

    // find fee
    setIsFindFeePctLoading(true)
    dispatch(eventPrefix, 'GetFindFeePct')

    dispatch(eventPrefix, 'GetArTokenValueOfPToken', {
      pTokenAmount: toWei('1', 'ether'),
    })
    dispatch(eventPrefix, 'GetPTokenValueOfArToken', {
      arTokenAmount: toWei('1', 'ether'),
    })

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [network, account])

  const dispatchBalanceEvents = () => {
    setIsShieldBalanceLoading(true)
    dispatch(eventPrefix, 'GetShieldBalance')
    setIsUnderlyingTokenBalanceLoading(true)
    dispatch(eventPrefix, 'GetUnderlyingTokenBalance', {
      address: account.address,
    })
    setIsShieldAssetsBalanceLoading(true)
    dispatch(eventPrefix, 'GetUnderlyingTokenBalance', { address: address })
    dispatch(coverageBasePrefix, 'GetCostPerEth')
  }

  const errorReturned = (error) => {
    setIsLoading(false)
    setIsWithdrawing(false)
    setIsDepositing(false)
  }

  // find fee
  const onFindFeePctReturned = () => {
    const _fee = getStore(eventPrefix, `FindFeePct`)
    setFindFeePct(_fee)
    setIsFindFeePctLoading(false)
  }
  const calculateFee = (balance) => {
    // catch users deleting numbers
    if (balance == null || balance <= 0) {
      setDepositWillReceive(0)
      setWithdrawWillReceive(0)
      setFee(0.0)
      return
    }

    let fee =
      (parseFloat(toWei(balance, 'ether').toString()) * findFeePct) /
      parseFloat(toWei('10000', 'ether').toString())

    let adjustedBalance = arTokenValue > 0 ? balance * arTokenValue : balance
    let willReceive = adjustedBalance - fee

    setDepositWillReceive(willReceive)

    adjustedBalance = pTokenValue > 0 ? balance * pTokenValue : balance
    willReceive = adjustedBalance - fee
    setWithdrawWillReceive(willReceive)

    setFee(fee)
  }
  const onArTokenValueOfPTokenReturned = () => {
    const _arToken = getStore(eventPrefix, `ArTokenValue`)
    setArTokenValue(_arToken)
  }
  const onPTokenValueOfArTokenReturned = () => {
    const _pToken = getStore(eventPrefix, `PTokenValue`)
    setPTokenValue(_pToken)
  }

  // cost
  const onCostPerEthReturned = (c) => {
    const cost = getStore(coverageBasePrefix, `CostPerEth`)
    let perSecondEth = fromWei(Math.round(cost).toString(), 'ether')
    const costPerYear = parseFloat(perSecondEth) * 86400 * 365.2425 * 100
    setCost(costPerYear)
  }

  // balances
  const onShieldBalanceReturned = () => {
    const _balance = getStore(eventPrefix, `ShieldBalance`)
    setShieldBalance(_balance)
    setIsShieldBalanceLoading(false)
  }
  const onUnderlyingTokenBalanceReturned = () => {
    const { tokenAddress, tokenBalance } = getStore(
      eventPrefix,
      `UnderlyingTokenBalance`
    )
    setIsLoading(false)

    if (address === tokenAddress) {
      setShieldAssetsBalance(tokenBalance)
      setIsShieldAssetsBalanceLoading(false)
      return
    }

    setUnderlyingTokenBalance(tokenBalance)
    setIsUnderlyingTokenBalanceLoading(false)
  }

  // action buttons
  const onMint = (amount) => {
    setModalText('Waiting for approval. This may take a few minutes.')
    setIsLoading(true)
    setIsDepositing(true)
    dispatch(eventPrefix, `Mint`, { amount: amount.toString() })
  }
  const onMintCompleted = () => {
    setIsLoading(false)
    setIsDepositing(false)
    dispatchBalanceEvents()
  }
  const onDepositApproveCompleted = () => {
    setModalText('Waiting to deposit. This may take a few minutes.')
  }

  const onWithdrawApproveCompleted = () => {
    setModalText('Waiting to withdraw. This may take a few minutes.')
  }

  const onRedeem = (amount) => {
    setModalText('Waiting for approval. This may take a few minutes.')
    setIsLoading(true)
    setIsWithdrawing(true)
    dispatch(eventPrefix, `Redeem`, { amount: amount.toString() })
  }
  const onRedeemCompleted = () => {
    setIsLoading(false)
    setIsWithdrawing(false)
    dispatchBalanceEvents()
  }
  const mintCoinInputText = () => {
    return groupTitle[0].toLowerCase() + 'tokens'
  }

  return (
    <Row>
      <ShieldTitle address={address} title={shieldTitle} logo={logo} />
      <BalanceCell
        balance={commas(holdingsDecimalPlaces).format(shieldBalance)}
        title={'Holdings'}
        isConnected={isConnected()}
      />
      <PercentageCell cost={cost.toFixed(2)} isConnected={isConnected()} />
      <BalanceCell
        balance={commas(2).format(shieldAssetsBalance)}
        title={'Shield Assets'}
        isConnected={isConnected()}
      />
      <BalanceCell
        balance={commas(underlyingTokenDecimalPlaces).format(
          underlyingTokenBalance
        )}
        title={'Available to deposit'}
        isConnected={isConnected()}
      />
      {/*<APY apy={apy} />*/}
      <ArShieldActionButtonCell
        onRedeem={() => {
          setWithdrawWillReceive(0.0)
          setIsRedeemModalOpened(true)
        }}
        onMint={() => {
          setDepositWillReceive(0.0)
          setIsMintModalOpened(true)
        }}
        isConnected={isConnected()}
        isLoading={isDepositing || isWithdrawing}
      />

      <NumberSelectionModal
        isLoading={!isConnected()}
        isModalOpened={isMintModalOpened}
        closeModal={() => setIsMintModalOpened(false)}
        onSubmit={(amount) => onMint(amount)}
        title={'Deposit'}
        onChange={(amount) => calculateFee(amount)}
        inputText={shieldTitle}
        actionText={'Deposit'}
        infoText={
          <>
            <div>
              <b>Available:</b> {commas(5).format(underlyingTokenBalance)}{' '}
              {shieldTitle}
            </div>
            <div>
              <b>You will receive:</b> {commas(5).format(depositWillReceive)} ar
              {shieldTitle.toUpperCase()}
            </div>
          </>
        }
        totalAvailable={underlyingTokenBalance}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AboutCircleIcon color={colors._default} />
          <div>
            There is a {findFeePct / 100}% (
            <span style={{ fontWeight: 'bold', color: '#91FFBD' }}>
              {commas(4).format(fee)}
            </span>{' '}
            {shieldTitle}) fee included in the above quote.
          </div>
        </div>
      </NumberSelectionModal>

      <NumberSelectionModal
        isLoading={!isConnected()}
        isModalOpened={isRedeemModalOpened}
        closeModal={() => setIsRedeemModalOpened(false)}
        onSubmit={(amount) => onRedeem(amount)}
        onChange={(amount) => calculateFee(amount)}
        title={'Withdraw'}
        inputText={`ar${shieldTitle.toUpperCase()}`}
        actionText={'Withdraw'}
        infoText={
          <>
            <div>
              <b>Available:</b> {commas(5).format(shieldBalance)} ar
              {shieldTitle.toUpperCase()}
            </div>
            <div>
              <b>You will receive:</b> {commas(5).format(withdrawWillReceive)}{' '}
              ar
              {shieldTitle.toUpperCase()}
            </div>
          </>
        }
        totalAvailable={shieldBalance}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AboutCircleIcon color={colors._default} />
          <div>
            There is a {findFeePct / 100}% (
            <span style={{ fontWeight: 'bold', color: '#91FFBD' }}>
              {commas(4).format(fee)}
            </span>{' '}
            ar{shieldTitle.toUpperCase()}) fee included in the above quote.
          </div>
        </div>
      </NumberSelectionModal>
    </Row>
  )
}

export default ShieldRow
