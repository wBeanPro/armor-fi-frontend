import React, { useEffect, useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import UnlockModal from '../unlockModal/UnlockModal'
import LangSwitcher from '../langSwitcher/LangSwitcher'
import {
  Account as _Account,
  WalletAddress,
  ConnectedDot,
  NetworkIndicator,
} from './styled'
import { uglifyAddress, networkNameMapper } from '../../helpers'

const Account = ({ t, location, network, langs, lang, setLang, account }) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const isHomePage = location.pathname === '/'

  const handleClickWalletAddress = () => {
    setIsModalOpened(true)
  }

  const handleCloseModal = () => {
    setIsModalOpened(false)
  }

  return (
    <>
      <_Account>
        <LangSwitcher
          lang={lang}
          langs={langs}
          isHomePage={isHomePage}
          setLang={setLang}
        />
        <WalletAddress
          home={isHomePage}
          withoutAccount={!account || !account.address}
          onClick={handleClickWalletAddress}
        >
          <ConnectedDot home={isHomePage} />
          {account && networkNameMapper(network) && (
            <NetworkIndicator home={isHomePage}>
              {networkNameMapper(network)}
            </NetworkIndicator>
          )}
          {account && account.address ? (
            <>{uglifyAddress(account.address, 5, 4)}</>
          ) : (
            t('Header.ConnectWallet')
          )}
        </WalletAddress>
      </_Account>

      <UnlockModal closeModal={handleCloseModal} modalOpen={isModalOpened} />
    </>
  )
}

export default withTranslation()(withRouter(withTheme(Account)))
