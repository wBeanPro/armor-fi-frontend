import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Overlay = styled.div`
  backdrop-filter: blur(3px);
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.modalOverlay};
`
export const ModalFront = styled.div`
  position: relative;
  z-index: 101;
  max-width: ${(p) => p.width}px;
  width: 100%;
  overflow: hidden;
  background: ${(p) => p.theme.colors.modalBg};
  box-shadow: 0px 0px 24px ${(p) => p.theme.colors.modalOverlay};
  border-radius: 16px;
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};

  @media screen and (max-width: 600px) {
    max-width: 400px;
    width: calc(100% - 20px);
    overflow: scroll;
    max-height: calc(100vh - 20px);
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
  z-index: 102;

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
