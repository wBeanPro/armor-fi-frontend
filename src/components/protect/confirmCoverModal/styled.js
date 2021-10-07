import styled from 'styled-components'
import { CoverContainer } from '../../common/CoverContainer'
import InputAdornment from '@material-ui/core/InputAdornment'
import { InputField } from '../../common/Input'
import Slider from '@material-ui/core/Slider'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import { formatETH, formatUSD } from '../../../helpers'

export const ModalTitle = styled.h4`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  color: ${(p) => p.theme.colors.primaryDefault};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`
export const EventTitle = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.colors.primaryDefault};
  margin-top: ${(p) => (p.nospace ? '10px' : '30px')};
`
export const AssetTitle = styled.h4`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  color: ${(p) => p.theme.colors.primaryDefault};
  margin-top: 20px;
`
export const Container = styled(CoverContainer)`
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  margin-top: 32px;
`
export const ContentContainer = styled.div`
  padding: 21px 15px 30px;
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
export const MainInfo = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  margin-top: 25px;
  width: 50%;
  & span {
    color: ${(p) => p.theme.colors.primaryLightTrue};
    font-weight: bold;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
    margin-top: 20px;
    &:last-of-type {
      margin-top: 10px;
    }
  }
`
export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`
export const ErrorMessage = styled.p`
  color: ${(p) => p.theme.colors.error};
  text-align: center;
  margin-top: 2px;
  & span {
    font-weight: bold;
    margin: 0 auto;
  }
`
export const DividerText = styled.div`
  padding-top: 15px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  border-top: 1px solid ${(p) => p.theme.colors.strongDefault};
  max-width: 350px;
  margin: 30px auto 0;
`
export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`
export const Input = styled(InputField)`
  max-width: 186px;
  width: 100%;
  max-height: 28px;
  & .MuiOutlinedInput-input {
    padding: 7px 14px;
  }
  & .MuiOutlinedInput-root {
    box-shadow: none;
    background: ${(p) => p.theme.colors._default};
    border: none;
  }
`
export const InputInfo = styled(InputAdornment)`
  & p {
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-align: right;
    text-transform: uppercase;
    color: ${(p) => p.theme.colors.primary};
  }
`
export const SliderContainer = styled.div`
  max-width: 515px;
  margin: 45px auto 0;

  @media screen and (max-width: 768px) {
    padding: 0 25px;
  }
`
export const SliderBox = styled(Slider)`
  padding: 20px 0 !important;

  & .MuiSlider-mark {
    opacity: 1;
    background: ${(p) => p.theme.colors.buttonActiveBg};
    border-radius: 10px;
    width: 2px;
    height: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  & .MuiSlider-rail,
  & .MuiSlider-track {
    background: ${(p) => p.theme.colors.buttonActiveBg};
    opacity: 1;
  }
  & .MuiSlider-thumb {
    width: 14px;
    height: 14px;
    background: ${(p) => p.theme.colors.active};
    box-shadow: 0px 0px 5px ${(p) => p.theme.colors.sliderThumb};
    margin-left: -7px;
  }
  & .MuiSlider-markLabel {
    top: 95%;
    transform: translate(-50%, -50%);
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: ${(p) => p.theme.colors.disabledText};
    &::before {
      position: absolute;
      top: -29px;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
    &[data-index='0'] {
      color: ${(p) =>
        p.currentvalue === p.monthlycost * 0.25
          ? p.theme.colors.secondary
          : p.theme.colors.disabledText};
      &::before {
        content: '+ ${(p) =>
          p.isUsdPrimary
            ? formatUSD(p.ethPrice * p.monthlycost * 0.25, {
                compact: true,
                digits: 1,
              })
            : formatETH(p.monthlycost * 0.25, { compact: true, digits: 2 })}';
      }
    }
    &[data-index='1'] {
      color: ${(p) =>
        p.currentvalue === p.monthlycost * 0.5
          ? p.theme.colors.secondary
          : p.theme.colors.disabledText};
      &::before {
        content: '+ ${(p) =>
          p.isUsdPrimary
            ? formatUSD(p.ethPrice * p.monthlycost * 0.5, {
                compact: true,
                digits: 1,
              })
            : formatETH(p.monthlycost * 0.5, { compact: true, digits: 2 })}';
      }
    }
    &[data-index='2'] {
      color: ${(p) =>
        p.currentvalue === p.monthlycost * 1
          ? p.theme.colors.secondary
          : p.theme.colors.disabledText};
      &::before {
        content: '+ ${(p) =>
          p.isUsdPrimary
            ? formatUSD(p.ethPrice * p.monthlycost * 1, {
                compact: true,
                digits: 1,
              })
            : formatETH(p.monthlycost * 1, { compact: true, digits: 2 })}';
      }
    }
    &[data-index='3'] {
      color: ${(p) =>
        p.currentvalue === p.monthlycost * 3
          ? p.theme.colors.secondary
          : p.theme.colors.disabledText};
      &::before {
        content: '+ ${(p) =>
          p.isUsdPrimary
            ? formatUSD(p.ethPrice * p.monthlycost * 3, {
                compact: true,
                digits: 1,
              })
            : formatETH(p.monthlycost * 3, { compact: true, digits: 2 })}';
      }
    }
    &[data-index='4'] {
      color: ${(p) =>
        p.currentvalue === p.monthlycost * 6
          ? p.theme.colors.secondary
          : p.theme.colors.disabledText};
      &::before {
        content: '+ ${(p) =>
          p.isUsdPrimary
            ? formatUSD(p.ethPrice * p.monthlycost * 6, {
                compact: true,
                digits: 1,
              })
            : formatETH(p.monthlycost * 6, { compact: true, digits: 2 })}';
      }
    }
    &[data-index='5'] {
      color: ${(p) =>
        p.currentvalue === p.monthlycost * 12
          ? p.theme.colors.secondary
          : p.theme.colors.disabledText};
      &::before {
        content: '+ ${(p) =>
          p.isUsdPrimary
            ? formatUSD(p.ethPrice * p.monthlycost * 12, {
                compact: true,
                digits: 1,
              })
            : formatETH(p.monthlycost * 12, { compact: true, digits: 2 })}';
      }
    }
  }
  & .MuiSlider-valueLabel {
    top: -20px;
    left: 50%;
    transform: scale(1) translateX(-50%) !important;
    & span {
      background: none;
      width: unset;
      height: unset;
    }
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
    p.checked
      ? p.theme.colors.selectedCoverRow
      : p.orangeWarning
      ? p.theme.colors.selectedWarningRow
      : p.redWarning
      ? p.theme.colors.selectedErrorRow
      : 'transparent'};

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
export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.disabledText};
  margin-top: 20px;
  & svg {
    max-width: 24px;
    height: 24px;
    width: 100%;
    margin-right: 10px;
  }
`
export const Checkmark = styled.div`
  position: absolute;
  top: 3px;
  left: 10px;
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
  position: absolute;
  top: -7px;
  left: 0px;

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
  position: relative;
  padding-left: 36px;
  max-width: 500px;
  width: 100%;
  margin: 15px auto 0;
  display: block;
  & .MuiTypography-root {
    color: ${(p) => p.theme.colors.primaryDefault};
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    line-height: 16px;
    & a {
      font-weight: bold;
      text-decoration: none;
      color: ${(p) => p.theme.colors.active};
    }
  }
`
export const EventLink = styled.a`
  text-decoration: none;
  color: ${(p) => p.theme.colors.active};
`
export const EventBug = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => p.theme.colors.primaryDefault};
  position: relative;
  padding-left: 10px;
  margin-left: 15px;
  &:before {
    position: absolute;
    content: '';
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: ${(p) => p.theme.colors.primaryDefault};
    height: 3px;
    width: 3px;
    border-radius: 50%;
  }
`
export const EventWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
`
export const AssetsWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
`
export const SpanValue = styled.span`
  font-weight: normal;
`
export const Buttons = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 550px) {
    & button {
      margin: 15px auto 0;
    }
  }
`
