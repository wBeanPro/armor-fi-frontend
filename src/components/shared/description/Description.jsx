import React from 'react'
import { Text } from './styled'

const Description = ({ text, isBlured }) => <Text blur={isBlured}>{text}</Text>

export default Description
