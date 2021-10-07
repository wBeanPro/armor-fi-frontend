import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

export const SearchField = styled(TextField)`
  max-width: 265px;
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
  & .MuiInputAdornment-positionEnd {
    margin-left: 0;
    font-family: 'Open Sans', sans-serif;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-input {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: ${(p) => p.theme.colors.disabledText};
  }
  & .MuiOutlinedInput-inputAdornedStart {
    padding-left: 10px;
  }
  @media screen and (max-width: 600px) {
    margin-top: 20px;
    max-width: 400px;
  }
`
