import styled, { css } from 'styled-components'

export const Root = styled.div`
  position: relative;
  z-index: 8;
  background: ${(p) =>
    p.isHomePage ? p.theme.colors.homeFooter : p.theme.colors.secondaryDefault};
  width: 100%;
  box-shadow: inset 0px 4px 5px 0px ${(p) => p.theme.colors.secondaryBg};
  padding: 18px 15px;

  @media screen and (max-width: 900px) {
    padding: 20px 15px;
  }
`
export const Container = styled.div`
  max-width: 1440px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`
export const SocialContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
    width: 100%;
  }
`
export const Copyright = styled.div`
  color: ${(p) =>
    p.isHomePage ? p.theme.colors._default : p.theme.colors.disabledText};
  width: 100%;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 53%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 1200px) {
    left: 65%;
    transform: translate(-50%, -50%);
  }

  @media screen and (max-width: 900px) {
    text-align: center;
    position: relative;
    left: unset;
    transform: none;
    margin-top: 38px;
  }
`
export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 10;

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`
export const MenuItem = styled.div`
  color: ${(p) =>
    p.isHomePage ? p.theme.colors._default : p.theme.colors.disabledText};
  cursor: pointer;
  margin-right: 30px;
  color: ${(p) => p.theme.colors.disabledText};
  font-weight: 600;

  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }

  @media screen and (max-width: 900px) {
    margin-right: 0;
    text-align: center;
    margin-top: 32px;

    &:first-of-type {
      margin-top: 8px;
    }
  }
`
export const Socials = styled.div`
  display: flex;
  background: rgba(145, 255, 189, 0.1);
  padding: 7px 12px;
  border-radius: 20px;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);

  ${(p) =>
    p.noaccount
      ? css`
          @media screen and (max-width: 1200px) {
            margin-top: 70px;
          }
        `
      : css``}

  @media screen and (max-width: 900px) {
    position: relative;
    top: unset;
    left: unset;
    transform: none;
    margin-top: ${(p) => (p.noaccount ? '80px' : '15px')};
  }

  @media screen and (max-width: 670px) {
    margin-top: 90px;
  }

  @media screen and (max-width: 550px) {
    margin-top: ${(p) => (p.noaccount ? '120px' : '90px')};
  }
`
export const SocialItem = styled.div`
  cursor: pointer;
  margin-left: 15px;
  display: flex;
  align-items: center;

  &:first-of-type {
    margin-left: 0;
  }
`
