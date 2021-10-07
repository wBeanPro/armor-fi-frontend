import styled from 'styled-components'
import _Button from '@material-ui/core/Button'

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 50px 0;
  justify-content: center;
`
export const Button = styled(_Button)`
  padding: 10px 24px;
  border-width: 2px;
  border-radius: 50px;
  & .MuiButton-label {
    text-transform: none;
    font-size: 1rem;
  }

  &:hover {
    border-width: 2px;
  }
`
