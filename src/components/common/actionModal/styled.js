import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Paragraph } from '../Paragraph'

export const ModalTitle = styled(Paragraph)`
  font-weight: bold;
  background: ${(p) => p.theme.colors.transparentBg};
  border-radius: 16px 16px 0px 0px;
  padding: 20px 10px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
`
export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px 28px;
`
export const Spinner = styled(CircularProgress)`
  &.MuiCircularProgress-colorPrimary {
    color: ${(p) => p.fill};
  }
`
export const ActionText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  margin-top: 15px;
  color: ${(p) => p.theme.colors.secondary};
`
