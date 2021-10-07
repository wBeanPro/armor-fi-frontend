import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Countdown from 'react-countdown'
import { withTheme } from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'
import moment from 'moment'
import Store from '../../stores/store'
import IbcoBigCircle from '../ibcoBigCircle/IbcoBigCircle'
import IbcoCircle from '../ibcoCircle/IbcoCircle'
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
} from '../../constants'
import { IbcoEvents } from '../../stores/contracts/ibcoEvents'
import IbcoSummary from '../ibcoSummary/IbcoSummary'
import IbcoTransactions from '../ibcoTransactions/IbcoTransactions'
import IbcoBottomDisclaimer from '../ibcoBottomDisclaimer/IbcoBottomDisclaimer'
import LogoIcon from '../icons/LogoIcon'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import { withTranslation } from 'react-i18next'
import Web3 from 'web3'
import { twoDigitFormatter } from '../../helpers'
import {
  Container,
  TitleStyled,
  Wrapper,
  LogoContainer,
  ProgressContainer,
  MiddleCircle,
  ActionContainer,
  InputContent,
  InputLabel,
  TextField,
  InputAdornment,
  ArrowDivider,
  Button,
  ButtonText,
} from './styled'

const emitter = Store.emitter
const store = Store.store
const dispatcher = Store.dispatcher
const TRANSACTIONS_POLL_INTERVAL = 60000 // 60 seconds

const IbcoDuring = ({
  history,
  baseDate,
  ibcoEndDate,
  onComplete,
  network,
  theme,
  t,
}) => {
  const [poller, setPoller] = useState(null)
  const [account, setAccount] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [amountEth, setAmountEth] = useState('')
  const [totalProvided, setTotalProvided] = useState(0)
  const [userProvided, setUserProvided] = useState(0)
  const [totalDistributed, setTotalDistributed] = useState(0)
  const [minimalProvideAmount, setMinimalProvideAmount] = useState(0)
  const [amountEthError, setAmountEthError] = useState(false)
  const [amountArmor, setAmountArmor] = useState('')
  const [goalEth, setGoalEth] = useState(null)
  const [sharedEth, setSharedEth] = useState(null)
  const [sharedArmor, setSharedArmor] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [startArmorPrice, setStartArmorPrice] = useState(null)
  const [currentArmorPrice, setCurrentArmorPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBuying, setIsBuying] = useState(false)
  const { colors } = theme

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)

    setWeb3(new Web3(''))

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(IbcoEvents.TotalProvidedReturned, totalProvidedReturned)
    emitter.on(IbcoEvents.UserProvidedReturned, userProvidedReturned)
    emitter.on(IbcoEvents.TotalDistributedReturned, totalDistributedReturned)
    emitter.on(IbcoEvents.TransactionsReturned, transactionsReturned)
    emitter.on(IbcoEvents.BuyArmorCompleted, buyArmorCompleted)
    emitter.on(IbcoEvents.StartPriceReturned, armorStartPriceReturned)

    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
      emitter.removeListener(
        IbcoEvents.TotalProvidedReturned,
        totalProvidedReturned
      )
      emitter.removeListener(
        IbcoEvents.UserProvidedReturned,
        userProvidedReturned
      )
      emitter.removeListener(
        IbcoEvents.TotalDistributedReturned,
        totalDistributedReturned
      )
      emitter.removeListener(
        IbcoEvents.TransactionsReturned,
        transactionsReturned
      )
      emitter.removeListener(IbcoEvents.BuyArmorCompleted, buyArmorCompleted)
      emitter.removeListener(
        IbcoEvents.StartPriceReturned,
        armorStartPriceReturned
      )
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (account && account.address && poller === null) {
        await getIbcoData()
        setIsLoading(false)
        const _poller = setInterval(
          () => getIbcoData(),
          TRANSACTIONS_POLL_INTERVAL
        )
        setPoller(_poller)
      }

      return () => {
        clearInterval(poller)
        setPoller(null)
      }
    })()
  }, [account])

  useEffect(() => {
    setAmountEthError(false)
    if (isNaN(+amountEth)) {
      setAmountEthError(true)
    } else {
      const _amountArmor = ethToArmor(amountEth)
      setAmountArmor(
        Number.isInteger(_amountArmor) ? _amountArmor : _amountArmor.toFixed(5)
      )
    }
  }, [amountEth])

  const sendDispatches = () => {
    dispatcher.dispatch({ type: IbcoEvents.GetTotalDistributed, content: {} })
    dispatcher.dispatch({ type: IbcoEvents.GetUserProvided, content: {} })
    dispatcher.dispatch({ type: IbcoEvents.GetTotalProvided, content: {} })
    dispatcher.dispatch({ type: IbcoEvents.GetTransactions, content: {} })
    dispatcher.dispatch({ type: IbcoEvents.GetStartPrice, content: {} })
  }

  const totalProvidedReturned = () => {
    const _totalProvided = store.getStore('Ibco_TotalProvided')
    setTotalProvided(_totalProvided)
  }

  const userProvidedReturned = () => {
    const _userProvided = store.getStore('Ibco_UserProvided')
    setUserProvided(_userProvided)
  }

  const totalDistributedReturned = () => {
    const _totalDistributed = store.getStore('Ibco_TotalDistributed')
    setTotalDistributed(_totalDistributed)
  }

  const minimalProvideAmountReturned = () => {
    const _mpa = store.getStore('Ibco_MinimalProvideAmount')
    setMinimalProvideAmount(_mpa)
  }
  const armorStartPriceReturned = () => {
    const _startPrice = store.getStore('Ibco_ArmorStartPrice')
    setStartArmorPrice(_startPrice)
  }

  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  const transactionsReturned = () => {
    const _trannies = store.getStore('Ibco_Transactions')
    setTransactions(_trannies)
  }

  const buyArmorCompleted = (data) => {
    setIsBuying(false)
  }

  const handleBuyArmor = () => {
    setIsBuying(true)
    dispatcher.dispatch({
      type: IbcoEvents.BuyArmor,
      content: { amount: amountEth },
    })
  }

  const getIbcoData = async () => {
    //const mocked = await GET_MOCK_DATA() // TODO: web3-related functionality for getting current IBCO info
    setGoalEth(1337)
    setSharedEth(2500)
    setSharedArmor(5000)
    setCurrentArmorPrice('0.003245')

    console.log('getIbcoData called')
    sendDispatches()
  }

  const ethToArmor = (_amountEth) => {
    // TODO: need a formula for ARMOR amount preview
    return +_amountEth * 2
  }

  const errorReturned = (err) => {
    setIsBuying(false)
    console.log({ err })
  }

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => {
    setAccount(null)
    setPoller(null)
  }

  const handleChangeAmountEth = (e) => {
    const { value } = e.target
    setAmountEth(value)
  }

  const getPercent = (_baseDate, _targetDate) => {
    const baseDate = +moment(_baseDate)
    const currentDate = +moment() - baseDate
    const targetDate = +moment(_targetDate) - baseDate
    const percentValue = +((currentDate / targetDate) * 100)
    return percentValue > 0 ? percentValue.toFixed() : '0'
  }

  const providedValue = transactions.reduce((acc, t) => {
    acc += +t.amount
    return acc
  }, 0)

  const getProvidedPercent = (currentValue, maxValue) => {
    const percentValue = +((currentValue / maxValue) * 100)
    return percentValue > 0 ? percentValue.toFixed() : '0'
  }

  return (
    <Container>
      <TitleStyled>{t('Ibco.Started.Title')}</TitleStyled>
      <Wrapper>
        <ProgressContainer first>
          <LogoContainer logo1>
            <LogoIcon width="21px" color={colors.primaryDefault} />
          </LogoContainer>
          <LogoContainer logo2>
            <LogoIcon width="30px" color={colors.primaryDefault} />
          </LogoContainer>
          <LogoContainer logo3>
            <LogoIcon width="40px" color={colors.primaryDefault} />
          </LogoContainer>
          <IbcoCircle
            isLoading={isLoading}
            title={t('Ibco.Started.LeftTitle')}
            value={`${twoDigitFormatter.format(totalProvided)} ETH`}
            content={`${t('Ibco.Started.Goal')}: ${goalEth} ETH`}
            percentFill={getProvidedPercent(totalProvided, goalEth)}
          />
        </ProgressContainer>
        <ProgressContainer>
          <LogoContainer logo5>
            <LogoIcon width="18px" color={colors.primaryDefault} />
          </LogoContainer>
          <LogoContainer logo6>
            <LogoIcon width="26px" color={colors.primaryDefault} />
          </LogoContainer>
          <LogoContainer logo7>
            <LogoIcon width="41px" color={colors.primaryDefault} />
          </LogoContainer>
          <IbcoCircle
            isLoading={isLoading}
            title={t('Ibco.Started.RightTitle')}
            armor={true}
            value={twoDigitFormatter.format(
              (totalDistributed * (userProvided / totalProvided)) / 1e8
            )}
            content={`${userProvided} ETH (${
              +userProvided <= 0
                ? '0'
                : ((+userProvided / +goalEth) * 100).toFixed(2)
            }%)`}
            percentFill={getProvidedPercent(userProvided, goalEth)}
          />
        </ProgressContainer>
        <MiddleCircle>
          <LogoContainer logo4>
            <LogoIcon width="15px" color={colors.primaryDefault} />
          </LogoContainer>
          <Countdown
            date={+moment(ibcoEndDate)}
            now={() => +moment()}
            renderer={({ completed, formatted }) => {
              if (completed) return <></>
              return (
                <IbcoBigCircle
                  title={t('Ibco.Started.BigCircleTitle')}
                  percentFill={getPercent(baseDate, ibcoEndDate)}
                  {...formatted}
                />
              )
            }}
            onComplete={(pr) => onComplete(true)}
          />
        </MiddleCircle>
      </Wrapper>
      <ActionContainer>
        <InputContent>
          <InputLabel>{t('Ibco.Started.EthAmountLabel')}:</InputLabel>
          <TextField
            value={amountEth}
            error={amountEthError}
            onChange={handleChangeAmountEth}
            placeholder="0"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
            }}
          />
        </InputContent>
        <ArrowDivider>
          <ArrowRightIcon color={colors.disabledText} />
        </ArrowDivider>
        <InputContent>
          <InputLabel>
            ARMOR <span>({t('Ibco.Started.ArmorAmountLabel')})</span>
          </InputLabel>
          <TextField
            value={amountArmor}
            placeholder="0"
            variant="outlined"
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">ARMOR</InputAdornment>
              ),
            }}
          />
        </InputContent>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBuyArmor}
          disabled={isBuying || amountEthError || !amountEth || !amountArmor}
        >
          <ButtonText>{t('Ibco.Started.BuyButtonTitle')}</ButtonText>
        </Button>
      </ActionContainer>
      <IbcoSummary
        isLoading={isLoading}
        transactions={transactions}
        startArmorPrice={startArmorPrice}
        currentArmorPrice={currentArmorPrice}
        totalDistributed={formatter.format(totalDistributed)}
        ethToArmor={ethToArmor}
      />
      <IbcoTransactions
        goalEth={goalEth}
        isLoading={isLoading}
        transactions={transactions}
      />
      <IbcoBottomDisclaimer />
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(IbcoDuring)))
