import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import Skeleton from '@material-ui/lab/Skeleton'
import { withTranslation } from 'react-i18next'
import { twoDigitFormatter } from '../../helpers'
import {
  Container,
  TitleStyled,
  Wrapper,
  SummaryItem,
  ItemTitle,
  ItemValue,
} from './styled'

const IbcoSummary = ({
  classes,
  history,
  transactions,
  startArmorPrice,
  currentArmorPrice,
  totalDistributed,
  isLoading,
  ethToArmor,
  t,
}) => {
  return (
    <Container>
      <TitleStyled>{t('Ibco.Summary.Title')}</TitleStyled>
      <Wrapper>
        <SummaryItem>
          <ItemTitle>{t('Ibco.Summary.EthContributed')}</ItemTitle>
          <ItemValue>
            {isLoading ? (
              <Skeleton width="150px" />
            ) : (
              <span>
                {twoDigitFormatter.format(
                  transactions.reduce((acc, t) => {
                    acc += +t.amount
                    return acc
                  }, 0)
                )}{' '}
                ETH
              </span>
            )}
          </ItemValue>
        </SummaryItem>
        <SummaryItem>
          <ItemTitle>{t('Ibco.Summary.IbcoContributors')}</ItemTitle>
          <ItemValue>
            {isLoading ? (
              <Skeleton width="150px" />
            ) : (
              <span>{transactions.length}</span>
            )}
          </ItemValue>
        </SummaryItem>
        <SummaryItem>
          <ItemTitle>{t('Ibco.Summary.ArmorClaimable')}</ItemTitle>
          <ItemValue>
            {isLoading ? (
              <Skeleton width="150px" />
            ) : (
              <span>{totalDistributed}</span>
            )}
          </ItemValue>
        </SummaryItem>
        <SummaryItem>
          <ItemTitle>{t('Ibco.Summary.ArmorStartPrice')} (FIX)</ItemTitle>
          <ItemValue>
            {isLoading ? (
              <Skeleton width="150px" />
            ) : (
              <span>{startArmorPrice && `$${startArmorPrice}`}</span>
            )}
          </ItemValue>
        </SummaryItem>
        <SummaryItem>
          <ItemTitle>{t('Ibco.Summary.ArmorCurrentPrice')}</ItemTitle>
          <ItemValue>
            {isLoading ? (
              <Skeleton width="150px" />
            ) : (
              <span>{currentArmorPrice && `$${currentArmorPrice}`}</span>
            )}
          </ItemValue>
        </SummaryItem>
        <SummaryItem>
          <ItemTitle>{t('Ibco.Summary.ArmorPriceChange')}</ItemTitle>
          <ItemValue>
            {isLoading ? (
              <Skeleton width="150px" />
            ) : (
              <span>
                {startArmorPrice &&
                  currentArmorPrice &&
                  (
                    ((+currentArmorPrice - +startArmorPrice) /
                      +startArmorPrice) *
                    100
                  ).toFixed(2)}
                %
              </span>
            )}
          </ItemValue>
        </SummaryItem>
      </Wrapper>
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(IbcoSummary)))
