import styled from 'styled-components'
import { CoverContainer } from '../../common/CoverContainer'
import { ButtonStyled } from '../../common/Button'
import Button from '@material-ui/core/Button'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

export const ModalTitle = styled.h4`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  color: ${(p) => p.theme.colors.primaryDefault};
`
export const ActiveBtn = styled(ButtonStyled)`
  padding: 6px;
  height: unset;
  box-shadow: none;
  margin: 23px auto 0;
  max-width: max-content;
  background: ${(p) => p.theme.colors.buttonActiveBg};
  width: 100%;
  display: block;
  &.MuiButton-contained.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    & h4 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }
`
export const ActiveBtnText = styled.h4`
  color: ${(p) => p.theme.colors.secondary};
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
`
export const Container = styled(CoverContainer)`
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  margin-top: 32px;
`
export const ContentContainer = styled.div`
  padding: 21px 15px 20px;
`
export const CancelButton = styled(Button)`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  cursor: pointer;
  margin: 20px auto 0;
  max-width: fit-content;
  padding: 6px 10px;
  color: ${(p) => p.theme.colors.primaryLightTrue};
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: center;
`
export const DescriptionText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  max-width: 465px;
  width: 100%;
  margin: 22px auto 0;
`
export const CancelActiveBtn = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.active};
  padding: 6px;
  margin: 18px auto -5px;
  max-width: max-content;
  width: 100%;
  display: block;
`
export const AssetTitle = styled.h4`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  color: ${(p) => p.theme.colors.primaryDefault};
  margin-top: 20px;
`
export const TableContainerStyled = styled(TableContainer)`
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
  @media screen and (max-width: 600px) {
    width: 500px;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  @media screen and (max-width: 448px) {
    width: 470px;
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
export const Row = styled(TableRow)`
  min-height: 51px;
  background: ${(p) =>
    p.checked ? p.theme.colors.selectedCoveredRow : 'transparent'};

  @media screen and (max-width: 600px) {
    min-height: unset;
  }
`
export const AssetsLogo = styled(TableCell)`
  padding: 8px 15px;

  @media screen and (max-width: 600px) {
    padding: 6px 9px;
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
export const AssetLogoImg = styled.img`
  border-radius: 12px;
  height: 24px;
  width: 24px;
  margin-right: 6px;
`
export const SpanValue = styled.span`
  font-weight: normal;
`
export const AssetTableWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
`
