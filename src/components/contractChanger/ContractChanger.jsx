import React from 'react'

import Store from '../../stores/store'
const store = Store.store

const ContractChanger = () => {
  const currentNftContract = store.getStore('currentNftContract')
  return (
    <div>
      <div>
        <p>
          Current NFT contract: <b>{currentNftContract}</b>
        </p>

        {currentNftContract === 'arNFT' && (
          <button
            onClick={() => {
              localStorage.setItem('armor-ynft', true)
              window.location.reload()
            }}
          >
            Change to <b>yNFT</b>
          </button>
        )}

        {currentNftContract === 'yNFT' && (
          <button
            onClick={() => {
              localStorage.removeItem('armor-ynft')
              window.location.reload()
            }}
          >
            Change to <b>arNFT</b>
          </button>
        )}
      </div>
    </div>
  )
}

export default ContractChanger
