import React, { useState } from 'react';
import { Box, Container, Grid, Icon as MuiIcon, Stack, Typography, Avatar } from "@mui/material";
import { Icon } from '@iconify/react';
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  FONT_SIZE_BODY1_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  FONT_SIZE_H2_DESKTOP,
  COLOR_SECONDARY_BRIGHT,
  COLOR_SUCCESS
} from '../../utils/constants';
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
            {/* Title */}
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={3}>
                <MuiIcon
                  sx={{
                    color: COLOR_PRIMARY,
                    fontSize: FONT_SIZE_H2_DESKTOP
                  }}
                >
                  <Icon icon={TABS[currentTab].icon} />
                </MuiIcon>
                <Typography fontSize={FONT_SIZE_H2_DESKTOP}>
                  {TABS[currentTab].name}
                </Typography>
              </Stack>

              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_SECONDARY_BRIGHT}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            </Stack>

            <Stack mt={5} spacing={4}>
              <Box>
                <Grid container spacing={3}>
                  {/* Top Scored Traders */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                        Top Scored Traders
                      </Typography>
                      {
                        [0, 1, 2].map(index => (
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            bgcolor={COLOR_SECONDARY}
                            p={3}
                            borderRadius={1}
                            key={index}
                          >
                            <Avatar
                              src="assets/images/nft-rainbow.png"
                              sx={{
                                width: 60,
                                height: 60
                              }}
                            />

                            <Stack spacing={1}>
                              <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                drnikto
                              </Typography>
                              <Typography
                                component="span"
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                              >
                                0x21fd..ds
                              </Typography>
                            </Stack>

                            <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                            <Stack spacing={1}>
                              <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                4.678%
                              </Typography>
                              <Typography
                                component="span"
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                              >
                                Avg.Price
                              </Typography>
                            </Stack>

                            <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                            <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} textAlign="center">
                              <Typography component="span" color={COLOR_SUCCESS}>
                                99
                              </Typography> / 100
                            </Typography>
                          </Stack>
                        ))
                      }
                    </Stack>
                  </Grid>

                  {/* Top Cellebs Wallets */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                        Top Cellebs Wallets
                      </Typography>
                      {
                        [0, 1, 2].map(index => (
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            bgcolor={COLOR_SECONDARY}
                            p={3}
                            borderRadius={1}
                            key={index}
                          >
                            <Avatar
                              src="assets/images/nft-rainbow.png"
                              sx={{
                                width: 60,
                                height: 60
                              }}
                            />

                            <Stack spacing={1}>
                              <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                drnikto
                              </Typography>
                              <Typography
                                component="span"
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                              >
                                0x21fd..ds
                              </Typography>
                            </Stack>

                            <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                            <Stack spacing={1}>
                              <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                4.678%
                              </Typography>
                              <Typography
                                component="span"
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                              >
                                Avg.Price
                              </Typography>
                            </Stack>

                            <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                            <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} textAlign="center">
                              <Typography component="span" color={COLOR_SUCCESS}>
                                99
                              </Typography> / 100
                            </Typography>
                          </Stack>
                        ))
                      }
                    </Stack>
                  </Grid>
                </Grid>
              </Box>

              {/* Biggest Flips */}
              <Stack spacing={3}>
                <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                  Biggest Flips
                </Typography>
                {
                  [0, 1, 2].map(index => (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      bgcolor={COLOR_SECONDARY}
                      p={3}
                      borderRadius={1}
                      key={index}
                    >
                      <Avatar
                        src="assets/images/nft-rainbow.png"
                        sx={{
                          width: 60,
                          height: 60
                        }}
                      />

                      <Stack spacing={1}>
                        <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                          drnikto
                        </Typography>
                        <Typography
                          component="span"
                          fontSize={FONT_SIZE_BODY1_DESKTOP}
                          color={COLOR_SECONDARY_BRIGHT}
                        >
                          0x21fd..ds
                        </Typography>
                      </Stack>

                      <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                      <Avatar
                        src="assets/images/nft-rainbow.png"
                        sx={{
                          width: 60,
                          height: 60
                        }}
                      />

                      <Stack spacing={1}>
                        <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                          Doodles
                        </Typography>
                        <Typography
                          component="span"
                          fontSize={FONT_SIZE_BODY1_DESKTOP}
                          color={COLOR_SECONDARY_BRIGHT}
                        >
                          #431
                        </Typography>
                      </Stack>

                      <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                      <Stack spacing={1}>
                        <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                          1.2 ETH
                        </Typography>
                        <Typography
                          component="span"
                          fontSize={FONT_SIZE_BODY1_DESKTOP}
                          color={COLOR_SECONDARY_BRIGHT}
                        >
                          Buy
                        </Typography>
                      </Stack>

                      <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                      <Stack spacing={1}>
                        <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                          342 ETH
                        </Typography>
                        <Typography
                          component="span"
                          fontSize={FONT_SIZE_BODY1_DESKTOP}
                          color={COLOR_SECONDARY_BRIGHT}
                        >
                          Sell
                        </Typography>
                      </Stack>

                      <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                      <Stack spacing={1}>
                        <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                          380 ETH
                        </Typography>
                        <Typography
                          component="span"
                          fontSize={FONT_SIZE_BODY1_DESKTOP}
                          color={COLOR_SECONDARY_BRIGHT}
                        >
                          24.000%
                        </Typography>
                      </Stack>
                    </Stack>
                  ))
                }
              </Stack>

              <Box>
                <Grid container spacing={3}>
                  {/* Most Profitable Wallets */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                        Most Profitable Wallets
                      </Typography>
                      {
                        [0, 1, 2].map(index => (
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            bgcolor={COLOR_SECONDARY}
                            p={3}
                            borderRadius={1}
                            key={index}
                          >
                            <Avatar
                              src="assets/images/nft-rainbow.png"
                              sx={{
                                width: 60,
                                height: 60
                              }}
                            />

                            <Stack spacing={1}>
                              <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                drnikto
                              </Typography>
                              <Typography
                                component="span"
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                              >
                                0x21fd..ds
                              </Typography>
                            </Stack>

                            <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                            <Stack spacing={1}>
                              <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                467
                              </Typography>
                              <Typography
                                component="span"
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                              >
                                Sells
                              </Typography>
                            </Stack>

                            <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                            <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} textAlign="center">
                              793 ETH
                            </Typography>
                          </Stack>
                        ))
                      }
                    </Stack>
                  </Grid>

                  {/* Highest Valued Wallets */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                        Highest Valued Wallets
                      </Typography>
                      {
                        [0, 1, 2].map(index => (
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            bgcolor={COLOR_SECONDARY}
                            p={3}
                            borderRadius={1}
                            key={index}
                          >
                            <Avatar
                              src="assets/images/nft-rainbow.png"
                              sx={{
                                width: 60,
                                height: 60
                              }}
                            />

                            <Stack spacing={1}>
                              <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                drnikto
                              </Typography>
                              <Typography
                                component="span"
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                              >
                                0x21fd..ds
                              </Typography>
                            </Stack>

                            <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                            <Stack spacing={1}>
                              <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                467
                              </Typography>
                              <Typography
                                component="span"
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                              >
                                Sells
                              </Typography>
                            </Stack>

                            <Box height={40} borderLeft={`1px solid ${COLOR_SECONDARY_BRIGHT}`} />

                            <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} textAlign="center">
                              793 ETH
                            </Typography>
                          </Stack>
                        ))
                      }
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
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