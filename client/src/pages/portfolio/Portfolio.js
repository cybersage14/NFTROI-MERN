/* eslint-disable */
import React, { createElement, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import { NotificationManager } from 'react-notifications';
// material
import { styled } from '@mui/material/styles';
import {
    Container, Stack, Button, Grid, Typography, CircularProgress, TextField, FormGroup, FormControlLabel, Checkbox
    , TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, List, ListItem, ListItemText, IconButton, SvgIcon, ListItemIcon, ListItemButton, Box
} from '@mui/material';
// components
import Page from '../../components/Page';
import Stat from './Stat';
import Holding from './Holding';
import Transaction from './Transaction';
import TabBar from './TabBar';
import CompareWallet from './CompareWallet';
// ----------------------------------------------------------------------
import { setStats, setNFTs, setTransactions } from '../../actions/manager';
import { getNFTs, getTransaction, getEns, getAddressType } from '../../lib/block';
import { add } from 'lodash';
import { Icon } from '@iconify/react';
import Logo from '../../components/Logo';
import { FacebookPath, LinkedinPath, TwitterPath } from '../SvgIcon';
import { SecondaryList, SecondaryListItem, PrimaryButton, SecondaryButton, SecondaryListItemButton } from '../../components/customComponents';
import { COLOR_SECONDARY_DARK, FONT_SIZE_BODY1_DESKTOP } from '../../utils/constants';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet);

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
                                            <ListItemIcon>
                                                <Icon icon={tabItem.icon} />
                                            </ListItemIcon>
                                            <ListItemText>{tabItem.name}</ListItemText>
                                        </SecondaryListItemButton>
                                    </ListItem>
                                ))
                            }
                            <ListItem
                                sx={{
                                    bgcolor: COLOR_SECONDARY_DARK,
                                    py: 4,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10
                                }}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    width="100%"
                                    spacing={2}
                                >
                                    <Box component="img" src="assets/images/wallet.png" alt="" sx={{ borderRadius: '50%' }} />
                                    <Typography>
                                        wefwefwef
                                    </Typography>
                                </Stack>
                            </ListItem>
                        </SecondaryList>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Stack spacing={3}>
                            <Typography variant='h4'>
                                {
                                    sideItem === 'overview' && 'Your Wallet'
                                }
                                {
                                    sideItem === 'holdings' && 'Holdings'
                                }
                                {
                                    sideItem === 'transactions ' && 'Transactions History'
                                }
                            </Typography>
                            <Stack direction={{ md: 'row', xs: 'column' }} spacing={1} justifyContent='center' alignItems="center">
                                <TabBar wallets={wallets} handleWallets={setWallets} />
                                <Button variant='contained' onClick={analyse}>Analyse</Button>
                            </Stack>
                            {
                                loading &&
                                <Stack direction='row' justifyContent='center' alignItems='center'>
                                    <CircularProgress />
                                    <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Analysing now, please wait... </Typography>
                                </Stack>
                            }
                            {
                                sideItem === 'overview' && <Stat />
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
