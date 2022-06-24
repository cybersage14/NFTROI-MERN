import React from 'react';
import { Container, Grid, Typography, Box, Stack } from '@mui/material';
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
      <Grid
        container
        alignItems="center"
        flexDirection={{ xs: 'column-reverse', sm: 'row' }}
        spacing={{ xs: 6, md: 0 }}
      >
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
        <Grid item xs={12} sm={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }} />
        <Grid item xs={12} sm={6} md={5}>
          <Typography
            fontSize={FONT_SIZE_H2_DESKTOP}
            fontWeight={FONT_WEIGHT_NORMAL}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            Portfolio analytics dashboard
          </Typography>
          <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            color={COLOR_SECONDARY_BRIGHT}
            mt={2}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            Real-time sales prices and charts! Get all the information you need to decide what to buy, sell or mint next!
          </Typography>
          <Stack direction="row" justifyContent={{ xs: 'center', md: 'start' }}>
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
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}