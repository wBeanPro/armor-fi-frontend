import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import PoolActions from './PoolActions'
import ExternalIcon from '../icons/ExternalIcon'
import ArmorIcon from '../icons/ArmorIcon'
import {
  Card,
  Text,
  Link,
  Icon,
  Name,
  FlexContent,
  Content,
  Badge,
  LogoToken,
  CellItem,
  CardRow,
  CardsContainer,
} from './styled'

const Cards = ({ theme, pools, onApprove, onStake, onUnstake }) => {
  const { colors } = theme

  return (
    <CardsContainer>
      {pools.map((p, i) => (
        <Card key={i}>
          <CardRow>
            <CellItem>
              <Text>Pool</Text>
            </CellItem>
            <CellItem>
              <Link href={p.poolUrl} target="_blank">
                <Icon
                  src={require(`../../assets/${p.poolIcon}`)}
                  alt={`${p.poolName} icon`}
                />
                <Name>{p.poolPair}</Name>
                <ExternalIcon color={colors.primary} />
              </Link>
            </CellItem>
          </CardRow>
          <CardRow>
            <CellItem>
              <Text>Yield per $1,000</Text>
            </CellItem>
            <CellItem>
              <FlexContent>
                <ArmorIcon />
                <Content>
                  <Text bold>{p.yealdArmor}</Text>
                  <Text>ARMOR/day</Text>
                </Content>
              </FlexContent>
              <Badge>{p.rewardMultiplier}x Reward</Badge>
            </CellItem>
          </CardRow>
          <CardRow>
            <CellItem>
              <Text>ROI</Text>
            </CellItem>
            <CellItem>
              <Text bold>{p.roiDay} daily</Text>
              <Text>{p.roiMonth} monthly</Text>
              <Text>{p.roiYear} yearly</Text>
            </CellItem>
          </CardRow>
          <CardRow>
            <CellItem>
              <Text>Underlying tokens</Text>
            </CellItem>
            <CellItem>
              {p.underlyingTokens.map(
                ({ tokenName, tokenBalance, tokenIcon }, index) => (
                  <FlexContent key={index} underlyingTokens>
                    <LogoToken
                      src={require(`../../assets/${tokenIcon}`)}
                      alt={`${tokenName} icon`}
                    />
                    <Text>
                      {tokenBalance} {tokenName}
                    </Text>
                  </FlexContent>
                )
              )}
            </CellItem>
          </CardRow>
          <CardRow>
            <CellItem>
              <Text>Balance</Text>
            </CellItem>
            <CellItem>
              <Text>Available: {p.balanceAvailable}</Text>
              <Text>Staked: {p.balanceStaked}</Text>
              <Text>{p.balancePair}</Text>
            </CellItem>
          </CardRow>
          <CardRow>
            <CellItem>
              <Text>Earnings</Text>
            </CellItem>
            <CellItem>
              <FlexContent>
                <ArmorIcon />
                <Content>
                  <Text bold>{p.earningsArmor}</Text>
                  <Text>ARMOR</Text>
                </Content>
              </FlexContent>
              <Badge disable={p.earningsArmor === 0 || p.earningsArmor === '0'}>
                No rewards
              </Badge>
            </CellItem>
          </CardRow>
          <PoolActions
            pool={p}
            isApproved={p.isApproved}
            onApprove={onApprove}
            onStake={onStake}
            onUnstake={onUnstake}
          />
        </Card>
      ))}
    </CardsContainer>
  )
}

export default withTranslation()(withRouter(withTheme(Cards)))
