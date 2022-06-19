/* eslint-disable */
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { forwardRef, useEffect, useCallback } from 'react';
// material
import { Box } from '@mui/material';
// utils

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  const { pathname } = useLocation();

  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
