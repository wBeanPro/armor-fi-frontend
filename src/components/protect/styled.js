import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'
import _AlertTitle from '@material-ui/lab/AlertTitle'

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  overflow: hidden;
  margin: 30px 0 -20px;
  width: 100px;
  position: relative;
  height: 32px;

  &::before {
    content: '';
    width: 48px;
    height: calc(100% - 4px);
    background: ${(p) => p.theme.colors.active};
    position: absolute;
    z-index: 1;
    border-radius: 16px;
    top: 2px;
    transition: right 0.3s;

    ${(p) =>
      p.primary
        ? css`
            right: 50px;
          `
        : css`
            right: 2px;
          `}
  }
`
export const ToggleSwitchButton = styled.div`
  width: 50px;
  height: 32px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: ${(p) => p.theme.colors.secondary};
`
export const ActionButton = styled(Button)`
  border: 1px solid ${(p) => p.theme.colors.secondary};
  box-sizing: border-box;
  border-radius: 6px;
  padding: 6px 15px;
  min-width: unset;
  max-width: fit-content;
  margin: 30px auto 0;
  display: block;
`
export const ButtonText = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
`
export const Description = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: ${(p) => (p.center ? '12px' : '14px')};
  line-height: ${(p) => (p.center ? '16px' : '19px')};
  text-align: ${(p) => (p.center ? 'center' : 'left')};
  color: ${(p) => p.theme.colors.secondary};
  max-width: 585px;
  width: 100%;
  margin: 14px auto 0;
  filter: ${(p) => (p.blur ? 'blur(2px)' : 'none')};
`
export const ModalWrapper = styled.div`
  max-width: 695px;
  width: 100%;
  margin: 0 auto;
`
