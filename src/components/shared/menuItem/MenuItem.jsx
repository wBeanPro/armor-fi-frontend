import React from 'react'
import { Link } from './styled'

const MenuItem = ({
  text,
  isCurrentPage = false,
  isBlurred = false,
  onClick,
}) => (
  <Link
    isBlurred={isBlurred}
    isCurrentPage={isCurrentPage}
    onClick={!isBlurred ? onClick : null}
  >
    {text}
  </Link>
)

export default MenuItem
