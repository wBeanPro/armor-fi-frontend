import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { Circle } from 'rc-progress'
import { withTranslation } from 'react-i18next'
import {
  CircleContainer,
  Container,
  ContentTimer,
  Time,
  TimeContainer,
  TimeCount,
  TimeDivider,
  TimeLabel,
  Title,
} from './styled'

const IbcoBigCircle = ({
  theme,
  history,
  title,
  days,
  hours,
  minutes,
  seconds,
  percentFill = 0, // from 0 to 100%
  t,
}) => {
  const colors = theme.colors

  return (
    <>
      <Container>
        <CircleContainer>
          <Circle
            percent={[percentFill, 100]}
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
            <Title>{title}</Title>
            <TimeContainer>
              <Time>
                <TimeCount>{days}</TimeCount>
                <TimeLabel>{t('Ibco.BigCircle.Days')}</TimeLabel>
              </Time>
              <TimeDivider />
              <Time>
                <TimeCount>{hours}</TimeCount>
                <TimeLabel>{t('Ibco.BigCircle.Hours')}</TimeLabel>
              </Time>
              <TimeDivider />
              <Time>
                <TimeCount>{minutes}</TimeCount>
                <TimeLabel>{t('Ibco.BigCircle.Minutes')}</TimeLabel>
              </Time>
              <TimeDivider />
              <Time>
                <TimeCount>{seconds}</TimeCount>
                <TimeLabel>{t('Ibco.BigCircle.Seconds')}</TimeLabel>
              </Time>
            </TimeContainer>
          </ContentTimer>
        </CircleContainer>
      </Container>
    </>
  )
}

export default withTranslation()(withRouter(withTheme(IbcoBigCircle)))
