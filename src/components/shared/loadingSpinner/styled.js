import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`
export const Spinner = styled(CircularProgress)`
  &.MuiCircularProgress-colorPrimary {
    color: ${(p) => p.fill};
  }
`
