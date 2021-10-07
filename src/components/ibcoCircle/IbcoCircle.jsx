import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { Circle } from 'rc-progress'
import Skeleton from '@material-ui/lab/Skeleton'
import ArmorIcon from '../icons/ArmorIcon'
import {
  CircleContainer,
  Container,
  Content,
  ContentTimer,
  LoaderContainer,
  MainContent,
  Title,
} from './styled'

const IbcoCircle = ({
  theme,
  title,
  isLoading,
  value,
  content,
  armor,
  percentFill = 0, // from 0 to 100%
}) => {
  const colors = theme.colors

  return (
    <>
      <Container>
        <CircleContainer>
          <Circle
            percent={[percentFill, 100]}
            strokeWidth="3"
            strokeLinecap="round"
            strokeColor={[
              {
                '0%': colors.active,
                '100%': colors.primaryLightTrue,
              },
              colors.secondaryDefault,
            ]}
            gapPosition="right"
          />
          <ContentTimer>
            <Title>{title}</Title>
            <MainContent armorValue={armor}>
              {isLoading ? (
                <LoaderContainer>
                  <Skeleton width="100px" />
                </LoaderContainer>
              ) : (
                <span>
                  {value} {armor && <ArmorIcon />}
                </span>
              )}
              {}
            </MainContent>
            <Content>
              {isLoading ? <Skeleton width="100px" /> : content}
            </Content>
          </ContentTimer>
        </CircleContainer>
      </Container>
    </>
  )
}

export default withRouter(withTheme(IbcoCircle))
