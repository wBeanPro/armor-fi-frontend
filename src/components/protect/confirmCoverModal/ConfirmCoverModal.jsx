import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import {
  commas,
  countDecimals,
  eightDigitFormatter,
  formatETH,
  formatUSD,
} from '../../../helpers'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import AboutCircleIcon from '../../icons/AboutCircleIcon'
import Button from '../../common/button/Button'
import {
  ModalTitle,
  Container,
  CancelButton,
  ContentContainer,
  MainInfo,
  InfoWrapper,
  ErrorMessage,
  DividerText,
  ActionContainer,
  Input,
  InputInfo,
  SliderContainer,
  SliderBox,
  TooltipSpan,
  TableContainerStyled,
  TableStyledWrapper,
  TableStyled,
  TableTitle,
  Row,
  Cell,
  AssetsTitle,
  AssetsLogo,
  AssetWrapper,
  AssetLogoImg,
  AssetsName,
  FooterInfo,
  CheckboxLabel,
  AssetCheckbox,
  Checkmark,
  EventTitle,
  EventLink,
  EventBug,
  EventWrapper,
  AssetTitle,
  AssetsWrapper,
  SpanValue,
  Buttons,
} from './styled'
import AvailableWalletAndArCoreInfo from '../../common/availableWalletAndArCoreInfo/AvailableWalletAndArCoreInfo'
import TooltipGuide from '../../common/tooltipGuide/TooltipGuide'
import AboutInfoIcon from '../../icons/AboutInfoIcon'
import { toWei } from 'web3-utils'

const DEFAULT_MONTHS_COUNT = 2

const ConfirmCoverModal = ({
  t,
  theme,
  closeModal,
  handleSubmit,
  handleTopUpSubmit,
  monthlyCost,
  ethBalance,
  covers,
  ethPrice,
  arcoreBalance,
  selectedUnstakedAssets,
  isUsdPrimary,
}) => {
  const topUpPercentage = 0.75
  const [isLoading, setIsLoading] = useState(true)
  const [amountError, setAmountError] = useState(false)
  const [balanceError, setBalanceError] = useState(false)
  const [amount, setAmount] = useState('0')
  const [monthsCount, setMonthsCount] = useState(DEFAULT_MONTHS_COUNT)
  const [isAcceptedArmorTnC, setIsAcceptedArmorTnC] = useState(true)
  const { colors } = theme

  const monthSliderMapper = (index) => {
    const _arr = [0.25, 0.5, 1, 3, 6, 12]
    return _arr[index] || _arr[0]
  }

  useEffect(() => {
    if (amount == '') {
      setAmount(costPerMonth().toString())
    }
    const _amount = (costPerMonth() * monthSliderMapper(monthsCount)).toString()
    setAmount(_amount)
    setIsLoading(false)
  }, [])

  const handleClickTopUp = async () => {
    const perMonth = costPerMonth()

    const totalWithTopUp = parseFloat(arcoreBalance) + parseFloat(amount)

    setBalanceError(false)

    if (totalWithTopUp < minimumETHRequired()) {
      setBalanceError(true)
      return
    }

    selectedUnstakedAssets.forEach((p, index) => {
      if (
        parseFloat(selectedUnstakedAssets[index].balance.eth) >
        parseFloat(p.availability.eth)
      ) {
        selectedUnstakedAssets[index].balance.eth = p.availability.eth
        selectedUnstakedAssets[index].balance.wei = toWei(p.availability.eth)
      }
    })

    if (hasEnoughETH() && !hasTopupNeed()) {
      handleSubmit(selectedUnstakedAssets)
    } else {
      handleTopUpSubmit(selectedUnstakedAssets, amount)
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsLoading(false)
    closeModal()
  }

  const minimumETHRequired = () => {
    return costPerMonth() - costPerMonth() * topUpPercentage
  }

  const hasEnoughETH = () => {
    return arcoreBalance >= minimumETHRequired()
  }

  const hasTopupNeed = () => {
    return arcoreBalance < amount
  }

  const costPerMonth = () => {
    let pricePerSecond = 0
    covers.forEach((p) => {
      pricePerSecond += parseFloat(p.pricePerSecond)
    })
    selectedUnstakedAssets.forEach((p) => {
      pricePerSecond += parseFloat(p.pricePerSecond)
    })
    let pricePerMonth = parseFloat(pricePerSecond) * 2592000

    if (countDecimals(pricePerMonth) > 8) {
      return parseFloat(pricePerMonth.toFixed(8))
    }

    return pricePerMonth
  }

  const costPerWeek = () => {
    if (costPerMonth() > 0) {
      return costPerMonth() / 4
    }

    return 0
  }

  const handleChangeAmount = (e) => {
    const { value } = e.target
    setAmountError(false)
    if (value.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+value)) {
      setAmount(value)
      setMonthsCount(DEFAULT_MONTHS_COUNT)
    }
  }

  const wasBalanceAdjusted = (d) => {
    return parseFloat(d.balance.eth) > parseFloat(d.availability.eth)
  }

  const adjustedAvailableBalance = (d) => {
    if (parseFloat(d.balance.eth) > parseFloat(d.availability.eth)) {
      return d.availability.eth
    }

    return d.balance.eth
  }

  const adjustedAvailableUSD = (d) => {
    return adjustedAvailableBalance(d) * ethPrice
  }

  const handleChangeMonthsCount = (_monthsCount) => {
    setAmountError(false)
    const _monthlyCost = costPerMonth()
    const value = (
      _monthlyCost * monthSliderMapper(parseFloat(_monthsCount))
    ).toString()
    setAmount(value)
    setMonthsCount(_monthsCount)
  }

  const marks = [
    {
      value: 0,
      label: '+ 1 week',
    },
    {
      value: 1,
      label: '+ 2 weeks',
    },
    {
      value: 2,
      label: '+ 1 month',
    },
    {
      value: 3,
      label: '+ 3 months',
    },
    {
      value: 4,
      label: '+ 6 months',
    },
    {
      value: 5,
      label: '+ 12 months',
    },
  ]

  const toggleCheckArmorTnC = () => {
    setIsAcceptedArmorTnC(!isAcceptedArmorTnC)
  }

  return (
    <>
      <Container>
        <ContentContainer>
          <ModalTitle>
            {t('ConfirmCoverModal.Title')}
            <TooltipGuide text="This will be the new monthly/weekly cost for your chosen plan, including any newly added assets. Please select a period below. This will determine the amount of your initial arCore Credit deposit, which will be enough to pay for your chosen coverage plan for the selected period. Note that you can always add or withdraw credit and change or cancel your plans at any moment. Due to high gas fees when creating your plan and depositing to your arCore Credit (up to 0.1 ETH), we recommend to choose a longer period as to minimize gas fees.">
              <TooltipSpan>
                <AboutInfoIcon color={colors.disabledText} />
              </TooltipSpan>
            </TooltipGuide>
          </ModalTitle>
          <InfoWrapper>
            <MainInfo>
              <span>
                {isUsdPrimary
                  ? formatUSD(costPerMonth() * ethPrice, { digits: 2 })
                  : formatETH(costPerMonth(), { digits: 4 })}
              </span>{' '}
              / {t('ConfirmCoverModal.PerMonth')}
            </MainInfo>
            <MainInfo>
              <span>
                {isUsdPrimary
                  ? formatUSD(costPerWeek() * ethPrice, { digits: 2 })
                  : formatETH(costPerWeek(), { digits: 4 })}
              </span>{' '}
              / {t('ConfirmCoverModal.PerWeek')}
            </MainInfo>
          </InfoWrapper>
          <SliderContainer>
            <SliderBox
              value={monthsCount}
              min={0}
              max={5}
              currentvalue={parseFloat(amount)}
              monthlycost={costPerMonth()}
              step={null}
              marks={marks}
              onChange={(_, _monthsCount) =>
                handleChangeMonthsCount(_monthsCount)
              }
              ethPrice={ethPrice}
              isUsdPrimary={isUsdPrimary}
            />
          </SliderContainer>

          <AssetsWrapper>
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
                    {selectedUnstakedAssets.map((a, i) => {
                      let balances = [
                        formatETH(a.balance.eth, { compact: true, digits: 2 }),
                        formatUSD(a.balance.usd, { compact: true, digits: 1 }),
                      ]
                      if (isUsdPrimary) balances.reverse()
                      return (
                        <Row
                          key={i}
                          orangeWarning={wasBalanceAdjusted(a)}
                          redWarning={false}
                        >
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
                          <Cell>{a.pricePerYearPercent.toFixed(2)}%</Cell>
                        </Row>
                      )
                    })}
                  </TableBody>
                </TableStyled>
              </TableStyledWrapper>
            </TableContainerStyled>
            <EventWrapper>
              <EventTitle>
                arCore already covered Smart Contract bugs, but now also covers
                the following scenarios:
              </EventTitle>
              <EventBug>Oracle attacks</EventBug>
              <EventBug>Severe economic attacks</EventBug>
              <EventBug>Governance attacks</EventBug>
              <EventBug>Protocols on any chain</EventBug>
              <EventBug>Layer two components</EventBug>

              <EventTitle nospace="true">
                Claims require proof of the incurred loss. Check out full
                details{' '}
                <EventLink
                  href="https://nexusmutual.io/pages/ProtocolCoverv1.0.pdf"
                  rel="noreferrer"
                  target="_blank"
                >
                  here
                </EventLink>
              </EventTitle>
            </EventWrapper>
            <CheckboxLabel
              control={
                <>
                  <AssetCheckbox
                    checked={isAcceptedArmorTnC}
                    onChange={toggleCheckArmorTnC}
                    color="primary"
                    name="checkedConditions"
                  />
                  <Checkmark />
                </>
              }
              label={
                <>
                  I agree with the{' '}
                  <a
                    href="https://nexusmutual.io/pages/ProtocolCoverv1.0.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cover Terms
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://armorfi.gitbook.io/armor/disclaimer"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Armor Documentation
                  </a>
                </>
              }
            />
            <Buttons top="true">
              {arcoreBalance > 0 && hasEnoughETH() && !hasTopupNeed() ? (
                <Button
                  buttonText={t('ConfirmCoverModal.COVER')}
                  isDisabled={
                    !isAcceptedArmorTnC ||
                    !amount ||
                    isLoading ||
                    selectedUnstakedAssets.length === 0
                  }
                  tooltipText="After clicking an Ethereum transaction will appear, which you need to confirm in order for your coverage plan to start."
                  onClick={handleClickTopUp}
                  bordered={false}
                  margin="25px auto 0"
                />
              ) : (
                <Button
                  buttonText={t('ConfirmCoverModal.TopUpAndCover')}
                  isDisabled={
                    !isAcceptedArmorTnC ||
                    !amount ||
                    isLoading ||
                    selectedUnstakedAssets.length === 0
                  }
                  tooltipText="After clicking two Ethereum transactions will appear. First the Top Up transaction which includes the amount to deposit plus gas fees. Once the first transaction is confirmed a 2nd one will start, which you also need to confirm in order for your coverage plan to start."
                  onClick={handleClickTopUp}
                  bordered={false}
                  margin="25px auto 0"
                />
              )}
            </Buttons>
          </AssetsWrapper>

          <DividerText>{t('Protect.TopUpModal.ChooseManually')}:</DividerText>
          <ActionContainer>
            <Input
              value={amount}
              onChange={handleChangeAmount}
              error={amountError}
              placeholder="0"
              variant="outlined"
              InputProps={{
                endAdornment: <InputInfo position="end">ETH</InputInfo>,
              }}
            />
            <Buttons>
              {arcoreBalance > 0 && hasEnoughETH() && !hasTopupNeed() ? (
                <Button
                  buttonText={t('ConfirmCoverModal.COVER')}
                  isDisabled={
                    !isAcceptedArmorTnC ||
                    isLoading ||
                    selectedUnstakedAssets.length === 0
                  }
                  tooltipText="After clicking an Ethereum transaction will appear, which you need to confirm in order for your coverage plan to start."
                  onClick={handleClickTopUp}
                  bordered={false}
                  margin="0 0 0 16px"
                />
              ) : (
                <Button
                  buttonText={t('ConfirmCoverModal.TopUpAndCover')}
                  isDisabled={
                    !isAcceptedArmorTnC ||
                    isLoading ||
                    selectedUnstakedAssets.length === 0
                  }
                  tooltipText="After clicking two Ethereum transactions will appear. First the Top Up transaction which includes the amount to deposit plus gas fees. Once the first transaction is confirmed a 2nd one will start, which you also need to confirm in order for your coverage plan to start."
                  onClick={handleClickTopUp}
                  bordered={false}
                  margin="0 0 0 16px"
                />
              )}
            </Buttons>
          </ActionContainer>
          {balanceError && (
            <ErrorMessage>
              {t('ConfirmCoverModal.ErrorMessage1')}
              <span>{commas(8).format(minimumETHRequired())}</span>ETH{' '}
              {t('ConfirmCoverModal.ErrorMessage2')}
            </ErrorMessage>
          )}
          {(!hasEnoughETH() || hasTopupNeed()) && (
            <FooterInfo>
              <AboutCircleIcon color={colors.disabledText} />
              <div>
                Please note: you will be asked to confirm 2 transactions
              </div>
            </FooterInfo>
          )}
        </ContentContainer>
        <AvailableWalletAndArCoreInfo
          ethBalanceText={`${t('ConfirmCoverModal.AvailableBalance')}:`}
          ethBalanceValue={commas(4).format(ethBalance)}
          arCoreText={`${t('ConfirmCoverModal.ArCoreText')}:`}
          arCoreValue={commas(4).format(arcoreBalance)}
          center={false}
        />
      </Container>
      <CancelButton onClick={handleCloseModal}>
        {t('ConfirmCoverModal.Cancel')}
      </CancelButton>
    </>
  )
}

export default withTranslation()(withRouter(withTheme(ConfirmCoverModal)))
