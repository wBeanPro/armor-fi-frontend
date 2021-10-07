import styled from 'styled-components'

export const AssetsWrapper = styled.div`
  margin: 27px auto 0;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 990px) {
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: space-around;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`
export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 27px;
  background-color: ${(p) => p.theme.colors.defaultArrow};
  padding: 25px 15px;
  border-radius: 16px;
  align-items: stretch;
  color: #fff;
  @media screen and (max-width: 990px) {
    flex-wrap: wrap;
    padding: 0 15px 15px;
  }
  @media screen and (max-width: 650px) {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
`
export const AssetsBox = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 6px;
  padding: ${(p) => (p.dropdown ? '20px' : '10px')};
  max-width: 24%;
  width: 100%;
  min-height: 110px;
  display: flex;
  margin: ${(p) => (p.dropdown ? '0 auto' : 'unset')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 990px) {
    margin-top: 7px;
    max-width: 49%;
  }
  @media screen and (max-width: 600px) {
    padding: ${(p) => (p.dropdown ? '20px' : '15px 20px')};
    margin: 10px auto 0;
    min-height: unset;
    max-width: 98%;
  }
  @media screen and (max-width: 350px) {
    max-width: 100%;
  }
`
export const AssetsTitle = styled.h6`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
`
export const AssetsGradient = styled.p`
  color: ${(p) => p.theme.colors.active};
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 19px;
  line-height: 140%;
  text-align: center;
  margin-top: 5px;

  @media screen and (max-width: 990px) {
    font-size: 22px;
  }
`
export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-left: 6px;
  width: 100%;
  display: flex;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
export const TooltipInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 18px;
`

export const TooltipButtonWrapper = styled.div`
  margin-top: 10px;
`
