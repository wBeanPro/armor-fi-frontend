import { ClaimManagerEvents } from './claimManagerEvents'

class ClaimManagerContract {
  constructor(service) {
    this.service = service
  }

  shouldDispatch(payload) {
    return this.service.shouldDispatch(ClaimManagerEvents, payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case ClaimManagerEvents.SubmitNFT:
        await this.submitNft(payload)
        break
      case ClaimManagerEvents.RedeemNFT:
        await this.redeemNft(payload)
        break
      case ClaimManagerEvents.RedeemClaim:
        await this.redeemNft(payload)
        break
      default:
        break
    }
  }

  async submitNft(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId, protocol, hackTime } = payload.content

    await this._handleSubmitNft(account, nftId, protocol, hackTime)
      .then((data) => {
        this.service.emit(ClaimManagerEvents.SubmitNFTCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleSubmitNft(account, nftId, protocol, hackTime) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.claimManager.abi,
          this.service.config.claimManager.address
        )

        await contract.methods
          .submitNft(nftId, protocol, hackTime)
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

  async redeemNft(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { nftId } = payload.content

    await this._handleRedeemNft(account, nftId)
      .then((data) => {
        this.service.emit(ClaimManagerEvents.RedeemNFTCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleRedeemNft(account, nftId) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.claimManager.abi,
          this.service.config.claimManager.address
        )

        await contract.methods
          .redeemNft(nftId)
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

  async redeemClaim(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return false
    }
    const { protocol, hackTime } = payload.content

    await this._handleRedeemClaim(account, protocol, hackTime)
      .then((data) => {
        this.service.emit(ClaimManagerEvents.RedeemClaimCompleted, data)
      })
      .catch((err) => this.service.emitError(err))
  }

  async _handleRedeemClaim(account, protocol, hackTime) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.claimManager.abi,
          this.service.config.claimManager.address
        )

        await contract.methods
          .redeemClaim(protocol, hackTime)
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

export default ClaimManagerContract
