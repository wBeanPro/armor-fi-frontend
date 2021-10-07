import styled from 'styled-components'
import { CoverContainer } from '../common/CoverContainer'
import InputAdornment from '@material-ui/core/InputAdornment'
import { InputField } from '../common/Input'
import { ButtonStyled } from '../common/Button'
import { BorderGradientContainer } from '../common/BorderGradientContainer'
import Button from '@material-ui/core/Button'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  left: 0;
  top: 0;
  margin-left: -235px;

  @media screen and (max-width: 1150px) {
    margin-left: 0;
  }
`
export const Container = styled.div`
  flex: 1;
  max-width: 725px;
  width: 100%;
  padding: 16px 15px 48px;
  margin: 0 auto;

  @media screen and (max-width: 1500px) {
    padding-top: 50px;
  }
  @media screen and (max-width: 1300px) {
    padding-top: 80px;
  }
`
export const Title = styled.h2`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: ${(p) => p.theme.colors.defaultLightActive};
`
export const Description = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  margin-top: 38px;
  @media screen and (max-width: 548px) {
    margin-top: 30px;
  }
`
export const Box = styled(CoverContainer)`
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  margin-top: 70px;
  @media screen and (max-width: 548px) {
    margin-top: 50px;
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
export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  @media screen and (max-width: 400px) {
    margin-top: 0;
    flex-direction: column;
  }
`
export const Input = styled(InputField)`
  max-width: 115px;
  width: 100%;
  max-height: 28px;
  & .MuiOutlinedInput-input {
    padding: 7px 14px;
  }
  & .MuiOutlinedInput-root {
    box-shadow: none;
    background: ${(p) => p.theme.colors._default};
    border: none;
  }
  @media screen and (max-width: 400px) {
    margin-top: 15px;
    max-width: 160px;
  }
`
export const InputInfo = styled(InputAdornment)`
  & p {
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    text-transform: uppercase;
    color: ${(p) => p.theme.colors.primary};
  }
`
export const ActiveBtn = styled(ButtonStyled)`
  padding: 6px;
  height: unset;
  box-shadow: none;
  max-width: fit-content;
  width: 100%;
  display: block;
  margin-left: 16px;
  @media screen and (max-width: 400px) {
    margin-top: 15px;
    margin-left: 0;
    max-width: 160px;
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
  text-transform: uppercase;
`
export const ContentContainer = styled.div`
  padding: 21px 15px 15px;
`
export const MainInfo = styled.div`
  max-width: 460px;
  width: 100%;
  margin: 0 auto;
  padding: 22px 0 35px;
`
export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.disabledText};
  & svg {
    max-width: 24px;
    height: 24px;
    width: 100%;
    margin-right: 10px;
  }
`
export const AnalyzingBox = styled(BorderGradientContainer)`
  & svg {
    max-width: 24px;
    width: 100%;
    height: auto;
    min-width: 24px;
  }
  position: relative;
  overflow: hidden;

  &::after {
    -webkit-animation: analyzing 2s ease-in-out infinite both;
    animation: analyzing 2s ease-in-out infinite both;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    @-webkit-keyframes analyzing {
      0% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 0;
      }
      50% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 1;
      }
      100% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 0;
      }
    }
    @keyframes analyzing {
      0% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 0;
      }
      50% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 1;
      }
      100% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 0;
      }
    }
  }
`
export const AnalizingText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.secondary};
  margin-left: 8px;
`
export const CenterContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
