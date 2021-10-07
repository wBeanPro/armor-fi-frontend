import styled from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Paragraph } from '../common/Paragraph'
import { ButtonStyled } from '../common/Button'
import { InputField } from '../common/Input'

export const ModalTitle = styled(Paragraph)`
  font-weight: bold;
  background: ${(p) => p.theme.colors.transparentBg};
  border-radius: 16px 16px 0px 0px;
  padding: 20px 10px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
`
export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 28px;
`
export const Input = styled(InputField)`
  margin-top: 26px;
  max-width: 285px;
  width: 100%;
  .MuiOutlinedInput-root {
    box-shadow: none;
    background: ${(p) => p.theme.colors._default};
    border: none;
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
  padding: 6px 15px;
  height: unset;
  min-height: 36px;
  margin-top: 26px;
  box-shadow: none;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  border-radius: 6px;
  &.MuiButton-contained.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    & h4 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }
`
export const ActiveBtnText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
`
