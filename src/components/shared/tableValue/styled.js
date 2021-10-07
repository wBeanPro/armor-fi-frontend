import styled from 'styled-components'
import TableCell from '@material-ui/core/TableCell'

export const Cell = styled(TableCell)`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  padding: 8px 7px;
  color: ${(p) => p.theme.colors.secondary};
  border: none;
  @media screen and (max-width: 600px) {
    padding: 6px 5px;
  }
`
