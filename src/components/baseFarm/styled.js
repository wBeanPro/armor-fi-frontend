import styled, { css } from 'styled-components'
import Button from '@material-ui/core/Button'
import { ButtonStyled } from '../common/Button'
import Skeleton from '@material-ui/lab/Skeleton'

export const Container = styled.div`
  flex: 1;
  max-width: 965px;
  width: 100%;
  margin: 0 auto;
  padding: 25px 15px 48px;
`
export const MigrateBox = styled.div`
  max-width: 695px;
  width: 100%;
  margin: 32px auto 0;
  padding: 20px 20px 40px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const MigrateLink = styled.a`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-decoration-line: underline;
  color: ${(p) => p.theme.colors.active};
  display: flex;
  align-items: center;
  margin-top: 13px;
  & svg {
    margin-left: 6px;
  }
`
export const MigrateContract = styled.div`
  display: flex;
  align-items: center;
  margin-top: 27px;
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
    flex-direction: column;
  }
`
export const MigrateContractTitle = styled.h3`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.disabledText};
`
export const MigrateButton = styled(ButtonStyled)`
  margin-top: 32px;
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
    color: ${(p) => p.theme.colors.secondary};
  }
`
export const ContractBox = styled.div`
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 24px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  margin-top: 48px;
`
export const ContractHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 5px 24px 5px 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: space-around;
  }
  @media screen and (max-width: 600px) {
    padding: 2px 10px 17px;
  }
`
export const ColumnHead = styled.div`
  width: 100%;
  flex-wrap: wrap;
  padding: 5px 24px 5px 17px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`
export const Logo = styled.img`
  position: relative;

  ${(p) =>
    p.secondary
      ? css`
          z-index: 1;
          margin-left: -5px;
        `
      : css`
          z-index: 2;
        `}
`
export const NameText = styled.h3`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 23px;
  color: ${(p) => p.theme.colors.primaryDefault};
  margin-left: 6px;
`
export const MarketLink = styled.a`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-decoration-line: underline;
  color: ${(p) => p.theme.colors.active};
  display: flex;
  align-items: center;
  & svg {
    margin-left: 6px;
  }
`
export const ContractTitle = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.primaryDefault};
  margin: 15px 10px 0;

  & a {
    margin-left: 5px;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.02em;
    text-decoration-line: underline;
    color: ${(p) => p.theme.colors.active};
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
export const BgGradient = styled.div`
  background: ${(p) => p.theme.colors.defaultGradient};
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
`
export const CurrentRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px 0;
  }
`
export const CurrentTitle = styled.h3`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors._default};
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${(p) => (p.compare ? '0' : '15px 5px 0')};

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`
export const TextContent = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  margin-left: 6px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`
export const TotalRow = styled.div`
  background: ${(p) => p.theme.colors.lightSecondary};
  display: flex;
  flex-direction: column;
  padding: 15px 10px 25px;
  position: relative;
  border-top: 1px solid ${(p) => p.theme.colors.primaryDefault};
`
export const TotalTitle = styled.h3`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.disabledText};
  & svg {
    margin-right: 10px;
  }
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`
export const TotalContent = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
  flex-wrap: wrap;
`
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12px 30px 27px;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    padding: 12px 5px 27px;
  }
`
export const ActionButtonNew = styled(Button)`
  border-radius: 6px;
  padding: 4px 6px;
  min-height: 28px;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  box-shadow: none;
  margin: 20px 10px 0;
  &:hover {
    background: ${(p) => p.theme.colors.buttonActiveBg};
  }
  @media screen and (max-width: 550px) {
    margin-top: 15px;
  }
`
export const ActionButton = styled(Button)`
  border-radius: 6px;
  padding: 4px 6px;
  min-height: 28px;
  margin-left: 30px;
  ${(p) =>
    p.secondary
      ? css`
          background: ${(p) => p.theme.colors.buttonActiveBg};
          box-shadow: none;
          margin-top: 10px;
          &:hover {
            background: ${(p) => p.theme.colors.buttonActiveBg};
          }
          @media screen and (max-width: 550px) {
            margin-top: 15px;
            margin-left: 0;
          }
        `
      : css`
          background: ${(p) => p.theme.colors.active};
          box-shadow: 0px 0px 12px ${(p) => p.theme.colors.defaultLightActive};
        `}
`
export const LogoSkeleton = styled(Skeleton)`
  margin-right: 16px;
`
export const Flex = styled.div`
  display: flex;
  margin-top: 15px;
`
export const Wrapper = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  margin-top: 32px;
  overflow: hidden;
`
export const FooterWrapper = styled.div`
  background: ${(p) => p.theme.colors.transparentBg};
  padding: ${(p) => (p.claimValue ? '7px 10px' : '11px 10px')};
  border-radius: 0 0 16px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 9px;

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`
export const FooterText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors._default};
  margin: 4px 0;
`
export const ClaimFooterText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  display: flex;
  align-items: center;
`
export const ClaimFooterValue = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: ${(p) =>
    p.claimValue ? p.theme.colors.activeSearch : p.theme.colors.secondary};
  margin-left: 5px;
`
export const Column = styled.div`
  width: 50%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: inherit;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`
export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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
export const FooterActionButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const InfoText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors._default};
  display: flex;
  margin-top: 5px;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: 400px) {
    justify-content: center;
    text-align: center;
  }
`
export const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const ValueInfo = styled.span`
  font-weight: bold;
`

export const ColoredValue = styled.span`
  margin-left: 6px;
  color: ${(p) =>
    p.active
      ? p.theme.colors.activeSearch
      : p.contrast
      ? p.theme.colors.error
      : p.theme.colors.secondary};
`
export const TooltipLink = styled.a`
  color: ${(p) => p.theme.colors.activeSearch};
`
