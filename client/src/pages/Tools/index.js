import React, { useState } from 'react';
import { Box, Container, Grid } from "@mui/material";
import SideTab from '../../components/SideTab';
import { useParams } from 'react-router';
import Battle from './Battle';
import Converter from '../portfolio/Converter';

const TABS = [
  {
    name: 'Battle',
    icon: 'ri:sword-fill',
    value: 'battle'
  },
  {
    name: 'Converter',
    icon: 'ph:arrows-left-right-bold',
    value: 'converter'
  }
];

export default function Tools() {
  const { tab } = useParams();
  const [wallets, setWallets] = useState([]);
  const [wallet, setWallet] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  const handleAddTab = (address) => {
    setWallets([
      ...wallets,
      address
    ]);
    setSelectedWallet(address);
  };

  const addWallet = () => {
    if (wallet.trim()) {
      handleAddTab(wallet);
    }
  };

  const handleClose = (e, tabId) => {
    // setAddWallet(wallets.filter(tab => tab !== tabId))
    setWallets(wallets.filter(tab => tab !== tabId));
  };

  return (
    <Box position="relative" overflow="hidden" minHeight="91.5vh">
      <Container
        maxWidth="xl"
        sx={{ position: 'relative', zIndex: 30, pt: 10, pb: 20 }}
      >
        <Grid container spacing={8}>
          <Grid item xs={12} md={3}>
            <SideTab
              tabs={TABS}
              wallets={wallets}
              setWallet={setWallet}
              addWallet={addWallet}
              setSelectedWallet={setSelectedWallet}
              handleClose={handleClose}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            {tab === 'battle' && <Battle />}
            {tab === 'converter' && <Converter />}
          </Grid>
        </Grid>
      </Container>
      <Box
        component="img"
        src="/assets/images/wave-portfolio.svg"
        alt=""
        width="100%"
        position="absolute"
        top="20%"
        zIndex={10}
      />
      <Box
        component="img"
        src="/assets/images/gradient-portfolio-left.svg"
        alt=""
        width="100%"
        height=""
        position="absolute"
        bottom={0}
        left={0}
        zIndex={20}
      />
      <Box
        component="img"
        src="/assets/images/gradient-portfolio-right.svg"
        alt=""
        width="100%"
        position="absolute"
        bottom={0}
        right={0}
        zIndex={20}
      />
    </Box>
  );
}