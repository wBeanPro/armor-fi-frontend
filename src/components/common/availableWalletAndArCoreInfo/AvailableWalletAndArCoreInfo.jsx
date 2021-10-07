import React from 'react'
import { Container, Content, Bold } from './styled'

const AvailableWalletAndArCoreInfo = ({
  ethBalanceText,
  ethBalanceValue,
  arCoreText,
  arCoreValue,
  center = true,
}) => (
  <Container center={center}>
    <Content>
      {ethBalanceText}{' '}
      <Bold>{ethBalanceValue ? ethBalanceValue : '0'} ETH</Bold>
    </Content>
    <Content>
      {arCoreText} <Bold>{arCoreValue ? arCoreValue : '0'} ETH</Bold>
    </Content>
  </Container>
)

export default AvailableWalletAndArCoreInfo
