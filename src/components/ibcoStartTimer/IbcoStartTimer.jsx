import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { withTheme } from 'styled-components'
import Countdown from 'react-countdown'
import { withTranslation } from 'react-i18next'
import {
  Container,
  Wrapper,
  Title,
  TimeBox,
  Time,
  TimeTitle,
  TimeContent,
  TimeDivider,
} from './styled'
import cnf from '../../config/cnf'

const IbcoStartTimer = ({ classes, history, t }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isIbcoStarted, setIsIbcoStarted] = useState(false)
  const [isHomePage, setIsHomePage] = useState(false)
  const [isIbcoPage, setIsIbcoPage] = useState(false)

  useEffect(() => {
    const startDate = moment(cnf.IBCO_START_DATE)
    if (moment().isSameOrAfter(startDate)) {
      setIsIbcoStarted(true)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsHomePage(history.location.pathname === '/')
    setIsIbcoPage(history.location.pathname === '/ibco')
  }, [history.location.pathname])

  const handleCompleteCountdown = () => {
    setIsIbcoStarted(true)
  }

  return isLoading ? null : (
    <>
      {isIbcoPage || isIbcoStarted ? null : (
        <Container home={isHomePage}>
          <Wrapper home={isHomePage}>
            <Title home={isHomePage}>{t('Ibco.StartTimer.Title')}</Title>
            <Countdown
              date={+moment(cnf.IBCO_START_DATE)}
              now={() => +moment()}
              onComplete={handleCompleteCountdown}
              renderer={({
                completed,
                formatted: { days, hours, minutes, seconds },
              }) => {
                if (completed) return <></>
                return (
                  <TimeBox>
                    <Time>
                      <TimeTitle home={isHomePage}>{days}</TimeTitle>
                      <TimeContent home={isHomePage}>
                        {t('Ibco.StartTimer.Days')}
                      </TimeContent>
                    </Time>
                    <TimeDivider />
                    <Time>
                      <TimeTitle home={isHomePage}>{hours}</TimeTitle>
                      <TimeContent home={isHomePage}>
                        {t('Ibco.StartTimer.Hours')}
                      </TimeContent>
                    </Time>
                    <TimeDivider />
                    <Time>
                      <TimeTitle home={isHomePage}>{minutes}</TimeTitle>
                      <TimeContent home={isHomePage}>
                        {t('Ibco.StartTimer.Minutes')}
                      </TimeContent>
                    </Time>
                    <TimeDivider />
                    <Time>
                      <TimeTitle home={isHomePage}>{seconds}</TimeTitle>
                      <TimeContent home={isHomePage}>
                        {t('Ibco.StartTimer.Sec')}
                      </TimeContent>
                    </Time>
                  </TimeBox>
                )
              }}
            />
          </Wrapper>
        </Container>
      )}
    </>
  )
}

export default withTranslation()(withRouter(withTheme(IbcoStartTimer)))
