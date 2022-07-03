/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
// material
import { styled } from '@mui/material/styles';
import {
    Container, Stack, Box, Typography, CircularProgress, Button, FormControl, Select, MenuItem, InputBase, Paper, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// components
import Page from '../../components/Page';
import CollectionTable from './CollectionTable';
// ----------------------------------------------------------------------
import { getCollections } from '../../lib/block';
import { COLOR_SECONDARY_BRIGHT, FONT_SIZE_BODY1_DESKTOP, FONT_SIZE_H1_DESKTOP, FONT_WEIGHT_BOLD, FONT_WEIGHT_NORMAL } from '../../utils/constants';

const RootStyle = styled(Page)({
    height: '100%',
    paddingTop: '100px'
});

export default function CollectionOverview() {
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState(1);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);

        let collectionsData = await getCollections();
        console.log('collections', collectionsData);
        setCollections(collectionsData.map(collection => ({ ...collection, volume: collection.oneDayVolume })));
        setFilteredCollections(collectionsData.map(collection => ({ ...collection, volume: collection.oneDayVolume })));

        setLoading(false);
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
        if (event.target.value === 1) {
            setFilteredCollections(collections.map(collection => ({ ...collection, volume: collection.oneDayVolume })));
        } else if (event.target.value === 7) {
            setFilteredCollections(collections.map(collection => ({ ...collection, volume: collection.sevenDayVolume })));
        } else if (event.target.value === 30) {
            setFilteredCollections(collections.map(collection => ({ ...collection, volume: collection.thirtyDayVolume })));
        }
    };

    const handleSearchChange = (e) => {
        if (e.target.value.trim()) {
            setFilteredCollections(collections.filter(collection => collection.name.toLowerCase().includes(e.target.value.trim().toLowerCase())));
        } else {
            setFilteredCollections(collections);
        }
    };

    return (
        <RootStyle title="nftroi" id="move_top">
            <Container maxWidth="xl">
                <Typography fontSize={FONT_SIZE_H1_DESKTOP} fontWeight={FONT_WEIGHT_NORMAL}>
                    Collections
                </Typography>
                <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT} mt={2}>
                    The Top NFT Collections
                </Typography>
            </Container>

            <Container>
                {
                    loading &&
                    <Stack direction='row' justifyContent='center' alignItems='center'>
                        <CircularProgress />
                        <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Analysing now, please wait... </Typography>
                    </Stack>
                }
                <Stack direction='row' justifyContent='space-between'>
                    <Paper
                        sx={{ display: 'flex', alignItems: 'center', width: 400, height: 50 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search collections"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={handleSearchChange}
                        />
                        <IconButton aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            value={duration}
                            onChange={handleDurationChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value={1}>24H</MenuItem>
                            <MenuItem value={7}>7D</MenuItem>
                            <MenuItem value={30}>30D</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <CollectionTable collections={filteredCollections} />

            </Container>
        </RootStyle>
    );
}
