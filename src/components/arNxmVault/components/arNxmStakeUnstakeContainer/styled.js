import styled from 'styled-components'
import { ButtonStyled } from '../../../common/Button'
import { InputField } from '../../../common/Input'

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 27px;
  background-color: ${(p) => p.theme.colors.defaultArrow};
  padding: 25px 15px;
  border-radius: 16px;
  align-items: stretch;
  @media screen and (max-width: 990px) {
    flex-wrap: wrap;
    padding: 0 15px 15px;
  }
  @media screen and (max-width: 650px) {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`
export const Action = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 285px;
  width: 100%;
  margin: 0 10px;
  @media screen and (max-width: 990px) {
    margin-top: 30px;
  }

  @media screen and (max-width: 650px) {
    margin: 30px 0 0;
    max-width: 350px;
  }
`
export const ActionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const InputTitle = styled.p`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.secondary};
  & span {
    font-weight: normal;
  }
`
export const MaxButton = styled.p`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.active};
  cursor: pointer;
  padding: 3px;
  text-align: right;
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
export const BalancesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`
export const Value = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors._default};
  margin-top: 4px;
`
