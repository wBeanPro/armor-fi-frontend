import React from 'react'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import AboutInfoIcon from '../../icons/AboutInfoIcon'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import { eightDigitFormatter } from '../../../helpers'
import TooltipGuide from '../../tooltipGuide/TooltipGuide'

import {
  Container,
  Header,
  Title,
  TitleText,
  TableContainerStyled,
  TableStyledWrapper,
  TableStyled,
  TableTitle,
  Row,
  Cell,
  AssetsTitle,
  AssetsLogo,
  NoAssetsTableRow,
  Bold,
  AssetLogoImg,
  Ticker,
  AssetsName,
  SpanValue,
  FirstHeadCell,
  TooltipSpan,
} from './styled'

const AssetsNotAvailable = ({
  t,
  theme,
  overviewDataArr,
  manuallyAddedProtocols,
}) => {
  const { colors } = theme

  const dataArr = [...overviewDataArr, ...manuallyAddedProtocols]

  const NoAssetsRow = () => {
    return (
      <NoAssetsTableRow>
        {t('Protect.AssetsNotAvailable.NoAssets')}
      </NoAssetsTableRow>
    )
  }

  return (
    <Container>
      <Header>
        <Title>
          <TitleText>{t('Protect.AssetsNotAvailable.Title')}</TitleText>
          <TooltipGuide text={t('Protect.AssetsNotAvailable.Tooltip')}>
            <TooltipSpan>
              <AboutInfoIcon color={colors.disabledText} />
            </TooltipSpan>
          </TooltipGuide>
        </Title>
      </Header>
      <TableContainerStyled component={Paper}>
        <TableStyledWrapper>
          <TableStyled aria-label="simple table">
            <TableHead>
              <TableRow>
                <FirstHeadCell align="left">
                  {t('Protect.AssetsNotAvailable.Protocol')}
                </FirstHeadCell>
                <TableTitle>
                  {t('Protect.AssetsNotAvailable.Amount')}
                </TableTitle>
                <TableTitle>
                  {t('Protect.AssetsNotAvailable.Value')} <Bold>ETH</Bold> / $
                </TableTitle>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataArr.map((d, i) => {
                return (
                  <Row key={i}>
                    <AssetsLogo
                      align="left"
                      onClick={() =>
                        window.open(
                          `https://etherscan.io/address/${d.address}`,
                          '_blank'
                        )
                      }
                    >
                      <AssetLogoImg
                        src={d.logo ? require(`../../../assets/${d.logo}`) : ''}
                        alt="asset icon"
                      />
                      <AssetsTitle>
                        <AssetsName>{d.name}</AssetsName>
                        <Ticker>{d.symbol}</Ticker>
                      </AssetsTitle>
                    </AssetsLogo>
                    <Cell>0</Cell>
                    <Cell>
                      {d.tokenValueEth &&
                        `${eightDigitFormatter.format(d.tokenValueEth)} ETH`}
                      <SpanValue>/ $0</SpanValue>
                    </Cell>
                  </Row>
                )
              })}
            </TableBody>
          </TableStyled>
        </TableStyledWrapper>
        {overviewDataArr.length === 0 &&
          manuallyAddedProtocols.length === 0 && <NoAssetsRow />}
      </TableContainerStyled>
    </Container>
  )
}

export default withTranslation()(withTheme(AssetsNotAvailable))
