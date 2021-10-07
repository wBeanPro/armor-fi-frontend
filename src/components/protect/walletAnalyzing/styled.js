import styled from 'styled-components'
import { BorderGradientContainer } from '../../common/BorderGradientContainer'

export const AnalyzingBox = styled(BorderGradientContainer)`
  & svg {
    max-width: 24px;
    width: 100%;
    height: auto;
  }
  position: relative;
  overflow: hidden;

  &::after {
    -webkit-animation: analyzing 2s ease-in-out infinite both;
    animation: analyzing 2s ease-in-out infinite both;
    content: '';
    position: absolute;
    border-radius: 16px;
    overflow: hidden;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    @-webkit-keyframes analyzing {
      0% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 0;
      }
      50% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 1;
      }
      100% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 0;
      }
    }
    @keyframes analyzing {
      0% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 0;
      }
      50% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 1;
      }
      100% {
        background: ${(p) => p.theme.colors.finishedPulseAnimation};
        opacity: 0;
      }
    }
  }
`
export const CenterContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
export const SkeletonBox = styled.div`
  margin-top: 32px;
  height: 100%;
  max-height: 146px;
`
export const Title = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.secondary};
  margin-left: 8px;
`
export const SkipButton = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 140%;
  color: ${(p) => p.theme.colors._default};
  cursor: pointer;
  margin: 22px auto -10px;
  max-width: fit-content;
  padding: 2px 5px;
`
