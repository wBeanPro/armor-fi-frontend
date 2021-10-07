import React from 'react'
import { Container, Content, Bold } from './styled'

const CornerBoxWalletInfo = ({ text, value, center = false }) => (
  <Container center={center}>
    <Content>
      {text} <Bold>{value ? value : '0'}</Bold>
    </Content>
  </Container>
)

export default CornerBoxWalletInfo
