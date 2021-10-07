import React from 'react'
import { Wrapper, Shadow } from './styled'

const VisibleContent = ({ children, height = '130' }) => (
  <Wrapper>
    {children}
    <Shadow height={height} />
  </Wrapper>
)
export default VisibleContent
