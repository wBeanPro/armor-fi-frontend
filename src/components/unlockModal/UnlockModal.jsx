import React, { useEffect, useState, useRef } from 'react'
import Unlock from './Unlock'
import Paper from '@material-ui/core/Paper'
import { withTheme } from 'styled-components'
import CloseIcon from '../icons/CloseIcon'
import Locky from 'react-locky'
import { SlideOverlay, Slide, CloseButton } from './styled'

const UnlockModal = ({ closeModal, modalOpen, loggedIn, theme }) => {
  const mobileMenuRef = useRef(null)
  const [deviceHeight, setDeviceHeight] = useState(null)

  const handleResize = () => {
    setDeviceHeight(window.innerHeight)
  }

  const { colors } = theme

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Locky noDefault events={{ scroll: true }} enabled={modalOpen}>
      {modalOpen && <SlideOverlay onClick={closeModal} />}
      <Slide
        deviceheight={deviceHeight}
        direction="left"
        in={modalOpen}
        mountOnEnter
        unmountOnExit
      >
        <Paper elevation={4} ref={mobileMenuRef}>
          <CloseButton color="primary" onClick={closeModal}>
            <CloseIcon color={colors.secondary} />
          </CloseButton>
          <Unlock
            deviceHeight={deviceHeight}
            closeModal={closeModal}
            loggedIn={loggedIn}
          />
        </Paper>
      </Slide>
    </Locky>
  )
}

export default withTheme(UnlockModal)
