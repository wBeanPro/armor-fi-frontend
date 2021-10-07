import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import UnlockModal from '../unlockModal/UnlockModal'
import { Container, Button } from './styled'

const Intro = ({ theme, history, t }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)

  const openModalHandler = () => {
    setIsLoading(true)
    setIsModalOpened(true)
  }

  const closeModalHandler = () => {
    setIsModalOpened(false)
    setIsLoading(false)
  }

  return (
    <Container>
      <Button
        variant="outlined"
        color="primary"
        onClick={openModalHandler}
        disabled={isLoading}
      >
        <Typography>{t('Intro.ConnectWallet')}</Typography>
      </Button>
      <UnlockModal closeModal={closeModalHandler} modalOpen={isModalOpened} />
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Intro)))
