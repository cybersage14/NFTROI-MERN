/* eslint-disable */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

import { Stack, Typography, CircularProgress, Box, Grid, Icon as MuiIcon } from '@mui/material';
import { Icon } from '@iconify/react';
import { getOpenPL } from '../../lib/block';
import {
    COLOR_ERROR,
    COLOR_SECONDARY_BRIGHT,
    COLOR_SUCCESS,
    FONT_SIZE_BODY1_DESKTOP,
    FONT_SIZE_H2_DESKTOP,
} from '../../utils/constants';

export default function PLGraph() {
    const [loading, setLoading] = useState(false);
    const transactions = useSelector(state => state.manager.transactions);
    const [series, setSeries] = useState([
        {
            name: 'Closed P/L',
            data: [{ x: new Date(), y: 0 }]
        },
        {
            name: 'Open P/L',
            data: [{ x: new Date(), y: 0 }]
        }
    ]);
    const [options, setOptions] = useState({
        chart: {
            type: 'area',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            },
            background: '#0a0a0a73'
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        // title: {
        //     text: 'Closed P/L',
        //     align: 'left'
        // },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return `${val.toFixed(3)} ETH`;
                },
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                formatter: function (val, timestamp, opts) {
                    return opts.dateFormatter(new Date(timestamp), "dd MMM yyyy");
                }
            }
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return `${val} ETH`;
                }
            }
        },
        stroke: {
            curve: 'smooth',
        },
        grid: {
            show: true,
            // borderColor: '#90A4AE',
            strokeDashArray: 5,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
        },
        theme: {
            mode: 'dark',
            palette: 'palette1',
            monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        }
    });

    useEffect(() => {
        getPLData(transactions);
    }, [transactions]);

    const getPLData = async (transactions) => {
        setLoading(true);
        let closedPL = [];
        let openPL = [];
        let today = new Date();
        today.setDate(today.getDate() + 1);
        today.setUTCHours(0);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        let start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        if (transactions?.length > 0) {
            //////////////////////////    Closed PL
            // let sellTrans = transactions?.filter(item => item.pl !== 0)
            // if (sellTrans.length > 0) {
            if (transactions[transactions.length - 1].timeStamp > start.getTime()) {
                start = new Date(transactions[transactions.length - 1].timeStamp);
                start.setUTCHours(23);
                start.setUTCMinutes(59);
                start.setUTCSeconds(59);
            }
            while (start.getTime() < today.getTime()) {
                closedPL.push({ x: new Date(start.getTime()), y: Number(transactions.filter(item => item.timeStamp <= start.getTime()).reduce((prev, cur) => prev + cur.pl, 0).toFixed(3)) });
                start.setDate(start.getDate() + 1);
            }
            console.log('closed pl', closedPL);
            setSeries([{
                name: 'Closed P/L',
                data: closedPL
            }]);
            // }
            ///////////////////     Open PL
            start = new Date();
            start.setFullYear(start.getFullYear() - 1);
            if (transactions[transactions.length - 1].timeStamp > start.getTime()) {
                start = new Date(transactions[transactions.length - 1].timeStamp);
                start.setUTCHours(23);
                start.setUTCMinutes(59);
                start.setUTCSeconds(59);
            }
            while (start.getTime() < today.getTime()) {
                let pl = await getOpenPL(transactions.filter(tx => tx.timeStamp <= start.getTime()), start);
                openPL.push({ x: new Date(start.getTime()), y: Number(pl.toFixed(3)) });
                console.log({ x: new Date(start.getTime()), y: Number(pl.toFixed(3)) });
                start.setDate(start.getDate() + 1);
            }
            console.log('open pl', openPL);
            setSeries([
                {
                    name: 'Closed P/L',
                    data: closedPL
                },
                {
                    name: 'Open P/L',
                    data: openPL
                }
            ]);
        }
        setLoading(false);
    };

    return (
        <Stack direction='column' spacing={2} sx={{ my: 5 }}>
            <Stack direction='row' spacing={2}>
                <Box>
                    <Typography
                        fontSize={FONT_SIZE_H2_DESKTOP}
                    >PNL Overview</Typography>
                    <Typography
                        fontSize={FONT_SIZE_BODY1_DESKTOP}
                        color={COLOR_SECONDARY_BRIGHT}
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                </Box>

                {
                    loading &&
                    <Stack direction='row' justifyContent='center' alignItems='center'>
                        <CircularProgress />
                        <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>Loading now, please wait... </Typography>
                    </Stack>
                }
            </Stack>

            {
                !loading && (
                    <>
                        <Box>
                            <Grid container columns={5} alignItems="center">
                                <Grid item xs={5} md={4}>
                                    <Grid container columns={8} spacing={1}>
                                        <Grid item xs={8} md={1}>
                                            <Stack
                                                bgcolor="rgba(35, 34, 56, 0.55)"
                                                p={1.5}
                                                borderRadius={1}
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography
                                                    fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                    textAlign="center"
                                                    color={COLOR_SUCCESS}
                                                >Open PNL</Typography>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={8} md={1}>
                                            <Stack
                                                bgcolor="rgba(35, 34, 56, 0.55)"
                                                p={1.5}
                                                borderRadius={1}
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                                spacing={1}
                                            >
                                                <Typography
                                                    component="span"
                                                    fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                    textAlign="center"
                                                    color={COLOR_SUCCESS}
                                                >+1.2789</Typography>
                                                <MuiIcon
                                                    sx={{
                                                        fontSize: FONT_SIZE_BODY1_DESKTOP,
                                                        color: COLOR_SUCCESS
                                                    }}
                                                >
                                                    <Icon icon="bi:caret-up-fill" />
                                                </MuiIcon>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={8} md={1}>
                                            <Stack
                                                bgcolor="rgba(35, 34, 56, 0.55)"
                                                py={1.5}
                                                borderRadius={1}
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Typography
                                                    fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                    textAlign="center"
                                                    color={COLOR_SECONDARY_BRIGHT}
                                                >Closed PNL</Typography>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={8} md={1}>
                                            <Stack
                                                bgcolor="rgba(35, 34, 56, 0.55)"
                                                p={1.5}
                                                borderRadius={1}
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                                spacing={1}
                                            >
                                                <Typography
                                                    component="span"
                                                    fontSize={FONT_SIZE_BODY1_DESKTOP}
                                                    textAlign="center"
                                                    color={COLOR_ERROR}
                                                >-1.2789</Typography>
                                                <MuiIcon
                                                    sx={{
                                                        fontSize: FONT_SIZE_BODY1_DESKTOP,
                                                        color: COLOR_ERROR
                                                    }}
                                                >
                                                    <Icon icon="bi:caret-down-fill" />
                                                </MuiIcon>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5} md={1}>
                                    <Stack
                                        bgcolor="rgba(35, 34, 56, 0.55)"
                                        p={1.5}
                                        borderRadius={1}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            fontSize={FONT_SIZE_BODY1_DESKTOP}
                                        >Thursday, 27 April 2022</Typography>
                                        <MuiIcon sx={{ fontSize: FONT_SIZE_BODY1_DESKTOP }}>
                                            <Icon icon="ant-design:check-circle-outlined" />
                                        </MuiIcon>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                        <ReactApexChart options={options} series={series} type="area" height={350} />
                    </>
                )
            }


        </Stack>
    );
}