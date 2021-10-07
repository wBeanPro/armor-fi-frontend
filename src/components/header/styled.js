import styled, { css } from 'styled-components'

export const Container = styled.div`
  vertical-align: top;
  background: ${(p) =>
    p.home ? 'transparent' : p.theme.colors.secondaryDefault};
  position: relative;
  width: 100%;
  display: flex;
  height: 61px;
  @media screen and (max-width: 900px) {
    background: transparent;
  }
`
export const GradientHeader = styled.div`
  display: ${(p) => (p.hide ? 'none' : 'block')};
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 2px;
  background: ${(p) => p.theme.colors.headerGradient};
  @media screen and (max-width: 900px) {
    background: transparent;
  }
`
export const HeaderContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding: 12px 20px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 900px) {
    justify-content: space-between;
    padding: 10px 15px;
  }
`
export const Icon = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    flex: 0;
  }
`
export const Name = styled.h3`
  padding-left: 13px;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) =>
    p.home ? p.theme.colors.primaryLightActive : p.theme.colors.primary};

  @media screen and (max-width: 1200px) {
    display: none;
  }
  @media screen and (max-width: 900px) {
    display: block;
  }
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
  @media screen and (max-width: 370px) {
    display: none;
  }
`
export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-right: 30px;

  @media screen and (max-width: 1200px) {
    margin: 0 10px 0 20px;
  }
  @media screen and (max-width: 900px) {
    display: none;
  }
`

export const DropContent = styled.div`
  position: absolute;
  padding: 35px 15px 20px;
  min-width: 150px;
  background: ${(p) =>
    p.home ? p.theme.colors.activeBg : p.theme.colors.lightSecondary};
  top: 5px;
  left: 0;
  z-index: 99;
  border-radius: 6px;
  border: 1px solid
    ${(p) =>
      p.home ? p.theme.colors.primaryBorder : p.theme.colors.tabTopBorder};
  transition: opacity 0.2s, padding 0.3s;
  height: 0;
  overflow: hidden;
  opacity: 0;
  &:hover {
    color: ${(p) => p.theme.colors.active};
  }
  @media screen and (max-width: 1200px) {
    padding: 35px 8px 20px;
  }
`

export const DropBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 15px 0;
  &:hover {
    color: ${(p) => p.theme.colors.active};
    ${DropContent} {
      padding: 55px 15px 20px;
      display: block;
      height: unset;
      opacity: 1;
      @media screen and (max-width: 1200px) {
        padding: 55px 8px 20px;
      }
    }
  }
`
export const DropLink = styled.div`
  position: relative;
  display: flex;
  z-index: 100;
  align-items: center;
  cursor: default;
  padding: 5px;
  padding-left: 27px;
  @media screen and (max-width: 1200px) {
    padding-left: 18px;
  }
`
export const MenuItem = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;

  margin-left: 6px;
  white-space: nowrap;

  ${(p) =>
    p.blured
      ? css`
          color: transparent !important;
          text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
        `
      : p.homeBlured
      ? css`
          color: transparent !important;
          text-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
        `
      : css`
          color: ${(p) =>
            p.active
              ? p.theme.colors.active
              : p.home
              ? p.theme.colors.lightActive
              : p.theme.colors.strongDefault};
        `}

  @media screen and (max-width: 1200px) {
    font-size: 12px;
    line-height: 17px;
    margin-left: 2px;
  }
  @media screen and (max-width: 900px) {
    margin-left: 6px;
    font-size: 14px;
    line-height: 19px;
  }
`
export const DownArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 7px solid
    ${(p) =>
      p.home ? p.theme.colors.lightActive : p.theme.colors.strongDefault};
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-radius: 2px;
  margin-left: 8px;
`

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 0 auto;
  background: ${(p) =>
    p.home ? p.theme.colors.primaryBorder : p.theme.colors.tabTopBorder};
  position: relative;
  z-index: 100;
`
export const DropItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid transparent;

  &:first-of-type {
    margin-top: 0;
  }
  &:hover {
    color: ${(p) => p.theme.colors.active};
    background: ${(p) =>
      p.home ? p.theme.colors.primaryBorder : p.theme.colors.secondaryBorder};
    border: 1px solid ${(p) => p.theme.colors.hoverBorder};
  }
`
export const Link = styled.div`
  ${(p) =>
    p.active
      ? css`
          padding: 13px 32px 18px;
          overflow: hidden;
          display: flex;
          height: 100%;
          align-items: center;
          margin: 7px -16px -6px -16px;
          cursor: pointer;
          position: relative;
          &:after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 1px;
            height: calc(100% - 10px);
            width: 10px;
            border-bottom-left-radius: 10px;
            background: ${(p) => p.theme.colors.secondaryDefault};
            border-bottom: 1px solid ${(p) => p.theme.colors.tabBorder};
            border-left: 1px solid ${(p) => p.theme.colors.tabBorder};
            z-index: 3;
          }
          &:before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 1px;
            height: calc(100% - 10px);
            width: 10px;
            border-bottom-right-radius: 10px;
            background: ${(p) => p.theme.colors.secondaryDefault};
            border-bottom: 1px solid ${(p) => p.theme.colors.tabBorder};
            border-right: 1px solid ${(p) => p.theme.colors.tabBorder};
            z-index: 3;
          }
          ,
          @media screen and (max-width: 1200px) {
            padding: 13px 26px 18px;
          }
        `
      : css`
          padding: 13px 0 18px;
          cursor: pointer;
          display: flex;
          overflow: hidden;
          align-items: center;
          margin: 0 16px -6px;
          @media screen and (max-width: 1200px) {
            margin: 0 10px -6px;
          }
        `}
`
export const TabsTopBorder = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  width: calc(100% - 20px);
  background: ${(p) => p.theme.colors.lightSecondary};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 10px;
  border-top: 1px solid ${(p) => p.theme.colors.tabTopBorder};
  border-left: 1px solid ${(p) => p.theme.colors.tabTopBorder};
  border-right: 1px solid ${(p) => p.theme.colors.tabTopBorder};
`
export const TabsBottomBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: calc(100% - 5px);
  background: ${(p) => p.theme.colors.lightSecondary};
  height: calc(100% - 10px);
`
export const ContentBlock = styled.div`
  position: relative;
  display: flex;
  z-index: 5;
  align-items: center;
  & .menuActive {
    color: ${(p) => p.theme.colors.active};
  }

  @media screen and (max-width: 1200px) {
    & svg {
      width: 20px;
      height: auto;
    }
  }
  @media screen and (max-width: 900px) {
    & svg {
      width: 24px;
      height: auto;
    }
  }
`
export const Account = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;

  @media screen and (max-width: 1200px) {
    margin-left: 15px;
  }
  @media screen and (max-width: 900px) {
    margin-left: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  @media screen and (max-width: 600px) {
    margin-left: 20px;
  }
  @media screen and (max-width: 370px) {
    margin-left: -10px;
  }
`
export const WalletAddress = styled.h4`
  overflow: visible;
  position: relative;
  padding: 7px 12px;
  background: ${(p) =>
    p.home
      ? p.theme.colors.secondaryLightActive
      : p.theme.colors.lightSecondary};
  box-shadow: ${(p) =>
    p.home ? 'none' : `0px 0px 1px ${p.theme.colors.default}`};
  border-radius: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: ${(p) =>
    p.home ? p.theme.colors.primaryLightTrue : p.theme.colors.strongDefault};
  &:hover {
    box-shadow: ${(p) =>
      p.home ? 'none' : `0px 0px 3px ${p.theme.colors.default}`};
  }

  @media screen and (max-width: 1200px) {
    font-size: ${(p) => (p.withoutAccount ? '10px' : '14px')};
  }
  @media screen and (max-width: 900px) {
    font-size: 14px;
  }
  @media screen and (max-width: 400px) {
    font-size: ${(p) => (p.withoutAccount ? '9px' : '14px')};
  }
`
export const ShowMenu = styled.div`
  display: none;
  @media screen and (max-width: 900px) {
    display: block;
  }
`
export const ConnectedDot = styled.div`
  background: ${(p) =>
    p.home ? p.theme.colors.primaryLightTrue : p.theme.colors.defaultLightTrue};
  opacity: 1;
  border-radius: 12px;
  width: 12px;
  height: 12px;
  margin-right: 6px;
`
export const NetworkIndicator = styled.span`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 6px;
  background: ${(p) =>
    p.home
      ? p.theme.colors.secondaryLightActive
      : p.theme.colors.lightSecondary};
  box-shadow: 0px 0px 1px ${(p) => p.theme.colors.default};
  line-height: 10px;
  font-size: 10px;
  border-radius: 10px;
  color: ${(p) =>
    p.home ? p.theme.colors.primaryLightTrue : p.theme.colors.strongDefault};
`
