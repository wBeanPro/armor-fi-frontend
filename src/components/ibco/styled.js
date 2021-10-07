import styled from 'styled-components'
import { ButtonStyled } from '../common/Button'

export const Root = styled.div`
  flex: 1;
  max-width: 965px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 18px 15px 40px;
  @media screen and (max-width: 1100px) {
    padding-top: 80px;
  }
`

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
  display: flex;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
`
export const NotifyBox = styled.div`
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 14px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  max-width: 220px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 3;
  top: -45px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 20px;
`

export const NotifyButton = styled.div`
  background: ${(p) => p.theme.colors.secondaryDefault};
  border-radius: 6px;
  height: 40px;
  padding: 10px 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
`

export const NotifyText = styled.h4`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.strongDefault};
  text-transform: uppercase;
  margin-right: 10px;
  cursor: default;
`

export const Button = styled(ButtonStyled)`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.secondary};
`
