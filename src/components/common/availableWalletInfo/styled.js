import styled from 'styled-components'

export const Container = styled.div`
  background: ${(p) => p.theme.colors.transparentBg};
  padding: 8px 17px;
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.center ? 'center' : 'flex-start')};
  width: 100%;
`
export const Content = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.disabledText};
`
export const Bold = styled.span`
  font-weight: bold;
`
