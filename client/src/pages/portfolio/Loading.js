import React from 'react';
import { Stack, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center'>
      <CircularProgress />
      <Typography variant="body1" color="white" sx={{ marginLeft: "15px" }}>
        Analysing now, please wait...
      </Typography>
    </Stack>
  );
}