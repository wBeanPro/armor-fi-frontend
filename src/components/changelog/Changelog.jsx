import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { Root } from './styled'
import { Title } from '../common/Title'
import DialogModal from '../common/dialogModal/DialogModal'

const Changelog = ({ classes, t }) => {
  const [isModalOpened, setIsModalOpened] = useState(true)

  const closeModal = () => setIsModalOpened(false)

  return (
    <Root>
      <Title>{t('Changelog.Title')}</Title>
      <DialogModal
        closeModal={closeModal}
        isModalOpened={isModalOpened}
        content="You are currently connected to XXX, please switch to Ethereum Mainnet in your wallet"
      />
    </Root>
  )
}

export default withTranslation()(withRouter(Changelog))
