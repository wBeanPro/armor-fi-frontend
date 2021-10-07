import styled from 'styled-components'
import Switch from '@material-ui/core/Switch'

export const TooltipSwitcher = styled(Switch)`
  width: 56px;
  height: 36px;
  padding: 0;

  & .MuiSwitch-track,
  & .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
    background: ${(p) => p.theme.colors.transparentBg};
    border-radius: 20px;
    opacity: 1;
  }
  & .MuiIconButton-root {
    padding: 7px;
  }
  & .MuiSwitch-thumb {
    width: 22px;
    height: 22px;
    background: ${(p) =>
      p.checked ? p.theme.colors.active : p.theme.colors.primary};
  }
`
export const Label = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 160%;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primaryDefault};
  margin-right: 12px;

  @media screen and (max-width: 900px) {
    color: ${(p) => p.theme.colors.secondary};
  }
`
export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 17px;
`
