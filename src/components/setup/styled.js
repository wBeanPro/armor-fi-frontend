import styled, { css } from 'styled-components'
import _Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'

export const Container = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 12;

  @media screen and (max-width: 448px) {
    right: 15px;
  }
`
export const WalletAddress = styled.h4`
  overflow: visible;
  position: relative;
  padding: 7px 12px;
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: ${(p) => p.theme.colors.primaryLightTrue};
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  box-sizing: border-box;
  filter: drop-shadow(0px 0px 1px rgba(31, 37, 48, 0.25));
  border-radius: ${(p) => (p.withoutAccount ? '0 8px 8px 0' : '8px')};

  @media screen and (max-width: 1200px) {
    font-size: ${(p) => (p.withoutAccount ? '10px' : '14px')};
  }
  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
  @media screen and (max-width: 550px) {
    text-align: center;
    border-radius: ${(p) => (p.withoutAccount ? '8px 8px 0 0' : '8px')};
    justify-content: ${(p) => (p.withoutAccount ? 'center' : 'unset')};
  }
`
export const ConnectedDot = styled.div`
  background: ${(p) => p.theme.colors.primaryLightTrue};
  opacity: 1;
  border-radius: 12px;
  width: 12px;
  height: 12px;
  margin-right: 6px;
`
export const NetworkIndicator = styled.span`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 6px;
  background: ${(p) => p.theme.colors.primaryLightTrue};
  box-shadow: 0px 0px 1px ${(p) => p.theme.colors.default};
  line-height: 10px;
  font-size: 8px;
  border-radius: 10px;
  color: ${(p) => p.theme.colors.modalBg};
`
export const BurgerBox = styled.div`
  position: relative;
  z-index: 12;
  margin-left: 10px;
  padding: ${(p) => (p.open ? '9px 12px 9px 18px' : '9px 15px')};
  border-radius: 20px;
  transition: all 0.3s linear;
  display: none;
  border: 1px solid
    ${(p) =>
      p.open ? p.theme.colors.buttonActiveBg : p.theme.colors.primaryLightTrue};

  @media screen and (max-width: 900px) {
    display: block;
  }
`

export const BurgerLine = styled.div`
  width: ${(p) => (p.open ? '19px' : '20px')};
  height: 3px;
  background: ${(p) => p.theme.colors.primaryLightActive};
  border-radius: 3px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;

  &:first-child {
    transform: ${(p) => (p.open ? 'rotate(45deg)' : 'rotate(0)')};
  }
  &:nth-child(2) {
    opacity: ${(p) => (p.open ? '0' : '1')};
    transform: ${(p) => (p.open ? 'translateX(20px)' : 'translateX(0)')};
  }
  &:nth-child(3) {
    transform: ${(p) => (p.open ? 'rotate(-45deg)' : 'rotate(0)')};
  }
  @media screen and (max-width: 900px) {
    background: ${(p) =>
      p.open ? p.theme.colors.secondary : p.theme.colors.primaryLightActive};
  }
`
export const Burger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  height: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`
export const SlideOverlay = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(p) => p.theme.colors.tabBorder};
  overflow: hidden;
`
export const Slide = styled(_Slide)`
  position: fixed;
  width: 235px;
  right: 0;
  top: 0;
  z-index: 11;
  border-radius: 4px 0 0 4px;
  height: ${(p) => p.deviceheight}px;
  background: ${(p) => p.theme.colors.modalBg};
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
  }
`
export const LogoContent = styled.a`
  cursor: pointer;
  position: fixed;
  top: 17px;
  left: 24px;
  z-index: 99;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  display: flex;
  align-items: center;
  & span {
    margin-left: 12px;
  }

  @media screen and (max-width: 900px) {
    position: absolute;
  }

  @media screen and (max-width: 448px) {
    left: 15px;
  }
  ${(p) =>
    p.withoutAccount
      ? css`
          @media screen and (max-width: 420px) {
            & span {
              display: none;
            }
          }
        `
      : css``};

  @media screen and (max-width: 370px) {
    & span {
      display: none;
    }
  }
`
export const BottomWrapper = styled.div`
  z-index: 99;
  position: fixed;
  bottom: ${(p) => (p.isBottom ? '80px' : '20px')};

  @media screen and (min-width: 901px) {
    left: 20px;
  }

  @media screen and (max-width: 900px) {
    right: 20px;
    bottom: 20px;
  }
  @media screen and (max-width: 548px) {
    right: 17px;
    bottom: 10px;
  }
`
export const WalletInfo = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 11px;
  line-height: 14px;
  text-align: right;
  max-width: 195px;
  width: 100%;
  border-radius: 8px 0 0 8px;
  padding: 5px 9px;
  color: ${(p) => p.theme.colors.secondary};
  background: ${(p) => p.theme.colors.walletInfo};
  & a {
    text-decoration: none;
    color: ${(p) => p.theme.colors.primaryLightTrue};
    font-weight: bold;
  }
  @media screen and (max-width: 550px) {
    text-align: center;
    border-radius: 0 0 8px 8px;
    position: absolute;
    bottom: -100%;
    left: 0;
    transform: translateY(-2px);
  }
  @media screen and (max-width: 350px) {
    font-size: 9px;
    line-height: 12px;
    padding: 5px 4px;
    transform: translateY(-4px);
  }
`
export const WalletWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 550px) {
    width: ${(p) => (p.withoutAccount ? '195px' : 'unset')};
    position: relative;
    flex-direction: column-reverse;
  }
  @media screen and (max-width: 350px) {
    width: ${(p) => (p.withoutAccount ? '155px' : 'unset')};
  }
`
export const TokensWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const TokenButton = styled(Button)`
  text-transform: none;
  max-width: max-content;
  width: 100%;
  height: 36px;
  border-radius: 6px;
  padding: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  font-weight: bold;
  background: transparent;
  margin-left: 15px;
  box-shadow: none;
  color: ${(p) => p.theme.colors.primaryLightTrue};
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  min-width: unset;

  & svg {
    width: 20px;
    height: 20px;
    margin: 0 3px;
  }
  img {
    width: 20px;
    height: 20px;
    &:first-of-type {
      margin-right: 5px;
    }
    &:last-of-type {
      margin-left: 5px;
    }
  }
  &:hover {
    background: transparent;
    box-shadow: none;
  }

  @media screen and (max-width: 900px) {
    color: ${(p) => p.theme.colors.secondary};
    border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
  }
`
