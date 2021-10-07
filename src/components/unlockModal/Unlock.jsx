import React, { Component, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from 'react-device-detect'
import { Web3Provider } from '@ethersproject/providers'
import {
  ERROR,
  CONNECTION_DISCONNECTED,
  CONNECTION_CONNECTED,
} from '../../constants'
import Store from '../../stores/store'
import { withTranslation } from 'react-i18next'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  Container,
  Content,
  Wrapper,
  ButtonWrapper,
  StyledButton,
  ButtonText,
  Image,
  Dot,
  DeactivateContainer,
  DeactivateText,
  WalletContainer,
  Shadow,
} from './styled'

const emitter = Store.emitter
const store = Store.store

const Unlock = ({ closeModal, loggedIn, t, deviceHeight }) => {
  const [error, setError] = useState(null)
  const [metamaskLoading, setMetamaskLoading] = useState(false)
  const [ledgerLoading, setLedgerLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(null)

  useEffect(() => {
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(ERROR, errorHandler)
    return () => {
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
      emitter.removeListener(ERROR, errorHandler)
    }
  }, [])

  const errorHandler = (err) => {
    setIsLoading(false)
    setError(err)
    setMetamaskLoading(false)
    setLedgerLoading(false)
  }

  const connectionConnected = () => {
    if (closeModal) closeModal()
  }

  const connectionDisconnected = () => {
    if (closeModal) closeModal()
  }

  const metamaskUnlocked = () => {
    setMetamaskLoading(false)
    if (closeModal) closeModal()
  }

  const ledgerUnlocked = () => {
    setLedgerLoading(false)
    if (closeModal) closeModal()
  }

  const cancelLedger = () => {
    setLedgerLoading(false)
  }

  const cancelMetamask = () => {
    setMetamaskLoading(false)
  }

  const getLibrary = (provider) => {
    const library = new Web3Provider(provider)
    library.pollingInterval = 8000
    return library
  }

  // const onConnectionClicked = (
  //   currentConnector,
  //   name,
  //   setActivatingConnector,
  //   activate
  // ) => {
  //   const connectorsByName = store.getStore('connectorsByName')
  //   setActivatingConnector(currentConnector)
  //   activate(connectorsByName[name])
  // }

  const onDeactivateClicked = (deactivate, connector) => {
    if (deactivate) {
      deactivate()
    }
    if (connector && connector.close) {
      connector.close()
    }
    store.setStore({ account: null, web3context: null })
    emitter.emit(CONNECTION_DISCONNECTED)
  }

  return (
    <Container>
      <Content>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MyComponent
            deviceHeight={deviceHeight}
            closeModal={closeModal}
            loggedIn={loggedIn}
            t={t}
          />
        </Web3ReactProvider>
      </Content>
    </Container>
  )
}

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 8000
  return library
}

function onConnectionClicked(value, setActivatingConnector, activate) {
  setActivatingConnector(value)
  activate(value)
}

function onDeactivateClicked(deactivate, connector) {
  if (deactivate) {
    deactivate()
  }
  if (connector && connector.close) {
    connector.close()
  }
  store.setStore({ account: null, web3context: null })
  emitter.emit(CONNECTION_DISCONNECTED)
}

const MyComponent = ({ closeModal, loggedIn, t, deviceHeight }) => {
  const context = useWeb3React()
  const localContext = store.getStore('web3context')
  let localConnector = null
  if (localContext) localConnector = localContext.connector
  const {
    connector,
    library,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context
  let connectorsByName = store.getStore('connectorsByName')
  const [activatingConnector, setActivatingConnector] = useState()
  const [isEthMetaMask, setIsEthMetaMask] = useState(false)

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  useEffect(() => {
    if (account && active && library) {
      store.setStore({ account: { address: account }, web3context: context })
      emitter.emit(CONNECTION_CONNECTED)
      if (loggedIn) loggedIn()
    }
  }, [account, active])

  useEffect(() => {
    setIsEthMetaMask(window.ethereum && window.ethereum.isMetaMask)
  }, [])

  return (
    <Wrapper>
      <WalletContainer deviceheight={deviceHeight}>
        {connectorsByName.map(({ name, src, value }, i) => {
          const activating = value === activatingConnector
          const connected = value === connector || value === localConnector
          const disabled = !!activatingConnector || !!error

          return (
            <React.Fragment key={i}>
              <ButtonWrapper>
                <StyledButton
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    onConnectionClicked(value, setActivatingConnector, activate)
                  }}
                  disabled={disabled}
                >
                  <ButtonText>{name}</ButtonText>

                  {!activating && !connected && (
                    <Image
                      filter={name.toLowerCase() === 'trezor' ? 1 : 0}
                      src={require(`../../assets/${src}`)}
                      alt="icon wallet"
                    />
                  )}
                  {activating && (
                    <CircularProgress
                      size={15}
                      style={{ marginRight: '10px' }}
                    />
                  )}
                  {!activating && connected && <Dot />}
                </StyledButton>
              </ButtonWrapper>
            </React.Fragment>
          )
        })}
      </WalletContainer>
      <DeactivateContainer>
        <Shadow />
        <StyledButton
          variant="outlined"
          color="primary"
          onClick={() => onDeactivateClicked(deactivate, connector)}
        >
          <DeactivateText>{t('Unlock.Deactivate')}</DeactivateText>
        </StyledButton>
      </DeactivateContainer>
    </Wrapper>
  )
}

export default withTranslation()(withRouter(Unlock))
