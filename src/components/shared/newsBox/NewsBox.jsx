import React from 'react'
import { withTheme } from 'styled-components'
import Text from '../text/Text'
import {
  Card,
  ImageWraper,
  Image,
  TitleNews,
  Content,
  ContentWrapper,
  Header,
} from './styled'
import moment from 'moment'

const NewsBox = ({
  theme,
  corner = 'md', // md = 6px, lg = 16px
  title,
  description,
  imageUrl,
  publishedAt,
  onClick,
}) => {
  const { colors } = theme

  return (
    <Card corner={corner} onClick={onClick}>
      <Header>
        <ImageWraper>
          <Image src={imageUrl} alt={`${title} news image`} />
        </ImageWraper>
        <TitleNews>{title}</TitleNews>
      </Header>
      <Content>
        <Text text={description} />
        <ContentWrapper>
          <Text
            text={moment(publishedAt).fromNow()}
            title={moment(publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
            size="sm"
            color={colors._default}
          />
        </ContentWrapper>
      </Content>
    </Card>
  )
}

export default withTheme(NewsBox)
