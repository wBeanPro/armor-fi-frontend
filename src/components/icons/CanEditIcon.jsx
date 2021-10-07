import React from 'react'

const CanEditIcon = ({ color }) => {
  return (
    <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 3.5C17.2626 3.23735 17.5744 3.02901 17.9176 2.88687C18.2608 2.74473 18.6286 2.67157 19 2.67157C19.3714 2.67157 19.7392 2.74473 20.0824 2.88687C20.4256 3.02901 20.7374 3.23735 21 3.5C21.2626 3.76264 21.471 4.07444 21.6131 4.4176C21.7553 4.76077 21.8284 5.12856 21.8284 5.5C21.8284 5.87143 21.7553 6.23923 21.6131 6.58239C21.471 6.92555 21.2626 7.23735 21 7.5L7.5 21L2 22.5L3.5 17L17 3.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CanEditIcon
