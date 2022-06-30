/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
// material
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
    IconButton,
    ListItemButton,
    InputAdornment
} from '@mui/material';
import { Icon } from '@iconify/react';
// components
import Stat from './Stat';
import Holding from './Holding';
import Transaction from './Transaction';
// ----------------------------------------------------------------------
import { setStats, setNFTs, setTransactions } from '../../actions/manager';
import { getNFTs, getTransaction, getEns, getAddressType, shortAddress } from '../../lib/block';
import {
    SecondaryList,
    PrimaryButton,
    SecondaryButton,
    SecondaryListItemButton,
    PrimaryTextField
} from '../../components/customComponents';
import {
    BLUR_LOW,
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_SECONDARY_BRIGHT,
    COLOR_WHITE_OPACITY_ONE,
    FONT_SIZE_BODY1_DESKTOP,
    FONT_SIZE_BODY2_DESKTOP,
    FONT_SIZE_H2_DESKTOP,
    FONT_SIZE_H3_DESKTOP
} from '../../utils/constants';

// ----------------------------------------------------------------------
const InputWallet = ({ setWallet, addWallet, keyPress }) => (
    <Box
        py={10}
        px={5}
        borderRadius={2}
        bgcolor={COLOR_WHITE_OPACITY_ONE}
        border={`2px solid ${COLOR_SECONDARY}`}
        sx={{
            backdropFilter: BLUR_LOW
        }}
    >
        <Grid
            container
            alignItems="stretch"
            spacing={2}
        >
            <Grid item xs={10} md={10}>
                <PrimaryTextField
                    placeholder="Put your wallet address here"
                    onChange={e => setWallet(e.target.value)}
                    onKeyDown={keyPress}
                    fullWidth
                />
            </Grid>
            <Grid item xs={2} md={2}>
                <PrimaryButton onClick={addWallet} sx={{ height: '100%' }} fullWidth>
                    Analyse
                </PrimaryButton>
            </Grid>
        </Grid>
    </Box>
);

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
    const [wallet, setWallet] = useState('');
    const [visibleAddForm, setVisibleAddForm] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState('');

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

    const handleAddTab = (address) => {
        setWallets([
            ...wallets,
            address
        ]);
        setSelectedWallet(address);
    };

    const addWallet = () => {
        if (wallet.trim()) {
            handleAddTab(wallet);
        }
        closeAddForm();
    };

    const handleClose = (e, tabId) => {
        // setAddWallet(wallets.filter(tab => tab !== tabId))
        setWallets(wallets.filter(tab => tab !== tabId));
    };

    const openAddForm = () => {
        setVisibleAddForm(true);
    };

    const closeAddForm = () => {
        setVisibleAddForm(false);
    };

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            addWallet();
        }
    };

    useEffect(() => {
        if (wallets.length > 0) {
            getAllData(wallets);
        }
    }, [wallets.length]);

    return (
        <Box position="relative" overflow="hidden" minHeight="91.5vh">
            <Container
                maxWidth="xl"
                sx={{ position: 'relative', zIndex: 30, pt: 10, pb: 20 }}
            >
                <Grid container spacing={8}>

                    <Grid item xs={12} md={3}>
                        <Card sx={{ borderRadius: 1 }}>
                            <SecondaryList sx={{ pb: 0 }}>
                                {/* Tabs */}
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

                                {/* Wallet addresses */}
                                {
                                    wallets.map(child => (
                                        <ListItem
                                            key={child}
                                            sx={{
                                                bgcolor: COLOR_SECONDARY,
                                                pt: 2,
                                            }}
                                            secondaryAction={
                                                <IconButton
                                                    onClick={event => handleClose(event, child)}
                                                >
                                                    <MuiIcon
                                                        sx={{
                                                            fontSize: FONT_SIZE_BODY1_DESKTOP,
                                                            color: COLOR_SECONDARY_BRIGHT
                                                        }}
                                                    >
                                                        <Icon icon="charm:circle-cross" />
                                                    </MuiIcon>
                                                </IconButton>
                                            }
                                            onClick={() => setSelectedWallet(child)}
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
                                            <ListItemText
                                                fontSize={FONT_SIZE_BODY2_DESKTOP}
                                                color={COLOR_SECONDARY}
                                            >
                                                {shortAddress(child)}
                                            </ListItemText>
                                        </ListItem>
                                    ))
                                }

                                {/* Add new wallet button */}
                                {
                                    !visibleAddForm && (
                                        <ListItem
                                            sx={{
                                                bgcolor: COLOR_SECONDARY,
                                                py: 2,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10
                                            }}
                                        >
                                            <ListItemButton onClick={openAddForm}>
                                                <ListItemIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                                                    <Icon icon="fluent:add-square-24-filled" />
                                                </ListItemIcon>
                                                <ListItemText fontSize={FONT_SIZE_BODY1_DESKTOP}>
                                                    ADD NEW WALLET
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                }

                                {/* Add new wallet form */}
                                {
                                    visibleAddForm && (
                                        <ListItem
                                            sx={{
                                                bgcolor: COLOR_SECONDARY,
                                                py: 3,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10
                                            }}
                                        >
                                            <PrimaryTextField
                                                placeholder="Put your wallet address here"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <PrimaryButton onClick={addWallet}>
                                                                Add
                                                            </PrimaryButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onKeyDown={keyPress}
                                                onChange={e => setWallet(e.target.value)}
                                                fullWidth
                                            />
                                        </ListItem>
                                    )
                                }
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
                                            Transactions History
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
                                    <TabBar wallets={wallets} setWallets={setWallets} />
                                    <Button variant='contained' onClick={analyse}>Analyse</Button>
                                </Stack> */}
                            {
                                loading ? (
                                    <Stack direction='row' justifyContent='center' alignItems='center'>
                                        <CircularProgress />
                                        <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Analysing now, please wait... </Typography>
                                    </Stack>
                                ) : (
                                    wallets.length > 0 ? sideItem === 'overview' ? (
                                        <Stat selectedWallet={selectedWallet} />
                                    ) : sideItem === 'holdings' ? (
                                        <Holding />
                                    ) : sideItem === 'transactions' ? (
                                        <Transaction />
                                    ) : (
                                        <></>
                                    ) : (
                                        <InputWallet
                                            setWallet={setWallet}
                                            addWallet={addWallet}
                                            keyPress={keyPress}
                                        />
                                    )
                                )

                            }
                        </Stack>
                    </Grid>

                </Grid>
            </Container>
            <Box
                component="img"
                src="assets/images/wave-portfolio.svg"
                alt=""
                width="100%"
                position="absolute"
                top="20%"
                zIndex={10}
            />
            <Box
                component="img"
                src="assets/images/gradient-portfolio-left.svg"
                alt=""
                width="100%"
                height=""
                position="absolute"
                bottom={0}
                left={0}
                zIndex={20}
            />
            <Box
                component="img"
                src="assets/images/gradient-portfolio-right.svg"
                alt=""
                width="100%"
                position="absolute"
                bottom={0}
                right={0}
                zIndex={20}
            />
        </Box>
    );
}
