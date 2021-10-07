import styled from 'styled-components'
import { Paragraph } from '../Paragraph'
import { ButtonStyled } from '../Button'

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
export const ActiveBtn = styled(ButtonStyled)`
  padding: 8px 15px;
  margin-right: 20px;
  min-height: 36px;
  height: unset;
  box-shadow: none;
  color: ${(p) => p.theme.colors.secondary};
  background: ${(p) => p.theme.colors.buttonActiveBg};
  &.MuiButton-contained.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    & h4 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }
  &:last-of-type {
    margin-right: 0;
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
export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
export const ModalText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  padding: 20px 10px;
  color: ${(p) => p.theme.colors.secondary};
`
