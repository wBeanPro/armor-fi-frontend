import React from 'react'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import WalletButton from '../../common/walletButton/WalletButton'
import connectDisconnected from '../../../assets/logos/connect_disconnected.svg'
import checkMark from '../../../assets/logos/check_circle.svg'

import {
  Container,
  HeaderImage,
  InfoTitle,
  CheckmarkBox,
  Row,
  RowText,
  InfoBox,
  Title,
  StepWrapper,
  Step,
  StepNumber,
  StepText,
  FooterText,
} from './styled'

const WalletDisconnected = ({ t }) => {
  const infoData = [
    {
      text: 'Protect.WalletDisconnected.P1',
    },
    {
      text: 'Protect.WalletDisconnected.P2',
    },
    {
      text: 'Protect.WalletDisconnected.P3',
    },
  ]

  const stepsData = [
    {
      id: '1',
      text: 'Protect.WalletDisconnected.Step1',
    },
    {
      id: '2',
      text: 'Protect.WalletDisconnected.Step2',
    },
    {
      id: '3',
      text: 'Protect.WalletDisconnected.Step3',
    },
  ]
  return (
    <Container>
      <Title>{t('Protect.WalletDisconnected.Title')}</Title>
      <StepWrapper>
        {stepsData.map(({ id, text }) => (
          <Step key={id}>
            <StepNumber>{id}</StepNumber>
            <StepText>{t(text)}</StepText>
          </Step>
        ))}
      </StepWrapper>
      <InfoBox>
        <HeaderImage src={connectDisconnected} alt="connect disconnected" />
        <InfoTitle>{t('Protect.WalletDisconnected.InfoTitle')}:</InfoTitle>
        <CheckmarkBox>
          {infoData.map(({ text }, index) => (
            <Row key={index}>
              <img src={checkMark} alt="check mark" />
              <RowText>{t(text)}</RowText>
            </Row>
          ))}
        </CheckmarkBox>
        <WalletButton />
      </InfoBox>
      <FooterText>{t('Protect.WalletDisconnected.FooterText1')}</FooterText>
      <FooterText>
        <span>Note: </span>
        {t('Protect.WalletDisconnected.FooterText2')}
        <br />
        {t('Protect.WalletDisconnected.FooterText3')}
      </FooterText>
    </Container>
  )
}

export default withTranslation()(withTheme(WalletDisconnected))
