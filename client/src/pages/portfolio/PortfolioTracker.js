import React from 'react';
import {
  Stack,
  Icon as MuiIcon,
  Typography
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_BODY1_DESKTOP,
  ICON_NAME_PORTFOLIO_TRACKER
} from '../../utils/constants';
import Loading from './Loading';
import Stat from './Stat';
import InputWallet from './InputWallet';

export default function PortfolioTracker({
  loading, selectedWallet, wallets, setWallet, addWallet, keyPress
}) {
  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <MuiIcon
            sx={{
              color: COLOR_PRIMARY,
              fontSize: FONT_SIZE_H2_DESKTOP
            }}
          >
            <Icon icon={ICON_NAME_PORTFOLIO_TRACKER} />
          </MuiIcon>
          <Typography fontSize={FONT_SIZE_H2_DESKTOP}>
            Portfolio Tracker
          </Typography>
        </Stack>

        <Typography
          fontSize={FONT_SIZE_BODY1_DESKTOP}
          color={COLOR_SECONDARY_BRIGHT}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Stack>

      {
        loading ? <Loading /> :
          wallets.length > 0 ?
            <Stat selectedWallet={selectedWallet} /> :
            <InputWallet
              setWallet={setWallet}
              addWallet={addWallet}
              keyPress={keyPress}
            />
      }
    </>
  );
}