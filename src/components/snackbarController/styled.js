import styled from 'styled-components'
import MuiSnackbar from '@material-ui/core/Snackbar'

export const SnackbarBox = styled(MuiSnackbar)`
  &.MuiSnackbar-anchorOriginBottomLeft {
    bottom: 12px;
    left: 12px;
    @media (min-width: 960px) {
      bottom: 50px;
      left: 80px;
    }
  }
  &.MuiSnackbar-root {
    max-width: calc(100vw - 24px);
  }
  & .MuiSnackbarContent-message {
    padding: 0;
  }

  & .MuiSnackbarContent-root {
    padding: 0px;
    min-width: auto;
    background-color: ${(p) => p.theme.colors.secondary};
    @media (min-width: 960px) {
      min-width: 500px;
    }
  }
  & .MuiSnackbarContent-action {
    margin-right: 0px;
  }

  @media screen and (max-width: 600px) {
    max-width: 400px;

    & .MuiSnackbarContent-root {
      position: relative;
    }
    & .MuiSnackbarContent-action {
      padding-left: 0;
      & .MuiIconButton-root {
        padding: 10px;
        position: absolute;
        right: -8px;
        top: -8px;
      }
    }
  }
`
export const SnackbarContent = styled.div`
  padding: 12px;
  border-radius: 4px;
  border-left: 5px solid ${(p) => p.theme.colors.snackbarBlue};
  @media screen and (max-width: 600px) {
    padding: 5px;
    display: flex;
    align-items: center;
  }
`
export const MessageContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  max-width: 400px;
`
export const MessageType = styled.p`
  font-size: 12px;
  color: ${(p) => p.theme.colors.snackbarBlue};
`
export const MessageContent = styled.p`
  font-size: 10px;
  color: ${(p) => p.theme.colors.snackbarLightBlack};
`
