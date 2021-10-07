import React from 'react'
import { checkOnImageExist, checkOnValueExist } from '../../../helpers'
import TokenLogo from '../tokenLogo/TokenLogo'
import {
  DropdownStyled,
  SelectMenu,
  SelectIcon,
  SelectIconName,
} from './styled'

const Dropdown = ({
  name = 'assets',
  value,
  onChange,
  isDisabled = false,
  options,
}) => (
  <DropdownStyled
    select
    name={name}
    value={checkOnValueExist(value, options)}
    onChange={onChange}
    SelectProps={{ native: false }}
    disabled={isDisabled}
  >
    {options &&
      options.map((option) => (
        <SelectMenu key={option.value} value={option.value}>
          <React.Fragment>
            {option.logo && (
              <SelectIcon>
                <TokenLogo logo={option.logo} />
              </SelectIcon>
            )}
            <SelectIconName>{option.title}</SelectIconName>
          </React.Fragment>
        </SelectMenu>
      ))}
  </DropdownStyled>
)

export default Dropdown
