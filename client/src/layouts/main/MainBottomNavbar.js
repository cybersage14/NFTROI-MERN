import React from 'react';
import { Box, Typography } from '@mui/material';
import { FONT_SIZE_BODY1_DESKTOP } from '../../utils/constants';

export default function MainBottomNavbar() {
  return (
    <Box py={8}>
      <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} textAlign="center">
        © Copyright {new Date().getFullYear()} NFTROI - All Rights Reserved
      </Typography>
    </Box>
  );
}