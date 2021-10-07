import styled from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Paragraph } from '../common/Paragraph'
import { ButtonStyled } from '../common/Button'
import { InputField } from '../common/Input'

export const ModalTitle = styled(Paragraph)`
  font-weight: bold;
  background: ${(p) => p.theme.colors.lightSecondary};
  border-radius: 6px 6px 0px 0px;
  padding: 20px 10px;
  text-align: center;
`
export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 28px;
  max-width: 285px;
  width: 100%;
  margin: 0 auto;
`
export const Input = styled(InputField)`
  max-width: 285px;
  width: 100%;
  & .MuiOutlinedInput-root {
    background: ${(p) => p.theme.colors.primaryDefault};
    border: none;
    box-shadow: none;
    max-height: 36px;
    & .MuiOutlinedInput-input {
      max-height: 36px;
      padding: 11px 14px;
    }
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
  }
`
export const ActiveBtn = styled(ButtonStyled)`
  padding: 10px 32px;
  margin-top: 26px;
`
export const ActiveBtnText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
`
export const MaxButton = styled.p`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  padding: 2px;
  color: ${(p) => p.theme.colors.active};
  cursor: pointer;
  margin: 26px 0 0 auto;
`
