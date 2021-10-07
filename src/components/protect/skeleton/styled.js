import styled from 'styled-components'
import TableContainer from '@material-ui/core/TableContainer'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import Skeleton from '@material-ui/lab/Skeleton'

export const TableContainerStyled = styled(TableContainer)`
  margin-top: 22px;
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  overflow-x: unset;
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
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 17px;
    padding: 8px 10px;
  }
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
export const Cell = styled(TableCell)`
  padding: 14px 16px;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-family: 'Open Sans', sans-serif;
  text-align: right;
  color: ${(p) => p.theme.colors.primary};
  @media screen and (max-width: 600px) {
    padding: 8px 14px;
  }
`
export const CellSkeleton = styled(Skeleton)`
  margin: ${(p) => (p.first ? '0' : '0 0 0 auto')};
`
