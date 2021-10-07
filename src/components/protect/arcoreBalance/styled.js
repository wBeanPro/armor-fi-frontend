import styled, { css } from 'styled-components'
import { ButtonStyled } from '../../common/Button'
import { CoverContainer } from '../../common/CoverContainer'

export const Container = styled(CoverContainer)`
  position: relative;
  overflow: hidden;
  margin-top: 32px;
`
export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-left: 6px;
  width: 100%;
  display: flex;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
export const ContentBox = styled.div`
  padding: 5px 17px 23px;
`
export const Title = styled.h3`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 140%;
  color: ${(p) => p.theme.colors.primaryDefault};
  display: flex;
  align-items: center;
  margin-top: 13px;
`
export const Button = styled(ButtonStyled)`
  color: ${(p) =>
    p.transparent ? p.theme.colors.active : p.theme.colors.secondary};
  font-weight: bold;
  box-shadow: none;
  background: ${(p) =>
    p.transparent ? 'transparent' : p.theme.colors.buttonActiveBg};
  height: unset;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 13px;

  ${(p) =>
    p.transparent &&
    css`
      border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
      padding: 5px 6px;
      margin-right: 16px;
      &:hover {
        background: transparent;
        border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
      }
    `}

  @media screen and (max-width: 768px) {
    margin-top: 15px;
  }
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
export const InfoText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors._default};
  display: flex;
  align-items: center;
  width: 50%;

  @media screen and (max-width: 768px) {
    width: 100%;
    &:last-of-type {
      margin-top: 10px;
    }
  }
`
export const ValueInfo = styled.span`
  font-weight: bold;
`
export const ColoredValue = styled.span`
  margin-left: 5px;
  color: ${(p) =>
    p.active
      ? p.theme.colors.activeSearch
      : p.contrast
      ? p.theme.colors.error
      : p.theme.colors.secondary};
`
