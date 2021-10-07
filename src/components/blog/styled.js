import styled from 'styled-components'

export const NewsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 18px;

  @media screen and (max-width: 1050px) {
    justify-content: center;
  }
  @media screen and (max-width: 900px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    justify-content: space-around;
  }
`
export const BoxWrapper = styled.div`
  margin-top: 18px;
  max-width: 32%;
  width: 100%;

  @media screen and (max-width: 1050px) {
    max-width: 275px;
    margin: 20px 10px 0;
  }
  @media screen and (max-width: 900px) {
    max-width: 32%;
    margin: 18px 0 0;
  }
  @media screen and (max-width: 768px) {
    max-width: 300px;
    margin: 18px 10px 0;
  }
  @media screen and (max-width: 448px) {
    margin: 18px 0 0;
  }
`
