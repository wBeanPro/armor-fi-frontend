import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'
import _Slide from '@material-ui/core/Slide'

export const Container = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  position: relative;
`
export const CloseIconWrapper = styled.div`
  position: fixed;
  right: 12px;
  top: 12px;
  cursor: pointer;
`
export const Content = styled.div`
  margin: auto;
  text-align: center;
  padding: 20px 20px 10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media screen and (max-width: 448px) {
    padding: 20px 15px 10px;
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 650px) {
    justify-content: center;
  }
`

export const ButtonWrapper = styled.div`
  padding: 12px 0px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`
export const StyledButton = styled(Button)`
  background: transparent;
  border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px 24px;
  text-transform: none;
  ${(p) =>
    p.deactivate
      ? css`
          &.MuiButton-outlinedPrimary {
            color: ${(p) => p.theme.colors.error};
          }
        `
      : css``}

  &:hover {
    background: ${(p) => p.theme.colors.transparentBg};
    border: 1px solid
      ${(p) =>
        p.deactivate ? p.theme.colors.error : p.theme.colors.buttonActiveBg};
  }
`
export const ButtonText = styled.h3`
  margin: 0px 12px;
  color: ${(p) => p.theme.colors.secondary};
  font-weight: bold;
  font-size: 1rem;
`
export const Image = styled.img`
  position: absolute;
  right: 20px;
  width: 30px;
  height: 30px;
  ${(p) =>
    p.filter
      ? css`
          filter: brightness(0) invert(1);
        `
      : css``}
`
export const Dot = styled.div`
  background: ${(p) => p.theme.colors.connected};
  border-radius: 10px;
  width: 10px;
  height: 10px;
  margin-right: 10px;
`
export const DeactivateContainer = styled.div`
  width: 100%;
  margin: 12px 0px;
  position: relative;

  @media screen and (max-width: 448px) {
    max-width: 270px;
  }
`
export const DeactivateText = styled.h5`
  font-weight: bold;
  color: ${(p) => p.theme.colors.secondary};
  text-align: center;
  width: 100%;
  font-size: 14px;
  line-height: 28px;
`
export const SlideOverlay = styled.div`
  position: fixed;
  z-index: 102;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(p) => p.theme.colors.tabBorder};
  overflow: hidden;
`
export const Slide = styled(_Slide)`
  position: fixed;
  width: 270px;
  right: 0;
  top: 0;
  z-index: 103;
  border-radius: 4px 0 0 4px;
  max-height: ${(p) => p.deviceheight}px;
  height: ${(p) => p.deviceheight}px;
  background: ${(p) => p.theme.colors.modalBg};
  @media screen and (max-width: 448px) {
    width: calc(100% - 30px);
    height: calc(100vh - 30px);
    right: 15px;
    top: 15px;
    border-radius: 4px;
  }
  @media screen and (max-width: 360px) {
    width: calc(100% - 20px);
    height: calc(100vh - 20px);
    right: 10px;
    top: 10px;
  }
`
export const CloseButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 3px;
  cursor: pointer;
  max-width: max-content;
  border-radius: 50%;
  min-width: unset;
  z-index: 104;

  @media screen and (max-width: 448px) {
    top: 2px;
    right: 2px;
  }
  @media screen and (max-width: 320px) {
    & svg {
      height: 19px;
      width: 19px;
    }
  }
`
export const WalletContainer = styled.div`
  height: ${(p) => p.deviceheight - 102}px;
  width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 5px;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  @media screen and (max-width: 448px) {
    height: ${(p) => p.deviceheight - 130}px;
    max-width: 270px;
  }
`
export const Shadow = styled.div`
  width: 100%;
  position: absolute;
  top: -30px;
  left: 0;
  z-index: 2;
  height: 30px;
  background: ${(p) => p.theme.colors.walletModalShadow};
`
