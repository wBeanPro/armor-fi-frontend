import styled from 'styled-components'
import { ButtonStyled } from '../../common/Button'
import { BorderGradientContainer } from '../../common/BorderGradientContainer'

export const Container = styled(BorderGradientContainer)`
  position: relative;
  overflow: hidden;

  &::after {
    -webkit-animation: analyzing 2s ease-in-out infinite both;
    animation: analyzing 2s ease-in-out infinite both;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    @-webkit-keyframes analyzing {
      0% {
        background: ${(p) => p.theme.colors.largeFinishedPulseAnimation};
        opacity: 0;
      }
      50% {
        background: ${(p) => p.theme.colors.largeFinishedPulseAnimation};
        opacity: 1;
      }
      100% {
        background: ${(p) => p.theme.colors.largeFinishedPulseAnimation};
        opacity: 0;
      }
    }
    @keyframes analyzing {
      0% {
        background: ${(p) => p.theme.colors.largeFinishedPulseAnimation};
        opacity: 0;
      }
      50% {
        background: ${(p) => p.theme.colors.largeFinishedPulseAnimation};
        opacity: 1;
      }
      100% {
        background: ${(p) => p.theme.colors.largeFinishedPulseAnimation};
        opacity: 0;
      }
    }
  }
`
export const ContentBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`
export const Title = styled.h3`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
`
export const Description = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  max-width: 400px;
  width: 100%;
  margin: 16px auto 0;
  & span {
    font-weight: bold;
  }
`
export const Button = styled(ButtonStyled)`
  color: ${(p) => p.theme.colors.secondary};
  font-weight: bold;
  box-shadow: none;
  height: unset;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  padding: 6px;
  margin-top: 22px;
  background: ${(p) => p.theme.colors.buttonActiveBg};

  &.MuiButton-contained.Mui-disabled {
    background: ${(p) => p.theme.colors.strongDefault};
    & h4 {
      color: ${(p) => p.theme.colors.secondary};
    }
  }
`
