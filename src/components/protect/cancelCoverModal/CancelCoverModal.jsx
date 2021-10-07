import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { threeDigitFormatter } from '../../../helpers'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import {
  ModalTitle,
  ActiveBtn,
  ActiveBtnText,
  Container,
  CancelButton,
  ContentContainer,
  DescriptionText,
  CancelActiveBtn,
  AssetTitle,
  TableContainerStyled,
  TableStyledWrapper,
  TableStyled,
  TableTitle,
  Row,
  AssetsLogo,
  AssetWrapper,
  AssetLogoImg,
  AssetsTitle,
  AssetsName,
  Cell,
  SpanValue,
  AssetTableWrapper,
} from './styled'
import {
  countDecimals,
  eightDigitFormatter,
  formatETH,
  formatUSD,
} from '../../../helpers'
import AvailableWalletInfo from '../../common/availableWalletInfo/AvailableWalletInfo'

const CancelCoverModal = ({
  t,
  theme,
  closeModal,
  handleSubmit,
  handleCancelAndWithdraw,
  arcoreBalance,
  selectedAssets,
  isSelectedAll,
  ethPrice,
  isUsdPrimary,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const { colors } = theme

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const handleClickCancel = () => {
    handleSubmit()
    handleCloseModal()
  }

  const handleClickCancelAndWithdraw = () => {
    handleCancelAndWithdraw()
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsLoading(false)
    closeModal()
  }

  return (
    <>
      <Container>
        <ContentContainer>
          {isSelectedAll ? (
            <>
              <ModalTitle>
                {t('Protect.CancelCoverModal.CancelAll.Title')}
                <br />
                {t('Protect.CancelCoverModal.CancelAll.Subtitle')}
              </ModalTitle>
              <DescriptionText>
                {t('Protect.CancelCoverModal.CancelAll.Text')}
              </DescriptionText>
            </>
          ) : (
            <>
              <ModalTitle>
                {t('Protect.CancelCoverModal.CancelSelected.Title')}
                <br />
                {t('Protect.CancelCoverModal.CancelSelected.Subtitle')}
              </ModalTitle>
              <DescriptionText>
                {t('Protect.CancelCoverModal.CancelSelected.Text')}
              </DescriptionText>
            </>
          )}
          <AssetTableWrapper>
            <AssetTitle>Selected assets:</AssetTitle>
            <TableContainerStyled component={Paper}>
              <TableStyledWrapper>
                <TableStyled aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableTitle align="left">Asset</TableTitle>
                      <TableTitle align="left">
                        Value: {isUsdPrimary ? '$USD / $ETH' : '$ETH / $USD'}
                      </TableTitle>
                      <TableTitle align="left">% Costs / year</TableTitle>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedAssets.map((a, i) => {
                      let balances = [
                        formatETH(a.balance.eth, { digits: 4 }),
                        formatUSD(a.balance.usd, { digits: 2 }),
                      ]
                      if (isUsdPrimary) balances.reverse()
                      return (
                        <Row key={i}>
                          <AssetsLogo
                            align="left"
                            onClick={() =>
                              window.open(
                                `https://etherscan.io/address/${a.address}`,
                                '_blank'
                              )
                            }
                          >
                            <AssetWrapper>
                              <AssetLogoImg
                                src={
                                  a.icon
                                    ? require(`../../../assets/${a.icon}`)
                                    : ''
                                }
                                alt="asset icon"
                              />
                              <AssetsTitle>
                                <AssetsName>{a.name}</AssetsName>
                              </AssetsTitle>
                            </AssetWrapper>
                          </AssetsLogo>
                          <Cell>
                            {balances.map((val, i) => {
                              if (i === 0) {
                                return (
                                  <React.Fragment key={i}>{val}</React.Fragment>
                                )
                              } else {
                                return (
                                  <React.Fragment key={i}>
                                    <br />
                                    <SpanValue>{val}</SpanValue>
                                  </React.Fragment>
                                )
                              }
                            })}
                          </Cell>
                          <Cell>
                            {parseFloat(a.pricePerYearPercent).toFixed(2)}%
                          </Cell>
                        </Row>
                      )
                    })}
                  </TableBody>
                </TableStyled>
              </TableStyledWrapper>
            </TableContainerStyled>
          </AssetTableWrapper>
          {isSelectedAll ? (
            <>
              <ActiveBtn
                variant="contained"
                color="primary"
                disabled={isLoading || selectedAssets.length === 0}
                onClick={handleClickCancel}
              >
                <ActiveBtnText>
                  {t('Protect.CancelCoverModal.CancelAll')}
                </ActiveBtnText>
              </ActiveBtn>
              <CancelActiveBtn
                style={{ cursor: 'pointer' }}
                onClick={handleClickCancelAndWithdraw}
              >
                {t('Protect.CancelCoverModal.CancelAndWithdraw')}
              </CancelActiveBtn>
            </>
          ) : (
            <ActiveBtn
              variant="contained"
              color="primary"
              disabled={isLoading || selectedAssets.length === 0}
              onClick={handleClickCancel}
            >
              <ActiveBtnText>
                {t('Protect.CancelCoverModal.CancelSelected')}
              </ActiveBtnText>
            </ActiveBtn>
          )}
        </ContentContainer>
        <AvailableWalletInfo
          text={`${t('Protect.CancelCoverModal.ArcoreBalanceEth')}:`}
          value={`${threeDigitFormatter.format(arcoreBalance)} ETH`}
        />
      </Container>
      <CancelButton onClick={handleCloseModal}>
        {t('Protect.CancelCoverModal.Nevermind')}
      </CancelButton>
    </>
  )
}

export default withTranslation()(withRouter(withTheme(CancelCoverModal)))
