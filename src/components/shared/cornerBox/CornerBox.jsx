import React from 'react'
import CornerBoxFooterTextInfo from '../cornerBoxFooterTextInfo/CornerBoxFooterTextInfo'
import { Container } from './styled'

const CornerBox = ({ children, footerInfoText, isBordered = false }) => (
  <Container border={isBordered}>
    {children}
    {footerInfoText && <CornerBoxFooterTextInfo text={footerInfoText} />}
  </Container>
)

export default CornerBox
