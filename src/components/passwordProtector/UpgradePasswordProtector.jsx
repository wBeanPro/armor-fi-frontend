import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { withTheme } from 'styled-components'

import armorFiLogo from '../../assets/armor-logo.svg'
import {
  Container,
  ComingSoon,
  PasswordForm,
  EnterButton,
  TextField,
} from './styled'
import comingSoonImg from '../../assets/ill_coming_soon.svg'

const VALID_PASSWORD = 'afi'

const UpgradePasswordProtector = ({ children }) => {
  const [
    isPasswordProtectionPassed,
    setIsPasswordProtectionPassed,
  ] = useLocalStorage('armor-website-password', false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handlePasswordChange = (e) => {
    setError(false)
    setPassword(e.currentTarget.value)
  }

  const handleSubmit = () => {
    setError(false)
    if (VALID_PASSWORD === password) {
      setIsPasswordProtectionPassed(true)
    } else {
      setError(true)
      setPassword('')
    }
  }

  const handlePressEnter = (e) => {
    if (password && e.which === 13) handleSubmit()
  }

  return isPasswordProtectionPassed ? (
    <>{children}</>
  ) : (
    <Container>
      <ComingSoon>UPGRADE IN PROGRESS</ComingSoon>
      <PasswordForm>
        <TextField
          error={error}
          variant="outlined"
          type="password"
          size="medium"
          placeholder="PASSWORD"
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handlePressEnter}
        />
        <EnterButton
          onClick={handleSubmit}
          disabled={!password}
          size="medium"
          startIcon={<img alt="armor.fi" src={armorFiLogo} />}
        >
          enter
        </EnterButton>
      </PasswordForm>
    </Container>
  )
}

export default withTheme(UpgradePasswordProtector)
