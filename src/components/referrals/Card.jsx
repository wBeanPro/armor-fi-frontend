import React from 'react'
import ArmorIcon from '../icons/ArmorIcon'
import {
  CardWrapper,
  BoxBalance,
  HeaderBalance,
  ValueBalance,
  BalanceButton,
  ListBalanceButton,
  TotalValue,
  BalanceList,
  BalanceListItem,
  ListBalance,
} from './styled'
import { commas } from '../../helpers'
import { getShields } from '../../helpers'
import ArShieldBalance from './ArShieldBalance'

const Card = ({
  data,
  arnxmBalance,
  arcoreBalance,
  arShieldBalance,
  onWithdrawArCore,
  onWithdrawArNxm,
  account,
}) => (
  <CardWrapper>
    <BoxBalance>
      <HeaderBalance>arCore Balance</HeaderBalance>
      <ValueBalance>
        <span>{commas(2).format(arcoreBalance)} ETH</span>
      </ValueBalance>
      <BalanceButton disabled={arcoreBalance <= 0} onClick={onWithdrawArCore}>
        WITHDRAW
      </BalanceButton>
    </BoxBalance>

    <BoxBalance>
      <HeaderBalance>arNXM Balance</HeaderBalance>
      <ValueBalance>
        <span>{commas(2).format(arnxmBalance)} arNXM</span>
      </ValueBalance>
      <BalanceButton disabled={arnxmBalance <= 0} onClick={onWithdrawArNxm}>
        WITHDRAW
      </BalanceButton>
    </BoxBalance>

    <BoxBalance>
      <HeaderBalance>arShield Balances</HeaderBalance>
      <BalanceList>
        {getShields().map((token, index) => {
          return (
            <ArShieldBalance
              key={index}
              token={token}
              balances={arShieldBalance}
              account={account}
            />
          )
        })}
      </BalanceList>
    </BoxBalance>
  </CardWrapper>
)

export default Card
