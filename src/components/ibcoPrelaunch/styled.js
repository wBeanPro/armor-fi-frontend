import styled from 'styled-components'
import { Title } from '../common/Title'

export const TitleStyled = styled(Title)`
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  font-weight: 900;
`

export const NotifyBox = styled.div`
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  max-width: 220px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 3;
  top: -45px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 20px;
`

export const NotifyButton = styled.a`
  background: ${(p) => p.theme.colors.active};
  box-shadow: 0px 0px 12px ${(p) => p.theme.colors.defaultLightActive};
  border-radius: 6px;
  height: 40px;
  padding: 10px 12px;
  text-decoration: none;
  display: flex;
  align-items: center;

  &:hover {
    background: ${(p) => p.theme.colors.active};
  }
`

export const NotifyText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
  margin-right: 10px;
`
