import styled, { css } from 'styled-components'

export const TextStyled = styled.p`
  font-family: 'Open Sans', sans-serif;
  color: ${(p) => (p.color ? p.color : p.theme.colors.secondary)};
  font-weight: ${(p) => (p.bold ? 'bold' : 'normal')};
  ${(p) =>
    p.size === 'sm'
      ? css`
          font-size: 12px;
          line-height: 16px;
        `
      : p.size === 'md'
      ? css`
          font-size: 14px;
          line-height: 19px;
        `
      : css`
          font-size: 16px;
          line-height: 22px;
        `}
`
