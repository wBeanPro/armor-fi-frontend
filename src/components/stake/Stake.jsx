import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import {
  ACCOUNT_BALANCES_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
  GET_ACCOUNT_BALANCES,
} from '../../constants'
import Store from '../../stores/store'
import { withTheme } from 'styled-components'
import {
  ActiveBtn,
  ActiveBtnText,
  ActiveButtonsWrapper,
  AssetsLogo,
  AssetsTitle,
  Cell,
  Symbol,
  TableContainerStyled,
  TableStyled,
  TextExpired,
  TitleCell,
  AlertStyled,
  Header,
  TitleWrapper,
  TitleText,
  TooltipSpan,
  HeaderActions,
  Box,
  FooterInfo,
  FooterInfoText,
} from './styled'
import { RewardManagerEvents } from '../../stores/contracts/rewardManagerEvents'
import { StakeManagerEvents } from '../../stores/contracts/stakeManagerEvents'
import WithdrawModal from './WithdrawModal'
import { ArNFTEvents } from '../../stores/contracts/arNFTEvents'
import TableRow from '@material-ui/core/TableRow'
import StakeSkeleton from './StakeSkeleton'
import ConnectWallet from '../common/connectWallet/ConnectWallet'
import {
  humanReadableUnix,
  removeEmitterListeners,
  turnOnEmitterListeners,
  buildNexusProofOfLossUrl,
} from '../../helpers'
import ActionModal from '../common/actionModal/ActionModal'
import ConfirmationModal from '../common/confirmationModal/ConfirmationModal'
import moment from 'moment'
import { NoRowsFound } from './components/noRowsFound/NoRowsFound'
import BaseUtilizationFarming from '../baseFarm/baseUtilizationFarming/BaseUtilizationFarming'
import TooltipGuide from '../common/tooltipGuide/TooltipGuide'
import AboutInfoIcon from '../icons/AboutInfoIcon'
import AboutCircleIcon from '../icons/AboutCircleIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Container from '../common/container/Container'
import { Title } from '../common/Title'
import { SubTitle } from '../common/SubTitle'
import cnf from '../../config/cnf'

const STAKED_SYMBOL = 'arNFT'
const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const Stake = ({ theme, network, isWalletConnected, t }) => {
  const [overviewStakedData, setOverviewStakedData] = useState([])
  const [overviewUnStakedData, setOverviewUnStakedData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isConfirmationModalOpened, setIsConfirmationModalOpened] =
    useState(false)
  const [modalText, setModalText] = useState('')
  const [confirmationModalText, setConfirmationModalText] = useState('')
  const [account, setAccount] = useState(null)
  const [withdrawTokenId, setWithdrawTokenId] = useState('-1')
  const [contracts, setContracts] = useState(null)
  const [accountBalances, setAccountBalances] = useState(null)
  const [rewardManagerBalance, setRewardManagerBalance] = useState(0)
  const [ethBalance, setEthBalance] = useState(0)
  const [assetObject, setAssetObject] = useState(null)
  const [asset, setAsset] = useState('')
  const [isWithdrawModalOpened, setIsWithdrawModalOpened] = useState(false)

  const { colors } = theme
  let events = []

  function dispatchUpdateEvents() {
    dispatcher.dispatch({ type: GET_ACCOUNT_BALANCES, content: {} })
    dispatcher.dispatch({
      type: RewardManagerEvents.GetBalance,
      content: {},
    })
    dispatcher.dispatch({
      type: StakeManagerEvents.GetStakedNFTs,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNFTEvents.GetBalance,
      content: {},
    })
    dispatcher.dispatch({
      type: ArNFTEvents.GetUnStakedTokens,
      content: {},
    })
  }

  useEffect(() => {
    if (isWalletConnected) {
      setIsLoading(true)
      const _account = store.getStore('account')
      setAccount(_account)

      const _contracts = store.getStore('contracts')
      setContracts(_contracts)

      const _accountBalances = store.getStore('balances')
      setAccountBalances(_accountBalances)

      if (_accountBalances && _accountBalances.length > 0) {
        const _asset = 'eth'
        setAsset(_asset)
        const returned = _accountBalances.filter((bal) => bal.id === _asset)
        setAssetObject(returned[0] || null)
      }

      if (_account && _account.address) {
        dispatchUpdateEvents()
      }

      events = [
        [ERROR, errorReturned],
        [CONNECTION_CONNECTED, connectionConnected],
        [CONNECTION_DISCONNECTED, connectionDisconnected],
        [ACCOUNT_BALANCES_RETURNED, accountBalancesReturned],
        [RewardManagerEvents.BalanceReturned, rewardManagerBalanceReturned],
        [RewardManagerEvents.WithdrawCompleted, rewardManagerWithdrawCompleted],
        [RewardManagerEvents.RewardCompleted, rewardManagerRewardCompleted],
        [StakeManagerEvents.StakedNFTsReturned, stakedNftsReturned],
        [StakeManagerEvents.StakeNFTCompleted, stakeNftCompleted],
        [StakeManagerEvents.StakeAllNFTsCompleted, stakeAllNftsCompleted],
        [StakeManagerEvents.WithdrawNFTCompleted, withdrawNftCompleted],
        [StakeManagerEvents.ApproveCompleted, stakeNftApproveStepCompleted],
        [
          StakeManagerEvents.SetApprovalForAllCompleted,
          approvalForAllStepCompleted,
        ],
        [ArNFTEvents.BalanceReturned, arNFTBalanceReturned],
        [ArNFTEvents.UnStakedTokensReturned, arNFTUnStakedTokensReturned],
        [
          StakeManagerEvents.PendingWithdrawalsReturned,
          pendingWithdrawalsReturned,
        ],
        [ArNFTEvents.ClaimCompleted, claimCompleted],
      ]
      turnOnEmitterListeners(emitter, events)

      return () => {
        removeEmitterListeners(emitter, events)
      }
    }
  }, [network, isWalletConnected])

  // EMITTER HANDLERS
  const accountBalancesReturned = () => {
    const _accountBalances = store.getStore('balances')
    setAccountBalances(_accountBalances)
    const _ethBalance = _accountBalances.filter((b) => b.id === 'eth')[0]
      .balance
    setEthBalance(_ethBalance)
  }

  const stakedNftsReturned = () => {
    const _stakedNfts = store.getStore('StakeManager_StakedNFTs')
    console.log({ _stakedNfts })
    setOverviewStakedData([..._stakedNfts])
    setIsLoading(false)
  }

  const stakeNftCompleted = (data) => {
    setIsLoading(false)
    setIsStaking(false)
    setIsModalOpened(false)
    dispatchUpdateEvents()
  }

  const stakeAllNftsCompleted = (data) => {
    setIsLoading(false)
    setIsStaking(false)
    setIsModalOpened(false)
    dispatchUpdateEvents()
  }

  const withdrawNftCompleted = (data) => {
    setIsLoading(false)
    setIsStaking(false)
    setIsModalOpened(false)
    dispatchUpdateEvents()
  }

  const stakeNftApproveStepCompleted = (data) => {
    setModalText('Waiting to stake arNFT. This may take a few minutes.')
  }

  const approvalForAllStepCompleted = (data) => {
    setModalText('Waiting to stake arNFTs. This may take a few minutes.')
  }

  const arNFTBalanceReturned = () => {
    const _balance = store.getStore('ArNFT_Balance')
  }

  const pendingWithdrawalsReturned = () => {
    const { pending, nftId } = store.getStore('StakeManager_PendingWithdrawals')

    if (parseFloat(pending) === 0) {
      setConfirmationModalText(t('Stake.UnstakeModal.Text'))
      setIsConfirmationModalOpened(true)
      return true
    }

    if (parseFloat(pending) > moment().utc().unix()) {
      alert(
        'Your NFT will be ready to withdraw at ' +
          humanReadableUnix(pending.toString())
      )
      return true
    }

    dispatcher.dispatch({
      type: StakeManagerEvents.WithdrawNFT,
      content: { nftId },
    })
  }

  const arNFTUnStakedTokensReturned = () => {
    const _tokens = store.getStore('ArNFT_UnStakedTokens')
    setOverviewUnStakedData(_tokens)
  }

  const rewardManagerBalanceReturned = () => {
    const _balance = store.getStore('RewardManager_Balance')
    setRewardManagerBalance(_balance)
  }

  const rewardManagerWithdrawCompleted = () => {
    setIsModalOpened(false)
    setIsWithdrawing(false)
  }

  const rewardManagerRewardCompleted = () => {
    setIsModalOpened(false)
    setIsWithdrawing(false)
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    //_account.address = '0x7125b39a7e706c533f0a6ce392cbc56d000f9db6'
    setAccount(_account)
    if (_account && _account.address) {
      dispatcher.dispatch({ type: GET_ACCOUNT_BALANCES, content: {} })
      dispatcher.dispatch({ type: RewardManagerEvents.GetBalance, content: {} })
    }
  }

  const connectionDisconnected = () => setAccount(null)

  const errorReturned = (error) => {
    console.log({ error })
    setIsLoading(false)
    setIsWithdrawing(false)
    setIsStaking(false)
    setIsModalOpened(false)
  }

  // BUTTON EVENT HANDLERS
  const onWithdraw = (data) => {
    setModalText('Withdrawing rewards. This may take a few minutes.')
    setIsModalOpened(true)
    setIsWithdrawing(true)
    dispatcher.dispatch({
      type: RewardManagerEvents.GetReward,
      content: {},
    })
  }

  const onStake = (data, e) => {
    setModalText('Waiting to approve arNFT. This may take a few minutes.')
    setIsModalOpened(true)
    dispatcher.dispatch({
      type: StakeManagerEvents.StakeNFT,
      content: { nftId: data.tokenIndex },
    })
  }

  const onStakeAll = (dataArr, e) => {
    if (dataArr.length === 0) {
      return
    }
    setModalText('Waiting to approve arNFTs. This may take a few minutes.')
    setIsModalOpened(true)
    const nftIds = dataArr.map((d) => d.tokenIndex)
    dispatcher.dispatch({
      type: StakeManagerEvents.StakeAllNFTs,
      content: {
        nftIds,
      },
    })
  }

  const onUnStake = (data, e) => {
    dispatcher.dispatch({
      type: StakeManagerEvents.GetPendingWithdrawals,
      content: {
        nftId: data.tokenId,
      },
    })
    setWithdrawTokenId(data.tokenId.toString())
  }

  const onUnStakeConfirmation = (data, e) => {
    setModalText('Waiting to unstake arNFT. This may take a few minutes.')
    setIsModalOpened(true)
    dispatcher.dispatch({
      type: StakeManagerEvents.WithdrawNFT,
      content: { nftId: withdrawTokenId },
    })
  }

  const onClaim = (data, e) => {
    setModalText('Waiting to claim. This may take a few minutes.')
    setIsModalOpened(true)

    window.open(
      buildNexusProofOfLossUrl(data.tokenIndex, data.address),
      '_blank'
    )
    dispatcher.dispatch({
      type: ArNFTEvents.Claim,
      content: { coverId: data.tokenIndex },
    })
  }

  const claimCompleted = (response) => {
    setIsLoading(false)
    setIsClaiming(false)
    setIsModalOpened(false)
    dispatchUpdateEvents()
  }

  return (
    <Container noaccount={!account}>
      <Title>{t('Stake.Title')} arNFT</Title>
      <AlertStyled
        noaccount={!account ? 1 : 0}
        severity="info"
        title={t('Stake.Warning.Title')}
        text={t('Stake.Warning.Text')}
      />
      {!account && <ConnectWallet />}

      {!account ? (
        <StakeSkeleton title={`${t('Stake.Staked')} ${STAKED_SYMBOL}`} />
      ) : isLoading ? (
        <StakeSkeleton
          title={`${t('Stake.Staked')} ${STAKED_SYMBOL}`}
          animation
        />
      ) : (
        <Box>
          <Header>
            <TitleWrapper>
              <TitleText>
                {t('Stake.Staked')} {STAKED_SYMBOL}
              </TitleText>
              <TooltipGuide text={t('Stake.StakedTooltip')}>
                <TooltipSpan>
                  <AboutInfoIcon color={colors.disabledText} />
                </TooltipSpan>
              </TooltipGuide>
            </TitleWrapper>
          </Header>
          <TableContainerStyled
            novalue={
              !overviewStakedData || overviewStakedData.length === 0 ? 1 : 0
            }
            component={Paper}
          >
            <TableStyled
              novalue={
                !overviewStakedData || overviewStakedData.length === 0 ? 1 : 0
              }
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TitleCell align="left">{t('Stake.Asset')}</TitleCell>
                  <TitleCell align="right">{t('Stake.Amount')}</TitleCell>
                  <TitleCell align="right">{t('Stake.Expiration')}</TitleCell>
                  <TitleCell align="right">{t('Stake.Cost')}</TitleCell>
                  <TitleCell align="right">{t('Stake.Reward')}</TitleCell>
                  <TitleCell align="right">
                    {t('Stake.EstTotalReward')}
                  </TitleCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!overviewStakedData || overviewStakedData.length === 0 ? (
                  <NoRowsFound colSpan={6} text={t('Stake.NoRowsFound')} />
                ) : (
                  overviewStakedData.map((r, rIndex) => (
                    <TableRow key={rIndex}>
                      <AssetsLogo
                        align="left"
                        onClick={() =>
                          window.open(
                            `https://etherscan.io/address/${r.address}`,
                            '_blank'
                          )
                        }
                      >
                        <img
                          src={require(`../../assets/${r.logo}`)}
                          alt="asset icon"
                        />
                        <AssetsTitle>{r.name}</AssetsTitle>
                      </AssetsLogo>
                      {r.info.map((d, i) => (
                        <Cell key={i} align="right">
                          {d.value === 'EXPIRED' ? (
                            <TextExpired>{t('Stake.Expired')}</TextExpired>
                          ) : d.value === '' ? (
                            '0'
                          ) : (
                            d.value
                          )}{' '}
                          {d.symbol}
                        </Cell>
                      ))}
                      <Cell className="btnCell" align="right">
                        {r.info[1].value !== 'EXPIRED' && (
                          <ActiveBtn
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                              onUnStake(r, e)
                            }}
                          >
                            <ActiveBtnText>
                              {r.isPendingWithdrawal
                                ? t('Stake.WithdrawButtonTitle')
                                : t('Stake.UnStakeButtonTitle')}
                            </ActiveBtnText>
                          </ActiveBtn>
                        )}
                      </Cell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </TableStyled>
          </TableContainerStyled>
          <FooterInfo>
            <Tooltip
              arrow
              interactive
              placement="top"
              enterTouchDelay={50}
              title={t('Stake.Warning.Text')}
            >
              <span>
                <AboutCircleIcon color={colors.disabledText} />
                <FooterInfoText>{t('Stake.Warning.Title')}</FooterInfoText>
              </span>
            </Tooltip>
          </FooterInfo>
        </Box>
      )}

      {!account ? (
        <StakeSkeleton
          title={`${t('Stake.Unstaked')} ${STAKED_SYMBOL}`}
          unstake
        />
      ) : isLoading ? (
        <StakeSkeleton
          title={`${t('Stake.Unstaked')} ${STAKED_SYMBOL}`}
          unstake
          animation
        />
      ) : (
        <Box>
          <Header>
            <TitleWrapper>
              <TitleText>
                {t('Stake.Unstaked')} {STAKED_SYMBOL}
              </TitleText>
              <TooltipGuide text={t('Stake.UnstakedTooltip')}>
                <TooltipSpan>
                  <AboutInfoIcon color={colors.disabledText} />
                </TooltipSpan>
              </TooltipGuide>
            </TitleWrapper>
            <HeaderActions>
              <ActiveBtn
                variant="contained"
                color="primary"
                disabled={
                  !account ||
                  isLoading ||
                  !overviewUnStakedData ||
                  overviewUnStakedData.length === 0 ||
                  overviewUnStakedData.filter(
                    (d) =>
                      d && d.info && d.info[1] && d.info[1].value !== 'EXPIRED'
                  ).length === 0
                }
                onClick={(e) => {
                  onStakeAll(
                    overviewUnStakedData.filter(
                      (d) => d.info[1].value !== 'EXPIRED'
                    ),
                    e
                  )
                }}
              >
                <ActiveBtnText>{t('Stake.StakeAll')}</ActiveBtnText>
              </ActiveBtn>
            </HeaderActions>
          </Header>
          <TableContainerStyled
            novalue={
              !overviewStakedData || overviewStakedData.length === 0 ? 1 : 0
            }
            component={Paper}
          >
            <TableStyled
              novalue={
                !overviewStakedData || overviewStakedData.length === 0 ? 1 : 0
              }
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TitleCell align="left">{t('Stake.Asset')}</TitleCell>
                  <TitleCell align="right">{t('Stake.Amount')}</TitleCell>
                  <TitleCell align="right">{t('Stake.Expiration')}</TitleCell>
                  <TitleCell align="right">{t('Stake.Cost')}</TitleCell>
                  <TitleCell align="right">{t('Stake.Reward')}</TitleCell>
                  <TitleCell align="right">
                    {t('Stake.EstTotalReward')}
                  </TitleCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!overviewUnStakedData || overviewUnStakedData.length === 0 ? (
                  <NoRowsFound
                    colSpan={7}
                    text={t('Stake.NoUnstakedRowsFound')}
                  />
                ) : (
                  overviewUnStakedData.map(
                    (r, rIndex) =>
                      r && (
                        <TableRow key={rIndex}>
                          <AssetsLogo
                            align="left"
                            onClick={() =>
                              window.open(
                                `https://etherscan.io/address/${r.address}`,
                                '_blank'
                              )
                            }
                          >
                            <img
                              src={require(`../../assets/${r.logo}`)}
                              alt="asset icon"
                              height="24px"
                            />
                            <AssetsTitle>{r.name}</AssetsTitle>
                          </AssetsLogo>
                          {r.info.map((d, i) => (
                            <Cell key={i} align="right">
                              {d.value === 'EXPIRED' ? (
                                <TextExpired>{t('Stake.Expired')}</TextExpired>
                              ) : d.value === '' ? (
                                '0'
                              ) : (
                                d.value
                              )}{' '}
                              {d.symbol}
                            </Cell>
                          ))}
                          <Cell className="btnCell" align="right">
                            {r.info[1].value !== 'EXPIRED' && (
                              <ActiveButtonsWrapper>
                                {r.symbol === 'ETH' && (
                                  <ActiveBtn
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => {
                                      onStake(r, e)
                                    }}
                                  >
                                    <ActiveBtnText>
                                      {t('Stake.StakeButtonTitle')}
                                    </ActiveBtnText>
                                  </ActiveBtn>
                                )}
                                <ActiveBtn
                                  variant="contained"
                                  color="primary"
                                  onClick={(e) => {
                                    onClaim(r, e)
                                  }}
                                >
                                  <ActiveBtnText>
                                    {t('Dashboard.Item.Claim')}
                                  </ActiveBtnText>
                                </ActiveBtn>
                              </ActiveButtonsWrapper>
                            )}
                          </Cell>
                        </TableRow>
                      )
                  )
                )}
              </TableBody>
            </TableStyled>
          </TableContainerStyled>
          <FooterInfo>
            <Tooltip
              arrow
              interactive
              placement="top"
              enterTouchDelay={50}
              title={t('Stake.Warning.Text')}
            >
              <span>
                <AboutCircleIcon color={colors.disabledText} />
                <FooterInfoText>{t('Stake.Warning.Title')}</FooterInfoText>
              </span>
            </Tooltip>
          </FooterInfo>
        </Box>
      )}
      <SubTitle top="36">
        {t('Stake.Farming')}
        <TooltipGuide text={t('Stake.FarmingTooltip')}>
          <TooltipSpan>
            <AboutInfoIcon color={colors.defaultLightActive} />
          </TooltipSpan>
        </TooltipGuide>
      </SubTitle>
      {!account ? (
        <StakeSkeleton rewards />
      ) : isLoading ? (
        <StakeSkeleton animation rewards />
      ) : (
        isWalletConnected && (
          <BaseUtilizationFarming
            network={network}
            prefix="utilizationFarmStakers"
            title={`arNFT ${t('UtilizationFarming.Title')}`}
            liquidityUrl={
              'https://uniswap.exchange/add/0x1337def18c680af1f9f45cbcab6309562975b1dd/ETH'
            }
            infoUrl={
              'https://info.uniswap.org/pair/0x7ca51456b20697a0e5be65e5aeb65dfe90f21150'
            }
            address={cnf.UTILIZATION_FARM_STAKERS_ADDRESS}
            stakeHelpText={t('UtilizationFarming.StakeHelpTooltip')}
            rewardManagerBalance={rewardManagerBalance}
            onWithdraw={onWithdraw}
          />
        )
      )}
      <ActionModal
        closeModal={false}
        actionText={modalText}
        isModalOpened={isModalOpened}
      />
      <ConfirmationModal
        closeModal={() => setIsConfirmationModalOpened(false)}
        handleConfirm={onUnStakeConfirmation}
        actionText={confirmationModalText}
        isModalOpened={isConfirmationModalOpened}
      />
      <WithdrawModal
        closeModal={() => setIsWithdrawModalOpened(false)}
        handleSubmit={onWithdraw}
        isModalOpened={isWithdrawModalOpened}
      />
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Stake)))
