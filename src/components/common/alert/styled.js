import styled from 'styled-components'
import _AlertTitle from '@material-ui/lab/AlertTitle'
import _Alert from '@material-ui/lab/Alert'

export const AlertTitle = styled(_AlertTitle)`
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  margin-top: 2px;
`
export const AlertStyled = styled(_Alert)`
  background: ${(p) => p.theme.colors.startedPulseAnimation};
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  box-sizing: border-box;
  border-radius: 16px;
  margin: 0 auto;
  padding: 6px 60px 6px 23px;
  & .MuiAlert-message {
    color: ${(p) => p.theme.colors.secondary};
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    line-height: 16px;
  }
  .MuiSvgIcon-root {
    fill: ${(p) => p.theme.colors.activeSearch};
  }
  @media screen and (max-width: 768px) {
    padding: 6px 23px;
  }
`
export const Text = styled.span`
  margin-top: 13px;
  display: block;
`
