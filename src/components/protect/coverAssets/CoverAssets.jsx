import React from 'react'
import { Title, Description, Button, Container, ContentBox } from './styled'

const CoverAssets = ({ assetsToCover, onCoverArr }) => {
  const handleClickCoverAll = () => {
    onCoverArr(assetsToCover)
  }

  return (
    <Container>
      <ContentBox>
        <Title>Your assets beg for cover!</Title>
        <Description>
          We have found{' '}
          <span>
            {assetsToCover.length}{' '}
            {assetsToCover.length === 1 ? 'asset' : 'assets'}
          </span>{' '}
          that we can cover in your portfolio. Cover them now and get all the
          benefits of arCore Protect!
        </Description>
        <Button onClick={handleClickCoverAll}>COVER ALL</Button>
      </ContentBox>
    </Container>
  )
}

export default CoverAssets
