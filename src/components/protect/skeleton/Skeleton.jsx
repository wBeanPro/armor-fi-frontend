import React from 'react'
import { withTranslation } from 'react-i18next'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import {
  TableContainerStyled,
  TableStyled,
  RowHead,
  TableTitle,
  Row,
  Cell,
  CellSkeleton,
} from './styled'

const skeletonRow = [
  {
    row: [
      {
        value: 170,
        first: true,
      },
      {
        value: 65,
      },
      {
        value: 110,
      },
      {
        value: 50,
      },
      {
        value: 20,
        circle: true,
      },
    ],
  },
  {
    row: [
      {
        value: 75,
        first: true,
      },
      {
        value: 65,
      },
      {
        value: 125,
      },
      {
        value: 50,
      },
      {
        value: 20,
        circle: true,
      },
    ],
  },
]

const Skeleton = ({ t }) => (
  <TableContainerStyled component={Paper}>
    <TableStyled aria-label="simple table">
      <TableHead>
        <RowHead>
          <TableTitle align="left">{t('Protect.Asset')}</TableTitle>
          <TableTitle align="right">{t('Protect.TokenValue')} ($)</TableTitle>
          <TableTitle align="right">{t('Protect.Covered')} (% / $)</TableTitle>
          <TableTitle align="right">
            {t('Protect.ExtraAvailable')} (% / $)
          </TableTitle>
          <TableCell></TableCell>
        </RowHead>
      </TableHead>
      <TableBody>
        {skeletonRow.map((r, index) => (
          <Row key={index}>
            {r.row.map((cell, i) => (
              <Cell key={i}>
                <CellSkeleton
                  animation={false}
                  first={cell.first}
                  variant={cell.circle ? 'circle' : 'text'}
                  width={cell.value}
                  height={cell.circle ? cell.value : 22}
                />
              </Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </TableStyled>
  </TableContainerStyled>
)

export default withTranslation()(Skeleton)
