/* eslint-disable */
import React from 'react';
// material
import { styled } from '@mui/material/styles';
import {
  Container, Stack, Button, Typography, CircularProgress, TextField, TableRow, TableCell, TableBody, TableHead, Paper, Table
} from '@mui/material';
// components
import Page from '../../components/Page'
// ----------------------------------------------------------------------
import { shortAddress } from '../../lib/block';

const RootStyle = styled(Page)({
  height: '100%',
  paddingTop: '100px'
});

// ----------------------------------------------------------------------

export default function CompareWallet({ infos }) {

  return (
    <Paper sx={{  mx: 'auto' }}>
      <Table
        aria-labelledby="tableTitle"
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index}>
                  {
                    info.ens ?
                      <Stack direction='column' alignItems='center'>
                        <Typography variant='body2'>
                          {info.ens}
                        </Typography>
                        <Typography variant='body2'>
                          {shortAddress(info.wallet)}
                        </Typography>
                      </Stack>
                      :
                      <Typography variant='body2'>
                        {shortAddress(info.wallet)}
                      </Typography>
                  }
                </TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">nftroi score</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left"></TableCell>
              )
            }
          </TableRow>
          <TableRow
          >
            <TableCell align="left">Available balance</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left">{`${info.balance || '-'} ETH`}</TableCell>
              )
            }
          </TableRow>
          <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">P/L</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left">{`${info.PL || '-'} ETH`}</TableCell>
              )
            }
          </TableRow>
          <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">Total buy</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left">{`${info.totalBuy || '-'} ETH`}</TableCell>
              )
            }
          </TableRow>
          <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">Total sell</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left">{`${info.totalSell || '-'} ETH`}</TableCell>
              )
            }
          </TableRow>
          <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">Total mint</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left">{`${info.totalMint || '-'} ETH`}</TableCell>
              )
            }
          </TableRow>
          <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">Total fees</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left">{`${info.totalFee || '-'} ETH`}</TableCell>
              )
            }
          </TableRow>
          <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">Biggest flip</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left">{`${info.biggestFlip || '-'} ETH`}</TableCell>
              )
            }
          </TableRow>
          <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">Worst trade</TableCell>
            {
              infos?.map((info, index) =>
                <TableCell key={index} align="left">{`${info.worstFlip || '-'} ETH`}</TableCell>
              )
            }
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
