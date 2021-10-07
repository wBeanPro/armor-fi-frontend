import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;
  z-index: 5;
  ${(p) =>
    p.home &&
    css`
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      margin: 0;
    `}
`
export const Wrapper = styled.div`
  padding: 4px 10px;
  background: ${(p) =>
    p.home ? p.theme.colors.disabledDefault : p.theme.colors.active};
  border: 1px solid ${(p) => p.theme.colors.active};
  box-sizing: border-box;
  box-shadow: ${(p) =>
    p.home
      ? `0px 0px 22px ${(p) => p.theme.colors.default50}`
      : `0px 0px 24px ${p.theme.colors.primaryDefault}`};
  border-radius: 6px;
  margin: 20px auto 0;
  max-width: ${(p) => (p.home ? '415px' : '385px')};
  width: 100%;
  display: flex;
  justify-content: ${(p) => (p.home ? 'center' : 'space-around')};
  align-items: center;

  @media screen and (max-width: 900px) {
    width: 415px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    max-width: 250px;
  }
`
export const Title = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) =>
    p.home ? p.theme.colors.strongDefault : p.theme.colors.secondary};
  margin: 0;
  ${(p) =>
    p.home &&
    css`
      margin-right: 5px;

      @media screen and (max-width: 600px) {
        margin-right: 0;
      }
    `}
`
export const TimeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 44px;
  width: 100%;

  @media screen and (max-width: 600px) {
    min-width: 40px;
  }
`
export const TimeTitle = styled.h5`
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: ${(p) => (p.home ? p.theme.colors.active : p.theme.colors.secondary)};
  margin: -2px 0 0;
`
export const TimeContent = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: ${(p) =>
    p.home ? p.theme.colors.strongDefault : p.theme.colors.secondary};
  margin: -5px 0 0;
`
export const TimeDivider = styled.div`
  position: relative;
  width: 3px;
  height: 13px;
  margin: 0 5px;
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
