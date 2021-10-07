import React from 'react'
import { Container, Content, Bold } from './styled'

const AvailableWalletInfo = ({ text, value, center = true }) => (
  <Container center={center}>
    <Content>
      {text} <Bold>{value ? value : '0'}</Bold>
    </Content>
  </Container>
)

export default AvailableWalletInfo
