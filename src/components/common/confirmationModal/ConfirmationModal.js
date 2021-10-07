import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import {
  ModalTitle,
  ActionContainer,
  ActionsWrapper,
  ActiveBtn,
  ActiveBtnText,
  ModalText,
} from './styled'
import StickyModal from '../modal/StickyModal'

const ConfirmationModal = ({
  theme,
  closeModal,
  handleConfirm,
  t,
  isModalOpened,
  actionText,
}) => {
  const onConfirm = async () => {
    await handleConfirm()
    closeModal()
  }

  const onCancel = async () => {
    closeModal()
  }

  return (
    <StickyModal closeModal={closeModal} isModalOpened={isModalOpened}>
      <ModalTitle bold>{t('Stake.UnstakeModal.Title')}</ModalTitle>
      <ActionContainer>
        <ModalText>{actionText}</ModalText>
        <ActionsWrapper>
          <ActiveBtn variant="contained" color="primary" onClick={onConfirm}>
            <ActiveBtnText>{t('Stake.UnstakeModal.Yes')}</ActiveBtnText>
          </ActiveBtn>
          <ActiveBtn variant="contained" color="primary" onClick={onCancel}>
            <ActiveBtnText>{t('Stake.UnstakeModal.No')}</ActiveBtnText>
          </ActiveBtn>
        </ActionsWrapper>
      </ActionContainer>
    </StickyModal>
  )
}

export default withTranslation()(withRouter(withTheme(ConfirmationModal)))
