import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { TooltipSwitcher, Label, Container } from './styled'
import Store from '../../../stores/store'
import { GUIDE_DISABLED, GUIDE_ENABLED } from '../../../constants'
const emitter = Store.emitter

const TooltipGuideToggle = ({ t, location }) => {
  const [isGuideEnabled, setIsGuideEnabled] = useState(
    !localStorage.getItem('armor-website-guide-disabled')
  )

  const handleChange = (_, _isGuideEnabled) => {
    setIsGuideEnabled(_isGuideEnabled)
    if (_isGuideEnabled) {
      localStorage.removeItem('armor-website-guide-disabled')
      emitter.emit(GUIDE_ENABLED)
    } else {
      localStorage.setItem('armor-website-guide-disabled', 'true')
      emitter.emit(GUIDE_DISABLED)
    }
  }

  return (
    <Container>
      <Label>{t('TooltipGuide.Tooltip')}:</Label>
      <TooltipSwitcher
        checked={isGuideEnabled}
        onChange={handleChange}
        color="primary"
        name="tooltip"
      />
    </Container>
  )
}

export default withTranslation()(withRouter(TooltipGuideToggle))
