import styled from 'styled-components'

export const Container = styled.div`
  max-width: 605px;
  width: 100%;
  margin: 30px auto 0;
`
export const Content = styled.div`
  padding: 21px 10px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`
export const ValueContent = styled.div`
  margin-top: 24px;
`
export const OptionWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  width: 100%;
  margin-top: 35px;

  @media screen and (max-width: 548px) {
    flex-direction: column;
    margin-top: 0;
  }
`
export const Divider = styled.div`
  width: 1px;
  background: ${(p) => p.theme.colors.disabledText};

  @media screen and (max-width: 548px) {
    display: none;
  }
`
export const OptionContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50%;
  width: 100%;

  @media screen and (max-width: 548px) {
    margin-top: 25px;
    max-width: 100%;
  }
`
export const OptionText = styled.div`
  max-width: 170px;
  width: 100%;
  margin: 15px auto 0;
`
export const Bold = styled.span`
  font-weight: bold;
`
