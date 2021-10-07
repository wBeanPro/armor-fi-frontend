import styled, { css } from 'styled-components'

export const Link = styled.h5`
  cursor: pointer;
  border-bottom: 1px solid none;
  padding: 10px 6px;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  width: 100%;
  color: ${(p) =>
    p.isCurrentPage ? p.theme.colors.secondary : p.theme.colors.menuItem};
  transition: 0.2s color;

  ${(p) =>
    p.isBlurred
      ? css`
          filter: blur(3px);
        `
      : ''}

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    transition: 0.2s color;
    color: ${(p) =>
      p.isBlurred ? p.theme.colors.menuItem : p.theme.colors.secondary};
  }

  @media screen and (max-width: 900px) {
    background: transparent;
    color: ${(p) => p.theme.colors.secondary};
    border-bottom: 1px solid ${(p) => p.theme.colors.tradeDivider};
    &:hover {
      transition: unset;
    }
  }
`
