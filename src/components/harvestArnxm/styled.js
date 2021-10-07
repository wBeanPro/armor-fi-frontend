import styled from 'styled-components'
import _Accordion from '@material-ui/core/Accordion'
import _AccordionDetails from '@material-ui/core/AccordionDetails'
import _AccordionSummary from '@material-ui/core/AccordionSummary'
import { ButtonStyled } from '../common/Button'
import { InputField } from '../../../common/Input'

export const Accordion = styled(_Accordion)`
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 24px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  max-width: 935px;
  width: 100%;
  margin: 24px auto 0;
  overflow: hidden;
  &.MuiAccordion-root:before {
    background-color: unset;
    height: 0px;
  }
  &:first-child {
    border-radius: 6px;
  }
  &:first-of-type {
    margin-top: 28px;
  }
  &.Mui-expanded {
    margin-top: 24px;
    &:first-of-type {
      margin-top: 28px;
    }
  }
`

export const Head = styled(_AccordionSummary)`
  background: ${(p) => p.theme.colors.lightSecondary};
  padding: 11px 30px 12px;
  &.MuiAccordionSummary-root.Mui-expanded {
    min-height: unset;
  }
  & .MuiAccordionSummary-content {
    display: flex;
    justify-content: space-between;
    padding-right: 70px;
    margin: 0 !important;
  }

  @media screen and (max-width: 900px) {
    & .MuiAccordionSummary-content {
      padding-right: 0;
    }
  }
  @media screen and (max-width: 600px) {
    background: transparent;
    padding: 0;
    & .MuiAccordionSummary-content {
      width: 100%;
    }
    & .MuiAccordionSummary-expandIcon {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 14px;
      right: 15px;
      background-image: url(${require(`../../assets/arrow-right.svg`)});
    }
    & .MuiAccordionSummary-expandIcon.Mui-expanded {
      background-image: url(${require(`../../assets/close-icon.svg`)});
    }
    & .MuiIconButton-edgeEnd {
      margin-right: 0;
    }
  }
`

export const Cell = styled.div`
  display: flex;
  align-items: center;
  min-width: 110px;

  @media screen and (max-width: 900px) {
    min-width: unset;
    &.logoCell {
      min-width: 110px;
    }
  }
`

export const CellContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: 600px) {
    width: 33.33%;
    margin-top: 19px;
  }
`

export const Logo = styled.img`
  margin-right: 6px;
  height: 24px;
  width: auto;
`

export const Heading = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primary};
  white-space: nowrap;
`

export const Value = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primary};
`

export const NameLogo = styled.p`
  font-weight: ${(p) => (p.bold ? 'bold' : 'normal')};
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.active};
`

export const ExpandIcon = styled.div`
  width: 0;
  height: 0;
  border-radius: 2px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid ${(p) => p.theme.colors.disabledText};

  @media screen and (max-width: 600px) {
    border: none;
  }
`

export const ActionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Action = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 285px;
  width: 100%;
  margin: 0 10px;

  @media screen and (max-width: 600px) {
    margin: 0;
    max-width: 400px;

    &:last-of-type {
      margin: 30px 0 0;
    }
  }
`

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 27px;

  @media screen and (max-width: 600px) {
    padding-top: 14px;
    margin-top: 0;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #e1e4eb;
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

export const MainButtonText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
  margin-right: 10px;
`

export const MainButton = styled(ButtonStyled)`
  width: 100%;
  margin: 32px auto 0;
  display: flex;
  max-width: 285px;

  @media screen and (max-width: 600px) {
    max-width: 350px;
  }
`

export const ActionButton = styled(ButtonStyled)`
  width: 100%;
  margin-top: 16px;
`

export const ActionInput = styled(InputField)`
  margin-top: 4px;
  color: ${(p) => p.theme.colors.disabledText};
`

export const AccordionDetails = styled(_AccordionDetails)`
  flex-direction: column;
  padding: 0 40px 23px;

  @media screen and (max-width: 900px) {
    padding: 0 20px 23px;
  }
  @media screen and (max-width: 600px) {
    padding: 0 18px 23px;
  }
`

export const ActionFooter = styled.div`
  margin-top: 33px;
  border-top: 1px solid ${(p) => p.theme.colors.primaryDefault};
`

export const FooterText = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.strongDefault};
  margin-top: 10px;
  text-align: center;
`

export const InputTitle = styled.p`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};

  span {
    font-weight: normal;
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
export const AccordionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    display: none;
  }
`
export const MobileWrapper = styled.div`
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }
`
export const HeadGradient = styled.div`
  padding: 14px 18px;
  background: ${(p) => p.theme.colors.tableHead};
`
export const MobileContent = styled.div`
  display: flex;
  padding: 12px 18px 25px;
  flex-wrap: wrap;
  margin-top: -19px;
`
