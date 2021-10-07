import styled, { css } from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Paragraph } from '../../common/Paragraph'
import { ButtonStyled } from '../../common/Button'
import { InputField } from '../../common/Input'

export const ModalTitle = styled(Paragraph)`
  border-radius: 6px 6px 0px 0px;
  text-align: center;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 23px;
  color: ${(p) => p.theme.colors.primaryDefault};
  background: ${(p) => p.theme.colors.transparentBg};
  padding: 15px 10px;
`
export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px 10px 28px;
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
  background: ${(p) => p.theme.colors.buttonActiveBg};
  box-shadow: none;
  padding: 6px 10px;
  height: unset;
  margin-top: 15px;
  &:hover {
    background: ${(p) => p.theme.colors.buttonActiveBg};
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
export const MaxButton = styled.span`
  margin: 0 7px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  padding: 3px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.active};
  cursor: pointer;
  font-weight: bold;
`
export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  color: ${(p) => p.theme.colors.secondary};
`
export const Info = styled.span`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 17px;
  color: ${(p) => p.theme.colors.secondary};
  text-align: left;
  display: block;
  width: 100%;

  & span {
    font-weight: bold;
  }
`
