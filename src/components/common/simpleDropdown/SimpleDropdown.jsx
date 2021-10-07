import React from 'react'
import {
  DropdownStyled,
  SelectMenu,
  SelectIcon,
  SelectIconName,
  Placeholder,
} from './styled'

const SimpleDropdown = ({
  options,
  placeholder = '',
  name,
  value,
  onChange,
  disabled,
}) => {
  return (
    <DropdownStyled
      select
      name={name}
      value={value}
      onChange={onChange}
      SelectProps={{ native: false }}
      disabled={disabled}
    >
      <SelectMenu value="placeholder" disabled>
        <Placeholder>{placeholder}</Placeholder>
      </SelectMenu>
      {options &&
        options.map((option) => (
          <SelectMenu key={option.address} value={option.address}>
            <React.Fragment>
              <SelectIcon>
                <img
                  alt="assets logo"
                  src={require('../../../assets/' + (option.logo || 'eth.png'))}
                  height="20px"
                />
              </SelectIcon>
              <SelectIconName>{option.name}</SelectIconName>
            </React.Fragment>
          </SelectMenu>
        ))}
    </DropdownStyled>
  )
}

export default SimpleDropdown
