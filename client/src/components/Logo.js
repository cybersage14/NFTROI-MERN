/* eslint-disable */
import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette?.primary.light;
  const PRIMARY_MAIN = theme.palette?.primary.main;
  const PRIMARY_DARK = theme.palette?.primary.dark;

  return (
    <Box component='img' src='/static/logo.svg' width='42px'>
      
    </Box>
  );
}
