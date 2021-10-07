import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { HomeContainerStyled } from './styled'

const HomeContainer = ({ children }) => {
  const { isExact } = useRouteMatch('/')
  return (
    <HomeContainerStyled isHomePage={isExact}>{children}</HomeContainerStyled>
  )
}

export default HomeContainer
