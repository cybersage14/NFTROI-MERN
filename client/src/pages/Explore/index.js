import React, { useState } from 'react';
import { Box, Card, Container, Grid, IconButton, ListItem, ListItemIcon, ListItemText, Icon as MuiIcon, ListItemButton, InputAdornment } from "@mui/material";
import { Icon } from '@iconify/react';
import { PrimaryButton, PrimaryTextField, SecondaryButton, SecondaryList, SecondaryListItemButton } from '../../components/customComponents';
import { COLOR_SECONDARY, FONT_SIZE_BODY1_DESKTOP, FONT_SIZE_H3_DESKTOP } from '../../utils/constants';
import SideTab from '../../components/SideTab';

const TABS = [
  {
    name: 'Overview',
    icon: 'simple-icons:dgraph',
    value: 0
  },
  {
    name: 'Nftroi degens',
    icon: 'uis:bag',
    value: 1
  },
  {
    name: 'Top celebs',
    icon: 'bxs:star',
    value: 2
  },
  {
    name: 'Most profitable',
    icon: 'bi:file-earmark-bar-graph',
    value: 3
  },
  {
    name: 'Highest valued',
    icon: 'foundation:graph-pie',
    value: 4
  },
  {
    name: 'Biggest flips',
    icon: 'icon-park-solid:refresh-one',
    value: 5
  },
];

export default function Explore() {
  const [currentTab, setCurrentTab] = useState(0);
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
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              wallets={wallets}
              setWallet={setWallet}
              addWallet={addWallet}
              setSelectedWallet={setSelectedWallet}
              handleClose={handleClose}
            />
          </Grid>
          <Grid item xs={12} md={9}>

          </Grid>

        </Grid>
      </Container>
      <Box
        component="img"
        src="assets/images/wave-portfolio.svg"
        alt=""
        width="100%"
        position="absolute"
        top="20%"
        zIndex={10}
      />
      <Box
        component="img"
        src="assets/images/gradient-portfolio-left.svg"
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
        src="assets/images/gradient-portfolio-right.svg"
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