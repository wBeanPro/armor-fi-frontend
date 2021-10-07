import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import _TextField from '@material-ui/core/TextField'
import { ButtonStyled } from '../common/Button'

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 20px 15px 100px;

  img {
    z-index: 1;
  }
  @media screen and (max-width: 768px) {
    padding: 50px 15px;
  }
`
export const ComingSoon = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: ${(p) => p.theme.colors.secondaryDefault};
  color: ${(p) => p.theme.colors.disabledText};
  border-radius: 50px;
  height: 47px;
  max-width: 375px;
  width: 100%;
`
export const PasswordForm = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const EnterButton = styled(ButtonStyled)`
  box-shadow: none;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 4px 12px;

  & .MuiButton-label {
    text-transform: none;
    color: ${(p) => p.theme.colors.secondary};
    font-weight: bold;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
  }
  & svg {
    height: 25px;
    width: 25px;
    margin-right: 8px;
  }
  & .MuiButton-startIcon {
    margin-right: 0;
  }
`
export const TextField = styled(_TextField)`
  margin-right: 15px;
  height: 36px;
  & .MuiOutlinedInput-root {
    color: ${(p) => p.theme.colors.secondary};
    font-family: 'Open Sans', sans-serif;
    background: ${(p) => p.theme.colors.primaryDefault};
    border-radius: 6px;
  }
  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-input {
    padding: 0 12px;
    height: 36px;
    color: ${(p) => p.theme.colors.strongDefault};
  }
  @media screen and (max-width: 350px) {
    max-width: 175px;
  }
`
export const Wrapper = styled.div`
  display: flex;
  margin-left: -235px;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: 900px) {
    margin-left: 0;
  }
`
