import React from 'react';
import { Container, Grid, Typography, Box, Stack } from '@mui/material';
import {
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  FONT_WEIGHT_NORMAL,
} from '../../utils/constants';
import { PrimaryButton } from '../../components/customComponents';

export default function NftRealTimeSection({ sx }) {
  return (
    <Container maxWidth="xl" sx={{ ...sx }}>
      <Grid
        container
        alignItems="center"
        flexDirection={{ xs: 'column-reverse', sm: 'row' }}
        spacing={{ xs: 3, md: 0 }}
      >
        <Grid item xs={12} sm={6} md={5}>
          <Box component="img" src="assets/images/nft-real-time-image.png" alt="" />
        </Grid>
        <Grid item xs={12} sm={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }} />
        <Grid item xs={12} sm={6} md={5}>
          <Typography
            fontSize={FONT_SIZE_H2_DESKTOP}
            fontWeight={FONT_WEIGHT_NORMAL}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            NFT Real-Time Value Estimator
          </Typography>
          <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            color={COLOR_SECONDARY_BRIGHT}
            mt={2}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            Want to see what your NFT or potential NFT investments is worth? Our tool has a comprehensive NFT real-time value estimator that can do just that!
          </Typography>
          <Stack direction="row" justifyContent={{ xs: 'center', md: 'start' }}>
            <PrimaryButton
              variant="contained"
              sx={{
                mt: 4,
                py: 1,
                px: 3,
                fontWeight: FONT_WEIGHT_NORMAL
              }}
            >
              Get on Estimate Now!
            </PrimaryButton>
          </Stack>
        </Grid>
      </Grid>
    </Container >
  );
}