import React, { useState, useEffect } from 'react'
import config from './config'
import Store from '../../stores/store'
import { twoDigitFormatter } from '../../helpers'
import { withTranslation } from 'react-i18next'
import Web3 from 'web3'
import {
  toChecksumAddress,
  toWei,
  fromWei,
  numberToHex,
  toHex,
} from 'web3-utils'
import Tooltip from '@material-ui/core/Tooltip'
import { getGasPriceRequest } from '../../helpers'
import {
  SNACKBAR_ERROR,
  SNACKBAR_TRANSACTION_RECEIPT,
  ERROR,
} from '../../constants'
import { ArNXMVaultEvents as ArNxmVaultEvents } from '../../stores/contracts/arNXMVaultEvents'
import {
  Button,
  ButtonText,
  Container,
  HelpIcon,
  Action,
  ActionTitle,
  InputTitle,
  MaxButton,
  TextField,
} from './styled'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const WrapNxm = ({ t, network, account, conversion }) => {
  const [stage, setStage] = useState('init')
  const [amount, setAmount] = useState('')
  const [nxmBalance, setNxmBalance] = useState('0')
  const [balanceTicker, setBalanceTicker] = useState(null)

  useEffect(() => {
    const web3context = store.getStore('web3context')
    const web3 = new Web3(web3context.library.provider)
    const tokenInstance = new web3.eth.Contract(
      config.ABI,
      config.VERIFYING_CONTRACT,
      {
        from: account.address,
      }
    )
    const nxmTokenInstance = new web3.eth.Contract(
      config.ABI,
      config.NXM_CONTRACT,
      {
        from: account.address,
      }
    )

    getNxmBalance(web3, tokenInstance, nxmTokenInstance)
    const _balanceTicker = setInterval(
      () => getNxmBalance(web3, tokenInstance, nxmTokenInstance),
      config.TICK_INTERVAL
    )
    setBalanceTicker(_balanceTicker)

    emitter.on(ERROR, errorReturned)
    emitter.on(ArNxmVaultEvents.DepositCompleted, onDepositCompleted)
    emitter.on(ArNxmVaultEvents.ApprovalCompleted, onApprovalCompleted)

    return () => {
      if (balanceTicker) clearInterval(balanceTicker)
    }
  }, [network])

  const handleChangeAmount = (e) => {
    setAmount(e.target.value)
  }

  const getNxmBalance = async (web3, tokenInstance, nxmTokenInstance) => {
    const data = tokenInstance.methods.balanceOf(account.address).encodeABI()
    const callParams = {
      method: 'eth_call',
      params: [
        {
          from: account.address,
          to: nxmTokenInstance._address,
          data,
        },
        'latest',
      ],
      from: account.address,
    }

    const hexNxmBalance = await sendAsync(web3, callParams)
    const _nxmBalance = fromWei(hexNxmBalance, 'ether')
    setNxmBalance(_nxmBalance)

    console.log('balances:', { _nxmBalance })
  }

  const sendAsync = (web3, { method, from, params }) => {
    return new Promise(async (resolve, reject) => {
      const provider = web3.currentProvider
      if (from) {
        from = toChecksumAddress(from)
      }
      if (provider.request) {
        if (params[0]) {
          if (params[0].from) {
            params[0].from = params[0].from.toLowerCase()
          }
        }
      }
      provider.sendAsync(
        {
          method,
          params,
          jsonrpc: '2.0',
          from,
        },
        (err, response) => {
          if (err) {
            reject(err)
          }
          if (response.error) {
            reject(response.error)
          } else {
            resolve(response.result)
          }
        }
      )
    })
  }

  const validateAmount = (_amount) => {
    if (
      !_amount ||
      _amount.toString().includes('e') ||
      _amount.toString().includes('.') ||
      _amount.toString().includes(',') ||
      isNaN(+_amount) ||
      _amount <= 0 ||
      !Number.isInteger(+_amount)
    ) {
      throw new Error(t('ArNxm.AmountError'))
    }
  }

  const approveWrap = async (_amount) => {
    const gasPrice = await getGasPriceRequest(store.getStore('gasPriceType'))
    const web3context = store.getStore('web3context')
    const web3 = new Web3(web3context.library.provider)
    const tokenInstance = new web3.eth.Contract(
      config.ABI,
      config.VERIFYING_CONTRACT,
      {
        from: account.address,
      }
    )
    const nxmTokenInstance = new web3.eth.Contract(
      config.ABI,
      config.NXM_CONTRACT,
      {
        from: account.address,
      }
    )
    const data = nxmTokenInstance.methods
      .approve(tokenInstance._address, toWei(_amount))
      .encodeABI()
    const gas = await nxmTokenInstance.methods
      .approve(tokenInstance._address, toWei(_amount))
      .estimateGas()
    const callParams = {
      method: 'eth_sendTransaction',
      params: [
        {
          from: account.address,
          to: nxmTokenInstance._address,
          gas: numberToHex(gas + 100000),
          gasPrice: toHex(toWei(gasPrice.toString(), 'gwei')),
          value: 0,
          data,
        },
      ],
      from: account.address,
    }
    return sendAsync(web3, callParams)
  }

  const getCanWrap = async (amount) => {
    const web3context = store.getStore('web3context')
    const web3 = new Web3(web3context.library.provider)
    const tokenInstance = new web3.eth.Contract(
      config.ABI,
      config.VERIFYING_CONTRACT,
      {
        from: account.address,
      }
    )
    const data = tokenInstance.methods
      .canWrap(account.address, toWei(amount))
      .encodeABI()
    const callParams = {
      method: 'eth_call',
      params: [
        {
          from: account.address,
          to: tokenInstance._address,
          data,
        },
        'latest',
      ],
      from: account.address,
    }

    const encodedCanWrap = await sendAsync(web3, callParams)
    const decodedCanWrap = web3.eth.abi.decodeParameters(
      ['bool', 'string'],
      encodedCanWrap
    )
    return { success: decodedCanWrap[0], message: decodedCanWrap[1] }
  }

  const waitForCanWrap = (_amount) => {
    return new Promise((resolve, reject) => {
      let _canWrap = false
      const ticker = setInterval(async () => {
        if (_canWrap) {
          clearInterval(ticker)
          resolve(true)
        }
        const { success, message } = await getCanWrap(_amount)
        console.log('waitForCanWrap:', { success, message })
        _canWrap = success
      }, config.TICK_INTERVAL)
    })
  }

  const wrap = async (_amount) => {
    const gasPrice = await getGasPriceRequest(store.getStore('gasPriceType'))
    const web3context = store.getStore('web3context')
    const web3 = new Web3(web3context.library.provider)
    const tokenInstance = new web3.eth.Contract(
      config.ABI,
      config.VERIFYING_CONTRACT,
      {
        from: account.address,
      }
    )
    const data = tokenInstance.methods.wrap(toWei(_amount)).encodeABI()
    const gas = await tokenInstance.methods.wrap(toWei(_amount)).estimateGas()
    const callParams = {
      method: 'eth_sendTransaction',
      params: [
        {
          from: account.address,
          to: tokenInstance._address,
          gas: numberToHex(gas + 100000),
          gasPrice: toHex(toWei(gasPrice.toString(), 'gwei')),
          value: 0,
          data,
        },
      ],
      from: account.address,
    }
    return sendAsync(web3, callParams)
  }

  const getTitleByStage = (_stage) => {
    const mapper = {
      init: t('ArNxm.WrapAndStake'),
      validate: t('ArNxm.Validating'),
      approveWrap: t('ArNxm.ApprovingWrap'),
      waitForCanWrap: t('ArNxm.Processing'),
      wrap: t('ArNxm.Wrapping'),
      approveStake: t('ArNxm.ApprovingStake'),
      stake: t('ArNxm.Staking'),
      loading: t('ArNxm.Loading'),
    }
    return mapper[_stage] || mapper.loading
  }

  const renderHelp = () => {
    return (
      <div>
        <h5>{t('ArNxm.Help.Title')}</h5>
        <ul>
          <li>{t('ArNxm.Help.1')}</li>
          <li>{t('ArNxm.Help.2')}</li>
          <li>{t('ArNxm.Help.3')}</li>
          <li>{t('ArNxm.Help.4')}</li>
          <li>{t('ArNxm.Help.5')}</li>
        </ul>
      </div>
    )
  }

  const handleWrapMaxAmount = () => {
    setAmount(
      nxmBalance.toString().split('.')[0] || nxmBalance.toString() || '0'
    )
  }

  const errorReturned = (e) => {
    console.error(e)
    setStage('init')
  }

  const onApprovalCompleted = () => {
    setStage('stake')
  }

  const onDepositCompleted = () => {
    setStage('init')
  }

  const handleClickWrapAndStake = async (_amount) => {
    try {
      setStage('validate')
      validateAmount(_amount)

      setStage('approveWrap')
      const { success } = await getCanWrap(_amount)
      if (!success) {
        const approveWrapTxHash = await approveWrap(_amount)
        console.log({ approveWrapTxHash })
        emitter.emit(SNACKBAR_TRANSACTION_RECEIPT, approveWrapTxHash)

        setStage('waitForCanWrap')
        await waitForCanWrap(_amount)
      }

      setStage('wrap')
      const wrapTxHash = await wrap(_amount)
      console.log({ wrapTxHash })
      emitter.emit(SNACKBAR_TRANSACTION_RECEIPT, wrapTxHash)

      setStage('approveStake')
      dispatcher.dispatch({
        type: ArNxmVaultEvents.Deposit,
        content: { amount: _amount },
      })
    } catch (e) {
      console.error('[handleClickWrapAndStake]', e)
      emitter.emit(SNACKBAR_ERROR, e.message)
      setStage('init')
    }
  }

  return (
    <Container>
      <Action>
        <ActionTitle>
          <InputTitle>
            <Tooltip
              arrow
              placement="right"
              enterTouchDelay={50}
              title={renderHelp()}
            >
              <HelpIcon />
            </Tooltip>
            <span>
              NXM {t('ArNxm.Balance')}: <b>{(+nxmBalance).toFixed(2)} NXM</b>
            </span>
          </InputTitle>
          <MaxButton onClick={handleWrapMaxAmount}>MAX</MaxButton>
        </ActionTitle>
        <TextField
          fullWidth
          placeholder={t('ArNxm.AmountHint')}
          variant="outlined"
          type="text"
          onChange={handleChangeAmount}
          value={amount}
          disabled={stage !== 'init'}
        />
      </Action>
      <span style={{ color: 'gray' }}>
        {(amount &&
          conversion &&
          +conversion > 0 &&
          twoDigitFormatter.format(amount / conversion)) ||
          '0'}{' '}
        arNXM
      </span>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={
          !amount ||
          amount.toString().includes('e') ||
          amount.toString().includes('.') ||
          amount.toString().includes(',') ||
          isNaN(+amount) ||
          amount <= 0 ||
          !Number.isInteger(+amount) ||
          stage !== 'init'
        }
        onClick={() => handleClickWrapAndStake(amount)}
      >
        <ButtonText>{getTitleByStage(stage)}</ButtonText>
      </Button>
    </Container>
  )
}

export default withTranslation()(WrapNxm)
