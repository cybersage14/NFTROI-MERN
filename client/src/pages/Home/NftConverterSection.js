import React from 'react';
import { Container, Grid, Typography, Box, Stack } from '@mui/material';
import {
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  FONT_WEIGHT_NORMAL,
} from '../../utils/constants';
import { PrimaryButton } from '../../components/customComponents';

export default function NftConverterSection({ sx }) {
  return (
    <Container maxWidth="xl" sx={{ ...sx }}>
      <Grid container spacing={{ xs: 6, md: 0 }} alignItems="center">
        <Grid item xs={12} sm={6} md={5}>
          <Typography
            fontSize={FONT_SIZE_H2_DESKTOP}
            fontWeight={FONT_WEIGHT_NORMAL}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            NFT Converter
          </Typography>
          <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            color={COLOR_SECONDARY_BRIGHT}
            mt={2}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            Convert your digital product into an NFT with ease by using our user-friendly NFT converter.
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
              Try our NFT converter
            </PrimaryButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }} />
        <Grid item xs={12} sm={6} md={5}>
          <Stack direction="row" justifyContent="end">
            <Box component="img" src="assets/images/nft-converter-image.png" alt="" />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}