import {
  ActionCell,
  ActionWrapper,
  AssetLogo,
  AssetsCell,
  AssetsName,
  AssetTitle,
  AssetWrapper,
  Cell,
  CropSpan,
  Row,
  TableContainerStyled,
  TableStyled,
  TableStyledWrapper,
  TableTitle,
  TitleTooltipWrapper,
  TooltipSpan,
} from './styled'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TooltipGuide from '../../../common/tooltipGuide/TooltipGuide'
import AboutInfoIcon from '../../../icons/AboutInfoIcon'
import TableBody from '@material-ui/core/TableBody'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '../../../common/button/Button'
import React from 'react'
import { commas } from '../../../../helpers'

const ShieldsTable = ({
  children,
  theme,
  title,
  currentCoverage,
  maxCoverage,
}) => {
  const { colors } = theme

  return (
    <TableContainerStyled component={Paper}>
      <TableStyledWrapper>
        <TableStyled aria-label="simple table">
          <TableHead>
            <TableRow>
              <AssetTitle>Asset</AssetTitle>
              <TableTitle align="right">Holdings</TableTitle>
              <TableTitle align="right">Cost</TableTitle>
              <TableTitle align="right">Shield Assets</TableTitle>
              {/*<TableTitle align="right">APY</TableTitle>*/}
              <TableTitle align="right">Available to deposit</TableTitle>
              <TableTitle align="right">
                <TitleTooltipWrapper>
                  Coverage: {commas(2).format(currentCoverage)} ETH/
                  {commas(2).format(maxCoverage)} ETH
                  <TooltipGuide
                    text={`This protocol currently has ${commas(2).format(
                      currentCoverage
                    )} ETH in cover and ${commas(2).format(
                      maxCoverage
                    )} ETH in arShield deposits. Users will be paid back 100% of their loss up to the covered amount if a hack occurs. If the arShields suffer a combined loss greater than the covered amount, that coverage amount will be split pro rata between all affected shields/users.`}
                  >
                    <TooltipSpan>
                      <AboutInfoIcon color={colors.disabledText} />
                    </TooltipSpan>
                  </TooltipGuide>
                </TitleTooltipWrapper>
              </TableTitle>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </TableStyled>
      </TableStyledWrapper>
    </TableContainerStyled>
  )
}

export default ShieldsTable
