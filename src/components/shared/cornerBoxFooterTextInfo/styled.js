import styled from 'styled-components'

export const FooterInfo = styled.div`
  background: ${(p) => p.theme.colors.transparentBg};
  display: flex;
  align-items: center;
  padding: 8px 17px;
  & svg {
    min-width: 16px;
    max-width: 16px;
    width: 100%;
    height: 16px;
  }
`
export const FooterInfoText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  margin-left: 6px;
  color: ${(p) => p.theme.colors.disabledText};
`
