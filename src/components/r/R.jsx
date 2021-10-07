import React, { useEffect, useState } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import ReferralSystem from '../../classes/referralSystem'
import config from '../../config'

const R = ({ history }) => {
  const { refId, campaignId } = useParams()

  useEffect(() => {
    try {
      const referralSystem = new ReferralSystem(config, localStorage)

      if (refId != null) {
        referralSystem.setCodeInStorage(refId, campaignId)
      }
    } catch (e) {
      console.error(e)
    }

    history.push('/')
  }, [])
  return null
}

export default withRouter(R)
