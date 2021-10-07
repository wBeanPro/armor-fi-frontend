import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { Container } from './styled'
import { Title } from '../common/Title'

const StakingLots = ({ classes, t }) => {
  return (
    <Container>
      <Title>{t('StakingLots.Title')}</Title>
    </Container>
  )
}

export default withTranslation()(withRouter(StakingLots))
