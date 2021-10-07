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
  OptionWrapper,
  Divider,
  OptionContent,
  OptionText,
  Bold,
} from './styled'
import moment from 'moment'
import { commas } from '../../../helpers'
import { CancelButton } from '../../protect/confirmCoverModal/styled'
import { fromWei } from 'web3-utils'

const WithdrawOption = ({
  t,
  theme,
  withdrawDelay,
  withdrawFee,
  availableToWithdraw,
  conversionRate,
  onWithdrawWithFee,
  onWithdrawWithDelay,
  onCancelModal,
  withdrawalRequest,
}) => {
  const { colors } = theme

  const withdrawalLockAmount = () => {
    if (withdrawalRequest == null || withdrawalRequest.request == null) {
      return 0
    }

    return fromWei(withdrawalRequest.request['arAmount'], 'ether')
  }
  const isWithdrawalingWithDelay = () => {
    return withdrawalRequest != null && withdrawalRequest.withdrawalTime > 0
  }
  const formatTimestamp = (_timestamp) =>
    moment.unix(_timestamp).utc().format('MMM Do [at] HH:mm [UTC]')
  const availableWNxmToWithdraw = () => {
    return availableToWithdraw * conversionRate
  }

  const availableToWithdrawAfterFee = () => {
    return availableWNxmToWithdraw() * (1 - withdrawFee() / 100)
  }

  const dateTimeAfterDelay = () =>
    moment().add(withdrawDelay, 's').utc().format('MMM Do [at] HH:mm [UTC]')

  return (
    <Content>
      <BoxTitle text={t('ArNXMWithdrawOption.Title')} />
      <ValueContent>
        <Text
          text={`${availableToWithdraw} arNXM`}
          size="lg"
          isBold={true}
          color={colors.primaryLightTrue}
        />
      </ValueContent>

      <OptionWrapper>
        <OptionContent>
          <Button
            content={`WITHDRAW WITH ${withdrawFee()}% FEE`}
            onClick={onWithdrawWithFee}
          />
          <OptionText>
            <Text
              text={
                <>
                  Receive{' '}
                  <Bold>
                    {commas(4).format(availableToWithdrawAfterFee())} wNXM
                  </Bold>{' '}
                  immediately
                </>
              }
              color={colors.secondaryDefault}
            />
          </OptionText>
        </OptionContent>
        <Divider />
        <OptionContent>
          <Button
            content="WITHDRAW WITH 48H DELAY"
            disabled={isWithdrawalingWithDelay()}
            onClick={onWithdrawWithDelay}
          />
          <OptionText>
            {isWithdrawalingWithDelay() ? (
              <Text
                text={`Only one withdrawal may be pending at a time`}
                isBold={false}
                color={colors.disabledText}
              />
            ) : (
              <Text
                text={
                  <>
                    Receive <Bold>{availableWNxmToWithdraw()} wNXM</Bold> on{' '}
                    <Bold>{dateTimeAfterDelay()}</Bold>
                  </>
                }
                color={colors.secondaryDefault}
              />
            )}
          </OptionText>
        </OptionContent>
      </OptionWrapper>
      <CancelButton onClick={onCancelModal}>
        {t('ConfirmCoverModal.Cancel')}
      </CancelButton>
    </Content>
  )
}

export default withTranslation()(withTheme(WithdrawOption))
