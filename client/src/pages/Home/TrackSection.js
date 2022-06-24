import React from 'react';
import { Container, Grid, Typography, Box, InputAdornment } from '@mui/material';
import {
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  FONT_WEIGHT_NORMAL,
} from '../../utils/constants';
import { PrimaryButton, PrimaryTextField } from '../../components/customComponents';

export default function TrackSection({ sx }) {
  return (
    <Container maxWidth="xl" sx={{ ...sx }}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} md={5}>
          <Box position="relative">
            <Box
              component="img"
              src="assets/images/elipse-gradient.png"
              alt=""
            />
            <Box position="absolute" top={0}>
              <Box position="relative">
                <Box
                  component="img"
                  src="assets/images/track-image.png"
                  alt=""
                  zIndex={10}
                />
                <Box
                  component="img"
                  src="assets/images/dot.png"
                  alt=""
                  position="absolute"
                  top="15%"
                  right="15%"
                  zIndex={20}
                />
                <Box
                  component="img"
                  src="assets/images/dot-small.png"
                  alt=""
                  position="absolute"
                  bottom="17%"
                  left="15%"
                  zIndex={20}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={2} />
        <Grid item xs={12} sm={6} md={5}>
          <Typography fontSize={FONT_SIZE_H2_DESKTOP} fontWeight={FONT_WEIGHT_NORMAL}>
            Track celebs’ wallets
          </Typography>
          <Typography fontSize={FONT_SIZE_H3_DESKTOP} color={COLOR_SECONDARY_BRIGHT} mt={2}>
            Want to see what your favorite Celebs are into when it comes to buying, trading, or minting? We can help you track their wallets so you can follow their lead!
          </Typography>
          <Box width="90%" mt={3}>
            <PrimaryTextField
              placeholder="Put your wallet address here"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="img" src="assets/images/person-2-rectangle.png" alt="" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <PrimaryButton variant="contained">
                      Analyze
                    </PrimaryButton>
                  </InputAdornment>
                )
              }}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}