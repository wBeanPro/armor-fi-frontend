import styled, { css } from 'styled-components'
import FormControl from '@material-ui/core/FormControl'

export const Chooser = styled(FormControl)`
  margin-right: 15px;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  & .MuiInput-formControl {
    margin: 0;
    height: 100%;
    & .MuiSelect-icon {
      display: none;
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
  & .MuiSelect-select.MuiSelect-select {
    box-shadow: none;
    border-radius: 18px;
    height: 100%;
    width: 100%;
    padding: 0;
    min-height: unset;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .MuiSelect-select.MuiSelect-select {
    border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 1px rgba(31, 37, 48, 0.25));
  }

  @media screen and (max-width: 900px) {
    margin-right: 10px;
  }
`
export const LangIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 11px;
`
