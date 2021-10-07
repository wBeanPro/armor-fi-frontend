import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Chooser, LangIcon } from './styled'

const LangSwitcher = ({ langs, lang, setLang }) => {
  const handleLangSwitch = (e) => {
    setLang(e.target.value)
  }
  return (
    <div>
      <Chooser>
        <Select value={lang} onChange={handleLangSwitch}>
          {langs.map((l, i) => {
            return (
              <MenuItem key={l + i} value={l}>
                <LangIcon
                  src={require(`../../assets/langs/${l}.svg`)}
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
