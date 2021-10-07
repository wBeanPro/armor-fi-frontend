import styled from 'styled-components'

export const AssetWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
`
export const AssetsTitle = styled.div`
  display: flex;
  flex-direction: column;
`
export const AssetsName = styled.h5`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.02em;
  flex-wrap: wrap;
  color: ${(p) => p.theme.colors.active};
  display: flex;
  align-items: center;

  & span {
    display: flex;
    margin-left: 5px;
  }
  & svg {
    max-width: 18px;
    height: 18px;
    width: 100%;
  }
`
export const CropSpan = styled.span`
  max-width: 108px;
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0 !important;
  display: block !important;
`
export const AssetLogoImg = styled.img`
  border-radius: 12px;
  height: 24px;
  width: 24px;
  margin-right: 5px;
`
export const TooltipSpan = styled.span`
  height: 16px;
  max-width: 16px;
  min-width: 16px;
  margin-left: 4px;
  width: 100%;
  display: flex;
  & svg {
    height: 16px;
    max-width: 16px;
    width: 100%;
    min-width: 16px;
  }
`
