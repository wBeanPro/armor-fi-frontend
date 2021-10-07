import styled from 'styled-components'

export const Text = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.active};
  text-decoration: underline;
  font-weight: normal;
  cursor: pointer;
`
