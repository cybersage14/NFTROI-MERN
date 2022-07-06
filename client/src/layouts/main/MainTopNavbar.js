import React, { Fragment, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NotificationManager } from 'react-notifications';
import {
  SecondaryButton,
  SecondaryMenu,
  SecondaryMenuItem,
  ToolbarWithoutPX
} from '../../components/customComponents';
import { COLOR_SECONDARY_BRIGHT, PATH_CONVERTER } from '../../utils/constants';
import { setWallet } from '../../actions/manager';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

const ROUTES = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Portfolio',
    children: [
      {
        name: 'Portfolio Tracker',
        path: '/portfolio/portfolio-tracker'
      },
      {
        name: 'Holdings',
        path: '/portfolio/holdings'
      },
      {
        name: 'Transactions',
        path: '/portfolio/transactions'
      }
    ]
  },
  {
    name: 'Explore',
    children: [
      {
        name: 'Overview',
        path: '/explore/overview'
      },
      {
        name: 'Nftroi Degens',
        path: '/explore/nftroi-degens'
      },
      {
        name: 'Top Celebs',
        path: '/explore/top-celebs'
      },
      {
        name: 'Most Profitable',
        path: '/explore/most-profitable'
      },
      {
        name: 'Highest Valued',
        path: '/explore/highest-valued'
      },
      {
        name: 'Biggest Flips',
        path: '/explore/biggest-flips'
      }
    ]
  },
  {
    name: 'Collections',
    path: '/collections'
  },
  {
    name: 'Tools',
    children: [
      {
        name: 'Battle',
        path: '/tools/battle'
      },
      {
        name: 'Converter',
        path: '/tools/converter'
      }
    ]
  }
];
const CustomizedDrawer = styled(Drawer)`
  .MuiPaper-root {
    background-color: #111;
  }
`;

const NETWORK = process.env.REACT_APP_NETWORK;
const CHAIN_ID = process.env.REACT_APP_MAINNET_ID;

export default function MainTopNavbar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [bgColorOfAppBar, setBgColorOfAppBar] = useState('rgba(10, 10, 10, 0)');
  const [initWeb3, setInitWeb3] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleBgColorOfAppBar = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1) {
      setBgColorOfAppBar('#121212');
    }
    else if (scrolled <= 1) {
      setBgColorOfAppBar('rgba(10, 10, 10, 0)');
    }
  };

  window.addEventListener('scroll', toggleBgColorOfAppBar);

  /// window.ethereum used to get addrss
  const conMetamask = async (e) => {
    // console.log(e);
    if (window.ethereum) {
      const chainId = await window.ethereum.request({
        method: "eth_chainId"
      });
      if (Number(chainId) !== Number(CHAIN_ID)) {
        console.log(chainId);
        // dispatch(setModal(true, `Connect to ${NETWORK} network on metamask.`));
        NotificationManager.warning(`Connect to ${NETWORK} network.`);
        dispatch(setWallet(''));
        return;
      }
      const accounts = await window.ethereum.enable();
      dispatch(setWallet(accounts[0]));
    } else {
      NotificationManager.warning("Install metamask wallet on your browser");
    }
  };

  const handleToolsMenu = (e) => {
    console.log('# e.currentTarget => ', e.currentTarget);
    setAnchorEl(e.currentTarget);
  };

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
          dispatch(setWallet(''));
          // dispatch(setModal(true, `Connect to ${NETWORK} network.`));
          NotificationManager.warning(`Connect to ${NETWORK} network.`);
          return;
        }
        conMetamask();
      });

      conMetamask();
    } else {
      NotificationManager.warning("Install metamask wallet on your browser");
    }
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: bgColorOfAppBar,
        py: { md: 1 },
      }}>
      <Container maxWidth="xl">
        <ToolbarWithoutPX>
          {/* For Mobile */}
          <IconButton
            size="large"
            sx={{ color: '#FFFFFF', ml: { xs: 2, md: 0 }, display: { xs: 'flex', md: 'none' } }}
            onClick={() => setDrawerOpened(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* For Mobile */}
          <CustomizedDrawer
            anchor="right"
            open={drawerOpened}
            onClose={() => setDrawerOpened(false)}
          >
            <Box my={3}>
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Button component={RouterLink} to="/">
                  <Box component="img" src="/assets/images/logo.png" width={40} />
                </Button>
              </Stack>
              <List sx={{ mt: 2 }} onClick={() => setDrawerOpened(false)}>
                {
                  ROUTES.map(route => (
                    <ListItem key={route.name}>
                      <ListItemButton
                        sx={pathname === route.path ? {
                          color: 'white',
                          fontWeight: 600
                        } : {
                          color: COLOR_SECONDARY_BRIGHT,
                          fontWeight: 400
                        }}
                        component={RouterLink}
                        to={route.path}
                      >
                        {route.name}
                      </ListItemButton>
                    </ListItem>
                  ))
                }
              </List>
            </Box>
          </CustomizedDrawer>

          {
            ROUTES.map(route => (
              <Fragment key={route.name}>
                {
                  route.path ? (
                    <Button
                      sx={pathname === route.path ? {
                        mr: 4,
                        fontWeight: 600,
                        color: 'white',
                        display: { xs: 'none', md: 'flex' }
                      } : {
                        mr: 4,
                        fontWeight: 400,
                        color: COLOR_SECONDARY_BRIGHT,
                        display: { xs: 'none', md: 'flex' }
                      }}
                      component={RouterLink}
                      to={route.path}
                    >
                      {route.name}
                    </Button>
                  ) : (
                    <>
                      <Button
                        name={route.name}
                        onClick={handleToolsMenu}
                        sx={pathname === PATH_CONVERTER ? {
                          mr: 4,
                          fontWeight: 600,
                          color: 'white',
                          display: { xs: 'none', md: 'flex' }
                        } : {
                          mr: 4,
                          fontWeight: 400,
                          color: COLOR_SECONDARY_BRIGHT,
                          display: { xs: 'none', md: 'flex' }
                        }}
                        endIcon={anchorEl?.name === route.name ? <ArrowDropDown /> : <ArrowDropUp />}
                      >
                        {route.name}
                      </Button>
                      <SecondaryMenu
                        anchorEl={anchorEl}
                        open={anchorEl?.name === route.name}
                        onClose={() => setAnchorEl(null)}
                      >
                        {
                          route.children.map(subRoute => (
                            <SecondaryMenuItem
                              key={subRoute.name}
                              onClick={() => setAnchorEl(null)}
                              component={RouterLink}
                              to={subRoute.path}
                            >
                              {subRoute.name}
                            </SecondaryMenuItem>
                          ))
                        }
                      </SecondaryMenu>
                    </>
                  )
                }
              </Fragment>
            ))
          }

          <Box flexGrow={1}>
            <Stack direction="row" justifyContent="center">
              {/* Logo for desktop */}
              <Button component={RouterLink} to="/">
                <Box component="img" src="/assets/images/logo-text-right.png" width={120} ml={1} />
              </Button>
            </Stack>
          </Box>

          <SecondaryButton sx={{ py: 1, px: 2 }} onClick={conMetamask}>
            Connect
          </SecondaryButton>
          {/* <SecondaryButton
            sx={{ py: 1, px: 2 }}
            endIcon={
              <Box component="img" src="assets/images/wallet.png" alt="" sx={{ borderRadius: '50%' }} />
            }
          >
            0xe59DCf131
          </SecondaryButton> */}
        </ToolbarWithoutPX>
      </Container>
    </AppBar>
  );
}