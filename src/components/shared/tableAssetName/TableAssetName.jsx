import React from 'react'
import MCircleIcon from '../../icons/MCircleIcon'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { checkOnImageExist } from '../../../helpers'
import Tooltip from '@material-ui/core/Tooltip'
import {
  AssetWrapper,
  AssetLogoImg,
  AssetsTitle,
  AssetsName,
  CropSpan,
  TooltipSpan,
} from './styled'

const TableAssetName = ({ theme, t, logo, text, isManual }) => {
  const { colors } = theme
  return (
    <AssetWrapper>
      {logo && (
        <AssetLogoImg
          src={checkOnImageExist(logo, 'eth.png')}
          alt="asset icon"
        />
      )}
      <AssetsTitle>
        <AssetsName>
          <Tooltip arrow placement="top" enterTouchDelay={50} title={text}>
            <CropSpan>{text}</CropSpan>
          </Tooltip>
          {isManual && (
            <Tooltip
              arrow
              placement="top"
              enterTouchDelay={50}
              title={t('Protect.AssetsToCover.AddedManuallyTooltip')}
            >
              <TooltipSpan>
                <MCircleIcon color={colors.disabledText} />
              </TooltipSpan>
            </Tooltip>
          )}
        </AssetsName>
      </AssetsTitle>
    </AssetWrapper>
  )
}

export default withTranslation()(withTheme(TableAssetName))
