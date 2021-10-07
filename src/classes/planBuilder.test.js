import PlanBuilder from './planBuilder'
const nexusMutualMock = {
  '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16': {
    dateAdded: '2020-08-13',
    github: 'https://github.com/yam-finance/yam-protocol',
    logo: 'https://api.nexusmutual.io/coverables/images/yam.png',
    messari: '',
    name: 'Yam Finance',
    type: 'contract',
  },
}

test('it should find contract address', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  expect(
    planBuilder.hasProtocolByAddress(
      '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16'
    )
  ).toBe(true)
})

test('it should find get contract by address', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  expect(
    planBuilder.getProtocolByAddress(
      '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16'
    )['name']
  ).toBe('Yam Finance')
})

test('it should make new coverage item with balance of 0 if not supplied', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  let plan = planBuilder.addNewCoverageToPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    0
  )

  expect(plan.balance.eth).toBe('0')
  expect(plan.balance.wei).toBe('0')
})

test('it should make new coverage item with balance of 522 in ETH', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  let plan = planBuilder.addNewCoverageToPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    0,
    522000000000000000000
  )

  expect(plan.balance.eth).toBe('522')
  expect(plan.balance.wei).toBe('522000000000000000000')
})

test('it should set coverage item with coverage of 421 in ETH', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoverageToPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    522000000000000000000
  )
  let plan = planBuilder.setProtocolCoverage(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    4210000000000000000
  )

  expect(plan.coverage.eth).toBe('4.21')
  expect(plan.coverage.wei).toBe('4210000000000000000')
})

test('it should add coverage item with coverage of 821 in ETH', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoverageToPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    0,
    522000000000000000000
  )
  let plan = planBuilder.setProtocolCoverage(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    4210000000000000000
  )
  plan = planBuilder.addProtocolCoverage(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    4210000000000000000
  )

  expect(plan.coverage.eth).toBe('8.42')
  expect(plan.coverage.wei).toBe('8420000000000000000')
  expect(plan.coverage.percentage).toBe(
    (
      (parseFloat('8420000000000000000') /
        parseFloat('522000000000000000000')) *
      100
    ).toString()
  )
})

test('it should return 84% availability for 42/50 eth', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoverageToPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    522000000000000000000
  )
  let plan = planBuilder.setProtocolAvailability(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    42000000000000000000,
    50000000000000000000
  )

  expect(plan.availability.eth).toBe('42')
  expect(plan.availability.wei).toBe('42000000000000000000')
  expect(plan.availability.percentage).toBe('84')
})

test('it should return 0% availability if there isnt any coverage left', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoverageToPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    522000000000000000000
  )
  let plan = planBuilder.setProtocolAvailability(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    0,
    50000000000000000000
  )

  expect(plan.availability.eth).toBe('0')
  expect(plan.availability.wei).toBe('0')
  expect(plan.availability.percentage).toBe('0')
})

test('it should return 100% availability if nothing has been staked', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoverageToPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    522000000000000000000
  )
  let plan = planBuilder.setProtocolAvailability(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    50000000000000000000,
    0
  )

  expect(plan.availability.eth).toBe('50')
  expect(plan.availability.wei).toBe('50000000000000000000')
  expect(plan.availability.percentage).toBe('100')
})

test('it should return 100% coverage using zapper api', () => {
  const zapper = [
    {
      name: 'fake',
      symbol: 'fake',
      price: 0,
      balances: { total: 10, usd: 23, eth: 11 },
      addresses: {
        contract: '0x0ee298e3b3390e3b945a5456fbf59ecc3f55da16',
        token: '0x0',
      },
    },
    {
      name: 'dydx',
      symbol: 'dydx',
      price: 0,
      balances: {
        total: 10,
        usd: 201.94797772725278,
        eth: 0.14596549833256545,
      },
      addresses: {
        contract: '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
        token: '0x0',
      },
    },
  ]

  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoveragePlansFromArray(zapper)
  planBuilder.setProtocolCoverage(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    145965498332565450
  )
  planBuilder.setProtocolAvailability(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    50000000000000000000,
    145965498332565450
  )

  const protocolIndex = planBuilder.findProtocolIndexInPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16'
  )
  expect(planBuilder.plan[protocolIndex].balance.eth).toBe(
    '0.14596549833256545'
  )
  expect(planBuilder.plan[protocolIndex].balance.wei).toBe('145965498332565450')

  expect(planBuilder.plan[protocolIndex].coverage.eth).toBe(
    '0.14596549833256544'
  )
  expect(planBuilder.plan[protocolIndex].coverage.wei).toBe(
    '145965498332565440'
  )
  expect(planBuilder.plan[protocolIndex].coverage.percentage).toBe('100')
})

test('it should return 69% coverage using zapper api', () => {
  const zapper = [
    {
      name: 'fake',
      symbol: 'fake',
      price: 0,
      balances: { total: 10, usd: 23, eth: 11 },
      addresses: {
        contract: '0x0ee298e3b3390e3b945a5456fbf59ecc3f55da16',
        token: '0x0',
      },
    },
    {
      name: 'dydx',
      symbol: 'dydx',
      price: 0,
      balances: {
        total: 10,
        usd: 201.94797772725278,
        eth: 0.14596549833256545,
      },
      addresses: {
        contract: '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
        token: '0x0',
      },
    },
  ]

  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoveragePlansFromArray(zapper)
  planBuilder.setProtocolCoverage(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    100000000000000000,
    100000000000000000
  )
  planBuilder.setProtocolAvailability(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    50000000000000000000,
    100000000000000000
  )

  const protocolIndex = planBuilder.findProtocolIndexInPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16'
  )
  expect(planBuilder.plan[protocolIndex].balance.eth).toBe(
    '0.14596549833256545'
  )
  expect(planBuilder.plan[protocolIndex].balance.wei).toBe('145965498332565450')

  expect(planBuilder.plan[protocolIndex].coverage.eth).toBe('0.1')
  expect(planBuilder.plan[protocolIndex].coverage.wei).toBe(
    '100000000000000000'
  )
  expect(
    Math.round(planBuilder.plan[protocolIndex].coverage.percentage).toString()
  ).toBe('69')
})

test('it can update token value of protocol and automatically readjust the coverage percentage', () => {
  const zapper = [
    {
      name: 'fake',
      symbol: 'fake',
      price: 0,
      balances: { total: 10, usd: 23, eth: 11 },
      addresses: {
        contract: '0x0ee298e3b3390e3b945a5456fbf59ecc3f55da16',
        token: '0x0',
      },
    },
    {
      name: 'dydx',
      symbol: 'dydx',
      price: 0,
      balances: {
        total: 10,
        usd: 201.94797772725278,
        eth: 0.14596549833256545,
      },
      addresses: {
        contract: '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
        token: '0x0',
      },
    },
  ]

  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoveragePlansFromArray(zapper)
  let plan = planBuilder.setProtocolCoverage(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    145965498332565440
  )
  expect(plan.coverage.eth).toBe('0.14596549833256544')
  expect(plan.coverage.wei).toBe('145965498332565440')
  expect(plan.coverage.percentage).toBe('100')

  plan = planBuilder.setBalance(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    245965498332565440
  )
  expect(plan.balance.eth).toBe('0.24596549833256544')
  expect(plan.balance.wei).toBe('245965498332565440')

  expect(plan.coverage.eth).toBe('0.14596549833256544')
  expect(plan.coverage.wei).toBe('145965498332565440')
  expect(Math.round(plan.coverage.percentage).toString()).toBe('59')
})

test('it can return list of protocols in plan (used to filter manual input)', () => {
  const zapper = [
    {
      name: 'fake',
      symbol: 'fake',
      price: 0,
      balances: { total: 10, usd: 23, eth: 11 },
      addresses: {
        contract: '0x0ee298e3b3390e3b945a5456fbf59ecc3f55da16',
        token: '0x0',
      },
    },
    {
      name: 'dydx',
      symbol: 'dydx',
      price: 0,
      balances: {
        total: 10,
        usd: 201.94797772725278,
        eth: 0.14596549833256545,
      },
      addresses: {
        contract: '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
        token: '0x0',
      },
    },
  ]

  const planBuilder = new PlanBuilder(nexusMutualMock)
  planBuilder.addNewCoveragePlansFromArray(zapper)
  const list = planBuilder.getListOfProtocolAddresses()

  expect(list.length).toBe(1)
  expect(list[0]).toBe('0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16')
})

test('testing e2e and calculating usd values based on eth price', () => {
  const planBuilder = new PlanBuilder(nexusMutualMock)
  let plan = planBuilder.addNewCoverageToPlan(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    0
  )

  let ethPrice = 1200

  planBuilder.setBalance(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    50000000000000000000
  )
  planBuilder.setProtocolCoverage(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    50000000000000000000
  )
  planBuilder.setProtocolAvailability(
    '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16',
    100005000000000000000,
    50000000000000000000
  )
  planBuilder.setUsdValues(ethPrice)

  expect(plan.balance.eth).toBe('50')
  expect(plan.balance.usd).toBe('60000')

  expect(plan.coverage.eth).toBe('50')
  expect(plan.coverage.usd).toBe('60000')

  expect(plan.availability.eth).toBe('100.005')
  expect(plan.availability.usd).toBe('120006')
})
