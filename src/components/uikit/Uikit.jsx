import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { withTheme } from 'styled-components'
import { calculateYearlyCost } from '../../helpers'
import { Wrapper, Box, Column, ModalContent, ProgressTitle } from './styled'
import Title from '../shared/title/Title'
import Description from '../shared/description/Description'
import Search from '../shared/search/Search'
import Button from '../shared/button/Button'
import Container from '../shared/container/Container'
import Dropdown from '../shared/dropdown/Dropdown'
import MenuItem from '../shared/menuItem/MenuItem'
import BoxTitle from '../shared/boxTitle/BoxTitle'
import Accordion from '../shared/accordion/Accordion'
import CornerBox from '../shared/cornerBox/CornerBox'
import CornerBoxWalletInfo from '../shared/cornerBoxWalletInfo/CornerBoxWalletInfo'
import Checkbox from '../shared/checkbox/Checkbox'
import CurrencySwitcher from '../shared/currencySwitcher/CurrencySwitcher'
import TooltipGuideToggle from '../shared/tooltipGuideToggle/TooltipGuideToggle'
import LangSwitcher from '../shared/langSwitcher/LangSwitcher'
import Input from '../shared/input/Input'
import Modal from '../shared/modal/Modal'
import LoadingSpinner from '../shared/loadingSpinner/LoadingSpinner'
import FooterMenuItem from '../shared/footerMenuItem/FooterMenuItem'
import AnalyzingBox from '../shared/analyzingBox/AnalyzingBox'
import TableAssetName from '../shared/tableAssetName/TableAssetName'
import TableTitle from '../shared/tableTitle/TableTitle'
import TableValue from '../shared/tableValue/TableValue'
import Address from '../shared/address/Address'
import Text from '../shared/text/Text'
import SubTitle from '../shared/subTitle/SubTitle'
import ImportantInfoBox from '../shared/importantInfoBox/ImportantInfoBox'
import StakeInfoBox from '../shared/stakeInfoBox/StakeInfoBox'
import StakeAssetBox from '../shared/stakeAssetBox/StakeAssetBox'
import CornerBoxFooterTextInfo from '../shared/cornerBoxFooterTextInfo/CornerBoxFooterTextInfo'

const Uikit = ({ theme, t }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUsdPrimary, setIsUsdPrimary] = useState(false)
  const [isModalOpened1, setIsModalOpened1] = useState(false)
  const [isModalOpened2, setIsModalOpened2] = useState(false)
  const [isModalOpened3, setIsModalOpened3] = useState(false)
  const [isModalOpened4, setIsModalOpened4] = useState(false)
  const { colors } = theme

  const dropdownData = [
    {
      value: 'eth',
      title: 'ETH',
      logo: 'ETH-logo.png',
    },
    {
      value: 'dai',
      title: 'DAI',
      logo: 'DAI-logo.png',
    },
  ]

  const dropdownWithoutLogo = [
    {
      value: 'token1',
      title: 'Token 1',
    },
    {
      value: 'token2',
      title: 'Token 2',
    },
    {
      value: 'token3',
      title: 'Token 3',
    },
    {
      value: 'token4',
      title: 'Token 4',
    },
    {
      value: 'token5',
      title: 'Token 5',
    },
  ]

  const accordionData = [
    {
      address: '0xa4c8d221d8BB851f83aadd0223a8900A6921A349',
      balance: 0,
      capacity: {
        capacityDAI: 0,
        capacityETH: 0,
        netStakedNXM: 0,
      },
      decimals: 18,
      description: '',
      id: 'tokensetsv2',
      logo: 'tokensets.png',
      name: 'Set Protocol V2',
      supportedChains: {
        0: 'ethereum',
      },
      symbol: 'TOKENSETSV2',
    },
  ]

  const handleExpanded = () => {
    return setIsExpanded(!isExpanded)
  }

  const toggleUsdSwitcher = () => {
    return setIsUsdPrimary(!isUsdPrimary)
  }

  const onOpenModal = (setOpen) => {
    setOpen((e) => !e)
    setTimeout(() => {
      setIsModalOpened4(false)
    }, 2000)
  }

  const onCloseModal = (setClose) => {
    return setClose((e) => !e)
  }

  return (
    <Container>
      <Title text="UI kit!" />
      <Description text="test description text" />
      <Box>
        <Title text="Texts" />
        <Wrapper>
          <Column>
            <Title text="Title" />
          </Column>
          <Column>
            <Description text="test description text" />
          </Column>
          <Column>
            <Description text="test description text" isBlured />
          </Column>
          <Column>
            <MenuItem
              text="Menu Item"
              isCurrentPage={false}
              isBlurred={false}
              onClick={alert}
            />
          </Column>
          <Column>
            <MenuItem
              text="Menu Item Active"
              isCurrentPage={true}
              isBlurred={false}
              onClick={alert}
            />
          </Column>
          <Column>
            <MenuItem
              text="Menu Item"
              isCurrentPage={false}
              isBlurred={true}
              onClick={alert}
            />
          </Column>
          <Column>
            <BoxTitle text="Table Title" guideTooltipContent="tooltip text" />
          </Column>
          <Column>
            <FooterMenuItem text="Footer menu item 1" onClick={alert} />
          </Column>
          <Column>
            <TableAssetName text="Test Asset Name" logo="uniswap.png" />
          </Column>
          <Column>
            <TableAssetName
              text="Test Asset Name"
              logo="uniswap.png"
              isManual={true}
            />
          </Column>
          <Column>
            <TableTitle text="Table Title" />
          </Column>
          <Column>
            <TableTitle
              text="Table Title 1"
              guideTooltipContent="tooltip text"
            />
          </Column>
          <Column>
            <TableValue text="Table Cell" />
          </Column>
          <Column>
            <Address text="0x03233134250dsa11wdasdsafsg65" />
          </Column>
          <Column>
            <Text text="Simple Text" />
          </Column>
          <Column>
            <Text text="Bold Text" isBold={true} />
          </Column>
          <Column>
            <Text text="Color Text" color={colors._default} />
          </Column>
          <Column>
            <Text
              text="Large Bold Colored Text"
              color={colors.primaryLightTrue}
              size="lg"
              isBold={true}
            />
          </Column>
          <Column>
            <SubTitle text="SubTitle" />
          </Column>
          <Column>
            <SubTitle text="SubTitle 2" guideTooltipContent="tooltip text" />
          </Column>
        </Wrapper>
      </Box>
      <Box>
        <Title text="Inputs" />
        <Wrapper>
          <Column>
            <Search
              value="test"
              onChange={(e) => console.log(e)}
              placeholder="test placeholder"
            />
          </Column>
          <Column>
            <Search
              isDisabled={true}
              onChange={(e) => console.log(e)}
              placeholder="test placeholder"
            />
          </Column>
          <Column>
            <Search
              onChange={(e) => console.log(e)}
              placeholder="test placeholder"
            />
          </Column>
          <Column>
            <Input
              value="test"
              error={false}
              isDisabled={false}
              placeholder="placeholder"
              inputEndText="Test"
              onPressEnter={() => console.log('enter')}
            />
          </Column>
          <Column>
            <Input
              value="test 2"
              error={true}
              isDisabled={false}
              placeholder="placeholder 2"
              inputEndText="Test 2"
              infoBottomText="info text"
            />
          </Column>
          <Column>
            <Input
              isDisabled={false}
              placeholder="placeholder"
              inputEndText="Test 2"
              infoBottomText="info text"
            />
          </Column>
          <Column>
            <Input
              error={true}
              isDisabled={false}
              placeholder="placeholder"
              inputEndText="Test 2"
              errorBottomText="error text"
            />
          </Column>
          <Column>
            <Input
              isDisabled={true}
              placeholder="placeholder 2"
              inputEndText="Test"
            />
          </Column>
          <Column>
            <Input
              error={true}
              isDisabled={false}
              placeholder="placeholder"
              inputEndText="Test 2"
              errorBottomText="error text"
              infoBottomText="info text"
            />
          </Column>
          <Column>
            <Input
              isDisabled={false}
              placeholder="placeholder"
              dropdownValue="ETH"
              dropdownOptions={dropdownData}
              infoBottomText="info text"
            />
          </Column>
        </Wrapper>
      </Box>
      <Box>
        <Title text="Dropdowns" />
        <Wrapper>
          <Column>
            <Dropdown options={dropdownData} value="dai" />
          </Column>
          <Column>
            <Dropdown options={dropdownData} value="eth" isDisabled={true} />
            <Dropdown options={dropdownData} name="test" value="eth" />
          </Column>
          <Column>
            <Dropdown
              options={dropdownWithoutLogo}
              name="test"
              value="token2"
            />
          </Column>
          <Column>
            <LangSwitcher />
          </Column>
          {accordionData.map((contract) => (
            <Accordion
              key={contract.id + '_expand'}
              id={contract.id + '_expand'}
              logo={contract.logo}
              name={contract.name}
              address={contract.address}
              yearlyCostValue={`${calculateYearlyCost(
                contract.capacity.netStakedNXM
              )}%`}
              yearlyCostTitle="Yearly Cost"
              capacity="45"
              capacitySymbol="ETH"
              coverAvailableTitle="Cover Available"
              isExpanded={isExpanded}
              onChange={handleExpanded}
            >
              Accordion Details
            </Accordion>
          ))}
        </Wrapper>
      </Box>
      <Box>
        <Title text="Buttons" />
        <Wrapper>
          <Column>
            <Button
              isDisabled={false}
              content={'test'}
              tooltipContent={'tooltipContent'}
              guideTooltipContent={'guideTooltipContent'}
              onClick={alert}
            />
            <Button
              isDisabled={true}
              content={'test 2'}
              tooltipContent={'tooltipContent 2'}
              guideTooltipContent={'guideTooltipContent 2'}
            />
            <Button
              isDisabled={false}
              content={'test 3'}
              variant="outlined"
              onClick={alert}
            />
          </Column>
          <Column>
            <Button
              fullWidth={true}
              isDisabled={false}
              content={'test 3'}
              guideTooltipContent={'guideTooltipContent 3'}
              variant="outlined"
              onClick={alert}
            />
          </Column>
          <Column>
            <Button
              fullWidth={true}
              size="lg"
              isDisabled={true}
              content={'test 3'}
              tooltipContent={'tooltipContent 3'}
              guideTooltipContent={'guideTooltipContent 3'}
              onClick={alert}
            />
          </Column>
          <Column>
            <Button
              size="lg"
              isDisabled={false}
              content={'test 3'}
              tooltipContent={'tooltipContent 3'}
              guideTooltipContent={'guideTooltipContent 3'}
              onClick={alert}
            />
            <Button
              isDisabled={false}
              size="lg"
              content={'test 3'}
              tooltipContent={'tooltipContent 3'}
              guideTooltipContent={'guideTooltipContent 3'}
              variant="token"
              onClick={alert}
            />
          </Column>
        </Wrapper>
      </Box>
      <Box>
        <Title text="Containers" />
        <Wrapper>
          <Column />
          <CornerBox>
            <br />
            <br />
            Example container with background and corners
            <br />
            <br />
            <CornerBoxWalletInfo text="Available wallet info:" value="25 ETH" />
          </CornerBox>
          <Column />
          <CornerBox>
            <br />
            <br />
            Example container with background and corners
            <br />
            <br />
            <CornerBoxWalletInfo
              text="Available wallet info:"
              value="25 ETH"
              center={true}
            />
          </CornerBox>
          <Column />
          <CornerBox>
            <br />
            <br />
            Example container with background and corners
            <br />
            <br />
            <CornerBoxFooterTextInfo text="Footer info text" />
          </CornerBox>
          <Column />
          <AnalyzingBox text="Analizing text" />
          <Column />
          <ImportantInfoBox
            title="Important info"
            text="Important blah-blah-blah"
          />
          <Column>
            <StakeInfoBox title="Managed Assets" value="392,503.1 NXM" />
          </Column>
          <Column>
            <StakeInfoBox title="Managed Assets 2" value="392,503.1 NXM" />
          </Column>
          <Column>
            <StakeInfoBox title="Managed Assets 3" value="392,503.1 NXM" />
          </Column>
          <StakeAssetBox
            logo="uniswapv2.png"
            title="Uniswap V2"
            usdValue="23231"
            nxmValue="446566"
          />
        </Wrapper>
      </Box>
      <Box>
        <Title text="Checkboxes" />
        <Wrapper>
          <Column>
            <Checkbox />
            <Checkbox isChecked={true} />
            <Checkbox isHighlighted={true} />
          </Column>
          <Column>
            <CurrencySwitcher
              isUsdPrimary={isUsdPrimary}
              onClick={toggleUsdSwitcher}
            />
          </Column>
          <Column>
            <TooltipGuideToggle />
          </Column>
        </Wrapper>
      </Box>
      <Box>
        <Title text="Modals" />
        <Wrapper>
          <Column>
            <Button
              content="modal 1"
              onClick={() => onOpenModal(setIsModalOpened1)}
            />
            <Modal
              isModalOpened={isModalOpened1}
              closeModal={() => onCloseModal(setIsModalOpened1)}
            >
              <ModalContent>
                <br />
                <br />
                <br />
                <div>modal content 1</div>
                <br />
                <br />
                <br />
              </ModalContent>
            </Modal>
          </Column>
          <Column>
            <Button
              content="modal 2"
              onClick={() => onOpenModal(setIsModalOpened2)}
            />
            <Modal
              isModalOpened={isModalOpened2}
              closeModal={() => onCloseModal(setIsModalOpened2)}
            >
              <ModalContent>
                <br />
                <br />
                <br />
                <div>modal content 2</div>
                <br />
                <br />
                <br />
              </ModalContent>
            </Modal>
          </Column>
          <Column>
            <Button
              content="modal 3"
              onClick={() => onOpenModal(setIsModalOpened3)}
            />
            <Modal
              isModalOpened={isModalOpened3}
              closeModal={() => onCloseModal(setIsModalOpened3)}
            >
              <ModalContent>
                <br />
                <br />
                <div>modal content 3</div>
                <br />
                <Button
                  content="Decline"
                  onClick={() => onOpenModal(setIsModalOpened3)}
                  variant="outlined"
                />
                <br />
              </ModalContent>
            </Modal>
          </Column>
          <Column>
            <Button
              content="modal 4"
              onClick={() => onOpenModal(setIsModalOpened4)}
            />
            <Modal isModalOpened={isModalOpened4}>
              <ModalContent>
                <ProgressTitle>In Progress...</ProgressTitle>
                <br />
                <LoadingSpinner color={colors.active} />
                <br />
              </ModalContent>
            </Modal>
          </Column>
        </Wrapper>
      </Box>
      <Box>
        <Title text="New Components" />
        <Wrapper>
          <Column>New Components</Column>
        </Wrapper>
      </Box>
    </Container>
  )
}

export default withTranslation()(withRouter(withTheme(Uikit)))
