import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'
import Store from '../../stores/store'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
} from '../../constants'
import GET_MOCK_DATA from './mock'
import IbcoSummary from '../ibcoSummary/IbcoSummary'
import IbcoTransactions from '../ibcoTransactions/IbcoTransactions'
import IbcoBottomDisclaimer from '../ibcoBottomDisclaimer/IbcoBottomDisclaimer'
import moment from 'moment'
import { withTranslation } from 'react-i18next'
import { Circle } from 'rc-progress'
import armorCircleLogo from '../../assets/armor-circle-logo.svg'
import {
  ArmorLogo,
  CircleContainer,
  CirleTitle,
  Container,
  ContentTimer,
  NotifyButton,
  NotifyContainer,
  NotifyText,
  TimeContainer,
  TimeCount,
  TitleStyled,
} from './styled'

const emitter = Store.emitter
const store = Store.store
const TRANSACTIONS_POLL_INTERVAL = 10000 // 60 seconds

const IbcoEnded = ({ classes, history, baseDate, ibcoEndDate, theme, t }) => {
  const [poller, setPoller] = useState(null)
  const [account, setAccount] = useState(null)
  const [sharedArmor, setSharedArmor] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [goalEth, setGoalEth] = useState(null)
  const [startArmorPrice, setStartArmorPrice] = useState(null)
  const [currentArmorPrice, setCurrentArmorPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClaiming, setIsClaiming] = useState(false)
  const { colors } = theme

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (account) {
        await getIbcoData()
        setIsLoading(false)
        const _poller = setInterval(
          () => getIbcoData(),
          TRANSACTIONS_POLL_INTERVAL
        )
        setPoller(_poller)

        return () => {
          clearInterval(poller)
        }
      }
    })()
  }, [account])

  const getIbcoData = async () => {
    const mocked = await GET_MOCK_DATA() // TODO: web3-related functionality for getting current IBCO info
    setGoalEth(mocked.goalEth || null)
    setSharedArmor(mocked.sharedArmor || null)
    setTransactions(mocked.transactions || [])
    setStartArmorPrice(mocked.startArmorPrice || null)
    setCurrentArmorPrice(mocked.currentArmorPrice || null)
  }

  const ethToArmor = (_amountEth) => {
    // TODO: need a formula for ARMOR amount preview
    return +_amountEth * 2
  }

  const errorReturned = (err) => {
    setIsLoading(false)
  }

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => {
    setAccount(null)
  }

  const formatNumberWithCommas = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : num
  }

  const handleClaimArmor = () => {
    setIsClaiming(true)
    // TODO: web3-related code for claiming ARMOR
    setIsClaiming(false)
  }

  // TODO: refactor: move to acomponent see ipcoPrelaunch.jsx
  const getPercent = (_baseDate, _targetDate) => {
    const baseDate = +moment(_baseDate)
    const currentDate = +moment() - baseDate
    const targetDate = +moment(_targetDate) - baseDate
    const percentValue = +((currentDate / targetDate) * 100)
    return percentValue > 0 ? percentValue.toFixed() : '0'
  }
  const percentFill = getPercent(baseDate, ibcoEndDate)

  return (
    <div>
      <TitleStyled>{t('Ibco.Ended.Title')}</TitleStyled>
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
            <CirleTitle>{t('Ibco.Ended.CircleTitle')}</CirleTitle>
            <TimeContainer>
              {isLoading ? (
                <Skeleton width="120px" />
              ) : (
                <TimeCount>{formatNumberWithCommas(sharedArmor)}</TimeCount>
              )}
              <ArmorLogo alt="armor.fi" src={armorCircleLogo} />
            </TimeContainer>
          </ContentTimer>
        </CircleContainer>
      </Container>
      <NotifyContainer>
        {sharedArmor && +sharedArmor > 0 && (
          <NotifyButton
            variant="contained"
            color="primary"
            disabled={isClaiming || isLoading}
            onClick={handleClaimArmor}
          >
            <NotifyText>{t('Ibco.Ended.ButtonTitle')}</NotifyText>
          </NotifyButton>
        )}
      </NotifyContainer>

      <IbcoSummary
        isLoading={isLoading}
        transactions={transactions}
        startArmorPrice={startArmorPrice}
        currentArmorPrice={currentArmorPrice}
        ethToArmor={ethToArmor}
      />
      <IbcoTransactions
        goalEth={goalEth}
        isLoading={isLoading}
        transactions={transactions}
      />
      <IbcoBottomDisclaimer />
    </div>
  )
}

export default withTranslation()(withRouter(withTheme(IbcoEnded)))
