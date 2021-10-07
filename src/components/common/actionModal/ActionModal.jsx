import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import { ModalTitle, ActionContainer, ActionText, Spinner } from './styled'
import StickyModal from '../modal/StickyModal'

const ActionModal = ({ theme, closeModal, t, isModalOpened, actionText }) => {
  const { colors } = theme

  return (
    <StickyModal closeModal={closeModal} isModalOpened={isModalOpened}>
      <ModalTitle bold>Working...</ModalTitle>
      <ActionContainer>
        <Spinner fill={colors.active} />
        <ActionText>{actionText}</ActionText>
      </ActionContainer>
    </StickyModal>
  )
}

export default withTranslation()(withRouter(withTheme(ActionModal)))
