import React from 'react'
import { withTheme } from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '../../icons/SearchIcon'
import { SearchField } from './styled'

const Search = ({
  theme,
  value,
  isDisabled = false,
  placeholder,
  onChange,
}) => {
  const { colors } = theme

  return (
    <SearchField
      disabled={isDisabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color={colors.disabledText} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default withTheme(Search)
