import React from 'react'
import { SvgIcon } from '@material-ui/core'

const SuccessIcon = ({ color }) => (
  <SvgIcon
    style={{
      fontSize: '22px',
      marginRight: '10px',
      verticalAlign: 'middle',
    }}
  >
    <path
      fill={color}
      d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM10.75,16.518,6.25,12.2l1.4-1.435L10.724,13.7l6.105-6.218L18.25,8.892Z"
    />
  </SvgIcon>
)

export default SuccessIcon
