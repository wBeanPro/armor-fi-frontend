import React, { useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import CornerBox from '../../shared/cornerBox/CornerBox'
import BoxTitle from '../../shared/boxTitle/BoxTitle'
import Text from '../../shared/text/Text'
import Button from '../../shared/button/Button'
import {
  Container,
  Content,
  ValueContent,
  ButtonWrapper,
  WrapText,
} from './styled'
import moment from 'moment'
import { CancelButton } from '../../protect/confirmCoverModal/styled'
import { fromWei } from 'web3-utils'

const WithdrawPending = ({
  t,
  theme,
  withdrawalRequest,
  availableToWithdraw,
  delayedUntil,
  onWithdraw,
}) => {
  const { colors } = theme

  useEffect(() => {
    isWithdrawalingWithDelay()
  }, [withdrawalRequest])

  const isWithdrawalingWithDelay = () => {
    return withdrawalRequest != null && withdrawalRequest.withdrawalTime > 0
  }
  const formatTimestamp = (_timestamp) =>
    moment.unix(_timestamp).utc().format('MMM Do [at] HH:mm [UTC]')
  const isAvailableToWithdraw = () => {
    if (withdrawalRequest == null || withdrawalRequest.request == null) {
      return false
    }
    if (withdrawalRequest.withdrawalTime === 0) {
      return false
    }
    return withdrawalRequest.withdrawalTime < moment.utc().unix()
  }
  const withdrawalLockAmount = () => {
    if (withdrawalRequest == null || withdrawalRequest.request == null) {
      return 0
    }

    return fromWei(withdrawalRequest.request['arAmount'], 'ether')
  }

  return (
    isWithdrawalingWithDelay() && (
      <Container>
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
          Attention!
          <br />{' '}
          {isAvailableToWithdraw() ? (
            <span>You can now withdraw your wNXM</span>
          ) : (
            <span>You have a pending withdrawal</span>
          )}
        </div>
        {isAvailableToWithdraw() && (
          <Button
            content={`${t(
              'ArNXMPendingWithdraw.Withdraw'
            )} ${withdrawalLockAmount()} wNXM`}
            disabled={!isAvailableToWithdraw(delayedUntil)}
            onClick={onWithdraw}
          />
        )}
        {!isAvailableToWithdraw() && (
          <div style={{ alignSelf: 'center' }}>
            You'll be able to withdraw your{' '}
            <strong>
              {withdrawalLockAmount()} wNXM{' '}
              {moment.unix(withdrawalRequest.withdrawalTime).fromNow()}
            </strong>
          </div>
        )}
      </Container>
    )
  )
}

export default withTranslation()(withTheme(WithdrawPending))
