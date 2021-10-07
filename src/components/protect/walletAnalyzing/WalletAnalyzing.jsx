import React from 'react'
import { withTranslation } from 'react-i18next'
import Skeleton from '../../common/skeleton/Skeleton'
import NewSearchIcon from '../../icons/NewSearchIcon'
import { withTheme } from 'styled-components'

import {
  AnalyzingBox,
  SkeletonBox,
  Title,
  CenterContent,
  SkipButton,
} from './styled'

const WalletAnalyzing = ({ t, theme, text, handleSkip }) => {
  const { colors } = theme

  return (
    <>
      <AnalyzingBox>
        <CenterContent>
          <NewSearchIcon color={colors.activeSearch} />
          <Title>{text || t('Protect.WalletAnalyzing.Text')}</Title>
        </CenterContent>
      </AnalyzingBox>
      {text === null && <SkipButton onClick={handleSkip}>SKIP</SkipButton>}
      <SkeletonBox>
        <Skeleton height="146" />
      </SkeletonBox>
      <SkeletonBox>
        <Skeleton height="146" />
      </SkeletonBox>
      <SkeletonBox>
        <Skeleton height="146" />
      </SkeletonBox>
    </>
  )
}

export default withTranslation()(withTheme(WalletAnalyzing))
