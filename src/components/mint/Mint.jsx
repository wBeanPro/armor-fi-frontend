import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
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
import {
  uglifyAddress,
  checkOnImageExist,
  findOutContracts,
  calculateYearlyCost,
  commas,
} from '../../helpers'

import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Contract from './Contract'
import Loader from '../loader/Loader'
import Tooltip from '@material-ui/core/Tooltip'
import UnlockModal from '../unlockModal/UnlockModal'
import {
  ExpansionPanel,
  AssetSummary,
  HeadingName,
  AssetIcon,
  HeadingTitle,
  Address,
  Heading,
  CoverContainer,
  Filters,
  RewardsActiveWrapper,
  LeftActionsWrapper,
  AlertStyled,
  SubHeadingTitle,
  TooltipSwitcher,
  Description,
  Skeleton,
  PreferredWrapper,
  PreferredBadge,
  ContractsWrapper,
  DropdownStyled,
  SelectMenu,
  SelectName,
  TooltipInfoWrapper,
  TooltipButtonWrapper,
} from './styled'
import Dropdown from '../common/dropdown/Dropdown'
import Search from '../common/search/Search'
import ConnectWallet from '../common/connectWallet/ConnectWallet'
import MintSkeleton from './MintSkeleton'
import GiftBoxIcon from '../icons/GiftBoxIcon'
import Container from '../common/container/Container'
import { Title } from '../common/Title'
import Button from '../shared/button/Button'

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const Mint = ({ theme, t }) => {
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
  const [isFetching, setIsFetching] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [rewardsActive, setRewardsActive] = useState(false)
  const [contractsWithReward, setContractsWithReward] = useState([])
  const [filterByChain, setFilterByChain] = useState('all')
  const [isUnlockModalOpened, setIsUnlockModalOpened] = useState(false)

  const { colors } = theme

  useEffect(() => {
    ;(async () => {
      const _account = store.getStore('account')
      await initMint()

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

  const initMint = async (_account) => {
    setIsLoading(true)
    if (_account) {
      setAccount(_account)
    }

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

    dispatcher.dispatch({ type: GET_CONTRACT_BALANCES, content: {} })

    if (_account && _account.address) {
      setIsFetching(true)
      dispatcher.dispatch({ type: GET_ACCOUNT_BALANCES, content: {} })
    } else {
      console.log({ _account })
    }
    setIsLoading(false)
  }

  const handleClickWalletAddress = () => {
    setIsUnlockModalOpened(true)
  }

  const handleCloseUnlockModal = () => {
    setIsUnlockModalOpened(false)
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

  const connectionDisconnected = () => {
    setExpanded(null)
    setAccount(null)
  }

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
    if (!account) {
      return
    }
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

  const decimals = (value, decimalPlaces) => {
    return Number(
      Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces
    )
  }

  const renderContracts = () => {
    const _contracts = findOutContracts(
      contracts,
      rewardsActive,
      contractsWithReward,
      hideZero,
      search,
      filterByChain
    )

    const preferredContracts = []
    const generalContracts = []

    for (const c of _contracts) {
      if (c.arcoreUsedPercent > 50) {
        preferredContracts.push(c)
      } else {
        generalContracts.push(c)
      }
    }

    return (
      <ContractsWrapper>
        {preferredContracts.length > 0 && (
          <PreferredWrapper>
            <PreferredBadge>
              <Tooltip title="Preferred for staking" placement="top" arrow>
                <span>Preferred for staking</span>
              </Tooltip>
            </PreferredBadge>
            {preferredContracts.map(renderContract)}
          </PreferredWrapper>
        )}
        {generalContracts.map(renderContract)}
      </ContractsWrapper>
    )
  }

  const handleChangeSupportedChain = (e) => {
    setFilterByChain(e.target.value)
  }

  const renderContract = (contract) => {
    const address = uglifyAddress(contract.address)
    let capacity = '0'
    let capacitySymbol = ''

    if (
      contract.capacity &&
      contract.capacity.capacityETH &&
      contract.capacity.capacityDAI
    ) {
      if (asset === 'dai') {
        capacity = Math.floor(
          parseFloat(contract.capacity.capacityDAI) / 1e18
        ).toFixed()
        capacitySymbol = 'DAI'
      }

      if (asset === 'eth') {
        capacity = Math.floor(
          parseFloat(contract.capacity.capacityETH) / 1e18
        ).toFixed()
        capacitySymbol = 'ETH'
      }
    }

    return (
      <ExpansionPanel
        key={contract.id + '_expand'}
        square
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
          <Tooltip
            arrow
            interactive
            placement="top"
            enterTouchDelay={50}
            disableFocusListener={!!account}
            disableHoverListener={!!account}
            disableTouchListener={!!account}
            title={
              <TooltipInfoWrapper>
                {t('BaseFarming.WalletButtonInfo')}
                <TooltipButtonWrapper>
                  <Button
                    onClick={handleClickWalletAddress}
                    content={t('BaseFarming.WalletButtonText')}
                  />
                </TooltipButtonWrapper>
              </TooltipInfoWrapper>
            }
          >
            <AssetSummary>
              <HeadingName>
                <AssetIcon>
                  <img
                    alt="logo"
                    src={checkOnImageExist(contract.logo, 'eth.png')}
                    width={window.innerWidth > 600 ? '40px' : '30px'}
                  />
                </AssetIcon>
                <div>
                  <HeadingTitle bold>{contract.name}</HeadingTitle>
                  <Address
                    onClick={() =>
                      window.open(
                        `https://etherscan.io/address/${contract.address}`,
                        '_blank'
                      )
                    }
                  >
                    {address}
                  </Address>
                </div>
              </HeadingName>
              <Heading>
                <HeadingTitle bold>
                  {calculateYearlyCost(contract.capacity.netStakedNXM)}%
                </HeadingTitle>
                <SubHeadingTitle>{t('Mint.YearlyCost')}</SubHeadingTitle>
              </Heading>
              <Heading>
                <HeadingTitle
                  bold
                >{`${capacity} ${capacitySymbol}`}</HeadingTitle>
                <SubHeadingTitle>{t('Mint.CoverAvailable')}</SubHeadingTitle>
              </Heading>
            </AssetSummary>
          </Tooltip>
        </AccordionSummary>
        <AccordionDetails>
          <Contract
            _contract={contract}
            _startLoading={startLoading}
            _stopLoading={stopLoading}
            _accountBalances={accountBalances}
            _asset={asset}
            _assetObject={assetObject}
            capacityETH={Math.floor(
              parseFloat(contract.capacity.capacityETH) / 1e18
            ).toFixed()}
            capacityDAI={Math.floor(
              parseFloat(contract.capacity.capacityDAI) / 1e18
            ).toFixed()}
          />
        </AccordionDetails>
      </ExpansionPanel>
    )
  }

  // const handleToggleRewardsActive = (_, _isRewardsActive) => {
  //   setRewardsActive(_isRewardsActive)
  // }

  return (
    <Container noaccount={!account}>
      <Title>{t('Mint.Title')} arNFT</Title>
      <Description>
        On this page you can buy arNFT tokenised coverage, for personal use or
        to <Link to="/stake">stake</Link>.
        <br />
        You can choose your desired protocol, length and cover amount.
        <br />
        More information including a detailed guide can be found here on our{' '}
        <a
          href="https://armorfi.gitbook.io/armor/products/arnft-coverage-pool"
          target="_blank"
          rel="noreferrer"
        >
          Gitbook
        </a>
        .
        <br />
        Read more about arNFT’s and the differences with the arCore cover option{' '}
        <a
          href="https://medium.com/armorfi/armor-defi-smart-cover-is-now-live-fe088b3c0785"
          target="_blank"
          rel="noreferrer"
        >
          on our blog
        </a>
        .
      </Description>
      <CoverContainer>
        <Filters>
          <LeftActionsWrapper>
            <Dropdown
              name="asset"
              value={asset}
              onChange={onSelectAssetChange}
              disabled={isLoading || isFetching}
            />
            <DropdownStyled
              select
              name="chain"
              value={filterByChain}
              onChange={handleChangeSupportedChain}
              disabled={isLoading || isFetching}
            >
              <SelectMenu value="all">
                <SelectName>All chains </SelectName>
              </SelectMenu>
              <SelectMenu value="ethereum">
                <SelectName>Ethereum </SelectName>
              </SelectMenu>
              <SelectMenu value="bsc">
                <SelectName>BSC </SelectName>
              </SelectMenu>
              <SelectMenu value="polygon">
                <SelectName>Polygon </SelectName>
              </SelectMenu>
              <SelectMenu value="xdai">
                <SelectName>XDAI </SelectName>
              </SelectMenu>
              <SelectMenu value="fantom">
                <SelectName>Fantom </SelectName>
              </SelectMenu>
            </DropdownStyled>
          </LeftActionsWrapper>
          <Search
            disabled={isLoading || isFetching}
            value={search}
            error={searchError}
            onChange={onSearchChanged}
            placeholder="Balancer, Uniswap..."
          />
        </Filters>
        {asset === 'dai' && (
          <AlertStyled
            mint={true}
            severity="info"
            title={t('Mint.DaiAttention.Title')}
            text={t('Mint.DaiAttention.Text')}
          />
        )}
        <>
          {isFetching ? (
            <>
              <MintSkeleton animation />
              <MintSkeleton animation />
              <MintSkeleton animation />
              <MintSkeleton animation />
            </>
          ) : (
            contracts && renderContracts()
          )}
        </>
      </CoverContainer>
      {isLoading && <Loader />}
      <UnlockModal
        closeModal={handleCloseUnlockModal}
        modalOpen={isUnlockModalOpened}
      />
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Mint)))
