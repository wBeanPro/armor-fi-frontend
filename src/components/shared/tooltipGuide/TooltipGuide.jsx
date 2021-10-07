import React, { useState, useEffect } from 'react'
import { withTheme } from 'styled-components'
import Store from '../../../stores/store'
import Tooltip from '@material-ui/core/Tooltip'
import {
  removeEmitterListeners,
  turnOnEmitterListeners,
} from '../../../helpers'
import { GUIDE_ENABLED, GUIDE_DISABLED } from '../../../constants'
import AboutInfoIcon from '../../icons/AboutInfoIcon'
import { TooltipSpan } from './styled'

const emitter = Store.emitter

const TooltipGuide = ({ theme, text = '', placement = 'top', color }) => {
  const [isGuideEnabled, setIsGuideEnabled] = useState(
    !localStorage.getItem('armor-website-guide-disabled')
  )
  const { colors } = theme

  useEffect(() => {
    const events = [
      [GUIDE_ENABLED, handleGuideEnabled],
      [GUIDE_DISABLED, handleGuideDisabled],
    ]

    turnOnEmitterListeners(emitter, events)

    return () => {
      removeEmitterListeners(emitter, events)
    }
  }, [])

  const handleGuideEnabled = () => {
    setIsGuideEnabled(true)
  }

  const handleGuideDisabled = () => {
    setIsGuideEnabled(false)
  }

  return isGuideEnabled ? (
    <Tooltip
      arrow
      interactive
      placement={placement}
      enterTouchDelay={50}
      title={text}
    >
      <TooltipSpan>
        <AboutInfoIcon color={color || colors.secondary} />
      </TooltipSpan>
    </Tooltip>
  ) : null
}

export default withTheme(TooltipGuide)
