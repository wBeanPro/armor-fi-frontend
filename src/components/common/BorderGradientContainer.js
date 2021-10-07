import styled from 'styled-components'

export const BorderGradientContainer = styled.div`
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 20px;
  margin-top: 46px;
  background: ${(p) => p.theme.colors.startedPulseAnimation};
`
