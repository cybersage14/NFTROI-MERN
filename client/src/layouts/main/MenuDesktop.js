/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Grid, List, Stack, Menu, MenuItem, Button } from '@mui/material';

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette?.text.primary,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none'
  }
}));

// ----------------------------------------------------------------------

IconBullet.propTypes = {
  type: PropTypes.oneOf(['subheader', 'item'])
};

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 })
        }}
      />
    </Box>
  );
}

MenuDesktopItem.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

function MenuDesktopItem({ item, pathname, isHome, isOpen, isOffset, onOpen, onClose }) {
  const navigate = useNavigate()
  const { title, path, children } = item;
  const isActive = pathname === path;

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  if (children) {
    return (
      <>
        <LinkStyle
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={() => navigate(path, { replace: true })}
          onMouseOver={handleClick}
          sx={{
            cursor: 'pointer',
            ...(isHome && { color: 'common.white' }),
            ...(isOffset && { color: 'text.primary' }),
            ...(isActive && { color: 'primary.main' })
          }}
        >
          {title}
        </LinkStyle>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          {
            children.map(item => (
              <RouterLink to={item.path} key={item.title} style={{ textDecoration: 'none', color: 'white' }}>
                <MenuItem>
                  {item.title}
                </MenuItem>
              </RouterLink>
            ))
          }
        </Menu>
      </>
    );
  }

  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      sx={{
        ...(isHome && { color: 'common.white' }),
        ...(isOffset && { color: 'text.primary' }),
        ...(isActive && { color: 'primary.main' })
      }}
    >
      {title}
    </LinkStyle>
  );
}

MenuDesktop.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function MenuDesktop({ isOffset, isHome, navConfig }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" alignItems='center'>
      {navConfig.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          pathname={pathname}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}
