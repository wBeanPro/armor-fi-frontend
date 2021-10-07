import React from 'react'
import { Logo, Title, TitleWrapper, TooltipSpan } from './styled'
import TooltipGuide from '../../../common/tooltipGuide/TooltipGuide'
import AboutInfoIcon from '../../../icons/AboutInfoIcon'

function ShieldGroupTitle({ theme, title, logo }) {
  const { colors } = theme

  return (
    <TitleWrapper>
      <Logo src={require(`../../../../assets/${logo}`)} alt={`${title} logo`} />
      <Title>{title}</Title>
      {/*<TooltipGuide text="Tooltip text">*/}
      {/*  <TooltipSpan>*/}
      {/*    <AboutInfoIcon color={colors.disabledText} />*/}
      {/*  </TooltipSpan>*/}
      {/*</TooltipGuide>*/}
    </TitleWrapper>
  )
}

export default ShieldGroupTitle
