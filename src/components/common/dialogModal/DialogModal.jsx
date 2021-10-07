import React from 'react'
import Modal from '../modal/Modal'
import Button from '../button/Button'
import { Content, ButtonWrapper } from './styled'

const DialogModal = ({ closeModal, isModalOpened, content }) => (
  <Modal isModalOpened={isModalOpened} closeModal={closeModal}>
    <Content>{content}</Content>
    <ButtonWrapper>
      <Button buttonText="Decline" onClick={closeModal} bordered={true} />
    </ButtonWrapper>
  </Modal>
)

export default DialogModal
