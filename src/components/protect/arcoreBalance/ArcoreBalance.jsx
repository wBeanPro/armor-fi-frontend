import React, { useEffect } from 'react'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import {
  Title,
  Button,
  Container,
  ContentBox,
  Header,
  ContentWrapper,
  InfoText,
  ValueInfo,
  ColoredValue,
  TooltipSpan,
} from './styled'
import { commas, threeDigitFormatter } from '../../../helpers'
import AvailableWalletInfo from '../../common/availableWalletInfo/AvailableWalletInfo'
import AboutInfoIcon from '../../icons/AboutInfoIcon'
import TooltipGuide from '../../common/tooltipGuide/TooltipGuide'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

const ArcoreBalance = ({
  t,
  theme,
  monthlyCost,
  ethBalance,
  arCoreCredit,
  handleOpenTopupModal,
  handleOpenWithdrawModal,
}) => {
  const { colors } = theme

  useEffect(() => {
    momentDurationFormatSetup(moment)
  }, [])

  const getArCoreMonths = () => {
    if (arCoreCredit == 0 || monthlyCost == 0) {
      return 0
    }
    return commas(3).format(arCoreCredit / monthlyCost)
  }

  const getArCoreMonthsDays = () => {
    if (arCoreCredit == 0 || monthlyCost == 0) {
      return '0 Month(s)'
    }
    const _duration = arCoreCredit / monthlyCost
    return moment.duration(_duration, 'months').format(`M [Month(s)], d [Days]`)
  }

  const getMonthlyCost = () => {
    if (monthlyCost == 0) {
      return 0
    }
    return commas(4).format(monthlyCost)
  }
  return (
    <Container>
      <ContentBox>
        <Header>
          <Title>
            {t('Protect.ArcoreBalance.Title')}{' '}
            <TooltipGuide
              text={
                <>
                  {t('Protect.ArcoreBalance.Title.Tooltip')}
                  <br />
                  <a
                    href="https://armorfi.gitbook.io/armor/products/arcore"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Click here to get more details
                  </a>
                </>
              }
            >
              <TooltipSpan>
                <AboutInfoIcon color={colors.disabledText} />
              </TooltipSpan>
            </TooltipGuide>
          </Title>
          <div>
            <Button transparent="true" onClick={handleOpenWithdrawModal}>
              {t('Protect.Withdraw')}{' '}
              <TooltipGuide text={t('Protect.Withdraw.Tooltip')}>
                <TooltipSpan>
                  <AboutInfoIcon color={colors.active} />
                </TooltipSpan>
              </TooltipGuide>
            </Button>
            <Button onClick={handleOpenTopupModal}>
              {t('Protect.TopUp')}{' '}
              <TooltipGuide text={t('Protect.TopUp.Tooltip')}>
                <TooltipSpan>
                  <AboutInfoIcon color={colors.secondary} />
                </TooltipSpan>
              </TooltipGuide>
            </Button>
          </div>
        </Header>
        <ContentWrapper>
          <InfoText>
            {t('Protect.ArcoreBalance.MonthlyCost')}:
            <ColoredValue>
              <ValueInfo>{getMonthlyCost()} ETH</ValueInfo> /{' '}
              {t('Protect.ArcoreBalance.PerMonth')}
            </ColoredValue>{' '}
            <TooltipGuide text={t('Protect.ArcoreBalance.MonthlyCost.Tooltip')}>
              <TooltipSpan>
                <AboutInfoIcon color={colors.disabledText} />
              </TooltipSpan>
            </TooltipGuide>
          </InfoText>
          <InfoText>
            {t('Protect.ArcoreBalance.ArcoreBalanceEth')}:
            <ColoredValue contrast active={arCoreCredit > 0}>
              <ValueInfo> {arCoreCredit} ETH</ValueInfo> /{' '}
              {getArCoreMonthsDays()}
            </ColoredValue>
            <TooltipGuide
              text={
                <>
                  {t('Protect.ArcoreBalance.MonthlyCost.Tooltip')}
                  <br />
                  <a
                    href="https://armorfi.gitbook.io/armor/products/arcore#arcore-credit"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Click here to get more details
                  </a>
                </>
              }
            >
              <TooltipSpan>
                <AboutInfoIcon color={colors.disabledText} />
              </TooltipSpan>
            </TooltipGuide>
          </InfoText>
        </ContentWrapper>
      </ContentBox>
      <AvailableWalletInfo
        text={`${t('Protect.ArcoreBalance.WalletBalanceEth')}:`}
        value={`${threeDigitFormatter.format(ethBalance)} ETH`}
        center={false}
      />
    </Container>
  )
}
export default withTranslation()(withTheme(ArcoreBalance))
