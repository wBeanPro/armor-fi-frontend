import styled from 'styled-components'
import _Button from '@material-ui/core/Button'

export const Button = styled(_Button)`
  background: ${(p) => p.theme.colors.connectWallet};
  border-radius: 0 8px 8px 0;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  height: 40px;
  color: ${(p) => p.theme.colors.secondary};
  padding: 10px 13px;
  &:hover {
    background: ${(p) => p.theme.colors.connectWallet};
  }
  & svg {
    max-width: 19px;
    min-width: 19px;
    width: 100%;
    height: 19px;
    margin-left: 12px;
  }
  @media screen and (max-width: 350px) {
    border-radius: 8px 8px 0 0;
    width: 100%;
  }
`
export const WalletInfo = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 11px;
  line-height: 14px;
  text-align: right;
  color: ${(p) => p.theme.colors.secondary};
  max-width: 190px;
  width: 100%;
  border-radius: 8px 0 0 8px;
  padding: 6px 9px;
  background: ${(p) => p.theme.colors.walletInfo};
  & a {
    text-decoration: none;
    color: ${(p) => p.theme.colors.primaryLightTrue};
    font-weight: bold;
  }
  @media screen and (max-width: 350px) {
    border-radius: 0 0 8px 8px;
    width: 100%;
    text-align: center;
    max-width: 100%;
  }
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 350px) {
    flex-direction: column-reverse;
    width: 100%;
    max-width: 250px;
  }
`
