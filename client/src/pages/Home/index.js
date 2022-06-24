import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import ProfitSection from './ProfitSection';

export default function Home() {
  return (
    <Box>
      <HeroSection />
      <Box
        mt={12}
        sx={{
          background: 'url(/assets/images/bg-wave-1.png) no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <Box pt={50}>
          <ProfitSection />
        </Box>
      </Box>
    </Box>
  );
}