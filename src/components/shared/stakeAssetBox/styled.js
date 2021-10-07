import styled from 'styled-components'

export const Card = styled.div`
  max-width: 19%;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 6px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 990px) {
    max-width: 32%;
  }

  @media screen and (max-width: 600px) {
    max-width: 48%;
  }
  @media screen and (max-width: 350px) {
    max-width: 100%;
    justify-content: center;
    margin: 20px auto 0;
  }
`
export const Logo = styled.div`
  height: 26px;
  max-width: 26px;
  width: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: ${(p) => p.theme.colors.secondary};
  & img {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
export const CellContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
export const NameLogo = styled.p`
  font-weight: ${(p) => (p.bold ? 'bold' : 'normal')};
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.active};
  margin-top: 5px;

  @media screen and (max-width: 600px) {
    font-size: 12px;
    line-height: 17px;
  }
`
export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px 6px 0px 0px;
  background: ${(p) => p.theme.colors.transparentBg};
  text-align: center;
  min-height: 93px;
  text-decoration: none;
  padding: 15px 10px 10px;

  @media screen and (max-width: 600px) {
    min-height: 70px;
  }
  @media screen and (max-width: 500px) {
    min-height: 90px;
  }
`
export const Item = styled.div`
  border-top: 1px solid ${(p) => p.theme.colors.tradeDivider};
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  color: ${(p) => p.theme.colors._default};
  height: 100%;
`
export const ItemValue = styled.span`
  display: block;
  text-align: center;
  color: ${(p) => p.theme.colors._default};
  font-weight: bold;
`
