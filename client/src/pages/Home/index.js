import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import ProfitSection from './ProfitSection';
import NftRealTimeSection from './NftRealTimeSection';
import StaySection from './StaySection';
import TrackSection from './TrackSection';
import NftConverterSection from './NftConverterSection';
import PortfolioSection from './PortfolioSection';
import CompareSection from './CompareSection';

export default function Home() {
  return (
    <Box>
      <HeroSection />
      <Box
        mt={12}
        sx={{
          background: 'url(/assets/images/bg-wave-1.png) no-repeat',
          backgroundSize: 'contain'
        }}
        pt={70}
        position="relative"
      >
        <ProfitSection />

        <Box component="img" src="assets/images/wave.png" alt="" width="100%" mt={20} zIndex={5} />
        <Box
          sx={{
            background: 'url(/assets/images/vector-4.png) no-repeat',
            backgroundSize: 'cover'
          }}
          py={20}
        >
          <NftRealTimeSection />
        </Box>

        <Box
          sx={{
            background: 'url(/assets/images/elipse.png) no-repeat',
            backgroundSize: 'contain'
          }}
          py={20}
        >
          <StaySection />
          <TrackSection sx={{ mt: 40 }} />
        </Box>

        <Box component="img" src="assets/images/wave.png" alt="" width="100%" mt={20} zIndex={5} />
        <Box
          sx={{
            background: 'url(/assets/images/vector-4.png) no-repeat',
            backgroundSize: 'cover'
          }}
          py={20}
        >
          <NftConverterSection />
        </Box>

        <Box
          sx={{
            background: 'url(/assets/images/elipse.png) no-repeat',
            backgroundSize: 'contain'
          }}
          py={20}
        >
          <PortfolioSection sx={{ pt: 10 }} />
          <CompareSection sx={{ mt: 40 }} />
        </Box>
      </Box>
    </Box>
  );
}