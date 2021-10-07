import React from 'react'
import Modal from '../modal/Modal'
import Button from '../button/Button'
import { Content, ButtonWrapper } from './styled'

const DialogModal = ({ closeModal, isModalOpened, content }) => (
  <Modal isModalOpened={isModalOpened} closeModal={closeModal}>
    <Content>{content}</Content>
    <ButtonWrapper>
      <Button content="Decline" onClick={closeModal} variant="outlined" />
    </ButtonWrapper>
  </Modal>
)

export default DialogModal
