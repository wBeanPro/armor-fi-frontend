import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { withTheme } from 'styled-components'

import armorFiLogo from '../../assets/armor-logo.svg'
import ArmorIcon from '../icons/ArmorIcon'
import {
  Container,
  PasswordForm,
  EnterButton,
  TextField,
  Wrapper,
} from './styled'
import comingSoonNoShadowImg from '../../assets/ill_coming_soon_no_shadow.svg'

const VALID_PASSWORD = '#ArmorKnights'

const PasswordProtector = ({ children, noShadow, theme }) => {
  const [
    isPasswordProtectionPassed,
    setIsPasswordProtectionPassed,
  ] = useLocalStorage('armor-website-password', false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const { colors } = theme

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
    <Wrapper>
      <Container>
        <img src={comingSoonNoShadowImg} alt="coming soon" />
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
            startIcon={<ArmorIcon color={colors.active} />}
          >
            enter
          </EnterButton>
        </PasswordForm>
      </Container>
    </Wrapper>
  )
}

export default withTheme(PasswordProtector)
