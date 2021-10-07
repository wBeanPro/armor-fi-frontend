import styled from 'styled-components'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Skeleton from '@material-ui/lab/Skeleton'

export const ButtonGroup = styled(ToggleButtonGroup)`
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.defaultLightActive};

  & .MuiToggleButton-root {
    border: none;
  }
  & .MuiToggleButtonGroup-groupedHorizontal:not(:first-child) {
    border-left: 1px solid ${(p) => p.theme.colors.defaultLightActive};
  }

  @media screen and (max-width: 900px) {
    display: ${(p) => (p.ismobile ? 'block' : 'none')};
    border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};

    & .MuiToggleButtonGroup-groupedHorizontal:not(:first-child) {
      border-left: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
    }
  }
`

export const GasPriceLogo = styled.img`
  max-width: 17px;
  width: 100%;
  height: auto;

  @media screen and (max-width: 900px) {
    filter: brightness(0) invert(1);
  }
`
export const Button = styled(ToggleButton)`
  width: 40px;
  padding: 6px 11px;
  color: ${(p) => p.theme.colors.lightActive};
  &.MuiToggleButton-root.Mui-selected {
    font-weight: bold;
    color: ${(p) => p.theme.colors.lightActive};
  }

  @media screen and (max-width: 900px) {
    color: ${(p) => p.theme.colors.secondary};

    &.MuiToggleButton-root.Mui-selected {
      color: ${(p) => p.theme.colors.secondary};
      background: ${(p) => p.theme.colors.buttonActiveBg};
    }
  }
`

export const SkeletonLoader = styled(Skeleton)`
  width: 20px;
`
