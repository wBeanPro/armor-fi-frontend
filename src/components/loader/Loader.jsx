import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { LoadContainer } from './styled'

const Loader = () => (
  <LoadContainer>
    <LinearProgress />
  </LoadContainer>
)

export default Loader
