import styled, { css } from 'styled-components'
import homeBg from './assets/new_armor_background.jpg'

export const Wrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);

  @media screen and (max-width: 900px) {
    min-height: unset;
    flex: 1;
  }
`
