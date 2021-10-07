import styled from 'styled-components'
import { CoverContainer } from '../../../common/CoverContainer'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import { InputField } from '../../../common/Input'

export const Container = styled(CoverContainer)`
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  max-width: 575px;
  width: 100%;
  margin: 40px auto 0;
`
export const ContentContainer = styled.div`
  padding: 21px 15px 30px;

  @media screen and (max-width: 500px) {
    padding: 21px 10px 30px;
  }
`
export const ModalTitle = styled.h4`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  color: ${(p) => p.theme.colors.primaryDefault};
`
export const CancelButton = styled(Button)`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  cursor: pointer;
  margin: 20px auto 0;
  max-width: fit-content;
  padding: 6px 10px;
  color: ${(p) => p.theme.colors.primaryLightTrue};
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: center;
`
export const ActionContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 5px;
  flex-wrap: wrap;
`
export const Input = styled(InputField)`
  max-width: 186px;
  width: 100%;
  max-height: 28px;
  margin-top: 5px;
  & .MuiOutlinedInput-input {
    padding: 7px 14px;
  }
  & .MuiOutlinedInput-root {
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
export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: ${(p) => (p.space ? '24px' : '15px')};
  width: 100%;
  align-items: center;
  color: ${(p) => p.theme.colors._default};
`
export const SimpleButton = styled.span`
  margin: 0 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  padding: 3px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.active};
  cursor: pointer;
  font-weight: bold;

  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
`
export const InputWrapper = styled.div``
export const Buttons = styled.div`
  & button {
    max-height: 28px;
    padding: 6px;
  }

  @media screen and (max-width: 500px) {
    & button {
      margin-left: 10px;
      margin-top: 20px;
    }
  }
`
export const FooterInfo = styled.div`
  margin-top: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors._default};
  & svg {
    max-width: 22px;
    height: 22px;
    width: 100%;
    margin-right: 10px;
  }
`
