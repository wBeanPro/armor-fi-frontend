import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
} from '../../constants'
import Store from '../../stores/store'
import { ArNXMVaultEvents as ArNxmVaultEvents } from '../../stores/contracts/arNXMVaultEvents'
import ArNxm from '../arNxm/ArNxm'
import { WNXMEvents } from '../../stores/contracts/wNXMEvents'
import { WrapSkeleton } from './styled'
import { ArNXMTokenEvents } from '../../stores/contracts/arNXMTokenEvents'
import {
  removeEmitterListeners,
  turnOnEmitterListeners,
  twoDigitFormatter,
} from '../../helpers'
import { threeDigitFormatter } from '../../helpers'
import ConnectWallet from '../common/connectWallet/ConnectWallet'
import ArNxmVaultSkeleton from './ArNxmVaultSkeleton'
import Container from '../common/container/Container'
import { Title } from '../common/Title'
import UnlockModal from '../unlockModal/UnlockModal'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const ArNxmVault = ({ theme, network, t }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [contracts, setContracts] = useState(null)
  const [assetsUnderManagement, setAssetsUnderManagement] = useState('0.0')
  const [withdrawableAssets, setWithdrawableAssets] = useState('0.0')
  const [conversion, setConversion] = useState('0.0')
  const [wNXMBalance, setWNXMBalance] = useState(0.0)
  const [arNXMTokenBalance, setArNXMTokenBalance] = useState(0.0)
  const [totalDeposits, setTotalDeposits] = useState(0.0)
  const [totalWithdrawals, setTotalWithdrawals] = useState(0.0)
  const [earned, setEarned] = useState(0.0)
  const [apy, setAPY] = useState('0.0')
  const [monthlyAPY, setMonthlyAPY] = useState('0.0')
  const [allTimeAPY, setAllTimeAPY] = useState('0.0')
  const [protocols, setProtocols] = useState([])
  const [isUnlockModalOpened, setIsUnlockModalOpened] = useState(false)

  const dispatchEvents = () => {
    dispatcher.dispatch({
      type: WNXMEvents.GetBalance,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNXMTokenEvents.GetBalance,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetAssetsUnderManagement,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetAPY,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetMonthlyAPY,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetAllTimeAPY,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetProtocols,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetWNxmValue,
      content: { amount: 1e18 },
    })
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetWithdrawableAssets,
      content: {},
    })
  }
  useEffect(() => {
    setIsLoading(true)
    const _account = store.getStore('account')
    setAccount(_account)

    const _contracts = store.getStore('contracts')
    setContracts(_contracts)

    if (_account && _account.address) {
      dispatchEvents()
    }

    let events = [
      [ERROR, errorReturned],
      [CONNECTION_CONNECTED, connectionConnected],
      [CONNECTION_DISCONNECTED, connectionDisconnected],
      [
        ArNxmVaultEvents.AssetsUnderManagementReturned,
        assetsUnderManagementReturned,
      ],
      // [
      //   ArNxmVaultEvents.TotalDepositsAndWithdrawalsReturned,
      //   totalDepositsAndWithdrawalsReturned
      // )
      [WNXMEvents.BalanceReturned, wNXMBalanceReturned],
      [ArNXMTokenEvents.BalanceReturned, arNXMTokenBalanceReturned],
      [ArNxmVaultEvents.APYReturned, arNXMVaultApyReturned],
      [ArNxmVaultEvents.MonthlyAPYReturned, arNXMVaultMonthlyApyReturned],
      [ArNxmVaultEvents.AllTimeAPYReturned, arNXMVaultAllTimeApyReturned],
      [ArNxmVaultEvents.ProtocolsReturned, arNXMVaultProtocolsReturned],
      [ArNxmVaultEvents.WNxmValueReturned, arNXMVaultWNxmValueReturned],
      [
        ArNxmVaultEvents.WithdrawableAssetsReturned,
        arNXMVaultWithdrawableAssetsReturned,
      ],
    ]
    turnOnEmitterListeners(emitter, events)

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [network, account])

  const handleClickWalletAddress = () => {
    setIsUnlockModalOpened(true)
  }

  const handleCloseUnlockModal = () => {
    setIsUnlockModalOpened(false)
  }

  const assetsUnderManagementReturned = () => {
    const _total = store.getStore('ArNXMVault_AssetsUnderManagement')
    if (_total === undefined) {
      setAssetsUnderManagement('0.0')
      return
    }
    setAssetsUnderManagement(twoDigitFormatter.format(_total))
  }

  const arNXMVaultApyReturned = () => {
    const _apy = store.getStore('ArNXMVault_APY')
    setAPY(twoDigitFormatter.format(_apy))
  }

  const arNXMVaultMonthlyApyReturned = () => {
    const _apy = store.getStore('ArNXMVault_MonthlyAPY')
    setMonthlyAPY(twoDigitFormatter.format(_apy))
  }

  const arNXMVaultAllTimeApyReturned = () => {
    const _apy = store.getStore('ArNXMVault_AllTimeAPY')
    setAllTimeAPY(twoDigitFormatter.format(_apy))
  }

  const arNXMVaultProtocolsReturned = () => {
    const _protocols = store.getStore('ArNXMVault_Protocols')
    setProtocols(_protocols)
  }

  const arNXMVaultWNxmValueReturned = () => {
    const _value = store.getStore('ArNXMVault_WNxmValue')
    setConversion(threeDigitFormatter.format(_value))
  }

  const arNXMVaultWithdrawableAssetsReturned = () => {
    const _withdrawableAssets = store.getStore('ArNXMVault_WithdrawableAssets')
    setWithdrawableAssets(twoDigitFormatter.format(_withdrawableAssets))
  }
  //
  // const totalDepositsAndWithdrawalsReturned = () => {
  //   const _totals = store.getStore('ArNXMVault_TotalDepositsAndWithdrawals')
  //
  //   setTotalDeposits(_totals.deposits)
  //   setTotalWithdrawals(_totals.withdrawals)
  //
  //   let earned = arNXMTokenBalance - (totalDeposits - totalWithdrawals)
  //   setEarned(earned)
  // }

  const wNXMBalanceReturned = () => {
    const _balance = store.getStore('wNXM_Balance')
    setWNXMBalance(parseFloat(_balance))
  }

  const arNXMTokenBalanceReturned = () => {
    const _balance = store.getStore('ArNXMToken_Balance')
    setArNXMTokenBalance(parseFloat(_balance))

    let earned = _balance - (totalDeposits - totalWithdrawals)
    setEarned(earned)
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    setAccount(_account)
    if (_account && _account.address) {
    }
  }

  const connectionDisconnected = () => setAccount(null)

  const errorReturned = (error) => setIsLoading(false)

  return (
    <Container noaccount={!account}>
      <Title>arNXM {t('ArNxmVault.Title')}</Title>

      <ArNxm
        assetsUnderManagement={assetsUnderManagement}
        withdrawableAssets={withdrawableAssets}
        wNXMBalance={wNXMBalance}
        conversion={conversion}
        arNXMTokenBalance={arNXMTokenBalance}
        apy={apy}
        onBalanceUpdateRequest={() => dispatchEvents()}
        monthlyAPY={monthlyAPY}
        allTimeAPY={allTimeAPY}
        network={network}
        account={account}
        handleClickWalletAddress={handleClickWalletAddress}
      />
      <UnlockModal
        closeModal={handleCloseUnlockModal}
        modalOpen={isUnlockModalOpened}
      />
    </Container>
  )
}

export default withTranslation()(withRouter(ArNxmVault))
