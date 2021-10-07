import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import {
  ModalTitle,
  ActionContainer,
  Input,
  InputInfo,
  ActiveBtn,
  ActiveBtnText,
} from './withdrawModalStyled'
import Modal from '../common/modal/Modal'

const WithdrawModal = ({
  theme,
  closeModal,
  handleSubmit,
  t,
  isModalOpened,
}) => {
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = theme

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)
    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      setAmount(value)
    }
  }

  const handleClickTopUp = async () => {
    if (!amount || isNaN(+amount) || +amount <= 0) return setAmountError(true)
    try {
      setIsLoading(true)
      const dataObj = { amount }
      await handleSubmit(dataObj)
      closeModal()
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  return (
    <Modal closeModal={closeModal} isModalOpened={isModalOpened}>
      <ModalTitle bold>{t('Stake.WithdrawModal.Title')}</ModalTitle>
      <ActionContainer>
        <Input
          value={amount}
          onChange={handleChangeAmount}
          disabled={isLoading}
          error={amountError}
          placeholder="0"
          variant="outlined"
          InputProps={{
            endAdornment: <InputInfo position="end">ETH</InputInfo>,
          }}
        />
        <ActiveBtn
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleClickTopUp}
        >
          <ActiveBtnText>{t('Stake.WithdrawModal.ButtonTitle')}</ActiveBtnText>
        </ActiveBtn>
      </ActionContainer>
    </Modal>
  )
}

export default withTranslation()(withRouter(withTheme(WithdrawModal)))
