import styled, { css } from 'styled-components'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import { ButtonStyled } from '../common/Button'
import { InputField } from '../common/Input'

export const ActionsContainer = styled.div`
  display: flex;
  border-top: 1px solid ${(p) => p.theme.colors.secondaryDefault};
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
  max-width: 50%;
  width: 100%;
  margin: 0 auto;
  padding: 16px 30px 20px;
  ${(p) =>
    p.quote &&
    css`
      background: ${(p) => p.theme.colors.disabledDefault};
    `}
  @media screen and (max-width: 900px) {
    max-width: 100%;
  }
  @media screen and (max-width: 600px) {
    padding: 16px 10px 20px;
  }
`
export const Title = styled.h2`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: ${(p) => p.theme.colors.active};
  ${(p) =>
    p.quote &&
    css`
      color: ${(p) => p.theme.colors.disabledText};
    `}
`
export const Input = styled(InputField)`
  padding: 0px 0px 12px 0px;
  margin-top: 3px;
`
export const InputInfo = styled(InputAdornment)`
  & p {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: ${(p) => p.theme.colors.strongDefault};
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
  }
`
export const Info = styled.span`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
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
export const SelectIconName = styled.h5`
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
  margin-top: 25px;
`
export const ActionButton = styled(ButtonStyled)`
  ${(p) =>
    p.disabled &&
    css`
      background: ${(p) => p.theme.colors.disabledText};
      box-shadow: none;
    `}
  &.applyBtn {
    margin-top: 13px;
  }
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
  color: ${(p) => p.theme.colors.strongDefault};
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
  background: ${(p) => p.theme.colors.secondaryDefault};
  height: 1px;
  margin-top: 13px;
`
export const FieldTitle = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primary};
`
export const FieldValue = styled.h4`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  color: ${(p) => p.theme.colors.primary};
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
    margin-top: 38px;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  width: 100%;
  align-items: center;
`
export const SimpleButton = styled.span`
  margin: 0 7px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  padding: 3px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.active};
  cursor: pointer;
`
