import styled, { css } from 'styled-components'
import homeBg from '../../../assets/new_armor_background.jpg'

export const HomeContainerStyled = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  ${(p) =>
    p.isHomePage
      ? css`
          background: url(${homeBg}) no-repeat center center;
        `
      : css`
          &::before {
            content: '';
            position: absolute;
            top: -8px;
            left: -8px;
            height: calc(100% + 16px);
            width: calc(100% + 20px);
            filter: blur(8px);
            background: ${(p) => p.theme.colors.mainBgGradient};
            z-index: 0;
          }
        `}

  background-size: cover;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 600px) {
    background-position: left;
  }
`
