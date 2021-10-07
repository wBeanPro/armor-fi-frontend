import React from 'react'
import { Wrapper, WrapContainer } from './styled'

const Container = ({ children, noaccount, lg = false }) => {
  return (
    <Wrapper noaccount={noaccount}>
      <WrapContainer lg={lg} noaccount={noaccount}>
        {children}
      </WrapContainer>
    </Wrapper>
  )
}

export default Container
