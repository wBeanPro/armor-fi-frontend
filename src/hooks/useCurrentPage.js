import { useEffect, useState } from 'react'

export const useCurrentPage = (delay = 100) => {
  const [ticker, setTicker] = useState(null)
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname || '/'
  )

  useEffect(() => {
    const _ticker = setInterval(() => {
      setCurrentPage(window.location.pathname || '/')
    }, delay)
    setTicker(_ticker)

    return () => {
      if (ticker) {
        clearInterval(ticker)
      }
    }
  }, [])

  return [currentPage]
}

export default useCurrentPage
