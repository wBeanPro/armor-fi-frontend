import React from 'react'
import { uglifyAddress } from '../../../helpers'
import { Text } from './styled'

const Address = ({ text, x = 10, y = 8 }) => {
  return (
    <Text
      onClick={() =>
        window.open(`https://etherscan.io/address/${text}`, '_blank')
      }
    >
      {uglifyAddress(text, x, y)}
    </Text>
  )
}

export default Address
