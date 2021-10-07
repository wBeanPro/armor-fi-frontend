import React, { useEffect, useState } from 'react'
import { withTheme } from 'styled-components'
import { Box, Header } from './styled'
import ShieldGroupTitle from './ShieldGroupTitle'
import RewardsButton from './RewardsButton'
import ShieldsTable from './ShieldsTable'
import ShieldRow from './shieldRow/ShieldRow'
import Store from '../../../../stores/store'
import { ERROR } from '../../../../constants'
import { PlanManagerEvents } from '../../../../stores/contracts/planManagerEvents'
import {
  removeEmitterListeners,
  turnOnEmitterListeners,
} from '../../../../helpers'
import { fromWei } from 'web3-utils'

const dispatcher = Store.dispatcher
const emitter = Store.emitter
const store = Store.store

const ShieldGroup = ({
  theme,
  title,
  account,
  network,
  logo,
  shields,
  isDepositing,
  setIsDepositing,
  isWithdrawing,
  setIsWithdrawing,
  setModalText,
}) => {
  const { colors } = theme
  const [isLoading, setIsLoading] = useState(true)
  const [shieldStats, setShieldStats] = useState({})
  const [maxCoverage, setMaxCoverage] = useState(0)
  const [totalEthCoverage, setTotalEthCoverage] = useState(0)

  const coverageBasePrefix = `ArShield.${title}.CoverageBase`
  const oraclePrefix = `ArShield.${title}.Oracle`

  const dispatch = (prefix, type, content) => {
    if (content == null) {
      content = {}
    }
    dispatcher.dispatch({
      type: `${prefix}.${type}`,
      content: content,
    })
    console.log({
      type: `${prefix}.${type}`,
      content: content,
    })
  }
  const getStore = (prefix, key) => {
    return store.getStore(`${prefix}_${key}`)
  }
  const eventKey = (prefix, key) => {
    return `${prefix}.${key}`
  }

  useEffect(() => {
    if (account == null) {
      return
    }
    setIsLoading(false)

    let events = [
      [ERROR, errorReturned],
      [
        eventKey(coverageBasePrefix, `ShieldStatsReturned`),
        onShieldStatsReturned,
      ],
      [
        eventKey(coverageBasePrefix, `TotalEthValueReturned`),
        totalEthValueReturned,
      ],
      [
        eventKey(coverageBasePrefix, `TotalEthCoverageReturned`),
        totalEthCoverageReturned,
      ],
    ]
    turnOnEmitterListeners(emitter, events)

    shields.forEach((shield) => {
      dispatch(coverageBasePrefix, 'GetShieldStats', {
        shieldAddress: shield.address,
      })
    })
    dispatch(coverageBasePrefix, 'GetTotalEthValue')
    dispatch(coverageBasePrefix, 'GetTotalEthCoverage')

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [account])

  const errorReturned = (error) => {
    setIsLoading(false)
  }

  // shieldStats
  const onShieldStatsReturned = () => {
    const _shieldStats = getStore(coverageBasePrefix, `ShieldStats`)
    setShieldStats(_shieldStats)
  }

  const totalEthValueReturned = () => {
    const _totalEthValue = getStore(coverageBasePrefix, `TotalEthValue`)
    setMaxCoverage(_totalEthValue)
  }

  const totalEthCoverageReturned = () => {
    const _totalEthCoverage = getStore(coverageBasePrefix, `TotalEthCoverage`)
    setTotalEthCoverage(_totalEthCoverage)
  }

  return (
    <Box>
      <Header>
        <ShieldGroupTitle title={title} logo={logo} theme={theme} />
        <RewardsButton />
      </Header>

      <ShieldsTable
        theme={theme}
        title={title}
        currentCoverage={totalEthCoverage}
        maxCoverage={maxCoverage}
      >
        {shields.map((data, index) => (
          <ShieldRow
            key={index}
            account={account}
            network={network}
            isDepositing={isDepositing}
            setIsDepositing={setIsDepositing}
            isWithdrawing={isWithdrawing}
            setIsWithdrawing={setIsWithdrawing}
            setModalText={setModalText}
            maxCoverage={maxCoverage}
            {...theme}
            {...data}
          />
        ))}
      </ShieldsTable>
    </Box>
  )
}

export default withTheme(ShieldGroup)
