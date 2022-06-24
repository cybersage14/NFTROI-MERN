import React from 'react';
import { Container, Grid, Typography, Box, Stack } from '@mui/material';
import {
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  FONT_WEIGHT_NORMAL,
} from '../../utils/constants';
import { PrimaryButton } from '../../components/customComponents';

export default function StaySection({ sx }) {
  return (
    <Container maxWidth="xl" sx={{ pt: 30 }}>
      <Grid container>
        <Grid item xs={12} sm={6} md={5}>
          <Typography fontSize={FONT_SIZE_H2_DESKTOP} fontWeight={FONT_WEIGHT_NORMAL}>
            Stay on Top of Expenses
          </Typography>
          <Typography fontSize={FONT_SIZE_H3_DESKTOP} color={COLOR_SECONDARY_BRIGHT} mt={2}>
            Stay up to date on all your expenses from gas to listing fees to know where your money is going and make wiser financial decisions.
          </Typography>
          <PrimaryButton
            variant="contained"
            sx={{
              mt: 4,
              py: 1,
              px: 3,
              fontWeight: FONT_WEIGHT_NORMAL
            }}
          >
            Get started now!
          </PrimaryButton>
        </Grid>
        <Grid item xs={12} sm={12} md={2} />
        <Grid item xs={12} sm={6} md={5}>
          <Stack direction="row" justifyContent="end">
            <Box component="img" src="assets/images/stay-image.png" alt="" sx={{ ...sx }} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}