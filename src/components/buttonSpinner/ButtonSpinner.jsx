import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import CircularProgress from '@material-ui/core/CircularProgress'
import { StyledButton, Text } from './styled'

const ButtonSpinner = ({
  t,
  theme,
  children,
  text = '',
  spin = true,
  onClick = null,
}) => {
  const { colors } = theme

  return (
    <>
      <StyledButton
        variant="contained"
        color="primary"
        width={text.length * 9}
        disabled={spin}
        onClick={spin ? null : onClick}
      >
        {spin ? (
          <CircularProgress size={25} color={colors.secondary} />
        ) : (
          <Text>{text}</Text>
        )}
      </StyledButton>
    </>
  )
}

export default withTranslation()(withRouter(withTheme(ButtonSpinner)))
