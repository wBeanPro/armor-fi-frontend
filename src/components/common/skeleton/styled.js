import styled from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'

export const SkeletonBox = styled(Skeleton)`
  max-height: ${(p) => p.height}px;
  height: 100%;
  border-radius: 16px;
  transform: none;
`
