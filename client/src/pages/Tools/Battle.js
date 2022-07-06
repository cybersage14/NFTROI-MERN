import React from 'react';
import { Box, Icon as MuiIcon, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import {
  COLOR_PRIMARY,
  FONT_SIZE_BODY1_DESKTOP,
  FONT_SIZE_H2_DESKTOP,
  COLOR_SECONDARY_BRIGHT,
  ICON_NAME_BATTLE,
} from '../../utils/constants';

export default function Battle() {
  return (
    <>
      {/* Title */}
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <MuiIcon
            sx={{
              color: COLOR_PRIMARY,
              fontSize: FONT_SIZE_H2_DESKTOP
            }}
          >
            <Icon icon={ICON_NAME_BATTLE} />
          </MuiIcon>
          <Typography fontSize={FONT_SIZE_H2_DESKTOP}>
            Battle
          </Typography>
        </Stack>

        <Typography
          fontSize={FONT_SIZE_BODY1_DESKTOP}
          color={COLOR_SECONDARY_BRIGHT}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Stack>

      <Box mt={5}></Box>
    </>
  );
}