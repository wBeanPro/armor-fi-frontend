import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { checkOnImageExist } from '../../../helpers'
import { withTheme } from 'styled-components'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import i18n, { langs } from '../../../i18n'
import { Chooser, LangIcon } from './styled'

const LangSwitcher = () => {
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('armor-website-language') || langs[0]
  )

  const setLanguage = (e) => {
    const newLang = e.target.value
    if (langs.includes(newLang)) {
      setCurrentLang(newLang)
      i18n.changeLanguage(newLang)
      localStorage.setItem('armor-website-language', newLang)
    }
  }

  return (
    <div>
      <Chooser>
        <Select value={currentLang} onChange={setLanguage}>
          {langs.map((l, i) => {
            return (
              <MenuItem key={l + i} value={l}>
                <LangIcon
                  src={checkOnImageExist(`langs/${l}.svg`, 'langs/en.svg')}
                  alt="language icon"
                />
              </MenuItem>
            )
          })}
        </Select>
      </Chooser>
    </div>
  )
}

export default withRouter(withTheme(LangSwitcher))
