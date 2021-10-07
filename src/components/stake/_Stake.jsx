import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import styles from './_styles'
import GET_MOCK_DATA from './mock'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import UploadIcon from '../icons/UploadIcon'
import PresentIcon from '../icons/PresentIcon'
import LoadingSpinner from '../loader/LoadingSpinner'

const STAKED_SYMBOL = 'yNFT'
const UNSTAKED_SYMBOL = 'yNFT'

const Stake = ({ classes, theme }) => {
  const [overviewStakedData, setOverviewStakedData] = useState([])
  const [overviewUnStakedData, setOverviewUnStakedData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = theme

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const { error, data } = await GET_MOCK_DATA() // TODO: REMOVE MOCKED DATA BEFORE RELEASE
      if (error) {
        console.error(error)
      } else {
        setOverviewStakedData(data.staked)
        setOverviewUnStakedData(data.unStaked)
      }
      setIsLoading(false)
    })()
  }, [])

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1">
        Stake
      </Typography>
      <div className={classes.mainBox}>
        <Typography className={classes.subTitle} variant="h4">
          Rewards available!
        </Typography>
        <Typography className={classes.info} variant="h6">
          106.22 ARMOR
        </Typography>
        <div className={classes.actionContainer}>
          <Button variant="contained" className={classes.actionButton}>
            <Typography className={classes.buttonText} variant="h5">
              WITHDRAW <UploadIcon color={colors.active} />
            </Typography>
          </Button>
        </div>
        <div className={classes.bgIconPrimary}>
          <PresentIcon color={colors.activeBorder} width="116" height="116" />
        </div>
        <div className={classes.bgIconSecondary}>
          <PresentIcon color={colors.activeBorder} width="52" height="52" />
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Typography className={classes.stakedSymbol} variant="h4">
            Staked {STAKED_SYMBOL}
          </Typography>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.rowHead}>
                  <TableCell className={classes.tableTitle} align="left">
                    Asset
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    Amount
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    Expiration
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    Cost
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    Reward
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    APY
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {overviewStakedData.map((r, rIndex) => (
                  <TableRow key={rIndex} className={classes.row}>
                    <TableCell align="left" className={classes.assetsLogo}>
                      <img
                        src={require(`../../assets/${r.logo}.png`)}
                        alt="asset icon"
                        height="24px"
                      />
                      <Typography className={classes.assetsTitle} variant="h5">
                        {r.name}
                      </Typography>
                    </TableCell>
                    {r.info.map((d, i) => (
                      <TableCell key={i} className={classes.cell} align="right">
                        {d.value === 'EXPIRED' ? (
                          <Typography
                            className={classes.textExpired}
                            variant="h5"
                          >
                            {d.value}
                          </Typography>
                        ) : d.value === '' ? (
                          '...'
                        ) : (
                          d.value
                        )}{' '}
                        {d.symbol}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography className={classes.stakedSymbol} variant="h4">
            Unstaked {UNSTAKED_SYMBOL}
          </Typography>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.rowHead}>
                  <TableCell className={classes.tableTitle} align="left">
                    Asset
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    Amount
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    Expiration
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    Cost
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    Reward
                  </TableCell>
                  <TableCell className={classes.tableTitle} align="right">
                    APY
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {overviewUnStakedData.map((r, rIndex) => (
                  <TableRow key={rIndex} className={classes.row}>
                    <TableCell align="left" className={classes.assetsLogo}>
                      <img
                        src={require(`../../assets/${r.logo}.png`)}
                        alt="asset icon"
                        height="24px"
                      />
                      <Typography className={classes.assetsTitle} variant="h5">
                        {r.name}
                      </Typography>
                    </TableCell>
                    {r.info.map((d, i) => (
                      <TableCell key={i} className={classes.cell} align="right">
                        {d.value === 'EXPIRED' ? (
                          <Typography
                            className={classes.textExpired}
                            variant="h5"
                          >
                            {d.value}
                          </Typography>
                        ) : d.value === '' ? (
                          '...'
                        ) : (
                          d.value
                        )}{' '}
                        {d.symbol}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  )
}

export default withRouter(withStyles(styles, { withTheme: true })(Stake))
