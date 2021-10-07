import styled from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

export const InputField = styled(TextField)`
  font-size: 12px;
  padding: 0px;
  line-height: 16px;
  & .MuiOutlinedInput-root {
    background: ${(p) => p.theme.colors.primaryDefault};
    border: 1px solid ${(p) => (p.error ? p.theme.colors.error : 'transparent')};
    box-sizing: border-box;
    box-shadow: ${(p) =>
      p.error ? `0px 0px 8px ${p.theme.colors.error}` : 'none'};
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
    line-height: 16px;
    color: ${(p) => p.theme.colors.strongDefault};
    padding: 11px 14px;
  }
  & .MuiFormHelperText-contained {
    margin: 4px 0 0;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`
export const InputInfo = styled(InputAdornment)`
  & p {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: ${(p) => p.theme.colors.strongDefault};
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    letter-spacing: 0.02em;
  }
`
export const HelperTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
`
export const Info = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => (p.error ? p.theme.colors.error : p.theme.colors._default)};
`
export const Dropdown = styled(TextField)`
  font-family: 'Open Sans', sans-serif;
  min-width: 64px;
  & .MuiSelect-select {
    padding: 6px 24px 6px 6px;
    display: flex;
    align-items: center;
    &:focus {
      background: transparent;
    }
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
`
export const SelectMenu = styled(MenuItem)`
  padding: 15px 15px 15px 20px;
  min-width: 150px;
`
export const SelectIconName = styled.h4`
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
`
