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
  FilterStyled,
  ArrowField,
  SelectMenu,
  SelectName,
  ActionsWrapper,
  RewardsActiveWrapper,
  SubTitle,
  TooltipSwitcher,
  TooltipSpan,
  FilteredTooltip,
} from './styled'
import { parse as queryParse } from 'qs'
import BaseFarming from '../baseFarm/baseFarming/BaseFarming'
import Tooltip from '@material-ui/core/Tooltip'
import GiftBoxIcon from '../icons/GiftBoxIcon'
import TooltipGuide from '../common/tooltipGuide/TooltipGuide'
import AboutInfoIcon from '../icons/AboutInfoIcon'
import Container from '../common/container/Container'
import Sortbar from './Sortbar'
import { Title } from '../common/Title'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const Rewards = ({ theme, network, t }) => {
  const _farmingAPYs = store.getStore('farmingAPYs')

  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState(null)
  const [sortedBy, setSortedBy] = useState('apy')
  const [sortedDirection, setSortedDirection] = useState('desc')
  const [token, setToken] = useState('all')
  const [pair, setPair] = useState('all')
  const [exchange, setExchange] = useState('all')
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
    setPools(_pools.filter((p) => !p.inactive))

    setInactivePools(_pools.filter((p) => p.inactive))

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

  useEffect(() => {
    if (_farmingAPYs && _farmingAPYs.length > 0) {
      const _sortedAPYs = _farmingAPYs.sort(compareByApy)
      setAPYs(_sortedAPYs)
    }
  }, [_farmingAPYs])

  const parseQueryString = () => {
    const queryParams = queryParse(window.location.search, {
      ignoreQueryPrefix: true,
    })
    if (
      queryParams.token &&
      ['all', 'armor', 'arnxm'].includes(queryParams.token.toLowerCase())
    ) {
      setToken(queryParams.token)
    }

    if (
      queryParams.pair &&
      ['all', 'eth', 'wbtc', 'dai', 'armor', 'wnxm'].includes(
        queryParams.pair.toLowerCase()
      )
    ) {
      setPair(queryParams.pair)
    }

    if (
      queryParams.exchange &&
      ['all', 'uniswap', 'sushiswap', '1inch', 'balancer'].includes(
        queryParams.exchange.toLowerCase()
      )
    ) {
      setExchange(queryParams.exchange)
    }
  }

  const handleRewardsPoolsUpdated = () => {
    const _pools = store.getStore('rewardsPools')
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
    setIsLoading(false)
  }

  const handleChangeToken = (e) => {
    setToken(e.target.value)
  }

  const handleClickSortBy = (_sortedBy) => {
    if (_sortedBy === sortedBy) {
      setSortedDirection(sortedDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortedBy(_sortedBy)
    }
  }

  const handleChangePair = (e) => {
    setPair(e.target.value)
  }

  const handleChangeExchange = (e) => {
    setExchange(e.target.value)
  }

  const compareByApy = (apy1, apy2) => {
    if (parseFloat(apy1.apy.yearly) > parseFloat(apy2.apy.yearly)) {
      return -1
    } else {
      return 1
    }
  }

  const sortPoolsByApy = (_pools) => {
    const _sortedPools = []
    for (const apy of APYs) {
      const _pool = _pools.find(
        (pool) =>
          pool.address.toLowerCase() === apy.contract_address.toLowerCase()
      )
      if (_pool) {
        _sortedPools.push(_pool)
      }
    }
    return _sortedPools
  }

  const compaireByExchange = (_pool1, _pool2) => {
    if (_pool1.exchange > _pool2.exchange) {
      return 1
    } else {
      return -1
    }
  }

  const compaireByName = (_pool1, _pool2) => {
    if (_pool1.title > _pool2.title) {
      return 1
    } else {
      return -1
    }
  }

  const sortPools = (_pools) => {
    if (sortedBy === '') {
      return _pools
    } else if (sortedBy === 'apy') {
      return sortedDirection === 'desc'
        ? sortPoolsByApy(_pools)
        : sortPoolsByApy(_pools).reverse()
    } else if (sortedBy === 'exchange') {
      return sortedDirection === 'desc'
        ? _pools.sort(compaireByExchange)
        : _pools.sort(compaireByExchange).reverse()
    } else if (sortedBy === 'name') {
      return sortedDirection === 'desc'
        ? _pools.sort(compaireByName)
        : _pools.sort(compaireByName).reverse()
    } else {
      return _pools
    }
  }

  const filterPools = (_pools) => {
    const _filterPools = _pools.filter((p) => {
      return (
        (token === 'all' || token === p.token.toLowerCase()) &&
        (pair === 'all' || pair === p.pair.toLowerCase()) &&
        (exchange === 'all' || exchange === p.exchange.toLowerCase())
      )
    })
    const _sortedPools = sortPools(_filterPools)
    return _sortedPools
  }

  const handleFilterRewardsAvailablePools = (_, _isHidden) => {
    setHidden(_isHidden)
    setFilterRewardsAvailablePools(_isHidden)
  }

  return (
    <Container noaccount={!account}>
      <Title>{t('Rewards.Title')}</Title>
      <>
        <ActionsWrapper>
          <DropdownStyled
            select
            large="true"
            name="token"
            value={token}
            onChange={handleChangeToken}
            SelectProps={{ native: false }}
          >
            <SelectMenu value="all">
              <SelectName>{t('Rewards.AllTokens')}</SelectName>
            </SelectMenu>
            <SelectMenu value="armor">
              <SelectName>ARMOR</SelectName>
            </SelectMenu>
            <SelectMenu value="arnxm">
              <SelectName>arNXM</SelectName>
            </SelectMenu>
          </DropdownStyled>
          <DropdownStyled
            select
            name="pair"
            value={pair}
            onChange={handleChangePair}
            SelectProps={{ native: false }}
          >
            <SelectMenu value="all">
              <SelectName>{t('Rewards.AllPairs')}</SelectName>
            </SelectMenu>
            <SelectMenu value="eth">
              <SelectName>ETH</SelectName>
            </SelectMenu>
            <SelectMenu value="wbtc">
              <SelectName>WBTC</SelectName>
            </SelectMenu>
            <SelectMenu value="dai">
              <SelectName>DAI</SelectName>
            </SelectMenu>
            <SelectMenu value="armor">
              <SelectName>ARMOR</SelectName>
            </SelectMenu>
            <SelectMenu value="wnxm">
              <SelectName>wNXM</SelectName>
            </SelectMenu>
          </DropdownStyled>
          <DropdownStyled
            select
            large="true"
            name="exchange"
            value={exchange}
            onChange={handleChangeExchange}
            SelectProps={{ native: false }}
          >
            <SelectMenu value="all">
              <SelectName>{t('Rewards.AllExchanges')}</SelectName>
            </SelectMenu>
            <SelectMenu value="uniswap">
              <SelectName>UNISWAP</SelectName>
            </SelectMenu>
            <SelectMenu value="sushiswap">
              <SelectName>SUSHISWAP</SelectName>
            </SelectMenu>
            <SelectMenu value="1inch">
              <SelectName>1INCH</SelectName>
            </SelectMenu>
            <SelectMenu value="balancer">
              <SelectName>BALANCER</SelectName>
            </SelectMenu>
          </DropdownStyled>
          <FilteredTooltip>
            <TooltipGuide text={t('Rewards.FilteredTooltip')}>
              <TooltipSpan>
                <AboutInfoIcon color={colors.defaultLightActive} />
              </TooltipSpan>
            </TooltipGuide>
          </FilteredTooltip>

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
        <Sortbar
          sortedBy={sortedBy}
          handleClickSortBy={handleClickSortBy}
          sortedDirection={sortedDirection}
        />
        {filterPools(pools).map((pool) => {
          return (
            <BaseFarming
              key={pool.prefix}
              prefix={pool.prefix}
              title={`${pool.title}`}
              exchange={`${pool.exchange}`}
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

        {filterPools(inactivePools).length > 0 && (
          <>
            <SubTitle>{t('Rewards.InactivePools')}:</SubTitle>
            {filterPools(inactivePools).map((pool) => {
              return (
                <BaseFarming
                  key={pool.prefix}
                  prefix={pool.prefix}
                  title={`${pool.title}`}
                  exchange={`${pool.exchange}`}
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
        )}
      </>
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Rewards)))
