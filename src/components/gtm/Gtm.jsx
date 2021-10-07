import React, { useRef, useEffect } from 'react'

const GTM = () => {
  const scriptRef = useRef(null)
  useEffect(() => {
    scriptRef.current.setAttribute(
      'src',
      'https://www.googletagmanager.com/gtag/js?id=G-GV3LW5R6KK'
    )
    setTimeout(() => {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'G-GV3LW5R6KK')
    }, 0)
  }, [])
  return <script ref={scriptRef} async />
}

export default GTM
