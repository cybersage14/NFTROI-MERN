import React from 'react';
import { Box, Grid } from "@mui/material";
import {
  BLUR_LOW,
  COLOR_SECONDARY,
  COLOR_WHITE_OPACITY_ONE
} from '../../utils/constants';
import { PrimaryButton, PrimaryTextField } from '../../components/customComponents';

export default function InputWallet({ setWallet, addWallet, keyPress }) {
  return (
    <Box
      py={10}
      px={5}
      borderRadius={2}
      bgcolor={COLOR_WHITE_OPACITY_ONE}
      border={`2px solid ${COLOR_SECONDARY}`}
      sx={{
        backdropFilter: BLUR_LOW
      }}
    >
      <Grid
        container
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={10} md={10}>
          <PrimaryTextField
            placeholder="Put your wallet address here"
            onChange={e => setWallet(e.target.value)}
            onKeyDown={keyPress}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} md={2}>
          <PrimaryButton onClick={addWallet} sx={{ height: '100%' }} fullWidth>
            Analyse
          </PrimaryButton>
        </Grid>
      </Grid>
    </Box>
  );
}