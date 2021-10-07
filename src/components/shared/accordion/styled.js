import styled from 'styled-components'
import Accordion from '@material-ui/core/Accordion'
import { Paragraph } from '../../common/Paragraph'

export const ExpansionPanel = styled(Accordion)`
  width: 100%;
  background: ${(p) => p.theme.colors.defaultArrow};
  box-shadow: none;
  border-radius: 16px;
  margin: 12px 0 0;

  & .MuiAccordionSummary-root {
    padding: 18px 34px 18px 18px;

    @media (max-width: 900px) {
      padding: 15px 30px 15px 15px;
    }
    @media (max-width: 600px) {
      padding: 5px 30px 15px 15px;
    }
  }
  & .MuiAccordionSummary-content {
    margin: 0 !important;
  }
  &.Mui-expanded {
    margin: 12px 0 0 !important;
  }
  &.MuiAccordion-root:before {
    background-color: unset;
    height: 0px;
  }
  & .MuiIconButton-label {
    width: 0;
    height: 0;
    border-radius: 2px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${(p) => p.theme.colors._default};
    & .MuiSvgIcon-root {
      display: none;
    }
  }
  & .MuiAccordionDetails-root {
    padding: 23px 68px 40px;
    background: ${(p) => p.theme.colors.tradeBg};
    border-radius: 0 0 16px 16px;

    @media screen and (max-width: 990px) {
      padding: 23px 30px 40px;
    }
    @media screen and (max-width: 900px) {
      padding: 0 30px 40px;
    }
    @media screen and (max-width: 600px) {
      padding: 0 10px 20px;
    }
  }
`
export const AssetSummary = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  padding-right: 10px;
  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`
export const HeadingName = styled.div`
  display: flex;
  align-items: center;
  min-width: 250px;
  flex: 1;

  @media screen and (max-width: 990px) {
    min-width: unset;
    flex: unset;
  }
  @media screen and (max-width: 600px) {
    margin-top: 10px;
    margin-right: 10px;
  }
`
export const AssetIcon = styled.div`
  height: 32px;
  width: 32px;
  margin-right: 19px;
  @media screen and (max-width: 600px) {
    height: 28px;
    width: 28px;
    margin-right: 15px;
  }
`
export const Address = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.active};
  text-decoration: underline;
  font-weight: normal;
  margin-top: 3px;
  @media screen and (max-width: 600px) {
    margin-top: 0;
  }
`
export const Heading = styled.div`
  min-width: 170px;

  @media screen and (max-width: 990px) {
    min-width: unset;
  }
  @media screen and (max-width: 600px) {
    margin-top: 10px;
    margin-right: 10px;
  }
`
export const Spacer = styled.div`
  margin-top: 3px;
  @media screen and (max-width: 600px) {
    margin-top: 0;
  }
`
