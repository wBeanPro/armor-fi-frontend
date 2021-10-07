import React from 'react'

const GovernIcon = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.12132 9.48528L11.6569 13.0208L18.0208 6.65686L14.4853 3.12132L8.12132 9.48528ZM6.70711 8.77818C6.31658 9.1687 6.31658 9.80187 6.70711 10.1924L10.9497 14.435C11.3403 14.8256 11.9734 14.8256 12.364 14.435L19.435 7.36396C19.8256 6.97344 19.8256 6.34027 19.435 5.94975L15.1924 1.70711C14.8019 1.31658 14.1687 1.31658 13.7782 1.70711L6.70711 8.77818Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 18.5H4.5V20.5H19.5V18.5ZM3 17V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V17H3Z"
        fill={color}
      />
      <path
        d="M3 16.9498L7 13L8.01211 14.059L4.06066 18.0104L3 16.9498Z"
        fill={color}
      />
      <path
        d="M19.9514 18.0121L16 14.0606L17 13L21.0121 16.9514L19.9514 18.0121Z"
        fill={color}
      />
      <path d="M17 14.5L15 14.5L17 13V14.5Z" fill={color} />
      <path d="M9 14.5L7 14.5V13L9 14.5Z" fill={color} />
    </svg>
  )
}

export default GovernIcon
