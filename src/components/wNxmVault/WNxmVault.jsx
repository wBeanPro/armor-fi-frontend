import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { Container } from './styled'
import { Title } from '../common/Title'

const WNxmVault = ({ t }) => {
  return (
    <Container>
      <Title>{t('WNxmVault.Title')}</Title>
    </Container>
  )
}

export default withTranslation()(withRouter(WNxmVault))
