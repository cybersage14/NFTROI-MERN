/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LastPageIcon from '@mui/icons-material/LastPage';
import { visuallyHidden } from '@mui/utils';
import { FormGroup, FormControlLabel, Checkbox, Stack, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledHeaderCell, StyledBodyCell, StyledTableRow } from '../StyledComponent';
import { URL_TRANSACTION } from '../../utils/constants';

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
  if (orderBy === 'date') {
    if (b.block < a.block) {
      return -1;
    }
    if (b.block > a.block) {
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

    label: 'Collection',
  },
  {
    id: 'action',
    numeric: false,

    label: 'Action',
  },
  {
    id: 'date',
    numeric: false,

    label: 'Date',
  },
  {
    id: 'value',
    numeric: true,

    label: 'Tx value',
  },
  {
    id: 'totalFee',
    numeric: true,

    label: 'Total fees',
  },
  {
    id: 'net',
    numeric: true,

    label: 'Net',
  },
  {
    id: 'pl',
    numeric: true,

    label: 'P/L',
  }
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

function ActionCell({ action }) {
  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      {
        action === 'SELL' &&
        <>
          <Box sx={{ border: '1px solid #5CDD90', borderRadius: '50%', width: '36px', height: '36px', padding: '4px' }}>
            <Box component='img' src='/static/icons/sell-action.svg' width='24px' height='24px' />
          </Box>
          <Typography sx={{ color: '#5CDD90' }}>{action}</Typography>
        </>
      }
      {
        action === 'BUY' &&
        <>
          <Box sx={{ border: '1px solid #2057D7', borderRadius: '50%', width: '36px', height: '36px', padding: '4px' }}>
            <Box component='img' src='/static/icons/buy-action.svg' width='24px' height='24px' />
          </Box>
          <Typography sx={{ color: '#2057D7' }}>{action}</Typography>
        </>
      }
      {
        action === 'TRANSFER' &&
        <>
          <Box sx={{ border: '1px solid #16F1FF', borderRadius: '50%', width: '36px', height: '36px', padding: '4px' }}>
            <Box component='img' src='/static/icons/transfer-action.svg' width='24px' height='24px' />
          </Box>
          <Typography sx={{ color: '#16F1FF' }}>{action}</Typography>
        </>
      }
      {
        action === 'SELL(Bid Won)' &&
        <>
          <Avatar src='/static/icons/sell-action.svg' width='36px' height='36px' sx={{ border: '1px solid #5CDD90' }} />
          <Typography sx={{ color: '#5CDD90' }}>{action}</Typography>
        </>
      }
      {
        action === 'BUY(Bid Won)' &&
        <>
          <Avatar src='/static/icons/buy-action.svg' width='36px' height='36px' sx={{ border: '1px solid #2057D7' }} />
          <Typography sx={{ color: '#2057D7' }}>{action}</Typography>
        </>
      }
      {
        action === 'MINT' &&
        <>
          <Avatar src='/static/icons/transfer-action.svg' width='36px' height='36px' sx={{ border: '1px solid #16F1FF' }} />
          <Typography sx={{ color: '#16F1FF' }}>{action}</Typography>
        </>
      }
      {
        action === 'AIRDROP' &&
        <>
          <Avatar src='/static/icons/transfer-action.svg' width='36px' height='36px' sx={{ border: '1px solid #16F1FF' }} />
          <Typography sx={{ color: '#16F1FF' }}>{action}</Typography>
        </>
      }
      {
        action === 'LIST' &&
        <>
          <Avatar src='/static/icons/transfer-action.svg' width='36px' height='36px' sx={{ border: '1px solid #16F1FF' }} />
          <Typography sx={{ color: '#16F1FF' }}>{action}</Typography>
        </>
      }
      {
        action === 'CANCELLED LIST' &&
        <>
          <Avatar src='/static/icons/transfer-action.svg' width='36px' height='36px' sx={{ border: '1px solid #16F1FF' }} />
          <Typography sx={{ color: '#16F1FF' }}>{action}</Typography>
        </>
      }
    </Stack>
  );
}

function PLCell({ value, icon, bgColor }) {
  return (
    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{ borderRadius: '6px', backgroundColor: bgColor }}>
      <Typography variant='body2'>{value}</Typography>
      <Box component='img' src={icon} width='36px' height='36px' />
    </Stack>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          backgroundColor:
            row.action.includes('SELL') ?
              '#3A453E'
              : row.action.includes('BUY') ?
                '#212B4B'
                :
                '#265658',
          borderTop: '10px solid #2c2c2c',
          borderBottom: '10px solid #2c2c2c'
        }}
      >
        <StyledBodyCell align="left">
          <Stack direction='row' spacing={2} alignItems='center'>
            {
              row.collapse.length > 1 &&
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            }
            <Avatar src={row.image} width="48px" height="48px" sx={{ border: `3px solid ${row.pl >= 0 ? '#5CDD90' : '#DD5C5C'}` }} />
            {console.log('# row => ', row)}
            <Typography
              variant='body2'
              component="a"
              href={`${URL_TRANSACTION}/${row.hash}`}
              target="_blank"
              color="white"
              sx={{ textDecoration: 'none' }}
            >
              {row.count > 1 ? `${row.name} x${row.count}` : row.name}
            </Typography>
          </Stack>
        </StyledBodyCell>
        <StyledBodyCell align="left">
          <ActionCell action={row.action} />
        </StyledBodyCell>
        <StyledBodyCell align="left">{row.date}</StyledBodyCell>
        <StyledBodyCell align="left">
          <Stack direction='row' spacing={1} alignItems='center'>
            <Box component='img' src='/static/icons/eth.svg' width='11px' height='22px' />
            <Typography variant='body2'>{`${row.value} ETH`}</Typography>
          </Stack>

        </StyledBodyCell>
        <StyledBodyCell align="left">
          <Stack direction='row' spacing={1} alignItems='center'>
            <Box component='img' src='/static/icons/eth.svg' width='11px' height='22px' />
            <Typography variant='body2'>{`${row.totalFee} ETH`}</Typography>
          </Stack>
        </StyledBodyCell>
        <StyledBodyCell align="left">
          <Stack direction='row' spacing={1} alignItems='center'>
            <Box component='img' src='/static/icons/eth.svg' width='11px' height='22px' />
            <Typography variant='body2'>{`${row.net} eth`}</Typography>
          </Stack>
        </StyledBodyCell>
        <StyledBodyCell align="left">
          {
            row.action === 'SELL' || row.action === 'SELL(Bid Won)' ?

              <PLCell value={`${row.pl} eth`} icon={row.pl >= 0 ? '/static/icons/pl-up.svg' : '/static/icons/pl-down.svg'} bgColor={row.pl >= 0 ? '#5CDD90' : '#DD5C5C'} />
              :
              `-`
          }
        </StyledBodyCell>
      </TableRow>
      {
        row.collapse.length > 1 &&
        <StyledTableRow>
          <StyledBodyCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.collapse.map((item, index) => (
                      <TableRow key={index} sx={{
                        backgroundColor:
                          row.action.includes('SELL') ?
                            '#3A453E'
                            : row.action.includes('BUY') ?
                              '#212B4B'
                              :
                              '#265658',
                        borderTop: '10px solid #121b3c',
                        borderBottom: '10px solid #121b3c'
                      }}>
                        {console.log('# item => ', item)}
                        <StyledBodyCell align="left">
                          <Stack direction='row' spacing={2} alignItems='center'>
                            <Avatar src={item.image} width="48px" height="48px" sx={{ border: `3px solid ${row.pl >= 0 ? '#5CDD90' : '#DD5C5C'}` }} />
                            <Typography
                              variant='body2'
                            >
                              {item.name}
                            </Typography>
                          </Stack>
                        </StyledBodyCell>
                        <StyledBodyCell align="left">{`${item.value} eth`} </StyledBodyCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </StyledBodyCell>
        </StyledTableRow>
      }
    </React.Fragment >
  );
}

export default function TransactionTable({ transactions }) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = useState(['ALL']);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    setFilteredTransactions([...transactions]);
  }, [transactions]);

  const changeFilter = (e) => {
    if (e.target.checked) {
      if (filter.indexOf(e.target.name) === -1) {
        let newFilter;
        if (e.target.name === 'ALL') {
          newFilter = ['ALL'];
          setFilter(newFilter);
        } else {
          newFilter = [...filter.filter(item => item !== 'ALL'), e.target.name];
          setFilter();
        }
        setFilter(newFilter);
        setFilteredTransactions(transactions.filter(item => {
          if (newFilter.indexOf('ALL') >= 0) {
            return true;
          }
          if (newFilter.indexOf(item.action) >= 0) {
            return true;
          }
          return false;
        }));
      }
    } else {
      let newFilter = filter.filter(item => item !== e.target.name);
      setFilter(newFilter);
      setFilteredTransactions(transactions.filter(item => {
        if (newFilter.indexOf('ALL') >= 0) {
          return true;
        }
        if (newFilter.indexOf(item.action) >= 0) {
          return true;
        }
        return false;
      }));
    }
  };

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

  // Avoid a layout jump when reaching the last page with empty transactions?.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions?.length) : 0;

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ width: '100%', backgroundColor: '#2c2c2c', p: 1, border: '1px solid grey' }}>
        <FormGroup>
          <Stack direction='row' spacing={1} justifyContent='center'>
            <FormControlLabel control={<Checkbox name='ALL' checked={filter.indexOf('ALL') >= 0} onChange={changeFilter} />} label="All" />
            <FormControlLabel control={<Checkbox name='BUY' checked={filter.indexOf('BUY') >= 0} onChange={changeFilter} />} label="Buy" />
            <FormControlLabel control={<Checkbox name='BUY(Bid Won)' checked={filter.indexOf('BUY(Bid Won)') >= 0} onChange={changeFilter} />} label="Buy(Bid Won)" />
            <FormControlLabel control={<Checkbox name='MINT' checked={filter.indexOf('MINT') >= 0} onChange={changeFilter} />} label="Mint" />
            <FormControlLabel control={<Checkbox name='AIRDROP' checked={filter.indexOf('AIRDROP') >= 0} onChange={changeFilter} />} label="Airdrop" />
            <FormControlLabel control={<Checkbox name='SELL' checked={filter.indexOf('SELL') >= 0} onChange={changeFilter} />} label="Sell" />
            <FormControlLabel control={<Checkbox name='SELL(Bid Won)' checked={filter.indexOf('SELL(Bid Won)') >= 0} onChange={changeFilter} />} label="Sell(Bid Won)" />
            <FormControlLabel control={<Checkbox name='TRANSFER' checked={filter.indexOf('TRANSFER') >= 0} onChange={changeFilter} />} label="Transfer" />
            <FormControlLabel control={<Checkbox name='LIST' checked={filter.indexOf('LIST') >= 0} onChange={changeFilter} />} label="List" />
            <FormControlLabel control={<Checkbox name='CANCELLED LIST' checked={filter.indexOf('CANCELLED LIST') >= 0} onChange={changeFilter} />} label="Cancelled List" />
          </Stack>
        </FormGroup>
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
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 transactions?.slice().sort(getComparator(order, orderBy)) */}
              {filteredTransactions?.length ?
                stableSort(filteredTransactions, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <Row key={index} row={row} />
                    );
                  })
                : <></>
              }
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 20, { label: 'All', value: -1 }]}

                  count={filteredTransactions?.length || 0}
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