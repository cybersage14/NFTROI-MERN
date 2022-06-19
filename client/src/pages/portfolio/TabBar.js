import React, { useState} from "react";
import { Tabs, Tab, Paper, IconButton, Dialog, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { PostAdd, Close } from "@mui/icons-material";

import { shortAddress } from '../../lib/block'


export default function TabBar({ wallets, handleWallets }) {
    // Handle Tab Button Click
    // Handle Add Tab Button
    // const [wallets, setAddWallet] = React.useState([]);
    const [wallet, setWallet] = useState('')



    const handleTabChange = (event, newTabId) => {
        if (newTabId === "tabProperties") {
            openModal()
        }
    };


    const handleAddTab = (address) => {
        // setAddWallet([
        //     ...wallets,
        //     address
        // ]);
        handleWallets([
            ...wallets,
            address
        ])
    };

    const handleClose = (e, tabId) => {
        // setAddWallet(wallets.filter(tab => tab !== tabId))
        handleWallets(wallets.filter(tab => tab !== tabId))
    }

    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const addWallet = () => {
        if (wallet.trim()) {
            handleAddTab(wallet)
        }
        closeModal()
    }

    return (
        <>
         <Paper sx={{width:'100%', paddingLeft:'10px'}}>
            {/* <AppBar position="static" color="inherit"> */}
                <Tabs
                    value={0}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Wallets:" />
                    {wallets.map(child =>
                        <Tab
                            key={child}
                            value={child}
                            label={
                                <span>
                                    {shortAddress(child)}
                                    <IconButton
                                        component="div"
                                        onClick={event => handleClose(event, child)}
                                    >
                                        <Close />
                                    </IconButton>
                                </span>
                            }
                        />
                    )}
                    <Tab icon={<PostAdd />} value="tabProperties" />
                </Tabs>
            {/* </AppBar> */}
            <Dialog open={open} onClose={closeModal}>
                <DialogContent sx={{ width: '450px' }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Wallet address"
                        fullWidth
                        variant="standard"
                        onChange={e => setWallet(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={addWallet}>Add</Button>
                </DialogActions>
            </Dialog>
         </Paper>
        </>
    );
}
