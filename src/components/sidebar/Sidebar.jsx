import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { useResizeDetector } from 'react-resize-detector'
import GasPriceBar from '../gasPriceBar/GasPriceBar'
import armorLogo from '../../assets/armor.png'
import arnxmLogo from '../../assets/arnxm.png'
import metamaskLogo from '../../assets/metamask-right.png'
import Tooltip from '@material-ui/core/Tooltip'
import Store from '../../stores/store'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
} from '../../constants'
import useCurrentPage from '../../hooks/useCurrentPage'
import TooltipGuideToggle from '../common/tooltipGuideToggle/TooltipGuideToggle'

import {
  Container,
  ExpandIcon,
  Accordion,
  AccordionSummary,
  Link,
  AccordionItem,
  AccordionDetails,
  Wrapper,
  TokensWrapper,
  TokenButton,
  BottomWrapper,
} from './styled'

const store = Store.store
const emitter = Store.emitter

const Sidebar = ({
  t,
  isMobile,
  location,
  history,
  toggleMobileMenu,
  deviceHeight,
  isOpen = true,
}) => {
  const [isBottom, setIsBottom] = useState(false)
  const [account, setAccount] = useState(null)
  const { height, ref } = useResizeDetector()
  const [isLoading, setIsLoading] = useState(true)
  const [tokens, setTokens] = useState('all')
  const [currentPage] = useCurrentPage()
  const checkBodyScroll = () => {
    setIsBottom(
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 40
    )
  }

  useEffect(() => {
    checkBodyScroll()
    window.onscroll = () => {
      setIsBottom(
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 40
      )
    }
  }, [])

  useEffect(() => {
    checkBodyScroll()
  }, [height])

  useEffect(() => {
    const _tokens = store.getStore('tokens')
    setTokens(_tokens)

    const _account = store.getStore('account')
    setAccount(_account)

    if (_account && _account.address) {
      setIsLoading(false)
    }

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)

    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
    }
  }, [account])

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
    setIsLoading(false)
  }

  const handleClickMenuItem = (e, url) => {
    e.preventDefault()
    if (url) history.push(url)
    if (toggleMobileMenu) toggleMobileMenu()
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

  const menuList = [
    {
      text: `${t('Header.Menu.Protect')}`,
      url: '/protect',
    },
    {
      text: `${t('Header.Menu.Mint')} arNFT`,
      url: '/mint',
    },
    {
      text: `${t('Header.Menu.Stake')} arNFT`,
      url: '/stake',
    },
    {
      text: `arNFT ${t('Header.Menu.Stats')}`,
      url: '/stats',
    },
    {
      text: `arNXM ${t('Header.Menu.Vault')}`,
      url: '/arnxm-vault',
    },
    {
      text: t('Header.Menu.StakingRewards'),
      url: '/rewards',
    },
    {
      text: t('Header.Menu.ShieldVaults'),
      url: '/arshield',
    },
    // {
    //   text: t('Header.Menu.ShieldRewards'),
    //   url: '/arshield-rewards',
    // },
    {
      text: t('Header.Menu.Referrals'),
      url: '/referrals',
    },
  ]

  return (
    <>
      <Container ref={ref} isMobile={isMobile}>
        <Wrapper
          isWalletConnected={account && tokens}
          deviceHeight={deviceHeight}
          isBottom={isBottom}
        >
          {menuList.map(({ text, type, list, url }, index) => (
            <React.Fragment key={index}>
              {type === 'dropdown' ? (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    {text}
                  </AccordionSummary>
                  <AccordionDetails>
                    {list.map(({ item, url }, i) => (
                      <AccordionItem
                        key={i}
                        onClick={(e) => handleClickMenuItem(e, url)}
                      >
                        {item}
                      </AccordionItem>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ) : (
                <Link
                  isBlurred={type === 'blurred'}
                  isCurrentPage={
                    url.toLowerCase() === currentPage.toLowerCase()
                  }
                  onClick={(e) => handleClickMenuItem(e, url)}
                >
                  {text}
                </Link>
              )}
            </React.Fragment>
          ))}
        </Wrapper>
      </Container>
      {isOpen && (
        <BottomWrapper isBottom={isBottom}>
          {isMobile && location.pathname !== '/' && <TooltipGuideToggle />}
          {isMobile && account && tokens && (
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
                  <img src={metamaskLogo} alt="metamask token" />
                </TokenButton>
              </Tooltip>
            </TokensWrapper>
          )}
          <GasPriceBar isMobile={isMobile} />
        </BottomWrapper>
      )}
    </>
  )
}

export default withTranslation()(withRouter(withTheme(Sidebar)))
