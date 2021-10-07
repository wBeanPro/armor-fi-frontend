import React from 'react'
import { checkOnImageExist } from '../../../helpers'
import { withTranslation } from 'react-i18next'
import { Card, NameContainer, Logo, NameLogo, Item, ItemValue } from './styled'

const StakeAssetBox = ({ t, logo, title, usdValue, nxmValue }) => (
  <Card>
    <NameContainer>
      <Logo>
        <img src={checkOnImageExist(logo, 'eth.png')} alt="icon" />
      </Logo>
      <NameLogo bold>{title}</NameLogo>
    </NameContainer>
    <Item>
      {t('ArNxmProtocols.Staked')}:<ItemValue>{` $${usdValue}`}</ItemValue>
      <ItemValue>{`${nxmValue} NXM`}</ItemValue>
    </Item>
  </Card>
)

export default withTranslation()(StakeAssetBox)
