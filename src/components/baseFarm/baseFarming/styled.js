import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'
import _Skeleton from '@material-ui/lab/Skeleton'

export const ActionButton = styled(Button)`
  border-radius: 6px;
  padding: 6px 10px;
  margin: ${(p) => (p.tooltipbutton ? '5px 0 0' : '15px 5px 0')};
  font-size: 14px;
  ${(p) =>
    p.secondary
      ? css`
          background: transparent;
          border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
          box-shadow: none;
          padding: 5px 10px;
          &:hover {
            background: transparent;
          }
        `
      : css`
          background: ${(p) => p.theme.colors.buttonActiveBg};
          box-shadow: none;
          &:hover {
            background: ${(p) => p.theme.colors.buttonActiveBg};
          }
        `}
  &.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    border: none;
    & h5 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 10px 17px;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    padding: 0 5px 17px;
  }
`
export const ContractBox = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  margin-top: 10px;
`
export const ContractTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.primaryDefault};
  margin: 15px 10px 0;
  & a {
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    color: ${(p) => p.theme.colors.active};
    margin-left: 5px;
  }
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    & a {
      margin-left: 0;
    }
  }
`
export const CurrentRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1px 10px 16px;
  flex-wrap: wrap;
  background: ${(p) => p.theme.colors.transparentBg};
`
export const CurrentTitle = styled.h3`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors._default};
  display: flex;
  align-items: center;
  text-align: center;
  margin: 15px 5px 0;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`
export const Logo = styled.img`
  height: 24px;
  width: 24px;
  z-index: 2;
`
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`
export const NameContainer = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  margin-top: 15px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
export const RightNameContainer = styled.div`
  flex: 1;
  text-align: right;
  align-items: center;
  margin-top: 15px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
export const NameText = styled.h3`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 23px;
  color: ${(p) => p.theme.colors.primaryDefault};
  margin: 0 20px 0 6px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 20px;
    margin: 0 15px 0 6px;
  }
`
export const Skeleton = styled(_Skeleton)`
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
export const SpanTextContent = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  margin-left: 8px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`
export const SpanTextColored = styled(SpanTextContent)`
  color: ${(p) =>
    p.colored ? p.theme.colors.activeSearch : p.theme.colors.secondary};
`
export const TotalContent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`
export const TotalRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1px 10px 16px;
  position: relative;
  background: ${(p) => p.theme.colors.transparentBg};
  margin-top: 2px;
`
export const ContractHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 7px 14px 30px 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    justify-content: space-around;
  }
  @media screen and (max-width: 600px) {
    padding: 7px 10px 30px;
  }
`
export const ButtonText = styled.h5`
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.02em;
  &.main {
    color: ${(p) => p.theme.colors.secondary};
  }
  &.secondary {
    color: ${(p) => p.theme.colors.active};
  }
`
export const Wrapper = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  margin-top: 32px;
  overflow: hidden;
`
export const TooltipInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 18px;
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
