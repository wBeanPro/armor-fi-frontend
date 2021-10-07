import React from 'react'
import { Wrapper, Cell, SkeletonIcon, Flex, Skeleton } from './styled'

const MintSkeleton = ({ animation }) => (
  <Wrapper>
    <Flex>
      <Skeleton
        animation={animation ? 'pulse' : false}
        variant="circle"
        width={40}
        height={40}
      />
      <Cell>
        <Skeleton
          animation={animation ? 'pulse' : false}
          variant="text"
          width={120}
          height={20}
        />
        <Skeleton
          animation={animation ? 'pulse' : false}
          variant="text"
          width={170}
          height={20}
        />
      </Cell>
    </Flex>
    <Cell>
      <Skeleton
        animation={animation ? 'pulse' : false}
        variant="text"
        width={70}
        height={20}
      />
      <Skeleton
        animation={animation ? 'pulse' : false}
        variant="text"
        width={110}
        height={20}
      />
    </Cell>
    <SkeletonIcon>
      <Skeleton
        animation={animation ? 'pulse' : false}
        variant="circle"
        width={20}
        height={20}
      />
    </SkeletonIcon>
  </Wrapper>
)

export default MintSkeleton
