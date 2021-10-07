import styled from 'styled-components'

export const Container = styled.div`
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 6px;
  padding: 15px 20px;
  width: 100%;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    min-height: unset;
  }
`
export const Title = styled.h6`
  font-family: 'Open Sans', sans-serif;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
`
export const Value = styled.p`
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
