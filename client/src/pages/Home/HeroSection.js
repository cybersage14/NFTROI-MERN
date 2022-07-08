import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { NotificationManager } from 'react-notifications';
import {
  COLOR_SECONDARY_BRIGHT,
  COLOR_WHITE,
  FONT_SIZE_BODY1_DESKTOP,
  FONT_SIZE_H1_DESKTOP
} from '../../utils/constants';
import { PrimaryButton, PrimaryTextField } from '../../components/customComponents';
import { getAddressType } from '../../lib/block';


export default function HeroSection() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  const getDataOfAddress = async () => {
    let type = await getAddressType(address.split('/')[0]);
    switch (type) {
      case 'contract':
        if (address.split('/').length > 1) {
          navigate(`/nft/${address}`, { replace: true });
        } else {
          navigate(`/collection/${address}`, { replace: true });
        }
        break;
      case 'account':
        navigate(`/portfolio/portfolio-tracker/${address}`, { replace: true });
        break;
      case 'invalid':
        NotificationManager.error('Please input valid address');
        break;

      default:
        break;
    }
  };

  const keyPress = async (e) => {
    if (e.keyCode === 13) {
      await getDataOfAddress();
    }
  };

  const handleSearchChange = (e) => {
    setAddress(e.target.value);
  };
  return (
    <Box position="relative">
      <Box position="absolute" zIndex={10} top={-200} left={0}>
        <Box component="img" src="assets/images/rectangle-oblique-left.png" alt="" />
      </Box>
      <Box ml={{ md: 32 }} mt={12} position="relative" zIndex={20}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6} md={5}>
            <Typography
              fontSize={FONT_SIZE_H1_DESKTOP}
              fontWeight={700}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Measure Your Performance<br /> In The NFT Space With Ease
            </Typography>
            <Typography
              fontSize={FONT_SIZE_BODY1_DESKTOP}
              color={COLOR_SECONDARY_BRIGHT}
              textAlign={{ xs: 'center', md: 'left' }}
              mt={2}
            >
              Our tool helps you understand your NFT investments better through analysis and comprehensive insights!
            </Typography>
            <Stack direction="row" justifyContent={{ xs: 'center', md: 'start' }}>
              <Box width={{ xs: '90%', md: '70%' }} mt={5}>
                <PrimaryTextField
                  placeholder="Put your wallet address here"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PrimaryButton
                          variant="contained"
                          onClick={getDataOfAddress}
                        >
                          Analyze
                        </PrimaryButton>
                      </InputAdornment>
                    )
                  }}
                  onKeyDown={keyPress}
                  onChange={handleSearchChange}
                  fullWidth
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={1} md={2} />
          <Grid item xs={12} sm={5} md={5}>
            <Box
              component="img"
              src="assets/images/hero-laptop.png"
              alt=""
              width="100%"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            />
          </Grid>
        </Grid>
      </Box>
      <Stack direction="row" justifyContent="center" width="100%" mt={{ xs: 6, md: 12 }}>
        <IconButton>
          <KeyboardArrowDown sx={{ color: COLOR_WHITE, fontSize: FONT_SIZE_H1_DESKTOP }} />
        </IconButton>
      </Stack>
    </Box>
  );
}