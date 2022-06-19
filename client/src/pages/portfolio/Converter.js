/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import SelectCurrency from 'react-select-currency'
import CurrencyList from 'currency-list';
import { NotificationManager } from 'react-notifications';
// material
import { styled } from '@mui/material/styles';
import {
  Container, Stack, Box, Typography, CircularProgress, Button, FormControl, MenuItem, InputBase, Paper, Autocomplete, TextField, InputAdornment, ListItemIcon, ListItemText, Grid
} from '@mui/material';
// import Select, { components } from "react-select";
// components
import Page from '../../components/Page';

import { getAddressType, getConvertData, getEthCurrencyPrice, getCollectionNames } from '../../lib/block';
import { PrimaryButton, PrimaryTextField } from '../../components/customComponents';
import { COLOR_SECONDARY, COLOR_SECONDARY_BRIGHT, COLOR_WHITE } from '../../utils/constants';
import { ArrowForward, CurrencyExchange, CurrencyExchangeRounded } from '@mui/icons-material';

const RootStyle = styled(Page)({
  height: '100%',
  paddingTop: '100px'
});

export default function Converter() {
  const [loading, setLoading] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [currencyList, setCurrencyList] = useState([
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
  ]);
  const [collectionList, setCollectionList] = useState([]);
  const [contract, setContract] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [currency, setCurrency] = useState('');
  const [assetData, setAssetData] = useState({});
  const [selectedCurrencyImage, setSelectedCurrencyImage] = useState('');

  useEffect(() => {
    let data = CurrencyList.getAll('en_US');
    console.log(data);
    setCurrencyList([...currencyList, ...Object.keys(data).map(item => ({ label: `${data[item].symbol}: ${item}(${data[item].name})`, symbol: item, sign: data[item].symbol }))]);
    getCollectionList();
  }, []);

  const getCollectionList = async () => {
    setCollectionLoading(true);
    let data = await getCollectionNames();
    console.log('# collectionList => ', data);
    setCollectionList(data);
    setCollectionLoading(false);
  };

  const handleCurrencyChange = async (event, newValue) => {
    const currencyData = currencyList[event.target.value];
    console.log('# currencyData => ', currencyData);
    setCurrency(currencyData.symbol);
    setSelectedCurrencyImage(currencyData.image);
    if (assetData.name) {
      let ethPrice = await getEthCurrencyPrice(currencyData.symbol);
      setAssetData({ ...assetData, lastSaleCurrency: assetData.lastSaleEth * ethPrice, estimateValueCurrency: assetData.estimateValueEth * ethPrice });
    }

    // console.log('# newValue => ', newValue.symbol);
    // setCurrency(newValue.symbol);
    // setSelectedCurrencyImage(newValue.image);
    // if (assetData.name) {
    //   let ethPrice = await getEthCurrencyPrice(newValue.symbol);
    //   setAssetData({ ...assetData, lastSaleCurrency: assetData.lastSaleEth * ethPrice, estimateValueCurrency: assetData.estimateValueEth * ethPrice });
    // }
  };

  const convert = async () => {
    console.log(contract);
    let type = await getAddressType(contract);
    if (type !== 'contract') {
      NotificationManager.error('Please input valid collection address');
      return;
    }
    if (tokenId.trim() === '') {
      NotificationManager.error('Please input ID');
      return;
    }
    if (currency === '') {
      NotificationManager.error('Please input currency');
      return;
    }
    setLoading(true);
    console.log(contract, tokenId, currency);
    let data = await getConvertData(contract, tokenId, currency);
    setAssetData(data);
    if (data.name === "") {
      NotificationManager.error(`There isn't collection. Please check collection and ID again`);
    }
    setLoading(false);
  };

  return (
    <RootStyle title="nftroi" id="move_top">
      <Container sx={{ mt: 15 }}>
        <Grid container>
          <Grid item xs={12} sm={2} md={3} />
          <Grid item xs={12} sm={8} md={6}>
            <Stack spacing={4}>
              {/* Input fields */}
              <Stack spacing={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} md={6}>
                    {
                      collectionLoading ?
                        <Stack direction='row' justifyContent='center' alignItems='center'>
                          <CircularProgress />
                          <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Loading collections... </Typography>
                        </Stack>
                        :
                        <Autocomplete
                          disableClearable
                          onChange={(event, newValue) => {
                            console.log('# contract => ', newValue);
                            setContract(newValue.address);
                          }}
                          options={collectionList}
                          // renderOption={(props, option, state) => (
                          //   <MenuItem key={option.label}>
                          //     <Stack direction="row" alignItems="center">
                          //       <ListItemIcon>
                          //         <Box
                          //           component="img"
                          //           src={option.image}
                          //           width={25}
                          //           height={25}
                          //         />
                          //       </ListItemIcon>
                          //       <ListItemText>
                          //         {option.label}
                          //       </ListItemText>
                          //     </Stack>
                          //   </MenuItem>
                          // )}
                          renderInput={(params) => (
                            <PrimaryTextField {...params}
                              placeholder="Collection"
                              fullWidth
                            />
                          )
                          }
                          fullWidth
                        />
                    }
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <PrimaryTextField
                      placeholder="ID"
                      variant='outlined'
                      onChange={e => setTokenId(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Typography
                  textAlign="center"
                  fontSize={16}
                  fontWeight={900}
                  color={COLOR_SECONDARY}
                >
                  TO
                </Typography>

                <PrimaryTextField
                  placeholder="Currency"
                  onChange={handleCurrencyChange}
                  select
                  fullWidth
                >
                  {currencyList.map((dataItem, i) => (
                    <MenuItem key={i} value={i}>
                      <Stack direction="row" alignItems="center">
                        <ListItemIcon>
                          <Box
                            component="img"
                            src={dataItem.image}
                            width={25}
                            height={25}
                          />
                        </ListItemIcon>
                        <ListItemText>
                          {dataItem.label}
                        </ListItemText>
                      </Stack>
                    </MenuItem>
                  ))}
                </PrimaryTextField>
              </Stack>

              {/* NFT -> Crypto */}
              {
                assetData.image && <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box component='img' src={assetData.image} width={50} />
                  <ArrowForward sx={{ fontSize: 36 }} />
                  {console.log('# selectedCurrencyImage => ', selectedCurrencyImage)}
                  {
                    selectedCurrencyImage ?
                      <Box component='img' src={selectedCurrencyImage} width={50} /> :
                      <CurrencyExchange sx={{ fontSize: 36 }} />
                  }
                </Stack>
              }


              {/* Convert button */}
              <PrimaryButton
                sx={{
                  color: COLOR_WHITE,
                  fontSize: 16,
                  fontWeight: 900,
                  py: 2
                }}
                onClick={convert}
              >
                Convert
              </PrimaryButton>
              {console.log('# assetData => ', assetData)}

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography
                    component="span"
                    fontSize={16}
                    fontWeight={600}
                    color={COLOR_SECONDARY_BRIGHT}
                  >
                    Estimed Value:
                  </Typography>
                  <Typography component="span" fontSize={18}>
                    {assetData.estimateValueCurrency} {currency}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography
                    component="span"
                    fontSize={16}
                    fontWeight={600}
                    color={COLOR_SECONDARY_BRIGHT}
                  >
                    Last Sale:
                  </Typography>
                  <Typography component="span" fontSize={18}>
                    {assetData.lastSaleCurrency} {currency}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={2} md={3} />
        </Grid>
      </Container>
    </RootStyle>
  );
}
