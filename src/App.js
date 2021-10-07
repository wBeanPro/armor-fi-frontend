import React, { useEffect, useRef, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Redirect, Route, Switch } from 'react-router-dom'
import IpfsRouter from 'ipfs-react-router'
import withWidth from '@material-ui/core/withWidth'
import { HeadProvider, Meta } from 'react-head'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from './themes'
import Home from './components/home/Home'
import SnackbarController from './components/snackbarController/SnackbarController'
import Mint from './components/mint/Mint'
import Footer from './components/footer/Footer'
import Intro from './components/intro/Intro'
import About from './components/about/About'
import Dashboard from './components/dashboard/Dashboard'
import Stats from './components/stats/Stats'
import PasswordProtector from './components/passwordProtector/PasswordProtector'
import Rewards from './components/rewards/Rewards'
import ArShieldRewards from './components/arShieldRewards/ArShieldRewards'
import Market from './components/market/Market'
import Stake from './components/stake/Stake'
import Protect from './components/protect/Protect'
import Govern from './components/govern/Govern'
import Changelog from './components/changelog/Changelog'
import Forum from './components/forum/Forum'
import Ibco from './components/ibco/Ibco'
import WNxmVault from './components/wNxmVault/WNxmVault'
import ArNxmVault from './components/arNxmVault/ArNxmVault'
import StakingLots from './components/stakingLots/StakingLots'
import ArVault from './components/arVault/ArVault'
import ArShield from './components/arShield/ArShield'
import Referrals from './components/referrals/Referrals'
import GTM from './components/gtm/Gtm'
import config from './config'
import { injected } from './stores/connectors'
import Web3 from 'web3'
import { I18nextProvider, withTranslation } from 'react-i18next'
import i18n, { langs } from './i18n'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  REFERRER_SET,
} from './constants'
import Store from './stores/store'
import Sidebar from './components/sidebar/Sidebar'
import Setup from './components/setup/Setup'
import ProofOfLoss from './components/proofOfLoss/ProofOfLoss'
import { Container, Wrapper } from './styled'
import {
  getQueryString,
  removeEmitterListeners,
  turnOnEmitterListeners,
  networkNameMapper,
} from './helpers'
import ReferralSystem from './classes/referralSystem'
import UserSnap from './components/userSnap/UserSnap'
import HomeContainer from './components/common/homeContainer/HomeContainer'
import R from './components/r/R'
import Uikit from './components/uikit/Uikit'
import DialogModal from './components/common/dialogModal/DialogModal'
import Blog from './components/blog/Blog'
import {
  SafeAppConnector,
  useSafeAppConnection,
} from '@gnosis.pm/safe-apps-web3-react'
import { useWeb3Context } from 'web3-react'

const emitter = Store.emitter
const store = Store.store

const App = () => {
  const [account, setAccount] = useState(null)
  const [network, setNetwork] = useState(null)
  const [referralCode, setReferralCode] = useState(null)
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('armor-website-language') || langs[0]
  )
  const [deviceHeight, setDeviceHeight] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isWrongNetworkModalOpened, setIsWrongNetworkModalOpened] =
    useState(false)

  const handleResize = () => {
    setDeviceHeight(window.innerHeight)
  }
  const safeMultisigConnector = new SafeAppConnector()
  const triedToConnectToSafe = useSafeAppConnection(safeMultisigConnector)
  let isConnectedToSafe = false

  useEffect(() => {
    ;(async () => {
      if (!triedToConnectToSafe) {
        console.log('tried to connect', triedToConnectToSafe)
        safeMultisigConnector.isSafeApp().then(() => {
          safeMultisigConnector
            .activate()
            .then((r) => {
              store.setStore({
                account: { address: r.account },
                web3context: { library: { provider: r.provider } },
              })
              emitter.emit(CONNECTION_CONNECTED)
              console.log({ r })
              isConnectedToSafe = true
            })
            .catch((err) => console.error('whoa', { err }))
        })
      }
    })()
  }, [triedToConnectToSafe])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    let events = [
      [CONNECTION_CONNECTED, connectionConnected],
      [CONNECTION_DISCONNECTED, connectionDisconnected],
    ]
    turnOnEmitterListeners(emitter, events)

    return () => {
      window.removeEventListener('resize', handleResize)
      removeEmitterListeners(emitter, events)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      let web3 = null
      let referralSystem = new ReferralSystem(config, localStorage)
      let queryStringCode = getQueryString['code']
      let queryStringTracking = getQueryString['tracking']

      try {
        window.ethereum.on('accountsChanged', handleAccountsChanged)

        const isAuthorized = await injected.isAuthorized()
        if (window && window.ethereum) {
          window.ethereum.on('chainChanged', updateNetworkHandler)
          const _network = window.ethereum.networkVersion
          setNetwork(_network)
          if (_network !== '1' && config.isProd) {
            openWrongNetworkModal()
          } else {
            closeWrongNetworkModal()
          }
        }
        if (isAuthorized) {
          let authorized = await injected.activate()
          store.setStore({
            account: { address: authorized.account },
            web3context: { library: { provider: authorized.provider } },
          })

          safeMultisigConnector.isSafeApp().then(() => {
            safeMultisigConnector
              .activate()
              .then((r) => {
                store.setStore({
                  account: { address: r.account },
                  web3context: { library: { provider: r.provider } },
                })
                emitter.emit(CONNECTION_CONNECTED)
                console.log({ r })
                isConnectedToSafe = true
              })
              .catch((err) => console.error('whoa', { err }))
          })

          emitter.emit(CONNECTION_CONNECTED)

          // if there is no query string
          // check the local storage before proceeding
          if (queryStringCode == null) {
            ;[queryStringCode, queryStringTracking] =
              referralSystem.getCodeFromStorage()
          }

          // if valid address, set referrer in local storage and with api
          if (queryStringCode != null) {
            await referralSystem
              .setReferrer(
                queryStringCode,
                authorized.account,
                queryStringTracking
              )
              .then((res) => {
                referralSystem.clearCodeFromStorage()
              })
              .catch((err) => {
                console.error(err)
              })
          }

          web3 = new Web3(authorized.provider)
        } else {
          // user has not connected their wallet yet
          // if there was a referral set, store it in local storage
          if (queryStringCode != null) {
            referralSystem.setCodeInStorage(
              queryStringCode,
              queryStringTracking
            )
          }
        }
      } catch (e) {
        console.error(e)
      }

      setIsMobile(window.innerWidth <= 900)
      window.addEventListener('resize', handleWidth)

      return () => {
        if (web3) {
          window.ethereum.removeListener('chainChanged', updateNetworkHandler)
          window.ethereum.removeListener(
            'accountsChanged',
            handleAccountsChanged
          )
        }

        window.removeEventListener('resize', handleWidth)
      }
    })()
  }, [network])

  const openWrongNetworkModal = () => {
    setIsWrongNetworkModalOpened(true)
  }

  const closeWrongNetworkModal = () => {
    setIsWrongNetworkModalOpened(false)
  }

  const handleAccountsChanged = async (_accounts) => {
    const isAuthorized = await injected.isAuthorized()
    if (isAuthorized) {
      const authorized = await injected.activate()
      store.setStore({
        account: { address: authorized.account },
        web3context: { library: { provider: authorized.provider } },
      })
      emitter.emit(CONNECTION_CONNECTED)
    }
  }

  const setLanguage = (newLang) => {
    if (langs.includes(newLang)) {
      setCurrentLang(newLang)
      i18n.changeLanguage(newLang)
      localStorage.setItem('armor-website-language', newLang)
    }
  }

  const updateNetworkHandler = (networkVersion) => {
    setNetwork(networkVersion)
  }

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => {
    store.setStore({ account: null, web3context: null })
    setAccount(null)
  }

  const handleWidth = () => {
    window.innerWidth <= 900 ? setIsMobile(true) : setIsMobile(false)
  }

  return (
    <>
      <HeadProvider>
        <Meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <UserSnap />
      </HeadProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <IpfsRouter>
          <I18nextProvider i18n={i18n}>
            <HomeContainer>
              {account && isWrongNetworkModalOpened && (
                <DialogModal
                  closeModal={closeWrongNetworkModal}
                  isModalOpened={isWrongNetworkModalOpened}
                  content={
                    <>
                      You are currently connected to{' '}
                      <b>{networkNameMapper(network)}</b>, please switch to
                      Ethereum Mainnet in your wallet
                    </>
                  }
                />
              )}
              <Setup
                deviceHeight={deviceHeight}
                lang={currentLang}
                setLang={setLanguage}
                langs={langs}
                network={network}
              />

              {/* <Header
                  network={network}
                  isDemo={isDemo()}
                  lang={currentLang}
                  setLang={setLanguage}
                  langs={langs}
                /> */}
              {/* TODO: TEMPORARY DISABLED */}
              {/* <IbcoStartTimer /> */}
              <Wrapper>
                {!isMobile && <Sidebar deviceHeight={deviceHeight} />}
                <Switch>
                  <Route exact path="/rewards">
                    <Rewards network={network} />
                  </Route>
                  <Route exact path="/stake">
                    <Stake network={network} isWalletConnected={!!account} />
                  </Route>
                  <Route exact path="/market">
                    <PasswordProtector>
                      <Market />
                    </PasswordProtector>
                  </Route>
                  <Route exact path="/protect">
                    <Protect isWalletConnected={!!account} network={network} />
                  </Route>
                  <Route exact path="/govern">
                    {!account ? (
                      <Intro />
                    ) : (
                      <PasswordProtector>
                        <Govern />
                      </PasswordProtector>
                    )}
                  </Route>
                  <Route exact path="/changelog">
                    <PasswordProtector>
                      <Changelog />
                    </PasswordProtector>
                  </Route>
                  <Route exact path="/forum">
                    {!account ? (
                      <Intro />
                    ) : (
                      <PasswordProtector>
                        <Forum />
                      </PasswordProtector>
                    )}
                  </Route>
                  <Route exact path="/ibco">
                    <PasswordProtector>
                      <Ibco />
                    </PasswordProtector>
                  </Route>
                  <Route exact path="/staking-lots">
                    {!account ? (
                      <Intro />
                    ) : (
                      <PasswordProtector>
                        <StakingLots />
                      </PasswordProtector>
                    )}
                  </Route>
                  <Route exact path="/wnxm-vault">
                    {!account ? (
                      <Intro />
                    ) : (
                      <PasswordProtector>
                        <WNxmVault />
                      </PasswordProtector>
                    )}
                  </Route>
                  <Route exact path="/arnxm-vault">
                    <ArNxmVault network={network} />
                  </Route>
                  <Route exact path="/arvault">
                    <PasswordProtector>
                      <ArVault />
                    </PasswordProtector>
                  </Route>
                  <Route exact path="/mint">
                    <Mint />
                  </Route>
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route exact path="/stats">
                    <Stats />
                  </Route>
                  <Route exact path="/about">
                    <About />
                  </Route>
                  <Route exact path="/arshield">
                    <ArShield />
                  </Route>
                  {/*<Route exact path="/arshield-rewards">*/}
                  {/*  <PasswordProtector>*/}
                  {/*    <ArShieldRewards />*/}
                  {/*  </PasswordProtector>*/}
                  {/*</Route>*/}
                  <Route exact path="/referrals">
                    <Referrals />
                  </Route>
                  <Route exact path="/proof-of-loss">
                    <PasswordProtector>
                      <ProofOfLoss />
                    </PasswordProtector>
                  </Route>
                  <Route exact path="/uikit">
                    <PasswordProtector>
                      <Uikit />
                    </PasswordProtector>
                  </Route>
                  <Route exact path="/blog">
                    <PasswordProtector>
                      <Blog />
                    </PasswordProtector>
                  </Route>
                  <Route path="/r/:refId/:campaignId?">
                    <R />
                  </Route>
                  <Route exact path="/">
                    <Home />
                    {/* if you need to change home background, you need to set "altBackground" props */}
                  </Route>
                  <Route path="/*">
                    <Redirect to="/" />
                  </Route>
                </Switch>
              </Wrapper>
              <Footer />
            </HomeContainer>
            <SnackbarController />
          </I18nextProvider>
        </IpfsRouter>
        {config.isProd && <GTM />}
      </ThemeProvider>
    </>
  )
}

export default withTranslation()(withWidth()(App))
