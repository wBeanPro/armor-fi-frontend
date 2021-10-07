import React, { useState, useEffect } from 'react'
import { withTheme } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import AboutCircleIcon from '../icons/AboutCircleIcon'
import AvailableWalletInfo from '../common/availableWalletInfo/AvailableWalletInfo'
import CheckCircleIcon from '../icons/CheckCircleIcon'
import {
  Wrapper,
  Container,
  Title,
  Description,
  Box,
  ModalTitle,
  ActionContainer,
  Input,
  InputInfo,
  ActiveBtnText,
  CancelButton,
  ContentContainer,
  MainInfo,
  FooterInfo,
  ActiveBtn,
  AnalyzingBox,
  CenterContent,
  AnalizingText,
} from './styled'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'

const ProofOfLoss = ({ t, theme, history }) => {
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [analizing, setAnalizing] = useState(false)
  const { colors } = theme
  const { sdk, connected, safe } = useSafeAppsSDK()

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)
    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      setAmount(value)
    }
  }

  const handleClick = async () => {
    if (!amount || isNaN(+amount) || +amount <= 0) return setAmountError(true)
    try {
      setIsLoading(true)
      setAnalizing(true)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  const handleClose = () => {}

  return (
    <Wrapper>
      <Container>
        <Title>{t('ProofOfLoss.Title')}</Title>
        <Description>{t('ProofOfLoss.Description')}</Description>
        <div>safe address: {safe.safeAddress}</div>
        {analizing ? (
          <AnalyzingBox>
            <CenterContent>
              <CheckCircleIcon color={colors.activeSearch} />
              <AnalizingText>{t('ProofOfLoss.AnalizingText')}</AnalizingText>
            </CenterContent>
          </AnalyzingBox>
        ) : (
          <>
            <Box>
              <ContentContainer>
                <ModalTitle bold>{t('ProofOfLoss.ModalTitle')}</ModalTitle>
                <MainInfo>
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
                    <ActiveBtn
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                      onClick={handleClick}
                    >
                      <ActiveBtnText>
                        {t('ProofOfLoss.ModalButtonText')}
                      </ActiveBtnText>
                    </ActiveBtn>
                  </ActionContainer>
                </MainInfo>
                <FooterInfo>
                  <AboutCircleIcon color={colors.disabledText} />
                  {t('ProofOfLoss.FooterInfo')}
                </FooterInfo>
              </ContentContainer>
              <AvailableWalletInfo
                text={`${t('ProofOfLoss.Available')}:`}
                value="89 ETH"
              />
            </Box>
            <CancelButton onClick={handleClose}>Cancel</CancelButton>
          </>
        )}
      </Container>
    </Wrapper>
  )
}

export default withTranslation()(withRouter(withTheme(ProofOfLoss)))
