import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Store from '../../stores/store'
import { getStatsRequest } from '../../helpers'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '../icons/SearchIcon'
import StatsTable from './StatsTable'
import RefreshIcon from '../icons/RefreshIcon'
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONTRACT_BALANCES_RETURNED,
  GET_CONTRACT_BALANCES,
} from '../../constants'
import {
  Wrapper,
  SearchWrapper,
  Input,
  RefreshButton,
  AlignCenter,
  CheckboxLabel,
  AssetCheckbox,
  Checkmark,
} from './styled'
import ConnectWallet from '../common/connectWallet/ConnectWallet'
import StatsSkeleton from './StatsSkeleton'
import Container from '../common/container/Container'
import { Title } from '../common/Title'

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const SORTABLE_FIELDS = [
  'name',
  'tokenEther',
  'tokenDai',
  'covers',
  'coverAvailable',
]

const Stats = ({ theme, t }) => {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showActiveCoverage, setShowActiveCoverage] = useState(true)
  const [isFetchingArNft, setIsFetchingArNft] = useState(true)
  const [arNftStats, setArNftStats] = useState([])
  const [sortBy, setSortBy] = useState(SORTABLE_FIELDS[1])
  const [sortDirection, setSortDirection] = useState('desc') // asc | desc
  const [contracts, setContracts] = useState(null)

  const { colors } = theme

  useEffect(() => {
    ;(async () => {
      await initStats()
      setIsLoading(false)
    })()

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(CONTRACT_BALANCES_RETURNED, contractBalancesReturned)

    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
      emitter.removeListener(
        CONTRACT_BALANCES_RETURNED,
        contractBalancesReturned
      )
    }
  }, [])

  const contractBalancesReturned = () => {
    const _contracts = store.getStore('contracts')
    setContracts(_contracts)
  }

  const errorReturned = (error) => {
    setIsLoading(false)
    setIsFetchingArNft(false)
  }

  const connectionConnected = async () => {}

  const connectionDisconnected = () => {}

  const initStats = async () => {
    setIsLoading(true)
    await getArNftStatsApi()
    setIsLoading(false)
  }

  const getArNftStatsApi = async () => {
    setIsFetchingArNft(true)
    try {
      dispatcher.dispatch({ type: GET_CONTRACT_BALANCES, content: {} })
      const { arNft } = await getStatsRequest()
      const _arNftStats = arNft.map((_o) => {
        const { logo, name } = contractNameLogoMapper(_o.Address)
        const _obj = {
          name,
          logo,
          contract: _o.Address,
          covers: _o.Statistics.Covers,
          tokenEther: _o.Statistics.Ether,
          tokenDai: _o.Statistics.Dai,
        }
        return _obj
      })
      setArNftStats(_arNftStats)
    } catch (e) {
      console.error('[getArNftStats]', e.toString())
      setArNftStats([])
    } finally {
      setIsFetchingArNft(false)
    }
  }

  const onSearchChanged = (e) => {
    setSearch(e.target.value)
  }

  const makeTotal = (arr) => {
    const totalObj = {
      name: t('Stats.Table.Total'),
      covers: 0,
      tokenETH: 0,
      tokenDai: 0,
      coverAvailable: 0,
    }
    for (const obj of arr) {
      totalObj.covers += +obj.covers
      totalObj.tokenETH += +obj.tokenEther
      totalObj.tokenDai += +obj.tokenDai
      totalObj.coverAvailable += +obj.coverAvailable
    }

    return totalObj
  }

  const handleClickSortBy = (_sortBy) => {
    if (_sortBy === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(_sortBy)
    }
  }

  const sortTableByName = (_dataArr, _sortBy) => {
    const _sortedArr = _dataArr.sort((_x, _y) => {
      try {
        const x = isNaN(+_x[_sortBy]) ? _x[_sortBy].toLowerCase() : +_x[_sortBy]
        const y = isNaN(+_y[_sortBy]) ? _y[_sortBy].toLowerCase() : +_y[_sortBy]
        return y < x ? -1 : y > x ? 1 : 0
      } catch (e) {
        return 1
      }
    })
    return sortDirection === 'desc' ? _sortedArr : _sortedArr.reverse()
  }

  const filterTableData = (_statsArr) => {
    let filteredStatsArr = _statsArr.filter((el) => el.covers > 0)

    if (!showActiveCoverage) {
      filteredStatsArr = _statsArr
    }
    return filteredStatsArr
  }

  const enrichTableData = (_statsArr) => {
    if (!contracts || contracts.length === 0) {
      return _statsArr
    }
    const _enrichedArr = []
    for (const stat of _statsArr) {
      const contractData = contracts.find(
        (c) => c.address.toLowerCase() === stat.contract.toLowerCase()
      )
      const coverAvailable = contractData
        ? contractData.capacity.capacityETH / 1e18
        : 0
      _enrichedArr.push({
        ...stat,
        coverAvailable,
      })
    }
    return _enrichedArr
  }

  const prepareArNftResults = (_statsArr) => {
    const enrichedArr = enrichTableData(_statsArr)
    const filteredArr = filterTableData(enrichedArr)
    const sortedArr = sortTableByName(filteredArr, sortBy)

    if (!search || search === '') {
      return [sortedArr, makeTotal(sortedArr)]
    }
    const filtered = sortedArr.filter((el) => {
      return el.name.toLowerCase().includes(search.toLowerCase())
    })
    return [filtered, makeTotal(filtered)]
  }

  const contractNameLogoMapper = (contractAddress) => {
    const _contracts = store.getStore('contracts')
    const item = _contracts.find(
      (c) => c.address.toLowerCase() === contractAddress.toLowerCase()
    )
    return item
      ? { name: item.name, logo: item.logo }
      : { name: contractAddress, logo: 'eth.png' }
  }

  const toggleActiveCoverage = (e) => {
    setShowActiveCoverage(e.target.checked)
  }

  return (
    <Container>
      <Wrapper>
        <Title>{t('Stats.Title')}</Title>
        <SearchWrapper>
          <CheckboxLabel
            control={
              <>
                <AssetCheckbox
                  checked={showActiveCoverage}
                  onChange={toggleActiveCoverage}
                  color="primary"
                  name="rewardsActive"
                  disabled={isLoading}
                />
                <Checkmark />
              </>
            }
            label={t('Stats.ShowActiveCoverageTooltip')}
          />
          <AlignCenter>
            <RefreshButton
              color="primary"
              disabled={isFetchingArNft}
              onClick={() => getArNftStatsApi()}
            >
              <RefreshIcon
                color={
                  isFetchingArNft ? colors.disabledText : colors.activeSearch
                }
              />
            </RefreshButton>
            <Input
              fullWidth
              disabled={isLoading}
              id={'search'}
              value={search}
              onChange={onSearchChanged}
              placeholder="Balancer, Uniswap..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color={colors.disabledText} />
                  </InputAdornment>
                ),
              }}
            />
          </AlignCenter>
        </SearchWrapper>
        {isFetchingArNft ? (
          <StatsSkeleton animation />
        ) : (
          <StatsTable
            data={prepareArNftResults(arNftStats)}
            sortBy={sortBy}
            handleClickSortBy={handleClickSortBy}
            sortDirection={sortDirection}
          />
        )}
      </Wrapper>
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Stats)))
