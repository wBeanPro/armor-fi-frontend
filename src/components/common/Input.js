import styled, { css } from 'styled-components'
import TextField from '@material-ui/core/TextField'

export const InputField = styled(TextField)`
  font-size: 12px;
  line-height: 16px;
  & .MuiOutlinedInput-root {
    background: ${(p) => p.theme.colors.secondary};
    border: 1px solid
      ${(p) => (p.error ? p.theme.colors.error : p.theme.colors.activeBorder)};
    box-sizing: border-box;
    box-shadow: 0px 0px 8px
      ${(p) => (p.error ? p.theme.colors.error : p.theme.colors.lightActive)};
    border-radius: 6px;
    font-family: 'Open Sans', sans-serif;
  }
  & .MuiInput-underline {
    &:before {
      display: none;
      height: 0px;
      border-bottom: none;
    }
    &:after {
      display: none;
      height: 0px;
      border-bottom: none;
    }
    &:hover:not($disabled):before {
      display: none;
      height: 0px;
      border-bottom: none;
    }
  }
  & .MuiOutlinedInput-input {
    border-radius: 6px;
    font-weight: normal;
    font-size: 12px;
    padding: 12px 14px;
    line-height: 16px;
  }
  & .MuiFormHelperText-contained {
    margin: 8px 0 0;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`
