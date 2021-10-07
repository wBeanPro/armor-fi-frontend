import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'

export const StyledButton = styled(Button)`
  border-radius: 6px;
  padding: 4px 6px;
  margin: ${(p) => (p.margin ? p.margin : '0')};
  min-width: unset;

  ${(p) =>
    p.isdisabled
      ? css`
          background: ${(p) => p.theme.colors.strongDefault};
          border: 1px solid transparent;
          box-shadow: none;
          cursor: not-allowed;
          &:active {
            box-shadow: none;
          }
          &.MuiButton-contained {
            color: transparent;
          }
          &:hover {
            box-shadow: none;
            background: ${(p) => p.theme.colors.strongDefault};
          }
          & h5 {
            color: ${(p) => p.theme.colors.secondary};
          }
        `
      : p.bordered
      ? css`
          background: transparent;
          border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
          box-shadow: none;
          &.MuiButton-contained {
            color: ${(p) => p.theme.colors.buttonActiveBg};
          }
          &:hover {
            background: transparent;
          }
        `
      : css`
          background: ${(p) => p.theme.colors.buttonActiveBg};
          box-shadow: none;
          border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
          &.MuiButton-contained {
            color: ${(p) => p.theme.colors.secondary};
          }
          &:hover {
            background: ${(p) => p.theme.colors.buttonActiveBg};
          }
        `}
`
export const ButtonText = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) =>
    p.bordered ? p.theme.colors.active : p.theme.colors.secondary};
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
