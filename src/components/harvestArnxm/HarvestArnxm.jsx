import React, { useEffect, useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { withTranslation } from 'react-i18next'
import DownloadIcon from '../icons/DownloadIcon'
import {
  Accordion,
  Head,
  ExpandIcon,
  AccordionWrapper,
  Cell,
  Logo,
  CellContent,
  NameLogo,
  Value,
  Heading,
  MobileWrapper,
  HeadGradient,
  MobileContent,
  AccordionDetails,
  ActionContainer,
  Action,
  ActionTitle,
  InputTitle,
  MaxButton,
  ActionInput,
  ActionButton,
  ButtonText,
  ActionFooter,
  MainButton,
  MainButtonText,
  FooterText,
} from './styled'

const HarvestArnxm = ({ classes, theme, isOpened, data, t }) => {
  const [isExpanded, setIsExpanded] = useState(data[0].nameLogo || null)
  const [stakeValue, setStakeValue] = useState('')
  const [unstakeValue, setUnstakeValue] = useState('')
  const { colors } = theme

  const toggleAccordion = (nameLogo) => {
    setIsExpanded(isExpanded === nameLogo ? null : nameLogo)
  }

  const handleChangeStake = (e) => {
    const _stakeValue = e.target.value
    if (_stakeValue.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+_stakeValue)) {
      setStakeValue(_stakeValue)
    }
  }

  const handleChangeUnstake = (e) => {
    const _unstakeValue = e.target.value
    if (_unstakeValue.match(/^[0-9]*\.?[0-9]*$/) && !isNaN(+_unstakeValue)) {
      setUnstakeValue(_unstakeValue)
    }
  }

  const handleClickStake = () => {}

  const handleClickUnstake = () => {}

  return (
    <>
      {data.map(
        (
          { logo, nameLogo, apy, earned, balance, staked, valueStaked },
          index
        ) => (
          <Accordion
            expanded={isExpanded === nameLogo}
            onChange={() => {
              toggleAccordion(nameLogo)
            }}
            key={index}
          >
            <Head expandIcon={<ExpandIcon />}>
              <AccordionWrapper>
                <Cell className="logoCell">
                  <Logo src={require(`../../assets/${logo}`)} alt="icon" />
                  <CellContent>
                    <NameLogo bold>{nameLogo}</NameLogo>
                    <NameLogo>{nameLogo}</NameLogo>
                  </CellContent>
                </Cell>
                <Cell>
                  <CellContent>
                    <Value>{apy}%</Value>
                    <Heading>{t('HarvestArnxm.TotalApy')}</Heading>
                  </CellContent>
                </Cell>
                <Cell>
                  <CellContent>
                    <Value>{earned}</Value>
                    <Heading>{t('HarvestArnxm.Earned')}</Heading>
                  </CellContent>
                </Cell>
                <Cell>
                  <CellContent>
                    <Value>{balance}</Value>
                    <Heading>{t('HarvestArnxm.Balance')}</Heading>
                  </CellContent>
                </Cell>
                <Cell>
                  <CellContent>
                    <Value>{staked}</Value>
                    <Heading>{t('HarvestArnxm.Staked')}</Heading>
                  </CellContent>
                </Cell>
                <Cell>
                  <CellContent>
                    <Value>${valueStaked}</Value>
                    <Heading>{t('HarvestArnxm.ValueStaked')}</Heading>
                  </CellContent>
                </Cell>
              </AccordionWrapper>
              <MobileWrapper>
                <HeadGradient>
                  <Cell>
                    <Logo src={require(`../../assets/${logo}`)} alt="icon" />
                    <NameLogo bold>{nameLogo}</NameLogo>
                  </Cell>
                </HeadGradient>
                <MobileContent>
                  <CellContent>
                    <Value>{apy}%</Value>
                    <Heading>{t('HarvestArnxm.TotalApy')}</Heading>
                  </CellContent>
                  <CellContent>
                    <Value>{earned}</Value>
                    <Heading>{t('HarvestArnxm.Earned')}</Heading>
                  </CellContent>
                  <CellContent>
                    <Value>{balance}</Value>
                    <Heading>{t('HarvestArnxm.Balance')}</Heading>
                  </CellContent>
                  <CellContent>
                    <Value>{staked}</Value>
                    <Heading>{t('HarvestArnxm.Staked')}</Heading>
                  </CellContent>
                  <CellContent>
                    <Value>${valueStaked}</Value>
                    <Heading>{t('HarvestArnxm.ValueStaked')}</Heading>
                  </CellContent>
                </MobileContent>
              </MobileWrapper>
            </Head>
            <AccordionDetails>
              <ActionContainer>
                <Action>
                  <ActionTitle>
                    <InputTitle>
                      <span>{t('HarvestArnxm.Balance')}: </span>0
                    </InputTitle>
                    <MaxButton>MAX</MaxButton>
                  </ActionTitle>
                  <ActionInput
                    fullWidth
                    placeholder="0"
                    variant="outlined"
                    type="text"
                    onChange={handleChangeStake}
                    value={stakeValue}
                  />
                  <ActionButton
                    variant="contained"
                    color="primary"
                    disabled={!stakeValue}
                    onClick={handleClickStake}
                  >
                    <ButtonText>{t('HarvestArnxm.Stake')}</ButtonText>
                  </ActionButton>
                </Action>
                <Action>
                  <ActionTitle>
                    <InputTitle>
                      <span>{t('HarvestArnxm.Staked')}: </span>0
                    </InputTitle>
                    <MaxButton>MAX</MaxButton>
                  </ActionTitle>
                  <ActionInput
                    fullWidth
                    placeholder="0"
                    variant="outlined"
                    type="text"
                    onChange={handleChangeUnstake}
                    value={unstakeValue}
                  />
                  <ActionButton
                    variant="contained"
                    color="primary"
                    disabled={!unstakeValue}
                    onClick={handleClickUnstake}
                  >
                    <ButtonText>{t('HarvestArnxm.Unstake')}</ButtonText>
                  </ActionButton>
                </Action>
              </ActionContainer>
              <ActionFooter>
                <MainButton variant="contained" color="primary">
                  <MainButtonText>{t('HarvestArnxm.Harvest')}</MainButtonText>
                  <DownloadIcon color={colors.secondary} />
                </MainButton>
                <FooterText>{t('HarvestArnxm.InfoText')}</FooterText>
              </ActionFooter>
            </AccordionDetails>
          </Accordion>
        )
      )}
    </>
  )
}

export default withTranslation()(withRouter(withTheme(HarvestArnxm)))
