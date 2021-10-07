import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { removeEmitterListeners, turnOnEmitterListeners } from '../../helpers'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import Store from '../../stores/store'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
  FARMING_APYS_RETURNED,
} from '../../constants'
import {
  DropdownStyled,
  SelectMenu,
  SelectName,
  ActionsWrapper,
  RewardsActiveWrapper,
  TooltipSwitcher,
} from './styled'
import { parse as queryParse } from 'qs'
import BaseFarming from './baseFarming/BaseFarming'
import Tooltip from '@material-ui/core/Tooltip'
import GiftBoxIcon from '../icons/GiftBoxIcon'
import MOCK_DATA from './mock'
import Container from '../common/container/Container'
import { Title } from '../common/Title'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const ArShieldRewards = ({ classes, theme, network, t }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [asset, setAsset] = useState('all')
  const [APYs, setAPYs] = useState([])
  const [pools, setPools] = useState([])
  const [inactivePools, setInactivePools] = useState([])
  const [filterRewardsAvailablePools, setFilterRewardsAvailablePools] =
    useState(false)
  const [hidden, setHidden] = useState(false)
  const { colors } = theme

  useEffect(() => {
    setIsLoading(true)
    const _account = store.getStore('account')
    setAccount(_account)

    const _pools = store.getStore('rewardsPools')
    setPools(MOCK_DATA)

    setInactivePools(_pools.filter((p) => p.inactive))

    const _farmingAPYs = store.getStore('farmingAPYs')
    if (_farmingAPYs) {
      setAPYs(_farmingAPYs)
    }

    parseQueryString()

    const events = [
      [ERROR, errorReturned],
      [CONNECTION_CONNECTED, connectionConnected],
      [CONNECTION_DISCONNECTED, connectionDisconnected],
      [FARMING_APYS_RETURNED, farmingAPYsReturned],
    ]

    turnOnEmitterListeners(emitter, events)
    setIsLoading(false)
    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [network, account])

  const parseQueryString = () => {
    const queryParams = queryParse(window.location.search, {
      ignoreQueryPrefix: true,
    })
    if (
      queryParams.asset &&
      ['all', 'aryDAI', 'aryCRV'].includes(queryParams.asset.toLowerCase())
    ) {
      setAsset(queryParams.asset)
    }
  }

  const handleRewardsPoolsUpdated = () => {
    const _pools = store.getStore('rewardsPools')
    console.log(
      'POOLS UPDATED',
      _pools.map((p) => p.rewardsAvailable)
    )
    setPools(_pools)
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    setAccount(_account)
    setIsLoading(false)
  }

  const farmingAPYsReturned = (apys) => {
    setAPYs(apys)
  }

  const connectionDisconnected = () => {
    setAccount(null)
    setIsLoading(false)
  }

  const errorReturned = (error) => {
    console.log({ error })
    setIsLoading(false)
  }

  const handleChangeAsset = (e) => {
    setAsset(e.target.value)
  }

  const filterPools = (_pools) => {
    console.log({ _pools })
    return _pools.filter((p) => {
      return asset === 'all' || asset === p.asset
    })
  }

  const handleFilterRewardsAvailablePools = (_, _isHidden) => {
    setHidden(_isHidden)
    setFilterRewardsAvailablePools(_isHidden)
  }

  return (
    <Container noaccount={!account}>
      <Title>arShield Rewards</Title>
      <>
        <ActionsWrapper>
          <DropdownStyled
            select
            name="asset"
            value={asset}
            onChange={handleChangeAsset}
            SelectProps={{ native: false }}
          >
            <SelectMenu value="all">
              <SelectName>All shields</SelectName>
            </SelectMenu>
            <SelectMenu value="aryDAI">
              <SelectName>aryDAI</SelectName>
            </SelectMenu>
            <SelectMenu value="aryCRV">
              <SelectName>aryCRV</SelectName>
            </SelectMenu>
          </DropdownStyled>
          <Tooltip title={t('Rewards.GiftTooltip')} placement="top" arrow>
            <RewardsActiveWrapper>
              <TooltipSwitcher
                checked={hidden}
                onChange={handleFilterRewardsAvailablePools}
                color="primary"
                name="rewardsActive"
                disabled={!account || !account.address}
              />
              <GiftBoxIcon color={colors.activeSearch} />
            </RewardsActiveWrapper>
          </Tooltip>
        </ActionsWrapper>

        {filterPools(pools).map((pool) => {
          return (
            <BaseFarming
              key={pool.prefix}
              prefix={pool.prefix}
              title={pool.title}
              liquidityUrl={pool.liquidityUrl}
              infoUrl={pool.infoUrl}
              address={pool.address}
              abi={pool.abi}
              network={network}
              apyData={APYs}
              stakeHelpText={t('UtilizationFarming.StakeHelpTooltip')}
              filterRewardsAvailablePools={filterRewardsAvailablePools}
              inactive={pool.inactive}
            />
          )
        })}
      </>
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(ArShieldRewards)))
