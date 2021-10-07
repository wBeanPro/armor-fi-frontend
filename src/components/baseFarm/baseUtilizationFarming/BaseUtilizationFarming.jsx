import React, { useEffect, useRef, useState } from 'react'
import { withTheme } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Store from '../../../stores/store'
import UploadIcon from '../../icons/UploadIcon'
import {
  ButtonText,
  Wrapper,
  NameText,
  ContractTitle,
  FooterWrapper,
  FooterText,
  ContractHeader,
  NameContainer,
  CurrentRow,
  CurrentTitle,
  TextContent,
  ActionButton,
  LogoContainer,
  Buttons,
  Logo,
  ActionContainer,
  SubTitle,
  Info,
  ActiveBtn,
  Row,
  Column,
  ColumnHead,
  InfoText,
  ColoredValue,
} from './styled'
import { toWei } from 'web3-utils'
import {
  eightDigitFormatter,
  removeEmitterListeners,
  threeDigitFormatter,
  turnOnEmitterListeners,
  twoDigitFormatter,
  uglifyAddress,
} from '../../../helpers'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
  FARMING_APYS_RETURNED,
} from '../../../constants'
import StakeTokensModal from '../StakeTokensModal'
import UnStakeTokensModal from '../UnStakeTokensModal'
import Tooltip from '@material-ui/core/Tooltip'
import ActionModal from '../../common/actionModal/ActionModal'
import { UtilizationFarmBorrowersEvents } from '../../../stores/contracts/utilizationFarms/borrowers/utilizationFarmBorrowersEvents'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const BaseUtilizationFarming = ({
  theme,
  classes,
  data,
  t,
  network,
  address,
  prefix,
  title,
  liquidityUrl,
  infoUrl,
  stakeHelpText,
  comingSoon = false,
  claimValue = 0,
  rewardManagerBalance,
  onWithdraw,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [apys, setAPYs] = useState([])
  const [stakedArmor, setStakedArmor] = useState('0')
  const [ownedArmor, setOwnedArmor] = useState('0')
  const [apy, setApy] = useState('0')
  const [arNftApy, setArNftApy] = useState('0')
  const [percentOfTotal, setPercentOfTotal] = useState('0')
  const [rewardsOwed, setRewardsOwed] = useState('0')
  const [rewardsGiven, setRewardsGiven] = useState('0')
  const [weeklyRewards, setWeeklyRewards] = useState('0')
  const [totalArmorStaked, setTotalArmorStaked] = useState('0')
  const [totalRewardsGiven, setTotalRewardsGiven] = useState('0')
  const [weeklyArmor, setWeeklyArmor] = useState('0')
  const [totalStakers, setTotalStakers] = useState('0')
  const [tokenBalance, setTokenBalance] = useState(0.0)
  const [isStakeTokensModalOpened, setIsStakeTokensModalOpened] =
    useState(false)
  const [isUnStakeTokensModalOpened, setIsUnStakeTokensModalOpened] =
    useState(false)
  const [modalText, setModalText] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const { colors } = theme

  function dispatchUpdateEvents() {
    dispatcher.dispatch({
      type: `${prefix}_Token.GetBalance`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetStakedArmor`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetOwnedArmor`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetRewardsOwed`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetRewardsGiven`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Token.GetTotalArmorStaked`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetTotalRewardsGiven`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetTotalStakers`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetLastReward`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetWeeklyArmor`,
      content: {},
    })
    dispatcher.dispatch({
      type: `${prefix}_Farm.GetArnftApy`,
      content: {},
    })
  }

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)

    const _apys = store.getStore('farmingAPYs') || []
    if (_apys.length > 0) {
      let _apy = _apys.filter((a) => a.contract_address === address)
      // if (_apy != undefined) {
      //   setAPYs(_apy[0].apy)
      // }
    }

    if (_account && _account.address) {
      dispatchUpdateEvents()
    }

    let events = [
      [ERROR, errorReturned],
      [CONNECTION_CONNECTED, connectionConnected],
      [CONNECTION_DISCONNECTED, connectionDisconnected],
      [FARMING_APYS_RETURNED, farmingAPYsReturned],
      [`${prefix}_Token.BalanceReturned`, tokenBalanceReturned],
      [`${prefix}_Farm.StakedArmorReturned`, stakedArmorReturned],
      [`${prefix}_Farm.OwnedArmorReturned`, ownedArmorReturned],
      [`${prefix}_Farm.RewardsOwedReturned`, rewardsOwedReturned],
      [`${prefix}_Farm.RewardsGivenReturned`, rewardsGivenReturned],
      [`${prefix}_Token.TotalArmorStakedReturned`, totalArmorStakedReturned],
      [`${prefix}_Farm.TotalRewardsGivenReturned`, totalRewardsGivenReturned],
      [`${prefix}_Farm.TotalStakersReturned`, totalStakersReturned],
      [`${prefix}_Farm.LastRewardReturned`, lastRewardReturned],
      [`${prefix}_Farm.WeeklyArmorReturned`, weeklyArmorReturned],
      [`${prefix}_Farm.ArnftApyReturned`, arnftApyReturned],
      [`${prefix}_Farm.ClaimRewardsCompleted`, claimRewardsCompleted],
    ]

    turnOnEmitterListeners(emitter, events)

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [network])

  useEffect(() => {
    if (account && account.address) {
      let interval = null
      interval = setInterval(() => {
        dispatcher.dispatch({
          type: `${prefix}_Farm.GetRewardsOwed`,
          content: {},
        })
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [account, network])

  const farmingAPYsReturned = () => {
    const _apys = store.getStore('farmingAPYs')
    setAPYs(_apys.filter((a) => a.contract_address === address)[0].apy)
  }

  const handleLiquidity = (item) => {
    window.open(liquidityUrl)
  }

  const handleInfo = (item) => {
    window.open(infoUrl)
  }

  const tokenBalanceReturned = () => {
    const _total = store.getStore(`${prefix}_Token_Balance`)
    setTokenBalance(_total)
  }

  const stakedArmorReturned = () => {
    const _total = store.getStore(`${prefix}_Farm_StakedArmor`)
    setStakedArmor(_total)
  }

  const ownedArmorReturned = () => {
    const _total = store.getStore(`${prefix}_Farm_OwnedArmor`)
    setOwnedArmor(_total)
  }

  const rewardsOwedReturned = () => {
    const _total = store.getStore(`${prefix}_Farm_RewardsOwed`)
    setRewardsOwed(_total)
  }

  const rewardsGivenReturned = () => {
    const _total = store.getStore(`${prefix}_Farm_RewardsGiven`)
    setRewardsGiven(eightDigitFormatter.format(_total))
  }

  const totalArmorStakedReturned = () => {
    const _total = store.getStore(`${prefix}_Token_TotalArmorStaked`)
    setTotalArmorStaked(_total)
  }

  const totalRewardsGivenReturned = () => {
    const _total = store.getStore(`${prefix}_Farm_TotalRewardsGiven`)
    setTotalRewardsGiven(eightDigitFormatter.format(_total))
  }

  const totalStakersReturned = () => {
    const _total = store.getStore(`${prefix}_Farm_TotalStakers`)
    setTotalStakers(eightDigitFormatter.format(_total))
  }

  const weeklyArmorReturned = () => {
    const _total = store.getStore(`${prefix}_Farm_WeeklyArmor`)
    setWeeklyArmor(eightDigitFormatter.format(_total))
  }

  const arnftApyReturned = () => {
    const _total = store.getStore(`${prefix}_Farm_ArnftApy`)
    setArNftApy(_total)
  }

  const lastRewardReturned = () => {
    try {
      const {
        lastReward,
        totalSupply,
        armorEthPrice,
        balance,
        percentOfTotal,
        apy,
      } = store.getStore(`${prefix}_Farm_LastReward`)
      setApy(apy)
      setPercentOfTotal(percentOfTotal)
    } catch (e) {}
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => setAccount(null)

  const errorReturned = (error) => {
    console.log({ error })
    setIsLoading(false)
    setIsModalOpened(false)
  }

  const handleStakeTokens = (item) => {
    handleOpenStakeTokensModal()
  }

  const handleClaimRewards = (item) => {
    setModalText('Waiting to collect your ARMOR. This may take a few minutes.')
    setIsModalOpened(true)
    dispatcher.dispatch({
      type: `${prefix}_Farm.ClaimRewards`,
      content: {},
    })
  }

  const claimRewardsCompleted = (res) => {
    setModalText('')
    setIsModalOpened(false)
  }

  const handleUnstakeTokens = (item) => {
    handleOpenUnStakeTokensModal()
  }

  const handleExit = (item) => {
    dispatcher.dispatch({
      type: `${prefix}_Farm.Exit`,
      content: {},
    })
  }

  const handleStakeTokensModalSubmit = (data) => {
    setIsLoading(true)
    dispatcher.dispatch({
      type: `${prefix}_Farm.Stake`,
      content: { amount: data.amount },
    })
  }

  const handleOpenStakeTokensModal = () => {
    setIsStakeTokensModalOpened(true)
  }

  const closeStakeTokensModal = () => {
    setIsStakeTokensModalOpened(false)
  }

  const handleUnStakeTokensModalSubmit = (data) => {
    setIsLoading(true)
    dispatcher.dispatch({
      type: `${prefix}_Farm.Withdraw`,
      content: { amount: data.amount },
    })
  }

  const handleOpenUnStakeTokensModal = () => {
    setIsUnStakeTokensModalOpened(true)
  }

  const closeUnStakeTokensModal = () => {
    setIsUnStakeTokensModalOpened(false)
  }

  const showApy = (days) => {
    if (apy == null || Number.isNaN(apy) || apy == 0) {
      return 0
    }
    return twoDigitFormatter.format(apy / days)
  }

  const showArnftApy = (days) => {
    if (arNftApy == null || Number.isNaN(arNftApy) || arNftApy == 0) {
      return 0
    }
    return twoDigitFormatter.format(arNftApy / days)
  }

  return (
    <Wrapper>
      <Row>
        <Column>
          <ColumnHead>
            <NameContainer>
              <LogoContainer>
                <Logo
                  src={require(`../../../assets/armor-circle-logo.svg`)}
                  alt="contract icon"
                />
                <NameText>{title}</NameText>
              </LogoContainer>
            </NameContainer>
          </ColumnHead>

          <CurrentRow>
            <InfoText>
              APY:
              <TextContent>{showApy(1)}%</TextContent>
            </InfoText>
            <InfoText>
              {t('UtilizationFarming.ClaimableRewards')}:
              <TextContent active={parseFloat(rewardsOwed) > 0}>
                {threeDigitFormatter.format(rewardsOwed)}
              </TextContent>
            </InfoText>
          </CurrentRow>
          <ActionContainer>
            <ActionButton
              variant="contained"
              onClick={() => handleClaimRewards()}
            >
              <ButtonText>{t('Rewards.Item.ClaimRewards')}</ButtonText>
            </ActionButton>
          </ActionContainer>
        </Column>
        <Column>
          <ColumnHead>
            <NameContainer>
              <NameText noleft="true">
                {t('UtilizationFarming.UsageRewards')}
              </NameText>
            </NameContainer>
          </ColumnHead>
          <CurrentRow>
            <InfoText>
              APY:
              <TextContent>{showArnftApy(1)}%</TextContent>
            </InfoText>
            <Info active={parseFloat(rewardManagerBalance) > 0}>
              {eightDigitFormatter.format(rewardManagerBalance)} ETH
            </Info>
          </CurrentRow>
          <ActionContainer>
            <ActionButton
              variant="contained"
              onClick={() => onWithdraw(rewardManagerBalance)}
              disabled={parseFloat(rewardManagerBalance) <= 0}
            >
              <ButtonText color={colors.primaryDefault}>
                {t('Stake.Withdraw')}
              </ButtonText>
            </ActionButton>
          </ActionContainer>
        </Column>
      </Row>

      <ActionModal
        closeModal={false}
        isModalOpened={isModalOpened}
        actionText={modalText}
      />
      <StakeTokensModal
        totalAssets={tokenBalance}
        closeModal={closeStakeTokensModal}
        handleSubmit={handleStakeTokensModalSubmit}
        isModalOpened={isStakeTokensModalOpened}
      />
      <UnStakeTokensModal
        totalAssets={stakedArmor}
        closeModal={closeUnStakeTokensModal}
        handleSubmit={handleUnStakeTokensModalSubmit}
        isModalOpened={isUnStakeTokensModalOpened}
      />
    </Wrapper>
  )
}

export default withTranslation()(withRouter(withTheme(BaseUtilizationFarming)))
