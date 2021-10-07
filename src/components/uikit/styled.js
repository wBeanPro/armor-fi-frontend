import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Box = styled.div`
  margin-top: 30px;
`
export const Column = styled.div`
  max-width: 250px;
  width: 100%;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
export const ProgressTitle = styled.p`
  color: ${(p) => p.theme.colors.secondary};
  padding: 15px 10px;
  background: ${(p) => p.theme.colors.transparentBg};
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
`
