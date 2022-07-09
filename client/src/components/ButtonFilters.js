import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  COLOR_SECONDARY,
  COLOR_SECONDARY_BRIGHT,
  COLOR_WHITE,
  FONT_SIZE_BODY1_DESKTOP
} from '../utils/constants';

export default function ButtonFilter({ data, value, setValue, sx }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      p={1}
      border={`1px solid ${COLOR_SECONDARY}`}
      borderRadius={2}
      sx={{ ...sx }}
    >
      {
        data.map(dataItem => (
          <Box
            key={dataItem.value}
            py={1}
            px={2}
            bgcolor={dataItem.value === value ? COLOR_SECONDARY : 'none'}
            borderRadius={1}
            sx={{ cursor: 'pointer' }}
            onClick={() => setValue(dataItem.value)}
          >
            <Typography
              component="span"
              fontSize={FONT_SIZE_BODY1_DESKTOP}
              color={dataItem.value === value ? COLOR_WHITE : COLOR_SECONDARY_BRIGHT}
            >
              {dataItem.label}
            </Typography>
          </Box>
        ))
      }
    </Stack>
  );
}