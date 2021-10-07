import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  REFERRER_SET,
  GET_REFERRAL_CODE,
  REFERRAL_CODE_RETURNED,
} from '../../constants'
import {
  TableContainerStyled,
  RowHead,
  TableTitle,
  Row,
  Cell,
  ShowMoreRow,
  ReferBox,
  Wrapper,
  UserAccount,
  LinkCell,
  ReferralURLWrapper,
  ReferFullBox,
  AddressTitle,
  AddressLink,
  InfoText,
  CopyButton,
  CropValue,
  FlexSpan,
} from './styled'
import Store from '../../stores/store'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import Card from './Card'
import MOCK_DATA from './mock'
import ReferralsSkeleton from './ReferralsSkeleton'
import ConnectWallet from '../common/connectWallet/ConnectWallet'
import {
  commas,
  removeEmitterListeners,
  turnOnEmitterListeners,
  uglifyAddress,
} from '../../helpers'
import { ReferralRewardsEvents } from '../../stores/contracts/referralRewardsEvents'
import { RewardManagerEvents } from '../../stores/contracts/rewardManagerEvents'
import { BalanceManagerEvents } from '../../stores/contracts/balanceManagerEvents'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from '@material-ui/core/Tooltip'
import TableBody from '@material-ui/core/TableBody'
import Container from '../common/container/Container'
import { Title } from '../common/Title'
import { SubTitle } from '../common/SubTitle'
import styled from 'styled-components'
import AlertWithChildren from '../common/alert/AlertWithChildren'
import { ArShieldControllerEvents } from '../../stores/contracts/arShieldController/arShieldControllerEvents'

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const TOOLTIP_DISAPPEAR_DELAY = 1000

const Referrals = ({ t }) => {
  const [account, setAccount] = useState(null)
  const [referralCode, setReferralCode] = useState(null)
  const [showReferred, setShowReferred] = useState(false)
  const [showRecent, setShowRecent] = useState(false)
  const [referralRewardsEarned, setReferralRewardsEarned] = useState('0')
  const [balanceManagerBalance, setBalanceManagerBalance] = useState('0')
  const [arShieldControllerBalance, setArShieldControllerBalance] = useState()
  const [referredUsers, setReferredUsers] = useState([])
  const [arShieldReferrals, setArShieldReferrals] = useState([])
  const [recentRewards, setRecentRewards] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [isCopied, setIsCopied] = useState(false)

  const balance = MOCK_DATA().balance

  useEffect(() => {
    const _account = store.getStore('account')

    if (_account) {
      //_account.address = '0x531ed64E65B1D2f569fEaBbAd73beF04ac249378'
      setAccount(_account)
      dispatchUpdateEvents()
      dispatcher.dispatch({
        type: GET_REFERRAL_CODE,
        content: {
          address: _account.address,
        },
      })
    }

    let events = [
      [ERROR, errorReturned],
      [CONNECTION_DISCONNECTED, connectionDisconnected],
      [CONNECTION_CONNECTED, connectionConnected],
      [REFERRER_SET, referrerSet],
      [REFERRAL_CODE_RETURNED, referralCodeReturned],
      [ReferralRewardsEvents.EarnedReturned, earnedReturned],
      [ReferralRewardsEvents.ReferredUsersReturned, referredUsersReturned],
      [ReferralRewardsEvents.RewardsPaidReturned, rewardsPaidReturned],
      [ReferralRewardsEvents.WithdrawalsReturned, withdrawalsReturned],
      [BalanceManagerEvents.BalanceReturned, balanceManagerBalanceReturned],
      [RewardManagerEvents.RewardCompleted, getRewardCompleted],
      [ReferralRewardsEvents.RewardCompleted, getRewardCompleted],
      [ArShieldControllerEvents.ReferralsReturned, arShieldReferralsReturned],
      [ArShieldControllerEvents.BalanceReturned, arShieldBalanceReturned],
    ]

    turnOnEmitterListeners(emitter, events)

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [account])

  function dispatchUpdateEvents() {
    dispatcher.dispatch({
      type: ArShieldControllerEvents.GetReferrals,
      content: {},
    })
    dispatcher.dispatch({
      type: ArShieldControllerEvents.GetBalance,
      content: {},
    })
    dispatcher.dispatch({
      type: ReferralRewardsEvents.GetEarned,
      content: {},
    })
    dispatcher.dispatch({
      type: ReferralRewardsEvents.GetReferredUsers,
      content: {},
    })
    dispatcher.dispatch({
      type: ReferralRewardsEvents.GetRewardsPaid,
      content: {},
    })
    dispatcher.dispatch({
      type: ReferralRewardsEvents.GetWithdrawals,
      content: {},
    })
    dispatcher.dispatch({
      type: BalanceManagerEvents.GetBalance,
      content: {},
    })
  }

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => setAccount(null)

  const errorReturned = (e) => {}

  const referrerSet = (r) => {
    //console.log({ r })
  }

  const AlertStyled = styled(AlertWithChildren)`
    margin: 20px auto 18px;
    filter: ${(p) => (p.blur ? 'blur(2px)' : 'none')};
  `

  const referralCodeReturned = (r) => {
    const _code = store.getStore('referralCode')
    setReferralCode(_code)
  }

  const earnedReturned = () => {
    const _earned = store.getStore('ReferralRewards_Earned')
    setReferralRewardsEarned(_earned)
  }

  const referredUsersReturned = () => {
    const _users = store.getStore('ReferralRewards_ReferredUsers')
    setReferredUsers(_users)
  }

  const rewardsPaidReturned = () => {
    const _rewards = store.getStore('ReferralRewards_RewardsPaid')
    setRecentRewards(_rewards)
  }

  const arShieldReferralsReturned = () => {
    const _referrals = store.getStore('ArShieldController_Referrals')
    setArShieldReferrals(_referrals)
  }

  const arShieldBalanceReturned = () => {
    const _balances = store.getStore('ArShieldController_Balance')
    setArShieldControllerBalance(_balances)
  }

  const balanceManagerBalanceReturned = () => {
    const _balance = store.getStore('BalanceManager_Balance')
    setBalanceManagerBalance(_balance)
  }

  const getRewardCompleted = () => {
    dispatchUpdateEvents()
  }

  const withdrawalsReturned = () => {
    let _withdrawals = store.getStore('ReferralRewards_Withdrawals')
    if (_withdrawals == null) {
      _withdrawals = []
    }
    setWithdrawals(_withdrawals)
  }

  const handleToggleReffered = () => {
    setReferredUsers(MOCK_DATA().referredUsers)
    setShowReferred(!showReferred)
  }

  const handleToggleRecent = () => {
    setRecentRewards(MOCK_DATA().recentRewards)
    setShowRecent(!showRecent)
  }

  const withdrawAmountSymbol = (protocol) => {
    if (protocol === 'arNxm') {
      return 'ARNXM'
    }

    return 'ARMOR'
  }

  const onWithdrawArNxm = () => {
    dispatcher.dispatch({
      type: ReferralRewardsEvents.GetReward,
      content: {},
    })
  }

  const onWithdrawArCore = () => {
    dispatcher.dispatch({
      type: BalanceManagerEvents.GetReward,
      content: {},
    })
  }

  const onCopied = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, TOOLTIP_DISAPPEAR_DELAY)
  }

  const combinedReferredUsers = () => {
    let users = referredUsers.concat(arShieldReferrals)
    users.sort((a, b) => b.timestampRaw - a.timestampRaw)
    return users
  }

  const combinedRecentRewards = () => {
    let rewards = recentRewards.concat(arShieldReferrals)
    rewards.sort((a, b) => b.timestampRaw - a.timestampRaw)
    return rewards
  }

  return (
    <Container noaccount={!account}>
      <Title>{t('Referrals.Title')}</Title>
      <AlertStyled severity="info" title={t('Stake.Warning.Title')}>
        {!account ? (
          <div>
            Please connect your wallet. You will then see your unique referral
            link that you can share and the rewards earned when users that were
            referred by you purchase Armor's Cover products: arCore Smart Cover,
            Shield Vaults and the arNXM Vaults.
          </div>
        ) : (
          <div>
            Below are the rewards earned when users that were referred by you
            purchase Armor's Cover products: arCore Smart Cover, Shield Vaults
            and the arNXM Vaults. Below you will see your unique referral link
            that you can share to earn referral fees and recent data about
            referred users, recent rewards and your withdrawals.
          </div>
        )}
      </AlertStyled>
      {account ? (
        <>
          <Card
            data={balance}
            arnxmBalance={referralRewardsEarned || '0'}
            arcoreBalance={balanceManagerBalance || '0'}
            arShieldBalance={arShieldControllerBalance}
            onWithdrawArNxm={onWithdrawArNxm}
            onWithdrawArCore={onWithdrawArCore}
            account={account}
          />
          <ReferralURLWrapper>
            <AddressTitle>{t('Referrals.ReferralAddress')}:</AddressTitle>
            <AddressLink>
              https://armor.fi/r/{referralCode}
              <CopyToClipboard
                text={`https://armor.fi/r/${referralCode}`}
                onCopy={onCopied}
              >
                <Tooltip
                  arrow
                  interactive
                  placement="top"
                  enterTouchDelay={50}
                  title="Copied"
                  open={isCopied}
                >
                  <CopyButton color="primary">Copy</CopyButton>
                </Tooltip>
              </CopyToClipboard>
            </AddressLink>
          </ReferralURLWrapper>
          <Wrapper>
            <ReferBox>
              <SubTitle>{t('Referrals.ReferredUsers')}</SubTitle>
              <TableContainerStyled component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <RowHead>
                      <TableTitle align="left">
                        {t('Referrals.User')}
                      </TableTitle>
                      <TableTitle align="left">Date</TableTitle>
                    </RowHead>
                  </TableHead>
                  <TableBody>
                    {combinedReferredUsers() &&
                      combinedReferredUsers().map(
                        ({ address, timestamp }, i) => (
                          <Row key={i} tabIndex={-1}>
                            <LinkCell align="left">
                              <UserAccount href="#">
                                {uglifyAddress(address, 10, 4)}
                              </UserAccount>
                            </LinkCell>
                            <Cell align="left">{timestamp}</Cell>
                          </Row>
                        )
                      )}
                  </TableBody>
                </Table>
                {combinedReferredUsers().length <= 0 && (
                  <ShowMoreRow>
                    <InfoText>There is nothing to show yet</InfoText>
                  </ShowMoreRow>
                )}
              </TableContainerStyled>
            </ReferBox>
            <ReferBox>
              <SubTitle>Recent Rewards</SubTitle>
              <TableContainerStyled component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <RowHead>
                      <TableTitle align="left">
                        {t('Referrals.User')}
                      </TableTitle>
                      <TableTitle align="left">
                        {t('Referrals.Protocol')}
                      </TableTitle>
                      <TableTitle align="left">
                        {t('Referrals.Amount')}
                      </TableTitle>
                      <TableTitle align="left">Date</TableTitle>
                    </RowHead>
                  </TableHead>
                  <TableBody>
                    {combinedRecentRewards() &&
                      combinedRecentRewards().map(
                        ({ address, reward, protocol, timestamp }, i) => (
                          <Row key={i} tabIndex={-1}>
                            <LinkCell align="left">
                              <UserAccount href="#">
                                {uglifyAddress(address, 5, 4)}
                              </UserAccount>
                            </LinkCell>
                            <Cell align="left">{protocol}</Cell>
                            <Cell align="left">
                              <Tooltip
                                arrow
                                placement="top"
                                enterTouchDelay={50}
                                title={`${commas(4).format(reward)} ETH`}
                              >
                                <FlexSpan>
                                  <CropValue>
                                    {commas(4).format(reward)}
                                  </CropValue>
                                  ETH
                                </FlexSpan>
                              </Tooltip>
                            </Cell>
                            <Cell align="left">{timestamp}</Cell>
                          </Row>
                        )
                      )}
                  </TableBody>
                </Table>
                {recentRewards.length <= 0 && arShieldReferrals.length <= 0 && (
                  <ShowMoreRow>
                    <InfoText>There is nothing to show yet</InfoText>
                  </ShowMoreRow>
                )}
              </TableContainerStyled>
            </ReferBox>
          </Wrapper>
          <Wrapper>
            <ReferFullBox>
              <SubTitle>Withdrawals</SubTitle>
              <TableContainerStyled component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <RowHead>
                      <TableTitle align="left">Protocol</TableTitle>
                      <TableTitle align="left">Amount</TableTitle>
                      <TableTitle align="left">Date</TableTitle>
                    </RowHead>
                  </TableHead>
                  <TableBody>
                    {withdrawals &&
                      withdrawals.map(({ protocol, amount, timestamp }, i) => (
                        <Row key={i} tabIndex={-1}>
                          <Cell align="left">
                            <div style={{ paddingLeft: 14 }}>{protocol}</div>
                          </Cell>
                          <Cell align="left">
                            {commas(8).format(amount)}{' '}
                            {withdrawAmountSymbol(protocol)}
                          </Cell>
                          <Cell align="left">
                            <div>{timestamp}</div>
                          </Cell>
                        </Row>
                      ))}
                  </TableBody>
                </Table>

                {withdrawals.length <= 0 && (
                  <ShowMoreRow>
                    <InfoText>There is nothing to show yet</InfoText>
                  </ShowMoreRow>
                )}
              </TableContainerStyled>
            </ReferFullBox>
          </Wrapper>
        </>
      ) : (
        <>
          <ConnectWallet />
          <ReferralsSkeleton />
        </>
      )}
    </Container>
  )
}

export default withTranslation()(withRouter(Referrals))
