import React, { useState } from 'react'
import { withTheme } from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import TooltipGuide from '../tooltipGuide/TooltipGuide'
import { ButtonStyled, TooltipSpan } from './styled'

const Button = ({
  theme,

  // data
  content = null,
  tooltipContent = '',
  guideTooltipContent = null,

  // modifiers
  fullWidth = false,
  size = 'sm', // sm | lg
  variant = 'contained', // contained | outlined | token
  disabled,

  // handlers
  onClick,
}) => {
  const { colors } = theme

  const variantColorsObj = {
    contained: colors.secondary,
    outlined: colors.active,
    token: colors.primaryLightTrue,
  }

  const handleClick = () => {
    if (onClick && typeof onClick === 'function' && !disabled) {
      onClick()
    }
  }

  return (
    <Tooltip
      title={tooltipContent}
      placement="top"
      arrow
      disableFocusListener={!tooltipContent}
      disableHoverListener={!tooltipContent}
      disableTouchListener={!tooltipContent}
    >
      <ButtonStyled
        fullWidth={fullWidth}
        buttonsize={size}
        buttonvariant={variant}
        isdisabled={disabled ? 1 : 0}
        onClick={handleClick}
      >
        {content}
        {guideTooltipContent && (
          <TooltipGuide
            text={guideTooltipContent}
            color={variantColorsObj[variant]}
          />
        )}
      </ButtonStyled>
    </Tooltip>
  )
}

export default withTheme(Button)
