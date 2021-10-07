import React from 'react'
import { Item } from './styled'

const FooterMenuItem = ({ text, onClick }) => (
  <Item onClick={onClick}>{text}</Item>
)

export default FooterMenuItem
