import React, { useState, useEffect } from 'react'
import Store from '../../../stores/store'
import Tooltip from '@material-ui/core/Tooltip'
import {
  removeEmitterListeners,
  turnOnEmitterListeners,
} from '../../../helpers'
import { GUIDE_ENABLED, GUIDE_DISABLED } from '../../../constants'

const emitter = Store.emitter

const TooltipGuide = ({ text = '', placement = 'top', children }) => {
  const [isGuideEnabled, setIsGuideEnabled] = useState(
    !localStorage.getItem('armor-website-guide-disabled')
  )

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
      {children}
    </Tooltip>
  ) : null
}

export default TooltipGuide
