/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';
import { NotificationManager } from 'react-notifications';
// material
import { styled } from '@mui/material/styles';
import {
    Container, Stack, Button, Grid, Typography, CircularProgress, TextField, FormGroup, FormControlLabel, Checkbox
    , TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper
} from '@mui/material';
// components
import Page from '../components/Page'

import { setAuthenticated } from '../actions/manager';

const RootStyle = styled(Page)({
    height: '100%',
    paddingTop: '100px'
});

// ----------------------------------------------------------------------

export default function Portfolio() {
    const [code, setCode] = useState('')

    const keyPress = async (e) => {
        if (e.keyCode === 13) {
            if (code === process.env.REACT_APP_CODE) {
                window.localStorage.setItem('auth', true)
                NotificationManager.success('Code is correct, Please select menu')
            } else {
                window.localStorage.setItem('auth', false)
                NotificationManager.error('Code is incorrect')
            }
        }
    }

    const onChangeCode = (e) => {
        setCode(e.target.value)
    }

    return (
        <RootStyle title="nftroi" id="move_top">
            <Container>
                <Stack direction='column' alignItems='center' spacing={5}>
                    <Typography variant='h1' textAlign='center'>Coming Soon</Typography>
                    <TextField variant='outlined' label='input code'
                        onKeyDown={keyPress}
                        onChange={onChangeCode}
                    />
                </Stack>
            </Container>
        </RootStyle>
    );
}
