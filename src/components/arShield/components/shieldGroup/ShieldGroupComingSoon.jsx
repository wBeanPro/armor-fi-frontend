import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Box, Header } from './styled'
import ShieldGroupTitle from './ShieldGroupTitle'
import RewardsButton from './RewardsButton'
import ShieldsTable from './ShieldsTable'
import ShieldRow from './shieldRow/ShieldRow'

export const ComingSoonText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  padding-bottom: 25px;
  opacity: 0.5;
  @media screen and (max-width: 600px) {
    padding: 17px 15px;
  }
  @media screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: center;
  }
`

const ShieldGroupComingSoon = ({ theme, title, logo }) => {
  const { colors } = theme

  return (
    <Box>
      <Header>
        <ShieldGroupTitle title={title} logo={logo} theme={theme} />
      </Header>

      <ComingSoonText>Coming Soon</ComingSoonText>
    </Box>
  )
}

export default withTheme(ShieldGroupComingSoon)
