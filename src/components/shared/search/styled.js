import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

export const SearchField = styled(TextField)`
  width: 100%;
  height: 36px;
  background: ${(p) => p.theme.colors.defaultArrow};
  box-shadow: none;
  border-radius: 6px;
  & .MuiOutlinedInput-root {
    border-radius: 6px;
    display: flex;
    align-items: center;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
  }
  & .MuiInputAdornment-positionStart {
    margin-right: 0;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-input {
    padding: 9px 14px 9px 10px;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: ${(p) => p.theme.colors.disabledText};
  }
`
