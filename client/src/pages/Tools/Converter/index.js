/* eslint-disable */
import React, { useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  Grid,
  Icon as MuiIcon
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  COLOR_SECONDARY,
  COLOR_SECONDARY_BRIGHT,
  ICON_NAME_CONVERT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_BODY1_DESKTOP,
  COLOR_PRIMARY,
  COLOR_WHITE_OPACITY_ONE,
  BLUR_LOW,
  NFT,
  CURRENCY,
  COLOR_SECONDARY_DARK
} from '../../../utils/constants';
import ButtonFilter from '../../../components/ButtonFilters';
import NftTab from './NftTab';

const FILTER_DATA = [
  {
    label: 'NFT',
    value: NFT
  },
  {
    label: 'Currency',
    value: CURRENCY
  }
];

const CURRENCY_LIST = [
  {
    label: 'BTC(Bitcoin)',
    symbol: 'BTC',
    image: '/static/crypto/btc.png'
  },
  {
    label: 'USDT(Tether)',
    symbol: 'USDT',
    image: '/static/crypto/usdt.png'
  },
  {
    label: 'USDC(USD Coin)',
    symbol: 'USDC',
    image: '/static/crypto/usdc.png'
  },
  {
    label: 'BNB',
    symbol: 'BNB',
    image: '/static/crypto/bnb.png'
  },
  {
    label: 'XRP',
    symbol: 'XRP',
    image: '/static/crypto/xrp.png'
  },
  {
    label: 'BUSD(Binance USD)',
    symbol: 'BUSD',
    image: '/static/crypto/busd.png'
  },
  {
    label: 'ADA(Cardano)',
    symbol: 'ADA',
    image: '/static/crypto/ada.png'
  },
  {
    label: 'SOL(Solana)',
    symbol: 'SOL',
    image: '/static/crypto/sol.png'
  },
  {
    label: 'DOGE(Dogecoin)',
    symbol: 'DOGE',
    image: '/static/crypto/doge.png'
  },
  {
    label: 'DOT(Polkadot)',
    symbol: 'DOT',
    image: '/static/crypto/dot.png'
  },
  {
    label: 'WBTC(Wrapped Bitcoin)',
    symbol: 'WBTC',
    image: '/static/crypto/wbtc.png'
  },
  {
    label: 'TRX(TRON)',
    symbol: 'TRX',
    image: '/static/crypto/trx.png'
  },
  {
    label: 'DAI(Dai)',
    symbol: 'DAI',
    image: '/static/crypto/dai.png'
  },
  {
    label: 'SHIB(SHIBA INU)',
    symbol: 'SHIB',
    image: '/static/crypto/shib.png'
  },
  {
    label: 'MATIC(Polygon)',
    symbol: 'MATIC',
    image: '/static/crypto/matic.png'
  },
  {
    label: 'LTC(Litecoin)',
    symbol: 'LTC',
    image: '/static/crypto/ltc.png'
  },
  {
    label: 'CRO(Cronos)',
    symbol: 'CRO',
    image: '/static/crypto/cro.png'
  },
  {
    label: 'UNI(Uniswap)',
    symbol: 'UNI',
    image: '/static/crypto/uni.png'
  },
  {
    label: 'LINK(Chainlink)',
    symbol: 'LINK',
    image: '/static/crypto/link.png'
  },
  {
    label: 'OMG(OmiseGO)',
    symbol: 'OMG',
    image: '/static/crypto/omg.png'
  },
  {
    label: 'MKR(Maker)',
    symbol: 'MKR',
    image: '/static/crypto/mkr.png'
  },
  {
    label: 'REP(Augur)',
    symbol: 'REP',
    image: '/static/crypto/rep.png'
  },
  {
    label: 'GNT(Golem)',
    symbol: 'GNT',
    image: '/static/crypto/gnt.png'
  },
  {
    label: 'LRC(Loopring)',
    symbol: 'LRC',
    image: '/static/crypto/lrc.png'
  },
  {
    label: 'BAT(Basic Attention Token)',
    symbol: 'BAT',
    image: '/static/crypto/bat.png'
  }
];

export default function Converter() {
  const [tab, setTab] = useState(NFT);

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
            <Icon icon={ICON_NAME_CONVERT} />
          </MuiIcon>
          <Typography fontSize={FONT_SIZE_H2_DESKTOP}>
            Converter
          </Typography>
        </Stack>

        <Typography
          fontSize={FONT_SIZE_BODY1_DESKTOP}
          color={COLOR_SECONDARY_BRIGHT}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Stack>

      <Box position="relative">
        <Box
          mt={5}
          py={20}
          px={5}
          borderRadius={2}
          bgcolor={COLOR_WHITE_OPACITY_ONE}
          border={`2px solid ${COLOR_SECONDARY}`}
          sx={{
            backdropFilter: BLUR_LOW
          }}
          spacing={3}
          position="relative"
          zIndex={10}
        >
          <Grid container>
            <Grid item xs={12} sm={2} md={3} />
            <Grid item xs={12} sm={8} md={6}>
              {tab === NFT && <NftTab initCurrencyList={CURRENCY_LIST} />}
            </Grid>
            <Grid item xs={12} sm={2} md={3} />
          </Grid>
        </Box>
        <Stack
          position="absolute"
          width="100%"
          direction="row"
          justifyContent="center"
          top={-30}
          zIndex={20}
        >
          <ButtonFilter
            data={FILTER_DATA}
            value={tab}
            setValue={setTab}
            sx={{ bgcolor: COLOR_SECONDARY_DARK }}
          />
        </Stack>
      </Box>
    </>
  );
}
