import Button from '../../../common/button/Button'
import React from 'react'

const RewardsButton = () => (
  <Button
    buttonText="Rewards"
    tooltipText="LP rewards for arTokens will be available soon."
    isDisabled={true}
    onClick={() => console.log('Rewards')}
    bordered={false}
    margin="0"
  />
)

export default RewardsButton
