import React from 'react'
import TooltipGuide from '../tooltipGuide/TooltipGuide'
import AboutInfoIcon from '../../icons/AboutInfoIcon'
import { withTheme } from 'styled-components'
import { StyledButton, ButtonText, TooltipSpan } from './styled'

const Button = ({
  theme,
  buttonText,
  tooltipText,
  isDisabled = false,
  onClick,
  bordered,
  margin,
}) => {
  const { colors } = theme
  return (
    <StyledButton
      variant="contained"
      color="primary"
      isdisabled={isDisabled ? 1 : 0}
      onClick={isDisabled ? null : onClick}
      bordered={bordered ? 1 : 0}
      margin={margin}
    >
      <ButtonText bordered={bordered}>{buttonText}</ButtonText>
      {tooltipText && (
        <TooltipGuide text={tooltipText}>
          <TooltipSpan>
            <AboutInfoIcon
              color={
                isDisabled
                  ? colors.secondary
                  : bordered
                  ? colors.buttonActiveBg
                  : colors.secondary
              }
            />
          </TooltipSpan>
        </TooltipGuide>
      )}
    </StyledButton>
  )
}

export default withTheme(Button)
