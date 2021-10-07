import React from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Cell, TitleWrapper } from './styled'
import ArrowIcon from '../icons/ArrowIcon'

const Sortbar = ({
  theme,
  t,
  sortedBy,
  handleClickSortBy,
  sortedDirection,
}) => {
  const { colors } = theme

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <Cell
            showarrow={sortedBy === 'name' ? 1 : 0}
            onClick={() => handleClickSortBy('name')}
          >
            <TitleWrapper transform={sortedDirection}>
              {t('Rewards.Name')}
              <ArrowIcon color={colors.secondary} />
            </TitleWrapper>
          </Cell>
          <Cell
            showarrow={sortedBy === 'exchange' ? 1 : 0}
            onClick={() => handleClickSortBy('exchange')}
          >
            <TitleWrapper transform={sortedDirection}>
              {t('Rewards.Exchange')}
              <ArrowIcon color={colors.secondary} />
            </TitleWrapper>
          </Cell>
          <Cell
            showarrow={sortedBy === 'apy' ? 1 : 0}
            onClick={() => handleClickSortBy('apy')}
          >
            <TitleWrapper transform={sortedDirection}>
              APY
              <ArrowIcon color={colors.secondary} />
            </TitleWrapper>
          </Cell>
          <Cell></Cell>
        </TableRow>
      </TableHead>
    </Table>
  )
}

export default withTranslation()(withRouter(withTheme(Sortbar)))
