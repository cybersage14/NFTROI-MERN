/* eslint-disable */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Web3 from 'web3';
import { NotificationManager } from 'react-notifications';
import { useMoralis } from 'react-moralis'
// material
import { styled } from '@mui/material/styles';
import {
    Container, Stack, Box, Typography, CircularProgress, Button
} from '@mui/material';
// components
import Page from '../../components/Page'
import ActivityTable from './ActivityTable';
// ----------------------------------------------------------------------
import { setStats, setNFTs, setTransactions } from '../../actions/manager';
import { getAddressType, getAssetInfo, getRarityRankData, shortAddress, getActivities } from '../../lib/block';
import Collection from './Collection';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet)

const RootStyle = styled(Page)({
    height: '100%',
    paddingTop: '100px'
});

const RarityItem = ({ rarity, tokenId, sold }) => {
    return (
        <Stack direction='column' alignItems='center' sx={{ border: '1px solid white', padding: '10px' }}>
            <Typography variant='h6'>{`Rarity: #${rarity}`}</Typography>
            {
                tokenId &&
                <Typography variant='h6'>{`ID: #${tokenId}`}</Typography>
            }
            {
                sold &&
                <Typography variant='h6'>{`Sold: ${sold} eth`}</Typography>
            }
        </Stack>
    )
}
// ----------------------------------------------------------------------

export default function SingleAsset() {
    // const {
    //     Moralis,
    //     user,
    //     logout,
    //     authenticate,
    //     enableWeb3,
    //     isInitialized,
    //     isAuthenticated,
    //     isWeb3Enabled,
    // } = useMoralis();
    // const web3Account = useMemo(
    //     () => isAuthenticated && user.get("accounts")[0],
    //     [user, isAuthenticated],
    // );
    const { address, tokenId } = useParams();
    const [assetData, setAssetData] = useState({})
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     if (isInitialized) {
    //         Moralis.initPlugins();
    //         // getOrder(address, tokenId)
    //     }
    //     // eslint-disable-next-line
    // }, []);

    // useEffect(() => {
    //     if (isAuthenticated && !isWeb3Enabled) {
    //         enableWeb3();
    //     }
    //     // eslint-disable-next-line
    // }, [isAuthenticated]);

    useEffect(() => {
        // getOrder(address, tokenId)
        getAssetData(address, tokenId)
    }, [address, tokenId])

    const getAssetData = async (contract, tokenId) => {
        console.log(contract, tokenId)
        if (await getAddressType(contract) === 'contract') {
            setLoading(true)
            let assetInfo = await getAssetInfo(contract, tokenId)
            if (assetInfo === null) {
                NotificationManager.error('Invalid token id')
                return
            }
            console.log('assetInfo', assetInfo)
            setAssetData(assetInfo)

            let rarityData = await getRarityRankData(contract, tokenId)
            console.log('rarityData', rarityData)
            setAssetData({ ...assetInfo, ...rarityData })

            let activities = await getActivities(address, tokenId)
            console.log('activities', activities)
            setAssetData({ ...assetInfo, ...rarityData, activities })

            setLoading(false)
        } else {
            NotificationManager.error('Invalid contract address')
        }
    }

    // const getOrder = async (contract, tokenId) => {
    //     try {
    //         const res = await Moralis.Plugins.opensea.getOrders({
    //             network: "mainnet",
    //             tokenAddress: contract,
    //             tokenId: tokenId,
    //             orderSide: 0, // 0 is for buy orders, 1 is for sell orders
    //             page: 1, // pagination shows 20 orders each page
    //         });
    //         console.log('buyOrder', res);
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // };

    return (
        <RootStyle title="nftroi" id="move_top">
            <Stack direction='column' spacing={2} sx={{ marginLeft: '10%', marginRight: '10%' }}>
                {/* <Box>
                    {isAuthenticated ? (
                        <Stack justifyContent="center" alignItems="center">
                            <div>{web3Account}</div>
                            <Button
                                sx={{ ml: 3 }}
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                        </Stack>
                    ) : (
                        <Button onClick={() => authenticate()}>
                            Connect to Metamask
                        </Button>
                    )}
                </Box>
                <Button onClick={() => getOrder(address, tokenId)}>Get order</Button> */}
                {
                    loading &&
                    <Stack direction='row' justifyContent='center' alignItems='center'>
                        <CircularProgress />
                        <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Analysing now, please wait... </Typography>
                    </Stack>
                }
                <Stack direction='row' spacing={3} sx={{ width: '100%' }}>
                    <Stack sx={{ width: '50%' }}>
                        <Box component='img' src={assetData.image} />
                    </Stack>
                    <Stack direction='column'>
                        <Typography variant='h2'>{assetData.name}</Typography>
                        <Typography variant='h3'>{`ID: #${assetData.tokenId}`}</Typography>
                        <Typography variant='h6'>{`Owner: ${shortAddress(assetData.owner)}`}</Typography>
                        <Typography variant='h6'>{`Rarity: #${assetData.rarity}`}</Typography>
                        <Typography variant='h6'>{`Last Sale: ${assetData.lastSale} eth`}</Typography>
                    </Stack>
                </Stack>
                <Stack direction='row' spacing={1}>
                    <Stack direction='row' spacing={1} justifyContent='space-around' sx={{ width: '50%' }}>
                        <RarityItem rarity={assetData.rarity - 1} tokenId={assetData.prevTokenId} sold={assetData.prevSold} />
                        <RarityItem rarity={assetData.rarity} tokenId={assetData.tokenId} />
                        <RarityItem rarity={assetData.rarity + 1} tokenId={assetData.nextTokenId} sold={assetData.nextSold} />
                    </Stack>
                </Stack>
                <ActivityTable transactions={assetData.activities || []} />
            </Stack>
        </RootStyle>
    );
}
