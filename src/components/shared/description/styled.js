import styled from 'styled-components'

export const Text = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  filter: ${(p) => (p.blur ? 'blur(2px)' : 'none')};
`
