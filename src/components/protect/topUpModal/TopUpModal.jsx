import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import {
  threeDigitFormatter,
  cropNumberLikeString,
  commas,
} from '../../../helpers'
import AboutCircleIcon from '../../icons/AboutCircleIcon'
import {
  ModalTitle,
  ActionContainer,
  Input,
  InputInfo,
  Container,
  CancelButton,
  ContentContainer,
  ContentText,
  Span,
  MainInfo,
  FooterInfo,
  SliderContainer,
  DividerText,
  SliderBox,
  Buttons,
} from './styled'

import AvailableWalletInfo from '../../common/availableWalletInfo/AvailableWalletInfo'
import moment from 'moment'
import Button from '../../common/button/Button'

const DEFAULT_MONTHS_COUNT = 2

const TopUpModal = ({
  t,
  theme,
  closeModal,
  handleSubmit,
  monthlyCost,
  ethBalance,
  ethPrice,
  isUsdPrimary,
}) => {
  const [amount, setAmount] = useState('0')
  const [amountError, setAmountError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [monthsCount, setMonthsCount] = useState(DEFAULT_MONTHS_COUNT)
  const { colors } = theme

  const monthSliderMapper = (index) => {
    const _arr = [0.25, 0.5, 1, 3, 6, 12]
    return _arr[index] || _arr[0]
  }

  useEffect(() => {
    const _monthlyCost = parseFloat(monthlyCost.toString())
    const _amount = (_monthlyCost * monthSliderMapper(monthsCount)).toString()
    setAmount(_amount)
    setIsLoading(false)
  }, [])

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)
    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      setAmount(value)
      setMonthsCount(DEFAULT_MONTHS_COUNT)
    }
  }

  const handleClickTopUp = async () => {
    if (!amount || isNaN(+amount) || +amount <= 0) return setAmountError(true)
    try {
      setIsLoading(true)
      const dataObj = { amount }
      await handleSubmit(dataObj)
      handleCloseModal()
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  const handleChangeMonthsCount = (_monthsCount) => {
    setAmountError(false)
    const _monthlyCost = parseFloat(monthlyCost.toString())
    const value = (
      _monthlyCost * monthSliderMapper(parseFloat(_monthsCount))
    ).toString()
    setAmount(value)
    setMonthsCount(_monthsCount)
  }

  const marks = [
    {
      value: 0,
      label: '+ 1 week',
    },
    {
      value: 1,
      label: '+ 2 weeks',
    },
    {
      value: 2,
      label: '+ 1 month',
    },
    {
      value: 3,
      label: '+ 3 months',
    },
    {
      value: 4,
      label: '+ 6 months',
    },
    {
      value: 5,
      label: '+ 12 months',
    },
  ]

  const handleCloseModal = () => {
    setIsLoading(false)
    closeModal()
  }

  const getArCoreMonthsDays = () => {
    if (ethBalance == 0 || monthlyCost == 0) {
      return '0 Month(s)'
    }
    const _duration = ethBalance / monthlyCost
    return moment.duration(_duration, 'months').format(`M [Month(s)], d [Days]`)
  }
  return (
    <>
      <Container>
        <ContentContainer>
          <ModalTitle>{t('Protect.TopUpModal.Title')}</ModalTitle>
          <MainInfo>
            <ContentText>
              {t('Protect.TopUpModal.Text.P1')}
              <Span>{cropNumberLikeString(monthlyCost)}</Span>
              ETH.&nbsp;
              <br />
              {t('Protect.TopUpModal.Text.CurrentCredit')}{' '}
              <b>{cropNumberLikeString(ethBalance)} ETH</b>{' '}
              {t('Protect.TopUpModal.Text.AmountOfCoverage.P1')}{' '}
              <b>{getArCoreMonthsDays()}</b>
              <br />
              <br />
              {t('Protect.TopUpModal.Text.Perpetual')}
              <br />
              <br />
              {t('Protect.TopUpModal.Text.Slider')}
            </ContentText>
            <SliderContainer>
              <SliderBox
                value={monthsCount}
                min={0}
                max={5}
                currentvalue={parseFloat(amount)}
                monthlycost={monthlyCost}
                step={null}
                marks={marks}
                onChange={(_, _monthsCount) =>
                  handleChangeMonthsCount(_monthsCount)
                }
                ethPrice={ethPrice}
                isUsdPrimary={isUsdPrimary}
              />
              <Buttons>
                <Button
                  buttonText={`${t('Protect.TopUpModal.TopUp')} ${
                    isUsdPrimary
                      ? `$${commas(2).format(amount * ethPrice)}`
                      : `${cropNumberLikeString(amount)} ETH`
                  }`}
                  isDisabled={!amount || isLoading}
                  tooltipText="After clicking an Ethereum transaction will appear, which includes the amount to deposit plus gas fees."
                  onClick={handleClickTopUp}
                  bordered={false}
                  margin="0"
                />
              </Buttons>
            </SliderContainer>
            <DividerText>{t('Protect.TopUpModal.ChooseManually')}:</DividerText>
            <ActionContainer>
              <Input
                value={amount}
                onChange={handleChangeAmount}
                disabled={isLoading}
                error={amountError}
                placeholder="0"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputInfo position="end">ETH</InputInfo>,
                }}
              />
              <Button
                buttonText={t('Protect.TopUpModal.TopUp')}
                isDisabled={!amount || isLoading}
                tooltipText="After clicking an Ethereum transaction will appear, which includes the amount to deposit plus gas fees."
                onClick={handleClickTopUp}
                bordered={false}
                margin="0 0 0 16px"
              />
            </ActionContainer>
          </MainInfo>
          <FooterInfo>
            <AboutCircleIcon color={colors.disabledText} />
            <div>
              <div>{t('Protect.TopUpModal.FooterText.P1')}</div>
              <div>{t('Protect.TopUpModal.FooterText.P2')}</div>
            </div>
          </FooterInfo>
        </ContentContainer>
        <AvailableWalletInfo
          text={`${t('Protect.TopUpModal.WalletBalanceEth')}:`}
          value={`${threeDigitFormatter.format(ethBalance)} ETH`}
        />
      </Container>
      <CancelButton onClick={handleCloseModal}>
        {t('Protect.TopUpModal.Cancel')}
      </CancelButton>
    </>
  )
}

export default withTranslation()(withRouter(withTheme(TopUpModal)))
