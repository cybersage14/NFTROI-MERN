/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListSubheader, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    color: theme.palette?.text.primary
  })
);

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette?.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette?.primary.main
  }
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  active: PropTypes.func,
  isShow: PropTypes.bool,
  item: PropTypes.object
};

function NavItem({ item, active, isShow }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette?.primary.main, theme.palette?.action.selectedOpacity),
    '&:before': { display: 'block' }
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium'
  };

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      {isShow && (
        <>
          <ListItemText disableTypography primary={title} />
        </>
      )}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function NavSection({ navConfig, isShow = true, ...other }) {
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { title,path } = list;
        return (
          <List key={title} disablePadding>
              <NavItem item={list} active={match} isShow={isShow} />
          </List>
        );
      })}
    </Box>
  );
}
