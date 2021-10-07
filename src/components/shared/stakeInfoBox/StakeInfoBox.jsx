import React from 'react'
import { Container, Title, Value } from './styled'

const StakeInfoBox = ({ title, value }) => (
  <Container>
    <Title>
      {title}
      <Value>{value}</Value>
    </Title>
  </Container>
)

export default StakeInfoBox
