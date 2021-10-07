import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

export const LoadContainer = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
`
export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
export const Spinner = styled(CircularProgress)`
  &.MuiCircularProgress-colorPrimary {
    color: ${(p) => p.fill};
  }
`
