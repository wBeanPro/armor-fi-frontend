import styled, { css } from 'styled-components'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { ButtonStyled } from '../common/Button'
import { InputField } from '../common/Input'
import Skeleton from '@material-ui/lab/Skeleton'
import { Paragraph } from '../common/Paragraph'

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`
export const TradeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 285px;
  &:first-of-type {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }

  @media screen and (max-width: 900px) {
    max-width: 70%;
    margin: 23px auto 0;
    &:first-of-type {
      margin-right: auto;
    }
    &:last-of-type {
      margin-left: auto;
    }
  }
  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
`
export const Title = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  width: 100%;
  color: ${(p) =>
    p.quote ? p.theme.colors.strongDefault : p.theme.colors._default};
`
export const Input = styled(InputField)`
  padding: 0px;
  margin-top: 3px;

  & .MuiOutlinedInput-root {
    background: ${(p) => p.theme.colors.primaryDefault};
    border: 1px solid ${(p) => (p.error ? p.theme.colors.error : 'transparent')};
    box-shadow: ${(p) =>
      p.error ? `0px 0px 8px ${p.theme.colors.error}` : 'none'};
  }
  & .MuiOutlinedInput-input {
    color: ${(p) => p.theme.colors.strongDefault};
    padding: 11px 14px;
  }
  & .MuiFormHelperText-contained {
    margin: 4px 0 0;
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
export const Info = styled.span`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => (p.error ? p.theme.colors.error : p.theme.colors._default)};
`
export const Dropdown = styled(TextField)`
  font-family: 'Open Sans', sans-serif;
  & .MuiSelect-select {
    ${(p) =>
      p.hideArrow ? 'padding: 6px 0 6px 6px;' : 'padding: 6px 24px 6px 6px;'}
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
  & .MuiSvgIcon-root {
    ${(p) => (p.hideArrow ? 'display: none;' : '')}
  }
`
export const SelectMenu = styled(MenuItem)`
  padding: 15px 15px 15px 20px;
  min-width: 200px;
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
export const Buttons = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${(p) => (p.quotespace ? '28px' : '27px')};
`
export const ActionButton = styled(ButtonStyled)`
  box-shadow: none;
  height: unset;
  padding: 6px 12px;
  min-height: 36px;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  ${(p) =>
    p.disabled &&
    css`
      background: ${(p) => p.theme.colors.strongDefault};
      box-shadow: none;
      &.MuiButton-outlined.Mui-disabled {
        border: none;
      }
    `}
`
export const ButtonText = styled.h5`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  display: flex;
  align-items: center;
  text-transform: uppercase;
  & svg {
    margin-left: 10px;
  }
`
export const NoCoverAvailableInfo = styled.h5`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin-top: 5px;
  color: ${(p) => p.theme.colors.secondary};
`
export const QuoteContainer = styled.div`
  border-radius: 24px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  margin-top: 24px;
  justify-content: space-between;
`
export const Field = styled.div`
  width: 100%;
  margin-top: 13px;
  display: flex;
  justify-content: space-between;
  &:first-of-type {
    margin-top: 0;
  }
`
export const Divider = styled.div`
  width: 100%;
  background: ${(p) => p.theme.colors.tradeDivider};
  height: 1px;
  margin-top: 13px;
`
export const FieldTitle = styled.h4`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.lightSecondary};
  font-weight: normal;
`
export const FieldValue = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: right;
  color: ${(p) => p.theme.colors.lightSecondary};
`
export const FieldAdress = styled(FieldValue)`
  color: ${(p) => p.theme.colors.active};
  text-decoration: underline;
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
`
export const QuoteSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  height: 100%;
  justify-content: space-between;
`
export const QuoteSkeletonPair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 14px;
  & .MuiSkeleton-text {
    transform: none;
  }
  &:last-of-type {
    margin-top: 25px;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: ${(p) => (p.space ? '24px' : '15px')};
  width: 100%;
  align-items: center;
  color: ${(p) => p.theme.colors._default};
`
export const SimpleButton = styled.span`
  margin: 0 7px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  padding: 3px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.active};
  cursor: pointer;
  font-weight: bold;
`
export const StyledSkeleton = styled(Skeleton)`
  background: ${(p) =>
    p.large ? p.theme.colors.tradeSkeletonButton : p.theme.colors.tradeDivider};
  border-radius: 6px;
`
export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-left: 6px;
  width: 100%;
  display: flex;
  cursor: pointer;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
export const TooltipWrapper = styled.div`
  position: absolute;
  right: -26px;
  top: 13px;
  @media screen and (max-width: 600px) {
    position: relative;
    right: 0;
  }
`
export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  @media screen and (max-width: 600px) {
    align-items: flex-start;
  }
`
export const HelperTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
`
