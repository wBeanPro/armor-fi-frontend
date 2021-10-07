import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import {
  CoverCard,
  AssetSummary,
  AssetsWrapper,
  ContentBox,
  HeadingName,
  HeadingWrapper,
  Heading,
  CircleSkeleton,
  Action,
  SkeletonSpacer,
} from './styled'

const DashboardSkeleton = () => (
  <CoverCard skeleton>
    <AssetSummary>
      <AssetsWrapper>
        <ContentBox>
          <HeadingName>
            <CircleSkeleton
              animation={false}
              variant="circle"
              width={40}
              height={40}
            />
            <div>
              <Skeleton
                animation={false}
                variant="text"
                width={75}
                height={20}
              />
              <Skeleton
                animation={false}
                variant="text"
                width={120}
                height={20}
              />
            </div>
          </HeadingName>
          <HeadingWrapper>
            <Heading skeleton>
              <SkeletonSpacer
                animation={false}
                variant="text"
                width={90}
                height={20}
              />
              <SkeletonSpacer
                animation={false}
                variant="text"
                width={110}
                height={20}
              />
            </Heading>
            <Heading skeleton>
              <SkeletonSpacer
                animation={false}
                variant="text"
                width={80}
                height={20}
              />
              <SkeletonSpacer
                animation={false}
                variant="text"
                width={90}
                height={20}
              />
            </Heading>
          </HeadingWrapper>
        </ContentBox>
        <Action>
          <Skeleton animation={false} variant="text" width={70} height={45} />
          <Skeleton animation={false} variant="text" width={70} height={45} />
        </Action>
      </AssetsWrapper>
    </AssetSummary>
  </CoverCard>
)

export default DashboardSkeleton
