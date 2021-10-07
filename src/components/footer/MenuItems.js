import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { MenuItem, Menu } from './styled'

const MenuItems = ({ t, location, history }) => {
  const [isLoading, setIsLoading] = useState(true)

  const FOOTER_MENU_ITEMS = [
    {
      name: t('Footer.Menu.Features'),
      isExternal: true,
      navTo: 'https://features.armor.fi/features',
    },
    {
      name: t('Footer.Menu.Forum'),
      isExternal: true,
      navTo: 'https://gov.armor.fi/',
    },
    {
      name: t('Footer.Menu.Govern'),
      isExternal: true,
      navTo: 'https://snapshot.page/#/armorgov.eth',
    },
    {
      name: t('Footer.Menu.About'),
      isExternal: true,
      navTo: 'https://armorfi.gitbook.io/armor/',
    },
    {
      name: t('Footer.Menu.BugBounty'),
      isExternal: true,
      navTo: 'https://immunefi.com/bounty/armorfi/',
    },
    // {
    //   name: t('Footer.Menu.Changelog'),
    //   isExternal: true,
    //   navTo: 'https://armorfi.gitbook.io/armor/',
    // },
    // {
    //   name: t('Footer.Menu.Gitbook'),
    //   isExternal: true,
    //   navTo: 'https://armorfi.gitbook.io/armor/',
    // },
  ]

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const isHomePage = location.pathname === '/'

  const handleClickMenuItem = ({ isExternal, navTo }) => {
    if (!navTo) return
    if (isExternal) {
      window.open(navTo, '_blank')
    } else {
      history.push(navTo)
      setTimeout(() => window.scroll(0, 0), 0)
    }
  }
  return isLoading ? null : (
    <Menu>
      {FOOTER_MENU_ITEMS.map((item, i) => (
        <MenuItem
          key={i}
          isHomePage={isHomePage}
          onClick={() => handleClickMenuItem(item)}
        >
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default withTranslation()(withRouter(MenuItems))
