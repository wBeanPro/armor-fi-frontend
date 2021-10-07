import styled from 'styled-components'

export const Container = styled.div`
  max-width: 705px;
  width: 100%;
  margin: 0 auto;
`
export const InfoBox = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  padding: 54px 20px 30px;
  max-width: 575px;
  width: 100%;
  margin: 90px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
export const HeaderImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const InfoTitle = styled.h4`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  color: ${(p) => p.theme.colors.lightSecondary};
  margin-top: 33px;
`
export const CheckmarkBox = styled.div`
  margin: 20px auto 40px;
  max-width: 334px;
  width: 100%;
`
export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  & img {
    max-width: 24px;
    width: 100%;
    height: auto;
    margin-right: 9px;
  }
`
export const RowText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: ${(p) => p.theme.colors.secondary};
`
export const Title = styled.h3`
  font-family: 'Open Sans', sans-serif;
  margin-top: 15px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
`
export const StepWrapper = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 650px) {
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 15px;
  }
`
export const Step = styled.div`
  display: flex;
  align-items: center;
  max-width: 227px;
  width: 100%;

  @media screen and (max-width: 650px) {
    margin-top: 15px;
  }
`
export const StepText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.secondary};
  margin-left: 12px;
`
export const StepNumber = styled.div`
  height: 43px;
  max-width: 43px;
  min-width: 43px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.defaultArrow};
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: ${(p) => p.theme.colors.active};
`
export const FooterText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  max-width: 460px;
  width: 100%;
  margin: 24px auto 0;

  & span {
    font-weight: bold;
  }
`
