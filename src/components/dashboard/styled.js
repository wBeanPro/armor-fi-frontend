import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { Paragraph } from '../common/Paragraph'
import { ButtonStyled } from '../common/Button'
import Skeleton from '@material-ui/lab/Skeleton'

export const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 965px;
  justify-content: center;
  align-items: center;
  padding: 20px 15px 40px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    padding-top: 90px;
  }
`
export const InvestedContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`
export const IntroCenter = styled.div`
  max-width: 500px;
  text-align: center;
  display: flex;
  padding: 24px 0px;
`
export const CoverCard = styled.div`
  position: relative;
  max-width: calc(100vw - 24px);
  width: 100%;
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  background: ${(p) => p.theme.colors.secondary};
  border-radius: 6px;
  padding: 20px 30px;
  margin-top: 24px;

  &:first-of-type {
    margin-top: 32px;
  }

  @media screen and (max-width: 900px) {
    padding: 15px;
  }

  @media screen and (max-width: 600px) {
    padding: 10px;
    max-width: ${(p) => (p.skeleton ? '100%' : 'calc(100vw - 15%)')};
  }
`

export const AssetSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    align-items: flex-start;
  }
`

export const AssetsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 20px;

  @media screen and (max-width: 900px) {
    margin-right: 0;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`

export const ContentBox = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 700px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const AssetIcon = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  border-radius: 20px;
  height: 40px;
  width: 40px;
  text-align: center;
  margin-right: 20px;

  @media screen and (max-width: 600px) {
    height: 30px;
    width: 30px;
    margin-right: 24px;
  }
`

export const HeadingName = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 900px) {
    min-width: 215px;
  }
`

export const Heading = styled.div`
  display: block;
  margin: 5px;

  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: center;
    margin: ${(p) => (p.skeleton ? '0' : '5px')};

    h5 {
      margin-right: 5px;
    }
  }
`

export const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 490px;

  @media screen and (max-width: 900px) {
    margin-left: 15px;
  }

  @media screen and (max-width: 700px) {
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
    width: unset;
  }
`

export const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 180px;
  flex-wrap: wrap;
  width: 100%;

  @media screen and (max-width: 700px) {
    justify-content: space-around;
    max-width: 250px;
    flex-direction: row;
  }
`

export const ActionText = styled.div`
  margin: 5px;

  @media screen and (max-width: 600px) {
    text-align: center;
  }
`

export const AddText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
  margin-left: 10px;
`

export const AddBtn = styled(ButtonStyled)`
  margin-top: 25px;
`

export const FieldTitle = styled(Paragraph)`
  white-space: ${(p) => (p.noWrap ? 'nowrap' : 'normal')};

  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 20px;
    margin-right: 10px;
  }
`

export const FieldValue = styled.h5`
  white-space: ${(p) => (p.noWrap ? 'nowrap' : 'normal')};
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.strongDefault};
`

export const ActionButton = styled(Button)`
  background: ${(p) => p.theme.colors.secondaryDefault};
  border-radius: 6px;
  border: none;
  padding: 8px 12px;
  margin: 5px;
  max-width: 160px;
  overflow: hidden;

  &:hover {
    border: none;
    background: ${(p) => p.theme.colors.secondaryDefault};
  }
`

export const ButtonText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primary};
  text-transform: uppercase;
`

export const TopBarWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

export const InsuranceContractName = styled.div`
  font-weight: bold;
  font-size: 12px;
  position: absolute;
  top: -12px;
  right: -10px;
  background: ${(p) => p.theme.colors.active};
  border-radius: 4px;
  box-shadow: 0px 0px 12px ${(p) => p.theme.colors.defaultLightActive};
  padding: 2px 5px;
  color: ${(p) => p.theme.colors.secondary};
`

export const NoCovers = styled.h4`
  margin-top: 25px;
`
export const CircleSkeleton = styled(Skeleton)`
  margin-right: 20px;
`
export const SkeletonSpacer = styled(Skeleton)`
  @media screen and (max-width: 700px) {
    margin-right: 10px;
  }
`
