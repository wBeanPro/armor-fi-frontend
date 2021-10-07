import { countDecimals } from './index'

const { arNxmAPY } = require('./index')

test('it should get the correct apy', () => {
  Date.now = jest.fn().mockReturnValue(new Date('2021-02-25T12:33:37.000Z'))

  const conversion = 1.028
  const apy = arNxmAPY(conversion)
  expect(apy).toBeGreaterThan(30)
})

test('it should count decimals', () => {
  let decimals = countDecimals(0.0036708545744652855)
  expect(decimals).toBe(19)

  decimals = countDecimals(0.2141242)
  expect(decimals).toBe(7)

  decimals = countDecimals(2)
  expect(decimals).toBe(0)

  decimals = countDecimals(80)
  expect(decimals).toBe(0)

  decimals = countDecimals(0)
  expect(decimals).toBe(0)
})
