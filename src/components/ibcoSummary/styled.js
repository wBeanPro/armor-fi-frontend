import styled from 'styled-components'
import { Title } from '../common/Title'

export const Container = styled.div`
  margin-top: 70px;
  border-top: 1px solid ${(p) => p.theme.colors.primaryDefault};

  @media screen and (max-width: 900px) {
    margin-top: 57px;
  }
`
export const TitleStyled = styled(Title)`
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  font-weight: 900;
  margin-top: 25px;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 700px;
  flex-wrap: wrap;
  margin: 26px auto 0;

  @media screen and (max-width: 900px) {
    justify-content: space-around;
  }
  @media screen and (max-width: 600px) {
    margin-top: 7px;
  }
`
export const SummaryItem = styled.div`
  background: ${(p) => p.theme.colors.secondary};
  box-shadow: 0px 0px 4px ${(p) => p.theme.colors.primaryDefault};
  border-radius: 6px;
  min-height: 109px;
  max-width: 218px;
  width: 100%;
  padding: 11px 30px 24px;
  margin-top: 22px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid ${(p) => p.theme.colors.activeBorderBox};

  @media screen and (max-width: 600px) {
    margin-top: 24px;
  }
`
export const ItemTitle = styled.h6`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.primary};
`
export const ItemValue = styled.div`
  background-image: ${(p) => p.theme.colors.timeCountText};
  font-family: 'Source Sans Pro', 'Open Sans', sans-serif;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-style: normal;
  font-weight: 900;
  font-size: 23px;
  line-height: 140%;
  text-align: center;
  white-space: pre;
  display: block;
  margin: 5px 0 0;
`
