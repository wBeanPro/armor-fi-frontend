import React, { useState, useEffect } from 'react'
import {
  SNACKBAR_ERROR,
  SNACKBAR_MESSAGE,
  SNACKBAR_TRANSACTION_RECEIPT,
  SNACKBAR_TRANSACTION_CONFIRMED,
} from '../../constants'
import Store from '../../stores/store'

import Snackbar from './Snackbar'

const emitter = Store.emitter

const SnackbarController = () => {
  const [open, setOpen] = useState(false)
  const [snackbarType, setSnackbarType] = useState(null)
  const [snackbarMessage, setSnackbarMessage] = useState(null)

  useEffect(() => {
    emitter.on(SNACKBAR_ERROR, showError)
    emitter.on(SNACKBAR_MESSAGE, showMessage)
    emitter.on(SNACKBAR_TRANSACTION_RECEIPT, showReceipt)
    emitter.on(SNACKBAR_TRANSACTION_CONFIRMED, showConfirmed)
    return () => {
      emitter.removeListener(SNACKBAR_ERROR, showError)
      emitter.removeListener(SNACKBAR_MESSAGE, showMessage)
      emitter.removeListener(SNACKBAR_TRANSACTION_RECEIPT, showReceipt)
      emitter.removeListener(SNACKBAR_TRANSACTION_CONFIRMED, showConfirmed)
    }
  }, [])

  const cleanSnackbar = () => {
    setSnackbarMessage(null)
    setSnackbarType(null)
    setOpen(false)
  }

  const showError = (error) => {
    cleanSnackbar()

    setTimeout(() => {
      let _err = `${error}`
      if (error instanceof Error) {
        _err = error.toString()
      } else if (typeof error === 'object') {
        _err = JSON.stringify(error)
      }
      // FIXME: weird error message appears on the Rewards page
      if (
        _err.includes("Returned values aren't valid, did it run Out of Gas") ||
        _err.includes('header not found') ||
        _err.includes('query timeout exceeded')
      ) {
        console.error(error)
        return
      }
      setSnackbarMessage(_err)
      setSnackbarType('Error')
      setOpen(true)
    })
  }

  const showMessage = (message) => {
    cleanSnackbar()

    setTimeout(() => {
      setSnackbarMessage(message)
      setSnackbarType('Info')
      setOpen(true)
    })
  }

  const showReceipt = (txHash) => {
    cleanSnackbar()

    setTimeout(() => {
      setSnackbarMessage(txHash)
      setSnackbarType('Hash')
      setOpen(true)
    })
  }

  const showConfirmed = (txHash) => {
    cleanSnackbar()

    setTimeout(() => {
      setSnackbarMessage(txHash)
      setSnackbarType('Hash')
      setOpen(true)
    })
  }

  return open ? (
    <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  ) : null
}

export default SnackbarController
