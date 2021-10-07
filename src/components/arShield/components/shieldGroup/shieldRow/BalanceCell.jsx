import Tooltip from '@material-ui/core/Tooltip'
import { Cell } from '../styled'
import React from 'react'
import { Skeleton } from '../../../../baseFarm/baseFarming/styled'

const BalanceCell = ({ balance, title, isConnected }) => {
  return !isConnected ? (
    <Cell align="right">
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Skeleton
          animation={!isConnected ? 'pulse' : false}
          variant="text"
          height={25}
          width={50}
        />
      </div>
    </Cell>
  ) : (
    <Cell align="right">{balance}</Cell>
  )
}

export default BalanceCell
