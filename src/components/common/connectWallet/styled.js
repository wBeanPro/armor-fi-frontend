import styled, { css } from 'styled-components'
import { ButtonStyled } from '../Button'

export const Button = styled(ButtonStyled)`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  box-shadow: none;
`
export const Wrapper = styled.div`
  max-width: calc(100vw - 24px);
  width: 100%;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  margin: ${(p) => (p.stake ? '40px 0 0' : '12px 0 0')};
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 900px) {
    padding: 12px 24px;
  }
`
export const WalletInfo = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 11px;
  line-height: 14px;
  text-align: center;
  color: ${(p) => p.theme.colors._default};
  max-width: 190px;
  width: 100%;
  padding: 6px 0 0;
  & a {
    text-decoration: none;
    color: ${(p) => p.theme.colors.active};
    font-weight: bold;
  }
`
