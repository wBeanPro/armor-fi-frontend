import styled, { css } from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export const Checkmark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 16px;
  width: 16px;
  border: 1px solid ${(p) => p.theme.colors.active};
  box-sizing: border-box;
  border-radius: 3px;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 8px;
    width: 8px;
    background: ${(p) => p.theme.colors.active};
    border-radius: 1px;
    opacity: 0;
  }
`

export const AssetCheckbox = styled(Checkbox)`
  height: 35px;
  width: 35px;
  position: relative;
  ${(p) =>
    p.ishighlighted
      ? css`
          ~ ${Checkmark} {
            &::before {
              opacity: 0.2;
            }
          }
        `
      : css``}
  &:hover {
    ~ ${Checkmark} {
      &::before {
        opacity: 0.2;
      }
    }
  }
  &.Mui-checked {
    ~ ${Checkmark} {
      &::before {
        opacity: 1;
      }
    }
  }
  & .MuiSvgIcon-root {
    fill: ${(p) => p.theme.colors.active};
    display: none;
  }
`
export const CheckboxLabel = styled(FormControlLabel)`
  margin: 0;
  position: relative;
`
