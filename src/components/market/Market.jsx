import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import Web3 from 'web3'
import Store from '../../stores/store'
import moment from 'moment'
import config from '../../config'
import {
  ecdsa2vrs,
  getRaribleOwnershipsRequest,
  getGasPriceRequest,
} from '../../helpers'

import Paper from '@material-ui/core/Paper'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import LoadingSpinner from '../loader/LoadingSpinner'
import Loader from '../loader/Loader'
import {
  Container,
  Switcher,
  TableContainerStyled,
  TableStyled,
  RowHead,
  TableTitle,
  ArrowUp,
  ArrowDown,
  Row,
  AssetsLogo,
  AssetsTitle,
  Cell,
  ActionCell,
  ActionButton,
  ActionText,
  TableFooterStyled,
} from './styled'
import { Title } from '../common/Title'
import Dropdown from '../common/dropdown/Dropdown'
import Search from '../common/search/Search'
import MarketSkeleton from './MarketSkeleton'
import ConnectWallet from '../common/connectWallet/ConnectWallet'
import VisibleContent from '../common/visibleContent/VisibleContent'
import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  ERROR,
} from '../../constants'
import cnf from '../../config/cnf'

const store = Store.store
const emitter = Store.emitter

const Market = ({ t }) => {
  const ROWS_PER_PAGE = 10
  const [data, setData] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [account, setAccount] = useState(null)
  const [currency, setCurrency] = useState('eth')
  const [sortDirection, setSortDirection] = useState('desc')
  const [sortBy, setSortBy] = useState('coverSize')
  const [sortedData, setSortedData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    sortTable(data, sortBy, currency, true)
  }, [search])

  const onSearchChanged = (e) => {
    setSearch(e.target.value)
    setPage(0)
  }

  const sortTable = (_rawData, _sortBy, _currency, isSearch) => {
    const _data = _rawData.filter(
      (_d) =>
        getCurrency(_d).toLowerCase() === _currency.toLowerCase() &&
        _d.label.toLowerCase().includes(search.toLowerCase())
    )
    const _sortDirection =
      isSearch || sortBy !== _sortBy || currency !== _currency
        ? 'asc'
        : sortDirection === 'asc'
        ? 'desc'
        : 'asc'

    let _sorted = null
    switch (_sortBy) {
      case 'coveredBy':
        _sorted = _data.sort((a, b) => b.label.localeCompare(a.label))
        break

      case 'coverSize':
        _sorted = _data.sort((a, b) => +getCoverSize(b) - +getCoverSize(a))
        break

      case 'expiresAt':
        _sorted = _data.sort(
          (a, b) => +new Date(getExpireTime(b)) - +new Date(getExpireTime(a))
        )
        break

      case 'cost':
        _sorted = _data.sort(
          (a, b) => +b.ownership.priceEth - +a.ownership.priceEth
        )
        break

      default:
        _sorted = _data
        break
    }
    setSortDirection(_sortDirection)
    setSortBy(_sortBy)
    setSortedData(_sortDirection === 'asc' ? _sorted : _sorted.reverse())
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const toggleCurrency = (_currency) => {
    if (!['eth', 'dai'].includes(_currency)) return
    setPage(0)
    setCurrency(_currency)
    sortTable(data, sortBy, _currency)
  }

  const getLabelByContract = (contractAddress, contracts) => {
    const item = contracts.find(
      (c) => c.address.toLowerCase() === contractAddress.toLowerCase()
    )
    return item
      ? { label: item.name, icon: item.logo }
      : { label: 'Unknown', icon: 'eth.png' }
  }

  const getContractAddress = (dataObj) => {
    return dataObj.properties.attributes.find(
      (a) => a.key === 'scAddressToCover'
    ).value
  }

  const getCoverSize = (dataObj) => {
    return dataObj.properties.attributes.find((a) => a.key === 'amount').value
  }

  const getCurrency = (dataObj) => {
    return dataObj.properties.attributes
      .find((a) => a.key === 'currency')
      .value.replace('\0', '')
  }

  const getExpireTime = (dataObj) => {
    const _date = dataObj.properties.attributes.find(
      (a) => a.key === 'expireTime'
    ).value
    return moment(+_date * 1000).format('YYYY-MM-DD h:mm')
  }

  const handleClickBuy = async (dataObj) => {
    try {
      setIsLoading(true)
      const finalData = {
        buy: dataObj.ownership.priceEth,
        token: dataObj.ownership.token,
        tokenId: dataObj.ownership.tokenId,
        price: (+dataObj.ownership.price * 10 ** 18).toString(),
        sellerFee: '250', // 2.5% as it's specified on Rarible website
        signature: ecdsa2vrs(dataObj.ownership.signature),
      }
      await _buy(finalData)
    } catch (e) {
      console.error('buy', e)
    } finally {
      setIsLoading(false)
    }
  }

  const _buy = async ({ buy, token, tokenId, price, sellerFee, signature }) => {
    return new Promise(async (resolve, reject) => {
      const web3context = store.getStore('web3context')
      const web3 = new Web3(web3context.library.provider)
      const contractInstance = new web3.eth.Contract(
        config.raribleABI,
        config.raribleAddress
      )
      const gasPrice = await getGasPriceRequest(store.getStore('gasPriceType'))
      contractInstance.methods
        .buy(token, tokenId, price, sellerFee, signature)
        .send(
          {
            from: account.address,
            value: web3.utils.toWei(
              `${buy + buy * (+sellerFee / 10000)}`,
              'ether'
            ),
            gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
          },
          (error, result) => {
            if (error) reject(error)
            resolve(result)
          }
        )
    })
  }

  useEffect(() => {
    ;(async () => {
      const _account = store.getStore('account')
      if (_account) await initMarket(_account)

      setIsLoading(false)
    })()

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)

    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
    }
  }, [])

  const initMarket = async (_account) => {
    setAccount(_account)
    const _contracts = store.getStore('contracts')
    setIsLoading(true)
    setIsFetching(true)
    const _data = await getRaribleOwnershipsRequest(cnf.YINSURE_ADDRESS)
    const dataWithIcons = _data.map((d) => {
      const contractAddress = getContractAddress(d)
      const { label, icon } = getLabelByContract(contractAddress, _contracts)
      return { ...d, label, icon }
    })
    setData(dataWithIcons)
    setTimeout(() => sortTable(dataWithIcons, 'coverSize', currency), 0)

    setIsLoading(false)
    setIsFetching(false)
  }

  const errorReturned = (error) => {
    console.error(error)
    setIsLoading(false)
    setIsFetching(false)
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    if (_account) await initMarket(_account)
  }

  const connectionDisconnected = () => setAccount(null)

  return (
    <Container>
      <Title>{t('Market.Title')}</Title>
      <Switcher>
        <Dropdown
          name="currency"
          value={currency}
          onChange={(e) => toggleCurrency(e.target.value)}
          disabled={!account || isLoading || isFetching}
        />
        <Search
          disabled={!account || isLoading || isFetching}
          value={search}
          onChange={onSearchChanged}
          placeholder="Balancer, Uniswap..."
        />
      </Switcher>
      {!account ? (
        <VisibleContent height="90">
          <ConnectWallet />
          <MarketSkeleton />
        </VisibleContent>
      ) : isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <TableContainerStyled component={Paper}>
            <TableStyled aria-label="simple table">
              <TableHead>
                <RowHead>
                  <TableTitle
                    align="left"
                    onClick={() => sortTable(data, 'coveredBy', currency)}
                  >
                    {t('Market.CoveredBy')}
                    {sortBy === 'coveredBy' && (
                      <>
                        {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                      </>
                    )}
                  </TableTitle>
                  <TableTitle
                    align="right"
                    onClick={() => sortTable(data, 'coverSize', currency)}
                  >
                    {t('Market.CoverSize')}
                    {sortBy === 'coverSize' && (
                      <>
                        {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                      </>
                    )}
                  </TableTitle>
                  <TableTitle nopointer align="right">
                    {t('Market.Currency')}
                  </TableTitle>
                  <TableTitle
                    align="right"
                    onClick={() => sortTable(data, 'expiresAt', currency)}
                  >
                    {t('Market.ExpiresAt')}
                    {sortBy === 'expiresAt' && (
                      <>
                        {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                      </>
                    )}
                  </TableTitle>
                  <TableTitle
                    align="right"
                    onClick={() => sortTable(data, 'cost', currency)}
                  >
                    {t('Market.Cost')} (ETH)
                    {sortBy === 'cost' && (
                      <>
                        {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                      </>
                    )}
                  </TableTitle>
                  <TableCell></TableCell>
                </RowHead>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(
                    page * ROWS_PER_PAGE,
                    page * ROWS_PER_PAGE + ROWS_PER_PAGE
                  )
                  .map((d, i) => {
                    return (
                      <Row key={i} tabIndex={-1}>
                        <AssetsLogo
                          align="left"
                          onClick={() =>
                            window.open(
                              `https://etherscan.io/address/${getContractAddress(
                                d
                              )}`,
                              '_blank'
                            )
                          }
                        >
                          <img
                            src={require(`../../assets/${d.icon}`)}
                            alt="asset icon"
                            height="24px"
                          />
                          <AssetsTitle>{d.label}</AssetsTitle>
                        </AssetsLogo>
                        <Cell align="right">{getCoverSize(d)}</Cell>
                        <Cell align="right">{getCurrency(d)}</Cell>
                        <Cell expire align="right">
                          {getExpireTime(d)}
                        </Cell>
                        <Cell align="right">{d.ownership.priceEth}</Cell>
                        <ActionCell align="right">
                          <ActionButton
                            variant="contained"
                            color="primary"
                            onClick={() => handleClickBuy(d)}
                            disabled={isLoading}
                          >
                            <ActionText>
                              {t('Market.BuyButtonTitle')}
                            </ActionText>
                          </ActionButton>
                        </ActionCell>
                      </Row>
                    )
                  })}
              </TableBody>
            </TableStyled>
          </TableContainerStyled>
          <TableFooterStyled>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10]}
                count={sortedData.length}
                rowsPerPage={ROWS_PER_PAGE}
                page={page}
                onChangePage={handleChangePage}
                labelDisplayedRows={({ from, to, count }) =>
                  `${t('Market.Page')} ${page + 1}/${Math.ceil(
                    sortedData.length / 10
                  )}`
                }
              />
            </TableRow>
          </TableFooterStyled>
        </>
      )}
      {isLoading && <Loader />}
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Market)))
