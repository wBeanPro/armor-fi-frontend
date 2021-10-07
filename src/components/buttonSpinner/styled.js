import styled from 'styled-components'
import Button from '@material-ui/core/Button'

export const StyledButton = styled(Button)`
  min-width: 170px;
  max-width: 100%;
  height: unset;
  border: none;
  width: ${(p) => p.width}px;
  padding: 7px 20px;
  min-height: 40px;
  background: ${(p) => p.theme.colors.active};
  box-shadow: 0px 0px 12px ${(p) => p.theme.colors.defaultLightActive};
  border-radius: 6px;
  position: relative;
  &:hover {
    background: ${(p) => p.theme.colors.active};
  }
  &.Mui-disabled {
    background: ${(p) => p.theme.colors.disabledText};
  }
`
export const Text = styled.h5`
  color: ${(p) => p.theme.colors.secondary};
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  letter-spacing: 0.02em;
`
