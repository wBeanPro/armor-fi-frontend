import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { Root } from './styled'
import { Title } from '../common/Title'

const Forum = ({ t }) => {
  return (
    <Root>
      <Title>{t('Forum.Title')}</Title>
    </Root>
  )
}

export default withTranslation()(withRouter(Forum))
