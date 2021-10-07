import React from 'react'
import { withTranslation } from 'react-i18next'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Skeleton from '@material-ui/lab/Skeleton'
import {
  TableContainerStyled,
  TableStyled,
  RowHead,
  TableTitle,
  Row,
  Cell,
  CellSkeleton,
  Flex,
  SkeletonCircle,
} from './styled'

const skeletonRow = [
  {
    row: [
      {
        value: 210,
        first: true,
      },
      {
        value: 40,
      },
      {
        value: 25,
      },
      {
        value: 100,
      },
      {
        value: 30,
      },
      {
        value: 75,
      },
    ],
  },
  {
    row: [
      {
        value: 100,
        first: true,
      },
      {
        value: 40,
      },
      {
        value: 25,
      },
      {
        value: 100,
      },
      {
        value: 30,
      },
      {
        value: 75,
      },
    ],
  },
  {
    row: [
      {
        value: 130,
        first: true,
      },
      {
        value: 40,
      },
      {
        value: 25,
      },
      {
        value: 80,
      },
      {
        value: 30,
      },
      {
        value: 75,
      },
    ],
  },
]

const MarketSkeleton = ({ t }) => (
  <TableContainerStyled component={Paper}>
    <TableStyled aria-label="simple table">
      <TableHead>
        <RowHead>
          <TableTitle align="left">{t('Market.CoveredBy')}</TableTitle>
          <TableTitle align="right">{t('Market.CoverSize')}</TableTitle>
          <TableTitle align="right">{t('Market.Currency')}</TableTitle>
          <TableTitle align="right">{t('Market.ExpiresAt')}</TableTitle>
          <TableTitle align="right">{t('Market.Cost')} (ETH)</TableTitle>
          <TableCell></TableCell>
        </RowHead>
      </TableHead>
      <TableBody>
        {skeletonRow.map((r, index) => (
          <Row key={index}>
            {r.row.map((cell, i) => (
              <Cell key={i}>
                {cell.first ? (
                  <Flex>
                    <SkeletonCircle
                      animation={false}
                      variant={'circle'}
                      width={25}
                      height={25}
                    />
                    <Skeleton
                      animation={false}
                      variant={'text'}
                      width={cell.value}
                      height={22}
                    />
                  </Flex>
                ) : (
                  <CellSkeleton
                    animation={false}
                    variant={'text'}
                    width={cell.value}
                    height={22}
                  />
                )}
              </Cell>
            ))}
          </Row>
        ))}
      </TableBody>
    </TableStyled>
  </TableContainerStyled>
)

export default withTranslation()(MarketSkeleton)
