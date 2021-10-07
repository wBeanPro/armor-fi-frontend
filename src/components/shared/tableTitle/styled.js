import styled from 'styled-components'
import TableCell from '@material-ui/core/TableCell'

export const Title = styled(TableCell)`
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.secondary};
  padding: 15px 7px;
  border: none;
  font-family: 'Open Sans', sans-serif;
  @media screen and (min-width: 1080px) {
    white-space: nowrap;
  }
  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 17px;
    padding: 8px 5px;
  }
`
export const WrapTitle = styled.div`
  display: flex;
  align-items: center;
`
