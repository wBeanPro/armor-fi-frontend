import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../../constants'
import Store from '../../stores/store'
import { withTranslation } from 'react-i18next'
import LogoIcon from '../icons/LogoIcon'
import MobileMenu from './MobileMenu'
import {
  Container,
  GradientHeader,
  HeaderContainer,
  Icon,
  Name,
  ShowMenu,
} from './styled'
import Menu from './Menu'
import Account from './Account'

const emitter = Store.emitter
const store = Store.store

const Header = ({
  network,
  theme: { colors },
  history,
  location,
  isDemo,
  langs,
  lang,
  setLang,
  t,
}) => {
  const [account, setAccount] = useState(null)
  const [currentPage, setCurrentPage] = useState(location.pathname)

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)

    return () => {
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
    }
  }, [currentPage])

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => {
    setAccount(null)
  }

  const isHomePage = location.pathname === '/'

  const nav = (screen) => history.push(`/${screen ? screen : ''}`)

  return (
    <Container home={isHomePage}>
      <GradientHeader hide={isHomePage} />
      <HeaderContainer>
        <Icon onClick={() => nav()}>
          <LogoIcon
            width="24"
            height="30"
            color={isHomePage ? colors.primaryLightActive : colors.active}
          />
          <Name home={isHomePage}>armor.fi</Name>
        </Icon>
        <Menu isDemo={isDemo} setCurrentPage={setCurrentPage} />
        <Account
          network={network}
          langs={langs}
          lang={lang}
          setLang={setLang}
          account={account}
        />
        <ShowMenu>
          <MobileMenu isDemo={isDemo} />
        </ShowMenu>
      </HeaderContainer>
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Header)))
