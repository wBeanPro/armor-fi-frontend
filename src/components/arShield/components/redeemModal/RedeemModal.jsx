import React, { useState } from 'react'
import Button from '../../../common/button/Button'
import AvailableWalletInfo from '../../../common/availableWalletInfo/AvailableWalletInfo'
import AboutCircleIcon from '../../../icons/AboutCircleIcon'
import { withTheme } from 'styled-components'
import {
  Container,
  ContentContainer,
  ModalTitle,
  CancelButton,
  ActionContainer,
  Input,
  InputInfo,
  ButtonWrapper,
  SimpleButton,
  InputWrapper,
  Buttons,
  FooterInfo,
} from './styled'

const RedeemModal = ({ handleCloseModal, theme }) => {
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const { colors } = theme

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)
    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      setAmount(value.toString())
    }
  }

  return (
    <>
      <Container>
        <ContentContainer>
          <ModalTitle>How much to redeem?</ModalTitle>
          <ActionContainer>
            <InputWrapper>
              <ButtonWrapper>
                <SimpleButton>25%</SimpleButton> ·
                <SimpleButton>50%</SimpleButton> ·
                <SimpleButton>75%</SimpleButton> ·
                <SimpleButton>MAX</SimpleButton>
              </ButtonWrapper>
              <Input
                value={amount}
                onChange={handleChangeAmount}
                disabled={false}
                error={amountError}
                placeholder="15.15"
                variant="outlined"
                InputProps={{
                  endAdornment: <InputInfo position="end">ETH</InputInfo>,
                }}
              />
            </InputWrapper>
            <Buttons>
              <Button
                buttonText="redeem"
                isDisabled={false}
                onClick={() => console.log('redeem')}
                margin="0 0 0 16px"
              />
            </Buttons>
          </ActionContainer>
        </ContentContainer>
        <AvailableWalletInfo text="Available:" value="89 ETH" />
      </Container>
      <CancelButton onClick={handleCloseModal}>CANCEL</CancelButton>
    </>
  )
}

export default withTheme(RedeemModal)
