import { Cell } from '../styled'
import React from 'react'
import { Skeleton } from '../../../../baseFarm/baseFarming/styled'

const PercentageCell = ({ cost, isConnected }) => {
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
    <Cell normal align="right">
      {cost}%
    </Cell>
  )
}

export default PercentageCell
