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

const MintModal = ({ handleCloseModal, theme }) => {
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
          <ModalTitle>How much to mint?</ModalTitle>
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
                buttonText="mint"
                isDisabled={false}
                onClick={() => console.log('mint')}
                margin="0 0 0 16px"
              />
            </Buttons>
          </ActionContainer>
          <FooterInfo>
            <AboutCircleIcon color={colors._default} />
            Please be aware there will be an X day delay
          </FooterInfo>
        </ContentContainer>
        <AvailableWalletInfo text="Available:" value="89 ETH" />
      </Container>
      <CancelButton onClick={handleCloseModal}>CANCEL</CancelButton>
    </>
  )
}

export default withTheme(MintModal)
