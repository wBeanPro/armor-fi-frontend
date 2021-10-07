import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import {
  AssetsBox,
  AssetsGradient,
  AssetsTitle,
  AssetsWrapper,
  TooltipSpan,
  TooltipButtonWrapper,
  TooltipInfoWrapper,
  Container,
} from './styled'
import ArNxmProtocols from '../arNxmVault/components/arNxmProtocols/ArNxmProtocols'
import ArNxmTrade from '../arNxmVault/components/arNxmTrade/ArNxmTrade'
import data from './mock'
import ArNxmStakeUnstakeContainer from '../arNxmVault/components/arNxmStakeUnstakeContainer/ArNxmStakeUnstakeContainer'
import Tooltip from '@material-ui/core/Tooltip'
import {
  arNxmAPY,
  commas,
  removeEmitterListeners,
  turnOnEmitterListeners,
} from '../../helpers'
import AboutInfoIcon from '../icons/AboutInfoIcon'
import { SubTitle } from '../common/SubTitle'
import WithdrawOption from './withdrawOption/WithdrawOption'
import WithdrawStatus from './withdrawStatus/WithdrawStatus'
import ArNxmVaultSkeleton from '../arNxmVault/ArNxmVaultSkeleton'
import Button from '../shared/button/Button'
import { ActionContainer } from '../common/actionModal/styled'
import StickyModal from '../common/modal/StickyModal'
import {
  ArNXMVaultEvents,
  ArNXMVaultEvents as ArNxmVaultEvents,
} from '../../stores/contracts/arNXMVaultEvents'
import Store from '../../stores/store'
import ActionModal from '../common/actionModal/ActionModal'
import { ERROR } from '../../constants'
import { fromWei } from 'web3-utils'
import moment from 'moment'
import WithdrawPending from './withdrawPending/WithdrawPending'

const dispatcher = Store.dispatcher
const emitter = Store.emitter
const store = Store.store

const ArNxm = ({
  t,
  assetsUnderManagement,
  withdrawableAssets,
  wNXMBalance,
  conversion,
  arNXMTokenBalance,
  onBalanceUpdateRequest,
  network,
  account,
  handleClickWalletAddress,
  theme,
}) => {
  const { colors } = theme
  const [isWithdrawOptionsModalOpen, setIsWithdrawOptionsModalOpen] =
    useState(false)
  const [isWithdrawStatusModalOpen, setIsWithdrawStatusModalOpen] =
    useState(false)
  const [isActionModalOpened, setIsActionModalOpened] = useState(false)
  const [modalText, setModalText] = useState('')
  const [request, setRequest] = useState({})
  const withdrawalRequest = useRef({})
  const withdrawAmount = useRef('0')

  useEffect(() => {
    if (account == null) {
      return
    }

    let events = [
      [ERROR, errorReturned],
      [ArNxmVaultEvents.WithdrawalCompleted, onWithdrawCompleted],
      [
        ArNXMVaultEvents.RequestedWithdrawalsReturned,
        requestedWithdrawalsReturned,
      ],
      [ArNXMVaultEvents.ApprovalCompleted, approvalCompleted],
      [ArNXMVaultEvents.FinalizeWithdrawCompleted, finalizeWithdrawCompleted],
    ]
    turnOnEmitterListeners(emitter, events)

    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetRequestedWithdrawals,
      content: {},
    })

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [account])

  const isWithdrawalingWithDelay = () => {
    return (
      withdrawalRequest.current != null &&
      withdrawalRequest.current.withdrawalTime > 0
    )
  }
  const formatTimestamp = (_timestamp) =>
    moment.unix(_timestamp).utc().format('MMM Do [at] HH:mm [UTC]')

  const onSwapArNxmForWNxm = (amount) => {
    console.log('withdrawgin', isWithdrawalingWithDelay())
    // if (isWithdrawalingWithDelay()) {
    //   setIsWithdrawStatusModalOpen(true)
    //   return
    // }

    setIsWithdrawOptionsModalOpen(true)
    withdrawAmount.current = amount
  }

  const withdrawalLockAmount = () => {
    if (
      withdrawalRequest.current == null ||
      withdrawalRequest.current.request == null
    ) {
      return 0
    }

    return fromWei(withdrawalRequest.current.request['arAmount'], 'ether')
  }

  const requestedWithdrawalsReturned = (data) => {
    console.log('REQUESTED WITHDRAWALS RETURNED')
    withdrawalRequest.current = store.getStore(
      'ArNXMVault_RequestedWithdrawals'
    )
    setRequest(withdrawalRequest.current)
  }

  const approvalCompleted = (data) => {
    setModalText('Withdrawing with delay. This may take a few minutes.')
  }

  const withdrawDelay = () => {
    if (withdrawalRequest.current == null) {
      return 24 * 60 * 2 // 2 day default
    }

    return withdrawalRequest.current.withdrawDelay
  }

  const withdrawFee = () => {
    if (withdrawalRequest.current == null) {
      return 2.5
    }

    return withdrawalRequest.current.withdrawFee
  }

  const onWithdraw = (withFee) => {
    setModalText('Awaiting approval. This may take a few minutes.')

    if (withFee) {
      setModalText('Withdrawing with fee. This may take a few minutes.')
    }

    setIsWithdrawStatusModalOpen(false)
    setIsWithdrawOptionsModalOpen(false)
    setIsActionModalOpened(true)
    dispatcher.dispatch({
      type: ArNxmVaultEvents.Withdrawal,
      content: {
        amount: withdrawAmount.current.toString(),
        withFee,
      },
    })
  }

  const onFinalizeWithdraw = () => {
    setModalText('Waiting to finalize withdraw. This may take a few minutes.')
    setIsWithdrawStatusModalOpen(false)
    setIsActionModalOpened(true)
    dispatcher.dispatch({
      type: ArNxmVaultEvents.FinalizeWithdraw,
      content: {},
    })
  }

  const errorReturned = (error) => {
    setIsActionModalOpened(false)
  }

  const onWithdrawCompleted = () => {
    setIsActionModalOpened(false)
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetRequestedWithdrawals,
      content: {},
    })
    onBalanceUpdateRequest()
  }

  const finalizeWithdrawCompleted = () => {
    setIsActionModalOpened(false)
    dispatcher.dispatch({
      type: ArNxmVaultEvents.GetRequestedWithdrawals,
      content: {},
    })
    onBalanceUpdateRequest()
  }

  const renderSwapHelp = () => {
    return (
      <div>
        <div>The first box below exchanges your NXM for arNXM.</div>
        <div style={{ marginTop: '10px' }}>
          The second box below exchanges your wNXM for arNXM.
        </div>
        <div style={{ marginTop: '10px' }}>
          The third box below exchanges your arNXM back to wNXM.
        </div>
      </div>
    )
  }

  return (
    <>
      {account ? (
        <>
          <SubTitle top="40">
            {t('ArNxm.StakeAndUnstake')}
            <Tooltip
              arrow
              placement="top"
              enterTouchDelay={50}
              title={renderSwapHelp()}
            >
              <TooltipSpan>
                <AboutInfoIcon color={colors.defaultLightActive} />
              </TooltipSpan>
            </Tooltip>
          </SubTitle>
          <ArNxmStakeUnstakeContainer
            wNXMBalance={wNXMBalance}
            arNXMTokenBalance={arNXMTokenBalance}
            conversion={conversion}
            data={data.protocols}
            network={network}
            account={account}
            nxmAvailable={withdrawableAssets}
            withdrawalRequest={request}
            onSwapArNxmForWNxm={(amount) => onSwapArNxmForWNxm(amount)}
          />

          <WithdrawPending
            onWithdraw={() => onFinalizeWithdraw()}
            withdrawalRequest={request}
          />

          {/* TODO: as Robert requested */}
          <StickyModal
            closeModal={() => setIsWithdrawOptionsModalOpen(false)}
            isModalOpened={isWithdrawOptionsModalOpen}
            width={650}
          >
            <ActionContainer>
              <WithdrawOption
                availableToWithdraw={withdrawAmount.current}
                withdrawDelay={withdrawDelay}
                withdrawFee={withdrawFee}
                withdrawalRequest={request}
                conversionRate={conversion}
                onWithdrawWithFee={() => onWithdraw(true)}
                onWithdrawWithDelay={() => onWithdraw(false)}
                onCancelModal={() => setIsWithdrawOptionsModalOpen(false)}
              />
            </ActionContainer>
          </StickyModal>

          <StickyModal
            closeModal={() => setIsWithdrawStatusModalOpen(false)}
            isModalOpened={isWithdrawStatusModalOpen}
            width={650}
          >
            <ActionContainer>
              <WithdrawStatus
                availableToWithdraw={withdrawalLockAmount()}
                delayedUntil={
                  withdrawalRequest.current == null
                    ? '0'
                    : withdrawalRequest.current.withdrawalTime
                }
                onWithdraw={() => onFinalizeWithdraw()}
                onCancelModal={() => setIsWithdrawStatusModalOpen(false)}
              />
            </ActionContainer>
          </StickyModal>
        </>
      ) : (
        <Tooltip
          arrow
          interactive
          placement="bottom"
          enterTouchDelay={50}
          disableFocusListener={!!account}
          disableHoverListener={!!account}
          disableTouchListener={!!account}
          title={
            <TooltipInfoWrapper>
              {t('BaseFarming.WalletButtonInfo')}
              <TooltipButtonWrapper>
                <Button
                  onClick={handleClickWalletAddress}
                  content={t('BaseFarming.WalletButtonText')}
                />
              </TooltipButtonWrapper>
            </TooltipInfoWrapper>
          }
        >
          <div>
            <ArNxmVaultSkeleton />
          </div>
        </Tooltip>
      )}

      <SubTitle top="40">{t('ArNxm.Trade')}</SubTitle>
      <ArNxmTrade />

      <SubTitle top="40">{t('ArNxm.OurNexusMutualStakes')}</SubTitle>
      {account && (
        <AssetsWrapper>
          <AssetsBox>
            <AssetsTitle>
              {t('ArNxm.UnderManagement')}
              <AssetsGradient>
                {assetsUnderManagement} {data.underManagementSymbol}
              </AssetsGradient>
            </AssetsTitle>
          </AssetsBox>
          <AssetsBox>
            <AssetsTitle>
              {t('ArNxm.inReserve')}
              <AssetsGradient>
                {withdrawableAssets} {data.inReserveSymbol}
              </AssetsGradient>
            </AssetsTitle>
          </AssetsBox>
          <AssetsBox>
            <AssetsTitle>
              {t('ArNxm.Conversion')}
              <AssetsGradient>
                1 arNXM: {conversion} {data.inReserveSymbol}
              </AssetsGradient>
            </AssetsTitle>
          </AssetsBox>
          <AssetsBox>
            <AssetsTitle>
              APY
              <AssetsGradient>
                {commas(2).format(arNxmAPY(conversion))}%
              </AssetsGradient>
            </AssetsTitle>
          </AssetsBox>
        </AssetsWrapper>
      )}

      <ArNxmProtocols />
      <ActionModal
        closeModal={false}
        actionText={modalText}
        isModalOpened={isActionModalOpened}
      />
    </>
  )
}

export default withTranslation()(withRouter(withTheme(ArNxm)))
