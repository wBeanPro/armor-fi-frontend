import styled, { css } from 'styled-components'
import { ButtonStyled } from '../common/Button'
import { InputField } from '../common/Input'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  max-width: 250px;
  @media screen and (max-width: 990px) {
    margin-top: 30px;
  }
  @media screen and (max-width: 650px) {
    max-width: 350px;
  }
`

export const Button = styled(ButtonStyled)`
  width: 100%;
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

export const Input = styled(InputField)`
  padding: 0px 0px 12px 0px;
  margin-top: 24px;
  width: 100%;
`

export const Title = styled.h2`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: ${(p) => p.theme.colors.active};
  padding: 0 5px;
  ${(p) =>
    p.quote &&
    css`
      color: ${(p) => p.theme.colors.disabledText};
    `};
`
export const TitleWrapper = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Info = styled.h5`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
  align-self: flex-start;
`

export const HelpIcon = styled(HelpOutlineIcon)`
  width: 20px;
  height: 20px;
  color: ${(p) => p.theme.colors.active};
`

export const ActionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const InputTitle = styled.p`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
  & span {
    font-weight: normal;
    margin-left: 5px;
  }
`
export const MaxButton = styled.p`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.active};
  cursor: pointer;
  padding: 3px;
`
export const TextField = styled(InputField)`
  margin-top: 4px;
  color: ${(p) => p.theme.colors.disabledText};
`
export const Action = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  width: 100%;

  @media screen and (max-width: 650px) {
    max-width: 350px;
  }
`
