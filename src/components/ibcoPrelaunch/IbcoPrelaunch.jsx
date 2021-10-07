import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import moment from 'moment'
import Countdown from 'react-countdown'
import IbcoBigCircle from '../ibcoBigCircle/IbcoBigCircle'
import TelegramIcon from '../icons/TelegramIcon'
import { withTranslation } from 'react-i18next'
import { NotifyBox, NotifyButton, NotifyText, TitleStyled } from './styled'

const IbcoPrelaunch = ({ baseDate, ibcoStartDate, onComplete, theme, t }) => {
  const { colors } = theme

  const handleCompleteCountdown = () => {
    onComplete(true)
  }

  const getPercent = (_baseDate, _targetDate) => {
    const baseDate = +moment(_baseDate)
    const currentDate = +moment() - baseDate
    const targetDate = +moment(_targetDate) - baseDate
    const percentValue = +((currentDate / targetDate) * 100)
    return percentValue > 0 ? percentValue.toFixed() : '0'
  }

  return (
    <div>
      <TitleStyled>{t('Ibco.Prelaunch.Title')}</TitleStyled>
      <Countdown
        date={+moment(ibcoStartDate)}
        now={() => +moment()}
        renderer={({ completed, formatted }) => {
          if (completed) return <></>
          return (
            <IbcoBigCircle
              title={t('Ibco.Prelaunch.BigCircleTitle')}
              percentFill={getPercent(baseDate, ibcoStartDate)}
              baseDate={+moment(baseDate)}
              ibcoStartDate={+moment(ibcoStartDate)}
              initialRemainingTime={+moment() - +moment(baseDate)}
              {...formatted}
            />
          )
        }}
        onComplete={handleCompleteCountdown}
      />

      <NotifyBox>
        <NotifyButton
          href="http://t.me/armor_ann"
          rel="noreferrer"
          target="_blank"
        >
          <NotifyText>{t('Ibco.Prelaunch.ButtonTitle')}</NotifyText>
          <TelegramIcon color={colors.secondary} />
        </NotifyButton>
      </NotifyBox>
    </div>
  )
}

export default withTranslation()(withRouter(withTheme(IbcoPrelaunch)))
