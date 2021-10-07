import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip'
import {
  Action,
  ActionButton,
  ButtonText,
  ActionText,
  FieldTitle,
  FieldValue,
} from './styled'
import { DAYS_FOR_CLAIM } from '../../constants'

const CoverActions = ({
  t,
  contract,
  actionsDisabled,
  onClaim,
  onSwap,
  onRedeem,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isClaimable, setIsClaimable] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [isSwappable, setIsSwappable] = useState(false)
  const [isSwapping, setIsSwapping] = useState(false)
  const [isRedeemable, setIsRedeemable] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isRejected, setIsRejected] = useState(false)
  const [isClaimAccepted, setIsClaimAccepted] = useState(false)
  const [isClaimDenied, setIsClaimDenied] = useState(false)
  const [isClaimExpired, setIsClaimExpired] = useState(false)
  const [isClaimSubmitted, setIsClaimSubmitted] = useState(false)
  const [isClaimRequested, setIsClaimRequested] = useState(false)
  const [isSwapExpired, setIsSwapExpired] = useState(false)

  const isYNFT = ['yNFT'].includes(contract.insuranceContractName)
  const isARNFT = ['arNFT v1', 'arNFT v2'].includes(
    contract.insuranceContractName
  )

  useEffect(() => {
    // console.log({ contract })

    // Detect if contract is yNFT-related to make it swappable
    if (isYNFT) {
      setIsSwappable(true)

      // Detect if Claim expired
      if (contract.coverStatus === '3') {
        setIsSwapExpired(true)
      }
    }

    if (isARNFT) {
      // Detect if claimable
      if (isNotExpiredForClaim(contract.expirationTimestamp, DAYS_FOR_CLAIM)) {
        setIsClaimable(true)
      }

      // Detect if Claim expired
      if (contract.coverStatus === '3') {
        setIsClaimExpired(true)
      }

      // Detect if redeemable
      if (!isYNFT && contract.finalVerdict === '1') {
        setIsRedeemable(true)
      }

      // Detect if pending
      if (contract.finalVerdict === '0' && contract.claimId !== '0') {
        setIsPending(true)
      }

      // Detect if rejected
      if (contract.finalVerdict === '-1') {
        setIsRejected(true)
      }

      // Detect if Claim accepted
      if (contract.coverStatus === '1') {
        setIsClaimAccepted(true)
      }

      // Detect if Claim denied
      if (contract.coverStatus === '2') {
        setIsClaimDenied(true)
      }

      // Detect if Claim submitted
      if (contract.coverStatus === '4') {
        setIsClaimSubmitted(true)
      }

      // Detect if Claim requested
      if (contract.coverStatus === '5') {
        setIsClaimRequested(true)
      }
    }

    setIsLoading(false)
  }, [])

  const isNotExpiredForClaim = (
    _date = moment().utc().unix(),
    _additionalDays = '0'
  ) => {
    const _targetDate = moment.unix(_date).utc()
    const targetDate = _targetDate.add(_additionalDays, 'days')
    return moment().utc().isBefore(targetDate)
  }

  const handleClickClaim = async () => {
    setIsClaiming(true)
    await onClaim(contract)
    setIsClaiming(false)
  }

  const handleClickSwap = async () => {
    setIsSwapping(true)
    await onSwap(contract)
    setIsSwapping(false)
  }

  const handleClickRedeem = async () => {
    setIsRedeeming(true)
    await onRedeem(contract)
    setIsRedeeming(false)
  }

  return isLoading ? null : (
    <Action>
      {isPending && (
        <ActionText>
          <FieldTitle bold>{t('Dashboard.Item.Status')}</FieldTitle>
          <FieldValue noWrap>{t('Dashboard.Item.Pending')}</FieldValue>
        </ActionText>
      )}

      {isRejected && (
        <ActionText>
          <FieldTitle bold>{t('Dashboard.Item.Status')}</FieldTitle>
          <FieldValue noWrap>{t('Dashboard.Item.Rejected')}</FieldValue>
        </ActionText>
      )}

      {isClaimAccepted && (
        <ActionText>
          <FieldTitle bold>{t('Dashboard.Item.Status')}</FieldTitle>
          <FieldValue noWrap>{t('Dashboard.Item.Accepted')}</FieldValue>
        </ActionText>
      )}

      {isClaimDenied && (
        <ActionText>
          <FieldTitle bold>{t('Dashboard.Item.Status')}</FieldTitle>
          <FieldValue noWrap>{t('Dashboard.Item.Denied')}</FieldValue>
        </ActionText>
      )}

      {isClaimExpired && !isClaimable && (
        <ActionText>
          <FieldTitle bold>{t('Dashboard.Item.Status')}</FieldTitle>
          <FieldValue noWrap>{t('Dashboard.Item.Expired')}</FieldValue>
        </ActionText>
      )}

      {isClaimSubmitted && (
        <ActionText>
          <FieldTitle bold>{t('Dashboard.Item.Status')}</FieldTitle>
          <FieldValue noWrap>{t('Dashboard.Item.Submitted')}</FieldValue>
        </ActionText>
      )}

      {isClaimRequested && (
        <ActionText>
          <FieldTitle bold>{t('Dashboard.Item.Status')}</FieldTitle>
          <FieldValue noWrap>{t('Dashboard.Item.Requested')}</FieldValue>
        </ActionText>
      )}

      {isSwappable && !isSwapExpired && (
        <ActionButton
          variant="outlined"
          color="primary"
          disabled={actionsDisabled || isSwapping}
          onClick={handleClickSwap}
        >
          <ButtonText>{t('Dashboard.Item.Swap')}</ButtonText>
        </ActionButton>
      )}

      {isClaimable && (
        <ActionButton
          variant="outlined"
          color="primary"
          disabled={actionsDisabled || isClaiming}
          onClick={handleClickClaim}
        >
          <ButtonText>{t('Dashboard.Item.Claim')}</ButtonText>
        </ActionButton>
      )}

      {isRedeemable && (
        <Tooltip arrow title={t('Dashboard.Item.ComingSoon')} placement="top">
          <span>
            <ActionButton
              variant="outlined"
              color="primary"
              // disabled={actionsDisabled || isRedeeming} // TODO: uncomment somewhen
              disabled
              onClick={handleClickRedeem}
            >
              <ButtonText>{t('Dashboard.Item.Redeem')}</ButtonText>
            </ActionButton>
          </span>
        </Tooltip>
      )}
    </Action>
  )
}

export default withTranslation()(CoverActions)
