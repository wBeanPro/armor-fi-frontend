import styled from 'styled-components'
import { CoverContainer } from '../../common/CoverContainer'
import InputAdornment from '@material-ui/core/InputAdornment'
import { ButtonStyled } from '../../common/Button'
import { InputField } from '../../common/Input'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import { formatETH, formatUSD } from '../../../helpers'

export const ModalTitle = styled.h4`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  color: ${(p) => p.theme.colors.primaryDefault};
`
export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
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
export const Container = styled(CoverContainer)`
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  margin-top: 32px;
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
export const ContentContainer = styled.div`
  padding: 21px 15px 15px;
`
export const ContentText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
`
export const Span = styled.span`
  color: ${(p) => p.theme.colors.secondary};
  font-weight: bold;
  margin: 0 5px;
`
export const MainInfo = styled.div`
  max-width: 590px;
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 40px;
`
export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.disabledText};
  & svg {
    max-width: 24px;
    height: 24px;
    width: 100%;
    margin-right: 10px;
  }
`
export const SliderContainer = styled.div`
  max-width: 515px;
  margin: 45px auto 0;

  @media screen and (max-width: 768px) {
    padding: 0 25px;
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
export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 38px;
`
