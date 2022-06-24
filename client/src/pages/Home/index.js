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
import MainBottomNavbar from '../../layouts/main/MainBottomNavbar';

export default function Home() {
  return (
    <Box>
      <HeroSection />
      <Box
        mt={{ xs: 0, md: 12 }}
        sx={{
          background: 'url(/assets/images/bg-wave-1.png) no-repeat',
          backgroundSize: { xs: 'auto', md: 'contain' }
        }}
        pt={{ xs: 35, md: 70 }}
        position="relative"
      >
        <ProfitSection />

        <Box
          component="img"
          src="assets/images/wave.png"
          alt=""
          width="100%"
          mt={{ xs: 10, md: 20 }}
          zIndex={5}
        />
        <Box
          sx={{
            background: 'url(/assets/images/vector-4.png) no-repeat',
            backgroundSize: 'cover'
          }}
          py={{ xs: 10, md: 20 }}
        >
          <NftRealTimeSection />
        </Box>

        <Box
          sx={{
            background: 'url(/assets/images/elipse.png) no-repeat',
            backgroundSize: 'contain'
          }}
          py={{ xs: 10, md: 20 }}
        >
          <StaySection />
          <TrackSection sx={{ mt: { xs: 20, md: 40 } }} />
        </Box>

        <Box
          component="img"
          src="assets/images/wave.png"
          alt=""
          width="100%"
          mt={{ xs: 10, md: 20 }}
          zIndex={5}
        />
        <Box
          sx={{
            background: 'url(/assets/images/vector-4.png) no-repeat',
            backgroundSize: 'cover'
          }}
          py={{ xs: 10, md: 20 }}
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
      <MainBottomNavbar />
    </Box>
  );
}