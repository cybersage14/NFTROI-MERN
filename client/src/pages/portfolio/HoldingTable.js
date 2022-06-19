/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Avatar, Stack, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils';
import { StyledHeaderCell, StyledBodyCell, StyledTableRow } from '../StyledComponent'

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (orderBy === 'estimatePL_percent') {
    if (b.estimatePL < a.estimatePL) {
      return -1;
    }
    if (b.estimate > a.estimate) {
      return 1;
    }
    return 0;
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Collection',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Last buy',
  },
  {
    id: 'prevAvg',
    numeric: true,
    disablePadding: false,
    label: 'Previous Avg.Price',
  },
  {
    id: 'curAvg',
    numeric: true,
    disablePadding: false,
    label: 'Current Avg.Price',
  },
  {
    id: 'estimateValue',
    numeric: true,
    disablePadding: false,
    label: 'Estimated Value',
  },
  {
    id: 'estimatePL_percent',
    numeric: true,
    disablePadding: false,
    label: 'Estimated P/L',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledHeaderCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
};

function PLCell({ value, icon, bgColor }) {
  return (
    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '6px', backgroundColor: bgColor }}>
      <Typography variant='body2'>{value}</Typography>
      <Box component='img' src={icon} width='36px' height='36px' />
    </Stack>
  )
}

export default function HoldingTable({ nfts }) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('price');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty nfts?.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - nfts?.length) : 0;

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ width: '100%', backgroundColor: '#2c2c2c', p: 1, border: '1px solid grey' }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={nfts?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 nfts?.slice().sort(getComparator(order, orderBy)) */}
              {nfts?.length ?
                stableSort(nfts, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor: row.estimatePL >= 0 ? '#3A453E' : '#744441',
                          borderTop: '10px solid #2c2c2c',
                          borderBottom: '10px solid #2c2c2c'
                        }}
                      >
                        <StyledBodyCell align="left" sx={{ width: '25%' }}>
                          <Stack direction='row' spacing={2} alignItems='center'>
                            <Avatar src={row.image} width="64px" height="64px" sx={{ border: `3px solid ${row.estimatePL >= 0 ? '#5CDD90' : '#DD5C5C'}` }} />
                            <Typography variant='body2'>
                              {row.name}
                            </Typography>
                          </Stack>
                        </StyledBodyCell>
                        <StyledBodyCell align="center" sx={{ width: '8%' }}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <Box component='img' src='/static/icons/eth.svg' width='11px' height='22px' />
                            <Typography variant='body2'>{`${row.price} ETH`}</Typography>
                          </Stack>
                        </StyledBodyCell>
                        <StyledBodyCell align="center" sx={{ width: '8%' }}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <Box component='img' src='/static/icons/eth.svg' width='11px' height='22px' />
                            <Typography variant='body2'>{`${row.prevAvg} ETH`}</Typography>
                          </Stack>
                        </StyledBodyCell>
                        <StyledBodyCell align="center" sx={{ width: '12%', paddingLeft:'0px' }}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <Box component='img' src='/static/icons/eth.svg' width='11px' height='22px' />
                            <Typography variant='body2'>{`${row.curAvg} ETH`}</Typography>
                            <Stack direction='row' alignItems='center'>
                              <Typography variant='caption' color={row.curAvg >= row.prevAvg ? 'success.main' : 'error.main'}>
                                {`(${((row.curAvg - row.prevAvg) / row.prevAvg * 100).toFixed(2)}%)`}
                              </Typography>
                              <Box component='img' src={row.curAvg >= row.prevAvg ? '/static/icons/up-tri.svg' : '/static/icons/down-tri.svg'} width='10px' height='6px' />
                            </Stack>
                          </Stack>
                        </StyledBodyCell>
                        <StyledBodyCell align="center" sx={{ width: '12%', paddingLeft:'0px' }}>
                          <Stack direction='row' spacing={1} alignItems='center'>
                            <Box component='img' src='/static/icons/eth.svg' width='11px' height='22px' />
                            <Typography variant='body2'>{`${row.estimateValue} ETH`}</Typography>
                            <Stack direction='row' alignItems='center'>
                              <Typography variant='caption' color={row.estimateValue >= row.price ? 'success.main' : 'error.main'}>
                                {`(${((row.estimateValue - row.price) / row.price * 100).toFixed(2)}%)`}
                              </Typography>
                              <Box component='img' src={row.estimateValue >= row.price ? '/static/icons/up-tri.svg' : '/static/icons/down-tri.svg'} width='10px' height='6px' />
                            </Stack>
                          </Stack>
                        </StyledBodyCell>
                        <StyledBodyCell align="center" sx={{ width: '15%' }}>
                          <PLCell value={row.estimatePL_percent} icon={row.estimatePL >= 0 ? '/static/icons/pl-up.svg' : '/static/icons/pl-down.svg'} bgColor={row.estimatePL >= 0 ? '#5CDD90' : '#DD5C5C'} />
                        </StyledBodyCell>
                      </TableRow>
                    );
                  })
                : <></>
              }

            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 20, { label: 'All', value: -1 }]}

                  count={nfts?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}