/* eslint-disable */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// material
import {
    Stack, Grid, Typography, Icon as MuiIcon, Box, IconButton
} from '@mui/material';
import { Icon } from '@iconify/react';
import PLGraph from './PLGraph';
import {
    COLOR_SECONDARY_BRIGHT,
    FONT_SIZE_H3_DESKTOP,
    FONT_SIZE_BODY1_DESKTOP,
    FONT_WEIGHT_NORMAL,
    FONT_WEIGHT_SEMIBOLD,
    FONT_SIZE_BODY2_DESKTOP,
    FONT_SIZE_H2_DESKTOP,
    COLOR_WHITE,
    COLOR_PRIMARY,
    COLOR_ERROR,
    COLOR_SUCCESS
} from '../../utils/constants';
import {
    HorizontalViterousStack,
    PrimaryStack,
} from '../../components/customComponents';
import { shortAddress } from '../../lib/block';

const FeeItem = ({ title, percent, icon, value }) => {
    return (
        <Stack direction='column' spacing={1}>
            <Typography variant='body2'>{title}</Typography>
            <Stack direction='row' spacing={1}>
                <Stack direction='row' alignItems='center' sx={{
                    border: '1px solid grey',
                    background: 'linear-gradient(97.21deg, rgba(255, 255, 255, 0.15) 10.89%, rgba(145, 183, 255, 0.15) 87.44%)',
                    borderRadius: `10.8521px`,
                    p: 1,
                    width: 0.3
                }}>
                    <Typography variant='body2'>{`${percent}%`}</Typography>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={2}
                    sx={{
                        border: '1px solid grey',
                        background: 'linear-gradient(97.21deg, rgba(255, 255, 255, 0.15) 10.89%, rgba(145, 183, 255, 0.15) 87.44%)',
                        borderRadius: `10.8521px`,
                        p: 1,
                        width: 0.7
                    }}>
                    <PrimaryStack
                        width={32}
                        height={32}
                        borderRadius="50%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <MuiIcon sx={{ fontSize: FONT_SIZE_BODY1_DESKTOP }}>
                            <Icon icon={icon} />
                        </MuiIcon>
                    </PrimaryStack>
                    <Typography variant='body2'>{`${value} ETH`}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

const StateCard = ({ title, value, color, icon, subtitle }) => (
    <HorizontalViterousStack
        direction="row"
        justifyContent="space-between"
        borderRadius={1}
        py={2}
        px={2}
        alignItems="center"
        height="100%"
    >
        <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
                <Stack direction="row" justifyContent="center">
                    <PrimaryStack
                        width={60}
                        height={60}
                        borderRadius="50%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <MuiIcon sx={{ fontSize: FONT_SIZE_H2_DESKTOP }}>
                            <Icon icon={icon} />
                        </MuiIcon>
                    </PrimaryStack>
                </Stack>
            </Grid>

            <Grid item xs={12} md={8}>
                <Stack spacing={0.5}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            component="span"
                            fontSize={FONT_SIZE_BODY1_DESKTOP}
                            color={COLOR_SECONDARY_BRIGHT}
                        >
                            {title}
                        </Typography>
                        <MuiIcon
                            sx={{
                                fontSize: FONT_SIZE_H3_DESKTOP,
                                color: COLOR_SECONDARY_BRIGHT
                            }}
                        >
                            <Icon icon="bxs:info-circle" />
                        </MuiIcon>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <MuiIcon sx={{ fontSize: FONT_SIZE_H2_DESKTOP }}>
                            <Icon icon="logos:ethereum" />
                        </MuiIcon>

                        <Box>
                            <Typography
                                fontSize={FONT_SIZE_H3_DESKTOP}
                                color={color}
                                fontWeight={FONT_WEIGHT_NORMAL}
                            >{value}</Typography>
                            {
                                subtitle && (
                                    <Typography
                                        component="span"
                                        fontSize={FONT_SIZE_BODY2_DESKTOP - 3}
                                        color={COLOR_SECONDARY_BRIGHT}
                                    >{subtitle}</Typography>
                                )
                            }

                        </Box>

                        {
                            color && (
                                <Box
                                    component="img"
                                    src={
                                        color === COLOR_ERROR ? 'assets/images/tiny-graph-red.svg' : 'assets/images/tiny-graph-green.svg'
                                    }
                                    alt=""
                                    mt={1}
                                    flexGrow={1}
                                />
                            )
                        }

                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    </HorizontalViterousStack>
);

// ----------------------------------------------------------------------

export default function Stat({ selectedWallet }) {
    const stats = useSelector(state => state.manager.stats);
    const [includeGas, setIncludeGas] = useState(true);

    const changeIncludeGas = (e) => {
        setIncludeGas(e.target.checked);
    };

    return (
        <Stack spacing={6}>
            {/* <FormGroup>
                    <FormControlLabel control={<Checkbox checked={includeGas} onChange={changeIncludeGas} />} label="Include Total Fee in P/L" />
                </FormGroup> */}
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <HorizontalViterousStack p={4} spacing={3} borderRadius={3}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <MuiIcon
                                    sx={{
                                        fontSize: FONT_SIZE_H3_DESKTOP
                                    }}
                                >
                                    <Icon icon="clarity:wallet-solid" />
                                </MuiIcon>
                                <Typography
                                    fontSize={FONT_SIZE_H3_DESKTOP}
                                    color={COLOR_SECONDARY_BRIGHT}
                                >
                                    Available Balance
                                </Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                    fontSize={FONT_SIZE_H3_DESKTOP}
                                    fontWeight={FONT_WEIGHT_SEMIBOLD}
                                >
                                    {`${stats?.balance || 0} ETH`}
                                </Typography>
                                <MuiIcon
                                    sx={{
                                        fontSize: FONT_SIZE_H3_DESKTOP
                                    }}
                                >
                                    <Icon icon="logos:ethereum" />
                                </MuiIcon>
                            </Stack>

                            <Typography
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                            >
                                320 items bought.
                            </Typography>
                        </HorizontalViterousStack>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        {
                            selectedWallet && (
                                <Stack spacing={3}>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box
                                            component="img"
                                            src="assets/images/wallet.png"
                                            alt=""
                                            width={50}
                                            borderRadius="50%"
                                        />
                                        <Box>
                                            <Typography
                                                color={COLOR_SECONDARY_BRIGHT}
                                                fontSize={FONT_SIZE_BODY2_DESKTOP}
                                            >ADDRESS:</Typography>
                                            <Typography
                                                color={COLOR_WHITE}
                                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                            >
                                                {shortAddress(selectedWallet)}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    {/* Badges */}
                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <Stack
                                                    borderRadius={1}
                                                    bgcolor="rgb(98, 246, 255, 0.1)"
                                                    p={1.5}
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                >
                                                    <Box
                                                        component="img"
                                                        src="assets/images/logo.png"
                                                        alt=""
                                                    />
                                                    <Typography
                                                        component="span"
                                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                    >NFT Degen</Typography>
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                <Stack
                                                    borderRadius={1}
                                                    bgcolor="rgb(98, 246, 255, 0.1)"
                                                    p={1.5}
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                >
                                                    <MuiIcon
                                                        sx={{
                                                            color: COLOR_PRIMARY,
                                                            fontSize: FONT_SIZE_H2_DESKTOP
                                                        }}
                                                    >
                                                        <Icon icon="bi:arrow-up-square-fill" />
                                                    </MuiIcon>
                                                    <Typography
                                                        component="span"
                                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                    >Top Trader</Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box>
                                        <Grid container>
                                            <Grid item xs={12} md={3}>
                                                <Stack spacing={1}>
                                                    <Typography
                                                        component="span"
                                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                        fontWeight={FONT_WEIGHT_NORMAL}
                                                    >NFT's</Typography>
                                                    <Typography
                                                        component="span"
                                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                        fontWeight={FONT_WEIGHT_NORMAL}
                                                        color={COLOR_SECONDARY_BRIGHT}
                                                    >38</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Stack spacing={1}>
                                                    <Typography
                                                        component="span"
                                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                        fontWeight={FONT_WEIGHT_NORMAL}
                                                    >Collections</Typography>
                                                    <Typography
                                                        component="span"
                                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                        fontWeight={FONT_WEIGHT_NORMAL}
                                                        color={COLOR_SECONDARY_BRIGHT}
                                                    >7</Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Stack spacing={1}>
                                                    <Typography
                                                        component="span"
                                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                        fontWeight={FONT_WEIGHT_NORMAL}
                                                    >Top Holdings</Typography>
                                                    <Box
                                                        component="img"
                                                        src="assets/images/wallet.png"
                                                        alt=""
                                                        width={30}
                                                        borderRadius="50%"
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            )
                        }
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <StateCard
                            title="Closed PNL"
                            value={includeGas ? `${stats?.closePL || 0} ETH` : `${stats?.closePL_noFee || 0} ETH`}
                            icon="icon-park-solid:lock-one"
                            color={includeGas ?
                                (stats?.closePL || 0) >= 0 ? COLOR_SUCCESS : COLOR_ERROR
                                :
                                (stats?.closePL_noFee || 0) >= 0 ? COLOR_SUCCESS : COLOR_ERROR}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StateCard
                            title="Open PNL"
                            icon="icon-park-solid:unlock-one"
                            value={includeGas ? `${stats?.openPL || 0} ETH` : `${stats?.openPL_noFee || 0} ETH`}
                            color={includeGas ?
                                (stats?.openPL || 0) >= 0 ? COLOR_SUCCESS : COLOR_ERROR
                                :
                                (stats?.openPL_noFee || 0) >= 0 ? COLOR_SUCCESS : COLOR_ERROR}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StateCard
                            title="Total Holding Value"
                            icon="icon-park-solid:hold-seeds"
                            value={`${stats?.totalHoldingValue || 0} ETH`}
                        />
                    </Grid>
                </Grid>
            </Box>

            <PLGraph />

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <StateCard
                            title="Total Buy"
                            value={`${stats?.totalBuy || 0} ETH`}
                            subTitle={`${stats?.buyCount || 0} Items bought`}
                            icon="clarity:shopping-cart-solid"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StateCard
                            title="Total Sell"
                            icon="fa-solid:hand-holding-usd"
                            value={`${stats?.totalSell || 0} ETH`}
                            subTitle={`${stats?.sellCount || 0} Items sold`}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StateCard
                            title="Total Mint"
                            icon="emojione-monotone:pick"
                            value={`${stats?.totalMint || 0} ETH`}
                            subTitle={`${stats?.mintCount || 0} Items minted`}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Stack direction='column'
                sx={{
                    border: '1px solid grey',
                    background: 'linear-gradient(97.21deg, rgba(255, 255, 255, 0.15) 10.89%, rgba(145, 183, 255, 0.15) 87.44%)',
                    borderRadius: `10.8521px`,
                    p: 2,
                    my: 3
                }}
            >
                <Stack direction='row' justifyContent='space-between'>
                    <Stack direction='row' alignItems='center' spacing={3} >

                        <PrimaryStack
                            width={50}
                            height={50}
                            borderRadius="50%"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <MuiIcon sx={{ fontSize: FONT_SIZE_H2_DESKTOP }}>
                                <Icon icon="akar-icons:ribbon" />
                            </MuiIcon>
                        </PrimaryStack>
                        <Typography variant='body1' color='text.secondary'>
                            Total Fees
                        </Typography>
                        <Stack direction='row' spacing={2} alignItems='center'>
                            <MuiIcon sx={{ fontSize: FONT_SIZE_H2_DESKTOP }}>
                                <Icon icon="logos:ethereum" />
                            </MuiIcon>
                            <Typography variant='h6'>{`${stats?.totalFee ? stats.totalFee.total : 0} ETH`}</Typography>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Box component='img' src='/static/icons/info.svg' width='22px' height='22px' />
                    </Stack>
                </Stack>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeeItem
                            title='Gas Fee'
                            percent={stats?.totalFee ? (stats.totalFee.gas / stats.totalFee.total * 100).toFixed(0) : 0}
                            icon='bxs:gas-pump'
                            value={stats?.totalFee ? stats.totalFee.gas : 0}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeeItem
                            title='Marketplace Fee'
                            percent={stats?.totalFee ? (stats.totalFee.market / stats.totalFee.total * 100).toFixed(0) : 0}
                            icon='healthicons:market-stall'
                            value={stats?.totalFee ? stats.totalFee.market : 0}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeeItem
                            title='Creator Fee'
                            percent={stats?.totalFee ? (stats.totalFee.creator / stats.totalFee.total * 100).toFixed(0) : 0}
                            icon='heroicons-solid:light-bulb'
                            value={stats?.totalFee ? stats.totalFee.creator : 0}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FeeItem
                            title='Listing Fee'
                            percent={stats?.totalFee ? (stats.totalFee.listing / stats.totalFee.total * 100).toFixed(0) : 0}
                            icon='fluent:task-list-square-ltr-24-regular'
                            value={stats?.totalFee ? stats.totalFee.listing : 0}
                        />
                    </Grid>
                </Grid>
            </Stack >
        </Stack>
    );
}
