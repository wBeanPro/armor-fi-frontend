import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import styled, { withTheme } from 'styled-components'
import DownloadIcon from '../../icons/DownloadIcon'
import {
  ModalTitle,
  ActionContainer,
  Input,
  InputInfo,
  ActiveBtn,
  ActiveBtnText,
  MaxButton,
  Info,
  ButtonWrapper,
} from './styled'

import Modal from '../modal/Modal'
import { FooterInfo } from './styled'
import * as BN from 'bn.js'
import AboutCircleIcon from '../../icons/AboutCircleIcon'

const NumberSelectionModal = ({
  children,
  theme,
  isLoading,
  isModalOpened,
  closeModal,
  onSubmit,
  onChange,
  title,
  inputText,
  actionText,
  totalAvailable,
  infoText,
}) => {
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const { colors } = theme

  useEffect(() => {
    return () => {
      if (isModalOpened) {
        setAmount('0')
      }
    }
  }, [isModalOpened])

  const handleChangeAmount = (e) => {
    let { value } = e.target
    setAmountError(false)

    // stops user from typing more than is available
    if (parseFloat(value) > parseFloat(totalAvailable)) {
      setAmount(totalAvailable.toString())
      onChange(totalAvailable.toString())
      return
    }
    setAmount(value)
    onChange(value)
  }

  const handleOnSubmit = async () => {
    if (!amount || isNaN(+amount) || +amount <= 0) return setAmountError(true)
    try {
      await onSubmit(amount)
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
    if (new BN(totalAvailable).toString() === '0') {
      return
    }
    let newAmount = (parseFloat(totalAvailable) * part).toString()
    setAmount(newAmount) // 100% be default
    onChange(newAmount)
  }

  return (
    <Modal closeModal={closeModal} isModalOpened={isModalOpened}>
      <ModalTitle bold>{title}</ModalTitle>
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
          type={'number'}
          placeholder="0"
          variant="outlined"
          InputProps={{
            endAdornment: <InputInfo position="end">{inputText}</InputInfo>,
          }}
        />
        {infoText && <Info>{infoText}</Info>}
        <ActiveBtn
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          <ActiveBtnText>{actionText}</ActiveBtnText>
        </ActiveBtn>
      </ActionContainer>
      {children && <FooterInfo>{children}</FooterInfo>}
    </Modal>
  )
}

export default withTranslation()(withRouter(withTheme(NumberSelectionModal)))
