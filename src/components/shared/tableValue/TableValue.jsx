import React from 'react'
import { Cell } from './styled'

const TableValue = ({ text, align = 'left' }) => (
  <Cell align={align}>{text}</Cell>
)

export default TableValue
