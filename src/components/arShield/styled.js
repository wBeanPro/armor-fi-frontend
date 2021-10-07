import styled, { css } from 'styled-components'

export const Title = styled.h2`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: ${(p) => p.theme.colors.defaultLightActive};
`
export const Description = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary};
  max-width: 580px;
  width: 100%;
  margin: 35px auto 0;
  filter: ${(p) => (p.blur ? 'blur(2px)' : 'none')};

  @media screen and (max-width: 900px) {
    margin-top: 15px;
  }
`
export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 18px auto -27px;
  @media screen and (max-width: 600px) {
    margin: 20px auto -27px;
  }
`
