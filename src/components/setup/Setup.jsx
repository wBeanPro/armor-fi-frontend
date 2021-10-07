import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../../constants'
import Store from '../../stores/store'
import { uglifyAddress, networkNameMapper } from '../../helpers'
import Locky from 'react-locky'
import Paper from '@material-ui/core/Paper'
import UnlockModal from '../unlockModal/UnlockModal'
import LangSwitcher from '../langSwitcher/LangSwitcher'
import Sidebar from '../sidebar/Sidebar'
import LogoIcon from '../icons/LogoIcon'
import TooltipGuideToggle from '../common/tooltipGuideToggle/TooltipGuideToggle'
import Tooltip from '@material-ui/core/Tooltip'
import armorLogo from '../../assets/armor.png'
import arnxmLogo from '../../assets/arnxm.png'
import metamaskLogo from '../../assets/metamask-right.png'
import RightArrowIcon from '../icons/RightArrowIcon'
import {
  BurgerBox,
  Burger,
  BurgerLine,
  Container,
  WalletAddress,
  ConnectedDot,
  NetworkIndicator,
  SlideOverlay,
  Slide,
  LogoContent,
  WalletInfo,
  WalletWrapper,
  TokensWrapper,
  TokenButton,
} from './styled'

const emitter = Store.emitter
const store = Store.store

const Setup = ({
  t,
  location,
  langs,
  lang,
  setLang,
  network,
  theme,
  history,
  deviceHeight,
}) => {
  const [account, setAccount] = useState(null)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [tokens, setTokens] = useState('all')
  const mobileMenuRef = useRef(null)

  const { colors } = theme

  const handleWidth = () => {
    window.innerWidth <= 900 ? setIsMobile(true) : setIsMobile(false)
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', handleWidth)
    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, [])

  useEffect(() => {
    const _tokens = store.getStore('tokens')
    setTokens(_tokens)

    const _account = store.getStore('account')
    setAccount(_account)

    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)

    return () => {
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
    }
  }, [])

  const handleToggleMenu = () => {
    setOpen(!open)
  }

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => {
    setAccount(null)
  }

  const handleClickWalletAddress = () => {
    setIsModalOpened(true)
  }

  const handleCloseModal = () => {
    setIsModalOpened(false)
  }

  const handleClickLogo = (e) => {
    e.preventDefault()
    history.push(`/`)
  }

  const handleClickAddMetamaskToken = async (options) => {
    if (!window.ethereum || !options) {
      return
    }
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options,
        },
      })
    } catch (error) {
      console.log('=(')
    }
  }

  return (
    <>
      <LogoContent
        withoutAccount={!account || !account.address}
        onClick={handleClickLogo}
      >
        <LogoIcon width="24" height="30" color={colors.secondary} />
        <span>ARMOR</span>
      </LogoContent>
      <Container>
        {!isMobile && location.pathname !== '/' && <TooltipGuideToggle />}
        <LangSwitcher langs={langs} lang={lang} setLang={setLang} />
        <WalletWrapper withoutAccount={!account || !account.address}>
          {(!account || !account.address) && (
            <WalletInfo>
              By using Armor, you agree to the{' '}
              <a
                href="https://armorfi.gitbook.io/armor/disclaimer"
                target="_blank"
                rel="noreferrer"
              >
                Terms and Documentation
              </a>
            </WalletInfo>
          )}
          <WalletAddress
            withoutAccount={!account || !account.address}
            onClick={handleClickWalletAddress}
          >
            {!account ? null : <ConnectedDot />}
            {account && networkNameMapper(network) && (
              <NetworkIndicator>{networkNameMapper(network)}</NetworkIndicator>
            )}
            {account && account.address ? (
              <>{uglifyAddress(account.address, 5, 4)}</>
            ) : (
              t('Header.ConnectWallet')
            )}
          </WalletAddress>
          {!isMobile && account && tokens && (
            <TokensWrapper>
              <Tooltip
                enterTouchDelay={50}
                placement="top"
                arrow
                title={t('Rewards.Tooltip.AddArmorToken')}
              >
                <TokenButton
                  variant="contained"
                  onClick={() => handleClickAddMetamaskToken(tokens.armor)}
                >
                  <img src={armorLogo} alt="armor token" />
                  {/* <RightArrowIcon color={colors.primaryLightTrue} /> */}
                  <img src={metamaskLogo} alt="metamask token" />
                </TokenButton>
              </Tooltip>
              <Tooltip
                enterTouchDelay={50}
                placement="top"
                arrow
                title={t('Rewards.Tooltip.AddArnxmToken')}
              >
                <TokenButton
                  variant="contained"
                  onClick={() => handleClickAddMetamaskToken(tokens.arnxm)}
                >
                  <img src={arnxmLogo} alt="armor token" />
                  {/* <RightArrowIcon color={colors.primaryLightTrue} /> */}
                  <img src={metamaskLogo} alt="metamask token" />
                </TokenButton>
              </Tooltip>
            </TokensWrapper>
          )}
        </WalletWrapper>
        {isMobile && (
          <Locky noDefault events={{ scroll: true }} enabled={open}>
            <BurgerBox open={open} onClick={handleToggleMenu}>
              <Burger
                open={open}
                className={`${open && 'burgerOpened'} homeBurger
                `}
              >
                <BurgerLine open={open} />
                <BurgerLine open={open} />
                <BurgerLine open={open} />
              </Burger>
            </BurgerBox>
            {open && <SlideOverlay onClick={handleToggleMenu} />}
            <Slide
              deviceheight={deviceHeight}
              direction="left"
              in={open}
              mountOnEnter
              unmountOnExit
            >
              <Paper elevation={4} ref={mobileMenuRef}>
                <Sidebar
                  isOpen={open}
                  deviceHeight={deviceHeight}
                  isMobile={isMobile}
                  toggleMobileMenu={handleToggleMenu}
                />
              </Paper>
            </Slide>
          </Locky>
        )}
      </Container>

      <UnlockModal closeModal={handleCloseModal} modalOpen={isModalOpened} />
    </>
  )
}

export default withTranslation()(withRouter(withTheme(Setup)))
