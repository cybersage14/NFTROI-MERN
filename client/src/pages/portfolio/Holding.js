/* eslint-disable */
import React, { createElement } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
// material
import {
    Stack, Typography, Box, Card, CardHeader, CardMedia, CardContent, Icon as MuiIcon
} from '@mui/material';
import { Icon } from '@iconify/react';
// components
import Page from '../../components/Page';
import HoldingTable from './HoldingTable';
// ----------------------------------------------------------------------
import { getNFTs } from '../../lib/block';
import {
    FONT_SIZE_H3_DESKTOP,
    FONT_WEIGHT_NORMAL,
    COLOR_SUCCESS,
    COLOR_ERROR,
    COLOR_SECONDARY,
    COLOR_SECONDARY_DARK
} from '../../utils/constants';
import Carousel from '../../components/Carousel';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet);

// ----------------------------------------------------------------------

const SLIDE_SETTINGS = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 9000,
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 3 }
        },
        {
            breakpoint: 960,
            settings: { slidesToShow: 2 }
        },
        {
            breakpoint: 480,
            settings: { slidesToShow: 1, centerPadding: '0' }
        }
    ]
};

const ContentOfBiggestFlip = ({ stats }) => (
    <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
    >
        <MuiIcon>
            <Icon icon="logos:ethereum" />
        </MuiIcon>
        <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            fontWeight={FONT_WEIGHT_NORMAL}
            color={stats?.biggestFlip?.value >= 0 ? COLOR_SUCCESS : COLOR_ERROR}
        >
            {stats?.biggestFlip?.value >= 0 ? '+' : '-'}
            {stats?.biggestFlip?.value}
        </Typography>
    </Stack>
);

const ContentOfMostRare = ({ stats }) => (
    <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
    >
        <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            fontWeight={FONT_WEIGHT_NORMAL}
        >
            {`Rank #${stats?.topRank?.rank}`}
        </Typography>
    </Stack>
);

const ContentOfBiggestFlop = ({ stats }) => (
    <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
    >
        <MuiIcon>
            <Icon icon="logos:ethereum" />
        </MuiIcon>
        <Typography
            fontSize={FONT_SIZE_H3_DESKTOP}
            fontWeight={FONT_WEIGHT_NORMAL}
            color={stats?.biggestFlop?.value >= 0 ? COLOR_SUCCESS : COLOR_ERROR}
        >
            {stats?.biggestFlop?.value >= 0 ? '+' : '-'}
            {stats?.biggestFlop?.value}
        </Typography>
    </Stack>
);

const NftCard = ({ dataItem }) => (
    <Card sx={{ height: '99%', mx: 1, bgcolor: COLOR_SECONDARY }}>
        <CardHeader
            title={dataItem.header}
            titleTypographyProps={{
                fontSize: FONT_SIZE_H3_DESKTOP,
                textAlign: 'center'
            }}
        />

        <CardContent>
            <Box p={2}>
                <CardMedia
                    component="img"
                    src={dataItem.image ? 'assets/images/nft-rainbow.png' : '/static/empty.png'}
                    height={250}
                    alt=""
                />
            </Box>
            <Box
                height={2}
                width="100%"
                bgcolor={COLOR_SECONDARY_DARK}
                mt={2}
                mb={4}
            />
            {
                createElement(dataItem.content, { stats: dataItem.stats })
            }
        </CardContent>
    </Card>
);

export default function Holding() {
    // const wallet = '0xacd9fb1f332a4dca50a21e3aed6643add0239da2'
    const nfts = useSelector(state => state.manager.nfts);
    const stats = useSelector(state => state.manager.stats);

    return (
        <Box>
            <HoldingTable nfts={nfts} />
            {
                stats && (
                    <Box mt={8}>
                        <Carousel
                            slideSettings={SLIDE_SETTINGS}
                            carouselItemComponent={NftCard}
                            data={[
                                {
                                    header: 'Biggest Flip',
                                    image: stats?.biggestFlip?.image,
                                    content: ContentOfBiggestFlip,
                                    stats
                                },
                                {
                                    header: 'Most Rare',
                                    image: stats?.topRank?.image,
                                    content: ContentOfMostRare,
                                    stats
                                },
                                {
                                    header: 'Biggest Flop',
                                    image: stats?.biggestFlop?.image,
                                    content: ContentOfBiggestFlop,
                                    stats
                                }
                            ]}
                        />
                    </Box>
                )
            }
        </Box>
    );
}
