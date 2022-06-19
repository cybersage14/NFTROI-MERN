/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Web3 from 'web3';
import { NotificationManager } from 'react-notifications';
import InfiniteScroll from 'react-infinite-scroll-component';

// material
import { styled } from '@mui/material/styles';
import {
    Container, Box, Stack, CircularProgress, Typography, Avatar, IconButton, SvgIcon, Grid, CardContent, CardActions
} from '@mui/material'
// components
import Page from '../../components/Page'
import { DiscordPath, InstagramPath, TwitterPath } from '../SvgIcon'
import { StyledCard } from "../StyledComponent"
// ----------------------------------------------------------------------
import { getCollectionData, getProfitSalesBiggestFlip, getMostItemsHighestValue, getTokenIds, getNFT, getAddressType, shortAddress, getRarityRank } from '../../lib/block';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet)

const COUNT_PER_PAGE = 3

const RootStyle = styled(Page)({
    height: '100%',
    paddingTop: '100px'
});

const Card = ({ title, content, eth = false }) => {
    return (
        <Stack direction='column' alignItems='center' sx={{ border: '1px solid white' }}>
            {
                eth ?
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Box component='img' src='https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg' width='12px' />
                        <Typography variant='h4' color='main'>{content}</Typography>
                    </Stack>
                    :
                    <Typography variant='h4' color='main'>{content}</Typography>
            }
            <Typography variant='body1'>{title}</Typography>
        </Stack>
    )
}

const NftItem = ({ nft }) => {
    return (
        <Grid item xs={12} sm={6} md={4} sx={{ my: "10px" }}>
            <Container sx={{ maxWidth: "360px", minWidth: "300px" }}>
                <StyledCard>
                    <CardContent sx={{ py: "4px" }}>
                        <Stack justifyContent="center" alignItems="center" sx={{ backgroundColor: "rgb(43 43 43)" }}>
                            {/* <a href={nft.metadataUri} target='_blank'> */}
                            <img src={nft.image || '/static/empty.png'} title={nft.name} alt="nft" style={{ display: "block", maxWidth: "360px", maxHeight: "360px", width: "auto", height: "auto" }} />
                            {/* </a> */}
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" sx={{ mt: '10px' }}>
                            <Typography gutterBottom variant="body1" color="rgb(221, 221, 221)">
                                {`${nft.name}`}
                            </Typography>
                            <Typography gutterBottom variant="body1" color="rgb(221, 221, 221)">
                                {`Rank: #${nft.rank}`}
                            </Typography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between'>
                            <Typography variant="caption" color="rgb(221, 221, 221)">
                                {`Last buy: ${nft.lastBuy} ETH`}
                            </Typography>
                            <Typography variant="caption" color="rgb(221, 221, 221)">
                                {`${nft.buyDate}`}
                            </Typography>
                        </Stack>
                    </CardContent>
                </StyledCard>
            </Container>
        </Grid >
    )
}

// ----------------------------------------------------------------------

export default function Collection() {
    const { address } = useParams();
    const [collection, setCollection] = useState({})
    const [hasMore, setHasMore] = useState(true);
    const [tokenIds, setTokenIds] = useState([])
    const [nfts, setNFTs] = useState([])
    const [rank, setRank] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCollection(address)
    }, [address])

    useEffect(() => {
        if (tokenIds.length > 0) {
            getMoreData()
        }
    }, [tokenIds])

    const getCollection = async (address) => {
        let type = await getAddressType(address)
        if (type === 'contract') {
            setLoading(true)
            let data = await getCollectionData(address)
            console.log('collection', data)
            setCollection(data)

            let rarityRank = await getRarityRank(address)
            setRank(rarityRank)

            let tokenIdss = await getTokenIds(address)
            setTokenIds(tokenIdss)

            let profitData = await getProfitSalesBiggestFlip(address)
            console.log('profitable', profitData)
            setCollection({ ...data, ...profitData })

            let mostData = await getMostItemsHighestValue(address)
            console.log('mostData', mostData)
            setCollection({ ...data, ...profitData, ...mostData })
            setLoading(false)
        } else {
            NotificationManager.error('Please input valid address')
        }
    }

    const getMoreData = async () => {
        console.log('loading')
        if (nfts.length >= tokenIds.length) {
            setHasMore(false)
            return
        }
        let start = nfts.length
        let newNFTs = []
        for (let i = 0; i < COUNT_PER_PAGE; i++) {
            let nft = await getNFT(address, tokenIds[start + i].tokenId, tokenIds[start + i].mintBlock)
            nft.rank = rank.indexOf(tokenIds[start + i].tokenId) + 1
            newNFTs.push(nft)
        }
        console.log('nfts', newNFTs)
        setNFTs([...nfts, ...newNFTs])
    }

    return (
        <RootStyle title="nftroi" id="move_top">
            {
                loading &&
                <Stack direction='row' justifyContent='center' alignItems='center'>
                    <CircularProgress />
                    <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Analysing now, please wait... </Typography>
                </Stack>
            }
            <Box sx={{ marginLeft: '10%', marginRight: '10%', border: '1px solid green', backgroundColor: 'grey', padding: '10px' }}>
                <Box className='banner' component='div'>
                    <Box component='img' src={collection.bannerImage} />
                </Box>
                <Stack direction='row' justifyContent='flex-end'>
                    {
                        collection.discordUrl &&
                        <a href={collection.discordUrl} target='_blank'>
                            <IconButton color='primary'>
                                <SvgIcon>{DiscordPath}</SvgIcon>
                            </IconButton>
                        </a>
                    }
                    {
                        collection.instagramUrl &&
                        <a href={collection.instagramUrl} target='_blank'>
                            <IconButton color='primary'>
                                <SvgIcon>{InstagramPath}</SvgIcon>
                            </IconButton>
                        </a>
                    }
                    {
                        collection.twitterUrl &&
                        <a href={collection.twitterUrl} target='_blank'>
                            <IconButton color='primary'>
                                <SvgIcon>{TwitterPath}</SvgIcon>
                            </IconButton>
                        </a>
                    }
                </Stack>
                {
                    collection.avatarImage &&
                    <Stack direction='column' alignItems='center' justifyContent='center' sx={{ marginTop: '-96px' }}>
                        <Avatar src={collection.avatarImage} sx={{ width: 96, height: 96, border: '4px solid grey' }} />
                        <Typography variant='h3'>{collection.name}</Typography>
                        <Typography>{shortAddress(address)}</Typography>
                    </Stack>
                }
                {
                    collection.items &&

                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Card title='Royalties' content={`${collection.royalty}%`} />
                        </Grid>
                        <Grid item xs={2}>
                            <Card title='Items' content={collection.items} />
                        </Grid>
                        <Grid item xs={2}>
                            <Card title='Owners' content={collection.owners} />
                        </Grid>
                        <Grid item xs={2}>
                            <Card title='Volume' content={collection.volume} eth={true} />
                        </Grid>
                        <Grid item xs={2}>
                            <Card title='Floor' content={collection.floor} eth={true} />
                        </Grid>
                        <Grid item xs={6}>
                            <Card title='Profitable sales' content={`${collection.profitableSales} %`} />
                        </Grid>
                        <Grid item xs={6}>
                            <Card title='Biggest flip' content={collection.biggestFlip} eth={true} />
                        </Grid>
                        <Grid item xs={6}>
                            <Card title='Most items' content={`${collection.mostItems} Items (${collection.mostWallet})`} />
                        </Grid>
                        <Grid item xs={6}>
                            <Card title='Highest valued collection' content={`${collection.highestValue} (${collection.highestWallet})`} eth={true} />
                        </Grid>
                    </Grid>
                }
            </Box>
            <InfiniteScroll
                dataLength={nfts.length}
                next={getMoreData}
                hasMore={hasMore}
                loader={<Typography varient='h6' color='white' textAlign='center'>Loading...</Typography>}
            >
                <Grid container  >
                    {/* {console.log("nftviewer",nfts)} */}
                    {nfts.map(nft => <NftItem key={nft.name} nft={nft} />)}
                </Grid>
            </InfiniteScroll >

        </RootStyle>
    );
}
