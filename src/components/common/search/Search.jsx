import React from 'react'
import { withTheme } from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import { SearchField } from './styled'
import SearchIcon from '../../icons/SearchIcon'

const Search = ({
  theme,
  disabled,
  value,
  error = false,
  onChange,
  placeholder,
}) => {
  const { colors } = theme

  return (
    <SearchField
      fullWidth
      disabled={disabled}
      value={value}
      error={error}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <SearchIcon color={colors.disabledText} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default withTheme(Search)
