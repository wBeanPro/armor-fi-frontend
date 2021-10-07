import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { Button, ButtonsBox, Dropdown, SelectMenu, Actions } from './styled'

const PoolActions = ({
  t,
  pool,
  isApproved,
  onApprove,
  onStake,
  onUnstake,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isApprovable, setIsApprovable] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [isStakable, setIsStakable] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [stakePlatform, setStakePlatform] = useState('uniswap')

  useEffect(() => {
    // Detect if approvable
    if (!isApproved) {
      setIsApprovable(true)
    }

    // Detect if stakable/unstakable
    // TODO: determine what to do if balance or staked value equals zero
    if (isApproved) {
      setIsStakable(true)
    }

    setIsLoading(false)
  }, [])

  const handleClickApprove = async () => {
    setIsApproving(true)
    await onApprove(pool, stakePlatform)
    setIsApproving(false)
  }

  const handleClickStake = async () => {
    setIsStaking(true)
    await onStake(pool, stakePlatform)
    setIsStaking(false)
  }

  const handleClickUnstake = async () => {
    setIsUnstaking(true)
    await onUnstake(pool, stakePlatform)
    setIsUnstaking(false)
  }

  const handleChangeStakePlatform = (e) => {
    setStakePlatform(e.target.value)
  }

  return (
    <>
      {isApprovable && (
        <Button
          variant="contained"
          disabled={isApproving}
          onClick={handleClickApprove}
        >
          APPROVE STAKING
        </Button>
      )}

      {isStakable && (
        <Actions>
          <Dropdown
            select
            name={'currency'}
            value={stakePlatform}
            onChange={handleChangeStakePlatform}
            SelectProps={{ native: false }}
            disabled={isLoading}
          >
            <SelectMenu value="uniswap">Uniswap</SelectMenu>
            <SelectMenu value="sushiswap">Sushiswap</SelectMenu>
            <SelectMenu value="balancer">Balancer</SelectMenu>
          </Dropdown>
          <ButtonsBox>
            <Button
              variant="contained"
              disabled={isStaking}
              onClick={handleClickStake}
            >
              STAKE
            </Button>
            <Button
              variant="contained"
              disabled={isUnstaking}
              onClick={handleClickUnstake}
            >
              UNSTAKE
            </Button>
          </ButtonsBox>
        </Actions>
      )}
    </>
  )
}

export default withTranslation()(withRouter(withTheme(PoolActions)))
