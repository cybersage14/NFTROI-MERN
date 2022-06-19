/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
// ----------------------------------------------------------------------
import TransactionTable from './TransactionTable';

const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3(mainnet)

// ----------------------------------------------------------------------

export default function Transaction() {
    // const wallet = '0xacd9fb1f332a4dca50a21e3aed6643add0239da2'
    const transactions = useSelector(state => state.manager.transactions)

    return (
        <TransactionTable transactions={transactions || []} />
    );
}
