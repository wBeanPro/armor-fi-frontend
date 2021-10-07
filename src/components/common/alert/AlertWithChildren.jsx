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
      <Text>{props.children}</Text>
    </AlertStyled>
  )
}

export default Alert
