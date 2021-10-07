import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'
import { ButtonStyled } from '../common/Button'
import _Skeleton from '@material-ui/lab/Skeleton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

export const DropdownStyled = styled(TextField)`
  max-width: ${(p) => (p.large ? '140px' : '125px')};
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
export const MigrateBox = styled.div`
  max-width: 695px;
  width: 100%;
  margin: 32px auto 0;
  padding: 20px 20px 40px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const MigrateLink = styled.a`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-decoration-line: underline;
  color: ${(p) => p.theme.colors.active};
  display: flex;
  align-items: center;
  margin-top: 13px;
  & svg {
    margin-left: 6px;
  }
`
export const MigrateContract = styled.div`
  display: flex;
  align-items: center;
  margin-top: 27px;
  & a {
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    color: ${(p) => p.theme.colors.active};
    margin-left: 5px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
export const MigrateContractTitle = styled.h3`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.disabledText};
`
export const MigrateButton = styled(ButtonStyled)`
  margin-top: 32px;
`
export const ButtonText = styled.h5`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  &.main {
    color: ${(p) => p.theme.colors.secondary};
  }
  &.secondary {
    color: ${(p) => p.theme.colors.primary};
  }
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
export const Logo = styled.img`
  position: relative;

  ${(p) =>
    p.secondary
      ? css`
          z-index: 1;
          margin-left: -5px;
        `
      : css`
          z-index: 2;
        `}
`
export const NameText = styled.h3`
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: ${(p) => p.theme.colors.primary};
  margin: 0 24px 0 16px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 22px;
    margin: 0 15px 0 12px;
  }
`
export const MarketLink = styled.a`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-decoration-line: underline;
  color: ${(p) => p.theme.colors.active};
  display: flex;
  align-items: center;
  & svg {
    margin-left: 6px;
  }
`
export const ContractTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.strongDefault};
  margin: 15px 10px 0;
  & a {
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    color: ${(p) => p.theme.colors.active};
    margin-left: 24px;
  }
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    & a {
      margin-left: 0;
    }
  }
`
export const BgGradient = styled.div`
  background: ${(p) => p.theme.colors.tradeDivider};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
`
export const CurrentTitle = styled.h3`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.strongDefault};
  display: flex;
  align-items: center;
  text-align: center;
  margin: 15px 5px 0;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`
export const TextContent = styled.span`
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
export const CurrentRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px 10px;
  flex-wrap: wrap;
`
export const TotalRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 10px 20px;
  position: relative;
`
export const TotalTitle = styled.h3`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.disabledText};
  & svg {
    margin-right: 10px;
  }
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`
export const TotalContent = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
  flex-wrap: wrap;
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    padding: 20px 10px;
  }
`
export const ActionButton = styled(Button)`
  border-radius: 6px;
  padding: 8px 10px;
  margin-top: 15px;
  font-size: 14px;
  ${(p) =>
    p.secondary
      ? css`
          background: ${(p) => p.theme.colors.secondaryDefault};
          box-shadow: none;
        `
      : css`
          background: ${(p) => p.theme.colors.active};
          box-shadow: 0px 0px 12px ${(p) => p.theme.colors.defaultLightActive};
        `}
`
export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0 -23px;

  @media screen and (max-width: 1200px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 548px) {
    margin-top: 25px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`

export const TokensWrapper = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 548px) {
    flex-wrap: wrap;
    justify-content: space-around;
  }
`

export const TokenButton = styled(Button)`
  text-transform: none;
  min-width: 220px;
  margin: 10px;
  height: 40px;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  background: white;
  box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primaryDefault};
  color: #4d5461;
  img {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }
  @media screen and (max-width: 1200px) {
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 548px) {
    &:first-of-type {
      margin-left: 10px;
    }
    &:last-of-type {
      margin-right: 10px;
    }
  }
`
export const LogoSkeleton = styled(_Skeleton)`
  margin-right: 16px;
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
export const Skeleton = styled(_Skeleton)`
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
export const Flex = styled.div`
  display: flex;
  margin-top: 15px;
`
export const BlurredWrapper = styled.div`
  position: relative;
`

export const Blur = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  height: calc(100% + 20px);
  width: calc(100% + 20px);
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 6px;
  margin: -10px;
  box-shadow: 0px 0px 15px 5px rgba(255, 255, 255, 0.3);
`
export const SkeletonAPY = styled(Skeleton)`
  width: 50px;
`
export const RewardsActiveWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
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
export const CheckboxLabel = styled(FormControlLabel)`
  margin: 0;
  position: relative;
`
export const Checkmark = styled.div`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translate(-50%, -50%);
  height: 16px;
  width: 16px;
  border: 1px solid ${(p) => p.theme.colors.active};
  box-sizing: border-box;
  border-radius: 3px;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 8px;
    width: 8px;
    background: ${(p) => p.theme.colors.active};
    border-radius: 1px;
    opacity: 0;
  }
`

export const AssetCheckbox = styled(Checkbox)`
  height: 35px;
  width: 35px;
  position: relative;
  ${(p) =>
    p.isArrNotEmpty
      ? css`
          ~ ${Checkmark} {
            &::before {
              opacity: 0.2;
            }
          }
        `
      : css``}
  &:hover {
    ~ ${Checkmark} {
      &::before {
        opacity: 0.2;
      }
    }
  }
  &.Mui-checked {
    ~ ${Checkmark} {
      &::before {
        opacity: 1;
      }
    }
  }
  & .MuiSvgIcon-root {
    fill: ${(p) => p.theme.colors.active};
    display: none;
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
export const DropdownContainer = styled.div`
  background: ${(p) => p.theme.colors.modalBg};
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
