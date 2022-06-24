import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import {
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  FONT_WEIGHT_NORMAL,
} from '../../utils/constants';
import { PrimaryButton } from '../../components/customComponents';

export default function PortfolioSection({ sx }) {
  return (
    <Container maxWidth="xl" sx={{ ...sx }}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} md={5}>
          <Box position="relative" width="fit-content">
            <Box component="img" src="assets/images/trunk.png" alt="" />
            <Box
              component="img"
              src="assets/images/trunk-badge-red.png"
              alt=""
              position="absolute"
              top="25%"
              left="-5%"
            />
            <Box
              component="img"
              src="assets/images/trunk-badge-green.png"
              alt=""
              position="absolute"
              bottom="10%"
              right="5%"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={2} />
        <Grid item xs={12} sm={6} md={5}>
          <Typography fontSize={FONT_SIZE_H2_DESKTOP} fontWeight={FONT_WEIGHT_NORMAL}>
            Portfolio analytics dashboard
          </Typography>
          <Typography fontSize={FONT_SIZE_H3_DESKTOP} color={COLOR_SECONDARY_BRIGHT} mt={2}>
            Real-time sales prices and charts! Get all the information you need to decide what to buy, sell or mint next!
          </Typography>
          <PrimaryButton
            variant="contained"
            sx={{
              mt: 4,
              py: 1,
              px: 3,
              fontWeight: FONT_WEIGHT_NORMAL,
            }}
          >
            Make wiser investments
          </PrimaryButton>
        </Grid>
      </Grid>
    </Container>
  );
}