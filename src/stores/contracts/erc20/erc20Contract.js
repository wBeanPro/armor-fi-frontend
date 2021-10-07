import { Erc20Events } from './erc20Events'
import { ArNXM_ETH_1inch_TokenEvents } from '../arNXM_ETH_1inch/arNXM_ETH_1inch_TokenEvents'
import * as BN from 'bn.js'

class Erc20Contract {
  constructor(service, prefix, tokenAddress) {
    this.service = service
    this.prefix = prefix
    this.tokenAddress = tokenAddress
  }

  shouldDispatch(payload) {
    // change IbcoEvents to the contracts Events (ie: PlanManagerEvents)
    return this.service.shouldDispatch(Erc20Events(this.prefix), payload)
  }

  async dispatch(payload) {
    switch (payload.type) {
      case `${this.prefix}.GetBalance`:
        await this.getBalance(payload)
        break
      case `${this.prefix}.Approve`:
        await this.approve(payload)
        break
    }
  }

  async getBalance(payload) {
    const account = this.service.getAccount()
    if (!account || !account.address) {
      return '0'
    }

    let address = account.address
    if (payload != null && payload.content != null && payload.content.address) {
      address = payload.content.address
    }

    let response = await this._getBalance(account, address).catch((err) => {
      this.service.emitError(err)
      return '0'
    })

    this.service.setStore({
      [`${this.prefix}_Balance`]: response,
    })
    this.service.emit(Erc20Events(this.prefix).BalanceReturned, response)

    return response
  }
  async _getBalance(account, address) {
    const web3 = await this.service.getWeb3()
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.service.makeContract(
          web3,
          this.service.config.erc20.abi,
          this.tokenAddress
        )

        let balance = await contract.methods
          .balanceOf(address)
          .call({ from: account.address })

        resolve(balance)
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
    const { amount, toAddress } = payload.content

    let response = await this._handleApprove(account, amount, toAddress).catch(
      (err) => this.service.emitError(err)
    )

    this.service.emit(Erc20Events(this.prefix).ApproveCompleted, response)

    return response
  }

  async _handleApprove(account, amount, toAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const web3 = await this.service.getWeb3()
        const gasPrice = await this.service.getGasPrice()
        const contract = this.service.makeContract(
          web3,
          this.service.config.erc20.abi,
          this.tokenAddress
        )

        const allowance = await contract.methods
          .allowance(account.address, toAddress)
          .call({ from: account.address })

        if (new BN(amount).lt(new BN(allowance))) {
          return resolve()
        }

        const infiniteAmount = web3.utils
          .toBN(
            '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
          )
          .toString()

        await contract.methods
          .approve(toAddress, infiniteAmount)
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

export default Erc20Contract
