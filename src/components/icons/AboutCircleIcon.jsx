import React from 'react'

const AboutCircleIcon = ({ color }) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00033 2.00001C4.68662 2.00001 2.00033 4.6863 2.00033 8C2.00033 11.3137 4.68662 14 8.00033 14C11.314 14 14.0003 11.3137 14.0003 8C14.0003 4.6863 11.314 2.00001 8.00033 2.00001ZM0.666992 8C0.666992 3.94992 3.95024 0.666672 8.00033 0.666672C12.0504 0.666672 15.3337 3.94992 15.3337 8C15.3337 12.0501 12.0504 15.3333 8.00033 15.3333C3.95024 15.3333 0.666992 12.0501 0.666992 8Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.33301 11.3333C7.33301 10.9651 7.63148 10.6667 7.99967 10.6667H8.00634C8.37453 10.6667 8.67301 10.9651 8.67301 11.3333C8.67301 11.7015 8.37453 12 8.00634 12H7.99967C7.63148 12 7.33301 11.7015 7.33301 11.3333Z"
        fill={color}
      />
      <rect
        x="7.33301"
        y="4"
        width="1.33333"
        height="5.33333"
        rx="0.666667"
        fill={color}
      />
    </svg>
  )
}

export default AboutCircleIcon