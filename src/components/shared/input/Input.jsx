import React from 'react'
import { checkOnValueExist } from '../../../helpers'
import {
  InputField,
  InputInfo,
  HelperTextWrapper,
  Info,
  Dropdown,
  SelectMenu,
  SelectIconName,
} from './styled'

const Input = ({
  value,
  error,
  onChange,
  isDisabled,
  placeholder,
  errorBottomText,
  infoBottomText,
  inputEndText,
  onPressEnter,
  dropdownName = 'assets',
  dropdownValue,
  onDropdownChange,
  isDropdownDisabled,
  dropdownOptions,
}) => {
  const inputKeyDown = (event) => {
    if (event.which === 13) onPressEnter()
  }

  return (
    <InputField
      fullWidth
      value={value}
      error={error}
      onChange={onChange}
      disabled={isDisabled}
      placeholder={placeholder}
      variant="outlined"
      onKeyDown={inputKeyDown}
      InputProps={{
        endAdornment: (
          <>
            {inputEndText && (
              <InputInfo position="end">{inputEndText}</InputInfo>
            )}
            {dropdownOptions && (
              <Dropdown
                select
                name={dropdownName}
                value={checkOnValueExist(dropdownValue, dropdownOptions)}
                onChange={onDropdownChange}
                SelectProps={{
                  native: false,
                }}
                disabled={isDropdownDisabled}
              >
                {dropdownOptions.map((option) => (
                  <SelectMenu key={option.value} value={option.value}>
                    <React.Fragment>
                      <SelectIconName>{option.title}</SelectIconName>
                    </React.Fragment>
                  </SelectMenu>
                ))}
              </Dropdown>
            )}
          </>
        ),
      }}
      helperText={
        <HelperTextWrapper>
          {infoBottomText && <Info>{infoBottomText}</Info>}
          {errorBottomText && <Info error="true">{errorBottomText}</Info>}
        </HelperTextWrapper>
      }
    />
  )
}

export default Input
