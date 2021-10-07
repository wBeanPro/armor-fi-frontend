import styled from 'styled-components'
import { CoverContainer } from '../../../common/CoverContainer'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

export const Box = styled(CoverContainer)`
  margin-top: 40px;
  overflow: unset;

  @media screen and (max-width: 990px) {
    max-width: 700px;
    margin: 40px 0 0 auto;
  }
  @media screen and (max-width: 950px) {
    max-width: 670px;
  }
  @media screen and (max-width: 900px) {
    max-width: 100%;
    margin: 40px auto 0;
  }
`
export const AssetsCell = styled(TableCell)`
  padding: 8px 8px 8px 17px;

  @media screen and (max-width: 600px) {
    padding: 6px 8px 6px 15px;
  }
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
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 21px 17px;
  @media screen and (max-width: 600px) {
    padding: 17px 15px;
  }
  @media screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: center;
    & button {
      margin-top: 15px;
    }
  }
`
export const Logo = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  overflow: hidden;
  margin-right: 6px;
`
export const Title = styled.h5`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primaryDefault};
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
  @media screen and (max-width: 990px) {
    width: 840px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
  }
  @media screen and (max-width: 850px) {
    width: 840px;
  }
  @media screen and (max-width: 600px) {
    width: 780px;
  }
`
export const TableTitle = styled(TableCell)`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.secondary};
  padding: 15px 5px;
  position: relative;

  @media screen and (min-width: 1080px) {
    white-space: nowrap;
  }
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 17px;
    padding: 8px 5px;
  }
`
export const AssetTitle = styled(TableTitle)`
  padding: 15px 5px 15px 17px;
  @media screen and (max-width: 600px) {
    padding: 8px 5px 8px 15px;
  }
`
export const TableContainerStyled = styled(TableContainer)`
  overflow-x: unset;
  border-radius: unset;
  box-shadow: none;
  background: transparent;
  padding-bottom: 15px;

  & td {
    border: none;
  }
  & th {
    border: none;
  }

  @media screen and (max-width: 990px) {
    max-width: 700px;
  }
  @media screen and (max-width: 900px) {
    max-width: 100%;
  }
`
export const Cell = styled(TableCell)`
  font-family: 'Open Sans', sans-serif;
  font-weight: ${(p) => (p.normal ? 'normal' : 'bold')};
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  padding: 11px 5px;
  @media screen and (max-width: 600px) {
    padding: 8px 5px;
  }
`
export const EditButton = styled(Button)`
  background: transparent;
  color: ${(p) => p.theme.colors.secondary};
  font-weight: bold;
  height: 31px;
  padding: 6px;
  border-radius: 6px;

  &:hover {
    background: ${(p) => p.theme.colors.strongDefault};
  }
  @media screen and (min-width: 900px) {
    padding-right: 0;
    display: flex;
    justify-content: flex-end;
    transition: 0.3s all;
    &:hover {
      transition: 0.3s all;
      justify-content: center;
      background: ${(p) => p.theme.colors.strongDefault};
      padding-right: 6px;
    }
  }
`
export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & button {
    max-height: 28px;
    padding: 6px;
  }
`
export const CropSpan = styled.span`
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
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

  & svg {
    max-width: 18px;
    height: 18px;
    width: 100%;
  }
`
export const AssetWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;

  @media screen and (min-width: 1100px) {
    min-width: 141px;
  }
  @media screen and (max-width: 900px) {
    min-width: 141px;
  }
  @media screen and (max-width: 600px) {
    min-width: unset;
  }
`
export const AssetLogo = styled.img`
  border-radius: 12px;
  height: 24px;
  width: 24px;
  margin-right: 6px;
`
export const Row = styled(TableRow)`
  min-height: 51px;

  @media screen and (max-width: 600px) {
    min-height: unset;
  }
`
export const ActionCell = styled(Cell)`
  padding: 11px 10px 11px 0;
  @media screen and (max-width: 600px) {
    padding: 8px 8px 8px 0;
  }
`
export const TooltipWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const TitleTooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
`
