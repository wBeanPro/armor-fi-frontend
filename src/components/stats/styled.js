import styled, { css } from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import _Skeleton from '@material-ui/lab/Skeleton'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import _TableBody from '@material-ui/core/TableBody'
import Checkbox from '@material-ui/core/Checkbox'

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 45px;
  flex-wrap: wrap;
  margin-bottom: ${(p) => (p.noaccount ? '-2px' : '0')};
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`
export const Input = styled(TextField)`
  max-width: 285px;
  width: 100%;
  height: 36px;
  background: ${(p) => p.theme.colors.defaultArrow};
  box-shadow: none;
  border-radius: 6px;
  .MuiOutlinedInput-root {
    border-radius: 6px;
    display: flex;
    align-items: center;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
  }
  .MuiInputAdornment-positionEnd {
    margin-left: 0;
    font-family: 'Open Sans', sans-serif;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  .MuiOutlinedInput-input {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: ${(p) => p.theme.colors.disabledText};
  }
  .MuiOutlinedInput-inputAdornedStart {
    padding-left: 10px;
  }
  @media screen and (max-width: 900) {
    max-width: 220px;
  }
  @media screen and (max-width: 600) {
    max-width: 290px;
  }
`
export const RefreshButton = styled(Button)`
  padding: 5px 10px;
  border: 1px solid
    ${(p) => (p.disabled ? 'transparent' : p.theme.colors.buttonActiveBg)};
  min-width: unset;
  border-radius: 6px;
  height: unset;
  max-height: 36px;
  margin-right: 20px;
  & svg {
    height: 24px;
    width: 24px;
  }
  .MuiButton-textPrimary {
    color: ${(p) => p.theme.colors.activeSearch};
  }
`
export const SkeletonContainer = styled.div`
  width: 100%;
`
export const SkeletonCircle = styled(_Skeleton)`
  margin-right: 11px;
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`
export const Skeleton = styled(_Skeleton)`
  background-color: ${(p) => p.theme.colors.skeletonBg};
`
export const TableBody = styled(_TableBody)`
  padding-bottom: 2px;
`
export const Checkmark = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
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
  position: relative;
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
  margin: 0;
  position: relative;
  & .MuiFormControlLabel-label {
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.02em;
    color: ${(p) => p.theme.colors.primaryDefault};
  }
`
