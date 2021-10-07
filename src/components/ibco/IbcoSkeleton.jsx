import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import { Circle } from 'rc-progress'
import TelegramIcon from '../icons/TelegramIcon'
import { withTheme } from 'styled-components'
import UnlockModal from '../unlockModal/UnlockModal'
import {
  CircleContainer,
  Container,
  ContentTimer,
  NotifyBox,
  NotifyButton,
  NotifyText,
  Root,
  Button,
} from './styled'
import { Title } from '../common/Title'
import VisibleContent from '../common/visibleContent/VisibleContent'

const IbcoSkeleton = ({ theme, t }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const { colors } = theme

  const handleClickWalletAddress = () => {
    setIsModalOpened(true)
  }

  const handleCloseModal = () => {
    setIsModalOpened(false)
  }

  return (
    <>
      <Root>
        <Title>Armor Ibco</Title>
        <VisibleContent height="220">
          <Container>
            <CircleContainer>
              <Circle
                percent={[100, 100]}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeColor={[
                  {
                    '0%': colors.active,
                    '100%': colors.primaryLightTrue,
                  },
                  colors.secondaryDefault,
                ]}
                gapPosition="right"
              />
              <ContentTimer>
                <Button onClick={handleClickWalletAddress}>
                  {t('Home.ConnectWallet')}
                </Button>
              </ContentTimer>
            </CircleContainer>
          </Container>
          <NotifyBox>
            <NotifyButton>
              <NotifyText>{t('Ibco.Prelaunch.ButtonTitle')}</NotifyText>
              <TelegramIcon color={colors.strongDefault} />
            </NotifyButton>
          </NotifyBox>
        </VisibleContent>
      </Root>
      <UnlockModal closeModal={handleCloseModal} modalOpen={isModalOpened} />
    </>
  )
}

export default withTranslation()(withTheme(IbcoSkeleton))
