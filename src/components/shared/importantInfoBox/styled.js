import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background: ${(p) => p.theme.colors.startedPulseAnimation};
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  padding: 12px 60px 12px 23px;

  @media screen and (max-width: 768px) {
    padding: 12px 23px;
  }
`
export const IconWrapper = styled.div`
  margin-right: 12px;
  & svg {
    height: 20px;
    width: 20px;
    transform: rotate(180deg);
  }
`
export const Title = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  margin-top: 2px;
  color: ${(p) => p.theme.colors.secondary};
`
export const Text = styled(Title)`
  font-weight: normal;
  margin-top: 12px;
`
