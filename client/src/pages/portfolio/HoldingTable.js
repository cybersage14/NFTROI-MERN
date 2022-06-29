/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Avatar, Stack, Typography, Box, Icon as MuiIcon } from '@mui/material';
import { Icon } from '@iconify/react';
import { StyledHeaderCell } from '../StyledComponent';
import {
  COLOR_ERROR,
  COLOR_SECONDARY,
  COLOR_SECONDARY_BRIGHT,
  COLOR_SUCCESS,
  FONT_SIZE_BODY1_DESKTOP,
  FONT_WEIGHT_NORMAL,
  FONT_SIZE_H3_DESKTOP
} from '../../utils/constants';

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
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        borderTop: `1px solid ${COLOR_SECONDARY}`,
        borderBottom: `1px solid ${COLOR_SECONDARY}`
      }}
    >
      <TableRow>
        {headCells.map((headCell) => (
          <StyledHeaderCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {/* <TableSortLabel
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
            </TableSortLabel> */}
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

export default function HoldingTable({ nfts }) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('price');
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // Avoid a layout jump when reaching the last page with empty nfts?.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - nfts?.length) : 0;

  return (
    <Stack mt={2} width="100%" spacing={3}>
      {/* Table Head */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={2}
        px={2}
        borderBottom={`1px solid ${COLOR_SECONDARY}`}
        borderTop={`1px solid ${COLOR_SECONDARY}`}
      >
        <Box width="25%">
          <Typography fontWeight={FONT_WEIGHT_NORMAL} fontSize={FONT_SIZE_BODY1_DESKTOP}>
            Collections
          </Typography>
        </Box>
        <Box width="10%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            textAlign="center"
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >Last Buy</Typography>
        </Box>
        <Box width="10%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            textAlign="center"
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >
            Previous<br />Avrg.Price
          </Typography>
        </Box>
        <Box width="20%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            textAlign="center"
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >
            Current<br />Avrg.Price
          </Typography>
        </Box>
        <Box width="20%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            textAlign="center"
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >
            Estimated<br />Value
          </Typography>
        </Box>
      </Stack>

      {
        nfts?.length &&
        stableSort(nfts, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              p={2}
              bgcolor={COLOR_SECONDARY}
              borderRadius={1}
              key={index}
            >
              {/* Collections */}
              <Stack width="25%" direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={row.image}
                  sx={{
                    border: `2px solid ${row.estimatePL >= 0 ? '#5CDD90' : '#DD5C5C'}`,
                    width: 60,
                    height: 60
                  }}
                />
                <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
                  {row.name}
                </Typography>
              </Stack>

              {/* Last Buy */}
              <Stack width="10%" direction="row" justifyContent="center" spacing={1}>
                <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                  <Icon icon="logos:ethereum" />
                </MuiIcon>
                <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
                  {`${row.price} ETH`}
                </Typography>
              </Stack>

              {/* Previous Avrg.prices */}
              <Stack width="10%" direction="row" justifyContent="center" spacing={1}>
                <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                  <Icon icon="logos:ethereum" />
                </MuiIcon>
                <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
                  {`${row.curAvg} ETH`}
                </Typography>
              </Stack>

              {/* Current Avrg.Prices */}
              <Stack width="20%" direction="row" justifyContent="center" spacing={1}>
                <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                  <Icon icon="logos:ethereum" />
                </MuiIcon>

                <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
                  {`${row.curAvg} ETH`}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  color={row.curAvg >= row.prevAvg ? COLOR_SUCCESS : COLOR_ERROR}
                >
                  <Typography fontSize={FONT_SIZE_BODY1_DESKTOP - 2}>
                    {`(${((row.curAvg - row.prevAvg) / row.prevAvg * 100).toFixed(2)}%)`}
                  </Typography>

                  <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                    <Icon icon={row.curAvg >= row.prevAvg ? "bi:caret-up-fill" : "bi:caret-down-fill"} />
                  </MuiIcon>
                </Stack>
              </Stack>

              {/* Estimated Value */}
              <Stack width="20%" direction="row" justifyContent="center" spacing={1}>
                <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                  <Icon icon="logos:ethereum" />
                </MuiIcon>

                <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
                  {`${row.estimateValue} ETH`}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  color={row.estimateValue >= row.price ? COLOR_SUCCESS : COLOR_ERROR}
                >
                  <Typography fontSize={FONT_SIZE_BODY1_DESKTOP - 2}>
                    {`(${((row.estimateValue - row.price) / row.price * 100).toFixed(2)}%)`}
                  </Typography>

                  <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                    <Icon icon={row.estimateValue >= row.price ? "bi:caret-up-fill" : "bi:caret-down-fill"} />
                  </MuiIcon>
                </Stack>
              </Stack>
            </Stack>
          ))
      }

      <Stack direction="row" justifyContent="end">
        <Stack
          width={100}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={COLOR_SECONDARY}
          p={1}
          borderRadius={1}
        >
          <IconButton
            sx={{ fontSize: FONT_SIZE_BODY1_DESKTOP, color: COLOR_SECONDARY_BRIGHT }}
            onClick={() => handleChangePage(page - 1)}
            disabled={nfts.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).length < 1}
          >
            <Icon icon="akar-icons:chevron-left" />
          </IconButton>
          <Typography component="span" fontSize={FONT_SIZE_BODY1_DESKTOP}>
            {page + 1}
          </Typography>
          <IconButton
            sx={{ fontSize: FONT_SIZE_BODY1_DESKTOP, color: COLOR_SECONDARY_BRIGHT }}
            onClick={() => handleChangePage(page + 1)}
            disabled={nfts.slice((page + 1) * rowsPerPage, (page + 1) * rowsPerPage + rowsPerPage).length < 1}
          >
            <Icon icon="akar-icons:chevron-right" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}