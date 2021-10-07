import { isAddress } from 'web3-utils'
import axios from 'axios'

export default class ReferralSystem {
  constructor(config, storage) {
    this.storage = storage
    this.config = config
  }

  getCodeFromStorage() {
    return [
      this.storage.getItem('referral_code'),
      this.storage.getItem('tracking'),
    ]
  }
  clearCodeFromStorage() {
    this.storage.removeItem('referral_code')
    this.storage.removeItem('tracking')
  }
  setCodeInStorage(code, tracking) {
    this.storage.setItem('referral_code', code)
    this.storage.setItem('tracking', tracking)
  }

  getReferrer(address) {
    if (!isAddress(address)) {
      return null
    }

    return new Promise(async (resolve, reject) => {
      await axios
        .get(`${this.config.backendUrl}/api/referrer?address=${address}`)
        .then((res) => resolve(res.data.address))
        .catch((err) => reject(err))
    })
  }

  getReferralCode(address) {
    if (!isAddress(address)) {
      return ''
    }

    return new Promise(async (resolve, reject) => {
      await axios
        .get(`${this.config.backendUrl}/api/referrer/code?address=${address}`)
        .then((res) => resolve(res.data.code))
        .catch((err) => reject(err))
    })
  }

  setReferrer(code, address, tracking) {
    if (!isAddress(address)) {
      return null
    }

    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          `${this.config.backendUrl}/api/referrer/set?code=${code}&address=${address}&tracking=${tracking}`
        )
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  }
}
