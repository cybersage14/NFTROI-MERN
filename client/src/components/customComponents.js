import { Button, List, ListItem, ListItemButton, Menu, MenuItem, Stack, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import {
  BORDER_RADIUS_TEXTFIELD,
  COLOR_BG_TEXTFIELD,
  COLOR_BORDER_GRADIENT_BOTTOM,
  COLOR_BORDER_GRADIENT_TOP,
  COLOR_PRIMARY_GRADIENT_LEFT,
  COLOR_PRIMARY_GRADIENT_RIGHT,
  COLOR_SECONDARY
} from "../utils/constants";

export const PrimaryTextField = styled(TextField)(({ theme }) => ({
  background: COLOR_BG_TEXTFIELD,
  borderRadius: BORDER_RADIUS_TEXTFIELD,
  '& .MuiOutlinedInput-root': {
    background: `linear-gradient(${COLOR_BG_TEXTFIELD}, ${COLOR_BG_TEXTFIELD}) padding-box, linear-gradient(to top, ${COLOR_BORDER_GRADIENT_BOTTOM}, ${COLOR_BORDER_GRADIENT_TOP}) border-box`,
    border: '1px solid transparent'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundImage: `linear-gradient(to right, ${COLOR_PRIMARY_GRADIENT_LEFT}, ${COLOR_PRIMARY_GRADIENT_RIGHT})`,
  color: 'white',
  fontWeight: 400
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  color: 'white',
  border: `2px solid ${COLOR_SECONDARY}`,
  background: 'rgba(0, 0, 0, 0)',
  fontWeight: 400
}));

export const ViterousStack = styled(Stack)(({ theme }) => ({
  background: `linear-gradient(${COLOR_BG_TEXTFIELD}, ${COLOR_BG_TEXTFIELD}) padding-box, linear-gradient(to top, ${COLOR_BORDER_GRADIENT_BOTTOM}, ${COLOR_BORDER_GRADIENT_TOP}) border-box`,
  border: '1px solid transparent'
}));

export const SecondaryMenu = styled(Menu)(({ theme }) => ({
  borderRadius: 5
}));

export const SecondaryMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 12
}));

export const SecondaryList = styled(List)(({ theme }) => ({
  border: `1px solid ${COLOR_SECONDARY}`,
  borderRadius: 10,
}));

export const SecondaryListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    border: `2px solid ${COLOR_SECONDARY}`,
  }
}));