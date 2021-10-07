import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import IbcoPrelaunch from '../ibcoPrelaunch/IbcoPrelaunch'
import IbcoStarted from '../ibcoStarted/IbcoStarted'
import IbcoEnded from '../ibcoEnded/IbcoEnded'
import LoadingSpinner from '../loader/LoadingSpinner'
import { Root } from './styled'
import IbcoSkeleton from './IbcoSkeleton'
import Store from '../../stores/store'
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
} from '../../constants'
import cnf from '../../config/cnf'

const emitter = Store.emitter
const store = Store.store

const Ibco = () => {
  const [isIbcoStarted, setIsIbcoStarted] = useState(false)
  const [isIbcoEnded, setIsIbcoEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState(null)

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)

    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
    }
  }, [])

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => setAccount(null)

  const errorReturned = (e) => {
    setIsLoading(false)
  }

  // JUST FOR TESTS
  // const IBCO_BASE_DATE = '2020-12-09T00:00:00+00'
  // const IBCO_START_DATE = '2020-12-10T00:00:00+00'
  // const IBCO_END_DATE = '2021-11-15T00:00:00+00'

  useEffect(() => {
    const startDate = moment(cnf.IBCO_START_DATE)
    const endDate = moment(cnf.IBCO_END_DATE)

    if (moment().isBetween(startDate, endDate)) {
      setIsIbcoStarted(true)
      setIsIbcoEnded(false)
    }
    if (moment().isSameOrAfter(endDate)) {
      setIsIbcoStarted(true)
      setIsIbcoEnded(true)
    }
    setIsLoading(false)
  }, [])

  return account ? (
    isLoading ? (
      <div>
        <LoadingSpinner />
      </div>
    ) : (
      <Root>
        {/* IBCO NOT STARTED YET */}
        {!isIbcoStarted && !isIbcoEnded && (
          <IbcoPrelaunch
            baseDate={cnf.IBCO_BASE_DATE}
            ibcoStartDate={cnf.IBCO_START_DATE}
            onComplete={(pr) => setIsIbcoStarted(true)}
          />
        )}

        {/* IBCO STARTED */}
        {isIbcoStarted && !isIbcoEnded && (
          <IbcoStarted
            baseDate={cnf.IBCO_START_DATE}
            ibcoEndDate={cnf.IBCO_END_DATE}
            onComplete={(pr) => setIsIbcoEnded(true)}
          />
        )}

        {/* IBCO ENDED */}
        {isIbcoStarted && isIbcoEnded && (
          <IbcoEnded
            baseDate={cnf.IBCO_START_DATE}
            ibcoEndDate={cnf.IBCO_END_DATE}
          />
        )}
      </Root>
    )
  ) : (
    <IbcoSkeleton />
  )
}

export default withRouter(Ibco)
