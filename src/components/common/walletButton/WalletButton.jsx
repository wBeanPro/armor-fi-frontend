import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import UnlockModal from '../../unlockModal/UnlockModal'
import ConnectWallet from '../../icons/ConnectWallet'
import { Button, WalletInfo, Wrapper } from './styled'

const WalletButton = ({ t, theme }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const { colors } = theme

  const handleClickWalletAddress = () => {
    setIsModalOpened(true)
  }

  const handleCloseModal = () => {
    setIsModalOpened(false)
  }
  return (
    <Wrapper>
      <WalletInfo>
        By using Armor, you agree to the{' '}
        <a
          href="https://armorfi.gitbook.io/armor/disclaimer"
          target="_blank"
          rel="noreferrer"
        >
          Terms and Documentation
        </a>
      </WalletInfo>
      <Button onClick={handleClickWalletAddress}>
        {t('Header.ConnectWallet')}
        <ConnectWallet color={colors.secondary} />
      </Button>
      <UnlockModal closeModal={handleCloseModal} modalOpen={isModalOpened} />
    </Wrapper>
  )
}

export default withTranslation()(withTheme(WalletButton))
