import styled from 'styled-components'

export const Container = styled.div`
  background: ${(p) => p.theme.colors.transparentBg};
  padding: 6px 17px 11px;
  display: flex;
  justify-content: ${(p) => (p.center ? 'center' : 'space-between')};
  width: 100%;

  @media screen and (max-width: 548px) {
    flex-direction: column;
  }
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
