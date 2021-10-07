import styled from 'styled-components'

export const DropDownListContainer = styled.div``
export const SearchContainer = styled.div`
  padding: 12px 12px 12px 15px;
`
export const DropDownContainer = styled.div`
  max-width: 285px;
  height: 40px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.colors.primaryLightTrue};
  background: transparent;
  color: ${(p) => p.theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    height: 10px;
    width: 10px;
    margin-right: 10px;
  }

  @media screen and (max-width: 448px) {
    margin-left: 0;
    max-width: 300px;
  }
`
export const Placeholder = styled.div`
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.primaryDefault};
`
export const ListContainer = styled.div`
  height: 70vh;
  overflow: auto;
`
export const SelectMenu = styled.div`
  padding: 12px 12px 12px 15px;
  min-width: 200px;
  display: flex;
  align-items: center;
`
export const SelectIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  height: 30px;
  max-width: 30px;
  width: 100%;
  min-width: 30px;
  border: 1px solid ${(p) => p.theme.colors.buttonActiveBg};
  background: ${(p) => p.theme.colors.secondary};

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
  }

  @media screen and (max-width: 548px) {
    height: 20px;
    max-width: 20px;
    width: 100%;
    min-width: 20px;
  }
`
export const SelectIconName = styled.h4`
  padding-left: 10px;
  display: inline-block;
  vertical-align: middle;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: ${(p) => p.theme.colors.secondary};
`
