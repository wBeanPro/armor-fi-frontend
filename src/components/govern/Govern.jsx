import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { Root } from './styled'
import { Title } from '../common/Title'

const Govern = ({ classes, theme, t }) => {
  return (
    <Root>
      <Title>{t('Govern.Title')}</Title>
    </Root>
  )
}

export default withTranslation()(withRouter(Govern))
