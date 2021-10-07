import styled from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import { InputField } from '../../common/Input'
import Button from '@material-ui/core/Button'

export const Input = styled(InputField)`
  max-width: 285px;
  width: 100%;
  margin-left: 20px;
  & .MuiOutlinedInput-root {
    box-sizing: border-box;
    box-shadow: none;
    border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
    background: transparent;
    border-radius: 6px;
    font-family: 'Open Sans', sans-serif;
    color: ${(p) => p.theme.colors.secondary};
  }
  @media screen and (max-width: 448px) {
    margin-left: 0;
    max-width: 300px;
    margin-top: 15px;
  }
`
export const InputInfo = styled(InputAdornment)`
  & p {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: ${(p) => p.theme.colors.secondary};
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
  }
`
export const ButtonStyled = styled(Button)`
  font-family: 'Open Sans', sans-serif;
  height: 40px;
  background: transparent;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  padding: 7px;
  min-width: unset;
  margin-left: 10px;
  &.MuiButton-root.Mui-disabled {
    background: transparent;
    opacity: 0.1;
  }
  & svg {
    height: 24px;
    width: 24px;
  }

  &:hover {
    background: transparent;
    border-color: ${(p) => p.theme.colors.primaryLightTrue};
  }
  @media screen and (max-width: 448px) {
    margin-left: 0;
    margin-top: 15px;
  }
`
export const ManualAddButton = styled.div`
  overflow-x: hidden;
  display: flex;
  height: 55px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 140%;
  color: ${(p) => p.theme.colors._default};
  padding: 10px;
  margin-top: 20px;
  & svg {
    max-width: 24px;
    width: 100%;
    height: auto;
  }
  & span {
    width: 24px;
    height: 24px;
    margin-left: 13px;
  }
`

export const ManualAddFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  margin-top: 15px;

  @media screen and (max-width: 448px) {
    flex-direction: column;
  }
`
export const LoadingWrapper = styled.div`
  margin-top: -5px;
  padding: 0 0 10px;
`
