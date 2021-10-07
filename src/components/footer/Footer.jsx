import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import MenuItems from './MenuItems'
import SocialItems from './SocialItems'
import { Container, Copyright, Root, SocialContainer } from './styled'
import { copyrightYears } from '../../helpers'

const Footer = ({ location }) => {
  return (
    <Root>
      <Container>
        <MenuItems />
        <SocialContainer>
          <Copyright>© {copyrightYears()} armor.fi</Copyright>
          <SocialItems />
        </SocialContainer>
      </Container>
    </Root>
  )
}

export default withTranslation()(withRouter(Footer))
