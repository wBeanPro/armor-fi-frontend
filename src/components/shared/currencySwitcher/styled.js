import styled, { css } from 'styled-components'

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(p) => p.theme.colors.defaultArrow};
  border-radius: 16px;
  overflow: hidden;
  width: 100px;
  position: relative;
  height: 32px;

  &::before {
    content: '';
    width: 48px;
    height: calc(100% - 4px);
    background: ${(p) => p.theme.colors.active};
    position: absolute;
    z-index: 1;
    border-radius: 16px;
    top: 2px;
    transition: right 0.3s;

    ${(p) =>
      p.primary
        ? css`
            right: 50px;
          `
        : css`
            right: 2px;
          `}
  }
`
export const ToggleSwitchButton = styled.div`
  width: 50px;
  height: 32px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  color: ${(p) => p.theme.colors.secondary};
`
