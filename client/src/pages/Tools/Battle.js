import React, { useState } from 'react';
import { Avatar, Box, Grid, Icon as MuiIcon, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import {
  COLOR_PRIMARY,
  FONT_SIZE_BODY1_DESKTOP,
  FONT_SIZE_H2_DESKTOP,
  COLOR_SECONDARY_BRIGHT,
  ICON_NAME_BATTLE,
  COLOR_WHITE_OPACITY_ONE,
  COLOR_SECONDARY,
  BLUR_LOW,
  FONT_SIZE_H3_DESKTOP,
  COLOR_BLUE,
  COLOR_BG_TEXTFIELD,
  FONT_WEIGHT_NORMAL,
  COLOR_SUCCESS,
  FONT_WEIGHT_SEMIBOLD
} from '../../utils/constants';
import { BattleTextField, PrimaryButton } from '../../components/customComponents';

const DATA = [
  {
    name: 'Available Balance',
    wallet1: 8,
    wallet2: 23
  },
  {
    name: 'P/L',
    wallet1: 8,
    wallet2: 23
  },
  {
    name: 'Total Buy',
    wallet1: 8,
    wallet2: 23
  },
  {
    name: 'Total Sell',
    wallet1: 8,
    wallet2: 23
  },
  {
    name: 'Total Mint',
    wallet1: 8,
    wallet2: 23
  },
  {
    name: 'Total Fees',
    wallet1: 8,
    wallet2: 23
  },
  {
    name: 'Biggest Flip',
    wallet1: 8,
    wallet2: 23
  },
  {
    name: 'Worst Trade',
    wallet1: 8,
    wallet2: 23
  }
];

export default function Battle() {
  const [startBattle, setStartBattle] = useState(false);

  const handleBattle = () => {
    setStartBattle(!startBattle);
  };
  return (
    <>
      {/* Title */}
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <MuiIcon
            sx={{
              color: COLOR_PRIMARY,
              fontSize: FONT_SIZE_H2_DESKTOP
            }}
          >
            <Icon icon={ICON_NAME_BATTLE} />
          </MuiIcon>
          <Typography fontSize={FONT_SIZE_H2_DESKTOP}>
            Battle
          </Typography>
        </Stack>

        <Typography
          fontSize={FONT_SIZE_BODY1_DESKTOP}
          color={COLOR_SECONDARY_BRIGHT}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Stack>

      <Stack
        mt={5}
        py={5}
        px={5}
        borderRadius={2}
        bgcolor={COLOR_WHITE_OPACITY_ONE}
        border={`2px solid ${COLOR_SECONDARY}`}
        sx={{
          backdropFilter: BLUR_LOW
        }}
        spacing={3}
      >
        <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
          Add Wallets
        </Typography>

        {/* Input Fields */}
        <Box>
          <Grid container columns={11} spacing={2} alignItems="center">
            <Grid item xs={11} md={5}>
              <Box position="relative" width="90%">
                <Box
                  position="relative"
                  sx={{
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                    borderLeft: `2px solid ${COLOR_BLUE}`,
                    borderTop: `2px solid ${COLOR_BLUE}`,
                    borderBottom: `2px solid ${COLOR_BLUE}`,
                  }}
                  bgcolor={COLOR_BG_TEXTFIELD}
                  zIndex={20}
                >
                  <BattleTextField
                    placeholder="Enter ETH address"
                    fullWidth
                  />
                </Box>
                <Box
                  position="absolute"
                  sx={{
                    transform: 'skew(-15deg)',
                    border: `2px solid ${COLOR_BLUE}`,
                    borderRadius: 1.5
                  }}
                  zIndex={10}
                  top={0}
                  right={-20}
                  bgcolor={COLOR_BG_TEXTFIELD}
                >
                  <BattleTextField fullWidth />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={11} md={1}>
              <Stack direction="row" justifyContent="center">
                <PrimaryButton
                  variant="contained"
                  sx={{ fontSize: FONT_SIZE_H2_DESKTOP, transform: 'skew(-15deg)', py: 1 }}
                  onClick={handleBattle}
                >
                  <Icon icon={ICON_NAME_BATTLE} />
                </PrimaryButton>
              </Stack>
            </Grid>
            <Grid item xs={11} md={5}>
              <Stack direction="row" justifyContent="end">
                <Box position="relative" width="90%">
                  <Box
                    position="relative"
                    sx={{
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 10,
                      borderRight: `2px solid ${COLOR_BLUE}`,
                      borderTop: `2px solid ${COLOR_BLUE}`,
                      borderBottom: `2px solid ${COLOR_BLUE}`,
                    }}
                    bgcolor={COLOR_BG_TEXTFIELD}
                    zIndex={20}
                  >
                    <BattleTextField
                      placeholder="Enter ETH address"
                      fullWidth
                    />
                  </Box>
                  <Box
                    position="absolute"
                    sx={{
                      transform: 'skew(-15deg)',
                      border: `2px solid ${COLOR_BLUE}`,
                      borderRadius: 1.5
                    }}
                    zIndex={10}
                    top={0}
                    left={-20}
                    bgcolor={COLOR_BG_TEXTFIELD}
                  >
                    <BattleTextField fullWidth />
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Table */}
        {
          startBattle && (
            <Stack spacing={2}>
              {/* Table Head */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                py={2}
                px={2}
                borderBottom={`1px solid ${COLOR_SECONDARY}`}
                borderTop={`1px solid ${COLOR_SECONDARY}`}
              >
                <Stack width="33%">
                  <Typography fontWeight={FONT_WEIGHT_NORMAL} fontSize={FONT_SIZE_BODY1_DESKTOP}>
                    #
                  </Typography>
                </Stack>
                <Stack width="33%" direction="row" justifyContent="center">
                  <Stack
                    direction="row"
                    alignItems="center"
                    borderRadius={1}
                    spacing={1}
                  >
                    <Avatar
                      src="/assets/images/nft-rainbow.png"
                      sx={{
                        width: 50,
                        height: 50
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
                  </Stack>
                </Stack>
                <Stack width="33%" direction="row" justifyContent="end">
                  <Stack
                    direction="row"
                    alignItems="center"
                    borderRadius={1}
                    spacing={1}
                  >
                    <Avatar
                      src="/assets/images/nft-rainbow.png"
                      sx={{
                        width: 50,
                        height: 50
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
                  </Stack>
                </Stack>
              </Stack>

              {/* Table body */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                bgcolor={COLOR_SECONDARY}
                borderRadius={1}
              >
                <Stack width="33%">
                  <Typography fontWeight={FONT_WEIGHT_SEMIBOLD} fontSize={FONT_SIZE_H3_DESKTOP}>
                    NFTROI Score
                  </Typography>
                </Stack>
                <Stack width="33%" direction="row" justifyContent="center">
                  <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                    <Typography component="span" fontSize="inherit" color={COLOR_SUCCESS}>
                      90
                    </Typography>&nbsp;/&nbsp;100
                  </Typography>
                </Stack>
                <Stack width="33%" direction="row" justifyContent="end">
                  <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                    <Typography component="span" fontSize="inherit" color={COLOR_SUCCESS}>
                      90
                    </Typography>&nbsp;/&nbsp;100
                  </Typography>
                </Stack>
              </Stack>
              {
                DATA.map(dataItem => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    bgcolor={COLOR_SECONDARY}
                    borderRadius={1}
                    key={dataItem.name}
                  >
                    <Stack width="33%">
                      <Typography fontWeight={FONT_WEIGHT_SEMIBOLD} fontSize={FONT_SIZE_H3_DESKTOP}>
                        {dataItem.name}
                      </Typography>
                    </Stack>
                    <Stack width="33%" direction="row" justifyContent="center">
                      <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                        {dataItem.wallet1} ETH
                      </Typography>
                    </Stack>
                    <Stack width="33%" direction="row" justifyContent="end">
                      <Typography fontSize={FONT_SIZE_H3_DESKTOP}>
                        {dataItem.wallet2} ETH
                      </Typography>
                    </Stack>
                  </Stack>
                ))
              }

            </Stack>
          )
        }

      </Stack>
    </>
  );
}