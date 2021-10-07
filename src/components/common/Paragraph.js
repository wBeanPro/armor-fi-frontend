import styled from 'styled-components'

export const Paragraph = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primary};
  font-weight: ${(p) => (p.bold ? 'bold' : 'normal')};
`
