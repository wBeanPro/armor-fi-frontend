import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { cropText } from '../../helpers'
import Container from '../shared/container/Container'
import Title from '../shared/title/Title'
import NewsBox from '../shared/newsBox/NewsBox'
import Store from '../../stores/store'
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  BLOG_RETURNED,
  GET_ACCOUNT_BALANCES,
  GET_BLOG,
} from '../../constants'
import { NewsWrapper, BoxWrapper } from './styled'

const store = Store.store
const emitter = Store.emitter
const dispatcher = Store.dispatcher

const Blog = () => {
  const [account, setAccount] = useState(null)
  const [posts, setPosts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)

    dispatcher.dispatch({ type: GET_BLOG, content: {} })

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(BLOG_RETURNED, blogReturned)

    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
      emitter.removeListener(BLOG_RETURNED, blogReturned)
    }
  }, [])

  const errorReturned = (error) => {}

  const blogReturned = (_posts) => {
    const posts = _posts.sort(
      (x, y) => y.latest_published_at - x.latest_published_at
    )
    setPosts(posts)
    setIsLoading(false)
  }

  const connectionConnected = async () => {
    const _account = store.getStore('account')
    if (_account) setAccount(_account)
  }

  const connectionDisconnected = () => setAccount(null)

  const handleClickArticle = (url) => {
    window.open(url, '_blank')
  }

  return (
    <Container noaccount={!account}>
      <Title text="Blog" />
      <NewsWrapper>
        {posts &&
          posts.map(
            (
              { title, description, image_link, link, latest_published_at },
              index
            ) => (
              <BoxWrapper key={index + new Date()}>
                <NewsBox
                  title={cropText(title, 48)}
                  description={cropText(description, 120)}
                  imageUrl={image_link}
                  publishedAt={latest_published_at}
                  onClick={() => handleClickArticle(link)}
                />
              </BoxWrapper>
            )
          )}
      </NewsWrapper>
    </Container>
  )
}

export default Blog
