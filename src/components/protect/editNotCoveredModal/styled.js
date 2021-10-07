import styled from 'styled-components'
import { CoverContainer } from '../../common/CoverContainer'
import InputAdornment from '@material-ui/core/InputAdornment'
import { ButtonStyled } from '../../common/Button'
import { InputField } from '../../common/Input'
import Button from '@material-ui/core/Button'

export const ModalTitle = styled.h4`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  color: ${(p) => p.theme.colors.primaryDefault};
`
export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  flex-wrap: wrap;

  @media screen and (max-width: 350px) {
    flex-direction: column;
  }
`
export const Input = styled(InputField)`
  max-width: 186px;
  width: 100%;
  max-height: 28px;
  margin-top: 15px;
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
export const ActiveBtn = styled(ButtonStyled)`
  padding: 6px;
  height: unset;
  box-shadow: none;
  margin: 0;
  margin-left: 16px;
  margin-top: 15px;
  background: ${(p) => p.theme.colors.buttonActiveBg};

  &.MuiButton-contained.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    & h4 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }

  @media screen and (max-width: 350px) {
    margin-left: 0;
  }
`
export const ActiveBtnText = styled.h4`
  color: ${(p) => p.theme.colors.secondary};
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
`
export const Container = styled(CoverContainer)`
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  margin-top: 32px;
`
export const ContentContainer = styled.div`
  padding: 21px 15px;
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
export const MainInfo = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  margin-top: 25px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 550px) {
    margin-top: 20px;
    &:last-of-type {
      margin-top: 10px;
    }
  }
`
export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`
export const Value = styled.span`
  color: ${(p) => p.theme.colors.primaryLightTrue};
  font-weight: ${(p) => (p.secondary ? 'normal' : 'bold')};
  margin: 0 10px;
`
