import styled, { css } from 'styled-components'
import { ButtonStyled } from '../../../common/Button'
import { InputField } from '../../../common/Input'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  width: 100%;
  max-width: 250px;
  margin: 0 10px;
  @media screen and (max-width: 990px) {
    margin-top: 30px;
  }
  @media screen and (max-width: 650px) {
    margin: 30px 0 0;
    max-width: 350px;
  }
`

export const Button = styled(ButtonStyled)`
  width: 100%;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  box-shadow: none;
  border-radius: 6px;
  border: none;
  height: unset;
  min-height: 36px;
  padding: 6px 12px;
  &.MuiButton-contained.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    & h4 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }
  &:hover {
    background: ${(p) => p.theme.colors.buttonActiveBg};
    border: none;
  }
`

export const ButtonWithTooltip = styled.div`
  margin-top: 16px;
`

export const ButtonText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
`

export const Input = styled(InputField)`
  padding: 0px 0px 12px 0px;
  margin-top: 24px;
  width: 100%;
`

export const Title = styled.h2`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: ${(p) => p.theme.colors.active};
  padding: 0 5px;
  ${(p) =>
    p.quote &&
    css`
      color: ${(p) => p.theme.colors.disabledText};
    `};
`
export const TitleWrapper = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Info = styled.h5`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
  align-self: flex-start;
`

export const HelpIcon = styled(HelpOutlineIcon)`
  width: 20px;
  color: ${(p) => p.theme.colors.active};
`

export const ActionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const InputTitle = styled.p`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.secondary};
  & b {
    font-weight: bold;
    margin-left: 5px;
  }
`
export const MaxButton = styled.p`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.active};
  cursor: pointer;
  padding: 3px;
`
export const TextField = styled(InputField)`
  margin-top: 4px;
  color: ${(p) => p.theme.colors.disabledText};
  & .MuiOutlinedInput-root {
    background: ${(p) => p.theme.colors.primaryDefault};
    border: 1px solid ${(p) => (p.error ? p.theme.colors.error : 'transparent')};
    box-shadow: none;
  }
  & .MuiOutlinedInput-input {
    color: ${(p) => p.theme.colors.strongDefault};
    padding: 11px 14px;
  }
`
export const Action = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  width: 100%;

  @media screen and (max-width: 650px) {
    max-width: 350px;
  }
`
export const Value = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors._default};
  margin-top: 4px;
`
export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-right: 6px;
  width: 100%;
  display: flex;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
