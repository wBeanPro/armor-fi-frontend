import { ArNFTEvents } from './arNFTEvents'
import { isEthArnft, isDaiArnft } from '../../helpers'
import { map as asyncMap } from 'async'
import moment from 'moment'

class ArNFTContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(ArNFTEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case ArNFTEvents.GetToken:
        await this.getToken(payload)
        break
      case ArNFTEvents.GetUnStakedTokens:
        await this.getUnStakedTokens(payload)
        break
      case ArNFTEvents.GetTokens:
        await this.getTokens(payload)
        break
      case ArNFTEvents.GetBalance:
        await this.getBalance(payload)
        break
      case ArNFTEvents.GetApproved:
        await this.getApproved(payload)
        break
      case ArNFTEvents.Approve:
        await this.approve(payload)
        break
      case ArNFTEvents.SetApprovalForAll:
        await this.setApprovalForAll(payload)
        break
      case ArNFTEvents.GetIsApprovalForAll:
        await this.getIsApprovedForAll(payload)
        break
      case ArNFTEvents.Claim:
        await this.claim(payload)
        break
    }
  }

  async getToken(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId } = payload.content

    let response = await this._handleGetToken(account, nftId).catch((err) => {
      this.service.emitError(err)
      return null
    })
    this.service.setStore({ ArNFT_Token: response })
    this.service.emit(ArNFTEvents.TokenReturned)

    return response
  }

  async _handleGetToken(account, nftId) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )

        let token = await contract.methods
          .getToken(nftId)
          .call({ from: account.address })

        resolve(token)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getBalance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return 0
    }

    let response = await this._handleGetBalance(account).catch((err) => {
      this.service.emitError(err)
      return 0
    })
    this.service.setStore({ ArNFT_Balance: response })
    this.service.emit(ArNFTEvents.BalanceReturned)

    return response
  }

  async _handleGetBalance(account) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )

        let balance = await contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })

        resolve(balance)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getTokens(payload) {
    try {
      let tokens = []

      const account = this.service.getAccount()
      if (!account || !account.address) {
        return false
      }

      let _tokens = await this._handleGetTokens(account).catch((err) => {
        this.service.emitError(err)
        return null
      })
      this.service.setStore({ ArNFT_Tokens: _tokens })
      this.service.emit(ArNFTEvents.TokensReturned)

      return tokens
    } catch (e) {
      this.service.emitError(e.toString())
    }
  }

  async _handleGetTokens(account) {
    const web3 = await this.service.getWeb3()
    let self = this
    return new Promise(async (resolve, reject) => {
      try {
        let tokens = []
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )
        const stakeContract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        const contractsForLookUp = this.service.getStore('contracts')

        let balance = await contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })

        if (parseInt(balance) === 0) {
          resolve([])
        }

        let arr = Array.from(Array(parseInt(balance)).keys())
        const resultArr = await (async () => {
          return new Promise((resolve, reject) => {
            asyncMap(
              arr,
              async (index, callback, c) => {
                try {
                  // get token index
                  const tokenIndex = await contract.methods
                    .tokenOfOwnerByIndex(account.address, index)
                    .call({ from: account.address })

                  // populate token information
                  const token = await self.getToken({
                    content: { nftId: tokenIndex },
                  })

                  let validUntil = moment(token.validUntil * 1000)
                  let contractDetails = contractsForLookUp.filter(
                    (contract) => {
                      return contract.address === token.scAddress
                    }
                  )

                  const nftOwnerAddress = await stakeContract.methods
                    .nftOwners(tokenIndex)
                    .call({ from: account.address })

                  // only return unStaked
                  let finalToken = {
                    tokenIndex: tokenIndex,
                    stakedOwner: nftOwnerAddress,
                    token: token,
                    logo:
                      contractDetails.length > 0
                        ? contractDetails[0].logo
                        : 'eth.png',
                    name:
                      contractDetails.length > 0 ? contractDetails[0].name : '',
                    link: '#',
                    info: [
                      { value: token.sumAssured, symbol: 'ETH' },
                      {
                        value: moment().isAfter(validUntil)
                          ? 'EXPIRED'
                          : validUntil.format('YYYY-MM-DD'),
                      },
                      {
                        value: parseFloat(
                          web3.utils.fromWei(token.coverPrice, 'ether')
                        ).toFixed(3),
                        symbol: 'ETH',
                      },
                      { value: '-' },
                      { value: '-' },
                    ],
                  }

                  if (callback) {
                    callback(null, finalToken)
                  } else {
                    return finalToken
                  }
                } catch (ex) {
                  console.log({ ex })
                  return null
                }
              },
              (err, data) => {
                if (err) reject(err)
                resolve(data)
              }
            )
          })
        })()
        resolve(resultArr)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getUnStakedTokens(payload) {
    try {
      let tokens = []

      const account = this.service.getAccount()
      if (!account || !account.address) {
        return false
      }

      let _tokens = await this._handleGetUnStakedTokens(account).catch(
        (err) => {
          this.service.emitError(err)
          return null
        }
      )
      this.service.setStore({ ArNFT_UnStakedTokens: _tokens })
      this.service.emit(ArNFTEvents.UnStakedTokensReturned)

      return tokens
    } catch (e) {
      this.service.emitError(e.toString())
    }
  }

  async _handleGetUnStakedTokens(account) {
    const web3 = await this.service.getWeb3()
    let self = this
    return new Promise(async (resolve, reject) => {
      try {
        let tokens = []
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )
        const stakeContract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        const contractsForLookUp = this.service.getStore('contracts')

        let balance = await contract.methods
          .balanceOf(account.address)
          .call({ from: account.address })

        if (parseInt(balance) === 0) {
          resolve([])
        }

        let arr = Array.from(Array(parseInt(balance)).keys())
        const resultArr = await (async () => {
          return new Promise((resolve, reject) => {
            asyncMap(
              arr,
              async (index, callback, c) => {
                try {
                  // get token index
                  const tokenIndex = await contract.methods
                    .tokenOfOwnerByIndex(account.address, index)
                    .call({ from: account.address })

                  // populate token information
                  const token = await self.getToken({
                    content: { nftId: tokenIndex },
                  })

                  let validUntil = moment(token.validUntil * 1000)
                  let contractDetails = contractsForLookUp.filter(
                    (contract) => {
                      return contract.address === token.scAddress
                    }
                  )

                  const nftOwnerAddress = await stakeContract.methods
                    .nftOwners(tokenIndex)
                    .call({ from: account.address })

                  const symbol = isEthArnft(token.currencyCode)
                    ? 'ETH'
                    : isDaiArnft(token.currencyCode)
                    ? 'DAI'
                    : null

                  // only return unStaked
                  if (
                    nftOwnerAddress ===
                    '0x0000000000000000000000000000000000000000'
                  ) {
                    let finalToken = {
                      tokenIndex: tokenIndex,
                      stakedOwner: nftOwnerAddress,
                      address: token.scAddress,
                      logo:
                        contractDetails.length > 0
                          ? contractDetails[0].logo
                          : 'eth.png',
                      name:
                        contractDetails.length > 0
                          ? contractDetails[0].name
                          : '',
                      link: '#',
                      info: [
                        { value: token.sumAssured, symbol },
                        {
                          value: moment().isAfter(validUntil)
                            ? 'EXPIRED'
                            : validUntil.format('YYYY-MM-DD'),
                        },
                        {
                          value: parseFloat(
                            web3.utils.fromWei(token.coverPrice, 'ether')
                          ).toFixed(3),
                          symbol,
                        },
                        { value: '0' },
                        { value: '0' },
                      ],
                      symbol,
                      validUntil: validUntil.unix(),
                    }

                    if (callback) {
                      callback(null, finalToken)
                    } else {
                      return finalToken
                    }
                  } else {
                    callback(null, null)
                  }
                } catch (ex) {
                  return null
                }
              },
              (err, data) => {
                if (err) reject(err)
                const sortedByExpired = data.sort((x, y) => {
                  return y.validUntil - x.validUntil
                })
                resolve(sortedByExpired)
              }
            )
          })
        })()
        resolve(resultArr)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async isApproved(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId, toAddress } = payload.content

    let response = await this._handleGetApproved(account, nftId).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )

    if (response.toLowerCase() === toAddress.toLowerCase()) {
      return true
    }

    return false
  }

  async getApproved(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId } = payload.content

    let response = await this._handleGetApproved(account, nftId).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )
    this.service.setStore({ ArNFT_Balance: response })
    this.service.emit(ArNFTEvents.GetApprovedReturned)

    return response
  }

  async _handleGetApproved(account, nftId) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )

        let operator = await contract.methods
          .getApproved(nftId)
          .call({ from: account.address })

        resolve(operator)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async approve(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId, toAddress } = payload.content

    let response = await this._handleApprove(account, nftId, toAddress).catch(
      (err) => this.service.emitError(err)
    )

    this.service.emit(ArNFTEvents.ApproveCompleted, response)
    return response
  }

  async _handleApprove(account, nftId, toAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )

        await contract.methods
          .approve(toAddress, nftId)
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
          })
          .once('transactionHash', (hash) =>
            this.service.handleTransactionHash(hash)
          )
          .once('receipt', (receipt) => this.service.handleReceipt(receipt))
          .on('confirmation', (confirmationNumber, receipt) =>
            this.service.handleConfirmation(confirmationNumber, receipt)
          )
          .on('error', (error) => {
            this.service.handleError(error)
            reject(error)
          })
          .then((data) => resolve(data))
      } catch (e) {
        reject(e)
      }
    })
  }

  async setApprovalForAll(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { toAddress, isApproved } = payload.content

    let response = await this._handleSetApprovalForAll(
      account,
      toAddress,
      isApproved
    ).catch((err) => this.service.emitError(err))

    this.service.emit(ArNFTEvents.SetApprovalForAllCompleted, response)
    return response
  }

  async _handleSetApprovalForAll(account, toAddress, isApproved) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )

        await contract.methods
          .setApprovalForAll(toAddress, isApproved)
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
          })
          .once('transactionHash', (hash) =>
            this.service.handleTransactionHash(hash)
          )
          .once('receipt', (receipt) => this.service.handleReceipt(receipt))
          .on('confirmation', (confirmationNumber, receipt) =>
            this.service.handleConfirmation(confirmationNumber, receipt)
          )
          .on('error', (error) => {
            this.service.handleError(error)
            reject(error)
          })
          .then((data) => resolve(data))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getIsApprovedForAll(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    let response = await this._handleGetIsApprovedForAll(account).catch(
      (err) => {
        this.service.emitError(err)
        return null
      }
    )
    this.service.setStore({ ArNFT_IsApprovedForAll: response })
    this.service.emit(ArNFTEvents.GetIsApprovalForAllReturned)

    return response
  }

  async _handleGetIsApprovedForAll(account, nftId) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )

        let isApproved = await contract.methods
          .isApprovedForAll(
            account.address,
            this.service.config.stakeManager.address
          )
          .call({ from: account.address })

        resolve(isApproved)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async claim(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { coverId } = payload.content

    const response = await this._handleClaim(account, coverId).catch((err) =>
      this.service.emitError(err)
    )

    this.service.emit(ArNFTEvents.ClaimCompleted, response)
    return response
  }

  async _handleClaim(account, coverId) {
    console.log({ account, coverId })
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )

        await contract.methods
          .submitClaim(coverId)
          .send({
            from: account.address,
            gasPrice: web3.utils.toWei(gasPrice, 'gwei'),
          })
          .once('transactionHash', (hash) =>
            this.service.handleTransactionHash(hash)
          )
          .once('receipt', (receipt) => this.service.handleReceipt(receipt))
          .on('confirmation', (confirmationNumber, receipt) =>
            this.service.handleConfirmation(confirmationNumber, receipt)
          )
          .on('error', (error) => {
            this.service.handleError(error)
            reject(error)
          })
          .then((data) => resolve(data))
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default ArNFTContract
