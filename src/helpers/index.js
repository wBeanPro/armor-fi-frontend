import axios from 'axios'
import { Buffer } from 'buffer/'
import config from '../config'
import moment from 'moment'
import Web3 from 'web3'
import { fromWei } from 'web3-utils'
import '@formatjs/intl-numberformat/polyfill'
import '@formatjs/intl-numberformat/locale-data/en'
import cnf from '../config/cnf' // locale-data for en

export const ecdsa2vrs = (sig) => {
  const padToEven = (value) => {
    if (value.length % 2 === 1) value = `0${value}`
    return value
  }
  const stripHexPrefix = (str) => {
    return str.substring(0, 2) === '0x' ? str.substring(2) : str
  }

  const buf = Buffer.from(padToEven(stripHexPrefix(sig)), 'hex')
  if (buf.length !== 65) throw new Error('Invalid signature length')
  let v = buf[64]
  if (v < 27) v += 27
  return {
    v: v,
    r: Array.prototype.slice.call(buf.slice(0, 32), 0),
    s: Array.prototype.slice.call(buf.slice(32, 64), 0),
  }
}

export const getRaribleOwnershipsRequest = async (address) => {
  return (
    await axios({
      method: 'post',
      url: 'https://api-mainnet.rarible.com/ownerships',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        filter: {
          '@type': 'by_token',
          address,
          inStockOnly: true,
        },
        size: 10000,
      }),
    })
  ).data
}

export const getStatsRequest = async () => {
  return (
    await axios({
      method: 'GET',
      url: `${config.backendUrl}/api/stats`,
    })
  ).data
}

export const getAllGasPricesRequest = async () => {
  return (
    await axios({ method: 'get', url: `${config.backendUrl}/api/gas-prices` })
  ).data.gas
}

export const getGasPriceRequest = async (gasPriceType = 'standard') => {
  return (await getAllGasPricesRequest())[gasPriceType].toFixed(0)
}

export const uglifyAddress = (address, x = 10, y = 8) => {
  return address
    ? `${address.substring(0, x)}...${address.substring(
        address.length - y,
        address.length
      )}`
    : null
}

export const objectKeysToLowerCase = (input) => {
  if (typeof input !== 'object') return input
  if (Array.isArray(input)) return input.map(objectKeysToLowerCase)
  return Object.keys(input).reduce(function (newObj, key) {
    let val = input[key]
    let newVal = typeof val === 'object' ? objectKeysToLowerCase(val) : val
    newObj[key.toLowerCase()] = newVal
    return newObj
  }, {})
}

export const transformOverviewDataArrForTable = (_arr) => {
  const arr = []
  let tempArr = []
  for (let el of _arr) {
    if (tempArr.length === 2) {
      arr.push(tempArr)
      tempArr = [el]
    } else {
      tempArr.push(el)
    }
  }
  if (tempArr.length !== 0) {
    if (tempArr.length === 1) {
      tempArr.push({ name: 'n/a' })
    }
    arr.push(tempArr)
  }
  return arr
}

export const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const twoDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const threeDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
})

export const commas = (digits) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })

export const eightDigitFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 8,
})

export const formatETH = (value = '0', opts = {}) => {
  const options = {
    style: 'currency',
    currency: 'ETH',
    currencyDisplay: 'name',
    minimumFractionDigits: 0,
  }

  if (opts.compact === true) {
    options.notation = 'compact'
    options.compactDisplay = 'short'
  }

  options.maximumFractionDigits =
    opts.digits && !isNaN(+opts.digits) && opts.digits >= 0
      ? opts.digits
      : countDecimals(value)

  const formatter = new Intl.NumberFormat('en-US', options)
  return formatter.format(value)
}

export const formatUSD = (value = '0', opts = {}) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
  }

  if (opts.compact === true) {
    options.notation = 'compact'
    options.compactDisplay = 'short'
  }

  options.maximumFractionDigits =
    opts.digits && !isNaN(+opts.digits) && opts.digits >= 0
      ? opts.digits
      : countDecimals(value)

  const formatter = new Intl.NumberFormat('en-US', options)
  return formatter.format(value)
}

export const buildNexusProofOfLossUrl = (
  coverId = '',
  contractAddress = ''
) => {
  const baseUrl =
    'https://app.nexusmutual.io/cover/proof-of-loss/add-affected-addresses'
  return `${baseUrl}?coverId=${coverId}&owner=${contractAddress}`
}

export const copyrightYears = (baseYear = '2020') => {
  return new Date().getFullYear().toString() === baseYear.toString()
    ? new Date().getFullYear().toString()
    : `${baseYear.toString()}-${new Date().getFullYear().toString()}`
}

export const networkNameMapper = (_network) => {
  if (_network === null || _network == 1) return ''

  const chainData = config.chains.find((c) => c.chainId == _network)
  return chainData ? chainData.name : 'Unknown'
}

export const turnOnEmitterListeners = (emitter, events) => {
  events.forEach((e) => {
    emitter.on(e[0], e[1])
  })
}

export const removeEmitterListeners = (emitter, events) => {
  events.forEach((e) => {
    emitter.removeListener(e[0], e[1])
  })
}

export const humanReadableUnix = (unixTimestamp) => {
  return moment.unix(unixTimestamp).format('MMM DD YYYY @ hh:mm:ss a (UTC)')
}

export const fixTail = (str = '', length = null) => {
  try {
    const [head, tail] = str.split('.')
    return `${head}.${tail.slice(0, length)}`
  } catch (e) {
    return str
  }
}

export function logoMapper(name) {
  const map = {
    '0x V3': '0x.png',
    '1Inch (DEX & Liquidity Pools)': '1inch.png',
    '1Inch': '1inch.png',
    'Aave V1': 'aave.png',
    'Aave V2': 'aavev2.svg',
    Armor: 'armor.png',
    'Alpha Homora': 'alpha-homora.jpg',
    'Ampleforth Tokengeyser': 'ampleforth.svg',
    Argent: 'argent.png',
    BadgerDAO: 'badgerdao.png',
    Balancer: 'balancer.svg',
    'Bancor Network': 'bancor.png',
    BlockFi: 'blockFi.svg',
    'C.R.E.A.M.': 'cream.png',
    Celsius: 'celsius.svg',
    'Compound V2': 'compoundv2.png',
    'Curve All Pools (incl staking)': 'curve.png',
    'Curve BTC Pools': 'curve.png',
    'Curve fi - OLD': 'curve.png',
    Curve: 'curve.png',
    DDEX: 'ddex.png',
    Dai: 'dai.png',
    'Eth 2.0': 'eth2.jpg',
    'Flexa Staking': 'flexa.png',
    'Gnosis Multi-sig': 'gnosis-multisig.png',
    'Gnosis Safe': 'gnosis-safe.png',
    Hegic: 'hegic.png',
    Hodlnaut: 'hodlnaut.svg',
    'Instadapp Registry': 'eth.png',
    'Keeper DAO': 'keeperdao.jpg',
    'Kyber - Katalyst': 'kyber.png',
    'MakerDAO MCD': 'makerdao.png',
    Mooniswap: 'mooniswap.svg',
    Nexo: 'nexo.svg',
    Nuo: 'nuo.png',
    Opyn: 'opyn.png',
    Paraswap: 'paraswap.png',
    'Perpetual Protocol': 'perpetual.jpg',
    'Pool Together V3': 'pooltogether.png',
    RenVM: 'ren.svg',
    'Set Protocol': 'tokensets.png',
    'Set Protocol V2': 'tokensets.png',
    SushiSwap: 'sushiswap.jpg',
    Synthetix: 'synthetix.svg',
    Totle: 'totle.png',
    TrueFi: 'truefi.jpg',
    UMA: 'uma.png',
    'Uniswap V1': 'uniswap.png',
    'Uniswap V2': 'uniswapv2.png',
    bZx: 'bzx.png',
    'dForce Yield Market': 'dforce.svg',
    dydx: 'dydx.png',
    mStable: 'mstable.svg',
    'tBTC Contracts': 'tbtc.svg',
    'Yearn Finance (all vaults)': 'iearn.png',
    'Akropolis Delphi': 'akropolis.svg',
    Binance: 'binance.png',
    CoFix: 'cofix.jpg',
    Coinbase: 'coinbase_mini.png',
    'Compound ETH': 'eth.png',
    'Compound Sai': 'eth.png',
    'Cover Protocol': 'cover.jpg',
    'DAI Token': 'DAI-logo.png',
    'DODO Exchange': 'dodo.png',
    Deversifi: 'deversifi.png',
    Gemini: 'gemini.png',
    IDEX: 'idex.png',
    'Idle V3': 'idle.png',
    'Idle V4': 'idle.png',
    Kraken: 'kraken.png',
    Ledn: 'ledn.svg',
    Melon: 'melon.png',
    'Moloch V1': 'moloch.png',
    'Notional Finance': 'notional.png',
    'NuCypher Worklock': 'nucypher.svg',
    'Paraswap OLD': 'paraswap.png',
    'Pool Together': 'pooltogether.png',
    'Saturn DAO Token': 'saturndao.png',
    'Tornado Cash': 'tornado.png',
    'Uniswap Exchange Template': 'uniswap.png',
    'Uniswap V1 MKR Pool': 'uniswap.png',
    Uniswap: 'uniswap.png',
    'Yam Finance': 'yam.png',
    Yearn: 'yearnfinance.png',
    YFI: 'YFI-logo.png',
    'Yield Protocol': 'yield.jpg',
    dxDAO: 'dxdao.png',
    'dydx Perpetual': 'dydx.png',
    inLock: 'inlock.png',
    USD: 'USD.svg',
  }
  return map[name] || 'eth.png'
}

export const getApy = async ({
  web3context,
  account,
  farmAddress,
  farmAbi,
  stakeAbi,
  isBalancer,
}) => {
  const web3 = new Web3(web3context.library.provider)
  const farmContractInstance = new web3.eth.Contract(farmAbi, farmAddress)

  const stakeTokenAddress = await farmContractInstance.methods
    .stakeToken()
    .call({ address: account.address })

  const rewardTokenAddress = await farmContractInstance.methods
    .rewardToken()
    .call({ address: account.address })

  let token0 = null
  let token1 = null
  let stakingBalance = null
  let totalSupply = null
  let _q0 = null
  let _q1 = null

  if (isBalancer) {
    const balancerStakeTokenContractInstance = new web3.eth.Contract(
      config.BalAbi.abi,
      stakeTokenAddress
    )
    const finalTokens = await balancerStakeTokenContractInstance.methods
      .getFinalTokens()
      .call({ address: account.address })

    token0 = finalTokens[0]
    token1 = finalTokens[1]

    totalSupply = await balancerStakeTokenContractInstance.methods
      .totalSupply()
      .call({ address: account.address })

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakingBalance = totalSupply / 10 ** 18
    } else {
      const _stakingBalance = await balancerStakeTokenContractInstance.methods
        .balanceOf(farmAddress)
        .call({ address: account.address })
      stakingBalance = _stakingBalance / 10 ** 18
    }

    try {
      const reserved = await balancerStakeTokenContractInstance.methods
        .getReserves()
        .call({ address: account.address })
      _q0 = reserved.reserve0
      _q1 = reserved.reserve1
    } catch (e) {
      if (token0 == '0x0000000000000000000000000000000000000000') {
        _q0 = await web3.eth.getBalance(stakeTokenAddress)
      } else {
        const c0 = new web3.eth.Contract(config.erc20ABI, token0)
        _q0 = await c0.methods
          .balanceOf(stakeTokenAddress)
          .call({ address: account.address })
      }
      if (token1 == '0x0000000000000000000000000000000000000000') {
        _q1 = await web3.eth.getBalance(stakeTokenAddress)
      } else {
        const c1 = new web3.eth.Contract(config.erc20ABI, token1)
        _q1 = await c1.methods
          .balanceOf(stakeTokenAddress)
          .call({ address: account.address })
      }
    }
  } else {
    const stakeTokenContractInstance = new web3.eth.Contract(
      stakeAbi,
      stakeTokenAddress
    )
    token0 = await stakeTokenContractInstance.methods
      .token0()
      .call({ address: account.address })

    token1 = await stakeTokenContractInstance.methods
      .token1()
      .call({ address: account.address })

    totalSupply = await stakeTokenContractInstance.methods
      .totalSupply()
      .call({ address: account.address })

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakingBalance = totalSupply / 10 ** 18
    } else {
      const _stakingBalance = await stakeTokenContractInstance.methods
        .balanceOf(farmAddress)
        .call({ address: account.address })
      stakingBalance = _stakingBalance / 10 ** 18
    }

    try {
      const reserved = await stakeTokenContractInstance.methods
        .getReserves()
        .call({ address: account.address })
      _q0 = reserved.reserve0
      _q1 = reserved.reserve1
    } catch (e) {
      if (token0 == '0x0000000000000000000000000000000000000000') {
        _q0 = await web3.eth.getBalance(stakeTokenAddress)
      } else {
        const c0 = new web3.eth.Contract(config.erc20ABI, token0)
        _q0 = await c0.methods
          .balanceOf(stakeTokenAddress)
          .call({ address: account.address })
      }
      if (token1 == '0x0000000000000000000000000000000000000000') {
        _q1 = await web3.eth.getBalance(stakeTokenAddress)
      } else {
        const c1 = new web3.eth.Contract(config.erc20ABI, token1)
        _q1 = await c1.methods
          .balanceOf(stakeTokenAddress)
          .call({ address: account.address })
      }
    }
  }

  const tokenPrices = await lookUpTokenPrices([
    token0,
    token1,
    rewardTokenAddress,
  ])

  const q0 = _q0 / 10 ** 18
  const q1 = _q1 / 10 ** 18

  let token0usd = tokenPrices[token0.toLowerCase()]
    ? tokenPrices[token0.toLowerCase()].usd
    : null
  let token1usd = tokenPrices[token1.toLowerCase()]
    ? tokenPrices[token1.toLowerCase()].usd
    : null

  if (!token0usd) {
    token0usd = (q1 * token1usd) / q0
  }
  if (!token1usd) {
    token1usd = (q0 * token0usd) / q1
  }

  const rewardTokenUsd = tokenPrices[rewardTokenAddress.toLowerCase()].usd

  const tvl = q0 * token0usd + q1 * token1usd
  const price = tvl / totalSupply

  const periodFinish = await farmContractInstance.methods
    .periodFinish()
    .call({ address: account.address })

  const rewardRate = await farmContractInstance.methods
    .rewardRate()
    .call({ address: account.address })

  const weeklyRewards =
    Date.now() / 1000 > periodFinish ? 0 : (rewardRate / 1e18) * 604800

  const _stakedTvl = stakingBalance * price
  const stakedTvl = _stakedTvl * 10 ** 18
  const usdPerWeek = weeklyRewards * rewardTokenUsd
  const _weeklyAPY = (usdPerWeek / stakedTvl) * 100
  const _dailyAPY = _weeklyAPY / 7
  const _monthlyAPY = _dailyAPY * 30
  const _yearlyAPY = _weeklyAPY * 52
  return {
    daily: _dailyAPY,
    weekly: _weeklyAPY,
    monthly: _monthlyAPY,
    yearly: _yearlyAPY,
  }
}

const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = '.',
  thousands = ','
) => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString()
    let j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    )
  } catch (e) {
    console.log(e)
  }
}

export const lookUpTokenPrices = async (ids) => {
  return (
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${ids.join(
        '%2C'
      )}&vs_currencies=usd`
    )
  ).data
}

export const getQueryString = (function (a) {
  if (a == '') return {}
  const b = {}
  for (let i = 0; i < a.length; ++i) {
    const p = a[i].split('=', 2)
    if (p.length === 1) b[p[0]] = ''
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
  }
  return b
})(window.location.search.substr(1).split('&'))

export function arNxmAPY(conversion) {
  const secondsInAWeek = 60 * 60 * 24 * 7
  const startDate = 1611336857 // Fri Jan 22 2021 17:34:17 GMT+0000
  const dateDiff = moment().utc().unix() - startDate

  const weeksPassed = dateDiff / secondsInAWeek
  const avgWeekly = (conversion - 1) / weeksPassed
  return ((1 + avgWeekly) ** 52 - 1) * 100
}

export function countDecimals(value) {
  if (value == null) return 0
  if (Math.floor(value) === value) return 0
  if (value.toString().split('.').length < 2) {
    return 0
  }
  return value.toString().split('.')[1].length || 0
}

export const cropNumberLikeString = (_value = '0', digits = 4) => {
  if (_value == null) {
    return '0'
  }

  const getNumValue = parseFloat(_value)
  const needToFix = _value.toString().includes('.')
    ? _value.toString().split('.').pop().length
    : 0
  const num = parseFloat(needToFix)

  if (num > digits) {
    return getNumValue.toFixed(digits)
  } else {
    return _value
  }
}

export const checkOnImageExist = (imagePath, defImagePath = null) => {
  try {
    return require('../assets/' + imagePath)
  } catch {
    if (defImagePath) {
      try {
        return require('../assets/' + defImagePath)
      } catch {
        return ''
      }
    }
  }
}

export const isRewardsActive = (
  contracts,
  rewardsActive,
  contractsWithReward
) => {
  return contracts.filter((contract) => {
    if (rewardsActive) {
      return contractsWithReward.includes(contract.address)
    } else return true
  })
}

export const findOutContracts = (
  contracts,
  rewardsActive,
  contractsWithReward,
  hideZero,
  search,
  filterByChain
) => {
  return isRewardsActive(contracts, rewardsActive, contractsWithReward)
    .filter((contract) => {
      return filterByChain !== 'all'
        ? contract.supportedChains.includes(filterByChain)
        : true
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
}

/**
 * Related docs
 * https://nexusmutual.gitbook.io/docs/users/docs
 * https://app.nexusmutual.io/governance/view?proposalId=112
 */
export const calculateYearlyCost = (_netStakedNXM) => {
  if (!_netStakedNXM) {
    return '0'
  }

  const {
    lowRiskCostLimit,
    stakedRiskCostHigh,
    stakedRiskCostLow,
    surplusMargin,
  } = config.nexusMutualConstants

  const netStakedNXM = parseFloat(fromWei(_netStakedNXM.toString(), 'ether'))

  /**
   * Formulae
   * Risk_Cost = 1 - (net_staked_NXM / low_risk_cost_limit)^(1/7)
   */
  const rawRiskCost = 1 - (netStakedNXM / lowRiskCostLimit) ** (1 / 7)

  /**
   * Subject to the following criteria:
   * Risk_Cost greater than or equal to staked_risk_cost_low
   * Risk_Cost less than or equal to staked_risk_cost_high
   */
  const riskCost =
    rawRiskCost < stakedRiskCostLow
      ? stakedRiskCostLow
      : rawRiskCost > stakedRiskCostHigh
      ? stakedRiskCostHigh
      : rawRiskCost

  /**
   * Formulae
   * Cover_Price = Risk_Cost x ( 1 + surplus_margin) x cover_period / 365.25 x cover_amount
   */
  const coverPrice = riskCost * (1 + surplusMargin / 100) * 100
  return coverPrice.toFixed(2)
}

export const checkOnValueExist = (value, optionsObj) => {
  const arr = []
  optionsObj.map((option) => arr.push(option.value))
  const existValue = arr.indexOf(value)

  if (existValue < 0 || !value) {
    return arr[0]
  } else {
    return value
  }
}

export const cropText = (text, maxLength = 50) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export const isEthArnft = (currencyCode) => {
  if (!currencyCode) {
    return false
  }
  return currencyCode === '0x45544800' // ETH
}

export const isDaiArnft = (currencyCode) => {
  if (!currencyCode) {
    return false
  }
  return currencyCode === '0x44414900' // DAI
}

export const getShields = () => {
  let shields = []
  Object.keys(cnf.SHIELDS).forEach((protocol, i) => {
    Object.keys(cnf.SHIELDS[protocol]).forEach((key, j) => {
      if (key == 'shields') {
        Object.keys(cnf.SHIELDS[protocol][key]).forEach((shield, j) => {
          shields.push({
            name: shield,
            symbol: shield,
            shieldAddress:
              cnf.SHIELDS[protocol].shields[shield]['shieldAddress'],
            underlyingTokenAddress:
              cnf.SHIELDS[protocol].shields[shield]['underlyingTokenAddress'],
            armorTokenAddress:
              cnf.SHIELDS[protocol].shields[shield]['armorTokenAddress'],
          })
        })
      }
    })
  })
  return shields
}
