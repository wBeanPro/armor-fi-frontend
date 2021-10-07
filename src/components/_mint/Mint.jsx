import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  GET_ACCOUNT_BALANCES,
  ACCOUNT_BALANCES_RETURNED,
  GET_CONTRACT_BALANCES,
  CONTRACT_BALANCES_RETURNED,
} from '../../constants'
import Store from '../../stores/store'
import { uglifyAddress } from '../../helpers'

import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Contract from './Contract'
import Loader from '../loader/Loader'
import LoadingSpinner from '../loader/LoadingSpinner'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import {
  ExpansionPanel,
  AssetSummary,
  HeadingName,
  AssetIcon,
  HeadingTitle,
  Addresss,
  Heading,
  Container,
  TitleStyled,
  CoverContainer,
  Filters,
  RewardsActiveWrapper,
  LeftActionsWrapper,
  AlertStyled,
} from './styled'
import Dropdown from '../common/dropdown/Dropdown'
import Search from '../common/search/Search'
import ConnectWallet from '../common/connectWallet/ConnectWallet'
import MintSkeleton from './MintSkeleton'
import VisibleContent from '../common/visibleContent/VisibleContent'
import { Title } from '../common/Title'
import giftBox from '../../assets/gift-box.svg'

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const Mint = ({ theme, history, t }) => {
  const [account, setAccount] = useState(null)
  const [contracts, setContracts] = useState(null)
  const [accountBalances, setAccountBalances] = useState(null)
  const [search, setSearch] = useState('')
  const [searchError, setSearchError] = useState(false)
  const [hideZero, setHideZero] = useState(
    localStorage.getItem('yinsure.finance-hideZero') === '1'
  )
  const [asset, setAsset] = useState('eth')
  const [assetObject, setAssetObject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [rewardsActive, setRewardsActive] = useState(true)
  const [contractsWithReward, setContractsWithReward] = useState([])

  useEffect(() => {
    ;(async () => {
      const _account = store.getStore('account')
      if (_account) await initMint(_account)

      setIsLoading(false)
    })()

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(ACCOUNT_BALANCES_RETURNED, accountBalancesReturned)
    emitter.on(CONTRACT_BALANCES_RETURNED, contractBalancesReturned)
    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
      emitter.removeListener(ACCOUNT_BALANCES_RETURNED, accountBalancesReturned)
      emitter.removeListener(
        CONTRACT_BALANCES_RETURNED,
        contractBalancesReturned
      )
    }
  }, [])

  useEffect(() => {
    setRewardsActive(asset !== 'dai')
  }, [asset])

  const initMint = async (_account) => {
    setIsLoading(true)
    setAccount(_account)

    const _contracts = store.getStore('contracts')
    setContracts(_contracts)

    const _contractsWithReward = store.getStore('contractsRewardsAvailable')
    setContractsWithReward(_contractsWithReward)

    const _accountBalances = store.getStore('balances')
    setAccountBalances(_accountBalances)

    if (_accountBalances && _accountBalances.length > 0) {
      const returned = _accountBalances.filter((bal) => bal.id === asset)
      setAssetObject(returned[0] || null)
    }

    if (_account && _account.address) {
      setIsFetching(true)
      dispatcher.dispatch({ type: GET_CONTRACT_BALANCES, content: {} })
      dispatcher.dispatch({ type: GET_ACCOUNT_BALANCES, content: {} })
    } else {
      console.log({ _account })
    }
    setIsLoading(false)
  }

  const accountBalancesReturned = () => {
    const _accountBalances = store.getStore('balances')
    setAccountBalances(_accountBalances)
  }

  const contractBalancesReturned = () => {
    const _contracts = store.getStore('contracts')
    setContracts(_contracts)

    const _contractsWithReward = store.getStore('contractsRewardsAvailable')
    setContractsWithReward(_contractsWithReward)

    setIsFetching(false)
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    if (_account) await initMint(_account)
  }

  const connectionDisconnected = () => setAccount(null)

  const onSelectAssetChange = (event) => {
    const { value } = event.target
    let asset = accountBalances.filter((bal) => bal.id === value)
    if (asset.length > 0) asset = asset[0]
    setAsset(value)
    setAssetObject(asset)
  }

  const onSearchChanged = (e) => {
    setSearch(e.target.value)
  }

  const handleChange = (id) => {
    setExpanded(expanded === id ? null : id)
  }

  const errorReturned = (error) => {
    setIsFetching(false)
  }

  const startLoading = () => {
    setIsLoading(true)
  }

  const stopLoading = () => {
    setIsLoading(false)
  }

  const renderContracts = () => {
    return contracts
      .filter((contract) => {
        if (rewardsActive) {
          return contractsWithReward.includes(contract.address)
        } else return true
      })
      .filter((contract) => {
        if (hideZero && contract.balance === 0) return false
        if (search && search !== '') {
          return (
            contract.id.toLowerCase().includes(search.toLowerCase()) ||
            contract.name.toLowerCase().includes(search.toLowerCase()) ||
            contract.symbol.toLowerCase().includes(search.toLowerCase()) ||
            contract.description.toLowerCase().includes(search.toLowerCase()) ||
            contract.address.toLowerCase().includes(search.toLowerCase())
          )
        } else return true
      })
      .map((contract) => {
        const address = uglifyAddress(contract.address)
        let capacity = '0'
        let capacitySymbol = ''

        if (
          contract.capacity &&
          contract.capacity.capacityETH &&
          contract.capacity.capacityDAI
        ) {
          if (asset === 'dai') {
            capacity = (
              parseFloat(contract.capacity.capacityDAI) / 1e18
            ).toFixed()
            capacitySymbol = 'DAI'
          }

          if (asset === 'eth') {
            capacity = (
              parseFloat(contract.capacity.capacityETH) / 1e18
            ).toFixed()
            capacitySymbol = 'ETH'
          }
        }

        return (
          <ExpansionPanel
            square
            key={contract.id + '_expand'}
            expanded={expanded === contract.id}
            onChange={() => {
              handleChange(contract.id)
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <AssetSummary>
                <HeadingName>
                  <AssetIcon>
                    <img
                      alt="logo"
                      src={require('../../assets/' + contract.logo)}
                      width={window.innerWidth > 600 ? '40px' : '30px'}
                    />
                  </AssetIcon>
                  <div>
                    <HeadingTitle bold>{contract.name}</HeadingTitle>
                    <Addresss>{address}</Addresss>
                  </div>
                </HeadingName>
                <Heading>
                  <HeadingTitle
                    bold
                    value
                  >{`${capacity} ${capacitySymbol}`}</HeadingTitle>
                  <Addresss>{t('Mint.CoverAvailable')}</Addresss>
                </Heading>
              </AssetSummary>
            </AccordionSummary>
            <AccordionDetails>
              <Contract
                _contract={contract}
                _startLoading={startLoading}
                _stopLoading={stopLoading}
                _accountBalances={accountBalances}
                _asset={asset}
                _assetObject={assetObject}
                _capacity={capacity}
              />
            </AccordionDetails>
          </ExpansionPanel>
        )
      })
  }

  const handleToggleRewardsActive = (e) => {
    setRewardsActive(e.target.checked)
  }

  return (
    <Container noaccount={!account}>
      <Title>{t('Mint.Title')}</Title>
      <CoverContainer>
        <Filters>
          <LeftActionsWrapper>
            <Dropdown
              name="asset"
              value={asset}
              onChange={onSelectAssetChange}
              // hideArrow={true}
              disabled={!account || isLoading || isFetching}
            />
            <Tooltip title={t('Mint.GiftTooltip')} placement="top">
              <RewardsActiveWrapper>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rewardsActive}
                      onChange={handleToggleRewardsActive}
                      color="primary"
                      name="rewardsActive"
                      disabled={
                        asset === 'dai' || !account || isLoading || isFetching
                      }
                    />
                  }
                  label={<img src={giftBox} alt="gift box" />}
                />
              </RewardsActiveWrapper>
            </Tooltip>
          </LeftActionsWrapper>
          <Search
            disabled={!account || isLoading || isFetching}
            value={search}
            error={searchError}
            onChange={onSearchChanged}
            placeholder="Balancer, Uniswap..."
          />
        </Filters>
        {asset === 'dai' && (
          <AlertStyled
            severity="info"
            title={t('Mint.DaiAttention.Title')}
            text={t('Mint.DaiAttention.Text')}
          />
        )}
        {!account ? (
          <VisibleContent>
            <ConnectWallet />
            <MintSkeleton />
            <MintSkeleton />
          </VisibleContent>
        ) : (
          <>
            {isFetching ? <LoadingSpinner /> : contracts && renderContracts()}
          </>
        )}
      </CoverContainer>
      {isLoading && <Loader />}
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Mint)))
