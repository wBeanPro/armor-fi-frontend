import React from 'react'
import { withTranslation } from 'react-i18next'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {
  TableContainerStyled,
  TableStyled,
  TitleCell,
  Cell,
  CellSkeleton,
  Box,
  Header,
  TitleWrapper,
  TitleText,
  BoxRow,
  Column,
  Skeleton,
  SkeletonFlex,
  SkeletonCircle,
} from './styled'

const skeletonRow = [
  {
    row: [
      {
        value: 130,
        first: true,
      },
      {
        value: 45,
      },
      {
        value: 75,
      },
      {
        value: 65,
      },
      {
        value: 90,
      },
      {
        value: 80,
      },
    ],
  },
]

const StakeSkeleton = ({ t, unstake, title, animation, rewards }) => (
  <>
    {rewards ? (
      <Box>
        <BoxRow>
          <Column>
            <SkeletonFlex>
              <SkeletonCircle
                animation={animation ? 'pulse' : false}
                variant={'circle'}
                width={30}
                height={30}
              />
              <Skeleton
                animation={animation ? 'pulse' : false}
                variant={'text'}
                width={180}
                height={25}
              />
            </SkeletonFlex>

            <Skeleton
              animation={animation ? 'pulse' : false}
              variant={'text'}
              width={100}
              height={25}
            />
            <Skeleton
              animation={animation ? 'pulse' : false}
              variant={'text'}
              width={160}
              height={25}
            />
            <Skeleton
              animation={animation ? 'pulse' : false}
              variant={'text'}
              width={80}
              height={25}
            />
          </Column>
          <Column>
            <Skeleton
              animation={animation ? 'pulse' : false}
              variant={'text'}
              width={180}
              height={25}
            />
            <Skeleton
              animation={animation ? 'pulse' : false}
              variant={'text'}
              width={80}
              height={25}
            />
            <Skeleton
              animation={animation ? 'pulse' : false}
              variant={'text'}
              width={100}
              height={25}
            />
          </Column>
        </BoxRow>
      </Box>
    ) : (
      <Box>
        <Header>
          <TitleWrapper>
            <TitleText>{title}</TitleText>
          </TitleWrapper>
        </Header>
        <TableContainerStyled unstake="true" component={Paper}>
          <TableStyled unstake="true" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TitleCell align="left">{t('Stake.Asset')}</TitleCell>
                <TitleCell align="right">{t('Stake.Amount')}</TitleCell>
                <TitleCell align="right">{t('Stake.Expiration')}</TitleCell>
                <TitleCell align="right">{t('Stake.Cost')}</TitleCell>
                <TitleCell align="right">{t('Stake.Reward')}</TitleCell>
                <TitleCell align="right">{t('Stake.EstTotalReward')}</TitleCell>
                {unstake && <TitleCell align="right"></TitleCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {skeletonRow.map((r, index) => (
                <TableRow key={index}>
                  {r.row.map((cell, i) => (
                    <Cell skeleton="true" key={i}>
                      <CellSkeleton
                        animation={animation ? 'pulse' : false}
                        first={cell.first ? 1 : 0}
                        variant={'text'}
                        width={cell.value}
                        height={25}
                      />
                    </Cell>
                  ))}
                  {unstake && (
                    <Cell skeleton="true">
                      <CellSkeleton
                        animation={animation ? 'pulse' : false}
                        variant={'text'}
                        width={60}
                        height={25}
                      />
                    </Cell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </TableStyled>
        </TableContainerStyled>
      </Box>
    )}
  </>
)

export default withTranslation()(StakeSkeleton)
