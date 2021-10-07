import React from 'react'
import { SvgIcon } from '@material-ui/core'

const ErrorIcon = ({ color }) => (
  <SvgIcon
    style={{
      fontSize: '22px',
      marginRight: '10px',
      verticalAlign: 'middle',
    }}
  >
    <path
      fill={color}
      d="M16.971,0H7.029L0,7.029V16.97L7.029,24H16.97L24,16.971V7.029L16.971,0Zm-1.4,16.945-3.554-3.521L8.5,16.992,7.079,15.574l3.507-3.566L7,8.536,8.418,7.119,12,10.577l3.539-3.583,1.431,1.431-3.535,3.568L17,15.515Z"
    />
  </SvgIcon>
)

export default ErrorIcon
