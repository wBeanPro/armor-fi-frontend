import React from 'react'
import { withTheme } from 'styled-components'
import TooltipGuide from '../tooltipGuide/TooltipGuide'
import { Title, WrapTitle } from './styled'

const TableTitle = ({ theme, text, align = 'left', guideTooltipContent }) => {
  const { colors } = theme
  return (
    <Title align={align}>
      <WrapTitle>
        {text}
        {guideTooltipContent && (
          <TooltipGuide
            text={guideTooltipContent}
            color={colors.disabledText}
          />
        )}
      </WrapTitle>
    </Title>
  )
}

export default withTheme(TableTitle)
