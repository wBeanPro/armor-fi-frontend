import styled from 'styled-components'

export const Container = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  border: ${(p) =>
    p.border ? `1px solid ${p.theme.colors.primaryLightTrue}` : 'none'};
`
