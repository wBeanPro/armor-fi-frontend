import styled from 'styled-components'

export const Image = styled.img`
  object-fit: cover;
  height: 100%;
  min-width: 100%;
  transition: transform 0.2s;

  @media screen and (max-width: 768px) {
    transition: none;
  }
`
export const ImageWraper = styled.div`
  max-height: 145px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    max-height: 165px;
  }
`
export const Card = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: ${(p) => (p.corner === 'lg' ? '16px' : '6px')};
  overflow: hidden;
  width: 100%;
  border: 2px solid ${(p) => p.theme.colors.primaryLightTrue50};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    ${Image} {
      transform: scale(1.04);
    }
  }

  @media screen and (max-width: 768px) {
    &:hover {
      ${Image} {
        transform: none;
      }
    }
  }
`
export const Header = styled.div`
  position: relative;
  z-index: 2;
`
export const TitleNews = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.defaultLightActive};
  padding: 10px;
  background: ${(p) => p.theme.colors.modalBg};
  display: block;
  width: 100%;
`
export const Content = styled.div`
  padding: 15px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  z-index: 2;
`
export const ContentWrapper = styled.div`
  margin-top: 15px;
`
