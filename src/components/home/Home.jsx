import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Store from '../../stores/store'
import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  BLOG_RETURNED,
  GET_BLOG,
} from '../../constants'
import UnlockModal from '../unlockModal/UnlockModal'
import connectIcon from '../../assets/connect_wallet.svg'
import homeBg from '../../assets/hero_armor_background.jpg'
import {
  BuiltButton,
  ButtonWrapper,
  ConnectButton,
  Container,
  Content,
  LearnButton,
  NotifyButton,
  Root,
  Title,
  ButtonContainer,
  Wrapper,
  LinkBox,
  BoxContent,
  BoxTitle,
  BoxDescription,
  NewsWrapper,
  BoxNewsWrapper,
} from './styled'
import HomeSocials from '../homeSocials/HomeSocials'
import WalletButton from '../common/walletButton/WalletButton'
import NewsBox from '../shared/newsBox/NewsBox'
import { cropText } from '../../helpers'

const emitter = Store.emitter
const store = Store.store
const dispatcher = Store.dispatcher

const Home = ({ classes, history, t, altBackground }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [account, setAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pinnedBlogPosts, setPinnedBlogPosts] = useState([])

  const footerData = [
    {
      icon: 'lock',
      title: t('Home.SmartCover'),
      text: `arCORE ${t('Home.BoxText1')}`,
      url: '/protect',
    },
    {
      icon: 'gift',
      title: 'arNFT',
      text: t('Home.BoxText2'),
      url: '/mint',
    },
    {
      icon: 'stats',
      title: `arNXM ${t('Home.Vault')}`,
      text: t('Home.BoxText3'),
      url: '/arnxm-vault',
    },
    {
      icon: 'protect',
      title: t('Home.ShieldVaults'),
      text: t('Home.BoxText4'),
      url: '/arshield',
    },
  ]

  useEffect(() => {
    const _account = store.getStore('account')
    setAccount(_account)
    dispatcher.dispatch({ type: GET_BLOG, content: {} })

    emitter.on(ERROR, errorReturned)
    emitter.on(CONNECTION_DISCONNECTED, connectionDisconnected)
    emitter.on(CONNECTION_CONNECTED, connectionConnected)
    emitter.on(BLOG_RETURNED, blogReturned)
    return () => {
      emitter.removeListener(ERROR, errorReturned)
      emitter.removeListener(CONNECTION_CONNECTED, connectionConnected)
      emitter.removeListener(CONNECTION_DISCONNECTED, connectionDisconnected)
      emitter.removeListener(BLOG_RETURNED, blogReturned)
    }
  }, [])

  const blogReturned = (posts) => {
    if (posts == null) {
      setIsLoading(false)
      return
    }

    const pinnedPosts = posts.filter((p) => p.pinned)
    setPinnedBlogPosts(pinnedPosts)
    setIsLoading(false)
  }

  const errorReturned = () => setIsLoading(false)

  const connectionConnected = () => {
    const _account = store.getStore('account')
    setAccount(_account)
  }

  const connectionDisconnected = () => {
    setAccount(null)
  }

  const nav = (screen) => {
    history.push(`/${screen}`)
  }

  const addressClicked = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const provideTo = (url) => {
    history.push(url)
  }

  const handleClickArticle = (url) => {
    window.open(url, '_blank')
  }

  return (
    <Root
      style={
        altBackground
          ? {
              backgroundImage: `url('${homeBg}')`,
            }
          : {}
      }
    >
      {/* <NotifyButton
        href="http://t.me/armor_ann"
        rel="noreferrer"
        target="_blank"
      >
        {t('Home.IbcoBanner')} 🔔
      </NotifyButton> */}
      <HomeSocials account={account} />
      <Container>
        <BuiltButton href="#">{t('Home.Badge')}</BuiltButton>
        <Title>
          {t('Home.Heading1')}
          <br /> {t('Home.Heading2')}
        </Title>
        <Content>{t('Home.Description')}</Content>
        <ButtonWrapper>
          {(!account || !account.address) && (
            <ButtonContainer>
              <WalletButton />
            </ButtonContainer>
          )}
          <LearnButton
            isLoggedIn={account && account.address}
            onClick={() =>
              window.open('https://armorfi.gitbook.io/armor/', '_blank')
            }
          >
            {t('Home.AboutLink')}
          </LearnButton>
        </ButtonWrapper>
        <Wrapper>
          {footerData.map(({ icon, title, text, url }, index) => (
            <LinkBox onClick={() => provideTo(url)} key={index}>
              <BoxContent>
                <img
                  src={require(`../../assets/logos/${icon}.svg`)}
                  alt="page logo"
                />
                <BoxTitle>{title}</BoxTitle>
                <BoxDescription>{text}</BoxDescription>
              </BoxContent>
            </LinkBox>
          ))}
        </Wrapper>

        {pinnedBlogPosts && pinnedBlogPosts.length > 0 && (
          <NewsWrapper>
            {pinnedBlogPosts.map(
              (
                {
                  post_id,
                  title,
                  description,
                  image_link,
                  latest_published_at,
                  link,
                },
                i
              ) => (
                <BoxNewsWrapper key={post_id}>
                  <NewsBox
                    corner="lg"
                    title={cropText(title, 48)}
                    description={cropText(description, 120)}
                    imageUrl={image_link}
                    publishedAt={latest_published_at}
                    onClick={() => handleClickArticle(link)}
                  />
                </BoxNewsWrapper>
              )
            )}
          </NewsWrapper>
        )}
      </Container>
      <UnlockModal
        closeModal={closeModal}
        modalOpen={modalOpen}
        loggedIn={() => nav('mint')}
      />
    </Root>
  )
}

export default withTranslation()(withRouter(Home))
