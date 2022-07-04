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
import {
    ALL,
    COLOR_INFO_BRIGHT,
    COLOR_SECONDARY,
    COLOR_SECONDARY_BRIGHT,
    COLOR_WHITE,
    FONT_SIZE_BODY1_DESKTOP,
    FONT_SIZE_H1_DESKTOP,
    FONT_SIZE_H3_DESKTOP,
    FONT_WEIGHT_BOLD,
    FONT_WEIGHT_NORMAL,
    VERIFIED
} from '../../utils/constants';
import ButtonFilter from '../../components/ButtonFilters';

const RootStyle = styled(Page)({
    height: '100%',
    paddingTop: '100px'
});

const FILTER_DATA_OF_TYPE = [
    {
        label: 'All',
        value: ALL
    },
    {
        label: 'Verified',
        value: VERIFIED
    }
];

const FILTER_DATA_OF_DURATION = [
    {
        label: '24H',
        value: 1
    },
    {
        label: '7D',
        value: 7
    },
    {
        label: '30D',
        value: 30
    },
    {
        label: 'All Time',
        value: 0
    }
];

export default function CollectionOverview() {
    const [collections, setCollections] = useState([]);
    const [filteredCollections, setFilteredCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState(1);
    const [verified, setVerified] = useState(VERIFIED);

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

                <Stack spacing={3} mt={6}>
                    {/* Filters */}
                    <Stack direction="row" justifyContent="space-between">
                        <ButtonFilter
                            data={FILTER_DATA_OF_TYPE}
                            value={verified}
                            setValue={setVerified}
                        />
                        <ButtonFilter
                            data={FILTER_DATA_OF_DURATION}
                            value={duration}
                            setValue={setDuration}
                        />
                    </Stack>

                    {/* Table Head */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        py={2}
                        px={2}
                        borderBottom={`1px solid ${COLOR_SECONDARY}`}
                        borderTop={`1px solid ${COLOR_SECONDARY}`}
                    >
                        <Box width="25%">
                            <Typography
                                fontWeight={FONT_WEIGHT_NORMAL}
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                            >Collections</Typography>
                        </Box>
                        <Box width="15%">
                            <Typography
                                fontWeight={FONT_WEIGHT_NORMAL}
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                            >Floor</Typography>
                        </Box>
                        <Box width="15%">
                            <Typography
                                fontWeight={FONT_WEIGHT_NORMAL}
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                            >24h Vol</Typography>
                        </Box>
                        <Box width="15%">
                            <Typography
                                fontWeight={FONT_WEIGHT_NORMAL}
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                            >Total Vol</Typography>
                        </Box>
                        <Box width="15%">
                            <Typography
                                fontWeight={FONT_WEIGHT_NORMAL}
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                            >Owner</Typography>
                        </Box>
                        <Box width="15%">
                            <Typography
                                fontWeight={FONT_WEIGHT_NORMAL}
                                fontSize={FONT_SIZE_BODY1_DESKTOP}
                            >Items</Typography>
                        </Box>
                    </Stack>

                    {/* Table body */}
                    {
                        filteredCollections.map((row, index) => (
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                p={2}
                                bgcolor={COLOR_SECONDARY}
                                borderRadius={1}
                                key={index}
                            >
                                {/* Collections */}
                                <Stack width="25%" direction="row" alignItems="center" spacing={1}>
                                    <Avatar
                                        src={row.image}
                                        sx={{
                                            border: `2px solid ${row.estimatePL >= 0 ? '#5CDD90' : '#DD5C5C'}`,
                                            width: 60,
                                            height: 60
                                        }}
                                    />
                                    <Typography
                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                        color={COLOR_SECONDARY_BRIGHT}
                                    >
                                        {row.name}
                                    </Typography>
                                    {
                                        row.verified && (
                                            <MuiIcon
                                                sx={{
                                                    fontSize: FONT_SIZE_BODY1_DESKTOP,
                                                    color: COLOR_INFO_BRIGHT
                                                }}
                                            >
                                                <Icon icon="bxs:badge-check" />
                                            </MuiIcon>
                                        )

                                    }
                                </Stack>

                                {/* Floor */}
                                <Stack width="15%" spacing={1}>
                                    <Stack direction="row" alignItems="center">
                                        <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                                            <Icon icon="logos:ethereum" />
                                        </MuiIcon>
                                        <Typography
                                            fontSize={FONT_SIZE_BODY1_DESKTOP}
                                            color={COLOR_SECONDARY_BRIGHT}
                                        >
                                            {row.floorPrice}
                                        </Typography>
                                    </Stack>
                                    {/* <Typography
                                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                                        color={COLOR_SECONDARY_BRIGHT}
                                    >
                                        {row.floorPrice}
                                    </Typography> */}
                                </Stack>
                                <Stack width="15%"></Stack>
                                <Stack width="15%"></Stack>
                                <Stack width="15%"></Stack>
                                <Stack width="15%"></Stack>
                            </Stack>
                        ))
                    }
                </Stack>
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
