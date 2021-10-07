import React, { useState, useEffect } from 'react'
import Store from '../../stores/store'
import { SET_GAS_PRICE_TYPE, GAS_PRICE_TYPE_RETURNED } from '../../constants'
import { getAllGasPricesRequest } from '../../helpers'
import gasPriceImg from '../../assets/logos/gas_price.svg'
import Tooltip from '@material-ui/core/Tooltip'

import { ButtonGroup, GasPriceLogo, Button, SkeletonLoader } from './styled'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const GasPriceBar = ({ isMobile }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [gasPriceType, setGasPriceType] = useState('standard') // instant/fast/standard/slow are allowed
  const [slowVal, setSlowVal] = useState(null)
  const [standardVal, setStandardVal] = useState(null)
  const [fastVal, setFastVal] = useState(null)
  const [instantVal, setInstantVal] = useState(null)
  const [ticker, setTicker] = useState(null)

  useEffect(() => {
    const _gasPriceType = store.getStore('gasPriceType')
    setGasPriceType(_gasPriceType)

    emitter.on(GAS_PRICE_TYPE_RETURNED, gasPriceReturned)

    calculateGasPrices()
    const _ticker = setInterval(calculateGasPrices, 10000)
    setTicker(_ticker)

    return () => {
      emitter.removeListener(GAS_PRICE_TYPE_RETURNED, gasPriceReturned)

      if (ticker) {
        clearInterval(ticker)
      }
    }
  }, [])

  const calculateGasPrices = async () => {
    try {
      const gp = await getAllGasPricesRequest()
      setSlowVal(gp.slow.toFixed())
      setStandardVal(gp.standard.toFixed())
      setFastVal(gp.fast.toFixed())
      setInstantVal(gp.instant.toFixed())
    } catch (e) {
      console.log('[calculateGasPrices]', e)
    }
    setIsLoading(false)
  }

  const handleSetGasPriceType = (e) => {
    dispatcher.dispatch({
      type: SET_GAS_PRICE_TYPE,
      content: { gasPriceType: e.currentTarget.value },
    })
  }

  const gasPriceReturned = ({ gasPriceType: _gasPriceType }) => {
    setGasPriceType(_gasPriceType)
  }

  return (
    <ButtonGroup
      ismobile={isMobile ? 1 : 0}
      value={gasPriceType}
      exclusive
      onChange={handleSetGasPriceType}
      aria-label="text alignment"
    >
      <Button value="none" aria-label="justified" disabled>
        <GasPriceLogo src={gasPriceImg} alt="gas price image" />
      </Button>
      <Button value="slow" aria-label="right aligned" disabled={isLoading}>
        <Tooltip arrow enterTouchDelay={50} title={'Slow'}>
          <span>{isLoading ? <SkeletonLoader /> : slowVal}</span>
        </Tooltip>
      </Button>
      <Button
        title="standard"
        value="standard"
        aria-label="centered"
        disabled={isLoading}
      >
        <Tooltip arrow enterTouchDelay={50} title={'Standard'}>
          <span>{isLoading ? <SkeletonLoader /> : standardVal}</span>
        </Tooltip>
      </Button>
      <Button
        title="fast"
        value="fast"
        aria-label="centered"
        disabled={isLoading}
      >
        <Tooltip arrow enterTouchDelay={50} title={'Fast'}>
          <span>{isLoading ? <SkeletonLoader /> : fastVal}</span>
        </Tooltip>
      </Button>
      <Button
        title="instant"
        value="instant"
        aria-label="left aligned"
        disabled={isLoading}
      >
        <Tooltip arrow enterTouchDelay={50} title={'Instant'}>
          <span>{isLoading ? <SkeletonLoader /> : instantVal}</span>
        </Tooltip>
      </Button>
    </ButtonGroup>
  )
}

export default GasPriceBar
