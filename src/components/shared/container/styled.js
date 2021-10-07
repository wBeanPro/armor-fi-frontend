import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  margin-left: -235px;

  @media screen and (max-width: 1300px) {
    margin-left: ${(p) => (p.noaccount ? '-235px' : '30px')};
  }

  ${(p) =>
    p.noaccount
      ? css`
          @media screen and (max-width: 1150px) {
            margin-left: 30px;
          }
        `
      : css``}
  @media screen and (max-width: 900px) {
    margin-left: 0;
  }
`
export const WrapContainer = styled.div`
  flex: 1;
  max-width: ${(p) => (p.lg ? '890px' : '845px')};
  width: 100%;
  padding: 18px 15px 48px;

  @media screen and (max-width: 1500px) {
    padding-top: 50px;
  }
  @media screen and (max-width: 1300px) {
    padding-top: 80px;
  }

  ${(p) =>
    p.noaccount
      ? css`
          @media screen and (max-width: 550px) {
            padding-top: 110px;
          }
        `
      : css``}
`
