import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 0 0 20px;
`
export const Shadow = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 5;
  width: calc(100% + 40px);
  height: ${(p) => p.height}px;
  margin: 0 -20px;
  background: ${(p) => p.theme.colors.shadowGradient};
`
