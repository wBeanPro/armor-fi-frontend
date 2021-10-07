import React from 'react'
import { AlertTitle, AlertStyled, Text } from './styled'

const Alert = ({ title, severity, text, mint, ...props }) => {
  return (
    <AlertStyled mint={mint} severity={severity} {...props}>
      <AlertTitle>
        <span
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      </AlertTitle>
      <Text
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </AlertStyled>
  )
}

export default Alert
