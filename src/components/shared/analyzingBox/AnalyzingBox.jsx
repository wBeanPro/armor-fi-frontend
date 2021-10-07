import React from 'react'
import { withTheme } from 'styled-components'
import NewSearchIcon from '../../icons/NewSearchIcon'
import { Container, CenterContent, Title } from './styled'

const AnalyzingBox = ({ theme, text }) => {
  const { colors } = theme

  return (
    <Container>
      <CenterContent>
        <NewSearchIcon color={colors.activeSearch} />
        <Title>{text}</Title>
      </CenterContent>
    </Container>
  )
}

export default withTheme(AnalyzingBox)
