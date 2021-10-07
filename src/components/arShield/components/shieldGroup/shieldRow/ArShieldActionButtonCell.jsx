import { ActionWrapper } from '../styled'
import Button from '../../../../common/button/Button'
import React from 'react'
import { ActionCell } from '../styled'

const ArShieldActionButtonCell = ({
  onMint,
  onRedeem,
  isConnected,
  isLoading,
}) => {
  return isConnected ? (
    <ActionCell align="right">
      <ActionWrapper>
        <Button
          buttonText="deposit"
          isDisabled={isLoading}
          onClick={onMint}
          bordered={true}
          margin="0 7px"
        />
        <Button
          buttonText="withdraw"
          isDisabled={isLoading}
          onClick={onRedeem}
          bordered={true}
          margin="0 7px"
        />
      </ActionWrapper>
    </ActionCell>
  ) : (
    <></>
  )
}

export default ArShieldActionButtonCell
