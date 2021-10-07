import React from 'react'
import { withTranslation } from 'react-i18next'
import {
  Box,
  Action,
  ActionTitle,
  InputTitle,
  TextField,
  Button,
  ButtonText,
  Skeleton,
} from './styled'
import { SubTitle } from '../common/SubTitle'

const ArNxmVaultSkeleton = ({ t }) => (
  <>
    <SubTitle top="50">{t('ArNxm.StakeAndUnstake')}</SubTitle>
    <Box>
      <Action>
        <ActionTitle>
          <InputTitle>
            <Skeleton
              animation={false}
              variant={'text'}
              width={155}
              height={20}
            />
          </InputTitle>
          <Skeleton animation={false} variant={'text'} width={30} height={20} />
        </ActionTitle>
        <TextField
          fullWidth
          placeholder="0"
          variant="outlined"
          type="text"
          disabled
        />
        <Skeleton animation={false} variant={'text'} width={60} height={20} />
        <Button variant="contained" color="primary" disabled>
          <ButtonText>{t('HarvestArnxm.Stake')}</ButtonText>
        </Button>
      </Action>
      <Action>
        <ActionTitle>
          <InputTitle>
            <Skeleton
              animation={false}
              variant={'text'}
              width={155}
              height={20}
            />
          </InputTitle>
          <Skeleton animation={false} variant={'text'} width={30} height={20} />
        </ActionTitle>
        <TextField
          fullWidth
          placeholder="0"
          variant="outlined"
          type="text"
          disabled
        />
        <Skeleton animation={false} variant={'text'} width={60} height={20} />
        <Button variant="contained" color="primary" disabled>
          <ButtonText>{t('ArNxm.WrapAndStake')}</ButtonText>
        </Button>
      </Action>
      <Action>
        <ActionTitle>
          <InputTitle>
            <Skeleton
              animation={false}
              variant={'text'}
              width={180}
              height={20}
            />
          </InputTitle>
          <Skeleton animation={false} variant={'text'} width={30} height={20} />
        </ActionTitle>
        <TextField
          fullWidth
          placeholder="0"
          variant="outlined"
          type="text"
          disabled
        />
        <Skeleton animation={false} variant={'text'} width={80} height={20} />
        <Button variant="contained" color="primary" disabled>
          <ButtonText>{t('HarvestArnxm.Unstake')}</ButtonText>
        </Button>
      </Action>
    </Box>
  </>
)

export default withTranslation()(ArNxmVaultSkeleton)
