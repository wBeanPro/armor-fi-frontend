import styled, { css } from 'styled-components'
import _Accordion from '@material-ui/core/Accordion'
import _AccordionSummary from '@material-ui/core/AccordionSummary'
import _AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'

export const Container = styled.div`
  position: relative;
  z-index: 98;
  width: ${(p) => (p.isMobile ? 'unset' : '235px')};
  padding: ${(p) => (p.isMobile ? '55px 17px 20px 9px' : '84px 9px 10px 17px')};
  display: ${(p) => (p.isMobile ? 'none' : 'block')};

  @media screen and (max-width: 900px) {
    display: ${(p) => (p.isMobile ? 'block' : 'none')};
  }
  @media screen and (max-width: 448px) {
    padding-top: 50px;
  }
`
export const ExpandIcon = styled.div`
  width: 0;
  height: 0;
  border-radius: 2px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid ${(p) => p.theme.colors.primaryLightActive};

  @media screen and (max-width: 900px) {
    border-top: 7px solid ${(p) => p.theme.colors.primary};
  }
`
export const Accordion = styled(_Accordion)`
  background: transparent;
  box-shadow: none;
  border-bottom: 1px solid none;
  padding: 6px 0;
  &:before {
    display: none;
  }
  &.Mui-expanded {
    margin: 0;
  }
  & .MuiAccordionSummary-content.Mui-expanded {
    margin: 12px 0;
  }
  & .MuiAccordionSummary-root {
    min-height: unset;
    &.Mui-expanded {
      min-height: unset;
    }
  }
`
export const AccordionSummary = styled(_AccordionSummary)`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.lightActive};
  padding: 0px 6px;

  @media screen and (max-width: 900px) {
    color: ${(p) => p.theme.colors.strongDefault};
  }
`
export const Link = styled.a`
  cursor: pointer;
  border-bottom: 1px solid none;
  padding: 10px 6px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) =>
    p.isCurrentPage ? p.theme.colors.secondary : p.theme.colors.menuItem};
  transition: 0.2s color;

  ${(p) =>
    p.isBlurred
      ? css`
          filter: blur(3px);
        `
      : ''}

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    transition: 0.2s color;
    color: ${(p) => p.theme.colors.secondary};
  }

  @media screen and (max-width: 900px) {
    background: transparent;
    color: ${(p) => p.theme.colors.secondary};
    border-bottom: 1px solid ${(p) => p.theme.colors.tradeDivider};
    &:hover {
      transition: unset;
    }
  }
`
export const AccordionItem = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.lightActive};
  padding: 10px;
  text-decoration: none;
  border-top: none;
  &:first-of-type {
    border-top: 1px solid ${(p) => p.theme.colors.primaryBorder};
  }
  transition: 0.2s margin;

  &:hover {
    transition: 0.2s margin;
    margin-left: 3px;
  }

  @media screen and (max-width: 900px) {
    background: transparent;
    color: ${(p) => p.theme.colors.strongDefault};
    &:first-of-type {
      border-top: 1px solid ${(p) => p.theme.colors.primaryDefault};
    }
    &:hover {
      transition: unset;
      margin-left: 0;
    }
  }
`

export const AccordionDetails = styled(_AccordionDetails)`
  display: flex;
  flex-direction: column;
  padding: 0 6px;
`
export const Wrapper = styled.div`
  position: fixed;
  width: 205px;
  height: ${(p) => p.deviceHeight - (p.isBottom ? 220 : 160)}px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  @media screen and (max-width: 900px) {
    height: ${(p) => p.deviceHeight - 212}px;
  }
  @media screen and (max-width: 548px) {
    height: ${(p) => p.deviceHeight - 203}px;
  }
`
export const TokensWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`
export const TokenButton = styled(Button)`
  text-transform: none;
  width: 100%;
  height: 36px;
  border-radius: 6px;
  padding: 8px;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  background: transparent;
  box-shadow: none;
  color: ${(p) => p.theme.colors.primaryLightTrue};
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  &:first-of-type {
    margin-right: 5px;
  }
  &:last-of-type {
    margin-left: 5px;
  }
  img {
    width: 20px;
    height: 20px;
    &:first-of-type {
      margin-right: 8px;
    }
    &:last-of-type {
      margin-left: 8px;
    }
  }
  &:hover {
    background: transparent;
  }

  @media screen and (max-width: 900px) {
    color: ${(p) => p.theme.colors.secondary};
    border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
  }
`
export const BottomWrapper = styled.div`
  z-index: 99;
  position: fixed;
  bottom: ${(p) => (p.isBottom ? '80px' : '20px')};

  @media screen and (min-width: 901px) {
    left: 20px;
  }

  @media screen and (max-width: 900px) {
    right: 20px;
    bottom: 20px;
  }
  @media screen and (max-width: 548px) {
    right: 17px;
    bottom: 10px;
  }
`
