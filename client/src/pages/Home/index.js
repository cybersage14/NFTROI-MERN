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
          background: 'url(/assets/images/bg-wave-1.svg) no-repeat',
          backgroundSize: 'cover'
        }}
        pt={{ xs: 35, md: 50 }}
        position="relative"
      >
        <ProfitSection />
      </Box>
      <Box
        height={100}
        sx={{
          background: 'linear-gradient(to top, rgba(23, 68, 227, 0), rgba(23, 68, 227, 0.04))'
        }}
      />

      <Box
        component="img"
        src="assets/images/wave.svg"
        alt=""
        width="100%"
        mt={{ xs: 10, md: 20 }}
        zIndex={5}
      />
      <Box
        sx={{
          background: 'url(/assets/images/vector-4.svg) no-repeat',
          backgroundSize: 'cover'
        }}
        py={{ xs: 10, md: 20 }}
        position="relative"
      >
        <NftRealTimeSection />
        <Box
          component="img"
          src="assets/images/rectangle-oblique-right.png"
          alt=""
          position="absolute"
          right={0}
          zIndex={20}
          sx={{ display: { xs: 'none', md: 'block' } }}
        />
      </Box>

      <Box
        sx={{
          background: 'url(/assets/images/elipse.svg) no-repeat',
          backgroundSize: 'contain'
        }}
        py={{ xs: 10, md: 20 }}
      >
        <StaySection />
        <TrackSection sx={{ mt: { xs: 20, md: 40 } }} />
      </Box>

      <Box
        component="img"
        src="assets/images/wave.svg"
        alt=""
        width="100%"
        mt={{ xs: 10, md: 20 }}
        zIndex={5}
      />
      <Box
        sx={{
          background: 'url(/assets/images/vector-4.svg) no-repeat',
          backgroundSize: 'cover'
        }}
        py={{ xs: 10, md: 20 }}
      >
        <NftConverterSection />
      </Box>

      <Box
        sx={{
          background: 'url(/assets/images/elipse.svg) no-repeat',
          backgroundSize: 'contain'
        }}
        py={{ xs: 10, md: 20 }}
        position="relative"
      >
        <PortfolioSection sx={{ pt: { xs: 5, md: 10 } }} />
        <CompareSection sx={{ mt: { xs: 20, md: 40 } }} />
        <Box
          component="img"
          src="assets/images/rectangle-oblique-right.png"
          alt=""
          position="absolute"
          top="20%"
          right={0}
          zIndex={20}
          sx={{ display: { xs: 'none', md: 'block' } }}
        />
      </Box>
    </Box>
  );
}