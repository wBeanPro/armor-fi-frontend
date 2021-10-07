import styled from 'styled-components'

export const SubTitle = styled.h4`
  font-weight: bold;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: ${(p) => p.theme.colors.defaultLightActive};
  margin-top: ${(p) => (p.top ? p.top : '0')}px;
  display: flex;
  align-items: center;
  justify-content: center;
`
