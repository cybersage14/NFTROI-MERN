import React from 'react';
import { Box, IconButton, styled } from '@mui/material';
import { Icon } from '@iconify/react';
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY_DARK,
  COLOR_PRIMARY_GRADIENT_LEFT,
  COLOR_PRIMARY_GRADIENT_RIGHT
} from '../../utils/constants';

const CIRCLE_SIZE = 48;

const ICON_SIZE = {
  width: 30,
  height: 30
};

const RootStyle = styled(Box)(({ theme }) => ({
  top: 0,
  bottom: 0,
  zIndex: 9,
  height: CIRCLE_SIZE,
  width: 'calc(100% + 30px)',
  transform: 'translate(-15px, 20px)',
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  justifyContent: 'space-between'
}));

const ArrowStyle = styled(IconButton)({
  width: CIRCLE_SIZE,
  height: CIRCLE_SIZE,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: COLOR_SECONDARY_DARK,
  backgroundImage: `linear-gradient(to left, ${COLOR_PRIMARY_GRADIENT_LEFT}, ${COLOR_PRIMARY_GRADIENT_RIGHT})`,
  borderRadius: '50%',
  boxShadow: '0px 2px 28px rgba(0, 0, 0, 0.27)',
  '&:hover': {
    opacity: 0.5
  }
});

// ----------------------------------------------------------------------

export default function CarouselControlArrows({ arrowLine, onNext, onPrevious, ...other }) {
  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        <Icon icon="eva:arrow-ios-back-fill" {...ICON_SIZE} />
      </ArrowStyle>

      <ArrowStyle size="small" onClick={onNext}>
        <Icon icon="eva:arrow-ios-forward-fill" {...ICON_SIZE} />
      </ArrowStyle>
    </RootStyle>
  );
}
