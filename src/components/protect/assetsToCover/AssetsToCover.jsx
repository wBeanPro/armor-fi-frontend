import React, { useState } from 'react'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import AboutInfoIcon from '../../icons/AboutInfoIcon'
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
import ManualProtocols from '../manualProtocols/ManualProtocols'
import MCircleIcon from '../../icons/MCircleIcon'
import Tooltip from '@material-ui/core/Tooltip'
import TooltipGuide from '../../common/tooltipGuide/TooltipGuide'
import CanEditIcon from '../../icons/CanEditIcon'
import TrashIcon from '../../icons/TrashIcon'
import Button from '../../common/button/Button'
import { toWei } from 'web3-utils'
import {
  ActionCell,
  AssetCheckbox,
  AssetLogoImg,
  AssetsLogo,
  AssetsName,
  AssetsTitle,
  AssetTitle,
  Cell,
  CheckboxCell,
  CheckboxLabel,
  Checkmark,
  Container,
  CoverButton,
  Header,
  NoAssetsTableRow,
  Row,
  SpanValue,
  TableContainerStyled,
  TableStyled,
  TableStyledWrapper,
  TableTitle,
  Title,
  TitleText,
  TooltipSpan,
  AssetWrapper,
  ActionWrapper,
  TableMontlyTitle,
  LargeCell,
  HeaderActions,
  CheckboxTitle,
  CropSpan,
  AvailableCell,
  WarningIconWrapper,
} from './styled'
import AboutCircleIcon from '../../icons/AboutCircleIcon'
import WarningInfoIcon from '../../icons/WarningInfoicon'

const AssetsToCover = ({
  t,
  theme,
  overviewDataArr,
  manuallyAddedProtocols,
  setManuallyAddedProtocols,
  ethPrice,
  onCoverArr,
  onDeleteArr,
  availableCoverage,
  arCoreCredit,
  setEditManuallyAddedValue,
  openEditModal,
  isUsdPrimary,
}) => {
  const [isCheckedArr, setIsCheckedArr] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentlyEditableValue, setCurrentlyEditableValue] = useState(null)

  const { colors } = theme

  const dataArr = [...overviewDataArr, ...manuallyAddedProtocols]
  const NoAssetsRow = () => {
    return (
      <NoAssetsTableRow>{t('Protect.AssetsToCover.NoAssets')}</NoAssetsTableRow>
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

  const handleToggleAllAsset = () => {
    if (dataArr.length > 0) {
      isCheckedArr.length !== dataArr.length
        ? setIsCheckedArr(dataArr)
        : setIsCheckedArr([])
    } else {
      return setIsCheckedArr([])
    }
  }

  const shouldAllAssetBeChecked = () => {
    if (dataArr.length > 0) {
      return dataArr.length === isCheckedArr.length ? true : false
    } else {
      return false
    }
  }

  const shouldAssetBeChecked = (obj) => {
    if (!obj.address) return false
    const searchAddress = obj.address.toLowerCase()
    const found = isCheckedArr.find((el) => {
      return el.address.toLowerCase() === searchAddress
    })
    return !!found
  }

  const handleClickCoverSingle = (obj) => {
    onCoverArr([obj])
  }

  const handleClickCoverSelected = () => {
    const protocolsWithAvailableCoverage = isCheckedArr.filter(
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
      }
    })

    onCoverArr(protocolsWithAvailableCoverage)
  }

  const handleDeleteSelected = () => {
    onDeleteArr(isCheckedArr)
  }

  const handleClickDelete = (obj) => {
    const arr = []
    const selectedArr = arr.concat(obj)
    onDeleteArr(selectedArr)
  }

  const handleClickCoverAll = () => {
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
      }
    })

    onCoverArr(protocolsWithAvailableCoverage)
  }

  const handleClickEditValue = (data) => {
    setCurrentlyEditableValue(data)
    setEditManuallyAddedValue(data)
    openEditModal()
  }

  const renderTooltip = () => {
    return (
      <div>
        <div style={{ padding: '10px' }}>
          {t('Protect.AssetsToCover.Tooltip.P1')}
        </div>
        <div style={{ padding: '10px' }}>
          {t('Protect.AssetsToCover.Tooltip.P2')}
        </div>
        <div style={{ padding: '10px' }}>
          {t('Protect.AssetsToCover.Tooltip.P3')}
        </div>
      </div>
    )
  }

  const hasNoCoverageAvailable = (d) => {
    return parseFloat(getCoverAvailable(d.address)) === 0
  }

  const hasNotEnoughCoverageAvailable = (d) => {
    const coverageAvailable = parseFloat(getCoverAvailable(d.address))
    if (coverageAvailable === 0) return false
    return coverageAvailable < parseFloat(d.balance.eth)
  }

  const availableCoveragePercentage = (d) => {
    const coverageAvailable = parseFloat(getCoverAvailable(d.address))
    if (coverageAvailable === 0) return 0
    if (coverageAvailable > parseFloat(d.balance.eth)) {
      return 100
    }
    const left = parseFloat(d.balance.eth) - coverageAvailable
    return commas(0).format(100 - (left / parseFloat(d.balance.eth)) * 100)
  }

  const handleResetManualEdits = () => {
    localStorage.removeItem('armor-website-manual-protocols')
    localStorage.removeItem('armor-website-edited-zapper-values')
    window.location.reload()
  }

  const getCoverAvailable = (_address) => {
    if (availableCoverage == null) {
      return '0'
    }
    const _protocol = availableCoverage.find(
      (p) => p.address.toLowerCase() === _address.toLowerCase()
    )

    if (_protocol && _protocol.coverage_left > 0) {
      return _protocol.coverage_left.toString()
    } else {
      return '0'
    }
  }

  return (
    <Container>
      <Header>
        <Title>
          <TitleText>{t('Protect.AssetsToCover.Title')}</TitleText>
          <TooltipGuide text={renderTooltip()}>
            <TooltipSpan>
              <AboutInfoIcon color={colors.disabledText} />
            </TooltipSpan>
          </TooltipGuide>
        </Title>
        <HeaderActions>
          {isCheckedArr.length === 0 ? (
            <>
              {dataArr.length > 0 && (
                <Button
                  buttonText={t('Protect.CoverAll')}
                  isDisabled={false}
                  tooltipText={t('Protect.AssetsToCover.CoverAll.Tooltip')}
                  onClick={handleClickCoverAll}
                  bordered={false}
                  margin="0 5px"
                />
              )}
            </>
          ) : (
            <>
              <Button
                buttonText={`${t('Protect.DeleteSelected')} (${
                  isCheckedArr.length
                })`}
                isDisabled={false}
                onClick={handleDeleteSelected}
                bordered={false}
                margin="0 5px"
              />
              <Button
                buttonText={`${t('Protect.CoverSelected')} (${
                  isCheckedArr.length
                })`}
                isDisabled={false}
                onClick={handleClickCoverSelected}
                bordered={false}
                margin="0 5px"
              />
            </>
          )}
          {(localStorage.getItem('armor-website-manual-protocols') ||
            localStorage.getItem('armor-website-edited-zapper-values')) && (
            <Button
              buttonText={'Reset all entries'}
              isDisabled={false}
              tooltipText={'Reset all manual edits and additions'}
              onClick={handleResetManualEdits}
              bordered={false}
              margin="0 5px"
            />
          )}
        </HeaderActions>
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
                  {t('Protect.AssetsToCover.Asset')}
                </AssetTitle>
                <TableTitle align="right">
                  Value: {isUsdPrimary ? '$USD / $ETH' : '$ETH / $USD'}
                </TableTitle>
                <TableMontlyTitle>% Costs / year</TableMontlyTitle>
                <TableMontlyTitle>
                  {t('Protect.AssetsToCover.InsuredValue')}
                </TableMontlyTitle>
                <TableTitle>{t('Protect.AssetsToCover.Coverage')}</TableTitle>
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
                    orangewarning={hasNotEnoughCoverageAvailable(d) ? 1 : 0}
                    redwarning={hasNoCoverageAvailable(d) ? 1 : 0}
                  >
                    <CheckboxCell>
                      <CheckboxLabel
                        control={
                          <>
                            <AssetCheckbox
                              checked={shouldAssetBeChecked(d)}
                              onChange={() => handleToggleAsset(d)}
                              color="primary"
                              disabled={hasNoCoverageAvailable(d)}
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
                                  'Protect.AssetsToCover.AddedManuallyTooltip'
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
                    {/* <Cell>
                      {d.isManual ? 'n/a' : commas(4).format(d.balance.total)}
                    </Cell> */}
                    <LargeCell align="right">
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
                    </LargeCell>
                    <Cell>{parseFloat(d.pricePerYearPercent).toFixed(2)}%</Cell>
                    <Cell>0</Cell>
                    <Cell>0%</Cell>
                    <Cell>
                      <AvailableCell>
                        {isUsdPrimary
                          ? formatUSD(getCoverAvailable(d.address) * ethPrice, {
                              compact: true,
                              digits: 1,
                            })
                          : formatETH(getCoverAvailable(d.address), {
                              compact: true,
                              digits: 2,
                            })}
                      </AvailableCell>
                    </Cell>
                    <ActionCell align="right">
                      <ActionWrapper>
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
                        {!hasNoCoverageAvailable(d) && (
                          <>
                            <CoverButton
                              color="primary"
                              onClick={() => handleClickEditValue(d)}
                            >
                              <CanEditIcon color={colors.active} />
                            </CoverButton>
                            {d.isManual && (
                              <CoverButton
                                color="primary"
                                onClick={() => handleClickDelete(d)}
                                delete="true"
                              >
                                <TrashIcon color={colors.error} />
                              </CoverButton>
                            )}
                          </>
                        )}
                      </ActionWrapper>
                    </ActionCell>
                  </Row>
                )
              })}
            </TableBody>
          </TableStyled>
        </TableStyledWrapper>
        {overviewDataArr.length === 0 &&
          manuallyAddedProtocols.length === 0 && <NoAssetsRow />}
        <ManualProtocols
          isLoading={isLoading}
          ethPrice={ethPrice}
          setIsLoading={setIsLoading}
          overviewDataArr={overviewDataArr}
          manuallyAddedProtocols={manuallyAddedProtocols}
          setManuallyAddedProtocols={setManuallyAddedProtocols}
          availableCoverage={availableCoverage}
          isUsdPrimary={isUsdPrimary}
        />
      </TableContainerStyled>
    </Container>
  )
}

export default withTranslation()(withTheme(AssetsToCover))
