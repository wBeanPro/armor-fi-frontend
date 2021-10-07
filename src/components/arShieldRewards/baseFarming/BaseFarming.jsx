import React, { useEffect, useState } from 'react'
import { withTheme } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Store from '../../../stores/store'
import Tooltip from '@material-ui/core/Tooltip'
import UnlockModal from '../../unlockModal/UnlockModal'
import {
  ActionButton,
  Buttons,
  ContractBox,
  ContractHeader,
  ContractTitle,
  CurrentRow,
  CurrentTitle,
  Logo,
  LogoContainer,
  NameContainer,
  NameText,
  SpanTextContent,
  TotalContent,
  TotalRow,
  ButtonText,
  SpanTextColored,
  TooltipInfoWrapper,
  Skeleton,
} from './styled'
import {
  eightDigitFormatter,
  removeEmitterListeners,
  turnOnEmitterListeners,
  twoDigitFormatter,
  uglifyAddress,
} from '../../../helpers'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
} from '../../../constants'
import StakeModal from '../stakeModal/StakeModal'
import UnStakeModal from '../unStakeModal/UnStakeModal'
import config from '../../../config'
import TooltipGuide from '../../common/tooltipGuide/TooltipGuide'
import AboutInfoIcon from '../../icons/AboutInfoIcon'
import Button from '../../common/button/Button'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const BaseFarming = ({
  data,
  t,
  network,
  address,
  abi,
  prefix,
  title,
  liquidityUrl,
  infoUrl,
  apyData,
  filterRewardsAvailablePools,
  inactive,
  theme,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [apys, setAPYs] = useState([])
  const [stakedArmor, setStakedArmor] = useState('0')
  const [ownedArmor, setOwnedArmor] = useState('0')
  const [rewardsOwed, setRewardsOwed] = useState('0')
  const [rewardsGiven, setRewardsGiven] = useState('0')
  const [totalArmorStaked, setTotalArmorStaked] = useState('0')
  const [totalRewardsGiven, setTotalRewardsGiven] = useState('0')
  const [totalStakers, setTotalStakers] = useState('0')
  const [tokenBalance, setTokenBalance] = useState('0')
  const [isStakeModalOpened, setIsStakeModalOpened] = useState(false)
  const [isUnStakeModalOpened, setIsUnStakeModalOpened] = useState(false)
  const [isUnlockModalOpened, setIsUnlockModalOpened] = useState(false)
  const { colors } = theme

  function dispatchStatistics() {
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
  }

  const handleClickWalletAddress = () => {
    setIsUnlockModalOpened(true)
  }

  const handleCloseUnlockModal = () => {
    setIsUnlockModalOpened(false)
  }

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)
    if (_account && _account.address) {
      dispatchStatistics()
    }

    let events = [
      [ERROR, errorReturned],
      [CONNECTION_CONNECTED, connectionConnected],
      [CONNECTION_DISCONNECTED, connectionDisconnected],
      [`${prefix}_Token.BalanceReturned`, tokenBalanceReturned],
      [`${prefix}_Farm.StakedArmorReturned`, stakedArmorReturned],
      [`${prefix}_Farm.OwnedArmorReturned`, ownedArmorReturned],
      [`${prefix}_Farm.RewardsOwedReturned`, rewardsOwedReturned],
      [`${prefix}_Farm.RewardsGivenReturned`, rewardsGivenReturned],
      [`${prefix}_Token.TotalArmorStakedReturned`, totalArmorStakedReturned],
      [`${prefix}_Farm.TotalRewardsGivenReturned`, totalRewardsGivenReturned],
      [`${prefix}_Farm.TotalStakersReturned`, totalStakersReturned],
    ]
    turnOnEmitterListeners(emitter, events)

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [network])

  useEffect(() => {
    setIsLoading(true)
    if (apyData) {
      let apy = apyData.find(
        (a) => a.contract_address.toLowerCase() === address.toLowerCase()
      )
      if (apy) {
        setAPYs(apy.apy)
      }
    }
    setIsLoading(false)
  }, [apyData])

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
    setRewardsOwed(eightDigitFormatter.format(_total))
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

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    setAccount(_account)

    dispatchStatistics()
  }

  const connectionDisconnected = () => setAccount(null)

  const errorReturned = (error) => {
    console.log({ error })
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

  const handleStakeModalSubmit = (data) => {
    dispatcher.dispatch({
      type: `${prefix}_Farm.Stake`,
      content: { amount: data.amount },
    })
  }

  const handleOpenStakeTokensModal = () => {
    setIsStakeModalOpened(true)
  }

  const closeStakeModal = () => {
    setIsStakeModalOpened(false)
  }

  const handleUnStakeModalSubmit = (data) => {
    dispatcher.dispatch({
      type: `${prefix}_Farm.Withdraw`,
      content: { amount: data.amount },
    })
  }

  const handleOpenUnStakeTokensModal = () => {
    setIsUnStakeModalOpened(true)
  }

  const closeUnStakeModal = () => {
    setIsUnStakeModalOpened(false)
  }

  return filterRewardsAvailablePools && parseFloat(rewardsOwed) === 0 ? null : (
    <ContractBox>
      <ContractHeader>
        <NameContainer>
          <LogoContainer>
            <Logo
              src={require(`../../../assets/armor-circle-logo.svg`)}
              alt="contract icon"
            />
            <NameText>{title}</NameText>
          </LogoContainer>
        </NameContainer>
        <ContractTitle>
          {t('Rewards.Item.AddressLabel')}:
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {uglifyAddress(address, 10, 4)}
          </a>
        </ContractTitle>
      </ContractHeader>
      <CurrentRow>
        <CurrentTitle>
          Unstaked arTokens
          <SpanTextContent>
            {!account || isLoading ? (
              <Skeleton
                animation={account && isLoading ? 'pulse' : false}
                variant="text"
                width={50}
                height={25}
              />
            ) : (
              eightDigitFormatter.format(tokenBalance)
            )}
          </SpanTextContent>
        </CurrentTitle>
        <CurrentTitle>
          Staked arTokens
          <SpanTextContent>
            {!account || isLoading ? (
              <Skeleton
                animation={account && isLoading ? 'pulse' : false}
                variant="text"
                width={50}
                height={25}
              />
            ) : (
              eightDigitFormatter.format(stakedArmor)
            )}
          </SpanTextContent>
        </CurrentTitle>
        <CurrentTitle>
          ARMOR Earned
          <SpanTextColored colored={parseFloat(rewardsOwed) > 0}>
            {!account || isLoading ? (
              <Skeleton
                animation={account && isLoading ? 'pulse' : false}
                variant="text"
                width={50}
                height={25}
              />
            ) : (
              rewardsOwed
            )}
          </SpanTextColored>
        </CurrentTitle>
      </CurrentRow>
      <TotalRow>
        <TotalContent>
          <CurrentTitle>
            APY {t('BaseFarming.Daily')}
            <SpanTextContent>
              {apys && apys.daily && !isLoading ? (
                `${twoDigitFormatter.format(apys.daily)}%`
              ) : (
                <Skeleton
                  animation={account && isLoading ? 'pulse' : false}
                  variant="text"
                  height={25}
                  width={50}
                />
              )}
            </SpanTextContent>
          </CurrentTitle>
          <CurrentTitle>
            APY {t('BaseFarming.Weekly')}
            <SpanTextContent>
              {apys && apys.weekly && !isLoading ? (
                `${twoDigitFormatter.format(apys.weekly)}%`
              ) : (
                <Skeleton
                  animation={account && isLoading ? 'pulse' : false}
                  variant="text"
                  height={25}
                  width={50}
                />
              )}
            </SpanTextContent>
          </CurrentTitle>
          <CurrentTitle>
            APY {t('BaseFarming.Monthly')}
            <SpanTextContent>
              {apys && apys.monthly && !isLoading ? (
                `${twoDigitFormatter.format(apys.monthly)}%`
              ) : (
                <Skeleton
                  animation={account && isLoading ? 'pulse' : false}
                  variant="text"
                  height={25}
                  width={50}
                />
              )}
            </SpanTextContent>
          </CurrentTitle>
          <CurrentTitle>
            APY {t('BaseFarming.Yearly')}
            <SpanTextContent>
              {apys && apys.yearly && !isLoading ? (
                `${twoDigitFormatter.format(apys.yearly)}%`
              ) : (
                <Skeleton
                  animation={account && isLoading ? 'pulse' : false}
                  variant="text"
                  height={25}
                  width={50}
                />
              )}
            </SpanTextContent>
          </CurrentTitle>
        </TotalContent>
      </TotalRow>
      <Tooltip
        arrow
        interactive
        placement="top"
        enterTouchDelay={50}
        disableFocusListener={!!account}
        disableHoverListener={!!account}
        disableTouchListener={!!account}
        title={
          <TooltipInfoWrapper>
            {t('BaseFarming.WalletButtonInfo')}
            <br />
            <ActionButton
              tooltipbutton="true"
              variant="contained"
              color="primary"
              onClick={handleClickWalletAddress}
            >
              <ButtonText className="main">
                {t('BaseFarming.WalletButtonText')}
              </ButtonText>
            </ActionButton>
          </TooltipInfoWrapper>
        }
      >
        <Buttons>
          {!inactive && (
            <Button
              buttonText="mint artokens"
              isDisabled={!account}
              tooltipText="mint artokens"
              onClick={() => console.log('mint artokens')}
              bordered={true}
              margin="15px 5px 0"
            />
          )}
          {!inactive && (
            <Button
              buttonText="STAKE ARTOKENS"
              isDisabled={!account}
              tooltipText="STAKE ARTOKENS tooltip"
              onClick={() => handleStakeTokens()}
              margin="15px 5px 0"
            />
          )}
          <Button
            buttonText="CLAIM ARMOR"
            isDisabled={!account}
            tooltipText="CLAIM ARMOR Tooltip"
            onClick={() => handleClaimRewards()}
            bordered={true}
            margin="15px 5px 0"
          />
          <Button
            buttonText="UNSTAKE"
            isDisabled={!account}
            tooltipText="UNSTAKE Tooltip"
            onClick={() => handleUnstakeTokens()}
            bordered={true}
            margin="15px 5px 0"
          />
          <Button
            buttonText="EXIT: CLAIM AND UNSTAKE"
            isDisabled={!account}
            tooltipText="EXIT: CLAIM AND UNSTAKE Tooltip"
            onClick={() => handleExit()}
            bordered={true}
            margin="15px 5px 0"
          />
        </Buttons>
      </Tooltip>

      <StakeModal
        isLoading={isLoading}
        totalAssets={tokenBalance}
        closeModal={closeStakeModal}
        handleSubmit={handleStakeModalSubmit}
        isModalOpened={isStakeModalOpened}
      />
      <UnStakeModal
        isLoading={isLoading}
        totalAssets={stakedArmor}
        closeModal={closeUnStakeModal}
        handleSubmit={handleUnStakeModalSubmit}
        isModalOpened={isUnStakeModalOpened}
      />
      <UnlockModal
        closeModal={handleCloseUnlockModal}
        modalOpen={isUnlockModalOpened}
      />
    </ContractBox>
  )
}

export default withTranslation()(withRouter(withTheme(BaseFarming)))
