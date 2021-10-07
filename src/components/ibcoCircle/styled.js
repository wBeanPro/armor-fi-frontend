import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: rotateZ(180deg);
  }
`

export const Title = styled.h2`
  color: ${(p) => p.theme.colors.primary};
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.02em;
  margin: 12px auto;

  @media screen and (max-width: 600px) {
    margin: 0;
  }
`

export const CircleContainer = styled.div`
  width: 250px;
  height: 250px;
  display: inline-block;
  position: relative;
  z-index: 1;

  svg {
    transform: rotateZ(90deg);
    width: 250px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    height: unset;

    svg {
      width: 100%;
    }
  }
`

export const ContentTimer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  @media screen and (max-width: 600px) {
    min-width: 100%;
  }
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const MainContent = styled.div`
  background-image: ${(p) => p.theme.colors.timeCountText};
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-style: normal;
  font-weight: 900;
  font-size: ${(p) => (p.armorValue ? '22px' : '38px')};
  line-height: 140%;
  text-align: center;
  white-space: nowrap;
  display: block;
  margin: 0;
  svg {
    transform: rotateZ(0deg);
    width: 24px;
    position: relative;
    top: 5px;
  }

  @media screen and (max-width: 600px) {
    font-size: 23px;
  }
`

export const Content = styled.p`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.strongDefault};
  margin: 0;
  display: flex;
  justify-content: center;
`
