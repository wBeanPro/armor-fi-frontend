import styled, { css } from 'styled-components'
import _Slide from '@material-ui/core/Slide'

export const BurgerBox = styled.div`
  position: ${(p) => (p.open ? 'fixed' : 'absolute')};
  top: 31px;
  transform: translateY(-50%);
  right: 15px;
  z-index: 12;
  padding: ${(p) => (p.open ? '9px 12px 9px 18px' : '9px 15px')};
  background: ${(p) =>
    p.home
      ? p.theme.colors.secondaryLightActive
      : p.open
      ? p.theme.colors.secondaryDefault
      : p.theme.colors.secondaryDefault};
  border-radius: 20px;
  transition: all 0.3s linear;
`
export const BurgerLine = styled.div`
  width: ${(p) => (p.open ? '19px' : '20px')};
  height: 3px;
  background: ${(p) =>
    p.open
      ? p.theme.colors.disabledText
      : p.home
      ? p.theme.colors.primaryLightActive
      : p.theme.colors.disabledText};
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
  width: 300px;
  right: 0;
  top: 0;
  z-index: 11;
  padding: 20px;
  border-radius: 4px 0 0 4px;
  max-height: 100vh;
  overflow: scroll;
`
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${(p) => p.theme.colors.primaryDefault};
`
export const Label = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.disabledText};
  margin-left: 6px;
  white-space: nowrap;
`
export const Link = styled.div`
  padding: 13px 0 18px;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  align-items: center;
  margin: 0 16px -6px;
  @media screen and (max-width: 600px) {
    padding: 13px 0;
  }
`
export const MenuItem = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) =>
    p.active ? p.theme.colors.active : p.theme.colors.strongDefault};
  margin-left: 6px;
  white-space: nowrap;

  ${(p) =>
    p.blurred &&
    css`
      color: transparent;
      text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    `}
`
