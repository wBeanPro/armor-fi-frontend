import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import {
  countDecimals,
  turnOnEmitterListeners,
  removeEmitterListeners,
  formatETH,
  formatUSD,
} from '../../../helpers'
import {
  ModalTitle,
  ActionContainer,
  Input,
  InputInfo,
  ActiveBtn,
  ActiveBtnText,
  Container,
  CancelButton,
  ContentContainer,
  MainInfo,
  InfoWrapper,
  Value,
} from './styled'
import Store from '../../../stores/store'
import {
  CONTRACT_BALANCES_RETURNED,
  GET_CONTRACT_BALANCES,
  SNACKBAR_ERROR,
} from '../../../constants'
import Button from '../../common/button/Button'

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const EditNotCoveredModal = ({
  t,
  theme,
  closeModal,
  handleSubmit,
  availableCoverage,
  editNotCoveredValue,
  ethPrice,
}) => {
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [capacity, setCapacity] = useState('0')
  const [currentAmount, setCurrentAmount] = useState('')

  useEffect(() => {
    const _available = availableCoverage.find(
      (c) =>
        c.address.toLowerCase() === editNotCoveredValue.address.toLowerCase()
    )

    if (_available) {
      const _formatted = parseFloat(_available.coverage_left).toFixed()
      setCapacity(_formatted)
    }

    dispatcher.dispatch({ type: GET_CONTRACT_BALANCES, content: {} })
    const events = [[CONTRACT_BALANCES_RETURNED, contractBalancesReturned]]
    turnOnEmitterListeners(emitter, events)

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (
      editNotCoveredValue &&
      editNotCoveredValue.balance &&
      editNotCoveredValue.balance.eth
    ) {
      setCurrentAmount(editNotCoveredValue.balance.eth.toString())
      setAmount(editNotCoveredValue.balance.eth.toString())
    }
    setIsLoading(false)
  }, [editNotCoveredValue])

  const contractBalancesReturned = () => {
    // const _contracts = store.getStore('contracts')
    // const _contract = _contracts.find(
    //   (c) =>
    //     c.address.toLowerCase() === editNotCoveredValue.address.toLowerCase()
    // )
    // if (_contract.capacity && _contract.capacity.capacityETH) {
    //   const _formatted = (
    //     parseFloat(_contract.capacity.capacityETH) / 1e18
    //   ).toFixed()
    //   setCapacity(_formatted)
    // }
    const _available = availableCoverage.find(
      (c) =>
        c.address.toLowerCase() === editNotCoveredValue.address.toLowerCase()
    )

    if (_available) {
      const _formatted = parseFloat(_available.coverage_left).toFixed()
      setCapacity(_formatted)
    }
  }

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)
    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      if (parseFloat(value) > parseFloat(capacity)) {
        setAmount((capacity - 1).toString())
        return
      }
      setAmount(value.toString())
    }
  }

  const handleSubmitNewValue = async () => {
    if (!amount || isNaN(+amount)) {
      emitter.emit(SNACKBAR_ERROR, 'Please enter amount')
      return setAmountError(true)
    }

    if (
      parseFloat(amount) <= 0 ||
      parseFloat(amount) >
        parseFloat(getCoverAvailable(editNotCoveredValue.address))
    ) {
      emitter.emit(
        SNACKBAR_ERROR,
        'Amount should be more than 0 and less than available capacity'
      )
      return setAmountError(true)
    }

    try {
      setIsLoading(true)
      await handleSubmit(amount.toString())
      handleCloseModal()
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  const handleResetValue = async () => {
    try {
      setIsLoading(true)
      await handleSubmit('0')
      handleCloseModal()
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsLoading(false)
    closeModal()
  }

  const costPerMonth = (_pricePerSecond) => {
    const pricePerMonth = parseFloat(_pricePerSecond) * 2592000

    if (countDecimals(pricePerMonth) > 8) {
      return parseFloat(pricePerMonth.toFixed(8))
    }

    return pricePerMonth
  }

  const getCoverAvailable = (_address) => {
    const _protocol = availableCoverage.find(
      (p) => p.address.toLowerCase() === _address.toLowerCase()
    )

    if (_protocol && _protocol.coverage_left > 0) {
      return _protocol.coverage_left.toString()
    } else {
      return '0'
    }
  }

  return (
    <>
      <Container>
        <ContentContainer>
          <ModalTitle>
            {t('Protect.AssetsToCover.EditManuallyModal.Titlt.P1')}{' '}
            {editNotCoveredValue &&
              editNotCoveredValue.name &&
              `"${editNotCoveredValue.name}"`}{' '}
            {t('Protect.AssetsToCover.EditManuallyModal.Titlt.P2')}:
          </ModalTitle>
          <InfoWrapper>
            <MainInfo>
              Current Detected Balance:
              <Value>
                {formatETH(
                  editNotCoveredValue.detectedBalances.eth.toString(),
                  {
                    compact: true,
                    digits: 2,
                  }
                )}
              </Value>
              /
              <Value secondary="true">
                {formatUSD(
                  editNotCoveredValue.detectedBalances.usd.toString(),
                  {
                    compact: true,
                    digits: 1,
                  }
                )}
              </Value>
            </MainInfo>

            <MainInfo>
              Current Cover:
              <Value>
                {formatETH(editNotCoveredValue.balance.eth.toString(), {
                  compact: true,
                  digits: 2,
                })}
              </Value>
              /
              <Value secondary="true">
                {formatUSD(editNotCoveredValue.balance.usd.toString(), {
                  compact: true,
                  digits: 1,
                })}
              </Value>
            </MainInfo>
            <MainInfo>
              Capacity:
              <Value>
                {formatETH(getCoverAvailable(editNotCoveredValue.address), {
                  compact: true,
                  digits: 2,
                })}
              </Value>
              /
              <Value secondary="true">
                {formatUSD(
                  parseFloat(getCoverAvailable(editNotCoveredValue.address)) *
                    ethPrice,
                  {
                    compact: true,
                    digits: 1,
                  }
                )}
              </Value>
            </MainInfo>
          </InfoWrapper>
          <ActionContainer>
            <Input
              value={amount}
              onChange={handleChangeAmount}
              disabled={isLoading}
              error={amountError}
              placeholder={currentAmount}
              variant="outlined"
              InputProps={{
                endAdornment: <InputInfo position="end">ETH</InputInfo>,
              }}
            />
            <ActiveBtn
              variant="contained"
              color="primary"
              disabled={isLoading || capacity == 0}
              onClick={handleSubmitNewValue}
            >
              <ActiveBtnText>OK</ActiveBtnText>
            </ActiveBtn>
          </ActionContainer>
          <ActionContainer>
            <Button
              buttonText="Reset Manual Value"
              isDisabled={isLoading}
              onClick={handleResetValue}
              margin="16px 0 0 0"
              bordered={true}
            />
          </ActionContainer>
          {capacity == 0 && (
            <div style={{ color: '#ff0000', textAlign: 'center' }}>
              There's no coverage available for this protocol at this time
            </div>
          )}
        </ContentContainer>
      </Container>
      <CancelButton onClick={handleCloseModal}>CANCEL</CancelButton>
    </>
  )
}

export default withTranslation()(withRouter(withTheme(EditNotCoveredModal)))
