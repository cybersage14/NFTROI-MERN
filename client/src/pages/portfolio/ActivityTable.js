/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LastPageIcon from '@mui/icons-material/LastPage';
import { visuallyHidden } from '@mui/utils';
import { FormGroup, FormControlLabel, Checkbox, Stack } from '@mui/material'
import { shortAddress } from '../../lib/block';

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
    id: 'from',
    numeric: true,

    label: 'From',
  },
  {
    id: 'to',
    numeric: true,

    label: 'To',
  },
  // {
  //   id: 'net',
  //   numeric: true,

  //   label: 'Net',
  // },
  // {
  //   id: 'pl',
  //   numeric: true,

  //   label: 'P/L',
  // }
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
          <TableCell
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
          </TableCell>
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

export default function ActivityTable({ transactions }) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = useState(['ALL'])
  const [filteredTransactions, setFilteredTransactions] = useState([])

  useEffect(() => {
    setFilteredTransactions([...transactions])
  }, [transactions])

  const changeFilter = (e) => {
    if (e.target.checked) {
      if (filter.indexOf(e.target.name) === -1) {
        let newFilter
        if (e.target.name === 'ALL') {
          newFilter = ['ALL']
          setFilter(newFilter)
        } else {
          newFilter = [...filter.filter(item => item !== 'ALL'), e.target.name]
          setFilter()
        }
        setFilter(newFilter)
        setFilteredTransactions(transactions.filter(item => {
          if (newFilter.indexOf('ALL') >= 0) {
            return true
          }
          if (newFilter.indexOf(item.action) >= 0) {
            return true
          }
          return false
        }))
      }
    } else {
      let newFilter = filter.filter(item => item !== e.target.name)
      setFilter(newFilter)
      setFilteredTransactions(transactions.filter(item => {
        if (newFilter.indexOf('ALL') >= 0) {
          return true
        }
        if (newFilter.indexOf(item.action) >= 0) {
          return true
        }
        return false
      }))
    }
  }

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
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <FormGroup>
          <Stack direction='row' spacing={1} justifyContent='center'>
            <FormControlLabel control={<Checkbox name='ALL' checked={filter.indexOf('ALL') >= 0} onChange={changeFilter} />} label="All" />
            <FormControlLabel control={<Checkbox name='SALE' checked={filter.indexOf('SALE') >= 0} onChange={changeFilter} />} label="Sale" />
            <FormControlLabel control={<Checkbox name='MINT' checked={filter.indexOf('MINT') >= 0} onChange={changeFilter} />} label="Mint" />
            <FormControlLabel control={<Checkbox name='TRANSFER' checked={filter.indexOf('TRANSFER') >= 0} onChange={changeFilter} />} label="Transfer" />
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
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">
                          {row.action}
                        </TableCell>                        
                        <TableCell align="left">{row.date}</TableCell>
                        <TableCell align="left">{`${row.value} eth`} </TableCell>
                        <TableCell align="left">{shortAddress(row.from)}</TableCell>
                        <TableCell align="left">{shortAddress(row.to)}</TableCell>
                        {/* <TableCell align="left">{`${row.net} eth`}</TableCell>
                        <TableCell align="left">{row.action === 'SELL' || row.action === 'SELL(Bid Won)' ? `${row.pl} eth` : `-`}</TableCell> */}
                      </TableRow>
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
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}

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