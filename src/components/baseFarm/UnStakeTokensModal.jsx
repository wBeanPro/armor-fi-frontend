import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import DownloadIcon from '../icons/DownloadIcon'
import {
  ModalTitle,
  ActionContainer,
  Input,
  InputInfo,
  ActiveBtn,
  ActiveBtnText,
  MaxButton,
  ButtonWrapper,
  Info,
} from './tokensModalStyled'

import Modal from '../common/modal/Modal'
import * as BN from 'bn.js'

const UnStakeTokensModal = ({
  theme,
  closeModal,
  handleSubmit,
  totalAssets,
  t,
  isModalOpened,
  isLoading,
}) => {
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const { colors } = theme

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)
    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      setAmount(value)
    }
  }

  const handleClickStake = async () => {
    if (!amount || isNaN(+amount) || +amount <= 0) return setAmountError(true)
    try {
      const dataObj = { amount }
      await handleSubmit(dataObj)
      closeModal()
    } catch (e) {
      console.error(e)
    }
  }

  const countDecimals = (value) => {
    if (Math.floor(value) === value) return 0
    return value.toString().split('.')[1].length || 0
  }

  const handlePercentAmount = (part = 1) => {
    if (new BN(totalAssets).toString() === '0') {
      return
    }
    setAmount((parseFloat(totalAssets) * part).toString()) // 100% be default
  }

  return (
    <Modal closeModal={closeModal} isModalOpened={isModalOpened}>
      <ModalTitle bold>{t('Rewards.UnStakeTokensModal.Title')}</ModalTitle>
      <ActionContainer>
        <ButtonWrapper>
          <MaxButton onClick={() => handlePercentAmount(0.25)}>25%</MaxButton>·
          <MaxButton onClick={() => handlePercentAmount(0.5)}>50%</MaxButton>·
          <MaxButton onClick={() => handlePercentAmount(0.75)}>75%</MaxButton>·
          <MaxButton onClick={() => handlePercentAmount(1)}>100%</MaxButton>
        </ButtonWrapper>
        <Input
          value={amount}
          onChange={handleChangeAmount}
          disabled={isLoading}
          error={amountError}
          placeholder="0"
          variant="outlined"
          InputProps={{
            endAdornment: <InputInfo position="end">TOKENS</InputInfo>,
          }}
        />
        <Info>
          Available: <span>{totalAssets}</span>
        </Info>
        <ActiveBtn
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleClickStake}
        >
          <ActiveBtnText>
            {t('Rewards.UnStakeTokensModal.ButtonTitle')}
          </ActiveBtnText>
        </ActiveBtn>
      </ActionContainer>
    </Modal>
  )
}

export default withTranslation()(withRouter(withTheme(UnStakeTokensModal)))
