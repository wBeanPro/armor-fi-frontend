import styled, { css } from 'styled-components'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import { ButtonStyled } from '../common/Button'
import Skeleton from '@material-ui/lab/Skeleton'

export const Container = styled.div`
  flex: 1;
  max-width: 965px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 18px 15px 40px;
  @media screen and (max-width: 768px) {
    padding-top: 80px;
  }
`
export const Switcher = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin-top: 20px;
  }
`
export const Dropdown = styled(TextField)`
  max-width: 108px;
  height: 40px;
  width: 100%;
  border-radius: 6px;
  font-family: 'Open Sans', sans-serif;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primaryDefault};
  & .MuiSelect-select:focus {
    border-radius: 6px;
  }
  & .MuiSelect-select {
    height: 40px;
    padding: 0 24px 0 9px;
    display: flex;
    align-items: center;
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
  & .MuiInput-root {
    display: flex;
    align-items: center;
    height: 100%;
  }
  & .MuiSvgIcon-root {
    right: 7px;
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
  width: 265px;
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

  @media screen and (max-width: 900px) {
    width: 220px;
  }
  @media screen and (max-width: 600px) {
    margin-top: 20px;
    max-width: 300px;
    width: 100%;
  }
`
export const TableContainerStyled = styled(TableContainer)`
  margin-top: 32px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  & td {
    border: none;
  }
  & th {
    border: none;
  }
`
export const TableStyled = styled(Table)`
  @media screen and (max-width: 900px) {
    width: 870px;
    overflow-x: scroll;
  }
  @media screen and (max-width: 600px) {
    width: 770px;
  }
`
export const RowHead = styled(TableRow)`
  border-bottom: 1px solid ${(p) => p.theme.colors.primaryDefault};
`
export const TableTitle = styled(TableCell)`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primary};
  padding: 15px;
  font-family: 'Open Sans', sans-serif;
  cursor: ${(p) => (p.nopointer ? 'unset' : 'pointer')};
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 17px;
    padding: 8px 10px;
  }
`
export const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${(p) => p.theme.colors.defaultArrow};
  transform: rotateZ(180deg);
  margin-left: 5px;
  margin-bottom: 2px;
  display: inline-block;
`
export const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${(p) => p.theme.colors.defaultArrow};
  margin-left: 5px;
  margin-bottom: 2px;
  display: inline-block;
`
export const Row = styled(TableRow)`
  border-bottom: 1px solid ${(p) => p.theme.colors.primaryDefault};
  min-height: 51px;
  &:last-of-type {
    border-bottom: none;
  }
  @media screen and (max-width: 600px) {
    min-height: unset;
  }
`
export const AssetsLogo = styled(TableCell)`
  display: flex;
  align-items: center;
  padding: 13px 15px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  & img {
    margin-right: 6px;
  }
  @media screen and (max-width: 600px) {
    padding: 8px 9px;
  }
`
export const AssetsTitle = styled.h5`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.active};
`
export const Cell = styled(TableCell)`
  padding: 14px 16px;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-family: 'Open Sans', sans-serif;
  text-align: right;
  ${(p) =>
    p.expire &&
    css`
      min-width: 160px;
    `}
  color: ${(p) => p.theme.colors.primary};
  @media screen and (max-width: 600px) {
    padding: 8px 14px;
  }
`
export const ActionCell = styled(TableCell)`
  padding: 0 16px;
  height: 50px;
  font-family: 'Open Sans', sans-serif;
  @media screen and (max-width: 600px) {
    height: 40px;
  }
`
export const ActionButton = styled(ButtonStyled)`
  height: unset;
  padding: 8px 24px;
  @media screen and (max-width: 600px) {
    padding: 5px 16px;
  }
`
export const ActionText = styled.h6`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  @media screen and (max-width: 600px) {
    font-size: 12px;
    line-height: 17px;
  }
`
export const TableFooterStyled = styled(TableFooter)`
  display: flex;
  justify-content: flex-end;
  & p {
    font-family: 'Open Sans', sans-serif;
  }
  & .MuiTableRow-root {
    & .MuiTablePagination-root {
      border-bottom: none;
    }
  }
`
export const CellSkeleton = styled(Skeleton)`
  margin: ${(p) => (p.first ? '0' : '0 0 0 auto')};
`
export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
export const SkeletonCircle = styled(Skeleton)`
  margin-right: 12px;
`
