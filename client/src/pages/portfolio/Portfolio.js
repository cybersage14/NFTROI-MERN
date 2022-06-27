/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
// material
import { styled } from '@mui/material/styles';
import {
    Card,
    Container,
    Stack,
    Grid,
    Typography,
    CircularProgress,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    Icon as MuiIcon,
    Button
} from '@mui/material';
import { Icon } from '@iconify/react';
// components
import Page from '../../components/Page';
import Stat from './Stat';
import Holding from './Holding';
import Transaction from './Transaction';
// ----------------------------------------------------------------------
import { setStats, setNFTs, setTransactions } from '../../actions/manager';
import { getNFTs, getTransaction, getEns, getAddressType } from '../../lib/block';
import TabBar from './TabBar';

import {
    SecondaryList,
    PrimaryButton,
    SecondaryButton,
    SecondaryListItemButton
} from '../../components/customComponents';
import {
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_SECONDARY_BRIGHT,
    FONT_SIZE_BODY1_DESKTOP,
    FONT_SIZE_H2_DESKTOP,
    FONT_SIZE_H3_DESKTOP
} from '../../utils/constants';

const RootStyle = styled(Page)({
    height: '100%',
    paddingTop: '100px'
});

// ----------------------------------------------------------------------

const TABS = [
    {
        name: 'Portfolio Tracker',
        icon: 'clarity:wallet-solid',
        value: 'overview'
    },
    {
        name: 'Holdings',
        icon: 'fa-solid:hand-holding-medical',
        value: 'holdings'
    },
    {
        name: 'Transactions',
        icon: 'fa6-solid:clock-rotate-left',
        value: 'transactions'
    }
];

export default function Portfolio() {
    const dispatch = useDispatch();
    const { address } = useParams();
    const [wallets, setWallets] = useState([]);
    const [infos, setInfos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sideItem, setSideItem] = useState('overview');

    useEffect(() => {
        startAnalyse();
    }, [address]);

    const startAnalyse = async () => {
        let type = await getAddressType(address);
        if (type === 'invalid') {
            NotificationManager.error('Please input valid address');
        } else if (type === 'account') {
            setWallets([address]);
            getAllData([address]);
        }
    };

    const analyse = () => {
        if (wallets.length > 0) {
            getAllData(wallets);
        }
    };

    const getAllData = async (wallets) => {
        setLoading(true);
        console.log(wallets);
        let totalNFTs = [],
            stats = { wallet: '', ens: '', balance: 0, totalBuy: 0, totalSell: 0, totalMint: 0, totalFee: { total: 0, gas: 0, creator: 0, market: 0, listing: 0 }, closePL: 0, closePL_noFee: 0, openPL: 0, openPL_noFee: 0, totalHoldingValue: 0, totalEstimatedPL: 0, buyCount: 0, sellCount: 0, mintCount: 0, }, transactions = [];
        for (let i = 0; i < wallets.length; i++) {
            let wallet = wallets[i];

            let res = await getNFTs(wallet);
            totalNFTs = [...totalNFTs, ...res.nfts];
            console.log('nfts', wallet, totalNFTs);
            dispatch(setNFTs(totalNFTs));

            let data = await getTransaction(wallet);
            console.log('transactions', wallet, data);

            stats.balance += data.stats.balance;
            stats.totalBuy += data.stats.totalBuy;
            stats.totalSell += data.stats.totalSell;
            stats.totalMint += data.stats.totalMint;
            stats.totalFee.total += data.stats.totalFee.total;
            stats.totalFee.gas += data.stats.totalFee.gas;
            stats.totalFee.creator += data.stats.totalFee.creator;
            stats.totalFee.market += data.stats.totalFee.market;
            stats.totalFee.listing += data.stats.totalFee.listing;
            stats.closePL += data.stats.closePL;
            stats.closePL_noFee += data.stats.closePL_noFee;
            stats.totalEstimatedPL += res.totalEstimatedPL;
            stats.totalHoldingValue += res.totalHoldingValue;
            stats.openPL = (stats.closePL + stats.totalEstimatedPL).toFixed(3);
            stats.openPL_noFee = (stats.closePL_noFee + stats.totalEstimatedPL).toFixed(3);
            stats.buyCount += data.stats.buyCount;
            stats.sellCount += data.stats.sellCount;
            stats.mintCount += data.stats.mintCount;
            stats.biggestFlip = { ...data.stats.biggestFlip };
            stats.biggestFlop = { ...data.stats.biggestFlop };
            stats.topRank = { ...data.stats.topRank };
            dispatch(setStats(stats));

            transactions = [...transactions, ...data.transactions];
            dispatch(setTransactions(transactions));

            let ens = await getEns(wallet);
            data.stats.wallet = wallet;
            data.stats.ens = ens;
            setInfos([...infos, { ...data.stats }]);
        }
        dispatch(setStats(stats));
        dispatch(setNFTs(totalNFTs));
        dispatch(setTransactions(transactions));
        setLoading(false);
    };

    return (
        <RootStyle title="nftroi" id="move_top">
            <Container maxWidth="xl">
                <Grid container spacing={8}>
                    <Grid item xs={12} md={3}>
                        <Card sx={{ borderRadius: 1 }}>
                            <SecondaryList sx={{ pb: 0 }}>
                                {
                                    TABS.map(tabItem => (
                                        <ListItem key={tabItem.name}>
                                            <SecondaryListItemButton
                                                component={
                                                    sideItem === tabItem.value ? PrimaryButton : SecondaryButton
                                                }
                                                sx={{
                                                    borderRadius: 1,
                                                    fontSize: FONT_SIZE_BODY1_DESKTOP,
                                                    py: 1.5,
                                                }}
                                                onClick={() => setSideItem(tabItem.value)}
                                            >
                                                <ListItemIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                                                    <Icon icon={tabItem.icon} />
                                                </ListItemIcon>
                                                <ListItemText>{tabItem.name}</ListItemText>
                                            </SecondaryListItemButton>
                                        </ListItem>
                                    ))
                                }

                                <ListItem
                                    sx={{
                                        bgcolor: COLOR_SECONDARY,
                                        py: 4,
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10
                                    }}
                                >
                                    <ListItemIcon>
                                        <Box
                                            component="img"
                                            src="assets/images/wallet.png"
                                            alt=""
                                            sx={{ borderRadius: '50%' }}
                                            width={30}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>
                                        0xe59DCf131...
                                    </ListItemText>
                                </ListItem>
                            </SecondaryList>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Stack spacing={3}>
                            {
                                sideItem === 'overview' && (
                                    <Stack direction="row" alignItems="center" spacing={3}>
                                        <MuiIcon
                                            sx={{
                                                color: COLOR_PRIMARY,
                                                fontSize: FONT_SIZE_H2_DESKTOP
                                            }}
                                        >
                                            <Icon icon="clarity:wallet-solid" />
                                        </MuiIcon>
                                        <Typography fontSize={FONT_SIZE_H2_DESKTOP}>
                                            Portfolio Tracker
                                        </Typography>
                                    </Stack>
                                )
                            }
                            {
                                sideItem === 'holdings' && (
                                    <Stack direction="row" alignItems="center" spacing={3}>
                                        <MuiIcon
                                            sx={{
                                                color: COLOR_PRIMARY,
                                                fontSize: FONT_SIZE_H2_DESKTOP
                                            }}
                                        >
                                            <Icon icon="fa-solid:hand-holding-medical" />
                                        </MuiIcon>
                                        <Typography fontSize={FONT_SIZE_H2_DESKTOP}>
                                            Holdings
                                        </Typography>
                                    </Stack>
                                )
                            }
                            {
                                sideItem === 'transactions' && (
                                    <Stack direction="row" alignItems="center" spacing={3}>
                                        <MuiIcon
                                            sx={{
                                                color: COLOR_PRIMARY,
                                                fontSize: FONT_SIZE_H2_DESKTOP
                                            }}
                                        >
                                            <Icon icon="fa6-solid:clock-rotate-left" />
                                        </MuiIcon>
                                        <Typography fontSize={FONT_SIZE_H2_DESKTOP}>
                                            Transactions
                                        </Typography>
                                    </Stack>
                                )
                            }

                            <Typography
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                                color={COLOR_SECONDARY_BRIGHT}
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Typography>

                            {/* <Stack direction={{ md: 'row', xs: 'column' }} spacing={1} justifyContent='center' alignItems="center">
                                <TabBar wallets={wallets} handleWallets={setWallets} />
                                <Button variant='contained' onClick={analyse}>Analyse</Button>
                            </Stack> */}
                            {
                                loading &&
                                <Stack direction='row' justifyContent='center' alignItems='center'>
                                    <CircularProgress />
                                    <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Analysing now, please wait... </Typography>
                                </Stack>
                            }
                            {
                                sideItem === 'overview' && <Stat wallets={wallets} handleWallets={setWallets} getAllData={getAllData} />
                            }
                            {
                                sideItem === 'holdings' && <Holding />
                            }
                            {
                                sideItem === 'transactions' && < Transaction />
                            }
                            {/* <CompareWallet infos={infos} /> */}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </RootStyle>
    );
}
