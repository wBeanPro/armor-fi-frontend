import React from 'react'
import { withTheme } from 'styled-components'
import AboutCircleIcon from '../../icons/AboutCircleIcon'

import { Container, IconWrapper, Title, Text } from './styled'

const ImportantInfoBox = ({ theme, title = 'Important info', text }) => {
  const { colors } = theme
  return (
    <Container>
      <IconWrapper>
        <AboutCircleIcon color={colors.activeSearch} />
      </IconWrapper>
      <div>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </div>
    </Container>
  )
}

export default withTheme(ImportantInfoBox)
