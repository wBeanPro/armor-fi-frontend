import styled from 'styled-components'

export const Container = styled.div`
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 20px;
  background: ${(p) => p.theme.colors.startedPulseAnimation};
  width: 100%;
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
export const Title = styled.h5`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.secondary};
  margin-left: 8px;
`
