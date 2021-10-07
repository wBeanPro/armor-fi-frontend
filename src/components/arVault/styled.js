import styled, { css } from 'styled-components'
import _Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import InputAdornment from '@material-ui/core/InputAdornment'

export const Container = styled.div`
  max-width: 1230px;
  width: 100%;
  padding: 18px 10px 30px;
  flex: 1;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding-top: 90px;
  }
`
export const Box = styled.div`
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  padding: 20px 20px 0;
  margin-top: 18px;
`
export const Head = styled.div`
  display: flex;
  padding-bottom: 19px;
`
export const Cell = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
  margin-right: 10px;
  &:first-of-type {
    min-width: 200px;
  }
  &:last-of-type {
    margin-right: 0;
    min-width: 167px;
  }
  &::-webkit-scrollbar {
    display: none;
    width: 0px;
    background: transparent;
  }
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  ${(p) =>
    p.underlyingTokens &&
    css`
      max-height: 70px;
      overflow-y: scroll;
    `}

  @media screen and (max-width: 1100px) {
    margin-right: 3px;
    &:first-of-type {
      min-width: 180px;
    }
  }
`
export const Row = styled.div`
  display: flex;
  border-top: 1px solid ${(p) => p.theme.colors.primaryDefault};
  padding: 19px 0;
  align-items: center;
`

export const Text = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: ${(p) => (p.bold ? 'bold' : 'normal')};
  letter-spacing: ${(p) => (p.bold ? '0.02em' : 'unset')};
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.primary};
`
export const Icon = styled.img`
  height: 25px;
  width: auto;
  margin-right: 6px;
`
export const Tooltip = styled.span`
  visibility: hidden;
  background: ${(p) => p.theme.colors.secondaryDefault};
  color: ${(p) => p.theme.colors.primary};
  text-align: center;
  border-radius: 6px;
  padding: 3px 5px;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 17px;
  top: -30px;
  left: 35px;
  position: absolute;
  z-index: 1;
  transition: 0.3s all;
  opacity: 0;
`
export const Name = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primary};
  margin-right: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 150px;
  white-space: nowrap;
`

export const Link = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    ${Tooltip} {
      transition: 0.3s all;
      opacity: 1;
      visibility: visible;
    }
  }
`
export const FlexContent = styled.div`
  display: flex;
  align-items: center;
  margin: ${(p) => (p.underlyingTokens ? '1px 0' : '0')};
`
export const Content = styled.div`
  margin-left: 11px;
`
export const Badge = styled.div`
  padding: 3px;
  background: ${(p) =>
    p.disable
      ? p.theme.colors.disabledDefault
      : p.theme.colors.primaryLightActive};
  border-radius: 4px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  margin-top: 4px;
  color: ${(p) =>
    p.disable ? p.theme.colors.disabledText : p.theme.colors.snackbarBlue};
  display: inline-block;
`
export const LogoToken = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 6px;
`

// PoolActions styles

export const Button = styled(_Button)`
  background: ${(p) => p.theme.colors.secondaryDefault};
  border-radius: 6px;
  box-shadow: none;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  padding: 8px 12px;
  color: ${(p) => p.theme.colors.primary};
  margin-right: 8px;
  &:last-of-type {
    margin-right: 0;
  }
  @media screen and (max-width: 1200px) {
    display: flex;
    margin: 20px auto 0;
    width: fit-content;
    margin-right: 8px;
    &:last-of-type {
      margin-right: auto;
    }
  }
`
export const ButtonsBox = styled.div`
  display: flex;
  margin-top: 12px;
  @media screen and (max-width: 1200px) {
    margin-top: 0;
  }
`
export const Dropdown = styled(TextField)`
  height: 30px;
  border-radius: 6px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primaryDefault};
  & .MuiSelect-select:focus {
    border-radius: 6px;
  }
  & .MuiSelect-select {
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 160%;
    letter-spacing: 0.02em;
    color: ${(p) => p.theme.colors.strongDefault};
    height: 30px;
    padding: 0 33px 0 9px;
    display: flex;
    align-items: center;
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
  & .MuiInput-root {
    display: flex;
    align-items: center;
    height: 100%;
  }
  & .MuiSvgIcon-root {
    right: 7px;
  }
`
export const SelectMenu = styled(MenuItem)`
  padding: 15px 15px 15px 20px;
  min-width: 200px;
`

// Cards styles

export const Card = styled.div`
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  padding: 0 20px 20px;
  margin: 30px auto 0;
  max-width: 47%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    max-width: 420px;
  }
  @media screen and (max-width: 448px) {
    padding: 0 10px 20px;
  }
`
export const CellItem = styled.div`
  padding: 20px 10px;
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
  @media screen and (max-width: 448px) {
    padding: 8px;
  }
`
export const CardRow = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid ${(p) => p.theme.colors.primaryDefault};
`
export const Actions = styled.div`
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`
export const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const SearchField = styled(TextField)`
  max-width: 520px;
  width: 100%;
  height: 40px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  margin-top: 50px;
  & .MuiOutlinedInput-root {
    border-radius: 6px;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 8px 13px;
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
  }
  & .MuiOutlinedInput-inputAdornedStart {
    padding-left: 10px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 47%;
    margin: 50px auto 0 13px;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    margin: 40px auto 0;
    max-width: 420px;
  }
`
export const Filter = styled(InputAdornment)`
  display: flex;
  align-items: center;
  border-left: 1px solid ${(p) => p.theme.colors.disabledText};
  height: 100%;
  padding-left: 10px;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.disabledText};
  & svg {
    margin-right: 10px;
  }
`
