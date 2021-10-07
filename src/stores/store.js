import config from '../config'
import cnf from '../config/cnf'
import { map as asyncMap, parallel as asyncParallel } from 'async'
import axios from 'axios'
import ContractService from './contracts'
import armorLogo from '../assets/armor.png'
import arnxmLogo from '../assets/arnxm.png'
import {
  ACCOUNT_BALANCES_RETURNED,
  APPLY,
  APPLY_RETURNED,
  AVAILABLE_COVERAGE_RETURNED,
  CHANGE_NFT_CONTRACT,
  CLAIM,
  CLAIM_RETURNED,
  CONTRACT_BALANCES_RETURNED,
  COVER_RETURNED,
  ERROR,
  ETH_PRICE_RETURNED,
  FARMING_APYS_RETURNED,
  GAS_PRICE_TYPE_RETURNED,
  GET_ACCOUNT_BALANCES,
  GET_AVAILABLE_COVERAGE,
  GET_CONTRACT_BALANCES,
  GET_COVER,
  GET_ETH_PRICE,
  GET_MANUAL_INPUTS,
  GET_PROTOCOL_STAKE_STATS,
  GET_QUOTE,
  GET_REWARD_USER_STAKED_PRICE,
  MANUAL_INPUTS_RETURNED,
  PROTOCOL_STAKE_STATS_RETURNED,
  QUOTE_RETURNED,
  REDEEM,
  REDEEM_RETURNED,
  REWARD_USER_STAKED_PRICE_RETURNED,
  SET_GAS_PRICE_TYPE,
  SNACKBAR_ERROR,
  SNACKBAR_TRANSACTION_CONFIRMED,
  SNACKBAR_TRANSACTION_RECEIPT,
  GET_ARMOR_PRICE,
  ARMOR_PRICE_RETURNED,
  UPDATE_MANUAL_INPUTS,
  UPDATE_MANUAL_INPUTS_COMPLETED,
  GET_REFERRAL_CODE,
  REFERRAL_CODE_RETURNED,
  GET_BLOG,
  BLOG_RETURNED,
} from '../constants'
import Web3 from 'web3'

import {
  authereum,
  fortmatic,
  gnosisSafe,
  injected,
  ledger,
  portis,
  squarelink,
  torus,
  trezor,
  walletconnect,
  walletlink,
} from './connectors'
import { ProtocolStakeStats } from '../classes/protocolStakeStats'
import { logoMapper, lookUpTokenPrices } from '../helpers'
import ReferralSystem from '../classes/referralSystem'

const rp = require('request-promise')

const Dispatcher = require('flux').Dispatcher
const Emitter = require('eventemitter3')

const dispatcher = new Dispatcher()
const emitter = new Emitter()

const NFT_CONTRACTS = {
  arNFTv2: {
    title: 'arNFT v2',
    address: config.arNFT.address,
    abi: config.arNFT.abi,
  },
  arNFTv1: {
    title: 'arNFT v1',
    address: config.arNftV1Address,
    abi: config.arNftV1ABI,
  },
  yNFT: {
    title: 'yNFT',
    address: config.yInsureAddress,
    abi: config.yInsureABI,
  },
}

class Store {
  constructor() {
    this.store = {
      currentNftContract: 'arNFTv2', // DEFAULT arNFT CONTRACT
      universalGasPrice: '70',
      gasPriceType: 'standard', // instant/fast/standard/slow
      ethPrice: 0,
      armorPrice: 0,
      account: null,
      connectorsByName: [
        {
          name: 'MetaMask',
          value: injected,
          src: 'icn-metamask.svg',
        },
        {
          name: 'TrustWallet',
          value: injected,
          src: 'trustWallet.png',
        },
        {
          name: 'WalletConnect',
          value: walletconnect,
          src: 'walletConnectIcon.svg',
        },
        {
          name: 'GnosisSafeApps',
          value: gnosisSafe,
          src: 'gnosis_safe.png',
        },
        {
          name: 'WalletLink',
          value: walletlink,
          display: 'Coinbase Wallet',
          src: 'coinbaseWalletIcon.svg',
        },
        {
          name: 'Ledger',
          value: ledger,
          src: 'icn-ledger.svg',
        },
        {
          name: 'Trezor',
          value: trezor,
          src: 'trezor.png',
        },
        // {
        //   name: 'Fortmatic',
        //   value: fortmatic,
        //   src: 'fortmaticIcon.png',
        // },
        // {
        //   name: 'Portis',
        //   value: portis,
        //   src: 'portisIcon.png',
        // },
        // {
        //   name: 'Squarelink',
        //   value: squarelink,
        //   src: 'squarelink.png',
        // },
        {
          name: 'Torus',
          value: torus,
          src: 'torus.jpg',
        },
        {
          name: 'Authereum',
          value: authereum,
          src: 'icn-aethereum.svg',
        },
      ],
      web3context: null,
      nexusMutualContracts: [],
      farmingAPYs: [],
      ethBalance: 0,
      cover: null,
      protocolStakeStats: null,
      tokens: {
        armor: {
          address: cnf.ARMOR_TOKEN_ADDRESS,
          symbol: 'ARMOR',
          decimals: 18,
          image: armorLogo,
        },
        arnxm: {
          address: cnf.ARNXM_TOKEN_ADDRESS,
          symbol: 'arNXM',
          decimals: 18,
          image: arnxmLogo,
        },
      },
      balances: [
        {
          id: 'eth',
          name: 'Ether',
          address: 'Ethereum',
          symbol: 'ETH',
          logo: 'ETH-logo.png',
          description: 'Ethereum',
          decimals: 18,
          balance: 0,
        },
        {
          id: 'dai',
          name: 'DAI',
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          symbol: 'DAI',
          logo: 'DAI-logo.png',
          description: 'DAI Stablecoin',
          decimals: 18,
          balance: 0,
        },
      ],
      contracts: [
        {
          id: 'aavev2',
          name: 'Aave V2',
          address: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
          symbol: 'AAVEV2',
          logo: 'aavev2.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'polygon'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'uniswapv2',
          name: 'Uniswap V2',
          address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
          symbol: 'UNISWAPV2',
          logo: 'uniswapv2.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'sushiswap',
          name: 'SushiSwap',
          address: '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd',
          symbol: 'SUSHISWAP',
          logo: 'sushiswap.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc', 'xdai', 'fantom', 'polygon'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'badgerdao',
          name: 'BadgerDAO',
          address: '0x6354E79F21B56C11f48bcD7c451BE456D7102A36',
          symbol: 'BADGERDAO',
          logo: 'badgerdao.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'compoundv2',
          name: 'Compound V2',
          address: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B',
          symbol: 'COMPOUNDV2',
          logo: 'compoundv2.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'makerdao',
          name: 'MakerDAO',
          address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
          symbol: 'MAKERDAO',
          logo: 'makerdao.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'curve',
          name: 'Curve All Pools',
          address: '0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27',
          symbol: 'CURVE',
          logo: 'curve.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'polygon'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'iearn',
          name: 'Yearn Finance (all vaults)',
          address: '0x9D25057e62939D3408406975aD75Ffe834DA4cDd',
          symbol: 'IEARN',
          logo: 'iearn.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'fantom'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'balancer',
          name: 'Balancer',
          address: '0x9424B1412450D0f8Fc2255FAf6046b98213B76Bd',
          symbol: 'BALANCER',
          logo: 'balancer.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'ren',
          name: 'RenVM',
          address: '0xe80d347DF1209a76DD9d2319d62912ba98C54DDD',
          symbol: 'REN',
          logo: 'ren.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'alpha-homora',
          name: 'Alpha Homora',
          address: '0x67B66C99D3Eb37Fa76Aa3Ed1ff33E8e39F0b9c7A',
          symbol: 'ALPHA-HOMORA',
          logo: 'alpha-homora.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'tokensetsv2',
          name: 'Set Protocol V2',
          address: '0xa4c8d221d8BB851f83aadd0223a8900A6921A349',
          symbol: 'TOKENSETSV2',
          logo: 'tokensets.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'cream',
          name: 'C.R.E.A.M.',
          address: '0x3d5BC3c8d13dcB8bF317092d84783c2697AE9258',
          symbol: 'CREAM',
          logo: 'cream.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc', 'polygon'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'hegic',
          name: 'Hegic',
          address: '0x878F15ffC8b894A1BA7647c7176E4C01f74e140b',
          symbol: 'HEGIC',
          logo: 'hegic.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },

        {
          id: 'synthetix',
          name: 'Synthetix',
          address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
          symbol: 'SYNTHETIX',
          logo: 'synthetix.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'notional',
          name: 'Notional Finance',
          address: '0x9abd0b8868546105F6F48298eaDC1D9c82f7f683',
          symbol: 'NOTIONALFINANCE',
          logo: 'notional.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'coinbase',
          name: 'Coinbase',
          address: '0xc57d000000000000000000000000000000000008',
          symbol: 'COINBASE',
          logo: 'coinbase_mini.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'binance',
          name: 'Binance',
          address: '0xc57d000000000000000000000000000000000007',
          symbol: 'BINANCE',
          logo: 'binance.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'gemini',
          name: 'Gemini',
          address: '0xc57d000000000000000000000000000000000010',
          symbol: 'GEMINI',
          logo: 'gemini.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'kraken',
          name: 'Kraken',
          address: '0xc57d000000000000000000000000000000000009',
          symbol: 'KRAKEN',
          logo: 'kraken.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'celsius',
          name: 'Celsius',
          address: '0xc57D000000000000000000000000000000000001',
          symbol: 'CELSIUS',
          logo: 'celsius.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'blockfi',
          name: 'BlockFi',
          address: '0xC57D000000000000000000000000000000000002',
          symbol: 'BLOCKFI',
          logo: 'blockFi.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'nexo',
          name: 'Nexo',
          address: '0xC57d000000000000000000000000000000000003',
          symbol: 'NEXO',
          logo: 'nexo.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'inlock',
          name: 'inLock',
          address: '0xc57d000000000000000000000000000000000004',
          symbol: 'INLOCK',
          logo: 'inlock.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'ledn',
          name: 'Ledn',
          address: '0xC57D000000000000000000000000000000000005',
          symbol: 'LEDN',
          logo: 'ledn.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'hodlnaut',
          name: 'Hodlnaut',
          address: '0xC57d000000000000000000000000000000000006',
          symbol: 'HODLNAUT',
          logo: 'hodlnaut.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'perpetual',
          name: 'Perpetual Protocol',
          address: '0xA51156F3F1e39d1036Ca4ba4974107A1C1815d1e',
          symbol: 'PERPETUAL',
          logo: 'perpetual.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'xdai'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'aave',
          name: 'Aave V1',
          address: '0xc1D2819CE78f3E15Ee69c6738eB1B400A26e632A',
          symbol: 'AAVE',
          logo: 'aave.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'truefi',
          name: 'TrueFi',
          address: '0x7a9701453249e84fd0D5AfE5951e9cBe9ed2E90f',
          symbol: 'TRUEFI',
          logo: 'truefi.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'keeperdao',
          name: 'Keeper DAO',
          address: '0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a',
          symbol: 'KEEPERDAO',
          logo: 'keeperdao.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'eth2',
          name: 'Eth 2.0',
          address: '0x00000000219ab540356cBB839Cbe05303d7705Fa',
          symbol: 'ETH2',
          logo: 'eth2.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'pooltogetherv3',
          name: 'Pool Together V3',
          address: '0xCB876f60399897db24058b2d58D0B9f713175eeF',
          symbol: 'POOLTOGETHERV3',
          logo: 'pooltogether.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'yield',
          name: 'Yield Protocol',
          address: '0xB94199866Fe06B535d019C11247D3f921460b91A',
          symbol: 'YIELD',
          logo: 'yield.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'cofix',
          name: 'CoFix',
          address: '0x26aaD4D82f6c9FA6E34D8c1067429C986A055872',
          symbol: 'COFIX',
          logo: 'cofix.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'dodo',
          name: 'DODO exchange',
          address: '0x3A97247DF274a17C59A3bd12735ea3FcDFb49950',
          symbol: 'DODO',
          logo: 'dodo.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'akropolis',
          name: 'Akropolis Delphi',
          address: '0x4C39b37f5F20a0695BFDC59cf10bd85a6c4B7c30',
          symbol: 'AKROPOLIS',
          logo: 'akropolis.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'nucypher',
          name: 'NuCypher Worklock',
          address: '0xe9778E69a961e64d3cdBB34CF6778281d34667c2',
          symbol: 'NUCYPHER',
          logo: 'nucypher.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'tbtc',
          name: 'tBTC Contracts',
          address: '0xe20A5C79b39bC8C363f0f49ADcFa82C2a01ab64a',
          symbol: 'TBTC',
          logo: 'tbtc.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'mooniswap',
          name: 'Mooniswap',
          address: '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303',
          symbol: 'MOONISWAP',
          logo: 'mooniswap.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'idle',
          name: 'Idle V4',
          address: '0x3fE7940616e5Bc47b0775a0dccf6237893353bB4',
          symbol: 'IDLE',
          logo: 'idle.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'dforce',
          name: 'dForce Yield Market',
          address: '0x02285AcaafEB533e03A7306C55EC031297df9224',
          symbol: 'DFORCE',
          logo: 'dforce.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'yam',
          name: 'Yam Finance',
          address: '0x0e2298E3B3390e3b945a5456fBf59eCc3f55DA16',
          symbol: 'YAM',
          logo: 'yam.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'uma',
          name: 'UMA',
          address: '0x3e532e6222afe9Bcf02DCB87216802c75D5113aE',
          symbol: 'UMA',
          logo: 'uma.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'bancor',
          name: 'Bancor Network',
          address: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C',
          symbol: 'BANCOR',
          logo: 'bancor.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'kyber',
          name: 'Kyber - Katalyst',
          address: '0x9AAb3f75489902f3a48495025729a0AF77d4b11e',
          symbol: 'KYBER',
          logo: 'kyber.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'deversifi',
          name: 'Deversifi',
          address: '0x5d22045DAcEAB03B158031eCB7D9d06Fad24609b',
          symbol: 'DEVERSIFI',
          logo: 'deversifi.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'starkware'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'ampleforth',
          name: 'Ampleforth Tokengeyser',
          address: '0xD36132E0c1141B26E62733e018f12Eb38A7b7678',
          symbol: 'AMPLEFORTH',
          logo: 'ampleforth.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'melon',
          name: 'Melon',
          address: '0x5f9AE054C7F0489888B1ea46824b4B9618f8A711',
          symbol: 'MELON',
          logo: 'melon.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'mstable',
          name: 'mStable',
          address: '0xAFcE80b19A8cE13DEc0739a1aaB7A028d6845Eb3',
          symbol: 'MSTABLE',
          logo: 'mstable.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'bzx',
          name: 'bZx',
          address: '0x8B3d70d628Ebd30D4A2ea82DB95bA2e906c71633',
          symbol: 'BZX',
          logo: 'bzx.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'saturndao',
          name: 'Saturn DAO Token',
          address: '0xAF350211414C5DC176421Ea05423F0cC494261fB',
          symbol: 'SATURNDAO',
          logo: 'saturndao.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'gnosis-multisig',
          name: 'Gnosis Multi-sig',
          address: '0x6e95C8E8557AbC08b46F3c347bA06F8dC012763f',
          symbol: 'GNOSIS-MULTISIG',
          logo: 'gnosis-multisig.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'dxdao',
          name: 'dxDAO',
          address: '0x519b70055af55A007110B4Ff99b0eA33071c720a',
          symbol: 'DXDAO',
          logo: 'dxdao.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'nuo',
          name: 'Nuo',
          address: '0x802275979B020F0ec871c5eC1db6e412b72fF20b',
          symbol: 'NUO',
          logo: 'nuo.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'pooltogether',
          name: 'Pool Together',
          address: '0x932773aE4B661029704e731722CF8129e1B32494',
          symbol: 'POOLTOGETHER',
          logo: 'pooltogether.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'argent',
          name: 'Argent',
          address: '0xB1dD690Cc9AF7BB1a906A9B5A94F94191cc553Ce',
          symbol: 'ARGENT',
          logo: 'argent.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'dydxperpetual',
          name: 'dydx Perpetual',
          address: '0x364508A5cA0538d8119D3BF40A284635686C98c4',
          symbol: 'DYDXP',
          logo: 'dydx.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'starkware'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'ddex',
          name: 'DDEX',
          address: '0x241e82C79452F51fbfc89Fac6d912e021dB1a3B7',
          symbol: 'DDEX',
          logo: 'ddex.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'tornado',
          name: 'Tornado Cash',
          address: '0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc',
          symbol: 'TORNADO',
          logo: 'tornado.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: '0x',
          name: '0x V3',
          address: '0xB27F1DB0a7e473304A5a06E54bdf035F671400C0',
          symbol: '0X',
          logo: '0x.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'dydx',
          name: 'dydx',
          address: '0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e',
          symbol: 'DYDX',
          logo: 'dydx.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'gnosis-safe',
          name: 'Gnosis Safe',
          address: '0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F',
          symbol: 'GNOSIS-SAFE',
          logo: 'gnosis-safe.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: '1inch',
          name: '1Inch',
          address: '0x11111254369792b2Ca5d084aB5eEA397cA8fa48B',
          symbol: '1INCH',
          logo: '1inch.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'opyn',
          name: 'Opyn',
          address: '0xb529964F86fbf99a6aA67f72a27e59fA3fa4FEaC',
          symbol: 'OPYN',
          logo: 'opyn.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'totle',
          name: 'Totle',
          address: '0x77208a6000691E440026bEd1b178EF4661D37426',
          symbol: 'TOTLE',
          logo: 'totle.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'flexa',
          name: 'Flexa Staking',
          address: '0x12f208476F64De6e6f933E55069Ba9596D818e08',
          symbol: 'FLEXA',
          logo: 'flexa.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'tokensetsv1',
          name: 'Set Protocol V1',
          address: '0x5B67871C3a857dE81A1ca0f9F7945e5670D986Dc',
          symbol: 'TOKENSETSV1',
          logo: 'tokensets.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'paraswap',
          name: 'Paraswap',
          address: '0x86969d29F5fd327E1009bA66072BE22DB6017cC6',
          symbol: 'PARASWAP',
          logo: 'paraswap.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'moloch',
          name: 'Moloch V1',
          address: '0x1fd169A4f5c59ACf79d0Fd5d91D1201EF1Bce9f1',
          symbol: 'MOLOCH',
          logo: 'moloch.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'idex',
          name: 'IDEX',
          address: '0x2a0c0DBEcC7E4D658f48E01e3fA353F44050c208',
          symbol: 'IDEX',
          logo: 'idex.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'cover',
          name: 'Cover Protocol',
          address: '0xedfC81Bf63527337cD2193925f9C0cF2D537AccA',
          symbol: 'COVER',
          logo: 'cover.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc', 'xdai', 'fantom', 'polygon'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        // added March 12 2021
        {
          id: 'uniswap',
          name: 'Uniswap V1',
          address: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
          symbol: 'UNISWAP',
          logo: 'uniswap.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'MakerDAO_MCD',
          name: 'MakerDAO MCD',
          address: '0x35d1b3f3d7966a1dfe207aa4514c12a259a0492b',
          symbol: 'MCD',
          logo: 'makerdao.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'OriginDollar',
          name: 'Origin Dollar',
          address: '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70',
          symbol: 'OUSD',
          logo: 'originusd.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'OpynV2',
          name: 'Opyn V2',
          address: '0x7c06792af1632e77cb27a558dc0885338f4bdf8e',
          symbol: 'OpynV2',
          logo: 'opyn.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'Reflexer',
          name: 'Reflexer',
          address: '0xcc88a9d330da1133df3a7bd823b95e52511a6962',
          symbol: 'Reflexer',
          logo: 'reflexer.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'Vesper',
          name: 'Vesper',
          address: '0xa4f1671d3aee73c05b552d57f2d16d3cfcbd0217',
          symbol: 'Vesper',
          logo: 'vesper.jpeg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'Stake DAO',
          name: 'StakeDAO',
          address: '0xB17640796e4c27a39AF51887aff3F8DC0daF9567',
          symbol: 'StakeDAO',
          logo: 'stakedao.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'Liquity',
          name: 'Liquity',
          address: '0xA39739EF8b0231DbFA0DcdA07d7e29faAbCf4bb2',
          symbol: 'Liquity',
          logo: 'liquity.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'BenchmarkProtocol',
          name: 'Benchmark Protocol',
          address: '0x5D9972dD3Ba5602574ABeA6bF9E1713568D49903',
          symbol: 'BenchmarkProtocol',
          logo: 'benchmark-protocol.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'HarvestFinance',
          name: 'Harvest Finance',
          address: '0x284D7200a0Dabb05ee6De698da10d00df164f61d',
          symbol: 'HarvestFinance',
          logo: 'harvest.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'PancakeswapV1',
          name: 'Pancakeswap V1',
          address: '0x0000000000000000000000000000000000000005',
          symbol: 'PancakeswapV1',
          logo: 'pancakeswap.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'Thorchain',
          name: 'Thorchain',
          address: '0x0000000000000000000000000000000000000004',
          symbol: 'Thorchain',
          logo: 'thorchain.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'Venus',
          name: 'Venus',
          address: '0x0000000000000000000000000000000000000003',
          symbol: 'Venus',
          logo: 'venus.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'Bunny',
          name: 'Bunny',
          address: '0x0000000000000000000000000000000000000002',
          symbol: 'Bunny',
          logo: 'bunnypancake.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['bsc'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'Anchor',
          name: 'Anchor',
          address: '0x0000000000000000000000000000000000000001',
          symbol: 'Anchor',
          logo: 'anchor.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum', 'terra'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'FTX',
          name: 'FTX',
          address: '0xC57d000000000000000000000000000000000011',
          symbol: 'FTX',
          logo: 'ftx.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: [],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'UniswapV3',
          name: 'Uniswap V3',
          address: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
          symbol: 'UniswapV3',
          logo: 'uniswapv3.svg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'AlchemixV1',
          name: 'Alchemix V1',
          address: '0xc21D353FF4ee73C572425697f4F5aaD2109fe35b',
          symbol: 'Alchemix',
          logo: 'alchemix.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'ConvexFinanceV1',
          name: 'Convex Finance V1',
          address: '0xF403C135812408BFbE8713b5A23a04b3D48AAE31',
          symbol: 'Convex',
          logo: 'convex.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'BarnbridgeSmartYieldV1',
          name: 'Barnbridge Smart Yield V1',
          address: '0x4B8d90D68F26DEF303Dcb6CFc9b63A1aAEC15840',
          symbol: 'Barnbridge',
          logo: 'barnbridge.png',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        {
          id: 'alpha-homora-v2',
          name: 'Alpha Homora V2',
          address: '0x99c666810bA4Bf9a4C2318CE60Cb2c279Ee2cF56',
          symbol: 'ALPHA-HOMORA',
          logo: 'alpha-homora.jpg',
          description: '',
          decimals: 18,
          balance: 0,
          supportedChains: ['ethereum'],
          capacity: {
            capacityETH: 0,
            capacityDAI: 0,
            netStakedNXM: 0,
          },
        },
        // {
        //   id: 'yvdai',
        //   name: 'Yearn yvDAI v2',
        //   address: '0x0000000000000000000000000000000000000006',
        //   symbol: 'yvDAI',
        //   logo: 'yearn.svg',
        //   description: '',
        //   decimals: 18,
        //   balance: 0,
        //   supportedChains: ['ethereum'],
        //   capacity: {
        //     capacityETH: 0,
        //     capacityDAI: 0,
        //     netStakedNXM: 0,
        //   },
        // },
        // {
        //   id: 'yvUSDC',
        //   name: 'Yearn yvUSDC v2',
        //   address: '0x0000000000000000000000000000000000000007',
        //   symbol: 'yvUSDC',
        //   logo: 'yearn.svg',
        //   description: '',
        //   decimals: 18,
        //   balance: 0,
        //   supportedChains: ['ethereum'],
        //   capacity: {
        //     capacityETH: 0,
        //     capacityDAI: 0,
        //     netStakedNXM: 0,
        //   },
        // },
        // {
        //   id: 'ycrvstETH',
        //   name: 'Yearn ycrvstETH v2',
        //   address: '0x0000000000000000000000000000000000000008',
        //   symbol: 'ycrvstETH',
        //   logo: 'yearn.svg',
        //   description: '',
        //   decimals: 18,
        //   balance: 0,
        //   supportedChains: ['ethereum'],
        //   capacity: {
        //     capacityETH: 0,
        //     capacityDAI: 0,
        //     netStakedNXM: 0,
        //   },
        // },
        // {
        //   id: '3crv',
        //   name: 'Curve 3pool LP (3CRV)',
        //   address: '0x0000000000000000000000000000000000000009',
        //   symbol: '3CRV',
        //   logo: 'curve-3crv.png',
        //   description: '',
        //   decimals: 18,
        //   balance: 0,
        //   supportedChains: ['ethereum'],
        //   capacity: {
        //     capacityETH: 0,
        //     capacityDAI: 0,
        //     netStakedNXM: 0,
        //   },
        // },
        // {
        //   id: 'crvsETH',
        //   name: 'Curve sETH LP (eCRV)',
        //   address: '0x0000000000000000000000000000000000000010',
        //   symbol: 'crvsETH',
        //   logo: 'curve.png',
        //   description: '',
        //   decimals: 18,
        //   balance: 0,
        //   supportedChains: ['ethereum'],
        //   capacity: {
        //     capacityETH: 0,
        //     capacityDAI: 0,
        //     netStakedNXM: 0,
        //   },
        // },
      ],
      contractsRewardsAvailable: [
        '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Uniswap V2
        '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd', // SushiSwap
        '0x6354E79F21B56C11f48bcD7c451BE456D7102A36', // BadgerDAO
        '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9', // Aave V2
        '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B', // Compound V2
        '0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27', // Curve All Pools (incl staking)
        '0x9D25057e62939D3408406975aD75Ffe834DA4cDd', // Yearn Finance
        '0x9424B1412450D0f8Fc2255FAf6046b98213B76Bd', // Balancer
        '0xe80d347DF1209a76DD9d2319d62912ba98C54DDD', // RenVM
        '0x67B66C99D3Eb37Fa76Aa3Ed1ff33E8e39F0b9c7A', // Alpha Homora
        '0xa4c8d221d8BB851f83aadd0223a8900A6921A349', // Set Protocol V2
        '0x3d5BC3c8d13dcB8bF317092d84783c2697AE9258', // C.R.E.A.M.
        '0x878F15ffC8b894A1BA7647c7176E4C01f74e140b', // Hegic
        '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F', // Synthetix
        '0xAFcE80b19A8cE13DEc0739a1aaB7A028d6845Eb3', // mStable
        '0x02285AcaafEB533e03A7306C55EC031297df9224', // dForce Yield Market
        '0x3e532e6222afe9Bcf02DCB87216802c75D5113aE', // UMA
        '0xb529964F86fbf99a6aA67f72a27e59fA3fa4FEaC', // Opyn
        '0x802275979B020F0ec871c5eC1db6e412b72fF20b', // Nuo
        '0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc', // Tornado Cash
        '0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F', // Gnosis Safe
        '0x9AAb3f75489902f3a48495025729a0AF77d4b11e', // Kyber - Katalyst
        '0xD36132E0c1141B26E62733e018f12Eb38A7b7678', // Ampleforth Tokengeyser
        '0x5d22045DAcEAB03B158031eCB7D9d06Fad24609b', // Deversifi
        '0x71CD6666064C3A1354a3B4dca5fA1E2D3ee7D303', // Mooniswap
        '0xB27F1DB0a7e473304A5a06E54bdf035F671400C0', // 0x V3
        '0x11111254369792b2Ca5d084aB5eEA397cA8fa48B', // 1Inch
        '0x86969d29F5fd327E1009bA66072BE22DB6017cC6', // Paraswap
        '0xCB876f60399897db24058b2d58D0B9f713175eeF', // Pool Together V3
        '0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e', // dydx
        '0x364508A5cA0538d8119D3BF40A284635686C98c4', // dydx Perpetual
        '0x6e95C8E8557AbC08b46F3c347bA06F8dC012763f', // Gnosis Multi-sig
        '0xA51156F3F1e39d1036Ca4ba4974107A1C1815d1e', // Perpetual
        '0xB1dD690Cc9AF7BB1a906A9B5A94F94191cc553Ce', // Argent
        '0x8B3d70d628Ebd30D4A2ea82DB95bA2e906c71633', // bZx
        '0x12f208476F64De6e6f933E55069Ba9596D818e08', // Flexa Staking
        '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C', // Bancor Network
        '0x519b70055af55A007110B4Ff99b0eA33071c720a', // dxDAO
        '0x77208a6000691E440026bEd1b178EF4661D37426', // Totle
        '0xc1D2819CE78f3E15Ee69c6738eB1B400A26e632A', // Aave V1
        '0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a', // Keeper DAO
      ],
      rewardsPools: [
        // UNISWAP POOLS
        {
          forceWarning:
            "These are Uniswap V2 pools. Until further notice only V2 pools will earn rewards, Uniswap V3 pools won't.",
          token: 'armor',
          pair: 'eth',
          exchange: 'Uniswap',
          prefix: 'Armor_ETH_Uni',
          title: 'ARMOR:ETH',
          liquidityUrl:
            'https://app.uniswap.org/#/add/v2/0x1337def16f9b486faed0293eb623dc8395dfe46a/ETH',
          infoUrl:
            'https://info.uniswap.org/pair/0x648450d9c30b73e2229303026107a1f7eb639f6c',
          address: config.armor_ETH_Uni_Farm.address,
          abi: config.armor_ETH_Uni_Farm.abi,
          rewardsAvailable: false,
        },
        {
          forceWarning:
            "These are Uniswap V2 pools. Until further notice only V2 pools will earn rewards, Uniswap V3 pools won't.",
          token: 'armor',
          pair: 'wbtc',
          exchange: 'Uniswap',
          prefix: 'Armor_WBTC_Uni',
          title: 'ARMOR:WBTC',
          liquidityUrl:
            'https://app.uniswap.org/#/add/v2/0x1337def16f9b486faed0293eb623dc8395dfe46a/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          infoUrl:
            'https://info.uniswap.org/pair/0x888759cb22cedadf2cfb0049b03309d45aa380d9',
          address: config.armor_WBTC_Uni_Farm.address,
          abi: config.armor_WBTC_Uni_Farm.abi,
          rewardsAvailable: false,
        },
        {
          forceWarning:
            "These are Uniswap V2 pools. Until further notice only V2 pools will earn rewards, Uniswap V3 pools won't.",
          token: 'armor',
          pair: 'dai',
          exchange: 'Uniswap',
          prefix: 'Armor_DAI_Uni',
          title: 'ARMOR:DAI',
          liquidityUrl:
            'https://app.uniswap.org/#/add/v2/0x1337def16f9b486faed0293eb623dc8395dfe46a/0x6b175474e89094c44da98b954eedeac495271d0f',
          infoUrl:
            'https://info.uniswap.org/pair/0xfc0dd985f6de9c2322ebd97c3422b0857c4d78c7',
          address: config.armor_DAI_Uni_Farm.address,
          abi: config.armor_DAI_Uni_Farm.abi,
          rewardsAvailable: false,
        },
        {
          forceWarning:
            "These are Uniswap V2 pools. Until further notice only V2 pools will earn rewards, Uniswap V3 pools won't.",
          token: 'arnxm',
          pair: 'eth',
          exchange: 'Uniswap',
          prefix: 'ArNXM_ETH_Uni',
          title: 'arNXM:ETH',
          liquidityUrl:
            'https://app.uniswap.org/#/add/v2/0x1337def18c680af1f9f45cbcab6309562975b1dd/ETH',
          infoUrl:
            'https://info.uniswap.org/pair/0x7ca51456b20697a0e5be65e5aeb65dfe90f21150',
          address: config.arNXM_ETH_Uni_Farm.address,
          abi: config.arNXM_ETH_Uni_Farm.abi,
          rewardsAvailable: false,
        },
        {
          forceWarning:
            "These are Uniswap V2 pools. Until further notice only V2 pools will earn rewards, Uniswap V3 pools won't.",
          inactive: true,
          token: 'arnxm',
          pair: 'armor',
          exchange: 'Uniswap',
          prefix: 'Arnxm_ARMOR_Uni',
          title: 'arNXM:ARMOR',
          liquidityUrl:
            'https://app.uniswap.org/#/add/v2/0x1337DEF18C680aF1f9f45cBcab6309562975b1dD/0x1337DEF16F9B486fAEd0293eb623Dc8395dFE46a',
          infoUrl:
            'https://info.uniswap.org/pair/0x8B097568174684a22e6055cF48DBdA41c1E7Abf5',
          address: config.arnxm_ARMOR_Uni_Farm.address,
          abi: config.arnxm_ARMOR_Uni_Farm.abi,
          rewardsAvailable: false,
        },
        {
          forceWarning:
            "These are Uniswap V2 pools. Until further notice only V2 pools will earn rewards, Uniswap V3 pools won't.",
          inactive: true,
          token: 'arnxm',
          pair: 'wnxm',
          exchange: 'Uniswap',
          prefix: 'ArNXM_wNXM_Uni',
          title: 'arNXM:wNXM',
          liquidityUrl:
            'https://app.uniswap.org/#/add/v2/0x1337DEF18C680aF1f9f45cBcab6309562975b1dD/0x0d438F3b5175Bebc262bF23753C1E53d03432bDE',
          infoUrl:
            'https://info.uniswap.org/pair/0x3698067224F92b99E29a54e7aB6868EA113C5af2',
          address: config.arNXM_wNXM_Uni_Farm.address,
          abi: config.arNXM_wNXM_Uni_Farm.abi,
          rewardsAvailable: false,
        },

        // SUSHISWAP POOLS
        {
          token: 'armor',
          pair: 'eth',
          exchange: 'Sushiswap',
          prefix: 'Armor_ETH_Sushi',
          title: 'ARMOR:ETH',
          liquidityUrl: `https://exchange.sushi.com/#/add/0x1337DEF16F9B486fAEd0293eb623Dc8395dFE46a/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`,
          infoUrl: `https://app.sushiswap.fi/pair/${config.armor_ETH_Sushi_Token.address.toLowerCase()}`,
          address: config.armor_ETH_Sushi_Farm.address,
          abi: config.armor_ETH_Sushi_Farm.abi,
          rewardsAvailable: false,
        },
        {
          token: 'armor',
          pair: 'wbtc',
          exchange: 'Sushiswap',
          prefix: 'Armor_WBTC_Sushi',
          title: 'ARMOR:WBTC',
          liquidityUrl: `https://exchange.sushi.com/#/add/0x1337DEF16F9B486fAEd0293eb623Dc8395dFE46a/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599`,
          infoUrl: `https://app.sushiswap.fi/pair/${config.armor_WBTC_Sushi_Token.address.toLowerCase()}`,
          address: config.armor_WBTC_Sushi_Farm.address,
          abi: config.armor_WBTC_Sushi_Farm.abi,
          rewardsAvailable: false,
        },
        {
          token: 'armor',
          pair: 'dai',
          exchange: 'Sushiswap',
          prefix: 'Armor_DAI_Sushi',
          title: 'ARMOR:DAI',
          liquidityUrl: `https://exchange.sushi.com/#/add/0x1337DEF16F9B486fAEd0293eb623Dc8395dFE46a/0x6B175474E89094C44Da98b954EedeAC495271d0F`,
          infoUrl: `https://app.sushiswap.fi/pair/${config.armor_DAI_Sushi_Token.address.toLowerCase()}`,
          address: config.armor_DAI_Sushi_Farm.address,
          abi: config.armor_DAI_Sushi_Farm.abi,
          rewardsAvailable: false,
        },
        {
          token: 'arnxm',
          pair: 'eth',
          exchange: 'Sushiswap',
          prefix: 'ArNXM_ETH_Sushi',
          title: 'arNXM:ETH',
          liquidityUrl: `https://exchange.sushi.com/#/add/0x1337DEF18C680aF1f9f45cBcab6309562975b1dD/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`,
          infoUrl: `https://app.sushiswap.fi/pair/${config.arNXM_ETH_Sushi_Token.address.toLowerCase()}`,
          address: config.arNXM_ETH_Sushi_Farm.address,
          abi: config.arNXM_ETH_Sushi_Farm.abi,
          rewardsAvailable: false,
        },
        {
          inactive: true,
          token: 'arnxm',
          pair: 'wnxm',
          exchange: 'Sushiswap',
          prefix: 'ArNXM_wNXM_Sushi',
          title: 'arNXM:wNXM',
          liquidityUrl: `https://exchange.sushi.com/#/add/0x0d438F3b5175Bebc262bF23753C1E53d03432bDE/0x1337DEF18C680aF1f9f45cBcab6309562975b1dD`,
          infoUrl: `https://app.sushiswap.fi/pair/${config.arNXM_wNXM_Sushi_Token.address.toLowerCase()}`,
          address: config.arNXM_wNXM_Sushi_Farm.address,
          abi: config.arNXM_wNXM_Sushi_Farm.abi,
          rewardsAvailable: false,
        },

        // 1INCH POOLS
        {
          token: 'armor',
          pair: 'eth',
          exchange: '1inch',
          prefix: 'Armor_ETH_1inch',
          title: 'ARMOR:ETH',
          liquidityUrl:
            'https://1inch.exchange/#/dao/pools?token0=0x1337def16f9b486faed0293eb623dc8395dfe46a&token1=0x0000000000000000000000000000000000000000',
          infoUrl: 'https://1inch.exchange/#/ETH/ARMOR',
          address: config.armor_ETH_1inch_Farm.address,
          abi: config.armor_ETH_1inch_Farm.abi,
          rewardsAvailable: false,
        },
        {
          token: 'armor',
          pair: 'wbtc',
          exchange: '1inch',
          prefix: 'Armor_WBTC_1inch',
          title: 'ARMOR:WBTC',
          liquidityUrl:
            'https://1inch.exchange/#/dao/pools?token0=0x1337def16f9b486faed0293eb623dc8395dfe46a&token1=0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          infoUrl: 'https://1inch.exchange/#/WBTC/ARMOR',
          address: config.armor_WBTC_1inch_Farm.address,
          abi: config.armor_WBTC_1inch_Farm.abi,
          rewardsAvailable: false,
        },
        {
          token: 'armor',
          pair: 'dai',
          exchange: '1inch',
          prefix: 'Armor_DAI_1inch',
          title: 'ARMOR:DAI',
          liquidityUrl:
            'https://1inch.exchange/#/dao/pools?token0=0x1337def16f9b486faed0293eb623dc8395dfe46a&token1=0x6b175474e89094c44da98b954eedeac495271d0f',
          infoUrl: 'https://1inch.exchange/#/DAI/ARMOR',
          address: config.armor_DAI_1inch_Farm.address,
          abi: config.armor_DAI_1inch_Farm.abi,
          rewardsAvailable: false,
        },
        {
          token: 'arnxm',
          pair: 'eth',
          exchange: '1inch',
          prefix: 'ArNXM_ETH_1inch',
          title: 'arNXM:ETH',
          liquidityUrl:
            'https://1inch.exchange/#/dao/pools?token0=0x1337def18c680af1f9f45cbcab6309562975b1dd&token1=0x0000000000000000000000000000000000000000',
          infoUrl: 'https://1inch.exchange/#/ETH/arNXM',
          address: config.arNXM_ETH_1inch_Farm.address,
          abi: config.arNXM_ETH_1inch_Farm.abi,
          rewardsAvailable: false,
        },

        // BALANCER POOLS
        {
          token: 'armor',
          pair: 'eth',
          exchange: 'Balancer',
          prefix: 'Armor_ETH_Bal',
          title: 'ARMOR:wETH',
          liquidityUrl:
            'https://pools.balancer.exchange/#/pool/0x7c9ba7c47314c9129e66403d93012445ec5f4a33/',
          infoUrl:
            'https://balancer.exchange/#/swap/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/0x1337def16f9b486faed0293eb623dc8395dfe46a',
          address: config.armor_ETH_Bal_Farm.address,
          abi: config.armor_ETH_Bal_Farm.abi,
          rewardsAvailable: false,
        },
        {
          token: 'armor',
          pair: 'dai',
          exchange: 'Balancer',
          prefix: 'Armor_DAI_Bal',
          title: 'DAI:ARMOR',
          liquidityUrl:
            'https://pools.balancer.exchange/#/pool/0x14c6f9f0ccbb990c6517b17e3e79a39e0a27f27e/',
          infoUrl:
            'https://balancer.exchange/#/swap/0x6b175474e89094c44da98b954eedeac495271d0f/0x1337def16f9b486faed0293eb623dc8395dfe46a',
          address: config.armor_DAI_Bal_Farm.address,
          abi: config.armor_DAI_Bal_Farm.abi,
          rewardsAvailable: false,
        },
        {
          token: 'arnxm',
          pair: 'eth',
          exchange: 'Balancer',
          prefix: 'ArNXM_ETH_Bal',
          title: 'arNXM:wETH',
          liquidityUrl:
            'https://pools.balancer.exchange/#/pool/0xdb942c0851774bd817e6f4813f1fa64cce6fe25f/',
          infoUrl:
            'https://balancer.exchange/#/swap/ether/0x1337DEF18C680aF1f9f45cBcab6309562975b1dD',
          address: config.arNXM_ETH_Bal_Farm.address,
          abi: config.arNXM_ETH_Bal_Farm.abi,
          rewardsAvailable: false,
        },
      ],
    }

    this.service = new ContractService(config, this, emitter, dispatcher)
    this.store.protocolStakeStats = new ProtocolStakeStats(this.service)
    this.store.protocolStakeStats
      .fetchNexusMututalContrats()
      .then(() => {})
      .catch((err) => console.error(err))

    dispatcher.register(
      function (payload) {
        for (const [key, contract] of Object.entries(this.service.contracts)) {
          if (contract.shouldDispatch(payload)) {
            contract.dispatch(payload).then(() => {
              if (config.isDev) {
                console.log('dispatched', payload)
              }
            })
            return
          }
        }

        switch (payload.type) {
          case GET_ACCOUNT_BALANCES:
            this.getAccountBalances(payload).then().catch()
            break
          case GET_CONTRACT_BALANCES:
            this.getContractBalances(payload).then().catch()
            break
          case GET_REWARD_USER_STAKED_PRICE:
            this.getRewardUserStakedPrice(payload).then().catch()
            break
          case GET_QUOTE:
            this.getQuote(payload).then().catch()
            break
          case APPLY:
            this.apply(payload).then().catch()
            break
          case GET_COVER:
            this.getCover(payload).then().catch()
            break
          case CLAIM:
            this.claim(payload).then().catch()
            break
          case REDEEM:
            this.redeem(payload).then().catch()
            break
          case CHANGE_NFT_CONTRACT:
            this.changeCurrentNftContract(payload).then().catch()
            break
          case SET_GAS_PRICE_TYPE:
            this._setGasPriceType(payload).then().catch()
            break
          case GET_PROTOCOL_STAKE_STATS:
            this.getProtocolStakeStats(payload).then().catch()
            break
          case GET_ETH_PRICE:
            this.getEthPrice(payload).then().catch()
            break
          case GET_MANUAL_INPUTS:
            this.getManualInputs(payload).then().catch()
            break
          case UPDATE_MANUAL_INPUTS:
            this.updateManualInputs(payload).then().catch()
            break
          case GET_AVAILABLE_COVERAGE:
            this.getAvailableCoverage(payload).then().catch()
            break
          case GET_ARMOR_PRICE:
            this.getArmorPrice(payload).then().catch()
            break
          case GET_REFERRAL_CODE:
            this.getReferralCode(payload).then().catch()
            break
          case GET_BLOG:
            this.getBlog(payload).then().catch()
            break
        }
      }.bind(this)
    )

    this.fetchNexusMutualContractsFromApi()
      .then((contracts) => (this.store.nexusMutualContracts = contracts))
      .catch((err) => console.error(err))

    this.fetchAPYs()
      .then((apys) => {
        this.store.farmingAPYs = apys
        console.log('fetchAPYs', { apys })
        emitter.emit(FARMING_APYS_RETURNED, apys)
      })
      .catch((err) => console.error(err))

    this._getProvider = this._getProvider.bind(this)
    this.getStore = this.getStore.bind(this)
  }

  fetchNexusMutualContractsFromApi() {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.nexusmutual.io/coverables/contracts.json`)
        .then((r) => {
          let whitelist = []
          for (const address of Object.keys(r.data)) {
            if (!r.data[address].deprecated) {
              const contractData = r.data[address]
              delete r.data[address]
              whitelist[address.toLowerCase()] = contractData
            }
          }
          console.log({ whitelist })
          resolve(whitelist)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  fetchAPYs() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${cnf.BACKEND_URL}/api/apy`)
        .then((r) => {
          resolve(r.data.dailyapys)
        })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  }

  getStore(index) {
    // TODO: ONLY FOR DEMO PAGES
    // if (
    //   index === 'account' &&
    //   ['/stake', '/protect'].includes(window.location.pathname)
    // ) {
    //   return { address: '0x7125b39a7e706c533f0a6ce392cbc56d000f9db6' }
    // }

    return this.store[index]
  }

  setStore(obj) {
    this.store = { ...this.store, ...obj }
    // console.log(this.store)
    return emitter.emit('StoreUpdated')
  }

  async getAccountBalances(payload) {
    const account = store.getStore('account')
    const balances = store.getStore('balances')

    if (!account || !account.address) {
      return false
    }
    const web3 = await this._getProvider()

    await asyncMap(
      balances,
      (balance, callback) => {
        asyncParallel(
          [
            (callbackInner) => {
              this._getERC20Balance(web3, balance, account, callbackInner)
            },
          ],
          (err, data) => {
            balance.balance = data[0]

            callback(null, balance)
          }
        )
      },
      (err, balanceData) => {
        if (err) {
          emitter.emit(ERROR, err)
          emitter.emit(SNACKBAR_ERROR, err)
          return
        }

        store.setStore({ balances: balanceData })
        emitter.emit(ACCOUNT_BALANCES_RETURNED)
      }
    )
  }

  async changeCurrentNftContract(payload) {
    const { currentNftContract } = payload.content
    if (currentNftContract) {
      store.setStore({ currentNftContract })
    }
    setTimeout(() => {
      console.log(store.getStore('currentNftContract'))
    }, 2000)
  }

  async getContractBalances(payload) {
    // const account = store.getStore('account')
    const contracts = store.getStore('contracts')

    // if (!account || !account.address) {
    //   return false
    // }

    const capacities = await this._getCapacities()
    if (capacities.length === 0) {
      emitter.emit(ERROR)
      emitter.emit(SNACKBAR_ERROR)
      return
    }

    const arcoreUsage = await this._getArcoreUsage()

    const contractData = []
    for (const contract of contracts) {
      const capacity = capacities.filter((capacity) => {
        return (
          capacity.contractAddress.toLowerCase() ===
          contract.address.toLowerCase()
        )
      })

      if (capacity.length > 0) {
        contract.capacity = capacity[0]
      } else {
        contract.capacity = {
          capacityETH: 0,
          capacityDAI: 0,
          netStakedNXM: 0,
        }
      }

      contract.arcoreUsedPercent = await this._getArcoreUsedPercent(
        contract,
        arcoreUsage
      )

      contractData.push(contract)
    }

    store.setStore({
      contracts: this._sortContractsByArcoreUsage(contractData),
    })
    emitter.emit(CONTRACT_BALANCES_RETURNED)
  }

  async _getArcoreUsage() {
    return (await axios.get(`${this.service.config.backendUrl}/api/mint/usage`))
      .data.data
  }

  _sortContractsByArcoreUsage(_contracts) {
    return _contracts.sort(
      (x, y) => +y.arcoreUsedPercent - +x.arcoreUsedPercent
    )
  }

  async _getArcoreAvailableCoverage() {
    return (
      await axios.get(
        `${this.service.config.backendUrl}/api/plan/available-coverage`
      )
    ).data.available_coverage
  }

  async _getTotalUsedCover(account, _protocol) {
    try {
      const web3 = await this._getProvider()
      const contract = this.makeContract(
        web3,
        config.planManager.abi,
        config.planManager.address
      )

      let _used = await contract.methods
        .totalUsedCover(_protocol)
        .call({ from: account.address })

      return web3.utils.fromWei(_used, 'ether')
    } catch (e) {
      return '0'
    }
  }

  async _getTotalStakedAmount(account, _protocol) {
    try {
      const web3 = await this._getProvider()
      const contract = this.makeContract(
        web3,
        config.stakeManager.abi,
        config.stakeManager.address
      )

      let _used = await contract.methods
        .totalStakedAmount(_protocol)
        .call({ from: account.address })

      return web3.utils.fromWei(_used, 'ether')
    } catch (e) {
      return '0'
    }
  }

  async _getArcoreUsedPercent(contract, arcoreUsage) {
    const _contract = arcoreUsage.find(
      (c) => c.ContractAddress.toLowerCase() === contract.address.toLowerCase()
    )
    return _contract ? _contract.PercentUsed : '0.00'
  }

  emitError(err) {
    emitter.emit(ERROR, err)
    emitter.emit(SNACKBAR_ERROR, err)
  }

  makeContract(web3, abi, address) {
    return new web3.eth.Contract(abi, address)
  }

  fetchPricesAndAmountsFromApi(address) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.backendUrl}/api/plan?address=${address}`)
        .then((r) => {
          resolve(r.data.tokens)
        })
        .catch((err) => reject(err))
    })
  }

  async getRewardUserStakedPrice(payload) {
    const account = store.getStore('account')
    if (!account || !account.address) {
      return false
    }

    await this._getRewardUserStakedPrice(account, (err, data) => {
      if (err) {
        this.emitError(err)
        return
      }

      store.setStore({ rewardUserStakedPrice: data })
      emitter.emit(REWARD_USER_STAKED_PRICE_RETURNED)
    })
  }

  async _getRewardUserStakedPrice(account, callback) {
    try {
      const web3 = await this._getProvider()
      const contract = this.makeContract(
        web3,
        config.rewardManager.abi,
        config.balanceManager.address
      )

      let balance = await contract.methods
        .getUserStaked(account.address)
        .call({ from: account.address })

      callback(null, web3.utils.fromWei(balance, 'ether'))
    } catch (e) {
      return callback(e)
    }
  }

  async _getERC20Balance(web3, contract, account, callback) {
    try {
      if (contract.address === 'Ethereum') {
        const eth_balance = web3.utils.fromWei(
          await web3.eth.getBalance(account.address),
          'ether'
        )
        callback(null, parseFloat(eth_balance))
      } else {
        const erc20Contract = new web3.eth.Contract(
          config.erc20ABI,
          contract.address
        )
        let balance = await erc20Contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })
        balance = parseFloat(balance) / 10 ** contract.decimals
        callback(null, parseFloat(balance))
      }
    } catch (ex) {
      return callback(ex)
    }
  }

  async _getCapacities() {
    try {
      const url = config.nexusMutualAPI + `v1/capacities`

      const options = {
        uri: url,
        headers: {
          'x-api-key': config.nexusMutualKey,
        },
        json: true,
      }

      const capacityJSON = await rp(options)
      return capacityJSON
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async _getContractCapacity(contract, callback) {
    try {
      const url =
        config.nexusMutualAPI + `v1/contracts/${contract.address}/capacity`

      const options = {
        uri: url,
        headers: {
          'x-api-key': config.nexusMutualKey,
        },
        json: true,
      }

      const capacityJSON = await rp(options)
      callback(null, capacityJSON)
    } catch (e) {
      console.log(e)
      if (e && e.error && e.error.reason === 'Uncoverable') {
        return callback(null, {
          capacityETH: 0,
          capacityDAI: 0,
          netStakedNXM: 0,
        })
      }
      return callback(null, {})
    }
  }

  async getQuote(payload) {
    const { amount, days, contract, asset } = payload.content

    this._getQuote(amount, days, contract, asset, (err, data) => {
      if (err) {
        emitter.emit(ERROR, err)
        emitter.emit(SNACKBAR_ERROR, err)
        return
      }

      emitter.emit(QUOTE_RETURNED, data)
    })
  }

  async _getQuote(amount, days, contract, asset, callback) {
    try {
      const url =
        config.nexusMutualAPI +
        `v1/quote?coverAmount=${amount}&currency=${asset.symbol}&period=${days}&contractAddress=${contract.address}`
      // const url = config.nexusMutualAPI+`getQuote/${amount}/${asset.symbol}/${days}/${contract.address}/M1`

      const options = {
        uri: url,
        headers: {
          'x-api-key': config.nexusMutualKey,
        },
        json: true,
      }

      const quoteJSON = await rp(options)
      // console.log(quoteJSON);
      callback(null, quoteJSON)
    } catch (e) {
      console.log(e)
      return callback(e)
    }
  }

  async apply(payload) {
    const account = store.getStore('account')
    const { amount, days, contract, asset, quote } = payload.content

    if (asset.id === 'dai') {
      this._checkApproval(
        asset,
        account,
        amount,
        NFT_CONTRACTS[store.getStore('currentNftContract')].address,
        (err) => {
          if (err) {
            return emitter.emit(ERROR, err)
          }

          this._callApply(
            amount,
            days,
            contract,
            asset,
            account,
            quote,
            (err, data) => {
              if (err) {
                emitter.emit(ERROR, err)
                emitter.emit(SNACKBAR_ERROR, err)
                return
              }

              emitter.emit(APPLY_RETURNED, data)
            }
          )
        }
      )
    } else {
      this._callApply(
        amount,
        days,
        contract,
        asset,
        account,
        quote,
        (err, data) => {
          if (err) {
            emitter.emit(ERROR, err)
            emitter.emit(SNACKBAR_ERROR, err)
            return
          }

          emitter.emit(APPLY_RETURNED, data)
        }
      )
    }
  }

  async _callApply(amount, days, contract, asset, account, quote, callback) {
    const web3 = await this._getProvider()
    let insuranceContract = new web3.eth.Contract(
      NFT_CONTRACTS[store.getStore('currentNftContract')].abi,
      NFT_CONTRACTS[store.getStore('currentNftContract')].address
    )

    const coverDetails = [
      amount,
      quote.price,
      quote.priceInNXM,
      quote.expiresAt,
      quote.generatedAt,
    ]

    const sendSymbol = web3.utils.asciiToHex(asset.symbol)

    let sendValue = undefined
    if (asset.symbol === 'ETH') {
      sendValue = quote.price
    }

    console.log(
      '[buyCover ARGUMENTS]',
      contract.address,
      sendSymbol,
      coverDetails,
      days,
      quote.v,
      quote.r,
      quote.s
    )

    console.log('[SEND]', {
      from: account.address,
      value: sendValue,
      gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
    })
    //
    // let gasEstimate = await insuranceContract.methods
    //   .buyCover(
    //     contract.address,
    //     sendSymbol,
    //     coverDetails,
    //     days,
    //     quote.v,
    //     quote.r,
    //     quote.s
    //   )
    //   .estimateGas({
    //     from: account.address,
    //     gas: 10000000,
    //   })
    //
    // if (gasEstimate > 10000000) {
    //   await this.handleError(
    //     'Transaction will fail. This is likely because cover is sold out. Please try another option.',
    //     callback
    //   )
    //   return
    // }

    insuranceContract.methods
      .buyCover(
        contract.address,
        sendSymbol,
        coverDetails,
        days,
        quote.v,
        quote.r,
        quote.s
      )
      .send({
        from: account.address,
        value: sendValue,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
      })
      .once('transactionHash', (hash) =>
        this.handleTransactionHash(hash, callback)
      )
      .once('receipt', (receipt) => this.handleReceipt(receipt))
      .on('confirmation', (confirmationNumber, receipt) =>
        this.handleConfirmation(confirmationNumber, receipt)
      )
      .on('error', (error) => this.handleError(error, callback))
  }

  async getCover(payload) {
    const _arNftGetToken = async (account, web3, tokenIndex) => {
      const tokenData = await this.service.contracts.arNFT.getToken({
        content: { nftId: tokenIndex },
      })

      const {
        cid,
        scAddress,
        currencyCode,
        coverPrice,
        validUntil,
        sumAssured,
        claimId,
        status,
      } = tokenData

      return {
        tokenIndex,
        address: scAddress,
        coverStatus: status,
        coverId: cid,
        claimId,
        coverCurrencyDisplay: web3.utils.hexToAscii(currencyCode),
        coverPriceDisplay: web3.utils.fromWei(coverPrice, 'ether'),
        expirationTimestamp: validUntil,
        coverAmount: sumAssured,
      }
    }

    const _yNftTokens = async (
      insuranceContract,
      quotationContract,
      claimContract,
      account,
      web3,
      tokenIndex
    ) => {
      const token = await insuranceContract.methods
        .tokens(tokenIndex)
        .call({ from: account.address })
      // console.log({ token })
      token.address = (
        await quotationContract.methods
          .getscAddressOfCover(token.coverId)
          .call({ from: account.address })
      )[1]

      token.coverStatus = await claimContract.methods
        .getClaimbyIndex(token.claimId)
        .call({ from: account.address })

      token.tokenIndex = tokenIndex
      token.expirationTime = token.expireTime
      token.coverCurrencyDisplay = web3.utils.hexToAscii(token.coverCurrency)
      token.coverPriceDisplay = web3.utils.fromWei(token.coverPrice, 'ether')

      return token
    }

    try {
      // console.log('GETTING COVER')
      const web3 = await this._getProvider()
      const account = store.getStore('account')
      const contracts = store.getStore('contracts')
      const currentNftContract = store.getStore('currentNftContract')

      // console.log(account)
      // console.log({ contracts })
      const coverArr = []
      for (let [contractName, contractData] of Object.entries(NFT_CONTRACTS)) {
        try {
          const insuranceContract = new web3.eth.Contract(
            contractData.abi,
            contractData.address
          )
          // console.log({ contractName })
          const quotationContract = new web3.eth.Contract(
            config.quotationABI,
            config.quotationAddress
          )
          const claimContract = new web3.eth.Contract(
            config.claimABI,
            config.claimAddress
          )

          // console.log(insuranceContract)
          // ! TODO: Remove before going to mainnet
          if (contractName === 'arNFTv1') {
            //} || contractName === 'yNFT') {
            // console.log({ contractName })
            continue
          }

          const balanceOf = await insuranceContract.methods
            .balanceOf(account.address)
            .call({ from: account.address })

          // console.log({ balanceOf, contractName, contractData })
          if (balanceOf > 0) {
            // console.log(Array.from(Array(parseInt(balanceOf)).keys()))
            let arr = Array.from(Array(parseInt(balanceOf)).keys())

            const resultArr = await (async () => {
              return new Promise((resolve, reject) => {
                asyncMap(
                  arr,
                  async (index, callback, c) => {
                    // console.log(index)
                    try {
                      const tokenIndex = await insuranceContract.methods
                        .tokenOfOwnerByIndex(account.address, index)
                        .call({ from: account.address })
                      // console.log({ tokenIndex })
                      // console.log({ contractName })
                      const token = ['arNFTv1', 'arNFTv2'].includes(
                        contractName
                      )
                        ? await _arNftGetToken(account, web3, tokenIndex)
                        : await _yNftTokens(
                            insuranceContract,
                            quotationContract,
                            claimContract,
                            account,
                            web3,
                            tokenIndex
                          )
                      // console.log({ token })
                      token.insuranceContractName = contractData.title
                      token.insuranceContractAddress = contractData.address

                      let contractDetails = contracts.filter((contract) => {
                        return contract.address === token.address
                      })

                      // console.log(contractDetails)
                      if (contractDetails.length > 0) {
                        token.logo = contractDetails[0].logo
                        token.name = contractDetails[0].name
                      }

                      if (callback) {
                        callback(null, token)
                      } else {
                        return token
                      }
                    } catch (ex) {
                      console.log(ex)
                      if (callback) {
                        callback(null, null)
                      } else {
                        return null
                      }
                    }
                  },
                  (err, data) => {
                    if (err) reject(err)
                    resolve(data)
                  }
                )
              })
            })()

            coverArr.push(...resultArr)
          }
        } catch (coverError) {
          // console.log({ coverError })
          emitter.emit(ERROR, coverError)
          emitter.emit(SNACKBAR_ERROR, coverError.message || coverError)
        }
      }
      // console.log({ coverArr })
      store.setStore({ cover: coverArr })
      emitter.emit(COVER_RETURNED, coverArr)
    } catch (ex) {
      // console.log({ ex })
      emitter.emit(ERROR, ex)
      emitter.emit(SNACKBAR_ERROR, ex)
    }
  }

  async claim(payload) {
    const account = store.getStore('account')
    const { contractId } = payload.content

    this._callClaim(contractId, account, (err, data) => {
      if (err) {
        this.emitError(err)
        return
      }

      emitter.emit(CLAIM_RETURNED, data)
    })
  }

  async _callClaim(contractId, account, callback) {
    const web3 = await this._getProvider()

    let insuranceContract = new web3.eth.Contract(
      NFT_CONTRACTS[store.getStore('currentNftContract')].abi,
      NFT_CONTRACTS[store.getStore('currentNftContract')].address
    )

    insuranceContract.methods
      .submitClaim(contractId)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
      })
      .once('transactionHash', (hash) =>
        this.handleTransactionHash(hash, callback)
      )
      .once('receipt', (receipt) => this.handleReceipt(receipt))
      .on('confirmation', (confirmationNumber, receipt) =>
        this.handleConfirmation(confirmationNumber, receipt)
      )
      .on('error', (error) => this.handleError(error, callback))
  }

  async redeem(payload) {
    const account = store.getStore('account')
    const { contractId } = payload.content

    this._callRedeem(contractId, account, (err, data) => {
      if (err) {
        this.emitError(err)
        return
      }

      emitter.emit(REDEEM_RETURNED, data)
    })
  }

  async _callRedeem(contractId, account, callback) {
    const web3 = await this._getProvider()

    let insuranceContract = new web3.eth.Contract(
      NFT_CONTRACTS[store.getStore('currentNftContract')].abi,
      NFT_CONTRACTS[store.getStore('currentNftContract')].address
    )

    insuranceContract.methods
      .redeemClaim(contractId)
      .send({
        from: account.address,
        gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
      })
      .once('transactionHash', (hash) =>
        this.handleTransactionHash(hash, callback)
      )
      .once('receipt', (receipt) => this.handleReceipt(receipt))
      .on('confirmation', (confirmationNumber, receipt) =>
        this.handleConfirmation(confirmationNumber, receipt)
      )
      .on('error', (error) => this.handleError(error, callback))
  }

  async _checkApproval(asset, account, amount, contract, callback) {
    try {
      const web3 = await this._getProvider()
      const erc20Contract = new web3.eth.Contract(
        config.erc20ABI,
        asset.address
      )
      const allowance = await erc20Contract.methods
        .allowance(account.address, contract)
        .call({ from: account.address })

      let ethAllowance = web3.utils.fromWei(allowance, 'ether')
      if (asset.decimals !== 18) {
        ethAllowance = (allowance * 10 ** asset.decimals).toFixed(0)
      }

      var amountToSend = web3.utils.toWei('999999999', 'ether')
      if (asset.decimals !== 18) {
        amountToSend = (999999999 * 10 ** asset.decimals).toFixed(0)
      }

      if (parseFloat(ethAllowance) < parseFloat(amount)) {
        await erc20Contract.methods.approve(contract, amountToSend).send({
          from: account.address,
          gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'),
        })
        callback()
      } else {
        callback()
      }
    } catch (error) {
      if (error.message) {
        return callback(error.message)
      }
      callback(error)
    }
  }
  async getProtocolStakeStats() {
    return new Promise(async (resolve, reject) => {
      let protocols = []
      await axios.get(`${config.backendUrl}/api/staked/stats`).then((p) => {
        protocols = p.data.protocols || []
      })

      let ourProtocols = []
      protocols.forEach((p) => {
        ourProtocols.push({
          name: p.name,
          logo: logoMapper(p.name),
          staked: p.staked,
          usdStaked: p.staked_usd,
        })
      })

      emitter.emit(PROTOCOL_STAKE_STATS_RETURNED, ourProtocols)
      resolve(ourProtocols)
    })
  }

  async getEthPrice() {
    return new Promise(async (resolve, reject) => {
      let ethPrice = 0
      await axios
        .get(`${config.backendUrl}/api/price/eth`)
        .then((x) => {
          ethPrice = x.data.price
        })
        .catch((e) => {
          ethPrice = 1
        })
      this.setStore({ ethPrice })
      emitter.emit(ETH_PRICE_RETURNED, ethPrice)
      resolve(ethPrice)
    })
  }

  async getBlog(payload) {
    return new Promise(async (resolve, reject) => {
      let posts = []
      await axios
        .get(`${config.backendUrl}/api/blog`)
        .then((x) => {
          posts = x.data.posts
        })
        .catch((e) => {
          posts = []
        })

      emitter.emit(BLOG_RETURNED, posts)
      resolve(posts)
    })
  }

  async getArmorPrice() {
    return new Promise(async (resolve, reject) => {
      let armorPrice = 0
      // TODO: change to our API
      await axios
        .get(
          'https://api.coingecko.com/api/v3/simple/price?ids=armor&vs_currencies=usd'
        )
        .then((x) => {
          armorPrice = x.data.armor.usd
        })
        .catch((e) => {
          armorPrice = 1
        })

      this.setStore({ armorPrice })
      emitter.emit(ARMOR_PRICE_RETURNED, armorPrice)
      resolve(armorPrice)
    })
  }

  async getReferralCode(payload) {
    const { address } = payload.content

    return new Promise(async (resolve, reject) => {
      // get referral code for user
      let referralSystem = new ReferralSystem(config)
      let referralCode = null

      await referralSystem
        .getReferralCode(address)
        .then((res) => {
          referralCode = res
        })
        .catch((err) => {
          console.error(err)
        })

      this.setStore({ referralCode })
      emitter.emit(REFERRAL_CODE_RETURNED, referralCode)
      resolve(referralCode)
    })
  }

  async getManualInputs(payload) {
    const { address } = payload.content
    return new Promise(async (resolve, reject) => {
      let manualInputs = []
      await axios
        .get(`${config.backendUrl}/api/plan/manual-inputs?address=${address}`)
        .then((x) => {
          manualInputs = x.data.protocols
        })
        .catch((e) => {
          manualInputs = []
        })

      let protocols = []
      manualInputs.forEach((mi, idx) => {
        protocols.push({
          name: mi.name,
          symbol: mi.symbol,
          price: 0,
          icon: logoMapper(mi.name),
          balances: {
            total: '0',
            usd: mi.balances.usd,
            eth: mi.balances.eth,
          },
          balance: {
            total: '0',
            usd: mi.balances.usd,
            eth: mi.balances.eth,
          },
          addresses: {
            contract: mi.address,
            token: '0x0',
          },
        })
      })

      emitter.emit(MANUAL_INPUTS_RETURNED, protocols)
      resolve(protocols)
    })
  }

  async updateManualInputs(payload) {
    const { address, protocols } = payload.content
    let manualInputs = []

    // fix for golang
    protocols.forEach((p, i) => {
      protocols[i].eth = parseFloat(p.eth)
      protocols[i].wei = parseFloat(p.wei)
    })

    return new Promise(async (resolve, reject) => {
      await axios
        .post(`${config.backendUrl}/api/plan/manual-inputs/update`, {
          address: address,
          protocols: protocols,
        })
        .then((x) => {
          manualInputs = x.data.protocols
        })
        .catch((e) => {
          manualInputs = []
        })

      let updatedProtocols = []
      manualInputs.forEach((mi, idx) => {
        updatedProtocols.push({
          name: mi.name,
          symbol: mi.symbol,
          price: 0,
          icon: logoMapper(mi.name),
          balances: {
            total: '0',
            usd: mi.eth,
            eth: mi.eth,
          },
          balance: {
            total: '0',
            usd: mi.eth,
            eth: mi.eth,
          },
          addresses: {
            contract: mi.address,
            token: '0x0',
          },
        })
      })

      emitter.emit(UPDATE_MANUAL_INPUTS_COMPLETED, updatedProtocols)
      resolve(updatedProtocols)
    })
  }

  async getAvailableCoverage() {
    return new Promise(async (resolve, reject) => {
      let coverage = []
      await axios
        .get(`${config.backendUrl}/api/plan/available-coverage`)
        .then((x) => {
          coverage = x.data.available_coverage
        })
        .catch((e) => {
          coverage = []
        })

      emitter.emit(AVAILABLE_COVERAGE_RETURNED, coverage)
      resolve(coverage)
    })
  }

  async _setGasPriceType(payload) {
    const _gasPriceType = payload.content.gasPriceType
    const ALLOWED_GAS_PRICE_TYPES = ['instant', 'standard', 'fast', 'slow']
    if (ALLOWED_GAS_PRICE_TYPES.includes(_gasPriceType)) {
      this.setStore({ gasPriceType: _gasPriceType })
    } else {
      console.error(`Gas price [${_gasPriceType}] is not allowed!`)
      this.setStore({ gasPriceType: 'standard' })
    }
    emitter.emit(GAS_PRICE_TYPE_RETURNED, { gasPriceType: _gasPriceType })
  }

  async _getGasPrice() {
    try {
      const gasPriceType = this.getStore('gasPriceType') || 'standard' // fallback to instant
      const priceJSON = (await axios(`${config.backendUrl}/api/gas-prices`))
        .data.gas
      if (priceJSON) {
        return priceJSON[gasPriceType].toFixed(0)
      }
      return store.getStore('universalGasPrice')
    } catch (e) {
      console.log(e)
      return store.getStore('universalGasPrice')
    }
  }

  _getProvider() {
    const web3context = store.getStore('web3context')
    if (!web3context) {
      return null
    }
    const provider = web3context.library.provider
    if (!provider) {
      return null
    }
    const web3 = new Web3(provider)
    return web3
  }

  async handleTransactionHash(hash, callback) {
    emitter.emit(SNACKBAR_TRANSACTION_RECEIPT, hash)
    callback(null, hash)
  }

  async handleReceipt(receipt) {
    emitter.emit(SNACKBAR_TRANSACTION_RECEIPT, receipt.transactionHash)
  }

  async handleConfirmation(confirmationNumber, receipt) {
    if (confirmationNumber === 2) {
      emitter.emit(SNACKBAR_TRANSACTION_CONFIRMED, receipt.transactionHash)
    }
  }

  async handleError(error, callback) {
    if (!error.toString().includes('-32601')) {
      if (error.message) {
        return callback(error.message)
      }
      callback(error)
    }
  }
}

var store = new Store()

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter,
  NFT_CONTRACTS,
}
