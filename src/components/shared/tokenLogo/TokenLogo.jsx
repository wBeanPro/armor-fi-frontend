import React from 'react'
import { checkOnImageExist } from '../../../helpers'
import { Icon } from './styled'

const TokenLogo = ({ logo }) => (
  <Icon>
    <img alt={`${logo} log`} src={checkOnImageExist(logo, 'eth.png')} />
  </Icon>
)

export default TokenLogo
