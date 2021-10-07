import React, { useState, useEffect } from 'react'
import Store from '../../../stores/store'
import { ACCOUNT_BALANCES_RETURNED } from '../../../constants'
import {
  DropdownStyled,
  SelectMenu,
  SelectIcon,
  SelectIconName,
} from './styled'

const store = Store.store
const emitter = Store.emitter

const Dropdown = ({ name, value, onChange, disabled, hideArrow }) => {
  const [accountBalances, setAccountBalances] = useState(null)

  useEffect(() => {
    const _accountBalances = store.getStore('balances')
    setAccountBalances(_accountBalances)

    emitter.on(ACCOUNT_BALANCES_RETURNED, accountBalancesReturned)
    return () => {
      emitter.removeListener(ACCOUNT_BALANCES_RETURNED, accountBalancesReturned)
    }
  }, [])

  const accountBalancesReturned = () => {
    const _accountBalances = store.getStore('balances')
    setAccountBalances(_accountBalances)
  }

  return (
    <>
      {accountBalances ? (
        <DropdownStyled
          select
          name={name}
          value={value}
          onChange={onChange}
          SelectProps={{ native: false }}
          disabled={disabled}
          hidearrow={hideArrow}
        >
          {accountBalances.map((option) => (
            <SelectMenu key={option.id} value={option.id}>
              <React.Fragment>
                <SelectIcon>
                  <img
                    alt="assets logo"
                    src={require('../../../assets/' +
                      (option.logo || 'eth.png'))}
                  />
                </SelectIcon>
                <SelectIconName>{option.symbol}</SelectIconName>
              </React.Fragment>
            </SelectMenu>
          ))}
        </DropdownStyled>
      ) : null}
    </>
  )
}

export default Dropdown
