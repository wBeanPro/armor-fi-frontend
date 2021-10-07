import styled, { css } from 'styled-components'
import { ButtonStyled } from '../common/Button'
import { InputField } from '../common/Input'
import _Skeleton from '@material-ui/lab/Skeleton'

export const MainTitle = styled.h2`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: ${(p) => p.theme.colors.defaultLightActive};
`
export const Box = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 27px;
  background: ${(p) => p.theme.colors.defaultArrow};
  padding: 25px 15px;
  border-radius: 16px;
  @media screen and (max-width: 990px) {
    flex-wrap: wrap;
    padding: 0 15px 15px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`
export const Action = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 285px;
  width: 100%;
  margin: 0 10px;

  @media screen and (max-width: 990px) {
    margin: 30px 0 0;
  }

  @media screen and (max-width: 600px) {
    max-width: 350px;
    &:last-of-type {
      margin: 30px 0 0;
    }
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
  color: ${(p) => p.theme.colors.strongDefault};
  & span {
    font-weight: normal;
  }
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
  margin-top: 16px;
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
export const ButtonText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
`
export const WrapSkeleton = styled.div`
  margin-top: 27px;
`
export const Skeleton = styled(_Skeleton)`
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
