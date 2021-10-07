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
  Value,
  TooltipSpan,
} from './styled'
import { ERROR } from '../../../../constants'
import ActionModal from '../../../common/actionModal/ActionModal'
import WrapNxm from '../../../wrapNxm/WrapNxm'
import Tooltip from '@material-ui/core/Tooltip'
import { HelpIcon } from '../../../wrapNxm/styled'
import { NXMEvents } from '../../../../stores/contracts/NXMEvents'
import { WNXMEvents } from '../../../../stores/contracts/wNXMEvents'
import { ArNXMTokenEvents } from '../../../../stores/contracts/arNXMTokenEvents'
import AboutInfoIcon from '../../../icons/AboutInfoIcon'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const ArNxmWrapAndStake = ({
  classes,
  data,
  t,
  conversion,
  network,
  account,
  theme,
}) => {
  const [amount, setAmount] = useState('')
  const [currentAmount, setCurrentAmount] = useState('')
  const [nxmBalance, setNxmBalance] = useState(0.0)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [modalText, setModalText] = useState('')
  const { colors } = theme

  useEffect(() => {
    if (account && account.address) {
      dispatcher.dispatch({
        type: NXMEvents.GetBalance,
        content: {},
      })
    }

    emitter.on(ERROR, errorReturned)
    emitter.on(ArNxmVaultEvents.DepositCompleted, onDepositCompleted)
    emitter.on(ArNxmVaultEvents.ApprovalCompleted, onApprovalCompleted)
    emitter.on(WNXMEvents.WrapCompleted, onWrapCompleted)
    emitter.on(NXMEvents.ApproveCompleted, onNXMApproveCompleted)
    emitter.on(NXMEvents.BalanceReturned, NXMBalanceReturned)

    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(
        ArNxmVaultEvents.DepositCompleted,
        onDepositCompleted
      )
      emitter.removeListener(
        ArNxmVaultEvents.ApprovalCompleted,
        onApprovalCompleted
      )
      emitter.removeListener(WNXMEvents.WrapCompleted, onWrapCompleted)
      emitter.removeListener(NXMEvents.ApproveCompleted, onNXMApproveCompleted)
      emitter.removeListener(NXMEvents.BalanceReturned, NXMBalanceReturned)
    }
  }, [])

  const handleClickWrapAndStake = (_amount) => {
    validateAmount(_amount)

    setModalText('Waiting on NXM Approval. This may take a few minutes.')
    setIsModalOpened(true)
    dispatcher.dispatch({
      type: ArNxmVaultEvents.Deposit,
      content: {
        amount: _amount.toString(),
        isNxm: true,
      },
    })

    // dispatcher.dispatch({
    //   type: WNXMEvents.Wrap,
    //   content: { amount: _amount.toString() },
    // })
  }

  const NXMBalanceReturned = () => {
    const _balance = store.getStore('NXM_Balance')
    setNxmBalance(_balance)
  }

  const onNXMApproveCompleted = () => {
    setModalText('Waiting on Deposit. This may take a few minutes.')
  }

  const onWrapCompleted = () => {
    setIsModalOpened(false)
    dispatcher.dispatch({
      type: NXMEvents.GetBalance,
      content: {},
    })
    dispatcher.dispatch({
      type: WNXMEvents.GetBalance,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNXMTokenEvents.GetBalance,
      content: {},
    })
    // setModalText('Waiting on WNXM Approval. This may take a few minutes.')
    // dispatcher.dispatch({
    //   type: ArNxmVaultEvents.Deposit,
    //   content: { amount: currentAmount },
    // })
  }

  const onDepositCompleted = () => {
    setIsModalOpened(false)
  }

  const onApprovalCompleted = () => {
    setModalText('Waiting on Deposit. This may take a few minutes.')
  }

  const errorReturned = (error) => setIsModalOpened(false)

  const validateAmount = (_amount) => {
    if (
      !_amount ||
      _amount.toString().includes('e') ||
      _amount.toString().includes('.') ||
      _amount.toString().includes(',') ||
      isNaN(+_amount) ||
      _amount <= 0 ||
      !Number.isInteger(+_amount)
    ) {
      throw new Error(t('ArNxm.AmountError'))
    }
  }

  const renderHelp = () => {
    return (
      <div>
        <h5>{t('ArNxm.Help.Title')}</h5>
        <ul>
          <li>{t('ArNxm.Help.1')}</li>
          <li>{t('ArNxm.Help.2')}</li>
          <li>{t('ArNxm.Help.3')}</li>
          <li>{t('ArNxm.Help.4')}</li>
          <li>{t('ArNxm.Help.5')}</li>
        </ul>
      </div>
    )
  }

  const handleChangeAmount = (e) => {
    setAmount(e.target.value)
  }

  const countDecimals = (value) => {
    if (Math.floor(value) === value) return 0
    return value.toString().split('.')[1].length || 0
  }

  const handleWrapMaxAmount = () => {
    if (nxmBalance.toString() === 'false') {
      return
    }

    let _value = parseFloat(nxmBalance)
    if (countDecimals(_value) >= 5) {
      _value -= 0.000042
    }

    setAmount(_value)
  }

  const disableTooltip =
    !amount ||
    amount.toString().includes('e') ||
    amount.toString().includes('.') ||
    amount.toString().includes(',') ||
    isNaN(+amount) ||
    amount <= 0 ||
    !Number.isInteger(+amount)

  return (
    <Container>
      <Action>
        <ActionTitle>
          <InputTitle>
            <Tooltip
              arrow
              placement="top"
              enterTouchDelay={50}
              title={renderHelp()}
            >
              <TooltipSpan>
                <AboutInfoIcon color={colors._default} />
              </TooltipSpan>
            </Tooltip>
            <span>NXM {t('ArNxm.Balance')}: </span>
            <b>{twoDigitFormatter.format(nxmBalance)} NXM</b>
          </InputTitle>
          <MaxButton onClick={handleWrapMaxAmount}>MAX</MaxButton>
        </ActionTitle>
        <TextField
          fullWidth
          // placeholder={t('ArNxm.AmountHint')}
          placeholder={'0'}
          variant="outlined"
          type="text"
          onChange={handleChangeAmount}
          value={amount}
          disabled={false}
        />
      </Action>
      <Value>
        {(amount &&
          conversion &&
          +conversion > 0 &&
          twoDigitFormatter.format(amount / conversion)) ||
          '0'}{' '}
        arNXM
      </Value>
      <ButtonWithTooltip>
        <Tooltip
          title={t('ArNxm.DisabledButtonTooltip')}
          placement="bottom"
          disableFocusListener={!disableTooltip}
          disableHoverListener={!disableTooltip}
          disableTouchListener={!disableTooltip}
          enterTouchDelay={50}
          arrow
        >
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={disableTooltip}
              onClick={() => handleClickWrapAndStake(amount)}
            >
              <ButtonText>{t('ArNxm.WrapAndStake')}</ButtonText>
            </Button>
          </div>
        </Tooltip>
      </ButtonWithTooltip>
      <ActionModal
        closeModal={false}
        actionText={modalText}
        isModalOpened={isModalOpened}
      />
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(ArNxmWrapAndStake)))
