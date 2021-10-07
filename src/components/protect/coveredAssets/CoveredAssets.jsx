import React, { useState } from 'react'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import AboutCircleIcon from '../../icons/AboutCircleIcon'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import {
  commas,
  eightDigitFormatter,
  countDecimals,
  formatETH,
  formatUSD,
} from '../../../helpers'
import MCircleIcon from '../../icons/MCircleIcon'
import Tooltip from '@material-ui/core/Tooltip'
import CoveredIcon from '../../icons/CoveredIcon'
import CheckCircleIcon from '../../icons/CheckCircleIcon'
import AboutInfoIcon from '../../icons/AboutInfoIcon'
import TooltipGuide from '../../common/tooltipGuide/TooltipGuide'
import Button from '../../common/button/Button'

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
  ActionCell,
  NoAssetsTableRow,
  CoverButton,
  AssetCheckbox,
  CheckboxLabel,
  CheckboxCell,
  Checkmark,
  AssetTitle,
  AssetLogoImg,
  AssetsName,
  FooterInfo,
  FooterInfoText,
  ActionWrapper,
  TooltipSpan,
  CoveredIconWrapper,
  CoveredCell,
  SpanValue,
  AssetWrapper,
  CheckboxTitle,
  FlexTableTitle,
  CropSpan,
  ActionButtonWrapper,
  WarningIconWrapper,
} from './styled'
import CanEditIcon from '../../icons/CanEditIcon'
import WarningInfoIcon from '../../icons/WarningInfoicon'
import UpdateIcon from '../../icons/UpdateIcon'
import { toWei } from 'web3-utils'

const CoveredAssets = ({
  t,
  theme,
  covers,
  onCancelArr,
  onUpdateArr,
  onUpdateSelectedArr,
  setEditManuallyAddedValue,
  isFullyCovered,
  openEditModal,
  availableCoverage,
  ethPrice,
  isUsdPrimary,
}) => {
  const [isCheckedArr, setIsCheckedArr] = useState([])
  const [canUpdate, setCanUpdate] = useState(true)
  const [currentlyEditableValue, setCurrentlyEditableValue] = useState(null)

  const { colors } = theme

  const dataArr = [...covers]

  const NoAssetsRow = () => {
    return (
      <NoAssetsTableRow>{t('Protect.CoveredAssets.NoAssets')}</NoAssetsTableRow>
    )
  }

  const handleToggleAsset = (obj) => {
    const searchAddress = obj.address.toLowerCase()
    const found = isCheckedArr.find((el) => {
      return el.address.toLowerCase() === searchAddress
    })
    if (!found) {
      const newCheckedArr = isCheckedArr.concat(obj)
      setIsCheckedArr(newCheckedArr)
    } else {
      const filteredArr = isCheckedArr.filter(
        (el) => el.address.toLowerCase() !== searchAddress
      )

      setIsCheckedArr(filteredArr)
    }
  }

  const shouldAssetBeChecked = (obj) => {
    const searchAddress = obj.address.toLowerCase()
    const found = isCheckedArr.find((el) => {
      return el.address.toLowerCase() === searchAddress
    })
    return !!found
  }

  const handleClickCancelSelected = () => {
    onCancelArr(isCheckedArr)
  }

  const handleClickEditValue = (data) => {
    setCurrentlyEditableValue(data)
    setEditManuallyAddedValue(data)
    openEditModal()
  }

  const handleUpdateSelected = () => {
    isCheckedArr.forEach((p, index) => {
      if (parseFloat(p.balance.eth) > parseFloat(p.availability.eth)) {
        let availability = Math.floor(parseFloat(p.availability.eth))
        isCheckedArr[index].balance.eth = availability
        isCheckedArr[index].balance.wei = toWei(availability.toString())
      }
    })

    onUpdateSelectedArr(isCheckedArr)
  }

  const handleUpdateIndividualProtocol = (protocol) => {
    if (
      parseFloat(protocol.balance.eth) > parseFloat(protocol.availability.eth)
    ) {
      protocol.balance.eth = protocol.availability.eth
      protocol.balance.wei = toWei(protocol.availability.eth)
    }

    onUpdateSelectedArr([protocol])
  }

  const handleClickCancelAll = () => {
    onCancelArr(dataArr)
  }

  const handleUpdateAll = () => {
    const protocolsWithAvailableCoverage = dataArr.filter(
      (x) => x.availability.eth > 0
    )

    protocolsWithAvailableCoverage.forEach((p, index) => {
      if (
        parseFloat(protocolsWithAvailableCoverage[index].balance.eth) >
        parseFloat(p.availability.eth)
      ) {
        let availability = Math.floor(parseFloat(p.availability.eth))
        protocolsWithAvailableCoverage[index].balance.eth = availability
        protocolsWithAvailableCoverage[index].balance.wei = toWei(
          availability.toString()
        )
        // protocolsWithAvailableCoverage[index].balance.eth = availability
        // protocolsWithAvailableCoverage[index].balance.wei = toWei(
        //   availability.toString()
        // )
      }
    })

    onUpdateArr(protocolsWithAvailableCoverage)
  }

  const shouldAllAssetBeChecked = () => {
    if (dataArr.length >= 1) {
      return dataArr.length === isCheckedArr.length ? true : false
    } else {
      return false
    }
  }

  const handleToggleAllAsset = () => {
    if (dataArr.length >= 1) {
      isCheckedArr.length !== dataArr.length
        ? setIsCheckedArr(dataArr)
        : setIsCheckedArr([])
    }
  }

  const getCoverAvailable = (_address) => {
    const _protocol = availableCoverage.find(
      (p) => p.address.toLowerCase() === _address.toLowerCase()
    )

    if (_protocol && _protocol.coverage_left > 0) {
      return _protocol.coverage_left.toString()
    } else {
      return '0'
    }
  }

  const availableCoveragePercentage = (d) => {
    const coverageAvailable = parseFloat(getCoverAvailable(d.address))
    if (coverageAvailable === 0) return 0
    if (coverageAvailable > parseFloat(d.balance.eth)) {
      return 100
    }

    let balanceCoverDiff =
      parseFloat(d.balance.eth) - parseFloat(d.coverage.eth)

    const left = balanceCoverDiff - coverageAvailable
    return commas(0).format(100 - (left / balanceCoverDiff) * 100)
  }

  const hasNoCoverageAvailable = (d) => {
    return parseFloat(getCoverAvailable(d.address)) === 0
  }

  const hasNotEnoughCoverageAvailable = (d) => {
    const coverageAvailable = parseFloat(getCoverAvailable(d.address))
    if (coverageAvailable === 0) return false

    let balanceCoverDiff =
      parseFloat(d.balance.eth) - parseFloat(d.coverage.eth)
    return coverageAvailable < balanceCoverDiff
  }

  return (
    <Container>
      <Header>
        <Title>
          <CoveredIconWrapper>
            <CoveredIcon color={colors.primaryDefault} />
          </CoveredIconWrapper>
          <TitleText>{t('Protect.CoveredAssets.Title')}</TitleText>
          <TooltipGuide text={t('Protect.CoveredAssets.Title.Tooltip')}>
            <TooltipSpan>
              <AboutInfoIcon color={colors.disabledText} />
            </TooltipSpan>
          </TooltipGuide>
        </Title>
        <ActionWrapper>
          {isCheckedArr.length === 0 || covers.length === 0 ? (
            <>
              <Button
                buttonText={t('Protect.CancelAll')}
                isDisabled={covers.length === 0}
                tooltipText={t('Protect.CoveredAssets.CancelAll.Tooltip')}
                onClick={handleClickCancelAll}
                bordered={true}
                margin="0 16px 0 0"
              />
              <Button
                buttonText={t('Protect.UpdateAll')}
                isDisabled={isFullyCovered || covers.length === 0}
                tooltipText={t('Protect.CoveredAssets.UpdateAll.Tooltip')}
                onClick={handleUpdateAll}
                bordered={false}
                margin="0"
              />
            </>
          ) : (
            <>
              <Button
                buttonText={`${t('Protect.CancelSelected')} ${
                  isCheckedArr.length > 0 && `(${isCheckedArr.length})`
                }`}
                isDisabled={covers.length === 0}
                tooltipText={t('Protect.CoveredAssets.CancelSelected.Tooltip')}
                onClick={handleClickCancelSelected}
                bordered={true}
                margin="0 16px 0 0"
              />
              <Button
                buttonText={`${t('Protect.UpdateSelected')} ${
                  isCheckedArr.length > 0 && `(${isCheckedArr.length})`
                }`}
                isDisabled={covers.length === 0}
                tooltipText={t('Protect.CoveredAssets.UpdateSelected.Tooltip')}
                onClick={handleUpdateSelected}
                bordered={false}
                margin="0"
              />
            </>
          )}
        </ActionWrapper>
      </Header>
      <TableContainerStyled component={Paper}>
        <TableStyledWrapper>
          <TableStyled aria-label="simple table">
            <TableHead>
              <TableRow>
                <CheckboxTitle align="left">
                  <CheckboxLabel
                    control={
                      <>
                        <AssetCheckbox
                          isnotempty={isCheckedArr.length >= 1 ? 1 : 0}
                          checked={shouldAllAssetBeChecked()}
                          onChange={handleToggleAllAsset}
                          color="primary"
                          name="AllAssets"
                        />
                        <Checkmark />
                      </>
                    }
                  />
                </CheckboxTitle>
                <AssetTitle align="left">
                  {t('Protect.CoveredAssets.Asset')}
                </AssetTitle>
                {/* <TableTitle>{t('Protect.CoveredAssets.Amount')}</TableTitle> */}
                <TableTitle align="right">
                  Value: {isUsdPrimary ? '$USD / $ETH' : '$ETH / $USD'}
                </TableTitle>
                <TableTitle>% Costs / year</TableTitle>
                <TableTitle>
                  {t('Protect.CoveredAssets.InsuredValue')}
                </TableTitle>
                <TableTitle>
                  <FlexTableTitle>
                    {t('Protect.CoveredAssets.Coverage')}
                    <TooltipGuide
                      text={t('Protect.CoveredAssets.Coverage.Tooltip')}
                    >
                      <TooltipSpan>
                        <AboutInfoIcon color={colors.disabledText} />
                      </TooltipSpan>
                    </TooltipGuide>
                  </FlexTableTitle>
                </TableTitle>
                <TableTitle>Available cover</TableTitle>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataArr.map((d, i) => {
                let balances = [
                  formatETH(d.balance.eth, { compact: true, digits: 2 }),
                  formatUSD(d.balance.usd, { compact: true, digits: 1 }),
                ]
                if (isUsdPrimary) balances.reverse()
                return (
                  <Row
                    key={i}
                    checked={shouldAssetBeChecked(d)}
                    orangeWarning={hasNotEnoughCoverageAvailable(d)}
                    redWarning={hasNoCoverageAvailable(d)}
                  >
                    <CheckboxCell>
                      <CheckboxLabel
                        control={
                          <>
                            <AssetCheckbox
                              checked={shouldAssetBeChecked(d)}
                              onChange={() => handleToggleAsset(d)}
                              color="primary"
                              name={d.name}
                            />
                            <Checkmark />
                          </>
                        }
                      />
                    </CheckboxCell>

                    <AssetsLogo
                      align="left"
                      onClick={() =>
                        window.open(
                          `https://etherscan.io/address/${d.address}`,
                          '_blank'
                        )
                      }
                    >
                      <AssetWrapper>
                        <AssetLogoImg
                          src={
                            d.icon ? require(`../../../assets/${d.icon}`) : ''
                          }
                          alt="asset icon"
                        />
                        <AssetsTitle>
                          <AssetsName>
                            <Tooltip
                              arrow
                              placement="top"
                              enterTouchDelay={50}
                              title={d.name}
                            >
                              <CropSpan>{d.name}</CropSpan>
                            </Tooltip>
                            {d.isManual && (
                              <Tooltip
                                arrow
                                placement="top"
                                enterTouchDelay={50}
                                title={t(
                                  'Protect.CoveredAssets.AddedManuallyTooltip'
                                )}
                              >
                                <TooltipSpan>
                                  <MCircleIcon color={colors.disabledText} />
                                </TooltipSpan>
                              </Tooltip>
                            )}
                          </AssetsName>
                        </AssetsTitle>
                      </AssetWrapper>
                    </AssetsLogo>
                    <Cell align="right">
                      {balances.map((val, i) => {
                        if (i === 0) {
                          return <React.Fragment key={i}>{val}</React.Fragment>
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
                    <Cell>{parseFloat(d.pricePerYearPercent).toFixed(2)}%</Cell>
                    <Cell>
                      {isUsdPrimary
                        ? formatUSD(d.coverage.eth * ethPrice, {
                            compact: true,
                            digits: 1,
                          })
                        : formatETH(d.coverage.eth, {
                            compact: true,
                            digits: 2,
                          })}
                    </Cell>
                    <Cell>
                      <CoveredCell>
                        {commas(1).format(d.coverage.percentage)}%{' '}
                      </CoveredCell>
                    </Cell>
                    <Cell>
                      {isUsdPrimary
                        ? formatUSD(getCoverAvailable(d.address) * ethPrice, {
                            compact: true,
                            digits: 1,
                          })
                        : formatETH(getCoverAvailable(d.address), {
                            compact: true,
                            digits: 2,
                          })}
                    </Cell>
                    <ActionCell align="right">
                      <ActionButtonWrapper>
                        {hasNoCoverageAvailable(d) && (
                          <Tooltip
                            arrow
                            placement="top"
                            enterTouchDelay={50}
                            title={`${commas(4).format(
                              d.balance.eth
                            )} ETH worth of value is needed, but there is no cover available at all.`}
                          >
                            <WarningIconWrapper>
                              <AboutCircleIcon color={colors.error} />
                            </WarningIconWrapper>
                          </Tooltip>
                        )}
                        {hasNotEnoughCoverageAvailable(d) && (
                          <Tooltip
                            arrow
                            placement="top"
                            enterTouchDelay={50}
                            title={`Warning, there is only enough cover available to cover ${availableCoveragePercentage(
                              d
                            )}% of your assets at this moment. You can buy the max cover available now and update it if there is more capacity on your next visit.`}
                          >
                            <WarningIconWrapper>
                              <WarningInfoIcon color={colors.snackbarOrange} />
                            </WarningIconWrapper>
                          </Tooltip>
                        )}
                        <CoverButton
                          color="primary"
                          onClick={() => handleClickEditValue(d)}
                          edit="true"
                        >
                          <CanEditIcon color={colors.active} />
                        </CoverButton>
                        {!hasNoCoverageAvailable(d) &&
                        d.coverage.percentage < 100 ? (
                          <Tooltip
                            arrow
                            placement="top"
                            enterTouchDelay={50}
                            title={t('Protect.CoveredAssets.UpdateButton')}
                          >
                            <CoverButton
                              color="primary"
                              onClick={() => handleUpdateIndividualProtocol(d)}
                            >
                              <UpdateIcon color={colors.error} />
                            </CoverButton>
                          </Tooltip>
                        ) : (
                          <CheckCircleIcon color={colors.activeSearch} />
                        )}
                      </ActionButtonWrapper>
                    </ActionCell>
                  </Row>
                )
              })}
            </TableBody>
          </TableStyled>
        </TableStyledWrapper>
        {dataArr.length === 0 && <NoAssetsRow />}
        <FooterInfo>
          <AboutCircleIcon color={colors.disabledText} />
          <FooterInfoText>
            {t('Protect.CoveredAssets.FooterText')}
          </FooterInfoText>
        </FooterInfo>
      </TableContainerStyled>
    </Container>
  )
}

export default withTranslation()(withTheme(CoveredAssets))
