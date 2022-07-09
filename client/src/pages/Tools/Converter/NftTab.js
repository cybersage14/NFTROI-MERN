import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";
import { ArrowForward } from '@mui/icons-material';
import CurrencyList from 'currency-list';
import { NotificationManager } from 'react-notifications';
import { PrimaryTextField, PrimaryButton } from "../../../components/customComponents";
import { COLOR_SECONDARY, COLOR_SECONDARY_BRIGHT, COLOR_WHITE } from "../../../utils/constants";
import {
  getAddressType,
  getConvertData,
  getEthCurrencyPrice,
  getCollectionNames
} from '../../../lib/block';
import LoadingScreen from '../../../components/LoadingScreen';

export default function NftTab({ initCurrencyList }) {
  const [loading, setLoading] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [currencyList, setCurrencyList] = useState(initCurrencyList);
  const [collectionList, setCollectionList] = useState([]);
  const [contract, setContract] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [currency, setCurrency] = useState('');
  const [assetData, setAssetData] = useState({});
  const [selectedCurrencyImage, setSelectedCurrencyImage] = useState('');
  const [selectedCurrencyText, setSelectedCurrencyText] = useState('');


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
    if (currencyData.image) {
      setSelectedCurrencyImage(currencyData.image);
    } else if (currencyData.sign) {
      setSelectedCurrencyText(currencyData.sign);
    }
    if (assetData.name) {
      let ethPrice = await getEthCurrencyPrice(currencyData.symbol);
      setAssetData({ ...assetData, lastSaleCurrency: assetData.lastSaleEth * ethPrice, estimateValueCurrency: assetData.estimateValueEth * ethPrice });
    }
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

  useEffect(() => {
    let data = CurrencyList.getAll('en_US');
    console.log(data);
    setCurrencyList([...currencyList, ...Object.keys(data).map(item => ({ label: `${data[item].symbol}: ${item}(${data[item].name})`, symbol: item, sign: data[item].symbol }))]);
    getCollectionList();
  }, []);

  return loading ? <LoadingScreen /> : (
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
                  {
                    dataItem.image ? (
                      <Box
                        component="img"
                        src={dataItem.image}
                        width={25}
                        height={25}
                      />
                    ) : (
                      <Typography fontSize={17} fontWeight={900}>{dataItem.sign}</Typography>
                    )
                  }

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
        Object.keys(assetData).length > 0 && <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Box component='img' src={assetData.image} width={50} />
          <ArrowForward sx={{ fontSize: 36 }} />
          {
            selectedCurrencyImage ?
              <Box component="img" src={selectedCurrencyImage} width={50} /> :
              <Typography fontSize={36}>{selectedCurrencyText}</Typography>
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
            {assetData.estimateValueCurrency?.toFixed(2)} {currency}
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
            {assetData.lastSaleCurrency?.toFixed(2)} {currency}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}