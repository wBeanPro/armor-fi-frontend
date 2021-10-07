import React, { useState, useEffect } from 'react'
import {
  DropDownContainer,
  DropDownListContainer,
  ListContainer,
  SelectMenu,
  SelectIcon,
  SelectIconName,
  Placeholder,
  SearchContainer,
} from './styled'
import { formatETH } from '../../../helpers'
import Search from '../search/Search'
import ArrowIcon from '../../icons/ArrowIcon'
import Modal from '../modal/Modal'

const NewStyleDropdown = ({
  options,
  placeholder = '',
  name,
  value,
  onChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [filteredOptions, setFilteredOptions] = useState([])

  useEffect(() => {
    if (search) {
      const _filteredOptions = options.filter(
        (option) =>
          option.name.toLowerCase().includes(search.toLowerCase()) ||
          (search.toLowerCase().includes('0x') &&
            option.address.toLowerCase().includes(search.toLowerCase()))
      )
      setFilteredOptions(_filteredOptions)
    } else {
      setFilteredOptions(options)
    }
  }, [search])

  const onSearchChanged = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <DropDownContainer
        onClick={() => {
          setIsOpen(true)
        }}
      >
        {value ? (
          <SelectMenu>
            <SelectIcon>
              <img
                alt="assets logo"
                src={require('../../../assets/' + (value.logo || 'eth.png'))}
                height="20px"
              />
            </SelectIcon>
            <SelectIconName>
              {value.name}{' '}
              {value.coverageLeft &&
                `[${formatETH(value.coverageLeft, {
                  compact: true,
                  digits: 2,
                })}]`}
            </SelectIconName>
          </SelectMenu>
        ) : (
          <Placeholder>{placeholder}</Placeholder>
        )}
        <ArrowIcon color={'white'} />
      </DropDownContainer>
      <Modal
        closeModal={() => setIsOpen(false)}
        isModalOpened={isOpen}
        width="360"
      >
        <DropDownListContainer>
          <SearchContainer>
            <Search
              disabled={disabled}
              value={search}
              onChange={onSearchChanged}
              placeholder="Search by name or address..."
            />
          </SearchContainer>

          <ListContainer>
            {filteredOptions &&
              filteredOptions.map((option) => (
                <SelectMenu
                  key={option.id}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                >
                  <SelectIcon>
                    <img
                      alt="assets logo"
                      src={require('../../../assets/' +
                        (option.logo || 'eth.png'))}
                      height="20px"
                    />
                  </SelectIcon>
                  <SelectIconName>
                    {option.name}{' '}
                    {option.coverageLeft &&
                      `[${formatETH(option.coverageLeft, {
                        compact: true,
                        digits: 2,
                      })}]`}
                  </SelectIconName>
                </SelectMenu>
              ))}
          </ListContainer>
        </DropDownListContainer>
      </Modal>
    </>
  )
}

export default NewStyleDropdown
