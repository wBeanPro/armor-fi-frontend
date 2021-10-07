import styled from 'styled-components'
import { Title } from '../common/Title'
import { ButtonStyled } from '../common/Button'

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

export const CircleContainer = styled.div`
  width: 218px;
  height: 218px;
  display: inline-block;
  position: relative;
  z-index: 1;

  svg {
    transform: rotateZ(90deg);
    width: 218px;
  }

  @media screen and (max-width: 600px) {
    width: 200px;
    height: 200px;

    svg {
      width: 200px;
    }
  }
`

export const CirleTitle = styled.h2`
  color: ${(p) => p.theme.colors.primary};
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.02em;
`

export const ContentTimer = styled.div`
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  @media screen and (max-width: 600px) {
    justify-content: space-around;
  }
`

export const TimeCount = styled.div`
  float: left;
  background-image: ${(p) => p.theme.colors.timeCountText};
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
  line-height: 100%;
  text-align: center;
  white-space: pre;
  margin: 0;
`

export const ArmorLogo = styled.img`
  margin-left: 10px;
`

export const TitleStyled = styled(Title)`
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  font-weight: 900;
`

export const NotifyContainer = styled.div`
  margin: 45px auto 150px;

  @media screen and (max-width: 600px) {
    margin-bottom: 100px;
  }
`

export const NotifyButton = styled(ButtonStyled)`
  max-width: 130px;
  margin: 0 auto;
  width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
`

export const NotifyText = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
  text-transform: uppercase;
`

export const IntroWrapper = styled.div`
  background: transparent;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
