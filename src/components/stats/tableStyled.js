import styled, { css } from 'styled-components'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'

export const Cell = styled(TableCell)`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  border: none;
  color: ${(p) => p.theme.colors.secondary};
  padding: 15px;
  text-transform: ${(p) => (p.capitalize ? 'capitalize' : 'normal')};
  cursor: pointer;

  & svg {
    opacity: ${(p) => (p.showarrow ? 1 : 0)};
  }
  &:hover {
    & svg {
      opacity: ${(p) => (p.showarrow ? 1 : 0.3)};
    }
  }

  @media screen and (max-width: 600px) {
    line-height: 17px;
    padding: 8px 10px;
  }
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  & svg {
    transition: all 0.2s;
    transform: ${(p) => (p.transform === 'desc' ? 'none' : 'rotate(180deg)')};
    height: 10px;
    width: 10px;
    margin-left: 8px;
  }
`
export const TableBox = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  margin-top: 10px;
  padding-top: 5px;
  width: 100%;
  & td {
    border: none;
  }
  & th {
    border: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 900px) {
    overflow-x: scroll;
  }
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`
export const TableStats = styled(TableContainer)`
  background: transparent;
  border-radius: 16px;
  box-shadow: none;
  ${(p) =>
    p.sleleton
      ? css`
          padding-bottom: 2px;
        `
      : css``}

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 650px) {
    width: 600px;
  }
  @media screen and (max-width: 600px) {
    width: ${(p) => (p.sleleton ? '870px' : '580px')};
  }
`
export const TableValue = styled(TableCell)`
  padding: 6px 15px;
  min-height: 50px;
  font-weight: ${(p) => (p.noactive ? 'normal' : 'bold')};
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) =>
    p.noactive ? p.theme.colors._default : p.theme.colors.secondary};
  border: none;
  @media screen and (max-width: 600px) {
    padding: 5px 14px;
  }
`
export const Name = styled(TableCell)`
  font-weight: bold;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.active};
  display: flex;
  align-items: center;
  padding: 6px 15px;
  min-height: 50px;
  border: none;
  & a {
    color: ${(p) => p.theme.colors.active};
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  & span {
    color: ${(p) => p.theme.colors.secondary};
  }
  @media screen and (max-width: 600px) {
    padding: 5px 9px;
  }
`
export const FooterTotal = styled(Name)`
  & span {
    color: ${(p) => p.theme.colors.primaryDefault};
  }
  color: ${(p) => p.theme.colors.primaryDefault};
  text-transform: uppercase;
`
export const TableFooterRow = styled(TableRow)`
  margin-top: 10px;
  background: ${(p) => p.theme.colors.transparentBg};
`
export const TableDivider = styled(TableRow)`
  height: 15px;
`
export const Logo = styled.img`
  margin-right: 11px;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    margin-right: 6px;
  }
`
