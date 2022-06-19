import { Card, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

export const StyledCard = styled(Card)({
    backgroundColor: "rgb(62, 62, 62)",
    // p: "6px",
    // maxWidth: {xs:"260px"},
    width: '100%',
    borderRadius: "18px",
    boxShadow: "11px 11px 6px -1px rgb(160 160 160 / 20%)",

});

export const StyledHeaderCell = styled(TableCell)({
    '&.MuiTableCell-root': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderRadius: '20px'
    }
});

export const StyledBodyCell = styled(TableCell)({
    '&.MuiTableCell-root': {
        padding: '8px',
        paddingLeft: '24px'
    }
});

export const StyledTableRow = styled(TableRow)({
    '&.MuiTableContainer-root': {
        boxShadow: 'none'
    },

    '&.MuiTable-root': {
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        border: 'transparent'
    },

    '&.MuiTable-root th, &.MuiTable-root td': {
        borderTop: '1px solid black',
        borderBottom: '1px solid black'
    }
})