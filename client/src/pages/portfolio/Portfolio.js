/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
// material
import {
    Container,
    Stack,
    Grid,
    Typography,
    CircularProgress,
    Box,
    Icon as MuiIcon,
} from '@mui/material';
import { Icon } from '@iconify/react';
// components
import Stat from './Stat';
import Holding from './Holding';
import Transaction from './Transaction';
// ----------------------------------------------------------------------
import { setStats, setNFTs, setTransactions } from '../../actions/manager';
import { getNFTs, getTransaction, getEns, getAddressType } from '../../lib/block';
import {
    PrimaryButton,
    PrimaryTextField
} from '../../components/customComponents';
import {
    BLUR_LOW,
    COLOR_PRIMARY,
    COLOR_SECONDARY,
    COLOR_SECONDARY_BRIGHT,
    COLOR_WHITE_OPACITY_ONE,
    FONT_SIZE_BODY1_DESKTOP,
    FONT_SIZE_H2_DESKTOP,
} from '../../utils/constants';
import SideTab from '../../components/SideTab';
import InputWallet from './InputWallet';
import PortfolioTracker from './PortfolioTracker';
import Holdings from './Holdings';
import Transactions from './Transactions';

// ----------------------------------------------------------------------

const TABS = [
    {
        name: 'Portfolio Tracker',
        icon: 'clarity:wallet-solid',
        value: 'portfolio-tracker'
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
    const { tab, address } = useParams();
    const [wallets, setWallets] = useState([]);
    const [infos, setInfos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sideItem, setSideItem] = useState('overview');
    const [wallet, setWallet] = useState('');
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
    };

    const handleClose = (e, tabId) => {
        // setAddWallet(wallets.filter(tab => tab !== tabId))
        setWallets(wallets.filter(tab => tab !== tabId));
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
                        <SideTab
                            tabs={TABS}
                            wallets={wallets}
                            setWallet={setWallet}
                            addWallet={addWallet}
                            setSelectedWallet={setSelectedWallet}
                            handleClose={handleClose}
                            parentRoute="/portfolio"
                        />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        {
                            tab === 'portfolio-tracker' &&
                            <PortfolioTracker
                                loading={loading}
                                selectedWallet={selectedWallet}
                                wallets={wallets}
                                setWallet={setWallet}
                                addWallet={addWallet}
                                keyPress={keyPress}
                            />
                        }
                        {
                            tab === 'holdings' &&
                            <Holdings
                                loading={loading}
                                wallets={wallets}
                                setWallet={setWallet}
                                addWallet={addWallet}
                                keyPress={keyPress}
                            />
                        }
                        {
                            tab === 'transactions' &&
                            <Transactions
                                loading={loading}
                                wallets={wallets}
                                setWallet={setWallet}
                                addWallet={addWallet}
                                keyPress={keyPress}
                            />
                        }
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
