import { StakeManagerEvents } from './stakeManagerEvents'
import moment from 'moment'
import * as BN from 'bn.js'
import { commas, logoMapper } from '../../helpers'

class StakeManagerContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(StakeManagerEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case StakeManagerEvents.GetStakedNFTs:
        await this.getStakedNFTs(payload)
        break
      case StakeManagerEvents.StakeNFT:
        await this.stakeNFT(payload)
        break
      case StakeManagerEvents.StakeAllNFTs:
        await this.stakeAllNFTs(payload)
        break
      case StakeManagerEvents.WithdrawNFT:
        await this.withdrawNFT(payload)
        break
      case StakeManagerEvents.BatchStakeNFTs:
        await this.batchStakeNFTs(payload)
        break
      case StakeManagerEvents.GetAllowedCover:
        await this.getAllowedCover(payload)
        break
      case StakeManagerEvents.GetTotalStakedAmount:
        await this.getTotalStakedAmount(payload)
        break
      case StakeManagerEvents.GetPendingWithdrawals:
        await this.getPendingWithdrawals(payload)
        break
      case StakeManagerEvents.GetTotalAvailable:
        await this.getTotalAvailable(payload)
        break
      default:
        break
    }
  }

  async getStakedNFTs(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }

    await this._handleGetStakedNFTs(account)
      .then(async (stakedNFTs) => {
        await this._calculateRewardsAndAPY(stakedNFTs)
          .then((data) => {
            this.service.setStore({ StakeManager_StakedNFTs: data })
            this.service.emit(StakeManagerEvents.StakedNFTsReturned)
          })
          .catch((err) => this.service.emitError(err))
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleGetStakedNFTs(account) {
    return new Promise(async (resolve, reject) => {
      try {
        const nmContracts =
          await this.service.store.fetchNexusMutualContractsFromApi()

        const stakedNFTs = []
        const web3 = await this.service.getWeb3()
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )
        const rewardContract = this.service.makeContract(
          web3,
          this.service.config.rewardManager.abi,
          this.service.config.rewardManager.address
        )
        const arNftContract = this.service.makeContract(
          web3,
          this.service.config.arNFT.abi,
          this.service.config.arNFT.address
        )

        await contract
          .getPastEvents('StakedNFT', {
            fromBlock: '11755842',
          })
          .then((events) => {
            events.forEach((event) => {
              let result = event.returnValues
              if (result && result.user) {
                if (
                  result.user.toLowerCase() === account.address.toLowerCase()
                ) {
                  let startingTime = moment(result.timestamp * 1000)
                  let expirationTime = startingTime.add(
                    result.coverPeriod,
                    'days'
                  )
                  let blockNumber = web3.utils.hexToNumber(event.blockNumber)
                  let protocol = nmContracts[result.protocol.toLowerCase()]

                  if (protocol === undefined) {
                    protocol = {
                      dateAdded: '2020-08-13',
                      github: 'https://github.com/yam-finance/yam-protocol',
                      logo: 'https://api.nexusmutual.io/coverables/images/yam.png',
                      messari: '',
                      name: 'aave',
                      type: 'contract',
                    }
                  }

                  let name = protocol['name'].toLowerCase().replace(' ', '')
                  let cost = web3.utils.fromWei(result.secondPrice, 'ether')

                  let stakedNft = {
                    logo: logoMapper(protocol['name']),
                    name: protocol['name'],
                    address: result.protocol,
                    link: '#',
                    isPendingWithdrawal: false,
                    blockNumber: blockNumber,
                    startingTime: startingTime,
                    startingTimeRaw: result.timestamp,
                    expirationTime: expirationTime,
                    perSecondPrice: result.secondPrice,
                    coverPeriod: result.coverPeriod,
                    tokenId: result.nftId,
                    reward: 0,
                    rewardsAdded: 0,
                    balanceAdded: 0,
                    info: [
                      {
                        value: web3.utils.fromWei(result.sumAssured, 'ether'),
                        symbol: 'ETH',
                      },
                      {
                        value: moment().isAfter(expirationTime)
                          ? 'EXPIRED'
                          : expirationTime.format('YYYY-MM-DD'),
                      },
                      { value: cost, symbol: 'ETH' },
                      { value: '0', symbol: 'ETH' },
                      { value: '17%', symbol: 'ETH' },
                    ],
                  }

                  let stakedIndex = stakedNFTs.findIndex(
                    (s) => s.tokenId === result.nftId
                  )
                  if (stakedIndex < 0) {
                    stakedNFTs.push(stakedNft)
                  } else {
                    stakedNFTs[stakedIndex] = stakedNft
                  }
                }
              }
            })
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })

        let index = stakedNFTs.length - 1
        while (index >= 0) {
          if (stakedNFTs[index]) {
            const tokenData = await arNftContract.methods
              .getToken(stakedNFTs[index].tokenId)
              .call({ from: account.address })

            stakedNFTs[index].expirationTime = tokenData.validUntil
            let expirationTime = moment(tokenData.validUntil * 1000)
            stakedNFTs[index].info[1].value = moment().isAfter(expirationTime)
              ? 'EXPIRED'
              : expirationTime.format('YYYY-MM-DD')
          }
          index -= 1
        }
        //
        // await contract
        //   .getPastEvents('RemovedNFT', {
        //     fromBlock: '11755842',
        //   })
        //   .then((events) => {
        //     events.forEach((event) => {
        //       let result = event.returnValues
        //       if (result && result.user) {
        //         if (
        //           result.user.toLowerCase() === account.address.toLowerCase()
        //         ) {
        //           let index = stakedNFTs.length - 1
        //           while (index >= 0) {
        //             let withdraw = moment(result.timestamp * 1000)
        //
        //             if (
        //               stakedNFTs[index].tokenId === result.nftId &&
        //               stakedNFTs[index].startingTimeRaw <= result.timestamp
        //             ) {
        //               console.log('removing', result.timestamp, stakedNFTs[index])
        //               //stakedNFTs.splice(index, 1)
        //             }
        //             index -= 1
        //           }
        //         }
        //       }
        //     })
        //   })
        //   .catch((err) => {
        //     console.error(err)
        //     reject(err)
        //   })
        //
        await contract
          .getPastEvents('WithdrawRequest', {
            fromBlock: '11755842',
          })
          .then((events) => {
            events.forEach((event) => {
              let result = event.returnValues
              if (result && result.user) {
                if (
                  result.user.toLowerCase() === account.address.toLowerCase()
                ) {
                  let index = stakedNFTs.length - 1
                  while (index >= 0) {
                    let withdrawTimestamp = moment(
                      result.withdrawTimestamp * 1000
                    )
                    if (stakedNFTs[index].tokenId === result.nftId) {
                      stakedNFTs[index].isPendingWithdrawal = true
                    }
                    index -= 1
                  }
                }
              }
            })
          })
          .catch((err) => {
            console.error(err)
            reject(err)
          })

        index = stakedNFTs.length - 1
        while (index >= 0) {
          if (stakedNFTs[index]) {
            const pendingWithdrawals = await contract.methods
              .pendingWithdrawals(stakedNFTs[index].tokenId)
              .call({ from: account.address })

            if (
              pendingWithdrawals == 0 &&
              stakedNFTs[index].isPendingWithdrawal
            ) {
              stakedNFTs.splice(index, 1)
            }
          }
          index -= 1
        }

        resolve(stakedNFTs)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async stakeNFT(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId } = payload.content

    let isApproved = await this.service.contracts.arNFT.getIsApprovedForAll({
      content: {},
    })

    if (!isApproved) {
      await this.service.contracts.arNFT
        .setApprovalForAll({
          content: {
            toAddress: this.service.config.stakeManager.address,
            isApproved: true,
          },
        })
        .catch((err) => this.service.emitError(err))
    }

    // alerts the front end that we can move to the next modal screen
    this.service.emit(StakeManagerEvents.ApproveCompleted, true)

    await this._handleStakeNFT(account, nftId)
      .then((data) => {
        this.service.emit(StakeManagerEvents.StakeNFTCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleStakeNFT(account, nftId) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        await contract.methods
          .stakeNft(nftId)
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

  async stakeAllNFTs(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftIds } = payload.content

    let isApproved = await this.service.contracts.arNFT.getIsApprovedForAll({
      content: {},
    })

    if (!isApproved) {
      await this.service.contracts.arNFT
        .setApprovalForAll({
          content: {
            toAddress: this.service.config.stakeManager.address,
            isApproved: true,
          },
        })
        .catch((err) => this.service.emitError(err))
    }

    this.service.emit(StakeManagerEvents.SetApprovalForAllCompleted, true)

    await this._handleStakeAllNFTs(account, nftIds)
      .then((data) => {
        this.service.emit(StakeManagerEvents.StakeAllNFTsCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleStakeAllNFTs(account, nftIds) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        await contract.methods
          .batchStakeNft(nftIds)
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

  async withdrawNFT(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId } = payload.content

    await this._handleWithdrawNFT(account, nftId)
      .then((data) => {
        this.service.emit(StakeManagerEvents.WithdrawNFTCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleWithdrawNFT(account, nftId) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        await contract.methods
          .withdrawNft(nftId)
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

  async batchStakeNFTs(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftIds } = payload.content

    await this._handleBatchStakeNFTs(account, nftIds)
      .then((data) => {
        this.service.emit(StakeManagerEvents.BatchStakeNFTsCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleBatchStakeNFTs(account, nftIds, callback) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        await contract.methods
          .batchStakeNft(nftIds)
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

  async _calculateRewardsAndAPY(plans) {
    return new Promise(async (resolve, reject) => {
      try {
        const account = this.service.getAccount()
        if (!account || !account.address) {
          return false
        }
        const web3 = await this.service.getWeb3()
        const BN = web3.utils.BN

        for (let i = 0; i < plans.length; i++) {
          let nftReward = 0
          if (!moment().isAfter(plans[i].expirationTime)) {
            let rewards =
              await this.service.contracts.rewardManager.getRewardsAddedAfterBlock(
                { content: { block: plans[i].blockNumber } }
              )

            rewards.forEach((reward) => {
              let nftRewardMultiplier =
                (Math.floor(Date.now() / 1000) - plans[i].startingTimeRaw) /
                (7 * 86400)

              nftReward +=
                (parseFloat(plans[i].perSecondPrice) /
                  parseFloat(reward.totalSupply)) *
                parseFloat(reward.reward) *
                parseFloat(nftRewardMultiplier)
            })

            let nftRewardBN = new BN(nftReward.toString()).toString()

            plans[i].reward = parseFloat(
              web3.utils.fromWei(nftRewardBN, 'ether')
            )
            plans[i].info[3] = {
              value: parseFloat(
                web3.utils.fromWei(nftRewardBN, 'ether')
              ).toFixed(4),
              symbol: 'ETH',
            }

            let token = await this.service.contracts.arNFT.getToken({
              content: { nftId: plans[i].tokenId },
            })

            // TODO: sometimes "token" is null, so handling that
            if (!token) continue

            let coverPrice = token['coverPrice']
            let validUntil = token['validUntil']

            let sinceStart =
              Math.floor(Date.now() / 1000) - plans[i].startingTimeRaw
            let fullReward = 0

            if (sinceStart <= 0) {
              fullReward = plans[i].reward
            } else {
              let fullTime = validUntil - plans[i].startingTimeRaw
              let rewardMultiplier = fullTime / sinceStart
              fullReward = plans[i].reward * rewardMultiplier
            }

            coverPrice = web3.utils.fromWei(coverPrice.toString(), 'ether')

            let apy =
              ((fullReward - parseFloat(coverPrice)) / parseFloat(coverPrice)) *
              100
            plans[i].info[2] = {
              value: parseFloat(coverPrice).toFixed(3),
              symbol: 'ETH',
            }
            plans[i].info[4] = {
              value: `${fullReward.toFixed(2)}`,
              symbol: 'ETH',
            }
          }
        }

        const sortedByExpired = plans.sort((x, y) => {
          return y.expirationTime - x.expirationTime
        })

        resolve(sortedByExpired)
      } catch (err) {
        reject(err)
      }
    })
  }

  async getAllowedCover(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { protocol, amount } = payload.content

    let response = await this._handleGetAllowedCover(
      account,
      protocol,
      amount
    ).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({
      StakeManager_AllowedCover: {
        protocol: protocol,
        amount: amount,
        allowedCover: response,
      },
    })
    this.service.emit(StakeManagerEvents.AllowedCoverReturned)

    return response
  }

  async _handleGetAllowedCover(account, protocol, amount) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        let allowedCover = await contract.methods
          .allowedCover(protocol, amount)
          .call({ from: account.address })

        resolve(allowedCover)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getTotalStakedAmount(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { protocol } = payload.content

    let response = await this._handleGetTotalStakedAmount(
      account,
      protocol
    ).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({
      StakeManager_TotalStakedAmount: {
        protocol: protocol,
        amount: response,
      },
    })
    this.service.emit(StakeManagerEvents.TotalStakedAmountReturned)

    return response
  }

  async _handleGetTotalStakedAmount(account, protocol) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        let totalStakedAmount = await contract.methods
          .totalStakedAmount(protocol)
          .call({ from: account.address })

        resolve(totalStakedAmount)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getTotalAvailable(payload) {
    const account = this.service.getAccount()
    const web3 = await this.service.getWeb3()
    if (!account || !account.address) {
      return false
    }
    const { protocols } = payload.content

    let response = await this._handleGetTotalAvailable(
      account,
      protocols
    ).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({
      StakeManager_TotalAvailable: {
        totals: response,
      },
    })
    this.service.emit(StakeManagerEvents.TotalAvailableReturned)

    return response
  }

  async _handleGetTotalAvailable(account, protocols) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        let totals = []
        let index = protocols.length - 1
        while (index >= 0) {
          let totalStakedAmount = await contract.methods
            .totalStakedAmount(protocols[index])
            .call({ from: account.address })

          let coverageLeft =
            await this.service.contracts.planManager._handleGetCoverageLeft(
              account,
              protocols[index]
            )

          let availablePercentage =
            (parseFloat(coverageLeft.toString()) /
              parseFloat(totalStakedAmount.toString())) *
            100

          totals.push({
            protocol: protocols[index],
            available: web3.utils.fromWei(coverageLeft, 'ether'),
            availablePercentage: availablePercentage,
          })

          index -= 1
        }

        resolve(totals)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }

  async getPendingWithdrawals(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId } = payload.content

    let response = await this._handleGetPendingWithdrawals(
      account,
      nftId
    ).catch((err) => {
      this.service.emitError(err)
      return null
    })

    this.service.setStore({
      StakeManager_PendingWithdrawals: { pending: response, nftId: nftId },
    })
    this.service.emit(StakeManagerEvents.PendingWithdrawalsReturned)

    return response
  }

  async _handleGetPendingWithdrawals(account, nftId) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.stakeManager.abi,
          this.service.config.stakeManager.address
        )

        let pendingWithdrawals = await contract.methods
          .pendingWithdrawals(nftId)
          .call({ from: account.address })

        resolve(pendingWithdrawals)
      } catch (e) {
        console.error(e)
        reject(e)
      }
    })
  }
}

export default StakeManagerContract
