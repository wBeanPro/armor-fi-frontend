import React, { useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import {
  logoMapper,
  removeEmitterListeners,
  turnOnEmitterListeners,
} from '../../helpers'
import Store from '../../stores/store'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
} from '../../constants'
import { Description, FilterWrapper } from './styled'
import Search from '../common/search/Search'
import Container from '../common/container/Container'
import { Title } from '../common/Title'
import ShieldGroup from './components/shieldGroup/ShieldGroup'
import cnf from '../../config/cnf'
import ShieldGroupComingSoon from './components/shieldGroup/ShieldGroupComingSoon'
import styled from 'styled-components'
import AlertWithChildren from '../common/alert/AlertWithChildren'
import Button from '../common/button/Button'
import ActionModal from '../common/actionModal/ActionModal'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const AlertStyled = styled(AlertWithChildren)`
  margin: 20px auto 18px;
  filter: ${(p) => (p.blur ? 'blur(2px)' : 'none')};
`

const ArShield = ({ t, network }) => {
  const [search, setSearch] = useState('')
  const [searchError, setSearchError] = useState(false)
  const [account, setAccount] = useState(null)
  const [isMintModalOpened, setIsMintModalOpened] = useState(false)
  const [isRedeemModalOpened, setIsRedeemModalOpened] = useState(false)
  const [shieldGroups, setShieldGroups] = useState([])
  const [isAlertHidden, setIsAlertHidden] = useState(false)

  const [isDepositing, setIsDepositing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [modalText, setModalText] = useState('')

  useEffect(() => {
    let isHidden = localStorage.getItem('arshield_is_alert_hidden') === 'true'
    setIsAlertHidden(isHidden)
  }, [])

  useEffect(() => {
    localStorage.setItem('arshield_is_alert_hidden', isAlertHidden.toString())
  }, [isAlertHidden])

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)

    populateShieldGroups(cnf.SHIELDS)

    let events = [
      [ERROR, errorReturned],
      [CONNECTION_CONNECTED, connectionConnected],
      [CONNECTION_DISCONNECTED, connectionDisconnected],
    ]
    turnOnEmitterListeners(emitter, events)

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [network])

  const populateShieldGroups = (cnf) => {
    let shields = []
    Object.keys(cnf).forEach((group, i) => {
      let newShield = {
        groupTitle: group,
        logo: logoMapper(group),
        shields: [],
      }

      Object.keys(cnf[group]).forEach((key, j) => {
        if (key === 'config') {
          return
        }

        Object.keys(cnf[group].shields).forEach((shield, j) => {
          newShield.shields.push({
            shieldTitle: shield,
            groupTitle: group,
            address: cnf[group].shields[shield].shieldAddress,
            underlyingTokenAddress:
              cnf[group].shields[shield].underlyingTokenAddress,
            logo: cnf[group].shields[shield].logo,
            holdingsDecimalPlaces: cnf[group].config.holdingsDecimalPlaces,
            underlyingTokenDecimalPlaces:
              cnf[group].config.underlyingTokenDecimalPlaces,
          })
        })
      })

      shields.push(newShield)
    })

    setShieldGroups(shields)

    return shields
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => setAccount(null)

  const errorReturned = (error) => {
    console.log('Error', error)
  }

  const totalEthValueReturned = () => {
    // const _totalEthValue = store.getStore(ArShieldsCoverageBase.TotalEthValueReturned)
    // setTotalCoverageEthValue(_totalEthValue)
  }

  const onSearchChanged = (e) => {
    setSearch(e.target.value)
  }

  const handleOpenMintModal = () => {
    setIsMintModalOpened(true)
  }

  const handleCloseMintModal = () => {
    setIsMintModalOpened(false)
  }
  const handleOpenRedeemModal = () => {
    setIsRedeemModalOpened(true)
  }

  const handleCloseRedeemModal = () => {
    setIsRedeemModalOpened(false)
  }

  return (
    <Container noaccount={!account}>
      <Title>arShield</Title>
      {!isAlertHidden && (
        <AlertStyled
          blur={isMintModalOpened || isRedeemModalOpened}
          severity="info"
          title={t('Stake.Warning.Title')}
        >
          Armored Shield Vaults are covered storage vaults for DeFi tokens with
          auto-payments, powered by arCore. Users can deposit their DeFi tokens,
          receive their arToken, and enjoy their FDIC-like pooled coverage in
          perpetuity with no maintenance needed (please read more about our
          coverage{' '}
          <a
            href={
              'https://armorfi.gitbook.io/armor/armor-v2/arshield-armored-vaults'
            }
            target={'_blank'}
            style={{ color: '#fff' }}
            rel="noreferrer"
          >
            here
          </a>{' '}
          before depositing).
          <br />
          <br />
          Click “Deposit” to add your tokens to a shielded vault. This will
          create arTokens, representing a covered version of your tokens.
          <br />
          <br />
          Click “Withdraw” to exchange the arTokens back to the underlying
          tokens. Both deposits as well as withdrawals incur a 0.2% cost.
          <br />
          <br />
          Please see the{' '}
          <a
            href={
              'https://armorfi.gitbook.io/armor/armor-v2/arshield-armored-vaults'
            }
            target={'_blank'}
            style={{ color: '#fff' }}
            rel="noreferrer"
          >
            Armor GitBook
          </a>{' '}
          for more details and examples.
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              buttonText="hide information"
              isDisabled={false}
              onClick={() => {
                setIsAlertHidden(true)
              }}
              bordered={true}
              margin="0 7px"
            />
          </div>
        </AlertStyled>
      )}

      {isAlertHidden && (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            buttonText="show more information"
            isDisabled={false}
            onClick={() => setIsAlertHidden(false)}
            bordered={false}
            margin="0 7px"
          />
        </div>
      )}

      <FilterWrapper>
        <Search
          disabled={false}
          value={search}
          error={searchError}
          onChange={onSearchChanged}
          placeholder="Yearn, Uniswap..."
        />
      </FilterWrapper>

      {shieldGroups.map(({ groupTitle, logo, shields }, index) => (
        <ShieldGroup
          key={index}
          title={groupTitle}
          logo={logo}
          shields={shields}
          account={account}
          network={network}
          currentCoverage={'50MM'}
          handleOpenMintModal={handleOpenMintModal}
          handleOpenRedeemModal={handleOpenRedeemModal}
          isDepositing={isDepositing}
          setIsDepositing={setIsDepositing}
          isWithdrawing={isWithdrawing}
          setIsWithdrawing={setIsWithdrawing}
          setModalText={setModalText}
        />
      ))}

      <ShieldGroupComingSoon title={'Curve'} logo={logoMapper('Curve')} />

      <ShieldGroupComingSoon title={'Uniswap'} logo={logoMapper('Uniswap')} />

      <ActionModal
        closeModal={false}
        actionText={modalText}
        isModalOpened={isDepositing || isWithdrawing}
      />
    </Container>
  )
}

export default withTranslation()(withRouter(ArShield))
