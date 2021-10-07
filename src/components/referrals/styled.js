import styled from 'styled-components'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import { ButtonStyled } from '../common/Button'
import _Skeleton from '@material-ui/lab/Skeleton'

export const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px auto 0;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-around;
  }
`
export const BoxBalance = styled.div`
  max-width: 400px;
  width: 100%;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
  margin: 20px 5px 0;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }

  @media screen and (max-width: 768px) {
    margin: 20px auto 0;
    max-width: 600px;
    &:first-of-type {
      margin-left: auto;
    }
    &:last-of-type {
      margin-right: auto;
    }
  }
`
export const ReferralURLWrapper = styled.div`
  width: 100%;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin: 15px auto 0;

  @media screen and (max-width: 768px) {
    padding: 16px 10px;
  }
`
export const HeaderBalance = styled.h4`
  background: ${(p) => p.theme.colors.transparentBg};
  display: block;
  text-align: center;
  padding: 15px 5px;
  border-radius: 6px 6px 0px 0px;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
  color: ${(p) => p.theme.colors.secondary};
`
export const ValueBalance = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 30px;
  line-height: 36px;
  color: ${(p) => p.theme.colors.active};
  display: flex;
  align-items: center;
  margin-top: 17px;
  & span {
    margin-right: 12px;
  }
`
export const BalanceList = styled.div`
  height: 120px;
  overflow-y: scroll;
  width: 100%;
  padding-left: 20px;
`
export const BalanceListItem = styled.div`
  height: 20px;
  width: 100%;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: ${(p) => p.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`
export const BalanceButton = styled(ButtonStyled)`
  box-shadow: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  height: unset;
  padding: 6px 10px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  margin-top: 20px;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  &.MuiButton-root.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    color: ${(p) => p.theme.colors.secondary};
  }
`

export const ListBalance = styled.p`
  font-size: 14px;
`
export const ListBalanceButton = styled(ButtonStyled)`
  box-shadow: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 10px;
  height: unset;
  padding: 4px 8px;
  margin-right: 3px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  background: ${(p) => p.theme.colors.buttonActiveBg};
  &.MuiButton-root.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    color: ${(p) => p.theme.colors.secondary};
  }
`
export const TotalValue = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.primary};
  margin-top: 16px;
`
export const TableContainerStyled = styled(TableContainer)`
  margin-top: 19px;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 6px;
  & td {
    border: none;
  }
  & th {
    border: none;
  }
  max-height: 420px;
  overflow-y: scroll;

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`
export const RowHead = styled(TableRow)`
  border-bottom: 1px solid ${(p) => p.theme.colors.tradeDivider};
`
export const TableTitle = styled(TableCell)`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  font-family: 'Open Sans', sans-serif;
  padding: 15px 8px;
  background: ${(p) => p.theme.colors.modalBg};
  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 17px;
    padding: 8px;
  }
`
export const AddressTitle = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  font-family: 'Open Sans', sans-serif;
`
export const AddressLink = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  font-family: 'Open Sans', sans-serif;
  line-break: anywhere;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 17px;
    margin-top: 10px;
  }
`
export const Row = styled(TableRow)`
  border-bottom: 1px solid ${(p) => p.theme.colors.tradeDivider};
  min-height: 51px;
  &:last-of-type {
    border-bottom: none;
  }

  @media screen and (max-width: 768px) {
    min-height: unset;
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
export const Cell = styled(TableCell)`
  padding: 14px 8px;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  font-family: 'Open Sans', sans-serif;
  color: ${(p) => p.theme.colors.secondary};
  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`
export const LinkCell = styled(TableCell)`
  padding: 0 !important;
`
export const ShowMore = styled(ButtonStyled)`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.02em;
  padding: 4px 12px;
  height: unset;
  color: ${(p) => p.theme.colors.secondary};
  box-shadow: none;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  &.Mui-disabled {
    color: ${(p) => p.theme.colors.secondary};
    background: ${(p) => p.theme.colors.strongDefault};
    &:hover {
      background: ${(p) => p.theme.colors.strongDefault};
    }
  }
`
export const CopyButton = styled(ButtonStyled)`
  border: 1px solid ${(p) => p.theme.colors.active};
  box-sizing: border-box;
  border-radius: 6px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 19px;
  text-align: center;
  padding: 2px 8px;
  min-width: unset;
  height: unset;
  flex-wrap: nowrap;
  box-shadow: none;
  background: transparent;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.active};
  margin-left: 10px;
  line-break: normal;
  &:hover {
    background: transparent;
    border: 1px solid ${(p) => p.theme.colors.active};
  }
`
export const ShowMoreRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px 10px;

  @media screen and (max-width: 768px) {
    padding: 12px 10px;
  }
`
export const ReferBox = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 5px;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }

  @media screen and (max-width: 768px) {
    margin: 30px auto 0;
    max-width: 600px;
    &:first-of-type {
      margin-left: auto;
    }
    &:last-of-type {
      margin-right: auto;
    }
  }
`
export const ReferFullBox = styled.div`
  width: 100%;

  @media screen and (max-width: 768px) {
    margin: 30px 0 0;
  }
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 0;
  }
`
export const UserAccount = styled.a`
  padding: 14px 16px;
  font-family: 'Open Sans', sans-serif;
  display: block;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.active};
  @media screen and (max-width: 768px) {
    padding: 8px 10px;
  }
`
export const SkeletonSpacer = styled(_Skeleton)`
  display: block;
  margin: ${(p) => (p.space ? p.space : '0')}px auto 0;
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
export const InfoText = styled.p`
  color: ${(p) => p.theme.colors.primaryDefault};
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
`
export const CropValue = styled.span`
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin-right: 5px;
`
export const FlexSpan = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
export const FullReferBox = styled.div`
  margin-top: 40px;
  width: 100%;
`
export const Skeleton = styled(_Skeleton)`
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
