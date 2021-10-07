import {
  AssetLogo,
  AssetsCell,
  AssetsName,
  AssetWrapper,
  CropSpan,
} from '../styled'
import Tooltip from '@material-ui/core/Tooltip'
import React from 'react'

const ShieldTitle = ({ title, address, logo }) => {
  return (
    <AssetsCell>
      <Tooltip arrow placement="top" enterTouchDelay={50} title={title}>
        <AssetWrapper
          onClick={() =>
            window.open(`https://etherscan.io/address/${address}`, '_blank')
          }
        >
          <AssetLogo
            src={require(`../../../../../assets/${logo}`)}
            alt={`${title} icon`}
          />
          <AssetsName>
            <CropSpan>{title}</CropSpan>
          </AssetsName>
        </AssetWrapper>
      </Tooltip>
    </AssetsCell>
  )
}

export default ShieldTitle
