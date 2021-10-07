import React from 'react'
import {
  ContractBox,
  ContractHeader,
  NameContainer,
  LogoContainer,
  BgGradient,
  CurrentRow,
  CurrentTitle,
  TotalRow,
  TotalContent,
  Buttons,
  LogoSkeleton,
  Flex,
  SpanTextContent,
  Skeleton,
} from './styled'

const skeletonData = {
  currentRow: [
    {
      content: 80,
      value: 30,
    },
    {
      content: 110,
      value: 40,
    },
    {
      content: 70,
      value: 40,
    },
    {
      content: 120,
      value: 40,
      last: true,
    },
  ],
  buttons: [
    {
      value: 80,
    },
    {
      value: 100,
    },
    {
      value: 80,
    },
    {
      value: 120,
    },
  ],
}

const SkeletonComponent = ({ animation }) => (
  <ContractBox>
    <ContractHeader>
      <NameContainer>
        <LogoContainer>
          <LogoSkeleton
            animation={animation ? 'pulse' : false}
            variant={'circle'}
            width={25}
            height={25}
          />
          <Skeleton
            animation={animation ? 'pulse' : false}
            variant={'text'}
            width={180}
            height={20}
          />
        </LogoContainer>
      </NameContainer>
      <Flex>
        <LogoSkeleton
          animation={animation ? 'pulse' : false}
          variant={'text'}
          width={140}
          height={20}
        />
        <Skeleton
          animation={animation ? 'pulse' : false}
          variant={'text'}
          width={120}
          height={20}
        />
      </Flex>
      <BgGradient />
    </ContractHeader>
    <CurrentRow>
      {skeletonData.currentRow.map(({ content, value, last }, i) => (
        <React.Fragment key={i}>
          {last ? null : (
            <CurrentTitle>
              <Skeleton
                animation={animation ? 'pulse' : false}
                variant={'text'}
                width={content}
                height={20}
              />
              <SpanTextContent>
                <Skeleton
                  animation={animation ? 'pulse' : false}
                  variant={'text'}
                  width={value}
                  height={20}
                />
              </SpanTextContent>
            </CurrentTitle>
          )}
        </React.Fragment>
      ))}
    </CurrentRow>
    <TotalRow>
      <TotalContent>
        {skeletonData.currentRow.map(({ content, value }, i) => (
          <CurrentTitle key={i}>
            <Skeleton
              animation={animation ? 'pulse' : false}
              variant={'text'}
              width={content}
              height={20}
            />
            <SpanTextContent>
              <Skeleton
                animation={animation ? 'pulse' : false}
                variant={'text'}
                width={value}
                height={20}
              />
            </SpanTextContent>
          </CurrentTitle>
        ))}
      </TotalContent>
      <BgGradient />
    </TotalRow>
    <Buttons>
      {skeletonData.buttons.map(({ value }, i) => (
        <Skeleton
          key={i}
          animation={animation ? 'pulse' : false}
          variant={'text'}
          width={value}
          height={35}
        />
      ))}
    </Buttons>
  </ContractBox>
)

export default SkeletonComponent
