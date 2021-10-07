import React from 'react'

const ArrowRightIcon = ({ color }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 12C4.5 11.4477 4.94772 11 5.5 11H19.5C20.0523 11 20.5 11.4477 20.5 12C20.5 12.5523 20.0523 13 19.5 13H5.5C4.94772 13 4.5 12.5523 4.5 12Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7929 4.29289C12.1834 3.90237 12.8166 3.90237 13.2071 4.29289L20.2071 11.2929C20.5976 11.6834 20.5976 12.3166 20.2071 12.7071L13.2071 19.7071C12.8166 20.0976 12.1834 20.0976 11.7929 19.7071C11.4024 19.3166 11.4024 18.6834 11.7929 18.2929L18.0858 12L11.7929 5.70711C11.4024 5.31658 11.4024 4.68342 11.7929 4.29289Z"
        fill={color}
      />
    </svg>
  )
}

export default ArrowRightIcon
