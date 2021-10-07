import styled from 'styled-components'
import _TableContainer from '@material-ui/core/TableContainer'
import _TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import _TableBody from '@material-ui/core/TableBody'
import _TableFooter from '@material-ui/core/TableFooter'
import { Title } from '../common/Title'

export const Container = styled.div`
  margin-top: 119px;
  border-top: 1px solid #e1e4eb;
  padding-top: 24px;
  @media screen and (max-width: 600px) {
    margin-top: 74px;
  }
`
export const TitleStyled = styled(Title)`
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  font-weight: 900;
`
export const TableContainer = styled(_TableContainer)`
  position: relative;
  max-width: 935px;
  width: 100%;
  margin: 48px auto 0;
  box-shadow: 0px 0px 4px #e1e4eb;
  border-radius: 6px;
  & .MuiTableCell-root {
    border: none;
    font-family: 'Open Sans', sans-serif;
  }
`
export const TableHead = styled(_TableHead)`
  background: linear-gradient(180deg, #f8f9fc 0%, #edf0f5 100%);
`
export const HeadTitel = styled(TableCell)`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
  font-family: 'Open Sans', sans-serif;
  padding: 17px 16px;

  @media screen and (max-width: 600px) {
    padding: 17px 8px;
  }
`
export const TableBody = styled(_TableBody)`
  background: ${(p) => p.theme.colors.secondary};
  & .MuiTableCell-root {
    padding: 7px 16px;
    font-family: 'Open Sans', sans-serif;
  }
  @media screen and (max-width: 600px) {
    & .MuiTableCell-root {
      padding: 15px 8px;
    }
  }
`
export const CellCount = styled(TableCell)`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primary};
  font-family: 'Open Sans', sans-serif;
`
export const CellAmount = styled(TableCell)`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.primary};
  font-family: 'Open Sans', sans-serif;

  @media screen and (max-width: 600px) {
    white-space: nowrap;
  }
`
export const CellAddress = styled.a`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
  text-decoration: ${(p) => (p.underline ? 'underline' : 'none')};

  @media screen and (max-width: 900px) {
    & span {
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 150px;
      display: block;
    }
  }
  @media screen and (max-width: 600px) {
    & span {
      max-width: 100%;
    }
    & svg {
      max-width: 24px;
      width: 100%;
    }
    background: ${(p) => p.theme.colors.secondaryDefault};
    border-radius: 12px;
    padding: 6px;
    display: flex;
    max-width: 100px;
    align-items: center;
    justify-content: space-between;
  }
`
export const LoadingContainer = styled.div`
  margin: 0 auto 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`
export const TableFooter = styled(_TableFooter)`
  display: flex;
  justify-content: flex-end;
  & .MuiTableRow-root {
    & .MuiTablePagination-root {
      border-bottom: none;
      & p {
        font-family: 'Open Sans', sans-serif;
      }
    }
  }
`
export const AmountPercent = styled.span`
  color: ${(p) => p.theme.colors.active};
  font-weight: bold;
  font-size: 12px;
  line-height: 17px;
`
export const ExternalContainer = styled.div`
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
    max-height: 24px;
    min-width: 24px;
    height: 100%;
  }
`
