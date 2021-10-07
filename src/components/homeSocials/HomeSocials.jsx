import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { withRouter } from 'react-router-dom'
import TwitterIcon from '../icons/TwitterIcon'
import DiscordIcon from '../icons/DiscordIcon'
import TelegramIcon from '../icons/TelegramIcon'
import MediumIcon from '../icons/MediumIcon'
import { SocialItem, Socials } from './styled'

const HomeSocials = ({ theme: { colors }, location, account }) => {
  const [isLoading, setIsLoading] = useState(true)

  const FOOTER_SOCIALS = [
    { icon: TwitterIcon, navTo: 'https://twitter.com/armorfi' },
    { icon: MediumIcon, navTo: 'https://medium.com/armorfi' },
    { icon: TelegramIcon, navTo: 'https://t.me/ArmorFi' },
    { icon: DiscordIcon, navTo: 'https://discord.gg/8HuTB22' },
  ]

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const isHomePage = location.pathname === '/'

  const handleClickSocialItem = ({ navTo }) => {
    if (navTo) window.open(navTo, '_blank')
  }

  return isLoading ? null : (
    <Socials noaccount={!account}>
      {FOOTER_SOCIALS.map((item, i) => (
        <SocialItem key={i} onClick={() => handleClickSocialItem(item)}>
          <item.icon color={colors.defaultLightActive} />
        </SocialItem>
      ))}
    </Socials>
  )
}

export default withTranslation()(withTheme(withRouter(HomeSocials)))
