import styled from 'styled-components'
import { CoverContainer } from '../../common/CoverContainer'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import _AlertTitle from '@material-ui/lab/AlertTitle'

export const Container = styled(CoverContainer)`
  margin-top: 32px;
  overflow: hidden;
  padding-bottom: 20px;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 17px 0;

  @media screen and (max-width: 448px) {
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
  margin-top: 20px;
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
  @media screen and (max-width: 548px) {
    width: 550px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const TableTitle = styled(TableCell)`
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.secondary};
  padding: 15px;
  font-family: 'Open Sans', sans-serif;
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 17px;
    padding: 8px 10px;
  }
`
export const FirstHeadCell = styled(TableTitle)`
  min-width: 250px;
  @media screen and (max-width: 548px) {
    min-width: unset;
  }
`
export const Row = styled(TableRow)`
  min-height: 51px;
  background: ${(p) =>
    p.checked ? p.theme.colors.selectedCoverRow : 'transparent'};

  @media screen and (max-width: 600px) {
    min-height: unset;
  }
`
export const AssetsLogo = styled(TableCell)`
  display: flex;
  align-items: center;
  padding: 8px 15px 8px 17px;
  min-width: 250px;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    padding: 6px 9px 6px 10px;
  }
  @media screen and (max-width: 548px) {
    min-width: unset;
  }
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
export const Cell = styled(TableCell)`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  padding: 8px 15px;
  color: ${(p) => p.theme.colors.secondary};
  @media screen and (max-width: 600px) {
    padding: 6px 14px;
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
export const Bold = styled.span`
  font-weight: bold;
`
export const AssetLogoImg = styled.img`
  border-radius: 12px;
  height: 24px;
  width: 24px;
  margin-right: 6px;
`
export const Ticker = styled.span`
  color: ${(p) => p.theme.colors.disabledText};
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
`
export const SpanValue = styled.span`
  font-weight: normal;
  margin-left: 5px;
`
export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-left: 6px;
  width: 100%;
  display: flex;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
