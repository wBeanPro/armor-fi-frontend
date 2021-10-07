import styled from 'styled-components'
import Button from '@material-ui/core/Button'

export const ButtonStyled = styled(Button)`
  font-family: 'Open Sans', sans-serif;
  height: 40px;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  border-radius: 6px;
  border: none;
  padding: 10px 12px;
  &.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    & h4 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }
  &:hover {
    background: ${(p) => p.theme.colors.buttonActiveBg};
    border: none;
  }
`
