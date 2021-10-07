import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import NewStyleDropdown from '../../common/newStyleDropdown/NewStyleDropdown'
import CheckCircleIcon from '../../icons/CheckCircleIcon'
import PlusIcon from '../../icons/PlusIcon'
import { toWei } from 'web3-utils'
import Store from '../../../stores/store'
import {
  Input,
  InputInfo,
  ButtonStyled,
  ManualAddButton,
  ManualAddFormWrapper,
  LoadingWrapper,
} from './styled'
import { StakeManagerEvents } from '../../../stores/contracts/stakeManagerEvents'
import { PlanManagerEvents } from '../../../stores/contracts/planManagerEvents'
import {
  SNACKBAR_ERROR,
  UPDATE_MANUAL_INPUTS,
  UPDATE_MANUAL_INPUTS_COMPLETED,
} from '../../../constants'
import Tooltip from '@material-ui/core/Tooltip'
import LoadingSpinner from '../../loader/LoadingSpinner'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const ManualProtocols = ({
  t,
  isLoading,
  setIsLoading,
  manuallyAddedProtocols,
  overviewDataArr,
  availableCoverage,
  ethPrice,
  setManuallyAddedProtocols,
  theme,
}) => {
  const currentManualProtocolRef = useRef({})
  const [isChoosingManually, setIsChoosingManually] = useState(false)
  const [selectedManuallyProtocol, setSelectedManuallyProtocol] = useState('')
  const [protocols, setProtocols] = useState([])
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const { colors } = theme

  useEffect(() => {
    emitter.on(StakeManagerEvents.AllowedCoverReturned, allowedCoverReturned)
    emitter.on(UPDATE_MANUAL_INPUTS_COMPLETED, updateManualPlansCompleted)
    emitter.on(PlanManagerEvents.CurrentPlansReturned, currentPlansReturned)

    return () => {
      console.log('unmount')
      emitter.removeListener(
        StakeManagerEvents.AllowedCoverReturned,
        allowedCoverReturned
      )
      emitter.removeListener(
        UPDATE_MANUAL_INPUTS_COMPLETED,
        updateManualPlansCompleted
      )
      emitter.removeListener(
        PlanManagerEvents.CurrentPlansReturned,
        currentPlansReturned
      )
    }
  }, [])

  useEffect(() => {
    const _protocols = store.getStore('contracts')
    let availableProtocols = []
    if (_protocols == null || availableCoverage == null) {
      return
    }

    _protocols.forEach((c) => {
      const _newProtocol = availableCoverage.find(
        (p) => p.address.toLowerCase() === c.address.toLowerCase()
      )
      if (!_newProtocol) {
        return
      }

      if (_newProtocol.coverage_left > 0) {
        availableProtocols.push({
          ...c,
          coverageLeft: _newProtocol.coverage_left,
        })
      }
    })

    setProtocols(availableProtocols.sort(sortByName))
  }, [availableCoverage])

  const sortByName = (protocolA, protocolB) => {
    var nameA = protocolA.name.toUpperCase()
    var nameB = protocolB.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  }

  const handleSelectProtocolManually = (protocol) => {
    setSelectedManuallyProtocol(protocol)
  }

  const handleClickManualAdd = () => {
    if (!selectedManuallyProtocol) {
      return
    }

    const _newUpdatedProtocol = {
      name: selectedManuallyProtocol.name,
      symbol: selectedManuallyProtocol.symbol,
      price: 0,
      icon: selectedManuallyProtocol.logo,
      balances: {
        total: '0',
        usd: amount * ethPrice,
        eth: amount,
      },
      balance: {
        total: '0',
        usd: amount * ethPrice,
        eth: amount,
      },
      addresses: {
        contract: selectedManuallyProtocol.address,
        token: '0x0',
      },
    }

    setIsLoading(true)
    setIsUpdating(true)

    currentManualProtocolRef.current = _newUpdatedProtocol

    dispatcher.dispatch({
      type: StakeManagerEvents.GetAllowedCover,
      content: {
        protocol: _newUpdatedProtocol.addresses.contract.toLowerCase(),
        amount: toWei(amount),
      },
    })
  }

  const allowedCoverReturned = () => {
    const _allowedCover = store.getStore('StakeManager_AllowedCover')
    const account = store.getStore('account')
    const { allowedCover, amount, protocol } = _allowedCover
    console.log('allowedCoverReturned', _allowedCover)
    if (allowedCover) {
      dispatcher.dispatch({
        type: UPDATE_MANUAL_INPUTS,
        content: {
          address: account.address,
          protocols: [
            {
              address:
                currentManualProtocolRef.current.addresses.contract.toLowerCase(),
              eth: parseFloat(currentManualProtocolRef.current.balances.eth),
              wei: parseFloat(
                toWei(currentManualProtocolRef.current.balances.eth)
              ),
            },
          ],
        },
      })
    } else {
      emitter.emit(SNACKBAR_ERROR, 'No coverage available for this protocol')
      setIsLoading(false)
      setIsUpdating(false)
    }
  }

  const currentPlansReturned = () => {
    setIsLoading(false)
    setIsUpdating(false)
  }

  const updateManualPlansCompleted = () => {
    setSelectedManuallyProtocol('')
    setIsChoosingManually(false)
    setIsLoading(false)
    setAmount('')
  }

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)

    const capacity =
      selectedManuallyProtocol &&
      selectedManuallyProtocol.coverageLeft &&
      selectedManuallyProtocol.coverageLeft > 0
        ? parseFloat(selectedManuallyProtocol.coverageLeft).toFixed()
        : '0'

    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      if (capacity && parseFloat(value) > parseFloat(capacity)) {
        setAmount((capacity - 1).toString())
        return
      }
      setAmount(value.toString())
    }
  }

  const renderTooltip = () => {
    return (
      <div>
        <div style={{ padding: '10px' }}>
          {t('Protect.ManualProtocols.Tooltip.P1')}
        </div>
        <div style={{ padding: '10px' }}>
          {t('Protect.ManualProtocols.Tooltip.P2')}
        </div>
        <div style={{ padding: '10px' }}>
          {t('Protect.ManualProtocols.Tooltip.P3')}
        </div>
      </div>
    )
  }

  return isUpdating ? (
    <LoadingWrapper>
      <LoadingSpinner color={colors.active} />
    </LoadingWrapper>
  ) : (
    <>
      {isChoosingManually ? (
        <ManualAddFormWrapper>
          <NewStyleDropdown
            name="protocols-to-add"
            options={protocols}
            value={selectedManuallyProtocol}
            onChange={handleSelectProtocolManually}
            disabled={isLoading}
            placeholder={t('Protect.ChooseAsset')}
          />
          <Input
            value={amount}
            onChange={handleChangeAmount}
            error={amountError}
            placeholder="0"
            variant="outlined"
            disabled={!selectedManuallyProtocol || isLoading}
            InputProps={{
              endAdornment: <InputInfo position="end">ETH</InputInfo>,
            }}
          />
          <ButtonStyled
            disabled={
              !selectedManuallyProtocol ||
              !amount ||
              isNaN(parseFloat(amount)) ||
              parseFloat(amount) <= 0 ||
              isLoading
            }
            onClick={handleClickManualAdd}
          >
            <CheckCircleIcon color={colors.primaryLightTrue} />
          </ButtonStyled>
        </ManualAddFormWrapper>
      ) : (
        <ManualAddButton
          onClick={() => setIsChoosingManually(true)}
          disabled={isLoading}
        >
          {t('Protect.ManualInput')}
          <Tooltip
            arrow
            placement="top"
            enterTouchDelay={50}
            title={renderTooltip()}
          >
            <span>
              <PlusIcon color={colors._default} />
            </span>
          </Tooltip>
        </ManualAddButton>
      )}
    </>
  )
}

export default withTranslation()(withRouter(withTheme(ManualProtocols)))
