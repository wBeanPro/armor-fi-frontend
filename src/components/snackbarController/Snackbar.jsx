import React, { useState, Component } from 'react'
import { withTranslation } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CloseIcon from '../icons/CloseIcon'
import SuccessIcon from '../icons/SuccessIcon'
import ErrorIcon from '../icons/ErrorIcon'
import WarningIcon from '../icons/WarningIcon'
import InfoIcon from '../icons/InfoIcon'
import { withTheme } from 'styled-components'
import {
  SnackbarBox,
  SnackbarContent,
  MessageContainer,
  MessageType,
  MessageContent,
} from './styled'

const Snackbar = ({ message, type, open, theme: { colors }, t }) => {
  const [isOpened, setIsOpened] = useState(open)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setIsOpened(false)
  }

  // DEFAULTS
  let icon = <SuccessIcon color={colors.snackbarBlue} />
  let color = colors.snackbarBlue
  let messageType = ''
  let actions = [
    <IconButton key="close" aria-label="Close" onClick={handleClose}>
      <CloseIcon />
    </IconButton>,
  ]

  switch (type) {
    case 'Error':
      icon = <ErrorIcon color={colors.snackbarRed} />
      color = colors.snackbarRed
      messageType = t('Snackbar.Type.Error')
      break
    case 'Success':
      icon = <SuccessIcon color={colors.snackbarBlue} />
      color = colors.snackbarBlue
      messageType = t('Snackbar.Type.Success')
      break
    case 'Warning':
      icon = <WarningIcon color={colors.snackbarOrange} />
      color = colors.snackbarOrange
      messageType = t('Snackbar.Type.Warning')
      break
    case 'Info':
      icon = <InfoIcon color={colors.snackbarBlue} />
      color = colors.snackbarBlue
      messageType = t('Snackbar.Type.Info')
      break
    case 'Hash':
      icon = <SuccessIcon color={colors.snackbarBlue} />
      color = colors.snackbarBlue
      messageType = t('Snackbar.Type.Hash')

      let snackbarMessage = 'https://etherscan.io/tx/' + message
      actions = [
        <Button
          key={`${snackbarMessage}-${+new Date()}`}
          variant="text"
          size="small"
          onClick={() => window.open(snackbarMessage, '_blank')}
        >
          {t('Snackbar.Action.View')}
        </Button>,
        <IconButton key="close" aria-label="Close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>,
      ]
      break
    default:
      icon = <SuccessIcon color={colors.snackbarBlue} />
      color = colors.snackbarBlue
      messageType = t('Snackbar.Type.Success')
      break
  }

  return (
    <SnackbarBox
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpened}
      // autoHideDuration={6000}
      onClose={handleClose}
      message={
        <SnackbarContent>
          {icon}
          <MessageContainer>
            <MessageType>{messageType}</MessageType>
            <MessageContent>{message}</MessageContent>
          </MessageContainer>
        </SnackbarContent>
      }
      action={actions}
    />
  )
}

export default withTranslation()(withTheme(Snackbar))
