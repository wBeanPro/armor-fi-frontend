import styled from 'styled-components'

export const Item = styled.div`
  color: ${(p) => p.theme.colors._default};
  cursor: pointer;
  margin-right: 30px;
  color: ${(p) => p.theme.colors.disabledText};
  font-weight: 600;

  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }

  @media screen and (max-width: 900px) {
    margin-right: 0;
    text-align: center;
    margin-top: 32px;

    &:first-of-type {
      margin-top: 8px;
    }
  }
`
