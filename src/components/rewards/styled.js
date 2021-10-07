import styled, { css } from 'styled-components'
import _Skeleton from '@material-ui/lab/Skeleton'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import TableCell from '@material-ui/core/TableCell'

export const Cell = styled(TableCell)`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  border: none;
  color: ${(p) => p.theme.colors.secondary};
  padding: 15px;
  text-transform: ${(p) => (p.capitalize ? 'capitalize' : 'normal')};
  cursor: pointer;

  & svg {
    opacity: ${(p) => (p.showarrow ? 1 : 0)};
  }
  &:hover {
    & svg {
      opacity: ${(p) => (p.showarrow ? 1 : 0.3)};
    }
  }

  @media screen and (max-width: 600px) {
    line-height: 17px;
    padding: 8px 10px;
  }
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  & svg {
    transition: all 0.2s;
    transform: ${(p) => (p.transform === 'desc' ? 'none' : 'rotate(180deg)')};
    height: 10px;
    width: 10px;
    margin-left: 8px;
  }
`

export const DropdownStyled = styled(TextField)`
  max-width: ${(p) => (p.large ? '140px' : '120px')};
  margin: 10px;
  height: 36px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  border-radius: 6px;
  background: ${(p) => p.theme.colors.defaultArrow};
  &:first-of-type {
    margin-left: 0;
  }

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
    padding: 0 24px 0 10px;
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
    color: ${(p) => p.theme.colors.primaryDefault};
  }

  @media screen and (max-width: 548px) {
    &:first-of-type {
      margin-left: 10px;
    }
    &:last-of-type {
      margin-right: 10px;
    }
    width: 220px;
    max-width: unset;
  }
`

export const ArrowField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  transform: ${({ desc }) => (desc ? 'rotate(0deg)' : 'rotate(180deg)')};
`

export const FilterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${(p) => (p.large ? '140px' : '120px')};
  margin: 10px;
  height: 36px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  border-radius: 6px;
  padding: 0 20px 0 20px;
  cursor: pointer;
  background: ${(p) => p.theme.colors.defaultArrow};

  @media screen and (max-width: 548px) {
    &:first-of-type {
      margin-left: 10px;
    }
    &:last-of-type {
      margin-right: 10px;
    }
    width: 220px;
    max-width: unset;
  }
`
export const SelectMenu = styled(MenuItem)`
  padding: 15px 15px 15px 20px;
  min-width: 200px;
`
export const SelectName = styled.h4`
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.secondary};
`
export const ContractBox = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  margin-top: 23px;
`
export const ContractHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 2px 24px 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 900px) {
    justify-content: space-around;
  }
  @media screen and (max-width: 600px) {
    padding: 2px 10px 17px;
  }
`
export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`
export const SpanTextContent = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primary};
  margin-left: 16px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`
export const RewardsActiveWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  & svg {
    max-width: 24px;
    min-width: 24px;
    height: 24px;
    margin-left: 7px;
  }

  & .MuiFormControlLabel-label {
    display: flex;
    & img {
      max-width: 22px;
      min-width: 22px;
      max-height: 22px;
    }
  }
  & .MuiFormControlLabel-root {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 650px) {
    margin-left: 10px;
  }

  @media screen and (max-width: 548px) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
    margin: 10px;

    & .MuiFormControlLabel-root {
      margin-right: 0;
    }
  }
`
export const SubTitle = styled.h4`
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: ${(p) => p.theme.colors.defaultLightActive};
  margin: 30px 0 -5px;
  padding-top: 5px;
  border-top: 1px solid ${(p) => p.theme.colors.tradeDivider};

  @media screen and (max-width: 768px) {
    margin-top: 40px;
    font-size: 15px;
    line-height: 20px;
  }
`
export const TooltipSwitcher = styled(Switch)`
  width: 56px;
  height: 36px;
  padding: 0;

  & .MuiSwitch-track,
  & .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
    background: ${(p) => p.theme.colors.transparentBg};
    border-radius: 20px;
    opacity: 1;
  }
  & .MuiIconButton-root {
    padding: 7px;
  }
  & .MuiSwitch-thumb {
    width: 22px;
    height: 22px;
    background: ${(p) =>
      p.checked ? p.theme.colors.active : p.theme.colors.primary};
  }
`
export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-left: 6px;
  width: 100%;
  display: flex;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
export const FilteredTooltip = styled.div`
  @media screen and (max-width: 550px) {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 5px 0;
  }
`
export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0 10px;
  @media screen and (max-width: 1200px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 548px) {
    margin-top: 25px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`
