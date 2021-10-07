import styled, { css } from 'styled-components'
import Accordion from '@material-ui/core/Accordion'
import TextField from '@material-ui/core/TextField'
import Alert from '../common/alert/Alert'
import { Paragraph } from '../common/Paragraph'
import Switch from '@material-ui/core/Switch'
import _Skeleton from '@material-ui/lab/Skeleton'
import MenuItem from '@material-ui/core/MenuItem'

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
export const ExpansionPanel = styled(Accordion)`
  width: 100%;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  margin: 12px 0 0;

  & .MuiAccordionSummary-root {
    padding: 18px 34px 18px 18px;

    @media (max-width: 900px) {
      padding: 15px 30px 15px 15px;
    }
    @media (max-width: 600px) {
      padding: 5px 30px 15px 15px;
    }
  }
  & .MuiAccordionSummary-content {
    margin: 0 !important;
  }
  &.Mui-expanded {
    margin: 12px 0 0 !important;
  }
  &.MuiAccordion-root:before {
    background-color: unset;
    height: 0px;
  }
  & .MuiIconButton-label {
    width: 0;
    height: 0;
    border-radius: 2px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${(p) => p.theme.colors._default};
    & .MuiSvgIcon-root {
      display: none;
    }
  }
  & .MuiAccordionDetails-root {
    padding: 23px 68px 40px;
    background: ${(p) => p.theme.colors.tradeBg};
    border-radius: 0 0 16px 16px;

    @media screen and (max-width: 990px) {
      padding: 23px 30px 40px;
    }
    @media screen and (max-width: 900px) {
      padding: 0 30px 40px;
    }
    @media screen and (max-width: 900px) {
      padding: 0 10px 20px;
    }
  }
`
export const AssetSummary = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  padding-right: 10px;
  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`
export const HeadingName = styled.div`
  display: flex;
  align-items: center;
  min-width: 250px;
  flex: 1;

  @media screen and (max-width: 990px) {
    min-width: unset;
    flex: unset;
  }
  @media screen and (max-width: 600px) {
    margin-top: 10px;
    margin-right: 10px;
  }
`
export const AssetIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  margin-right: 19px;
  & img {
    max-height: 32px;
  }
  @media screen and (max-width: 600px) {
    height: 28px;
    width: 28px;
    margin-right: 15px;
    & img {
      max-height: 28px;
    }
  }
`
export const HeadingTitle = styled(Paragraph)`
  white-space: nowrap;
  color: ${(p) => p.theme.colors.secondary};
`
export const Address = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.active};
  text-decoration: underline;
  font-weight: normal;
  margin-top: 3px;
  @media screen and (max-width: 600px) {
    margin-top: 0;
  }
`
export const SubHeadingTitle = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.colors._default};
  margin-top: 3px;
  @media screen and (max-width: 600px) {
    margin-top: 0;
  }
`
export const Heading = styled.div`
  min-width: 170px;

  @media screen and (max-width: 990px) {
    min-width: unset;
  }
  @media screen and (max-width: 600px) {
    margin-top: 10px;
    margin-right: 10px;
  }
`
export const CoverContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 100%;
  margin-top: 40px;
  width: 100%;
`
export const Filters = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`
export const Dropdown = styled(TextField)`
  max-width: 108px;
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
  }
  @media screen and (max-width: 600px) {
    max-width: 200px;
  }
`
export const Wrapper = styled.div`
  width: 100%;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  margin: 12px 0 0;
  padding: 20px 30px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 900px) {
    padding: 12px 24px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const Cell = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 200px;
  flex-direction: column;
  margin: 0 auto;

  @media screen and (max-width: 550px) {
    flex-grow: inherit;
    width: unset;
    margin: 0 auto 0 10px;
  }
  @media screen and (max-width: 500px) {
    margin: 15px 0 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    & span {
      &:first-of-type {
        margin-left: 10px;
      }
    }
  }
`
export const SkeletonIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  @media screen and (max-width: 900px) {
    right: 15px;
  }
`
export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  max-width: 240px;
  ${Cell} {
    margin-left: 20px;
    @media screen and (max-width: 500px) {
      margin: 0 0 0 10px;
      display: block;
      & span {
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
  }
`
export const RewardsActiveWrapper = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
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
      height: auto;
    }
  }
  & .MuiFormControlLabel-root {
    display: flex;
    align-items: center;
  }
`

export const LeftActionsWrapper = styled.div`
  display: flex;
`
export const AlertStyled = styled(Alert)`
  margin: 12px 0 0 0;
  width: 100%;
`
export const Description = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  max-width: 500px;
  width: 100%;
  margin: 35px auto 0;
  & a {
    color: ${(p) => p.theme.colors.secondary};
    text-decoration: underline;
  }
  @media screen and (max-width: 900px) {
    margin-top: 15px;
  }
`
export const Skeleton = styled(_Skeleton)`
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
export const PreferredWrapper = styled.div`
  position: relative;
  padding: 5px 10px 10px;
  border-radius: 16px;
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  margin-top: 17px;
  width: calc(100% + 22px);
  margin-left: -11px;
`
export const PreferredBadge = styled.div`
  color: ${(p) => p.theme.colors.secondary};
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  background: ${(p) => p.theme.colors.modalBg};
  font-size: 12px;
  line-height: 16px;
  border-radius: 16px;
  text-transform: uppercase;
  position: absolute;
  top: -12px;
  padding: 2px 8px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  cursor: pointer;
  @media screen and (max-width: 448px) {
    font-size: 10px;
  }
`
export const ContractsWrapper = styled.div`
  width: 100%;
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
  /* &:last-of-type {
    margin-right: 0;
  } */

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
    padding: 0 30px 0 10px;
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

export const SelectName = styled.h4`
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.secondary};
`

export const SelectMenu = styled(MenuItem)`
  padding: 15px 15px 15px 20px;
`

export const TooltipInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 18px;
`

export const TooltipButtonWrapper = styled.div`
  margin-top: 10px;
`
