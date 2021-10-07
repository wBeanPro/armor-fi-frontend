import React, { useEffect, useRef, useState } from 'react'
import { withTheme } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Store from '../../stores/store'
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
  ClaimFooterText,
  ClaimFooterValue,
  ActionButton,
  LogoContainer,
  BgGradient,
  Buttons,
  Logo,
  Column,
  Row,
  TooltipSpan,
  ColumnHead,
  FooterActionButton,
  InfoText,
  ActionWrapper,
  ActionButtonNew,
  ColoredValue,
  ValueInfo,
  TooltipLink,
} from './styled'
import { toWei } from 'web3-utils'
import {
  eightDigitFormatter,
  removeEmitterListeners,
  threeDigitFormatter,
  turnOnEmitterListeners,
  twoDigitFormatter,
  uglifyAddress,
  commas,
  cropNumberLikeString,
  formatETH,
  formatUSD,
} from '../../helpers'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
  FARMING_APYS_RETURNED,
} from '../../constants'
import StakeTokensModal from './StakeTokensModal'
import UnStakeTokensModal from './UnStakeTokensModal'
import AvailableWalletInfo from '../common/availableWalletInfo/AvailableWalletInfo'
import AboutInfoIcon from '../icons/AboutInfoIcon'
import TooltipGuide from '../common/tooltipGuide/TooltipGuide'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const BaseUtilizationFarmingCombined = ({
  classes,
  data,
  t,
  theme,
  network,
  address,
  prefix,
  title,
  liquidityUrl,
  infoUrl,
  stakeHelpText,
  comingSoon = false,
  claimValue = 0,

  handleOpenTopupModal,
  handleOpenWithdrawModal,
  monthlyCost,
  ethBalance,
  arCoreCredit,
  ethPrice,
  armorPrice,
  isUsdPrimary,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [apys, setAPYs] = useState([])
  const [stakedArmor, setStakedArmor] = useState('0')
  const [ownedArmor, setOwnedArmor] = useState('0')
  const [apy, setApy] = useState('0')
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
  }

  useEffect(() => {
    momentDurationFormatSetup(moment)
  }, [])

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
    setIsLoading(false)
  }

  const handleStakeTokens = (item) => {
    handleOpenStakeTokensModal()
  }

  const handleClaimRewards = (item) => {
    dispatcher.dispatch({
      type: `${prefix}_Farm.ClaimRewards`,
      content: {},
    })
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

  const getArCoreMonthsDays = () => {
    if (arCoreCredit == 0 || monthlyCost == 0) {
      return '0 Month(s)'
    }
    const _duration = arCoreCredit / monthlyCost
    return moment.duration(_duration, 'months').format(`M [Month(s)], d [Days]`)
  }

  const getMonthlyCost = () => {
    if (monthlyCost == 0) {
      return 0
    }
    return commas(4).format(monthlyCost)
  }

  return (
    <>
      <Wrapper>
        <Row>
          <Column>
            <ColumnHead>
              <NameContainer>
                <LogoContainer>
                  <NameText>{t('Protect.ArcoreBalance.Title')}</NameText>
                  <TooltipGuide
                    text={
                      <>
                        {t('Protect.ArcoreBalance.Title.Tooltip')}
                        <br />
                        <a
                          href="https://armorfi.gitbook.io/armor/products/arcore"
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#4AD481' }}
                        >
                          Click here to read more about arCore
                        </a>
                      </>
                    }
                  >
                    <TooltipSpan>
                      <AboutInfoIcon color={colors.disabledText} />
                    </TooltipSpan>
                  </TooltipGuide>
                </LogoContainer>
              </NameContainer>
            </ColumnHead>
            <CurrentRow>
              <InfoText>
                {t('Protect.ArcoreBalance.MonthlyCost')}:
                <TextContent>
                  {isUsdPrimary
                    ? formatUSD(getMonthlyCost() * ethPrice, {
                        compact: true,
                        digits: 1,
                      })
                    : formatETH(getMonthlyCost(), {
                        compact: true,
                        digits: 4,
                      })}{' '}
                  {t('Protect.ArcoreBalance.PerMonth')}
                </TextContent>
                <TooltipGuide
                  text={
                    <>
                      This is the cost per month, <br />
                      based on your current coverage plan
                    </>
                  }
                >
                  <TooltipSpan>
                    <AboutInfoIcon color={colors.disabledText} />
                  </TooltipSpan>
                </TooltipGuide>
              </InfoText>
              <InfoText>
                {t('Protect.ArcoreBalance.ArcoreBalanceEth')}:
                <ColoredValue contrast active={arCoreCredit > 0}>
                  <ValueInfo>
                    {isUsdPrimary
                      ? formatUSD(arCoreCredit * ethPrice, {
                          compact: true,
                          digits: 1,
                        })
                      : formatETH(arCoreCredit, { compact: true, digits: 4 })}
                  </ValueInfo>{' '}
                  / {getArCoreMonthsDays()}
                </ColoredValue>
                <TooltipGuide
                  text={
                    <>
                      {t('Protect.ArcoreBalance.ArcoreBalanceEth.Tooltip')}
                      <br />
                      <TooltipLink
                        href="https://armorfi.gitbook.io/armor/products/arcore#arcore-credit"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Click here to read more about arCore
                      </TooltipLink>
                    </>
                  }
                >
                  <TooltipSpan>
                    <AboutInfoIcon color={colors.disabledText} />
                  </TooltipSpan>
                </TooltipGuide>
              </InfoText>
            </CurrentRow>
            <ActionWrapper>
              <ActionButtonNew
                secondary="true"
                variant="contained"
                onClick={handleOpenWithdrawModal}
              >
                <ButtonText className="secondary">
                  {t('Protect.Withdraw')}
                </ButtonText>
                <TooltipGuide text={t('Protect.Withdraw.Tooltip')}>
                  <TooltipSpan>
                    <AboutInfoIcon color={colors.secondary} />
                  </TooltipSpan>
                </TooltipGuide>
              </ActionButtonNew>
              <ActionButtonNew
                secondary="true"
                variant="contained"
                onClick={handleOpenTopupModal}
              >
                <ButtonText className="secondary">
                  {t('Protect.TopUp')}
                </ButtonText>
                <TooltipGuide
                  text={
                    <>
                      Click here to add more ETH
                      <br /> to your arCore Smart Cover Credit.
                    </>
                  }
                >
                  <TooltipSpan>
                    <AboutInfoIcon color={colors.secondary} />
                  </TooltipSpan>
                </TooltipGuide>
              </ActionButtonNew>
            </ActionWrapper>
          </Column>
          <Column>
            <ColumnHead>
              <NameContainer>
                <LogoContainer>
                  <Logo
                    src={require(`../../assets/armor-circle-logo.svg`)}
                    alt="contract icon"
                  />
                  <NameText>{title}</NameText>
                  <TooltipGuide
                    text={
                      'The rewards APY below is based on the cost of your cover (not the covered amount)'
                    }
                  >
                    <TooltipSpan>
                      <AboutInfoIcon color={colors.disabledText} />
                    </TooltipSpan>
                  </TooltipGuide>
                </LogoContainer>
              </NameContainer>
            </ColumnHead>
            {comingSoon ? (
              <FooterWrapper>
                <FooterText>{t('UtilizationFarming.ComingSoon')}</FooterText>
              </FooterWrapper>
            ) : (
              <>
                <CurrentRow>
                  <CurrentTitle compare="true">
                    APY:
                    <TextContent>{showApy(1)}%</TextContent>
                  </CurrentTitle>
                </CurrentRow>

                <FooterActionButton>
                  <ClaimFooterText>
                    {t('UtilizationFarming.ClaimableRewards')}:
                    <ClaimFooterValue claimValue={rewardsOwed > 0}>
                      {threeDigitFormatter.format(rewardsOwed)}
                    </ClaimFooterValue>
                  </ClaimFooterText>
                  {rewardsOwed > 0 && (
                    <ActionButtonNew
                      secondary="true"
                      variant="contained"
                      onClick={() => handleClaimRewards()}
                    >
                      <ButtonText className="secondary">
                        {t('Rewards.Item.ClaimRewards')}
                      </ButtonText>
                    </ActionButtonNew>
                  )}
                </FooterActionButton>
              </>
            )}
          </Column>
        </Row>

        <AvailableWalletInfo
          text={`${t('Protect.ArcoreBalance.WalletBalanceEth')}:`}
          value={
            isUsdPrimary
              ? formatUSD(ethBalance * ethPrice, { compact: true, digits: 2 })
              : formatETH(ethBalance, { compact: true, digits: 4 })
          }
          center={false}
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
    </>
  )
}

export default withTranslation()(
  withRouter(withTheme(BaseUtilizationFarmingCombined))
)
