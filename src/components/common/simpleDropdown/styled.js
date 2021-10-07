import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

export const DropdownStyled = styled(TextField)`
  max-width: 300px;
  height: 40px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  border-radius: 6px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primaryDefault};
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
    height: 40px;
    padding: 0 24px 0 9px;
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
    ${(p) => (p.hideArrow ? 'display: none;' : '')}
  }

  @media screen and (max-width: 600px) {
    max-width: 200px;
  }
`
export const SelectMenu = styled(MenuItem)`
  padding: 15px 15px 15px 20px;
  min-width: 200px;
`
export const SelectIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: ${(p) => p.theme.colors.secondaryDefault};
  height: 30px;
  width: 30px;
`
export const SelectIconName = styled.h5`
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.strongDefault};
`
export const Placeholder = styled.div`
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  line-height: 22px;
  color: #9299a6;
`
