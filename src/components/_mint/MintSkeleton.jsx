import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { Wrapper, Cell, SkeletonIcon, Flex } from './styled'

const MintSkeleton = () => (
  <Wrapper>
    <Flex>
      <Skeleton animation={false} variant="circle" width={40} height={40} />
      <Cell>
        <Skeleton animation={false} variant="text" width={120} height={20} />
        <Skeleton animation={false} variant="text" width={170} height={20} />
      </Cell>
    </Flex>
    <Cell>
      <Skeleton animation={false} variant="text" width={70} height={20} />
      <Skeleton animation={false} variant="text" width={110} height={20} />
    </Cell>
    <SkeletonIcon>
      <Skeleton animation={false} variant="circle" width={20} height={20} />
    </SkeletonIcon>
  </Wrapper>
)

export default MintSkeleton
