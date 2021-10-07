import React, { useState, useEffect, useCallback, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import Paper from '@material-ui/core/Paper'
import RewardsIcon from '../icons/RewardsIcon'
import StakeIcon from '../icons/StakeIcon'
import MintIcon from '../icons/MintIcon'
import MarketIcon from '../icons/MarketIcon'
import ProtectIcon from '../icons/ProtectIcon'
import CoverIcon from '../icons/CoverIcon'
import {
  BurgerBox,
  Burger,
  BurgerLine,
  SlideOverlay,
  Slide,
  Divider,
  Label,
  Link,
  MenuItem,
} from './mobileMenuStyled'

const MobileMenu = ({ theme, history, location, isDemo, t }) => {
  const menuList = [
    {
      type: 'link',
      text: t('Header.Menu.BuyCover'),
      icon: CoverIcon,
      link: 'protect',
    },
    {
      type: 'link',
      text: t('Header.Menu.Rewards'),
      icon: RewardsIcon,
      link: 'rewards',
    },
    {
      type: 'divider',
    },
    {
      type: 'label',
      text: t('Header.Menu.SellCover'),
    },
    {
      type: 'link',
      text: t('Header.Menu.Mint'),
      icon: MintIcon,
      link: 'mint',
    },
    {
      type: 'link',
      text: t('Header.Menu.Stake'),
      icon: StakeIcon,
      link: 'stake',
    },
    // {
    //   type: 'link',
    //   text: t('Header.Menu.Market'),
    //   icon: MarketIcon,
    //   link: 'market',
    // },
    {
      type: 'link',
      text: t('Header.Menu.Dashboard'),
      icon: ProtectIcon,
      link: 'dashboard',
    },
    {
      type: 'divider',
    },
    {
      type: 'link',
      link: 'wnxm-vault',
      text: t('Header.Menu.wNxmVault'),
    },
    {
      type: 'link',
      link: 'arnxm-vault',
      text: t('Header.Menu.arNxmVault'),
    },
    {
      type: 'link',
      link: 'staking-lots',
      text: t('Header.Menu.StakingLots'),
    },
    {
      type: 'link',
      link: 'ibco',
      text: t('Header.Menu.Ibco'),
    },
    {
      type: 'disabled',
      text: t('Header.Menu.DefenseRewards'),
    },
    {
      type: 'disabled',
      text: t('Header.Menu.BurstRewards'),
    },
    {
      type: 'disabled',
      text: t('Header.Menu.ReferralProgram'),
    },
    {
      type: 'disabled',
      text: t('Header.Menu.BondingCurve'),
    },
    {
      type: 'disabled',
      text: t('Header.Menu.TokenAnalytics'),
    },
  ]

  const getInitialIndex = useCallback(() => {
    let index = null
    for (let i = 0; i < menuList.length; i += 1) {
      if (location.pathname.includes(menuList[i].link)) index = i
    }
    return index
  }, [location])

  const { colors } = theme
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(getInitialIndex())
  const mobileMenuRef = useRef(null)

  const homePage = location.pathname === '/'

  useEffect(() => {
    setCurrentIndex(getInitialIndex())
  }, [getInitialIndex, location])

  const handleToggleMobileMenu = () => {
    if (open) {
      // enableBodyScroll(mobileMenuRef)
      clearAllBodyScrollLocks()
    } else {
      disableBodyScroll(mobileMenuRef)
    }
    setOpen(!open)
  }

  return (
    <>
      <BurgerBox home={homePage} open={open} onClick={handleToggleMobileMenu}>
        <Burger
          open={open}
          className={`${open && 'burgerOpened'} ${homePage && 'homeBurger'}`}
        >
          <BurgerLine home={homePage} open={open} />
          <BurgerLine home={homePage} open={open} />
          <BurgerLine home={homePage} open={open} />
        </Burger>
      </BurgerBox>
      {open && <SlideOverlay onClick={handleToggleMobileMenu} />}
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Paper elevation={4} ref={mobileMenuRef}>
          {menuList.map(
            ({ type, link, text, icon: Icon, isExternal, blurred }, i) => {
              if (link === 'rewards' && isDemo) {
                // TODO: disable Rewards menu item for Demo pages
                return null
              }
              if (type === 'divider') {
                return <Divider key={i + +new Date()} />
              }
              if (type === 'label') {
                return <Label key={i + +new Date()}>{text}</Label>
              }
              if (['link', 'disabled'].includes(type)) {
                return (
                  <Link
                    key={i + +new Date()}
                    onClick={
                      type === 'disabled'
                        ? null
                        : () => {
                            if (isExternal) {
                              window.open(link, '_blank')
                            } else {
                              setCurrentIndex(i)
                              history.push(`/${link}`)
                            }
                            handleToggleMobileMenu()
                          }
                    }
                  >
                    {Icon && (
                      <Icon
                        color={
                          currentIndex === i
                            ? colors.active
                            : colors.strongDefault
                        }
                      />
                    )}
                    <MenuItem
                      blurred={type === 'disabled'}
                      active={currentIndex === i}
                    >
                      {text}
                    </MenuItem>
                  </Link>
                )
              }
              return null
            }
          )}
        </Paper>
      </Slide>
    </>
  )
}

export default withTranslation()(withRouter(withTheme(MobileMenu)))
