import React from 'react'
import { withTheme } from 'styled-components'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '../../icons/CloseIcon'
import { Overlay, ModalFront, CloseButton, Wrapper } from './styled'

const Modal = ({
  theme,
  children,
  closeModal,
  isModalOpened = false,
  width = '460',
}) => {
  const { colors } = theme

  return (
    <>
      {isModalOpened && (
        <Wrapper>
          <Overlay onClick={closeModal} />
          <Slide direction="up" in={isModalOpened}>
            <ModalFront width={width}>
              {closeModal && (
                <CloseButton color="primary" onClick={closeModal}>
                  <CloseIcon color={colors.primaryDefault} />
                </CloseButton>
              )}
              {children}
            </ModalFront>
          </Slide>
        </Wrapper>
      )}
    </>
  )
}

export default withTheme(Modal)
