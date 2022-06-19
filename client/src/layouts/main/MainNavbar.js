/* eslint-disable */
import { useEffect, useState } from 'react'
import { NavLink as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3'
// material
import { styled } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Typography, InputBase, IconButton, Paper } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import SearchIcon from '@mui/icons-material/Search';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
import { MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import ModalDialog from '../../pages/ModalDialog';

// ----------------------------------------------------------------------
import { setWallet, setModal, setSearch } from '../../actions/manager';
import { shortAddress, getAddressType } from '../../lib/block'

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const NETWORK = process.env.REACT_APP_NETWORK;
const CHAIN_ID = process.env.REACT_APP_MAINNET_ID;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isOffset = useOffSetTop(100);
  const dispatch = useDispatch();
  const wallet = useSelector(state => state.manager.wallet)
  const [initWeb3, setInitWeb3] = useState(false);
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (window.ethereum && !initWeb3) {
      setInitWeb3(true);
      window.web3 = new Web3(window.ethereum);

      window.ethereum.on('accountsChanged', function (accounts) {
        // if (accounts[0] !== account) {
        console.log("change", accounts[0]);
        conMetamask();
        // }
      });

      window.ethereum.on('networkChanged', function (networkId) {
        if (Number(networkId) !== Number(CHAIN_ID)) {
          dispatch(setWallet(''))
          // dispatch(setModal(true, `Connect to ${NETWORK} network.`));
          NotificationManager.warning(`Connect to ${NETWORK} network.`)
          return;
        }
        conMetamask();
      });

      conMetamask();
    } else {
      NotificationManager.warning("Install metamask wallet on your browser")
    }
  }, []);

  /// window.ethereum used to get addrss
  const conMetamask = async (e) => {
    // console.log(e);
    if (window.ethereum) {
      const chainId = await window.ethereum.request({
        method: "eth_chainId"
      });
      if (Number(chainId) !== Number(CHAIN_ID)) {
        console.log(chainId)
        // dispatch(setModal(true, `Connect to ${NETWORK} network on metamask.`));
        NotificationManager.warning(`Connect to ${NETWORK} network.`)
        dispatch(setWallet(''))
        return;
      }
      const accounts = await window.ethereum.enable();
      dispatch(setWallet(accounts[0]))
    } else {
      NotificationManager.warning("Install metamask wallet on your browser")
    }
  }

  const handleSearchChange = (e) => {
    setAddress(e.target.value);
  }

  const keyPress = async (e) => {
    if (e.keyCode === 13) {
      let type = await getAddressType(address.split('/')[0])
      switch (type) {
        case 'contract':
          if (address.split('/').length > 1) {
            navigate(`/nft/${address}`, { replace: true })
          } else {
            navigate(`/collection/${address}`, { replace: true })
          }
          break
        case 'account':
          navigate(`/portfolio/${address}`, { replace: true });
          break
        case 'invalid':
          NotificationManager.error('Please input valid address')
          break
      }
    }
  }

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Typography variant='h5' sx={{ml:1}}>NFTROI</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search collection, contract, and wallet"
              inputProps={{ 'aria-label': 'search google maps' }}
              onKeyDown={keyPress}
              onChange={handleSearchChange}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box sx={{ flexGrow: 1 }} />
          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
          <Button variant='contained' onClick={conMetamask}>
            {
              wallet ? shortAddress(wallet) : 'Connect'
            }
          </Button>
          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
      <ModalDialog />
    </AppBar>
  );
}
