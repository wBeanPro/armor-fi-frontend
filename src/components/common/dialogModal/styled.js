import styled from 'styled-components'

export const Content = styled.p`
  display: block;
  padding: 10px 20px 15px;
  margin-top: 20px;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 19px;
  color: ${(p) => p.theme.colors.secondary};
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0 15px;
`
