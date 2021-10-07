import React, { useEffect } from 'react'

const USERSNAP_GLOBAL_API_KEY = '70b3b71d-f8bf-4213-9cbe-93fcda6d6758'
const USERSNAP_PROJECT_API_KEY = 'ef75dd46-23a4-4b9b-a3ac-c89959cdd3d8'

const UserSnap = ({}) => {
  useEffect(() => {
    window.onUsersnapCXLoad = (api) => {
      api.init()
    }
    const script = document.createElement('script')
    script.defer = 1
    script.src = `https://widget.usersnap.com/load/${USERSNAP_PROJECT_API_KEY}?onload=onUsersnapCXLoad`
    document.getElementsByTagName('head')[0].appendChild(script)
  }, [])

  return <></>
}

export default UserSnap
