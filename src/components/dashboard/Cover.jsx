import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import * as moment from 'moment'
import CoverActions from './CoverActions'
import {
  FieldTitle,
  FieldValue,
  CoverCard,
  AssetSummary,
  AssetsWrapper,
  ContentBox,
  HeadingName,
  AssetIcon,
  HeadingWrapper,
  Heading,
  InsuranceContractName,
} from './styled'
import { uglifyAddress } from '../../helpers'

const Cover = ({
  t,
  account,
  contract,
  actionsDisabled,
  onClaim,
  onSwap,
  onRedeem,
}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // console.log({ contract })
    setIsLoading(false)
  }, [])

  return isLoading ? null : (
    <CoverCard>
      <AssetSummary>
        <AssetsWrapper>
          <ContentBox>
            <HeadingName>
              <AssetIcon>
                <img
                  alt=""
                  src={require('../../assets/' + (contract.logo || 'eth.png'))}
                  height={window.innerWidth > 600 ? '40px' : '30px'}
                />
              </AssetIcon>
              <div>
                <FieldTitle bold noWrap>
                  {contract.name}
                </FieldTitle>
                <FieldValue>{uglifyAddress(account.address, 7, 6)}</FieldValue>
              </div>
            </HeadingName>
            <HeadingWrapper>
              <Heading>
                <FieldTitle bold noWrap>
                  {contract.coverAmount}{' '}
                  {contract.coverCurrencyDisplay.replace('\0', '')}
                </FieldTitle>
                <FieldValue>{t('Dashboard.Item.CoverPurchased')}</FieldValue>
              </Heading>
              <Heading>
                <FieldTitle bold noWrap>
                  {moment
                    .unix(contract.expirationTimestamp)
                    .format('YYYY-MM-DD')}
                </FieldTitle>
                <FieldValue>{t('Dashboard.Item.CoverExpires')}</FieldValue>
              </Heading>
            </HeadingWrapper>
          </ContentBox>
          <CoverActions
            contract={contract}
            actionsDisabled={actionsDisabled}
            onClaim={onClaim}
            onSwap={onSwap}
            onRedeem={onRedeem}
          />
        </AssetsWrapper>

        <InsuranceContractName>
          {contract.insuranceContractName}
        </InsuranceContractName>
      </AssetSummary>
    </CoverCard>
  )
}

export default withTranslation()(Cover)
