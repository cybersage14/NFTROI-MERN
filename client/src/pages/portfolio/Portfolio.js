/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import { NotificationManager } from 'react-notifications';
// material
import { styled } from '@mui/material/styles';
import {
    Container, Stack, Button, Grid, Typography, CircularProgress, TextField, FormGroup, FormControlLabel, Checkbox
    , TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, List, ListItem, ListItemText, IconButton, SvgIcon
} from '@mui/material';
// components
import Page from '../../components/Page'
import Stat from './Stat'
import Holding from './Holding'
import Transaction from './Transaction';
import TabBar from './TabBar'
import CompareWallet from './CompareWallet';
// ----------------------------------------------------------------------
import { setStats, setNFTs, setTransactions } from '../../actions/manager';
import { getNFTs, getTransaction, getEns, getAddressType } from '../../lib/block';
import { add } from 'lodash';
import Logo from '../../components/Logo';
import { FacebookPath, LinkedinPath, TwitterPath } from '../SvgIcon';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet)

const RootStyle = styled(Page)({
    height: '100%',
    paddingTop: '100px'
});

// ----------------------------------------------------------------------

export default function Portfolio() {
    const dispatch = useDispatch()
    const { address } = useParams();
    const [wallets, setWallets] = useState([])
    const [infos, setInfos] = useState([])
    const [loading, setLoading] = useState(false)
    const [sideItem, setSideItem] = useState('overview')

    useEffect(() => {
        startAnalyse()
    }, [address])

    const startAnalyse = async () => {
        let type = await getAddressType(address)
        if (type === 'invalid') {
            NotificationManager.error('Please input valid address')
        } else if (type === 'account') {
            setWallets([address])
            getAllData([address])
        }
    }

    const analyse = () => {
        if (wallets.length > 0) {
            getAllData(wallets)
        }
    }

    const getAllData = async (wallets) => {
        setLoading(true)
        console.log(wallets)
        let totalNFTs = [],
            stats = { wallet: '', ens: '', balance: 0, totalBuy: 0, totalSell: 0, totalMint: 0, totalFee: { total: 0, gas: 0, creator: 0, market: 0, listing: 0 }, closePL: 0, closePL_noFee: 0, openPL: 0, openPL_noFee: 0, totalHoldingValue: 0, totalEstimatedPL: 0, buyCount: 0, sellCount: 0, mintCount: 0, }, transactions = []
        for (let i = 0; i < wallets.length; i++) {
            let wallet = wallets[i]

            let res = await getNFTs(wallet)
            totalNFTs = [...totalNFTs, ...res.nfts]
            console.log('nfts', wallet, totalNFTs)
            dispatch(setNFTs(totalNFTs))

            let data = await getTransaction(wallet)
            console.log('transactions', wallet, data)

            stats.balance += data.stats.balance
            stats.totalBuy += data.stats.totalBuy
            stats.totalSell += data.stats.totalSell
            stats.totalMint += data.stats.totalMint
            stats.totalFee.total += data.stats.totalFee.total
            stats.totalFee.gas += data.stats.totalFee.gas
            stats.totalFee.creator += data.stats.totalFee.creator
            stats.totalFee.market += data.stats.totalFee.market
            stats.totalFee.listing += data.stats.totalFee.listing
            stats.closePL += data.stats.closePL
            stats.closePL_noFee += data.stats.closePL_noFee
            stats.totalEstimatedPL += res.totalEstimatedPL
            stats.totalHoldingValue += res.totalHoldingValue
            stats.openPL = (stats.closePL + stats.totalEstimatedPL).toFixed(3)
            stats.openPL_noFee = (stats.closePL_noFee + stats.totalEstimatedPL).toFixed(3)
            stats.buyCount += data.stats.buyCount
            stats.sellCount += data.stats.sellCount
            stats.mintCount += data.stats.mintCount
            stats.biggestFlip = { ...data.stats.biggestFlip }
            stats.biggestFlop = { ...data.stats.biggestFlop }
            stats.topRank = { ...data.stats.topRank }
            dispatch(setStats(stats))

            transactions = [...transactions, ...data.transactions]
            dispatch(setTransactions(transactions))

            let ens = await getEns(wallet)
            data.stats.wallet = wallet
            data.stats.ens = ens
            setInfos([...infos, { ...data.stats }])
        }
        dispatch(setStats(stats))
        dispatch(setNFTs(totalNFTs))
        dispatch(setTransactions(transactions))
        setLoading(false)
    }

    return (
        <RootStyle title="nftroi" id="move_top">
            <Container>
                <Stack direction={{ md: 'row', xs: 'column' }} spacing={5}>
                    <Stack direction={{ md: 'column', xs: 'row' }}>
                        <ListItem button onClick={() => setSideItem('overview')}>
                            <ListItemText>Overview</ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setSideItem('holdings')}>
                            <ListItemText>Holdings</ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setSideItem('transactions')}>
                            <ListItemText>Transactions</ListItemText>
                        </ListItem>
                    </Stack>
                    <Stack direction='column' spacing={3} style={{ flex: 1 }}>
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
                </Stack>
                <Stack direction={{ md: 'row', xs: 'column' }} justifyContent='space-between' alignItems='center' sx={{ borderTop: '2px solid #2a5642', mt: 20, py: 6 }}>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Logo />
                        <Typography variant='h5'>NFTROI</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <ListItem button onClick={() => setSideItem('overview')}>
                            <ListItemText>Overview</ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setSideItem('holdings')}>
                            <ListItemText>Holdings</ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => setSideItem('transactions')}>
                            <ListItemText>Transactions</ListItemText>
                        </ListItem>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <IconButton sx={{ color: 'white' }}>
                            <SvgIcon>{TwitterPath}</SvgIcon>
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <SvgIcon>{FacebookPath}</SvgIcon>
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <SvgIcon>{LinkedinPath}</SvgIcon>
                        </IconButton>
                    </Stack>
                </Stack>
            </Container>
        </RootStyle>
    );
}
