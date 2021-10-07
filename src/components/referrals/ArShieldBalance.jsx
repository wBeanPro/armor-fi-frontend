import React, { useEffect, useState } from 'react'
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
import {
  commas,
  removeEmitterListeners,
  turnOnEmitterListeners,
} from '../../helpers'
import { getShields } from '../../helpers'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
  GET_REFERRAL_CODE,
  REFERRAL_CODE_RETURNED,
  REFERRER_SET,
} from '../../constants'
import { ReferralRewardsEvents } from '../../stores/contracts/referralRewardsEvents'
import { BalanceManagerEvents } from '../../stores/contracts/balanceManagerEvents'
import { ArShieldControllerEvents } from '../../stores/contracts/arShieldController/arShieldControllerEvents'
import { RewardManagerEvents } from '../../stores/contracts/rewardManagerEvents'
import Store from '../../stores/store'

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const ArShieldBalance = ({ token, balances, account }) => {
  const getShieldBalance = () => {
    if (balances) {
      let i = balances.tokens.findIndex(
        (b) => b.toLowerCase() === token.shieldAddress.toLowerCase()
      )
      if (i >= 0) {
        return balances.balances[i]
      }
    }

    return 0
  }

  return (
    <BalanceListItem>
      <ListBalance>
        {getShieldBalance()} {token.symbol}
      </ListBalance>
      <ListBalanceButton disabled={true} onClick={() => {}}>
        WITHDRAW
      </ListBalanceButton>
    </BalanceListItem>
  )
}

export default ArShieldBalance
