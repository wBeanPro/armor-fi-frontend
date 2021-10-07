import React from 'react'
import ArmorIcon from '../icons/ArmorIcon'
import { withTranslation } from 'react-i18next'
import {
  CardWrapper,
  BoxBalance,
  HeaderBalance,
  SkeletonSpacer,
  TableContainerStyled,
  RowHead,
  TableTitle,
  Row,
  Cell,
  ReferBox,
  Wrapper,
  FullReferBox,
  BalanceButton,
  Skeleton,
} from './styled'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import { SubTitle } from '../common/SubTitle'

const ReferralsSkeleton = ({ t }) => (
  <>
    <CardWrapper>
      <BoxBalance>
        <HeaderBalance>arCore Balance</HeaderBalance>
        <SkeletonSpacer
          animation={false}
          variant="text"
          width={130}
          height={50}
          space="13"
        />
        <BalanceButton disabled={true}>WITHDRAW</BalanceButton>
      </BoxBalance>

      <BoxBalance>
        <HeaderBalance>arNXM Balance</HeaderBalance>
        <SkeletonSpacer
          animation={false}
          variant="text"
          width={150}
          height={50}
          space="13"
        />
        <BalanceButton disabled={true}>WITHDRAW</BalanceButton>
      </BoxBalance>
    </CardWrapper>
    <Wrapper>
      <ReferBox>
        <SubTitle>Referred Users</SubTitle>
        <TableContainerStyled component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <RowHead>
                <TableTitle align="left">{t('Referrals.User')}</TableTitle>
                <TableTitle align="left">{t('Referrals.Time')}</TableTitle>
              </RowHead>
            </TableHead>
            <TableBody>
              <Row tabIndex={-1}>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={110}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={60}
                    height={20}
                  />
                </Cell>
              </Row>
              <Row tabIndex={-1}>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={110}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={60}
                    height={20}
                  />
                </Cell>
              </Row>
              <Row tabIndex={-1}>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={110}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={60}
                    height={20}
                  />
                </Cell>
              </Row>
            </TableBody>
          </Table>
        </TableContainerStyled>
      </ReferBox>
      <ReferBox>
        <SubTitle>Recent Rewards</SubTitle>
        <TableContainerStyled component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <RowHead>
                <TableTitle align="left">{t('Referrals.User')}</TableTitle>
                <TableTitle align="left">{t('Referrals.Protocol')}</TableTitle>
                <TableTitle align="left">{t('Referrals.Amount')}</TableTitle>
                <TableTitle align="left">Time</TableTitle>
              </RowHead>
            </TableHead>
            <TableBody>
              <Row tabIndex={-1}>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={80}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={60}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={40}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={30}
                    height={20}
                  />
                </Cell>
              </Row>
              <Row tabIndex={-1}>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={80}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={60}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={40}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={30}
                    height={20}
                  />
                </Cell>
              </Row>
              <Row tabIndex={-1}>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={80}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={50}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={50}
                    height={20}
                  />
                </Cell>
                <Cell align="left">
                  <Skeleton
                    animation={false}
                    variant="text"
                    width={30}
                    height={20}
                  />
                </Cell>
              </Row>
            </TableBody>
          </Table>
        </TableContainerStyled>
      </ReferBox>
    </Wrapper>
    <FullReferBox>
      <SubTitle>Withdraws</SubTitle>
      <TableContainerStyled component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <RowHead>
              <TableTitle align="left">Protocol</TableTitle>
              <TableTitle align="left">Amount</TableTitle>
            </RowHead>
          </TableHead>
          <TableBody>
            <Row tabIndex={-1}>
              <Cell align="left">
                <Skeleton
                  animation={false}
                  variant="text"
                  width={80}
                  height={20}
                />
              </Cell>
              <Cell align="left">
                <Skeleton
                  animation={false}
                  variant="text"
                  width={100}
                  height={20}
                />
              </Cell>
            </Row>
            <Row tabIndex={-1}>
              <Cell align="left">
                <Skeleton
                  animation={false}
                  variant="text"
                  width={80}
                  height={20}
                />
              </Cell>
              <Cell align="left">
                <Skeleton
                  animation={false}
                  variant="text"
                  width={90}
                  height={20}
                />
              </Cell>
            </Row>
            <Row tabIndex={-1}>
              <Cell align="left">
                <Skeleton
                  animation={false}
                  variant="text"
                  width={100}
                  height={20}
                />
              </Cell>
              <Cell align="left">
                <Skeleton
                  animation={false}
                  variant="text"
                  width={70}
                  height={20}
                />
              </Cell>
            </Row>
          </TableBody>
        </Table>
      </TableContainerStyled>
    </FullReferBox>
  </>
)

export default withTranslation()(ReferralsSkeleton)
