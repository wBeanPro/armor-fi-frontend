export default () => {
  const data = {
    overviewData: [
      {
        logo: 'armor-circle-logo.svg',
        name: 'ARMOR Governance',
        contract: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
        blurred: true,
        currentInfo: [
          { title: 'Owned ARMOR', value: '987,560' },
          { title: 'Staked ARMOR', value: '1,337,000' },
          { title: 'Rewards Owed', value: '12', symbol: 'Ether' },
          { title: 'Rewards Given', value: '167', symbol: 'Ether' },
        ],
        totalInfo: [
          { title: 'Total ARMOR Staked', value: '120,000,000' },
          {
            title: 'Total Stakers',
            value: '1,457',
          },
          {
            title: 'Total Rewards Given',
            value: '24,000',
            symbol: 'Ether',
          },
        ],
      },
      {
        logo: 'armor-circle-logo.svg',
        name: 'arCore Farming',
        contract: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
        currentInfo: [
          { title: 'ETH Spent', value: '2.5', symbol: 'ETH' },
          { title: 'ETH Staked', value: '5', symbol: 'ETH' },
          { title: 'ARMOR Reward', value: '260,000' },
        ],
        totalInfo: [
          { title: 'Total ETH Spent', value: '1,657' },
          {
            title: 'Total ETH Staked',
            value: '8,843',
          },
          {
            title: 'Total ARMOR Rewards',
            value: '55,700,890',
          },
        ],
      },
      {
        logo: 'armor-circle-logo.svg',
        name: 'arShield LP Farming',
        contract: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
        currentInfo: [
          { title: 'ETH Spent', value: '2.5', symbol: 'ETH' },
          { title: 'ETH Staked', value: '5', symbol: 'ETH' },
          { title: 'ARMOR Reward', value: '260,000' },
        ],
        totalInfo: [
          { title: 'Total ETH Spent', value: '1,657' },
          {
            title: 'Total ETH Staked',
            value: '8,843',
          },
          {
            title: 'Total ARMOR Rewards',
            value: '55,700,890',
          },
        ],
      },
      {
        logo: 'armor-circle-logo.svg',
        name: 'arNXM Vault Farming',
        contract: '0x9424b1412450d0f8fc2255faf6046b98213b76bd',
        currentInfo: [
          { title: 'ETH Spent', value: '2.5', symbol: 'ETH' },
          { title: 'ETH Staked', value: '5', symbol: 'ETH' },
          { title: 'ARMOR Reward', value: '260,000' },
        ],
        totalInfo: [
          { title: 'Total ETH Spent', value: '1,657' },
          {
            title: 'Total ETH Staked',
            value: '8,843',
          },
          {
            title: 'Total ARMOR Rewards',
            value: '55,700,890',
          },
        ],
      },
    ],
  }
  return new Promise((resolve) => resolve({ data }))
}
