import styled, { css } from 'styled-components'
import Accordion from '@material-ui/core/Accordion'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Alert from '../common/alert/Alert'

import { Paragraph } from '../common/Paragraph'

export const ExpansionPanel = styled(Accordion)`
  max-width: calc(100vw - 24px);
  width: 100%;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  margin: 24px 0 0;

  & .MuiAccordionSummary-root {
    padding: 12px 24px;

    @media (min-width: 960px) {
      padding: 30px 42px;
    }
  }
  & .MuiAccordionSummary-content {
    margin: 0 !important;
  }
  &.Mui-expanded {
    margin: 24px 0 0;
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
    border-top: 7px solid ${(p) => p.theme.colors.disabledText};
    & .MuiSvgIcon-root {
      display: none;
    }
  }
  & .MuiAccordionDetails-root {
    padding: 0;
  }
`
export const AssetSummary = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
  @media screen and (min-width: 600px) {
    flex-wrap: nowrap;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const HeadingName = styled.div`
  display: flex;
  align-items: center;
  width: 325px;
  flex: 1;
  @media screen and (max-width: 900px) {
    width: auto;
    flex: 1;
  }
`
export const AssetIcon = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  border-radius: 20px;
  height: 30px;
  width: 30px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
  & img {
    max-height: 40px;
  }
  @media screen and (min-width: 600px) {
    height: 40px;
    width: 40px;
    margin-right: 24px;
  }
`
export const HeadingTitle = styled(Paragraph)`
  white-space: nowrap;

  @media screen and (max-width: 500px) {
    margin-left: ${(p) => (p.value ? '10px' : '0')};
  }
`
export const Addresss = styled.h5`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.strongDefault};
`
export const Heading = styled.div`
  min-width: 250px;
  @media screen and (max-width: 900px) {
    min-width: 200px;
  }
  @media screen and (max-width: 550px) {
    min-width: 140px;
  }
  @media screen and (max-width: 500px) {
    min-width: unset;
    margin-top: 15px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    & h3 {
      margin-left: 15px;
    }
  }
`
export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 18px 15px 30px;

  ${(p) =>
    p.noaccount
      ? css`
          @media screen and (max-width: 1500px) {
            padding-top: 80px;
          }
        `
      : css``}
  @media screen and (max-width: 1320px) {
    padding-top: 80px;
  }
  @media screen and (max-width: 900px) {
    max-width: 600px;
  }

  ${(p) =>
    p.noaccount
      ? css`
          @media screen and (max-width: 550px) {
            padding-top: 110px;
          }
        `
      : css``}
`
export const CoverContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 100%;
  margin-top: 40px;
`
export const Filters = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`
export const Dropdown = styled(TextField)`
  max-width: 108px;
  height: 40px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  border-radius: 6px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primaryDefault};
  & .MuiSelect-select:focus {
    border-radius: 6px;
  }
  & .MuiInput-underline {
    &:before {
      display: none;
      height: 0px;
      border-bottom: none;
    }
    &:after {
      display: none;
      height: 0px;
      border-bottom: none;
    }
    &:hover:not($disabled):before {
      display: none;
      height: 0px;
      border-bottom: none;
    }
  }
  & .MuiSelect-select {
    height: 40px;
    padding: 0 24px 0 9px;
    display: flex;
    align-items: center;
  }
  & .MuiInput-root {
    display: flex;
    align-items: center;
    height: 100%;
  }
  & .MuiSvgIcon-root {
    right: 7px;
  }
  @media screen and (max-width: 600px) {
    max-width: 200px;
  }
`
export const SelectMenu = styled(MenuItem)`
  padding: 15px 15px 15px 20px;
  min-width: 200px;
`
export const SelectIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: ${(p) => p.theme.colors.secondaryDefault};
  height: 30px;
  width: 30px;
  cursor: pointer;
`
export const SelectIconName = styled.h5`
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.strongDefault};
`
export const SearchField = styled(TextField)`
  max-width: 265px;
  width: 100%;
  height: 40px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  & .MuiOutlinedInput-root {
    border-radius: 6px;
    display: flex;
    align-items: center;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
  }
  & .MuiInputAdornment-positionEnd {
    margin-left: 0;
    font-family: 'Open Sans', sans-serif;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  & .MuiOutlinedInput-input {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
  }
  & .MuiOutlinedInput-inputAdornedStart {
    padding-left: 10px;
  }
  @media screen and (max-width: 600px) {
    margin-top: 20px;
    max-width: 400px;
  }
`
export const Wrapper = styled.div`
  max-width: calc(100vw - 24px);
  width: 100%;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  margin: 24px 0 0;
  padding: 30px 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 900px) {
    padding: 12px 24px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const Cell = styled.div`
  display: flex;
  flex-grow: 1;
  max-width: 200px;
  flex-direction: column;
  margin: 0 auto;

  @media screen and (max-width: 550px) {
    flex-grow: inherit;
    width: unset;
    margin: 0 auto 0 10px;
  }
  @media screen and (max-width: 500px) {
    margin: 15px 0 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    & span {
      &:first-of-type {
        margin-left: 10px;
      }
    }
  }
`
export const SkeletonIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  @media screen and (max-width: 900px) {
    right: 15px;
  }
`
export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  max-width: 240px;
  ${Cell} {
    margin-left: 20px;
    @media screen and (max-width: 500px) {
      margin: 0 0 0 10px;
      display: block;
      & span {
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
  }
`

export const RewardsActiveWrapper = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;

  & .MuiFormControlLabel-label {
    display: flex;
    & img {
      max-width: 22px;
      min-width: 22px;
      height: auto;
    }
  }
  & .MuiFormControlLabel-root {
    display: flex;
    align-items: center;
  }
`

export const LeftActionsWrapper = styled.div`
  display: flex;
`
export const AlertStyled = styled(Alert)`
  margin: 20px 0 0 0;
  width: 100%;
`
