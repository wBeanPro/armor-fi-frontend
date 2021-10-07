import React from 'react'
import { TextStyled } from './styled'

const Text = ({
  text,
  title,
  color,
  isBold = false,
  size = 'md', // sm = 12px, md = 14px, lg = 16px
}) => (
  <TextStyled title={title} color={color} bold={isBold} size={size}>
    {text}
  </TextStyled>
)

export default Text
