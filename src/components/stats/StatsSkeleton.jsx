import React from 'react'
import { withTranslation } from 'react-i18next'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {
  SkeletonContainer,
  SkeletonCircle,
  Skeleton,
  TableBody,
} from './styled'
import { Cell, TableBox, TableStats, TableValue, Name } from './tableStyled'

const skeletonRows = [
  {
    value1: 140,
    value2: 80,
    value3: 50,
    value4: 80,
    value5: 80,
  },
  {
    value1: 170,
    value2: 90,
    value3: 60,
    value4: 90,
    value5: 80,
  },
  {
    value1: 150,
    value2: 100,
    value3: 70,
    value4: 70,
    value5: 80,
  },
]

const StatsSkeleton = ({ t, animation }) => {
  return (
    <SkeletonContainer>
      <TableBox>
        <TableStats sleleton="true" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <Cell>{t('Stats.Table.Contract')}</Cell>
                <Cell>ETH {t('Stats.Table.Covered')}</Cell>
                <Cell>DAI {t('Stats.Table.Covered')}</Cell>
                <Cell capitalize="true">{t('Stats.Table.Covers')}</Cell>
                <Cell capitalize="true">Cover available</Cell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skeletonRows.map((r, index) => (
                <TableRow key={index}>
                  <Name>
                    <SkeletonCircle
                      animation={animation ? 'pulse' : false}
                      variant={'circle'}
                      width={25}
                      height={25}
                    />
                    <Skeleton
                      animation={animation ? 'pulse' : false}
                      variant={'text'}
                      width={r.value1}
                      height={22}
                    />
                  </Name>
                  <TableValue>
                    <Skeleton
                      animation={animation ? 'pulse' : false}
                      variant={'text'}
                      width={r.value2}
                      height={22}
                    />
                  </TableValue>
                  <TableValue>
                    <Skeleton
                      animation={animation ? 'pulse' : false}
                      variant={'text'}
                      width={r.value3}
                      height={22}
                    />
                  </TableValue>
                  <TableValue>
                    <Skeleton
                      animation={animation ? 'pulse' : false}
                      variant={'text'}
                      width={r.value4}
                      height={22}
                    />
                  </TableValue>
                  <TableValue>
                    <Skeleton
                      animation={animation ? 'pulse' : false}
                      variant={'text'}
                      width={r.value5}
                      height={22}
                    />
                  </TableValue>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableStats>
      </TableBox>
    </SkeletonContainer>
  )
}

export default withTranslation()(StatsSkeleton)
