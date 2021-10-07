import React from 'react'
import { withTheme } from 'styled-components'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '../../icons/CloseIcon'
import { Overlay, ModalFront, CloseButton, Wrapper } from './styled'

const StickyModal = ({
  theme,
  children,
  closeModal,
  isModalOpened,
  width = '460',
}) => {
  const { colors } = theme

  return (
    <>
      {isModalOpened && (
        <Wrapper>
          <Overlay />
          <Slide direction="up" in={isModalOpened}>
            <ModalFront width={width}>{children}</ModalFront>
          </Slide>
        </Wrapper>
      )}
    </>
  )
}

export default withTheme(StickyModal)
