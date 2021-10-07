import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto 0;

  svg {
    transform: rotateZ(180deg);
  }

  @media screen and (max-width: 600px) {
    margin: 30px auto 0;
  }
`

export const Title = styled.h2`
  color: ${(p) => p.theme.colors.primary};
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.02em;
`

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 290px;

  @media screen and (max-width: 600px) {
    justify-content: space-around;
  }
`

export const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 59px;

  @media screen and (max-width: 600px) {
    width: 51px;
  }
`

export const TimeCount = styled.div`
  background-image: ${(p) => p.theme.colors.timeCountText};
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-style: normal;
  font-weight: 900;
  font-size: 48px;
  line-height: 100%;
  text-align: center;
  white-space: pre;
  margin: 0;

  @media screen and (max-width: 600px) {
    font-size: 40px;
  }
`

export const TimeLabel = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.strongDefault};
  margin: 0;
`

export const TimeDivider = styled.div`
  position: relative;
  width: 3px;
  height: 13px;

  &:after {
    content: '';
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    top: 0;
    left: 0;
    background: ${(p) => p.theme.colors.defaultLightActive};
  }

  &:before {
    content: '';
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    bottom: 0;
    left: 0;
    background: ${(p) => p.theme.colors.defaultLightActive};
  }
`

export const CircleContainer = styled.div`
  width: 336px;
  height: 336px;
  display: inline-block;
  position: relative;
  z-index: 1;

  svg {
    transform: rotateZ(90deg);
    width: 336px;
  }

  @media screen and (max-width: 600px) {
    width: 300px;
    height: 300px;

    svg {
      width: 300px;
    }
  }
`

export const ContentTimer = styled.div`
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`
