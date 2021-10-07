import React from 'react'
import { SpinnerContainer, Spinner } from './styled'

const LoadingSpinner = ({ color = '#3f51b5' }) => (
  <SpinnerContainer>
    <Spinner fill={color} />
  </SpinnerContainer>
)

export default LoadingSpinner
