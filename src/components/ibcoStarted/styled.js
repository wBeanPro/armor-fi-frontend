import styled, { css } from 'styled-components'
import _InputAdornment from '@material-ui/core/InputAdornment'
import _Button from '@material-ui/core/Button'
import { Title } from '../common/Title'
import { InputField } from '../common/Input'

export const Container = styled.div`
  padding-bottom: 40px;

  @media screen and (max-width: 1300px) {
    padding-top: 60px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 750px;
    margin: 0 auto;
  }
  @media screen and (max-width: 1100px) {
    padding-top: 0;
    max-width: 700px;
  }
`
export const TitleStyled = styled(Title)`
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
`
export const Wrapper = styled.div`
  position: relative;
  margin: 15px auto 0;
  align-items: center;
  justify-content: space-between;
  max-width: 930px;
  display: flex;
  flex-flow: row wrap;
  flex: 1 100%;
  @media screen and (max-width: 1200px) {
    justify-content: space-around;
    margin-top: 35px;
  }
  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`
export const ProgressContainer = styled.div`
  order: ${(p) => (p.first ? '1' : '3')};
  position: relative;
  z-index: 2;

  @media screen and (max-width: 1200px) {
    order: unset;
  }
  @media screen and (max-width: 600px) {
    width: 49%;
  }
`
export const LogoContainer = styled.div`
  position: absolute;
  z-index: 1;

  ${(p) =>
    p.logo1
      ? css`
          top: -20px;
          right: 40px;
          width: 21px;
        `
      : p.logo2
      ? css`
          top: 0;
          right: -40px;
          width: 30px;
        `
      : p.logo3
      ? css`
          bottom: -10px;
          right: -30px;
          width: 40px;
        `
      : p.logo4
      ? css`
          top: 45px;
          right: 60px;
          width: 15px;
        `
      : p.logo5
      ? css`
          top: -10px;
          left: 30px;
          width: 18px;
        `
      : p.logo6
      ? css`
          top: 40px;
          left: -35px;
          width: 26px;
        `
      : css`
          bottom: 20px;
          left: -40px;
          width: 41px;
        `}

  @media screen and (max-width: 1200px) {
    display: none;
  }
`
export const MiddleCircle = styled.div`
  flex: 3 0px;
  order: 2;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 1200px) {
    order: unset;
    flex: inherit;
    margin-top: -20px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: -30px;
  }
`
export const ActionContainer = styled.div`
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  margin: -40px auto 0;
  max-width: 935px;
  width: 100%;
  position: relative;
  z-index: 5;
  padding: 30px 70px 40px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;

  @media screen and (max-width: 1200px) {
    max-width: 850px;
    justify-content: space-between;
    padding: 30px 20px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    padding: 26px 40px;
  }
`
export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
export const InputLabel = styled.label`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
  & span {
    font-weight: normal;
  }
`
export const TextField = styled(InputField)`
  margin-top: 10px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
export const InputAdornment = styled(_InputAdornment)`
  & p {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: ${(p) => p.theme.colors.strongDefault};
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
  }
`
export const ArrowDivider = styled.div`
  display: flex;
  align-items: center;
  height: 40px;

  @media screen and (max-width: 600px) {
    margin: 2px auto;
    transform: rotateZ(90deg);
  }
`
export const Button = styled(_Button)`
  height: 40px;
  background: ${(p) =>
    p.disabled ? p.theme.colors.disabledText : p.theme.colors.active};
  box-shadow: ${(p) =>
    p.disabled ? 'none' : `0px 0px 12px ${p.theme.colors.defaultLightActive}`};
  border-radius: 6px;
  border: none;
  min-width: fit-content;
  &:hover {
    background: ${(p) => p.theme.colors.active};
    box-shadow: 0px 0px 12px ${(p) => p.theme.colors.defaultLightActive};
    border: none;
    &.Mui-disabled {
      background: ${(p) => p.theme.colors.active};
    }
  }

  @media screen and (max-width: 900px) {
    margin-left: 20px;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0;
    margin-top: 25px;
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
