import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'

export const ButtonStyled = styled(Button)`
  border-radius: 6px;
  min-width: unset;
  display: flex;
  align-items: center;

  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  text-transform: uppercase;

  ${(p) =>
    p.buttonsize === 'lg'
      ? css`
          padding: 7px 6px;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.02em;
        `
      : css`
          padding: 5px 6px;
          font-size: 12px;
          line-height: 16px;
        `}

  ${(p) =>
    p.isdisabled
      ? css`
          background: ${(p) => p.theme.colors.strongDefault};
          border: 1px solid transparent;
          box-shadow: none;
          cursor: not-allowed;
          color: ${(p) => p.theme.colors.secondary};
          & .MuiTouchRipple-root {
            color: transparent;
          }
          &:active {
            box-shadow: none;
          }
          &:hover {
            box-shadow: none;
            background: ${(p) => p.theme.colors.strongDefault};
          }
        `
      : p.buttonvariant === 'outlined'
      ? css`
          background: transparent;
          border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
          box-shadow: none;
          color: ${(p) => p.theme.colors.active};
          &:hover {
            background: transparent;
          }
        `
      : p.buttonvariant === 'token'
      ? css`
          background: transparent;
          border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
          box-shadow: none;
          color: ${(p) => p.theme.colors.primaryLightTrue};
          &:hover {
            background: transparent;
          }
        `
      : css`
          background: ${(p) => p.theme.colors.buttonActiveBg};
          box-shadow: none;
          border: 1px solid transparent;
          color: ${(p) => p.theme.colors.secondary};
          &:hover {
            background: ${(p) => p.theme.colors.buttonActiveBg};
          }
        `};

  ${(p) =>
    p.fullWidth
      ? css`
          width: 100%;
        `
      : css``}
`

export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-left: 6px;
  width: 100%;
  display: flex;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
