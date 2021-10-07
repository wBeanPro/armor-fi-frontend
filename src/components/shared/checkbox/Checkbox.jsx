import React from 'react'
import { CheckboxLabel, AssetCheckbox, Checkmark } from './styled'

const Checkbox = ({ isChecked = false, isHighlighted = false, onChange }) => (
  <CheckboxLabel
    control={
      <>
        <AssetCheckbox
          ishighlighted={isHighlighted ? 1 : 0}
          checked={isChecked}
          onChange={onChange}
          color="primary"
          name="Assets"
        />
        <Checkmark />
      </>
    }
  />
)

export default Checkbox
