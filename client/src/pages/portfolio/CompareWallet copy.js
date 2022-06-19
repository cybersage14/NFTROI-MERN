/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
// material
import { styled } from '@mui/material/styles';
import {
  Container, Stack, Button, Typography, CircularProgress, TextField, TableRow, TableCell, TableBody, TableHead, Paper, Table
} from '@mui/material';
// components
import Page from '../../components/Page'
// ----------------------------------------------------------------------
import { getCompareInfo, shortAddress, getEns } from '../../lib/block';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet)

const RootStyle = styled(Page)({
  height: '100%',
  paddingTop: '100px'
});

// ----------------------------------------------------------------------

export default function CompareWallet() {
  const dispatch = useDispatch()
  // const wallet = '0xacd9fb1f332a4dca50a21e3aed6643add0239da2'
  const [wallet1, setWallet1] = useState('')
  const [ens1, setEns1] = useState('')
  const [wallet2, setWallet2] = useState('')
  const [ens2, setEns2] = useState('')
  const [info1, setInfo1] = useState({})
  const [info2, setInfo2] = useState({})
  const [loading, setLoading] = useState(false)

  const compare = () => {
    getAllData(wallet1, wallet2)
  }

  const getAllData = async (wallet1, wallet2) => {
    setLoading(true)
    if (wallet1.trim()) {
      setEns1(await getEns(wallet1))
      let info = await getCompareInfo(wallet1)
      console.log(info)
      setInfo1(info)
    }
    if (wallet2.trim()) {
      setEns2(await getEns(wallet2))
      let info = await getCompareInfo(wallet2)
      console.log(info)
      setInfo2(info)
    }
    setLoading(false)
  }

  return (
    <RootStyle title="Trave-portfolio" id="move_top">
      <Container>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent='center' alignItems="center">
          <TextField variant='outlined' placeholder='wallet address 1' sx={{ width: '400px' }} onChange={e => setWallet1(e.target.value)} />
          <TextField variant='outlined' placeholder='wallet address 2' sx={{ width: '400px' }} onChange={e => setWallet2(e.target.value)} />
          <Button variant='contained' onClick={compare}>Compare</Button>
        </Stack>
        {
          loading &&
          <Stack direction='row' justifyContent='center' alignItems='center'>
            <CircularProgress />
            <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Comparing now, please wait... </Typography>
          </Stack>
        }
        <Paper sx={{ width: { md: '50%', xs: '90%' }, mx: 'auto', mt: 5 }}>
          <Table
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  {
                    ens1 ?
                      <Stack direction='column' alignItems='center'>
                        <Typography variant='body2'>
                          {ens1}
                        </Typography>
                        <Typography variant='body2'>
                          {shortAddress(wallet1)}
                        </Typography>
                      </Stack>
                      :
                      <Typography variant='body2'>
                        {shortAddress(wallet1)}
                      </Typography>
                  }
                </TableCell>
                <TableCell>
                  {
                    ens2 ?
                      <Stack direction='column' alignItems='center'>
                        <Typography variant='body2'>
                          {ens1}
                        </Typography>
                        <Typography variant='body2'>
                          {shortAddress(wallet2)}
                        </Typography>
                      </Stack>
                      :
                      <Typography variant='body2'>
                        {shortAddress(wallet2)}
                      </Typography>
                  }
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">nftroi score</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
              <TableRow
              >
                <TableCell align="left">Available balance</TableCell>
                <TableCell align="left">{`${info1.balance || '-'} eth`}</TableCell>
                <TableCell align="left">{`${info2.balance || '-'} eth`}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">P/L</TableCell>
                <TableCell align="left">{`${info1.PL || '-'} eth`}</TableCell>
                <TableCell align="left">{`${info2.PL || '-'} eth`}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Total buy</TableCell>
                <TableCell align="left">{`${info1.totalBuy || '-'} eth`}</TableCell>
                <TableCell align="left">{`${info2.totalBuy || '-'} eth`}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Total sell</TableCell>
                <TableCell align="left">{`${info1.totalSell || '-'} eth`}</TableCell>
                <TableCell align="left">{`${info2.totalSell || '-'} eth`}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Total mint</TableCell>
                <TableCell align="left">{`${info1.totalMint || '-'} eth`}</TableCell>
                <TableCell align="left">{`${info2.totalMint || '-'} eth`}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Total fees</TableCell>
                <TableCell align="left">{`${info1.totalFee || '-'} eth`}</TableCell>
                <TableCell align="left">{`${info2.totalFee || '-'} eth`}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Biggest flip</TableCell>
                <TableCell align="left">{`${info1.biggestFlip || '-'} eth`}</TableCell>
                <TableCell align="left">{`${info2.biggestFlip || '-'} eth`}</TableCell>
              </TableRow>
              <TableRow

                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Worst trade</TableCell>
                <TableCell align="left">{`${info1.worstFlip || '-'} eth`}</TableCell>
                <TableCell align="left">{`${info2.worstFlip || '-'} eth`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </RootStyle>
  );
}
