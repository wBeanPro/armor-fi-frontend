import React from 'react'
import { withRouter } from 'react-router-dom'
import { uglifyAddress, formatETH } from '../../helpers'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ArrowIcon from '../icons/ArrowIcon'
import {
  Cell,
  TableBox,
  TableStats,
  TableValue,
  Name,
  TableFooterRow,
  FooterTotal,
  TableDivider,
  Logo,
  TitleWrapper,
} from './tableStyled'

const StatsTable = ({
  theme,
  data,
  t,
  sortBy,
  handleClickSortBy,
  sortDirection,
}) => {
  const [dataArr, totalObj] = data
  const { colors } = theme

  return (
    <TableBox>
      <TableStats component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <Cell
                showarrow={sortBy === 'name' ? 1 : 0}
                onClick={() => handleClickSortBy('name')}
              >
                <TitleWrapper transform={sortDirection}>
                  {t('Stats.Table.Contract')}
                  <ArrowIcon color={colors.secondary} />
                </TitleWrapper>
              </Cell>
              <Cell
                showarrow={sortBy === 'tokenEther' ? 1 : 0}
                onClick={() => handleClickSortBy('tokenEther')}
              >
                <TitleWrapper transform={sortDirection}>
                  ETH {t('Stats.Table.Covered')}
                  <ArrowIcon color={colors.secondary} />
                </TitleWrapper>
              </Cell>
              <Cell
                showarrow={sortBy === 'tokenDai' ? 1 : 0}
                onClick={() => handleClickSortBy('tokenDai')}
              >
                <TitleWrapper transform={sortDirection}>
                  DAI {t('Stats.Table.Covered')}
                  <ArrowIcon color={colors.secondary} />
                </TitleWrapper>
              </Cell>
              <Cell
                capitalize="true"
                showarrow={sortBy === 'covers' ? 1 : 0}
                onClick={() => handleClickSortBy('covers')}
              >
                <TitleWrapper transform={sortDirection}>
                  {t('Stats.Table.Covers')}
                  <ArrowIcon color={colors.secondary} />
                </TitleWrapper>
              </Cell>
              <Cell
                capitalize="true"
                showarrow={sortBy === 'coverAvailable' ? 1 : 0}
                onClick={() => handleClickSortBy('coverAvailable')}
              >
                <TitleWrapper transform={sortDirection}>
                  Cover available
                  <ArrowIcon color={colors.secondary} />
                </TitleWrapper>
              </Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataArr.map((d, i) => (
              <TableRow key={i + +new Date()}>
                <Name component="th" scope="row">
                  {d.name !== 'Total' ? (
                    <a
                      href={`https://etherscan.io/address/${d.contract}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={d.name}
                    >
                      {d.logo && (
                        <Logo
                          src={require(`../../assets/${d.logo}`)}
                          alt="asset icon"
                        />
                      )}
                      {d.name && d.name.length < 24
                        ? d.name
                        : uglifyAddress(d.name)}
                    </a>
                  ) : (
                    <span>{d.name}</span>
                  )}
                </Name>
                <TableValue noactive={parseFloat(d.tokenEther) <= 0 ? 1 : 0}>
                  {d.tokenEther} ETH
                </TableValue>
                <TableValue noactive={parseFloat(d.tokenDai) <= 0 ? 1 : 0}>
                  {d.tokenDai} DAI
                </TableValue>
                <TableValue noactive={parseFloat(d.covers) <= 0 ? 1 : 0}>
                  {d.covers}{' '}
                  {d.covers === 1
                    ? t('Stats.Table.Cover')
                    : t('Stats.Table.Covers')}
                </TableValue>
                <TableValue
                  noactive={
                    !d.coverAvailable || parseFloat(d.coverAvailable) <= 0
                      ? 1
                      : 0
                  }
                >
                  {formatETH(d.coverAvailable || 0, {
                    compact: true,
                    digits: 2,
                  })}
                </TableValue>
              </TableRow>
            ))}
            <TableDivider />
            <TableFooterRow>
              <FooterTotal component="th" scope="row">
                <span>{totalObj.name}</span>
              </FooterTotal>
              <TableValue>{totalObj.tokenETH} ETH</TableValue>
              <TableValue>{totalObj.tokenDai} DAI</TableValue>
              <TableValue>
                {totalObj.covers}{' '}
                {totalObj.covers === 1
                  ? t('Stats.Table.Cover')
                  : t('Stats.Table.Covers')}
              </TableValue>
              <TableValue>
                {formatETH(totalObj.coverAvailable || 0, {
                  compact: true,
                  digits: 2,
                })}
              </TableValue>
            </TableFooterRow>
          </TableBody>
        </Table>
      </TableStats>
    </TableBox>
  )
}

export default withTranslation()(withRouter(withTheme(StatsTable)))
