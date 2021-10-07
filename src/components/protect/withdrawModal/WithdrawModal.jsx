import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { countDecimals, threeDigitFormatter } from '../../../helpers'
import AvailableWalletInfo from '../../common/availableWalletInfo/AvailableWalletInfo'
import {
  ModalTitle,
  ActionContainer,
  Input,
  InputInfo,
  ActiveBtn,
  ActiveBtnText,
  Container,
  ContentContainer,
  CancelButton,
  MaxButton,
} from './styled'

const WithdrawModal = ({
  t,
  theme,
  closeModal,
  handleSubmit,
  arcoreBalance,
}) => {
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = theme

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)
    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      setAmount(value)
    }
  }

  const handleClickWithdraw = async () => {
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

  const handleCloseModal = () => {
    setIsLoading(false)
    closeModal()
  }

  const handleMaxClick = () => {
    if (
      arcoreBalance.toString() === 'false' ||
      arcoreBalance.toString() === '0'
    ) {
      return
    }

    let _value = parseFloat(arcoreBalance)
    if (countDecimals(_value) >= 5) {
      _value -= 0.000042
    }

    setAmount(_value.toString())
  }

  return (
    <>
      <Container>
        <ContentContainer>
          <ModalTitle>{t('Protect.ArCoreWithdrawModal.Title')}</ModalTitle>
          <ActionContainer>
            <div>
              <MaxButton onClick={handleMaxClick}>MAX</MaxButton>
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
            </div>
            <ActiveBtn
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={handleClickWithdraw}
              style={{ verticalAlign: 'top' }}
            >
              <ActiveBtnText>{t('Protect.Withdraw')}</ActiveBtnText>
            </ActiveBtn>
          </ActionContainer>
        </ContentContainer>
        <AvailableWalletInfo
          text={`${t('Protect.ArCoreWithdrawModal.Available')}:`}
          value={`${threeDigitFormatter.format(arcoreBalance)} ETH`}
        />
      </Container>
      <CancelButton onClick={handleCloseModal}>
        {t('Protect.ArCoreWithdrawModal.Cancel')}
      </CancelButton>
    </>
  )
}

export default withTranslation()(withRouter(withTheme(WithdrawModal)))
