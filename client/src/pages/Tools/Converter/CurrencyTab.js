import React, { useEffect, useState } from 'react';
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
  Icon as MuiIcon
} from '@mui/material';
import CurrencyList from 'currency-list';
import { Icon } from '@iconify/react';
import {
  COLOR_WHITE,
  FONT_SIZE_H3_DESKTOP,
  FONT_WEIGHT_SEMIBOLD,
  FONT_SIZE_BODY2_DESKTOP,
  FONT_SIZE_BODY1_DESKTOP
} from '../../../utils/constants';
import { PrimaryBox, PrimaryButton, PrimaryTextField } from '../../../components/customComponents';
import {
  getEthCurrencyPrice,
} from '../../../lib/block';
import { validNumber } from '../../../utils/functions';

export default function CurrencyTab({ initCurrencyList }) {
  const [amount, setAmount] = useState('');
  const [currencyList, setCurrencyList] = useState(initCurrencyList);
  const [fromCurrency, setFromCurrency] = useState('');
  const [fromCurrencyImage, setFromCurrencyImage] = useState('');
  const [fromCurrencyText, setFromCurrencyText] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [toCurrencyImage, setToCurrencyImage] = useState('');
  const [toCurrencyText, setToCurrencyText] = useState('');
  const [assetData, setAssetData] = useState({});

  const handleAmount = (e) => {
    if (validNumber(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const handleFromCurrencyChange = async (event, newValue) => {
    const currencyData = currencyList[event.target.value];
    setFromCurrency(currencyData.symbol);
    if (currencyData.image) {
      setFromCurrencyImage(currencyData.image);
    } else if (currencyData.sign) {
      setFromCurrencyText(currencyData.sign);
    }
    if (assetData.name) {
      let ethPrice = await getEthCurrencyPrice(currencyData.symbol);
      setAssetData({ ...assetData, lastSaleCurrency: assetData.lastSaleEth * ethPrice, estimateValueCurrency: assetData.estimateValueEth * ethPrice });
    }
  };

  const handleToCurrencyChange = async (event, newValue) => {
    const currencyData = currencyList[event.target.value];
    setToCurrency(currencyData.symbol);
    if (currencyData.image) {
      setToCurrencyImage(currencyData.image);
    } else if (currencyData.sign) {
      setToCurrencyText(currencyData.sign);
    }
    if (assetData.name) {
      let ethPrice = await getEthCurrencyPrice(currencyData.symbol);
      setAssetData({ ...assetData, lastSaleCurrency: assetData.lastSaleEth * ethPrice, estimateValueCurrency: assetData.estimateValueEth * ethPrice });
    }
  };

  useEffect(() => {
    let data = CurrencyList.getAll('en_US');
    setCurrencyList([
      ...currencyList,
      ...Object.keys(data).map(item => ({
        label: `${data[item].symbol}: ${item}(${data[item].name})`,
        symbol: item,
        sign: data[item].symbol
      }))
    ]);
  }, []);

  return (
    <Stack spacing={6}>
      {/* Amount */}
      <Stack spacing={3}>
        <Typography
          fontSize={FONT_SIZE_H3_DESKTOP}
          fontWeight={FONT_WEIGHT_SEMIBOLD}
        >Amount</Typography>
        <PrimaryTextField
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={handleAmount}
        />
      </Stack>

      <Stack spacing={2}>
        {/* From */}
        <Stack spacing={3}>
          <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            fontWeight={FONT_WEIGHT_SEMIBOLD}
          >From</Typography>
          <PrimaryTextField
            placeholder="Currency"
            onChange={handleFromCurrencyChange}
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

        {/* Convert mark */}
        <Stack direction="row" justifyContent="center">
          <PrimaryBox
            borderRadius={1}
            px={1.5}
            py={1}
          >
            <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
              <Icon icon="ph:arrows-down-up-bold" />
            </MuiIcon>
          </PrimaryBox>
        </Stack>

        {/* To */}
        <Stack spacing={3}>
          <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            fontWeight={FONT_WEIGHT_SEMIBOLD}
          >To</Typography>
          <PrimaryTextField
            placeholder="Currency"
            onChange={handleToCurrencyChange}
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
      </Stack>

      {/* Convert image */}
      {
        fromCurrencyImage && toCurrencyImage && (
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
            <Box
              component="img"
              src={fromCurrencyImage}
              alt=""
              width={60}
            />
            <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
              <Icon icon="akar-icons:arrow-right" />
            </MuiIcon>
            <Box
              component="img"
              src={toCurrencyImage}
              alt=""
              width={60}
            />
          </Stack>
        )
      }

      {/* Convert button */}
      <PrimaryButton
        sx={{
          color: COLOR_WHITE,
          fontSize: 16,
          fontWeight: 700,
          py: 2
        }}
        disabled={!fromCurrency || !toCurrency}
      >
        Convert
      </PrimaryButton>

      {
        fromCurrencyImage && toCurrencyImage && (
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography
              fontSize={FONT_SIZE_BODY2_DESKTOP}
              color={COLOR_WHITE}
            >{amount} {fromCurrency} =</Typography>
            <Typography
              fontSize={FONT_SIZE_BODY1_DESKTOP}
            >0 {toCurrency}</Typography>
          </Stack>
        )
      }
    </Stack>
  );
}