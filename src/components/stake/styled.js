import styled from 'styled-components'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import _AlertTitle from '@material-ui/lab/AlertTitle'
import { ButtonStyled } from '../common/Button'
import _Skeleton from '@material-ui/lab/Skeleton'
import Alert from '../common/alert/Alert'
import { CoverContainer } from '../common/CoverContainer'

export const TableContainerStyled = styled(TableContainer)`
  background: transparent;
  box-shadow: none;
  margin-top: 10px;
  & td {
    border: none;
  }
  & th {
    border: none;
  }
  &::-webkit-scrollbar {
    display: none;
    width: 0px;
    background: transparent;
  }
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
  @media screen and (max-width: 900px) {
    max-width: ${(p) => (p.novalue ? '550px' : p.unstake ? '825px' : '800px')};
    width: 100%;
    margin: 23px auto 0;
    &::-webkit-scrollbar {
      display: none;
      width: 0px;
      background: transparent;
    }
    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */
  }
`
export const TableStyled = styled(Table)`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 900px) {
    width: ${(p) => (p.novalue ? '550px' : p.unstake ? '825px' : '800px')};
    overflow-x: scroll;
  }
  @media screen and (max-width: 600px) {
    width: ${(p) => (p.novalue ? '500px' : p.unstake ? '775px' : '750px')};
  }
`
export const TitleCell = styled(TableCell)`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.secondary};
  padding: 15px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 17px;
    padding: 8px 10px;
  }
`
export const AssetsLogo = styled(TableCell)`
  display: flex;
  align-items: center;
  padding: 6px 15px;
  min-height: 52px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  & img {
    margin-right: 6px;
    height: 24px;
    width: 24px;
    border-radius: 12px;
    overflow: hidden;
  }
  @media screen and (max-width: 600px) {
    padding: 5px 9px;
    min-height: 40px;
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
  padding: ${(p) => (p.skeleton ? '6px 15px 11px' : '6px 15px')};
  min-height: 52px;
  font-weight: normal;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  line-height: 19px;
  text-align: right;
  color: ${(p) => p.theme.colors.secondary};
  @media screen and (max-width: 600px) {
    padding: 6px 10px;
    min-height: 40px;
  }
  &.btnCell {
    padding: 3px 10px;
  }
`
export const TextExpired = styled.h5`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: right;
  color: ${(p) => p.theme.colors.error};
`
export const ActiveButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    margin-right: 10px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`
export const ActiveBtn = styled(ButtonStyled)`
  height: unset;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  padding: 6px;
  box-shadow: none;
  &.MuiButton-contained.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    & h4 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }
`
export const ActiveBtnText = styled.h4`
  font-weight: bold;
  letter-spacing: 0.02em;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
`
export const CellSkeleton = styled(_Skeleton)`
  margin: ${(p) => (p.first ? '0' : '0 0 0 auto')};
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
export const Skeleton = styled(_Skeleton)`
  background-color: ${(p) => p.theme.colors.skeletonBg};
  margin: 10px 0 0;
`
export const AlertStyled = styled(Alert)`
  margin: ${(p) => (p.noaccount ? '40px auto 18px' : '40px auto 0')};
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 17px 0;
  flex-wrap: wrap;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px;
`
export const TitleText = styled.h5`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primaryDefault};
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
export const HeaderActions = styled.div`
  margin-top: 14px;
  @media screen and (max-width: 650px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
export const Box = styled(CoverContainer)`
  margin-top: 32px;
  overflow: hidden;
  width: 100%;
`
export const FooterInfo = styled.div`
  background: ${(p) => p.theme.colors.transparentBg};
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 10px 16px;
  & svg {
    min-width: 16px;
    max-width: 16px;
    width: 100%;
    height: 16px;
  }
  & span {
    display: inline-flex;
    align-items: center;
  }
`
export const FooterInfoText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  margin-left: 6px;
  color: ${(p) => p.theme.colors.disabledText};
`
export const BoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 10px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
  }
`
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 600px) {
    width: 100%;

    &:last-of-type {
      margin-top: 15px;
    }
  }
`
export const SkeletonFlex = styled.div`
  display: flex;
  align-items: center;
`
export const SkeletonCircle = styled(Skeleton)`
  margin-right: 10px;
`
