import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import {
  Container,
  Cell,
  Logo,
  NameLogo,
  NameContainer,
  Item,
  ItemValue,
} from './styled'
import {
  threeDigitFormatter,
  turnOnEmitterListeners,
  removeEmitterListeners,
} from '../../../../helpers'
import Store from '../../../../stores/store'
import { ProtocolStakeStats } from '../../../../classes/protocolStakeStats'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
  GET_PROTOCOL_STAKE_STATS,
  PROTOCOL_STAKE_STATS_RETURNED,
} from '../../../../constants'
import LoadingSpinner from '../../../loader/LoadingSpinner'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const ArNxmProtocols = ({ t, theme }) => {
  const [protocols, setProtocols] = useState([])
  const protocolStakeStats = useRef(new ProtocolStakeStats())
  const [isLoading, setIsLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const { colors } = theme

  useEffect(() => {
    setIsLoading(true)
    dispatcher.dispatch({
      type: GET_PROTOCOL_STAKE_STATS,
      content: {},
    })

    let events = [
      [ERROR, errorReturned],
      [PROTOCOL_STAKE_STATS_RETURNED, onProtocolStakeStatsReturned],
      [CONNECTION_CONNECTED, connectionConnected],
      [CONNECTION_DISCONNECTED, connectionDisconnected],
    ]
    turnOnEmitterListeners(emitter, events)

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [])

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    setAccount(_account)
    setIsLoading(false)
  }

  const connectionDisconnected = () => {
    setAccount(null)
    setIsLoading(false)
  }

  const errorReturned = (error) => {
    console.log({ error })
    setIsLoading(false)
  }

  const onProtocolStakeStatsReturned = (ourProtocols) => {
    setIsLoading(false)
    setProtocols(ourProtocols)
  }

  return (
    <Container>
      {isLoading && <LoadingSpinner color={colors.active} />}
      {protocols.map(({ logo, name, staked, usdStaked }, index) => (
        <Cell key={index}>
          <NameContainer>
            <Logo>
              <img src={require(`../../../../assets/${logo}`)} alt="icon" />
            </Logo>
            <NameLogo bold>{name}</NameLogo>
          </NameContainer>
          <Item>
            {t('ArNxmProtocols.Staked')}:
            <ItemValue>
              {` $${threeDigitFormatter.format(usdStaked)}`}
            </ItemValue>
            <ItemValue>{`${threeDigitFormatter.format(staked)} NXM`}</ItemValue>
          </Item>
        </Cell>
      ))}
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(ArNxmProtocols)))
