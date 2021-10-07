import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import RewardsIcon from '../icons/RewardsIcon'
import StakeIcon from '../icons/StakeIcon'
import MintIcon from '../icons/MintIcon'
import MarketIcon from '../icons/MarketIcon'
import ProtectIcon from '../icons/ProtectIcon'
import LogoIcon from '../icons/LogoIcon'
import CoverIcon from '../icons/CoverIcon'
import {
  Links,
  DropBox,
  DropLink,
  MenuItem,
  DownArrow,
  DropContent,
  Divider,
  DropItem,
  Link,
  TabsTopBorder,
  TabsBottomBorder,
  ContentBlock,
} from './styled'

const Menu = ({
  t,
  theme: { colors },
  history,
  location,
  isDemo,
  setCurrentPage,
}) => {
  const MENU_LIST = [
    {
      type: 'link',
      link: 'protect',
      text: t('Header.Menu.BuyCover'),
      icon: CoverIcon,
    },
    {
      type: 'dropdown',
      text: t('Header.Menu.SellCover'),
      icon: ProtectIcon,
      items: [
        {
          link: 'mint',
          text: t('Header.Menu.Mint'),
          icon: MintIcon,
        },
        {
          link: 'stake',
          text: t('Header.Menu.Stake'),
          icon: StakeIcon,
        },
        // {
        //   link: 'market',
        //   text: t('Header.Menu.Market'),
        //   icon: MarketIcon,
        // },
        {
          link: 'dashboard',
          text: t('Header.Menu.Dashboard'),
          icon: ProtectIcon,
        },
      ],
    },
    {
      type: 'link',
      link: 'rewards',
      text: t('Header.Menu.Rewards'),
      icon: RewardsIcon,
    },
    {
      type: 'dropdown',
      text: t('Header.Menu.TokenHolders'),
      items: [
        { text: t('Header.Menu.wNxmVault'), link: 'wnxm-vault' },
        { text: t('Header.Menu.arNxmVault'), link: 'arnxm-vault' },
        { text: t('Header.Menu.StakingLots'), link: 'staking-lots' },
        { text: t('Header.Menu.Ibco'), link: 'ibco' },
        { text: t('Header.Menu.DefenseRewards'), blurred: true },
        { text: t('Header.Menu.BurstRewards'), blurred: true },
        { text: t('Header.Menu.ReferralProgram'), blurred: true },
        { text: t('Header.Menu.BondingCurve'), blurred: true },
        { text: t('Header.Menu.TokenAnalytics'), blurred: true },
      ],
    },
  ]

  const getInitialIndex = useCallback(() => {
    let index = null
    for (let i = 0; i < MENU_LIST.length; i += 1) {
      if (location.pathname.includes(MENU_LIST[i].link)) {
        index = i
      }
    }
    return index
  }, [location, MENU_LIST])

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex())

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    setCurrentPage(location.pathname)
  })

  useEffect(() => {
    setCurrentIndex(getInitialIndex())
  }, [getInitialIndex, location])

  const nav = (screen) => history.push(`/${screen ? screen : ''}`)

  return (
    <Links>
      {MENU_LIST.map(({ type, items, link, text, icon: Icon }, i) => {
        if (link === 'rewards' && isDemo) return null // TODO: disable Rewards menu item for Demo pages
        if (type === 'dropdown') {
          return (
            <DropBox key={i + +new Date()}>
              <DropLink>
                {Icon && (
                  <Icon
                    color={
                      isHomePage
                        ? colors.lightActive
                        : currentIndex === i
                        ? colors.active
                        : colors.strongDefault
                    }
                  />
                )}
                <MenuItem home={isHomePage} active={currentIndex === i}>
                  {text}
                </MenuItem>
                <DownArrow home={isHomePage} />
              </DropLink>

              <DropContent home={isHomePage}>
                <Divider home={isHomePage} />
                {items.map((item, ind) => (
                  <DropItem
                    key={ind + item.text}
                    home={isHomePage}
                    onClick={
                      item.link
                        ? () => nav(isDemo ? `demo/${item.link}` : item.link)
                        : null
                    }
                  >
                    {item.icon && (
                      <item.icon
                        color={
                          isHomePage
                            ? colors.lightActive
                            : currentIndex === i
                            ? colors.active
                            : colors.strongDefault
                        }
                      />
                    )}
                    <MenuItem
                      home={isHomePage}
                      active={currentIndex === i}
                      homeBlured={item.blurred && isHomePage}
                      blured={item.blurred && !isHomePage}
                    >
                      {item.text}
                    </MenuItem>
                  </DropItem>
                ))}
              </DropContent>
            </DropBox>
          )
        } else {
          return (
            <Link
              active={currentIndex === i}
              key={i + +new Date()}
              onClick={() => {
                setCurrentIndex(i)
                nav(isDemo ? `demo/${link}` : link)
              }}
            >
              {currentIndex === i && (
                <>
                  <TabsTopBorder />
                  <TabsBottomBorder />
                </>
              )}
              <ContentBlock>
                <Icon
                  color={
                    isHomePage
                      ? colors.lightActive
                      : currentIndex === i
                      ? colors.active
                      : colors.strongDefault
                  }
                />
                <MenuItem home={isHomePage} active={currentIndex === i}>
                  {text}
                </MenuItem>
              </ContentBlock>
            </Link>
          )
        }
      })}
    </Links>
  )
}

export default withTranslation()(withTheme(withRouter(Menu)))
