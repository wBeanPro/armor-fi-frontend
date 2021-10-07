import styled from 'styled-components'
import homeBg from '../../assets/armor_background.jpg'
import Button from '@material-ui/core/Button'

export const Root = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: -235px;

  @media screen and (max-width: 1400px) {
    margin-left: 0;
  }
`

export const Container = styled.div`
  max-width: 962px;
  width: 100%;
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  padding: 96px 15px 60px;

  @media screen and (max-width: 670px) {
    padding: 40px 15px 40px;
    align-items: center;
  }
`

export const NotifyButton = styled.a`
  background: ${(p) => p.theme.colors.disabledDefault};
  border: 1px solid ${(p) => p.theme.colors.active};
  box-sizing: border-box;
  box-shadow: 0px 0px 22px ${(p) => p.theme.colors.default50};
  border-radius: 6px;
  padding: 7px 15px;
  text-decoration: none;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.strongDefault};
  margin: 18px auto -50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    margin: 90px auto 0;
  }
  @media screen and (max-width: 900px) {
    position: relative;
    left: unset;
    transform: unset;
  }
  @media screen and (max-width: 448px) {
    padding: 5px 15px;
    font-size: 14px;
  }
  @media screen and (max-width: 370px) {
    padding: 5px 15px;
    font-size: 12px;
  }
`

export const BuiltButton = styled.a`
  text-decoration: none;
  padding: 4px 8px;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primaryLightTrue};
  background: ${(p) => p.theme.colors.homeTransparentButtonBg};
  border-radius: 12px;
  font-family: 'Open Sans', sans-serif;
`

export const Title = styled.h1`
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  font-weight: 900;
  font-size: 47px;
  line-height: 52px;
  color: ${(p) => p.theme.colors.secondary};
  text-shadow: 0px 0px 6px ${(p) => p.theme.colors.strongActive};
  margin-top: 26px;
  max-width: 545px;

  @media screen and (max-width: 670px) {
    font-size: 40px;
    line-height: 46px;
    margin-top: 38px;
    text-align: center;
  }
`

export const Content = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: #e6f7ff;
  text-shadow: 0px 0px 6px ${(p) => p.theme.colors.strongActive};
  color: ${(p) => p.theme.colors.primaryLightActive};
  margin-top: 26px;
  max-width: 320px;

  @media screen and (max-width: 600px) {
    margin-top: 38px;
    text-align: center;
  }
`

export const ButtonWrapper = styled.div`
  margin-top: 26px;

  @media screen and (max-width: 600px) {
    margin-top: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`
export const ButtonContainer = styled.div`
  margin-bottom: 26px;
`

export const ConnectButton = styled(Button)`
  background: ${(p) => p.theme.colors.secondaryDefault};
  box-shadow: 0px 5px 26px ${(p) => p.theme.colors.strongActive};
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  font-family: 'Open Sans', sans-serif;
  color: ${(p) => p.theme.colors.primary};
  padding: 11px 12px;

  img {
    margin-left: 10px;
  }

  @media screen and (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 12px;
  }
`

export const LearnButton = styled.p`
  color: ${(p) => p.theme.colors.primaryLightTrue};
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.02em;
  text-decoration-line: underline;

  @media screen and (max-width: 600px) {
    text-align: center;
  }
`
export const Wrapper = styled.div`
  display: flex;
  margin-top: 64px;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 1150px) {
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 44px;
  }
`
export const LinkBox = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 19px 16px 33px;
  max-width: 218px;
  width: 100%;
  cursor: pointer;

  &::after {
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    border: 2px solid ${(p) => p.theme.colors.primaryLightTrue};
    background: ${(p) => p.theme.colors.homeLinkBox};
    opacity: 0.5;
    border-radius: 16px;
  }
  @media screen and (max-width: 1150px) {
    margin: 20px 10px 0;
  }
`
export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`
export const BoxTitle = styled.h5`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: ${(p) => p.theme.colors.lightSecondary};
  margin-top: 17px;
`
export const BoxDescription = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.lightSecondary};
  margin-top: 15px;
`
export const BoxNewsWrapper = styled.div`
  max-width: 265px;
  width: 100%;
  margin-top: 25px;

  @media screen and (max-width: 900px) {
    max-width: 32%;
    margin: 25px 0 0;
  }
  @media screen and (max-width: 768px) {
    max-width: 300px;
    margin: 25px 10px 0;
  }
  @media screen and (max-width: 448px) {
    margin: 25px 0 0;
  }
`
export const NewsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 1050px) {
    justify-content: space-around;
  }
  @media screen and (max-width: 900px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    justify-content: space-around;
  }
`
