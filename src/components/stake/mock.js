export default () => {
  const data = {
    staked: [
      {
        logo: 'uniswap',
        name: 'Uniswap',
        link: '#',
        info: [
          { value: '50', symbol: 'ETH' },
          { value: '01/21/2020' },
          { value: '6', symbol: 'ETH' },
          { value: '-' },
          { value: '-' },
        ],
      },
      {
        logo: 'aave',
        name: 'AAVE',
        link: '#',
        info: [
          { value: '10', symbol: 'ETH' },
          { value: '05/21/2020' },
          { value: '12', symbol: 'ETH' },
          { value: '-' },
          { value: '-' },
        ],
      },
      {
        logo: 'uniswap',
        name: 'Uniswap',
        link: '#',
        info: [
          { value: '15', symbol: 'ETH' },
          { value: 'EXPIRED' },
          { value: '' },
          { value: '-' },
          { value: '-' },
        ],
      },
      {
        logo: 'yam_finance',
        name: 'Yam',
        link: '#',
        info: [
          { value: '10', symbol: 'ETH' },
          { value: 'EXPIRED' },
          { value: '' },
          { value: '-' },
          { value: '-' },
        ],
      },
    ],
    unStaked: [
      {
        logo: 'uniswap',
        name: 'Uniswap',
        link: '#',
        info: [
          { value: '50', symbol: 'ETH' },
          { value: '01/21/2020' },
          { value: '6', symbol: 'ETH' },
          { value: '-' },
          { value: '-' },
        ],
      },
      {
        logo: 'aave',
        name: 'AAVE',
        link: '#',
        info: [
          { value: '10', symbol: 'ETH' },
          { value: '05/21/2020' },
          { value: '12', symbol: 'ETH' },
          { value: '-' },
          { value: '-' },
        ],
      },
      {
        logo: 'uniswap',
        name: 'Uniswap',
        link: '#',
        info: [
          { value: '15', symbol: 'ETH' },
          { value: 'EXPIRED' },
          { value: '' },
          { value: '-' },
          { value: '-' },
        ],
      },
      {
        logo: 'yam_finance',
        name: 'Yam',
        link: '#',
        info: [
          { value: '10', symbol: 'ETH' },
          { value: 'EXPIRED' },
          { value: '' },
          { value: '-' },
          { value: '-' },
        ],
      },
    ],
  }
  return new Promise((resolve) => resolve({ data }))
}
