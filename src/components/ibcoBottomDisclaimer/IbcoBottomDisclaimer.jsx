import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import WarningIcon from '../icons/WarningIcon'
import { withTranslation } from 'react-i18next'
import { Container, Content } from './styled'

const IbcoBottomDisclaimer = ({ theme, t }) => {
  const { colors } = theme
  return (
    <Container>
      <WarningIcon color={colors.secondary} />
      <Content>
        <span>{t('Ibco.Disclaimer.Title')}: </span>
        {t('Ibco.Disclaimer.Text')}
      </Content>
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(IbcoBottomDisclaimer)))
