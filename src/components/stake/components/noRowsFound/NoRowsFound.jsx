import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { NoAssetsTableRow } from './styled'

export const NoRowsFound = (props) => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={props.colSpan}>
        <NoAssetsTableRow>{props.text}</NoAssetsTableRow>
      </TableCell>
    </TableRow>
  )
}
