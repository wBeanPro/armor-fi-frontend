import styled from 'styled-components'
import { Title } from '../common/Title'
import { Paragraph } from '../common/Paragraph'

export const Root = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  padding: 60px 15px 20px;

  @media screen and (max-width: 768px) {
    padding-top: 70px;
  }
`

export const TitleStyled = styled(Title)`
  max-width: 500px;
  margin: 25px auto 0;
`

export const Image = styled.img`
  margin-top: 30px;
  width: 100%;
`

export const TextContainer = styled.div`
  margin-top: 30px;
`

export const Text = styled(Paragraph)`
  margin-bottom: 16px;
`
