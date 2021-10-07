import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import PoolActions from './PoolActions'
import ExternalIcon from '../icons/ExternalIcon'
import ArmorIcon from '../icons/ArmorIcon'
import {
  Cell,
  Row,
  Text,
  Icon,
  Name,
  Link,
  FlexContent,
  Content,
  Badge,
  LogoToken,
  Tooltip,
} from './styled'

const Pool = ({ theme, pools, onApprove, onStake, onUnstake }) => {
  const { colors } = theme

  return (
    <>
      {pools.map((p, i) => (
        <Row key={i}>
          <Cell>
            <Link href={p.poolUrl} target="_blank">
              <Icon
                src={require(`../../assets/${p.poolIcon}`)}
                alt={`${p.poolName} icon`}
              />
              <Name>{p.poolPair}</Name>
              <ExternalIcon color={colors.primary} />
              <Tooltip>{p.poolPair}</Tooltip>
            </Link>
          </Cell>
          <Cell>
            <FlexContent>
              <ArmorIcon />
              <Content>
                <Text bold>{p.yealdArmor}</Text>
                <Text>ARMOR/day</Text>
              </Content>
            </FlexContent>
            <Badge>{p.rewardMultiplier}x Reward</Badge>
          </Cell>
          <Cell>
            <Text bold>{p.roiDay} daily</Text>
            <Text>{p.roiMonth} monthly</Text>
            <Text>{p.roiYear} yearly</Text>
          </Cell>
          <Cell underlyingTokens>
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
          </Cell>
          <Cell>
            <Text>Available: {p.balanceAvailable}</Text>
            <Text>Staked: {p.balanceStaked}</Text>
            <Text>{p.balancePair}</Text>
          </Cell>
          <Cell>
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
          </Cell>
          <Cell>
            <PoolActions
              pool={p}
              isApproved={p.isApproved}
              onApprove={onApprove}
              onStake={onStake}
              onUnstake={onUnstake}
            />
          </Cell>
        </Row>
      ))}
    </>
  )
}

export default withTranslation()(withRouter(withTheme(Pool)))
