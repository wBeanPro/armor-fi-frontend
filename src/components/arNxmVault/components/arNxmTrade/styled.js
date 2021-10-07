import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
`
export const Cell = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 50%;
  width: 75px;
  height: 75px;
  margin: 20px 40px 0 40px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  padding: 2px;
  overflow: hidden;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    margin: 20px 10px 0;
  }
`
export const Logo = styled.img`
  overflow: hidden;
  border-radius: 50%;
  width: 100%;
  height: 100%;
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
  border-top: 1px solid ${(p) => p.theme.colors.activeBorderBox};
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.strongDefault};
  height: 100%;
`
export const ItemValue = styled.span`
  display: block;
  text-align: center;
  /* color: ${(p) => p.theme.colors.activeBorder}; */
  font-weight: bold;
`
