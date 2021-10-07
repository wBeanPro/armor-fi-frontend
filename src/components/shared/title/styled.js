import styled from 'styled-components'

export const Text = styled.h2`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: ${(p) => p.theme.colors.defaultLightActive};
`
