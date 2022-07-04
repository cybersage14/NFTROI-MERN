import React, { useState } from 'react';
import {
  Box,
  Card,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon as MuiIcon,
  ListItemButton,
  InputAdornment
} from "@mui/material";
import { Icon } from '@iconify/react';
import {
  PrimaryButton,
  PrimaryTextField,
  SecondaryButton,
  SecondaryList,
  SecondaryListItemButton
} from './customComponents';
import {
  COLOR_SECONDARY,
  FONT_SIZE_BODY1_DESKTOP,
  FONT_SIZE_H3_DESKTOP,
  COLOR_SECONDARY_BRIGHT,
  FONT_SIZE_BODY2_DESKTOP
} from '../utils/constants';
import { shortAddress } from '../lib/block';

export default function SideTab({
  tabs,
  currentTab,
  setCurrentTab,
  wallets,
  handleClose,
  setSelectedWallet,
  addWallet,
  setWallet
}) {
  const [visibleAddForm, setVisibleAddForm] = useState(false);

  const openAddForm = () => {
    setVisibleAddForm(true);
  };

  const closeAddForm = () => {
    setVisibleAddForm(false);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      addWallet();
    }
  };

  return (
    <Card sx={{ borderRadius: 1 }}>
      <SecondaryList sx={{ pb: 0 }}>
        {/* Tabs */}
        {
          tabs.map(tabItem => (
            <ListItem key={tabItem.name}>
              <SecondaryListItemButton
                component={
                  currentTab === tabItem.value ? PrimaryButton : SecondaryButton
                }
                sx={{
                  borderRadius: 1,
                  fontSize: FONT_SIZE_BODY1_DESKTOP,
                  py: 1.5,
                }}
                onClick={() => setCurrentTab(tabItem.value)}
              >
                <ListItemIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                  <Icon icon={tabItem.icon} />
                </ListItemIcon>
                <ListItemText>{tabItem.name}</ListItemText>
              </SecondaryListItemButton>
            </ListItem>
          ))
        }

        {/* Wallet addresses */}
        {
          wallets.map(child => (
            <ListItem
              key={child}
              sx={{
                bgcolor: COLOR_SECONDARY,
                pt: 2,
              }}
              secondaryAction={
                <IconButton
                  onClick={event => handleClose(event, child)}
                >
                  <MuiIcon
                    sx={{
                      fontSize: FONT_SIZE_BODY1_DESKTOP,
                      color: COLOR_SECONDARY_BRIGHT
                    }}
                  >
                    <Icon icon="charm:circle-cross" />
                  </MuiIcon>
                </IconButton>
              }
              onClick={() => setSelectedWallet(child)}
            >
              <ListItemIcon>
                <Box
                  component="img"
                  src="assets/images/wallet.png"
                  alt=""
                  sx={{ borderRadius: '50%' }}
                  width={30}
                />
              </ListItemIcon>
              <ListItemText
                fontSize={FONT_SIZE_BODY2_DESKTOP}
                color={COLOR_SECONDARY}
              >
                {shortAddress(child)}
              </ListItemText>
            </ListItem>
          ))
        }

        {/* Add new wallet button */}
        {
          !visibleAddForm && (
            <ListItem
              sx={{
                bgcolor: COLOR_SECONDARY,
                py: 2,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
              }}
            >
              <ListItemButton onClick={openAddForm}>
                <ListItemIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                  <Icon icon="fluent:add-square-24-filled" />
                </ListItemIcon>
                <ListItemText fontSize={FONT_SIZE_BODY1_DESKTOP}>
                  ADD NEW WALLET
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )
        }

        {/* Add new wallet form */}
        {
          visibleAddForm && (
            <ListItem
              sx={{
                bgcolor: COLOR_SECONDARY,
                py: 3,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
              }}
            >
              <PrimaryTextField
                placeholder="Put your wallet address here"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PrimaryButton onClick={() => {
                        closeAddForm();
                        addWallet();
                      }}>
                        Add
                      </PrimaryButton>
                    </InputAdornment>
                  )
                }}
                onKeyDown={keyPress}
                onChange={e => setWallet(e.target.value)}
                fullWidth
              />
            </ListItem>
          )
        }
      </SecondaryList>
    </Card>
  );
}