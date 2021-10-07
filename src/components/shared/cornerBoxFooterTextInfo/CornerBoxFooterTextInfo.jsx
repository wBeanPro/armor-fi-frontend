import React from 'react'
import { withTheme } from 'styled-components'
import AboutCircleIcon from '../../icons/AboutCircleIcon'
import { FooterInfo, FooterInfoText } from './styled'

const CornerBoxFooterTextInfo = ({ theme, text }) => {
  const { colors } = theme

  return (
    <FooterInfo>
      <AboutCircleIcon color={colors.disabledText} />
      <FooterInfoText>{text}</FooterInfoText>
    </FooterInfo>
  )
}

export default withTheme(CornerBoxFooterTextInfo)
