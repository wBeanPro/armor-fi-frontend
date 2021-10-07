import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import MOCKED_DATA from './mock'
import Pool from './Pool'
import Cards from './Cards'
import HeadComponent from './Head'
import InputAdornment from '@material-ui/core/InputAdornment'
import FilterIcon from '../icons/FilterIcon'
import SearchIcon from '../icons/SearchIcon'
import { Title } from '../common/Title'
import { Container, Box, SearchField, Filter } from './styled'

const ArVault = ({ theme }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [pools, setPools] = useState([])
  const [poolsFiltered, setPoolsFiltered] = useState([])
  const [search, setSearch] = useState('')
  const { colors } = theme

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1200)
    window.addEventListener('resize', function () {
      window.innerWidth <= 1200 ? setIsMobile(true) : setIsMobile(false)
    })
    ;(async () => {
      const _pools = await MOCKED_DATA()
      setPools(_pools)
      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    const _poolsFiltered = pools.filter((pool) => {
      if (search && search !== '') {
        return (
          pool.poolName.toLowerCase().includes(search.toLowerCase()) ||
          pool.poolPair.toLowerCase().includes(search.toLowerCase())
        )
      } else return true
    })
    setPoolsFiltered(_poolsFiltered)
  }, [pools, search])

  const handleClickApprove = async (_pool, stakePlatform) => {
    console.log('POOL APPROVE', { _pool, stakePlatform })
  }

  const handleClickStake = async (_pool, stakePlatform) => {
    console.log('POOL STAKE', { _pool, stakePlatform })
  }

  const handleClickUnstake = async (_pool, stakePlatform) => {
    console.log('POOL UNSTAKE', { _pool, stakePlatform })
  }

  const onSearchChanged = (e) => {
    setSearch(e.target.value)
  }

  return (
    <Container>
      <Title>Armory Vaults</Title>
      <SearchField
        fullWidth
        disabled={isLoading}
        value={search}
        onChange={onSearchChanged}
        placeholder="Filter pairs"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color={colors.disabledText} />
            </InputAdornment>
          ),
          endAdornment: (
            <Filter position="end">
              <FilterIcon color={colors.disabledText} />
              Filter
            </Filter>
          ),
        }}
      />
      {!isLoading && (
        <>
          {isMobile ? (
            <Cards
              pools={poolsFiltered}
              onApprove={handleClickApprove}
              onStake={handleClickStake}
              onUnstake={handleClickUnstake}
            />
          ) : (
            <Box>
              <HeadComponent />
              <Pool
                pools={poolsFiltered}
                onApprove={handleClickApprove}
                onStake={handleClickStake}
                onUnstake={handleClickUnstake}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(ArVault)))
