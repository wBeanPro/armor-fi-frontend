import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

export const DropdownStyled = styled(TextField)`
  min-width: 112px;
  height: 36px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  border-radius: 6px;
  background: ${(p) => p.theme.colors.defaultArrow};
  box-shadow: none;
  & .MuiSelect-select:focus {
    border-radius: 6px;
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
  & .MuiSelect-select {
    height: 36px;
    padding: 0 28px 0 9px;
    display: flex;
    align-items: center;
  }
  & .MuiInput-root {
    display: flex;
    align-items: center;
    height: 100%;
  }
  & .MuiSvgIcon-root {
    right: 7px;
  }
  & .MuiSelect-icon {
    color: ${(p) => p.theme.colors.disabledText};
  }
`
export const SelectMenu = styled(MenuItem)`
  padding: 15px 15px 15px 20px;
`
export const SelectIcon = styled.div`
  border-radius: 25px;
  background: ${(p) => p.theme.colors.secondaryDefault};
  height: 24px;
  width: 24px;
  & img {
    height: 20px;
  }
`
export const SelectIconName = styled.h4`
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
`
