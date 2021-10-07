import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import { Container, Cell, Logo, NameContainer } from './styled'

const tradingList = [
  {
    name: 'Uniswap V2',
    logo: 'uniswapv2.png',
    lpUrl:
      'https://info.uniswap.org/pair/0x7ca51456b20697a0e5be65e5aeb65dfe90f21150',
  },
  {
    name: 'SushiSwap',
    logo: 'sushiswap.jpg',
    lpUrl:
      'https://app.sushiswap.fi/pair/0x43632e3448cd47440fee797258081414d91a58ce',
  },
  {
    name: '1Inch (DEX & Liquidity Pools)',
    logo: '1inch.png',
    lpUrl:
      'https://1inch.exchange/#/dao/pools?token0=0x1337def18c680af1f9f45cbcab6309562975b1dd&token1=0x0000000000000000000000000000000000000000',
  },
  {
    name: 'Balancer',
    logo: 'balancer.svg',
    lpUrl:
      'https://pools.balancer.exchange/#/pool/0xdb942c0851774bd817e6f4813f1fa64cce6fe25f/',
  },
]

const ArNxmTrade = () => {
  return (
    <Container>
      {tradingList.map(({ name, logo, lpUrl }, index) => (
        <Cell
          title={name}
          key={index}
          onClick={() => window.open(lpUrl, '_blank')}
        >
          <Logo src={require(`../../../../assets/${logo}`)} alt="icon" />
        </Cell>
      ))}
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(ArNxmTrade)))
