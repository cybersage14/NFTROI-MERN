import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import {
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  FONT_WEIGHT_NORMAL,
} from '../../utils/constants';
import { PrimaryButton } from '../../components/customComponents';

export default function NftRealTimeSection({ sx }) {
  return (
    <Container maxWidth="xl">
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} md={5}>
          <Box component="img" src="assets/images/nft-real-time-image.png" alt="" />
        </Grid>
        <Grid item xs={12} sm={12} md={2} />
        <Grid item xs={12} sm={6} md={5}>
          <Typography fontSize={FONT_SIZE_H2_DESKTOP} fontWeight={FONT_WEIGHT_NORMAL} sx={{ ...sx }}>
            NFT Real-Time Value Estimator
          </Typography>
          <Typography fontSize={FONT_SIZE_H3_DESKTOP} color={COLOR_SECONDARY_BRIGHT} mt={2} sx={{ ...sx }}>
            Want to see what your NFT or potential NFT investments is worth? Our tool has a comprehensive NFT real-time value estimator that can do just that!
          </Typography>
          <PrimaryButton
            variant="contained"
            sx={{
              mt: 4,
              py: 1,
              px: 3,
              fontWeight: FONT_WEIGHT_NORMAL,
              ...sx
            }}
          >
            Get on Estimate Now!
          </PrimaryButton>
        </Grid>
      </Grid>
    </Container>
  );
}