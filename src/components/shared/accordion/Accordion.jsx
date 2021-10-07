import React from 'react'
import { withTheme } from 'styled-components'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Address from '../address/Address'
import TokenLogo from '../tokenLogo/TokenLogo'
import PageText from '../text/Text'

import {
  ExpansionPanel,
  AssetSummary,
  HeadingName,
  AssetIcon,
  Heading,
  Spacer,
} from './styled'

const Accordion = ({
  theme,
  children,
  isExpanded,
  onChange,
  id,
  logo,
  name,
  address,
  yearlyCostValue,
  yearlyCostTitle,
  capacity,
  capacitySymbol,
  coverAvailableTitle,
}) => {
  const { colors } = theme
  return (
    <ExpansionPanel square key={id} expanded={isExpanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <AssetSummary>
          <HeadingName>
            <AssetIcon>
              <TokenLogo logo={logo} />
            </AssetIcon>
            <div>
              <PageText text={name} isBold={true} size="large" />
              <Spacer>
                <Address value={address} />
              </Spacer>
            </div>
          </HeadingName>
          <Heading>
            <PageText text={yearlyCostValue} isBold={true} size="large" />
            <Spacer>
              <PageText text={yearlyCostTitle} color={colors._default} />
            </Spacer>
          </Heading>
          <Heading>
            <PageText
              text={`${capacity} ${capacitySymbol}`}
              isBold={true}
              size="large"
            />
            <Spacer>
              <PageText text={coverAvailableTitle} color={colors._default} />
            </Spacer>
          </Heading>
        </AssetSummary>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </ExpansionPanel>
  )
}

export default withTheme(Accordion)
