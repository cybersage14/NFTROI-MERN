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
// ----------------------------------------------------------------------
import { setWallet, setStats, setNFTs, setTransactions } from '../../actions/manager';
import { getNFTs, getTransaction } from '../../lib/block';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet)

const RootStyle = styled(Page)({
  height: '100%',
  paddingTop: '100px'
});

// ----------------------------------------------------------------------

export default function SinglePorfolio() {
  const dispatch = useDispatch()
  // const wallet = '0xacd9fb1f332a4dca50a21e3aed6643add0239da2'
  const wallet = useSelector(state => state.manager.wallet)
  const [inputWallet, setInputWallet] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (wallet) {
      getAllData(wallet)
    }
  }, [wallet])

  const analyse = () => {
    if (inputWallet.trim()) {
      getAllData(inputWallet)
    }
  }

  const getAllData = async (wallet) => {
    setLoading(true)
    let { nfts, totalHoldingPL } = await getNFTs(wallet)
    console.log(nfts)
    dispatch(setNFTs(nfts))

    let data = await getTransaction(wallet)
    console.log(data)
    data.stats.totalHoldingPL = totalHoldingPL
    dispatch(setStats(data.stats))
    dispatch(setTransactions(data.transactions))
    setLoading(false)
  }

  return (
    <RootStyle title="nftroi" id="move_top">
      <Container>
        <Stack direction='row' spacing={1} justifyContent='center' alignItems="center">
          <TextField variant='outlined' placeholder='wallet address' sx={{ width: '400px' }} onChange={e => setInputWallet(e.target.value)} />
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
