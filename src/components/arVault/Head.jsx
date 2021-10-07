import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { Head, Cell, Text } from './styled'

const data = [
  {
    title: 'Pool',
  },
  {
    title: 'Yield per $1,000',
  },
  {
    title: 'ROI',
  },
  {
    title: 'Underlying tokens',
  },
  {
    title: 'Balance',
  },
  {
    title: 'Earnings',
  },
]

const HeadComponent = () => {
  return (
    <Head>
      {data.map(({ title }, i) => (
        <Cell key={i}>
          <Text>{title}</Text>
        </Cell>
      ))}
      <Cell />
    </Head>
  )
}

export default withTranslation()(withRouter(withTheme(HeadComponent)))
