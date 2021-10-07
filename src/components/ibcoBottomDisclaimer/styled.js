import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${(p) => p.theme.colors.active};
  border-radius: 6px;
  padding: 12px 18px;
  margin: 32px auto 0;
  max-width: 935px;
  width: 100%;

  svg {
    font-size: unset !important;
    width: 35px;
    height: auto;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 12px 15px;
    svg {
      margin-bottom: 14px;
    }
  }
`

export const Content = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.secondary};
  margin: 0 0 0 15px;

  span {
    font-weight: bold;
  }

  @media screen and (max-width: 600px) {
    margin: 0;
  }
`
