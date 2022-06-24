import React from 'react';
import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import ProfitSection from './ProfitSection';
import NftRealTimeSection from './NftRealTimeSection';

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
        pt={70}
        position="relative"
      >
        <ProfitSection sx={{ position: 'relative', zIndex: 20 }} />
        <Box component="img" src="assets/images/wave.png" alt="" width="100%" mt={20} zIndex={5} />
        <Box component="img" src="assets/images/vector-4.png" alt="" width="100%" zIndex={5} />
        <Box
          component="img"
          src="assets/images/vector-3.png"
          alt=""
          width="70%"
          position="absolute"
          zIndex={10}
          right={0}
          top="50%"
        />
        <Box
          component="img"
          src="assets/images/rectangle-oblique-right.png"
          alt=""
          position="absolute"
          zIndex={10}
          right={0}
          bottom={0}
        />
        <Box
          component="img"
          src="assets/images/rectangle-oblique-right.png"
          alt=""
          position="absolute"
          zIndex={10}
          right={0}
          bottom="10%"
        />
        <NftRealTimeSection sx={{ position: 'relative', zIndex: 20 }} />
        <Box
          sx={{
            background: 'url(/assets/images/bg-wave-1.png) no-repeat',
            backgroundSize: 'cover'
          }}
          mt={12}
        >

        </Box>
      </Box>
    </Box>
  );
}