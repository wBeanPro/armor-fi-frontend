import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import { Root, Text, TextContainer, TitleStyled } from './styled'

const About = ({ t }) => {
  return (
    <Root>
      <TitleStyled>{t('About.Title')}</TitleStyled>
      <TextContainer>
        <Text>{t('About.Paragraph1')}</Text>
        <Text>{t('About.Paragraph2')}</Text>
        <Text>{t('About.Paragraph3')}</Text>
        <Text>{t('About.Paragraph4')}</Text>
        <Text>{t('About.Paragraph5')}</Text>
      </TextContainer>
    </Root>
  )
}

export default withTranslation()(withRouter(About))
