import styled, { css } from 'styled-components'
import { CoverContainer } from '../../common/CoverContainer'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell'
import _AlertTitle from '@material-ui/lab/AlertTitle'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export const Container = styled(CoverContainer)`
  margin-top: 32px;
  overflow: hidden;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 17px 0;
  flex-wrap: wrap;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`
export const Title = styled.div`
  display: flex;
  align-items: center;
`
export const TitleText = styled.h5`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primaryDefault};
`
export const TableContainerStyled = styled(TableContainer)`
  margin-top: 25px;
  overflow-x: unset;
  border-radius: unset;
  box-shadow: none;
  background: transparent;
  & td {
    border: none;
  }
  & th {
    border: none;
  }

  @media screen and (max-width: 768px) {
    margin-top: 15px;
  }
`
export const TableStyledWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
export const TableStyled = styled(Table)`
  @media screen and (max-width: 850px) {
    width: 840px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    width: 810px;
  }
`
export const TableTitle = styled(TableCell)`
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.secondary};
  padding: 15px 7px;
  font-family: 'Open Sans', sans-serif;
  @media screen and (min-width: 1080px) {
    white-space: nowrap;
  }
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 17px;
    padding: 8px 5px;
  }
`
export const CheckboxTitle = styled(TableCell)`
  padding: 2px 0px 6px 6px;
  @media screen and (max-width: 600px) {
    padding: 2px 0px 6px 6px;
  }
`
export const TableMontlyTitle = styled(TableTitle)`
  @media screen and (min-width: 1080px) {
    white-space: nowrap;
  }
`
export const AssetTitle = styled(TableTitle)`
  padding: 15px 7px 15px 6px;
  @media screen and (max-width: 600px) {
    padding: 8px 4px;
  }
`
export const Row = styled(TableRow)`
  min-height: 51px;
  background: ${(p) =>
    p.checked
      ? p.theme.colors.selectedCoverRow
      : p.orangewarning
      ? p.theme.colors.selectedWarningRow
      : p.redwarning
      ? p.theme.colors.selectedErrorRow
      : 'transparent'};

  @media screen and (max-width: 600px) {
    min-height: unset;
  }
`
export const AssetsLogo = styled(TableCell)`
  padding: 8px 7px 8px 6px;

  @media screen and (max-width: 600px) {
    padding: 6px 5px;
  }
`
export const AssetWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
`
export const AssetsTitle = styled.div`
  display: flex;
  flex-direction: column;
`
export const AssetsName = styled.h5`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  flex-wrap: wrap;
  color: ${(p) => p.theme.colors.active};
  display: flex;
  align-items: center;

  & span {
    display: flex;
    margin-left: 5px;
  }
  & svg {
    max-width: 18px;
    height: 18px;
    width: 100%;
  }
`
export const CropSpan = styled.span`
  max-width: 108px;
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0 !important;
  display: block !important;
`
export const Cell = styled(TableCell)`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  padding: 8px 7px;
  color: ${(p) => p.theme.colors.secondary};
  @media screen and (max-width: 600px) {
    padding: 6px 5px;
  }
`
export const AvailableCell = styled.div`
  display: flex;
  align-items: center;
  & span {
    display: flex;
    margin-left: 5px;
  }
  & svg {
    height: 16px;
    width: 16px;
  }
`
export const LargeCell = styled(Cell)`
  padding: 6px 7px;

  @media screen and (max-width: 600px) {
    padding: 5px;
  }
`
export const ActionCell = styled(TableCell)`
  padding: 9px 7px;
  font-family: 'Open Sans', sans-serif;
  @media screen and (max-width: 600px) {
    padding: 9px 5px;
  }
`
export const NoAssetsTableRow = styled.p`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 16px;
  line-height: 140%;
  color: ${(p) => p.theme.colors.primaryDefault};
  text-align: center;
  margin-top: 20px;
  padding: 0 10px;
`
export const CoverButton = styled(Button)`
  border: 1px solid
    ${(p) => (p.delete ? p.theme.colors.error : p.theme.colors.buttonActiveBg)};
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px;
  min-width: unset;
  margin-left: ${(p) => (p.delete ? '9px' : '0')};
  color: ${(p) =>
    p.delete ? p.theme.colors.error : p.theme.colors.buttonActiveBg};
  & svg {
    width: 15px;
    height: 15px;
  }
`
export const Checkmark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 16px;
  width: 16px;
  border: 1px solid ${(p) => p.theme.colors.active};
  box-sizing: border-box;
  border-radius: 3px;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 8px;
    width: 8px;
    background: ${(p) => p.theme.colors.active};
    border-radius: 1px;
    opacity: 0;
  }
`

export const AssetCheckbox = styled(Checkbox)`
  height: 35px;
  width: 35px;
  position: relative;
  ${(p) =>
    p.isnotempty
      ? css`
          ~ ${Checkmark} {
            &::before {
              opacity: 0.2;
            }
          }
        `
      : css``}
  &:hover {
    ~ ${Checkmark} {
      &::before {
        opacity: 0.2;
      }
    }
  }
  &.Mui-checked {
    ~ ${Checkmark} {
      &::before {
        opacity: 1;
      }
    }
  }
  & .MuiSvgIcon-root {
    fill: ${(p) => p.theme.colors.active};
    display: none;
  }
`
export const CheckboxLabel = styled(FormControlLabel)`
  margin: 0;
  position: relative;
`
export const CheckboxCell = styled(Cell)`
  padding: 2px 0px 0px 6px;
`
export const AssetLogoImg = styled.img`
  border-radius: 12px;
  height: 24px;
  width: 24px;
  margin-right: 5px;
`
export const SpanValue = styled.span`
  font-weight: normal;
`
export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-left: 4px;
  width: 100%;
  display: flex;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const HeaderActions = styled.div`
  & button {
    margin: 0 5px;

    &:last-of-type {
      margin-right: 0;
    }

    @media screen and (max-width: 650px) {
      margin-top: 15px;
      &:last-of-type {
        margin-left: 0;
      }
    }
  }
  @media screen and (max-width: 650px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & button {
      margin-top: 15px;
      &:last-of-type {
        margin-left: 0;
      }
    }
  }
`
export const WarningIconWrapper = styled.span`
  display: flex;
  margin-right: 6px;
  & svg {
    height: 18px;
    width: 18px;
  }
`
