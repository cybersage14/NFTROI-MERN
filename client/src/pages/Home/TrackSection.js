import React, { useState } from 'react';
import { Container, Grid, Typography, Box, InputAdornment, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { getAddressType } from '../../lib/block';
import {
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_H2_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  FONT_WEIGHT_NORMAL,
} from '../../utils/constants';
import { PrimaryButton, PrimaryTextField } from '../../components/customComponents';

export default function TrackSection({ sx }) {
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
        navigate(`/portfolio/${address}`, { replace: true });
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
    <Container maxWidth="xl" sx={{ ...sx }}>
      <Grid
        container
        alignItems="center"
        flexDirection={{ xs: 'column-reverse', sm: 'row' }}
        spacing={{ xs: 6, md: 0 }}
      >
        <Grid item xs={12} sm={6} md={5}>
          <Box position="relative" width="fit-content">
            <Box
              component="img"
              src="assets/images/track-image.png"
              alt=""
              zIndex={10}
            />
            <Box
              component="img"
              src="assets/images/dot.png"
              alt=""
              position="absolute"
              top="15%"
              right="15%"
              zIndex={20}
            />
            <Box
              component="img"
              src="assets/images/dot-small.png"
              alt=""
              position="absolute"
              bottom="17%"
              left="15%"
              zIndex={20}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }} />
        <Grid item xs={12} sm={6} md={5}>
          <Typography
            fontSize={FONT_SIZE_H2_DESKTOP}
            fontWeight={FONT_WEIGHT_NORMAL}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            Track celebs’ wallets
          </Typography>
          <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            color={COLOR_SECONDARY_BRIGHT}
            mt={2}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            Want to see what your favorite Celebs are into when it comes to buying, trading, or minting? We can help you track their wallets so you can follow their lead!
          </Typography>
          <Stack direction="row" justifyContent={{ xs: 'center', md: 'start' }}>
            <Box width="90%" mt={3}>
              <PrimaryTextField
                placeholder="Put your wallet address here"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="img" src="assets/images/person-2-rectangle.png" alt="" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <PrimaryButton variant="contained" onClick={getDataOfAddress}>
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
      </Grid>
    </Container>
  );
}