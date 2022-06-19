/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import Slider from "react-slick";
// material
import {
    Stack, Typography, Box, Grid
} from '@mui/material';
// components
import Page from '../../components/Page'
import HoldingTable from './HoldingTable';
// ----------------------------------------------------------------------
import { getNFTs } from '../../lib/block';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet)

// ----------------------------------------------------------------------
const NftItem = ({ header, image, content }) => {
    return (
        <Grid item xs={12} md={4}>
            <Stack direction='column' alignItems='center' sx={{ maxWidth: "360px", minWidth: "300px" }}>
                <Stack justifyContent="center" alignItems="center" sx={{ backgroundColor: "rgb(43 43 43)" }}>
                    <Typography variant='h5'>{header}</Typography>
                    <img src={image || '/static/empty.png'} alt="nft" style={{ display: "block", maxWidth: "360px", maxHeight: "360px", width: "auto", height: "auto" }} />
                    {/* </a> */}
                </Stack>
                {content}
            </Stack>
        </Grid>
    )
}

export default function Holding() {
    // const wallet = '0xacd9fb1f332a4dca50a21e3aed6643add0239da2'
    const nfts = useSelector(state => state.manager.nfts)
    const stats = useSelector(state => state.manager.stats)

    return (
        <>
            <HoldingTable nfts={nfts} />
            {
                stats &&

                <Grid container spacing={3}>
                    <NftItem header='Biggest Flip' image={stats?.biggestFlip?.image}
                        content={
                            <Stack direction='row' spacing={1} alignItems='center'>
                                <Box component='img' src='/static/icons/eth.svg' width='20px' height='32px' />
                                <Typography variant='h5' color={stats?.biggestFlip?.value >= 0 ? 'success.main' : 'error.main'}>
                                    {
                                        stats?.biggestFlip?.value >= 0 ? '+' : '-'
                                    }
                                    {stats?.biggestFlip?.value}
                                </Typography>
                            </Stack>
                        }
                    />
                    <NftItem header='Most Rare' image={stats?.topRank?.image}
                        content={
                            <Stack direction='row' spacing={1} alignItems='center'>
                                <Box component='img' src='/static/icons/eth.svg' width='20px' height='32px' />
                                <Typography variant='h5' sx={{ color: 'white' }}>
                                    {`Rank #${stats?.topRank?.rank}`}
                                </Typography>
                            </Stack>
                        }
                    />
                    <NftItem header='Biggest Flop' image={stats?.biggestFlop?.image}
                        content={
                            <Stack direction='row' spacing={1} alignItems='center'>
                                <Box component='img' src='/static/icons/eth.svg' width='20px' height='32px' />
                                <Typography variant='h5' color={stats.biggestFlop?.value >= 0 ? 'success.main' : 'error.main'}>
                                    {
                                        stats?.biggestFlop?.value >= 0 ? '+' : '-'
                                    }
                                    {stats?.biggestFlop?.value}
                                </Typography>
                            </Stack>
                        }
                    />
                </Grid>
            }
        </>
    );
}
