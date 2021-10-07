import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import UnlockModal from '../../unlockModal/UnlockModal'
import { Button, Wrapper, WalletInfo } from './styled'

const ConnectWallet = ({ t, stake }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleClickWalletAddress = () => {
    setIsModalOpened(true)
  }

  const handleCloseModal = () => {
    setIsModalOpened(false)
  }

  return (
    <>
      <Wrapper stake={stake ? 1 : 0}>
        <Button onClick={handleClickWalletAddress}>
          {t('Home.ConnectWallet')}
        </Button>
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
      </Wrapper>
      <UnlockModal closeModal={handleCloseModal} modalOpen={isModalOpened} />
    </>
  )
}

export default withTranslation()(ConnectWallet)
