import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SecondaryButton } from '../../components/customComponents';
import { COLOR_SECONDARY_BRIGHT } from '../../utils/constants';

const ROUTES = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Overview',
    path: '/overview'
  },
  {
    name: 'Holding',
    path: '/holding'
  },
  {
    name: 'Transaction',
    path: '/transaction'
  }
];
const CustomizedDrawer = styled(Drawer)`
  .MuiPaper-root {
    background-color: #111;
  }
`;

export default function MainTopNavbar() {
  const { pathname } = useLocation();
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(10, 10, 10, 0)',
        py: { md: 1 },
      }}>
      <Container maxWidth="xl">
        <Toolbar>
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
                    <ListItem key={route.path}>
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
              <Button
                key={route.path}
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

          <SecondaryButton sx={{ py: 1, px: 2 }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}