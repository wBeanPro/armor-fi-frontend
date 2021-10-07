import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Web3 from 'web3'
import { withTranslation } from 'react-i18next'
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  GET_COVER,
  COVER_RETURNED,
  CLAIM,
  CLAIM_RETURNED,
  REDEEM,
  REDEEM_RETURNED,
  SNACKBAR_ERROR,
  SNACKBAR_MESSAGE,
} from '../../constants'
import config from '../../config'
import Store from '../../stores/store'
import { getGasPriceRequest, buildNexusProofOfLossUrl } from '../../helpers'

import Loader from '../loader/Loader'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded'
import LoadingSpinner from '../loader/LoadingSpinner'
import {
  AddBtn,
  AddText,
  InvestedContainer,
  Root,
  TopBarWrapper,
  NoCovers,
} from './styled'
import Cover from './Cover'
import MOCKED_DATA from './mock'
import { Title } from '../common/Title'
import VisibleContent from '../common/visibleContent/VisibleContent'
import ConnectWallet from '../common/connectWallet/ConnectWallet'
import DashboardSkeleton from './DashboardSkeleton'

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const Dashboard = ({ t, history }) => {
  const [account, setAccount] = useState(null)
  const [cover, setCover] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)
    if (_account && _account.address)
      dispatcher.dispatch({ type: GET_COVER, content: {} })

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(COVER_RETURNED, coverReturned)
    emitter.on(CLAIM_RETURNED, claimReturned)
    emitter.on(REDEEM_RETURNED, redeemReturned)

    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
      emitter.removeListener(COVER_RETURNED, coverReturned)
      emitter.removeListener(CLAIM_RETURNED, claimReturned)
      emitter.removeListener(REDEEM_RETURNED, redeemReturned)
    }
  }, [])

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
    if (_account && _account.address)
      dispatcher.dispatch({ type: GET_COVER, content: {} })
  }

  const connectionDisconnected = () => setAccount(null)

  const coverReturned = () => {
    const _cover = store.getStore('cover')
    // const _cover = MOCKED_DATA()
    // console.log({ _cover })
    if (Array.isArray(_cover)) setCover(_cover)
    setIsLoading(false)
  }

  const claimReturned = () => {
    setIsLoading(false)
  }

  const redeemReturned = () => {
    setIsLoading(false)
  }

  const errorReturned = (e) => {
    setIsLoading(false)
  }

  const onClaim = async (_contract) => {
    if (!_contract || !_contract.coverId || !_contract.address) {
      emitter.emit(SNACKBAR_ERROR, 'Something went wrong')
      return
    }
    setIsLoading(true)
    try {
      const submitClaimResponse = await _onClaim(_contract)
      // emitter.emit(SNACKBAR_MESSAGE, 'Claim submitted!')
    } catch (e) {
      console.error(e)
      emitter.emit(SNACKBAR_ERROR, e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const _onClaim = async (contract) => {
    const web3Context = store.getStore('web3context')
    const web3 = new Web3(web3Context.library.provider)
    const arNftContractInstance = new web3.eth.Contract(
      config.arNFT.abi,
      config.arNFT.address
    )
    const gasPrice = await getGasPriceRequest(store.getStore('gasPriceType'))
    window.open(
      buildNexusProofOfLossUrl(contract.coverId, contract.address),
      '_blank'
    )
    const submitClaimResponse = await arNftContractInstance.methods
      .submitClaim(contract.coverId)
      .send({
        from: account.address,
        value: '0',
        gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
      })
    console.log({ submitClaimResponse })
    return submitClaimResponse
  }

  const onSwap = async (_contract) => {
    setIsLoading(true)
    try {
      const { approved, swapped } = await _onSwap(_contract.tokenIndex)
      // emitter.emit(SNACKBAR_MESSAGE, 'Swapped!')
    } catch (e) {
      console.error(e)
      emitter.emit(SNACKBAR_ERROR, e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const _onSwap = async (ynftTokenId) => {
    const web3Context = store.getStore('web3context')
    const web3 = new Web3(web3Context.library.provider)
    const arNftContractInstance = new web3.eth.Contract(
      config.arNFT.abi,
      config.arNFT.address
    )
    const yNftContractInstance = new web3.eth.Contract(
      config.yInsureABI,
      config.yInsureAddress
    )
    const gasPrice = await getGasPriceRequest(store.getStore('gasPriceType'))

    const operations = []

    const approvement = yNftContractInstance.methods
      .approve(config.arNftV2Address, ynftTokenId)
      .send({
        from: account.address,
        value: '0',
        gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
      })
    operations.push(approvement)

    const swap = await arNftContractInstance.methods
      .swapYnft(ynftTokenId)
      .send({
        from: account.address,
        value: '0',
        gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
      })

    operations.push(swap)

    return Promise.all(operations)
  }

  const onRedeem = (contract) => {
    setIsLoading(true)
    dispatcher.dispatch({
      type: REDEEM,
      content: { contractId: contract.tokenIndex },
    })
  }

  const handleClickGoMint = () => {
    history.push('/mint')
  }

  return (
    <Root>
      <InvestedContainer>
        <TopBarWrapper>
          <Title>{t('Dashboard.Title')}</Title>
          <AddBtn
            variant="contained"
            color="primary"
            onClick={handleClickGoMint}
          >
            <AddCircleOutlineRoundedIcon />
            <AddText>{t('Dashboard.AddCoverButtonTitle')}</AddText>
          </AddBtn>
        </TopBarWrapper>
        {account ? (
          <>
            {isLoading && cover.length === 0 && <LoadingSpinner />}
            {!isLoading && cover.length === 0 && (
              <NoCovers>{t('Dashboard.NoCovers')}</NoCovers>
            )}
            {cover.map((contract, i) => {
              return !contract ? null : (
                <Cover
                  key={contract.tokenIndex}
                  account={account}
                  contract={contract}
                  actionsDisabled={isLoading}
                  onClaim={onClaim}
                  onSwap={onSwap}
                  onRedeem={onRedeem}
                />
              )
            })}
          </>
        ) : (
          <VisibleContent>
            <ConnectWallet />
            <DashboardSkeleton />
            <DashboardSkeleton />
          </VisibleContent>
        )}
      </InvestedContainer>
      {account && isLoading && <Loader />}
    </Root>
  )
}

export default withTranslation()(withRouter(Dashboard))
