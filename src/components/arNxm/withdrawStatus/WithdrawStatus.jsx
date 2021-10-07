import React from 'react'
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

const WithdrawStatus = ({
  t,
  theme,
  availableToWithdraw,
  delayedUntil,
  onWithdraw,
  onCancelModal,
}) => {
  const { colors } = theme

  const isAvailableToWithdraw = (_timestamp) => {
    return _timestamp < moment.utc().unix()
  }

  const formatTimestamp = (_timestamp) =>
    moment.unix(_timestamp).utc().format('MMM Do [at] HH:mm [UTC]')

  return (
    <Content>
      <BoxTitle text={t('ArNXMWithdrawStatus.Title')} />
      <ValueContent>
        <Text text={`${t('ArNXMWithdrawStatus.Pending')}:`} />
        <WrapText>
          <Text
            text={`${availableToWithdraw} arNXM on ${formatTimestamp(
              delayedUntil
            )}`}
            size="lg"
            isBold={true}
            color={colors.primaryLightTrue}
          />
        </WrapText>
      </ValueContent>
      <ButtonWrapper>
        <Button
          content={t('ArNXMWithdrawStatus.Withdraw')}
          disabled={!isAvailableToWithdraw(delayedUntil)}
          onClick={onWithdraw}
        />
        <Button
          content={t('ConfirmCoverModal.Cancel')}
          onClick={onCancelModal}
          variant={'outlined'}
        />
      </ButtonWrapper>
    </Content>
  )
}

export default withTranslation()(withTheme(WithdrawStatus))
