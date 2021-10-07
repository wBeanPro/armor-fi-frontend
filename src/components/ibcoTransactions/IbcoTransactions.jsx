import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import LoadingSpinner from '../loader/LoadingSpinner'
import ExternalLinkIcon from '../icons/ExternalLinkIcon'
import { withTranslation } from 'react-i18next'
import {
  Container,
  TitleStyled,
  TableContainer,
  TableHead,
  HeadTitel,
  TableBody,
  CellCount,
  CellAmount,
  CellAddress,
  LoadingContainer,
  TableFooter,
  AmountPercent,
  ExternalContainer,
} from './styled'

const IbcoTransactions = ({
  history,
  transactions,
  isLoading,
  goalEth,
  t,
  theme,
}) => {
  const ROWS_PER_PAGE = 5
  const [page, setPage] = useState(0)
  const { colors } = theme

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Container>
      <TitleStyled>{t('Ibco.TransactionList.Title')}</TitleStyled>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <HeadTitel>#</HeadTitel>
              <HeadTitel>{t('Ibco.TransactionList.Amount')}</HeadTitel>
              <HeadTitel>{t('Ibco.TransactionList.Address')}</HeadTitel>
              <HeadTitel>{t('Ibco.TransactionList.Transaction')}</HeadTitel>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              transactions
                .slice(
                  page * ROWS_PER_PAGE,
                  page * ROWS_PER_PAGE + ROWS_PER_PAGE
                )
                .map((t, i) => (
                  <TableRow key={i}>
                    <CellCount component="th" scope="row">
                      {i + 1}
                    </CellCount>
                    <CellAmount>
                      {t.amount} ETH
                      <AmountPercent>
                        {((t.amount / goalEth) * 100).toFixed(3)}%
                      </AmountPercent>
                    </CellAmount>
                    <TableCell>
                      <CellAddress
                        href={`https://etherscan.io/address/${t.address}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{t.address}</span>
                        <ExternalContainer>
                          <ExternalLinkIcon color={colors.disabledText} />
                        </ExternalContainer>
                      </CellAddress>
                    </TableCell>
                    <TableCell>
                      <CellAddress
                        underline
                        href={`https://etherscan.io/tx/${t.transactionId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{t.transactionId}</span>
                        <ExternalContainer>
                          <ExternalLinkIcon color={colors.disabledText} />
                        </ExternalContainer>
                      </CellAddress>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10]}
            count={transactions.length}
            rowsPerPage={ROWS_PER_PAGE}
            page={page}
            onChangePage={handleChangePage}
            labelDisplayedRows={({ from, to, count }) =>
              `${t('Ibco.TransactionList.Page')} ${page + 1}/${Math.ceil(
                transactions.length / 5
              )}`
            }
          />
        </TableRow>
      </TableFooter>
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(IbcoTransactions)))
