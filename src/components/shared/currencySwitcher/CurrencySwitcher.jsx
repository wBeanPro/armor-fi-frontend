import React from 'react'
import { withTranslation } from 'react-i18next'
import Tooltip from '@material-ui/core/Tooltip'

import { SwitchWrapper, ToggleSwitchButton } from './styled'

const CurrencySwitcher = ({ t, isUsdPrimary, onClick }) => (
  <Tooltip arrow placement="top" enterTouchDelay={50} title={t('MainCurrency')}>
    <SwitchWrapper primary={isUsdPrimary}>
      <ToggleSwitchButton onClick={onClick}>USD</ToggleSwitchButton>
      <ToggleSwitchButton onClick={onClick}>ETH</ToggleSwitchButton>
    </SwitchWrapper>
  </Tooltip>
)

export default withTranslation()(CurrencySwitcher)
