import React, { useEffect, useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import { twoDigitFormatter } from '../../../../helpers'
import Store from '../../../../stores/store'
import { ArNXMVaultEvents as ArNxmVaultEvents } from '../../../../stores/contracts/arNXMVaultEvents'
import {
  Container,
  Action,
  ActionTitle,
  InputTitle,
  MaxButton,
  TextField,
  Button,
  ButtonText,
  ButtonWithTooltip,
  BalancesWrapper,
  Value,
} from './styled'
import { ERROR } from '../../../../constants'
import ActionModal from '../../../common/actionModal/ActionModal'
import WrapNxm from '../../../wrapNxm/WrapNxm'
import ArNxmWrapAndStake from '../arNxmWrapAndStake/ArNxmWrapAndStake'
import Tooltip from '@material-ui/core/Tooltip'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const ArNxmStakeUnstakeContainer = ({
  classes,
  data,
  t,
  wNXMBalance,
  arNXMTokenBalance,
  conversion,
  network,
  account,
  nxmAvailable,
  onSwapArNxmForWNxm,
  withdrawalRequest,
}) => {
  const [stakeValue, setStakeValue] = useState('')
  const [unstakeValue, setUnstakeValue] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalText, setModalText] = useState('')

  useEffect(() => {
    emitter.on(ERROR, errorReturned)
    emitter.on(ArNxmVaultEvents.DepositCompleted, onDepositCompleted)
    emitter.on(ArNxmVaultEvents.ApprovalCompleted, onApprovalCompleted)
    emitter.on(ArNxmVaultEvents.WithdrawalCompleted, onWithdrawCompleted)

    return () => {
      emitter.removeListener(
        ArNxmVaultEvents.DepositCompleted,
        onDepositCompleted
      )
      emitter.removeListener(
        ArNxmVaultEvents.ApprovalCompleted,
        onApprovalCompleted
      )
      emitter.removeListener(
        ArNxmVaultEvents.WithdrawalCompleted,
        onWithdrawCompleted
      )
    }
  }, [])

  const onDepositCompleted = () => {
    setIsModalOpened(false)
  }

  const onApprovalCompleted = () => {
    setModalText('Waiting to swap for arNXM. This may take a few minutes.')
  }

  const onWithdrawCompleted = () => {
    setIsModalOpened(false)
  }

  const errorReturned = (error) => setIsModalOpened(false)

  const handleChangeStake = (e) => {
    const _stakeValue = e.target.value
    if (_stakeValue.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+_stakeValue)) {
      setStakeValue(_stakeValue)
    }
  }

  const handleChangeUnstake = (e) => {
    const _unstakeValue = e.target.value
    if (_unstakeValue.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+_unstakeValue)) {
      setUnstakeValue(_unstakeValue)
    }
  }

  const countDecimals = (value) => {
    if (Math.floor(value) === value) return 0
    return value.toString().split('.')[1].length || 0
  }

  const handleStakeMaxClick = () => {
    if (wNXMBalance.toString() === 'false' || wNXMBalance.toString() === '0') {
      return
    }

    let _value = parseFloat(wNXMBalance)
    if (countDecimals(_value) >= 5) {
      _value -= 0.000042
    }

    setStakeValue(_value)
  }

  const handleUnStakeMaxClick = () => {
    if (
      arNXMTokenBalance.toString() === 'false' ||
      arNXMTokenBalance.toString() === '0'
    ) {
      return
    }

    let _value = parseFloat(arNXMTokenBalance)
    if (countDecimals(_value) >= 5) {
      _value -= 0.000042
    }

    setUnstakeValue(_value)
  }

  const isWithdrawalingWithDelay = () => {
    return withdrawalRequest != null && withdrawalRequest.withdrawalTime > 0
  }

  const handleClickStake = () => {
    setModalText('Waiting on Approval. This may take a few minutes.')
    setIsModalOpened(true)
    dispatcher.dispatch({
      type: ArNxmVaultEvents.Deposit,
      content: {
        amount: stakeValue.toString(),
        isNxm: false,
      },
    })
  }

  const handleClickUnstake = () => {
    onSwapArNxmForWNxm(unstakeValue.toString())
    // setModalText('Waiting to swap for wNXM. This may take a few minutes.')
    // setIsModalOpened(true)
    // dispatcher.dispatch({
    //   type: ArNxmVaultEvents.Withdrawal,
    //   content: { amount: unstakeValue.toString() },
    // })
  }

  return (
    <>
      <Container>
        <ArNxmWrapAndStake
          network={network}
          account={account}
          conversion={conversion}
        />
        <Action>
          <div>
            <ActionTitle>
              <InputTitle>
                <span>{t('HarvestArnxm.Balance')}: </span>
                {twoDigitFormatter.format(wNXMBalance)} wNXM{' '}
                {+wNXMBalance > 0 && +conversion > 0 && (
                  <span>
                    - {twoDigitFormatter.format(wNXMBalance / conversion)} arNXM
                  </span>
                )}
              </InputTitle>
              <MaxButton onClick={handleStakeMaxClick}>MAX</MaxButton>
            </ActionTitle>
            <TextField
              fullWidth
              placeholder="0"
              variant="outlined"
              type="text"
              onChange={handleChangeStake}
              value={stakeValue}
            />
          </div>
          <Value>
            {(stakeValue &&
              conversion &&
              +conversion > 0 &&
              twoDigitFormatter.format(stakeValue / conversion)) ||
              '0'}{' '}
            arNXM
          </Value>
          <ButtonWithTooltip>
            <Tooltip
              title={t('ArNxm.DisabledButtonTooltip')}
              enterTouchDelay={50}
              placement="bottom"
              disableFocusListener={stakeValue > 0}
              disableHoverListener={stakeValue > 0}
              disableTouchListener={stakeValue > 0}
              arrow
            >
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!stakeValue}
                  onClick={handleClickStake}
                >
                  <ButtonText>{t('HarvestArnxm.Stake')}</ButtonText>
                </Button>
              </div>
            </Tooltip>
          </ButtonWithTooltip>
        </Action>

        <Action>
          <div>
            <ActionTitle>
              <InputTitle>
                <span>{t('HarvestArnxm.Staked')}: </span>
                {twoDigitFormatter.format(arNXMTokenBalance)} arNXM -{' '}
                {twoDigitFormatter.format(arNXMTokenBalance * conversion)} wNXM
              </InputTitle>
              <MaxButton onClick={handleUnStakeMaxClick}>MAX</MaxButton>
            </ActionTitle>
            <TextField
              fullWidth
              placeholder="0"
              variant="outlined"
              type="text"
              onChange={handleChangeUnstake}
              value={unstakeValue}
            />
          </div>
          <BalancesWrapper>
            <Value>
              {twoDigitFormatter.format(unstakeValue * conversion)} wNXM
            </Value>
            <Value>Available: {nxmAvailable} wNXM</Value>
          </BalancesWrapper>
          <ButtonWithTooltip>
            <Tooltip
              title={
                unstakeValue * conversion > nxmAvailable
                  ? 'Currently there is not enough wNXM available to swap the requested amount.'
                  : t('ArNxm.DisabledButtonTooltip')
              }
              disableHoverListener={
                unstakeValue > 0 && unstakeValue * conversion < nxmAvailable
              }
              disableFocusListener={
                unstakeValue > 0 && unstakeValue * conversion < nxmAvailable
              }
              disableTouchListener={
                unstakeValue > 0 && unstakeValue * conversion < nxmAvailable
              }
              enterTouchDelay={50}
              placement="bottom"
              arrow
            >
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    !unstakeValue || unstakeValue * conversion > nxmAvailable
                  }
                  onClick={handleClickUnstake}
                >
                  <ButtonText>{t('HarvestArnxm.Unstake')}</ButtonText>
                </Button>
              </div>
            </Tooltip>
          </ButtonWithTooltip>
        </Action>
      </Container>
      <ActionModal
        closeModal={false}
        actionText={modalText}
        isModalOpened={isModalOpened}
      />
      {/*<div className={classes.actionFooter}>*/}
      {/*  <Button*/}
      {/*    className={classes.mainButton}*/}
      {/*    variant="contained"*/}
      {/*    color="primary"*/}
      {/*  >*/}
      {/*    <Typography className={classes.mainButtonText} variant={'h4'}>*/}
      {/*      {t('HarvestArnxm.Harvest')}*/}
      {/*    </Typography>*/}
      {/*    <DownloadIcon color={colors.secondary} />*/}
      {/*  </Button>*/}
      {/*  <Typography className={classes.footerText}>*/}
      {/*    {t('HarvestArnxm.InfoText')}*/}
      {/*  </Typography>*/}

      {/*</div>*/}
    </>
  )
}

export default withTranslation()(
  withRouter(withTheme(ArNxmStakeUnstakeContainer))
)
