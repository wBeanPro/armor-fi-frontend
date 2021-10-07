import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { withRouter } from 'react-router-dom'
import TwitterIcon from '../icons/TwitterIcon'
import MediumIcon from '../icons/MediumIcon'
import DiscordIcon from '../icons/DiscordIcon'
import TelegramIcon from '../icons/TelegramIcon'
import GithubIcon from '../icons/GithubIcon'
import { SocialItem, Socials } from './styled'

const SocialItems = ({ theme: { colors }, location }) => {
  const [isLoading, setIsLoading] = useState(true)

  const FOOTER_SOCIALS = [
    { icon: TwitterIcon, navTo: 'https://twitter.com/armorfi' },
    { icon: MediumIcon, navTo: 'https://medium.com/armorfi' },
    { icon: DiscordIcon, navTo: 'https://discord.gg/8HuTB22' },
    { icon: TelegramIcon, navTo: 'https://t.me/ArmorFi' },
    { icon: GithubIcon, navTo: 'https://github.com/ArmorFi' },
  ]

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const isHomePage = location.pathname === '/'

  const handleClickSocialItem = ({ navTo }) => {
    if (navTo) window.open(navTo, '_blank')
  }

  return isLoading ? null : (
    <Socials>
      {FOOTER_SOCIALS.map((item, i) => (
        <SocialItem key={i} onClick={() => handleClickSocialItem(item)}>
          <item.icon
            color={isHomePage ? colors._default : colors.disabledText}
          />
        </SocialItem>
      ))}
    </Socials>
  )
}

export default withTranslation()(withTheme(withRouter(SocialItems)))
