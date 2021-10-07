import config from '../config'
import ReferralSystem from './referralSystem'

test('it should return null if no referrer is set', () => {
  const referralSystem = new ReferralSystem(new LocalStorageMock(), config)
  expect(referralSystem.getReferrer()).toBe(null)
})

test('it should return null if referrer is not an address', () => {
  const referralSystem = new ReferralSystem(new LocalStorageMock(), config)
  referralSystem.setReferrer('test')
  expect(referralSystem.getReferrer()).toBe(null)
})

test('it should properly store 0x0000000000000000000000000000000000000000 into the local storage', () => {
  const referralSystem = new ReferralSystem(new LocalStorageMock(), config)
  referralSystem.setReferrer('0x0000000000000000000000000000000000000001')
  expect(referralSystem.getReferrer()).toBe(
    '0x0000000000000000000000000000000000000001'
  )
})

test('it should properly return an empty referrer for address 0x0000000000000000000000000000000000000000', async () => {
  const referralSystem = new ReferralSystem(new LocalStorageMock(), config)
  await referralSystem
    .getReferrer('0x0000000000000000000000000000000000000000')
    .then((res) => {
      let referrer = res.referrer
      expect(referrer).toBe('')
    })
    .catch((err) => {
      console.error(err)
    })
})

test('it should properly set referrer to the api and return the correct value', async () => {
  const referralSystem = new ReferralSystem(new LocalStorageMock(), config)
  await referralSystem
    .setReferrer(
      '0x0000000000000000000000000000000000000001',
      '0x0000000000000000000000000000000000000002'
    )
    .then((res) => {
      let referrer = res.referrer
      expect(referrer).toBe('0x0000000000000000000000000000000000000002')
    })
    .catch((err) => {
      console.error(err)
    })

  await referralSystem
    .getReferrer('0x0000000000000000000000000000000000000001')
    .then((res) => {
      let referrer = res.referrer
      expect(referrer).toBe('0x0000000000000000000000000000000000000002')
    })
    .catch((err) => {
      console.error(err)
    })
})

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = String(value)
  }

  removeItem(key) {
    delete this.store[key]
  }
}
