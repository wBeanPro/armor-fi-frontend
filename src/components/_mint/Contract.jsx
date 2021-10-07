import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import * as moment from 'moment'
import {
  ERROR,
  GET_QUOTE,
  QUOTE_RETURNED,
  APPLY,
  APPLY_RETURNED,
} from '../../constants'
import Store from '../../stores/store'
import { uglifyAddress } from '../../helpers'

import Skeleton from '@material-ui/lab/Skeleton'
import InputAdornment from '@material-ui/core/InputAdornment'
import ArrowRightIcon from '../icons/ArrowRightIcon'
import ApplyIcon from '../icons/ApplyIcon'
import RefreshIcon from '../icons/RefreshIcon'
import {
  ActionsContainer,
  TradeContainer,
  Title,
  Input,
  InputInfo,
  Info,
  Dropdown,
  SelectMenu,
  SelectIconName,
  Buttons,
  ActionButton,
  ButtonText,
  NoCoverAvailableInfo,
  QuoteContainer,
  Field,
  Divider,
  FieldTitle,
  FieldValue,
  QuoteSkeleton,
  QuoteSkeletonPair,
  ButtonWrapper,
  SimpleButton,
} from './contractStyled'
import { Paragraph } from '../common/Paragraph'

const emitter = Store.emitter
const dispatcher = Store.dispatcher

const Contract = ({
  _contract,
  _startLoading,
  _stopLoading,
  _accountBalances,
  _asset,
  _assetObject,
  _capacity,
  theme,
  classes,
  t,
}) => {
  const [asset, setAsset] = useState(_asset)
  const [assetObject, setAssetObject] = useState(_assetObject)
  const [days, setDays] = useState('')
  const [daysError, setDaysError] = useState(false)
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [quote, setQuote] = useState(null)
  const isCoverAvailable = +_capacity <= 0

  useEffect(() => {
    emitter.on(QUOTE_RETURNED, quoteReturned)
    emitter.on(APPLY_RETURNED, applyReturned)
    emitter.on(ERROR, errorReturned)

    return () => {
      emitter.removeListener(QUOTE_RETURNED, quoteReturned)
      emitter.removeListener(APPLY_RETURNED, applyReturned)
      emitter.removeListener(ERROR, errorReturned)
    }
  }, [])

  useEffect(() => {
    setAsset(_asset)
    setAssetObject(_assetObject)
  }, [_asset, _assetObject])

  const setterDays = (value) => {
    setDays(value)
  }

  const setterCurrency = (value) => {
    setAmount(value)
  }

  const quoteReturned = (_quote) => {
    setIsLoading(false)
    _stopLoading()
    if (_quote.contract.toLowerCase() === _contract.address.toLowerCase())
      setQuote(_quote)
  }

  const applyReturned = () => {
    setIsLoading(false)
    setDays('')
    setAmount('')
    setQuote(null)
    _stopLoading()
  }

  const errorReturned = (error) => {
    setIsLoading(false)
    _stopLoading()
  }

  const onSelectChange = (event) => {
    const { value } = event.target
    let asset = _accountBalances.filter((bal) => bal.id === value)
    if (asset.length > 0) asset = asset[0]
    setAsset(value)
    setAssetObject(asset)
  }

  const onChangeDays = (event) => {
    const _days = Math.floor(event.target.value)
    if (!isNaN(_days)) setDays(_days)
  }

  const onChangeAmount = (event) => {
    const _amount = Math.floor(event.target.value)
    if (!isNaN(_amount)) setAmount(_amount)
  }

  const inputKeyDown = (event) => {
    if (event.which === 13) onQuote()
  }

  const onQuote = () => {
    setAmountError(false)
    setDaysError(false)
    let anyError = false

    if (!amount || isNaN(amount) || amount <= 0) {
      setAmountError(true)
      anyError = true
    }

    if (
      !days ||
      isNaN(days) ||
      parseFloat(days) > 365 ||
      parseFloat(days) < 90
    ) {
      setDaysError(true)
      anyError = true
    }

    if (anyError) return false

    setIsLoading(true)
    _startLoading()
    dispatcher.dispatch({
      type: GET_QUOTE,
      content: { amount, days, contract: _contract, asset: assetObject },
    })
  }

  const onApply = () => {
    setAmountError(false)
    setDaysError(false)

    let anyError = false

    if (!amount || isNaN(amount) || amount <= 0) {
      setAmountError(true)
      anyError = true
    }

    if (
      !days ||
      isNaN(days) ||
      parseFloat(days) > 365 ||
      parseFloat(days) < 90
    ) {
      setDaysError(true)
      anyError = true
    }

    if (anyError) return false

    setIsLoading(true)
    _startLoading()
    dispatcher.dispatch({
      type: APPLY,
      content: { amount, days, contract: _contract, asset: assetObject, quote },
    })
  }

  const { colors } = theme

  if (!assetObject) return null
  const quoteContract =
    quote && quote.contract ? uglifyAddress(quote.contract) : null

  return (
    <ActionsContainer>
      <TradeContainer quote={quote}>
        <Title quote={quote}>{t('Mint.Quote.GetQuote')}</Title>
        <ButtonWrapper>
          <SimpleButton onClick={() => setterDays(90)}>90</SimpleButton> ·
          <SimpleButton onClick={() => setterDays(180)}>180</SimpleButton> ·
          <SimpleButton onClick={() => setterDays(365)}>365</SimpleButton>
        </ButtonWrapper>
        <Input
          fullWidth
          value={days}
          error={daysError}
          onChange={onChangeDays}
          disabled={isLoading || isCoverAvailable}
          placeholder="90-365"
          variant="outlined"
          onKeyDown={inputKeyDown}
          InputProps={{
            endAdornment: (
              <InputInfo position="end">{t('Mint.Quote.Days')}</InputInfo>
            ),
          }}
        />
        <ButtonWrapper>
          {asset === 'dai' ? (
            <>
              <SimpleButton onClick={() => setterCurrency(100)}>
                100{' '}
              </SimpleButton>
              ·
              <SimpleButton onClick={() => setterCurrency(500)}>
                500
              </SimpleButton>
              ·
              <SimpleButton onClick={() => setterCurrency(1000)}>
                1000
              </SimpleButton>
              ·
              <SimpleButton onClick={() => setterCurrency(10000)}>
                10000
              </SimpleButton>
              ·
              <SimpleButton onClick={() => setterCurrency(_capacity)}>
                MAX
              </SimpleButton>
            </>
          ) : (
            <>
              <SimpleButton onClick={() => setterCurrency(1)}>1 </SimpleButton>·
              <SimpleButton onClick={() => setterCurrency(5)}>5</SimpleButton>·
              <SimpleButton onClick={() => setterCurrency(10)}>10</SimpleButton>
              ·
              <SimpleButton onClick={() => setterCurrency(100)}>
                100
              </SimpleButton>
              ·
              <SimpleButton onClick={() => setterCurrency(_capacity)}>
                MAX
              </SimpleButton>
            </>
          )}
        </ButtonWrapper>
        <Input
          fullWidth
          value={amount}
          error={amountError}
          onChange={onChangeAmount}
          disabled={isLoading || isCoverAvailable}
          placeholder="0"
          variant="outlined"
          onKeyDown={inputKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Dropdown
                  id={'asset'}
                  name={'asset'}
                  select
                  value={asset}
                  onChange={onSelectChange}
                  SelectProps={{
                    native: false,
                  }}
                  fullWidth
                  // hideArrow={true}
                  disabled={isLoading}
                >
                  {_accountBalances
                    ? _accountBalances.map((option) => (
                        <SelectMenu key={option.id} value={option.id}>
                          <React.Fragment>
                            <SelectIconName>{option.symbol}</SelectIconName>
                          </React.Fragment>
                        </SelectMenu>
                      ))
                    : null}
                </Dropdown>
              </InputAdornment>
            ),
          }}
          helperText={
            <>
              {amountError && <span>{t('Mint.Quote.AmountError')}</span>}
              <Info>{t('Mint.Quote.AmountHint')}</Info>
            </>
          }
        />
        <Buttons>
          <ActionButton
            variant="outlined"
            color="primary"
            disabled={isLoading || isCoverAvailable}
            onClick={onQuote}
            fullWidth
          >
            <ButtonText>
              {!quote ? (
                <>
                  {t('Mint.Quote.GetQuoteButton')}{' '}
                  <ArrowRightIcon color={colors.secondary} />
                </>
              ) : (
                <>
                  {t('Mint.Quote.UpdateQuoteButton')}{' '}
                  <RefreshIcon color={colors.secondary} />
                </>
              )}
            </ButtonText>
          </ActionButton>
        </Buttons>
        {isCoverAvailable && (
          <NoCoverAvailableInfo>
            {t('Mint.Quote.GetQuoteButtonHint')}
          </NoCoverAvailableInfo>
        )}
      </TradeContainer>
      <TradeContainer quote={!quote}>
        <Title quote={!quote}>{t('Mint.Confirm.Title')}</Title>
        {quote ? (
          <QuoteContainer>
            <Field>
              <Paragraph bold>{t('Mint.Confirm.CoverCost')}</Paragraph>
              <Paragraph>
                {(quote.price / 1e18).toFixed(4)} {quote.currency}
              </Paragraph>
            </Field>
            <Divider />
            <Field>
              <FieldTitle>{t('Mint.Confirm.Contract')}</FieldTitle>
              <FieldValue>{quoteContract}</FieldValue>
            </Field>
            <Field>
              <FieldTitle>{t('Mint.Confirm.CoverAmount')}</FieldTitle>
              <FieldValue>
                {quote.amount} {quote.currency}
              </FieldValue>
            </Field>
            <Field>
              <FieldTitle>{t('Mint.Confirm.CoverPeriod')}</FieldTitle>
              <FieldValue>
                {quote.period} {t('Mint.Quote.Days')}
              </FieldValue>
            </Field>
            <Field>
              <FieldTitle>{t('Mint.Confirm.CoverExpires')}</FieldTitle>
              <FieldValue>
                {moment().add(quote.period, 'days').format('YYYY-MM-DD')}
              </FieldValue>
            </Field>
            <Buttons>
              <ActionButton
                className="applyBtn"
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={onApply}
                fullWidth
              >
                <ButtonText>
                  {t('Mint.Confirm.ApplyButton')}{' '}
                  <ApplyIcon color={colors.secondary} />
                </ButtonText>
              </ActionButton>
            </Buttons>
            {quote.currency.toLowerCase() === 'dai' && (
              <NoCoverAvailableInfo>
                {t('Mint.Quote.EthNftOnlyWarning')}
              </NoCoverAvailableInfo>
            )}
          </QuoteContainer>
        ) : (
          <QuoteSkeleton>
            <QuoteSkeletonPair>
              <Skeleton animation={false} width="30%" height={22} />
              <Skeleton animation={false} width="32%" height={22} />
            </QuoteSkeletonPair>
            <Divider />
            <QuoteSkeletonPair>
              <Skeleton animation={false} width="23%" height={18} />
              <Skeleton animation={false} width="56%" height={18} />
            </QuoteSkeletonPair>
            <QuoteSkeletonPair>
              <Skeleton animation={false} width="36%" height={18} />
              <Skeleton animation={false} width="13%" height={18} />
            </QuoteSkeletonPair>
            <QuoteSkeletonPair>
              <Skeleton animation={false} width="32%" height={18} />
              <Skeleton animation={false} width="18%" height={18} />
            </QuoteSkeletonPair>
            <QuoteSkeletonPair>
              <Skeleton animation={false} width="34%" height={18} />
              <Skeleton animation={false} width="26%" height={18} />
            </QuoteSkeletonPair>
            <QuoteSkeletonPair>
              <Skeleton animation={false} width="100%" height={40} />
            </QuoteSkeletonPair>
          </QuoteSkeleton>
        )}
      </TradeContainer>
    </ActionsContainer>
  )
}

export default withTranslation()(withRouter(withTheme(Contract)))
