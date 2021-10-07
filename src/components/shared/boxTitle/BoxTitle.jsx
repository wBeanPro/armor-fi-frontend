import React from 'react'
import { withTheme } from 'styled-components'
import TooltipGuide from '../tooltipGuide/TooltipGuide'
import { Title } from './styled'

const BoxTitle = ({ theme, text, guideTooltipContent }) => {
  const { colors } = theme

  return (
    <Title>
      {text}
      {guideTooltipContent && (
        <TooltipGuide text={guideTooltipContent} color={colors.disabledText} />
      )}
    </Title>
  )
}

export default withTheme(BoxTitle)
