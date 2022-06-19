/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
// material
import { styled } from '@mui/material/styles';
import {
    Container, Stack, Button, Grid, Typography, CircularProgress, TextField, FormGroup, FormControlLabel, Checkbox
    , TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper
} from '@mui/material';
// components
import Page from '../../components/Page'
import Stat from './Stat'
import Nft from './Nft'
import Transaction from './Transaction';
import TabBar from './TabBar'
// ----------------------------------------------------------------------
import { setStats, setNFTs, setTransactions } from '../../actions/manager';
import { getNFTs, getTransaction } from '../../lib/block';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet)

const RootStyle = styled(Page)({
    height: '100%',
    paddingTop: '100px'
});

// ----------------------------------------------------------------------

export default function MergePorfolio() {
    const dispatch = useDispatch()
    // const wallet = '0xacd9fb1f332a4dca50a21e3aed6643add0239da2'
    // const wallet = useSelector(state => state.manager.wallet)
    const [wallets, setWallets] = useState([])
    const [loading, setLoading] = useState(false)

    const analyse = () => {
        if (wallets.length > 0) {
            getAllData(wallets)
        }
    }

    const getAllData = async (wallets) => {
        setLoading(true)
        console.log(wallets)
        let totalNFTs = [],
            stats = { balance: 0, totalBuy: 0, totalSell: 0, totalMint: 0, totalFee: 0, PL: 0, PL_noFee: 0, totalHoldingPL: 0, buyCount: 0, sellCount: 0, mintCount: 0, }, transactions = []
        for (let i = 0; i < wallets.length; i++) {
            let wallet = wallets[i]
            let { nfts, totalHoldingPL } = await getNFTs(wallet)
            totalNFTs = [...totalNFTs, ...nfts]
            console.log(wallet, totalNFTs)

            let data = await getTransaction(wallet)
            console.log(wallet, data)

            stats.balance += data.stats.balance
            stats.totalBuy += data.stats.totalBuy
            stats.totalSell += data.stats.totalSell
            stats.totalFee += data.stats.totalFee
            stats.PL += data.stats.PL
            stats.PL_noFee += data.stats.PL_noFee
            stats.totalHoldingPL += totalHoldingPL
            stats.buyCount += data.stats.buyCount
            stats.sellCount += data.stats.sellCount

            transactions = [...transactions, ...data.transactions]
        }
        dispatch(setStats(stats))
        dispatch(setNFTs(totalNFTs))
        dispatch(setTransactions(transactions))
        setLoading(false)
    }

    return (
        <RootStyle title="Trave-portfolio" id="move_top">
            <Container>
                <Stack direction='row' spacing={1} justifyContent='center' alignItems="center">
                    <TabBar handleWallets={setWallets} />
                    <Button variant='contained' onClick={analyse}>Analyse</Button>
                </Stack>
                {
                    loading &&
                    <Stack direction='row' justifyContent='center' alignItems='center'>
                        <CircularProgress />
                        <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Analysing now, please wait... </Typography>
                    </Stack>
                }
                <Stat />
                <Nft />
                <Transaction />
            </Container>
        </RootStyle>
    );
}
