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
import {
  Stack,
  Avatar,
  Typography,
  Icon as MuiIcon
} from '@mui/material';
import { Icon } from '@iconify/react';
import { StyledHeaderCell } from '../StyledComponent';
import {
  COLOR_ERROR,
  COLOR_SECONDARY,
  COLOR_SUCCESS,
  COLOR_SUCCESS_SECONDARY,
  FONT_SIZE_BODY1_DESKTOP,
  FONT_WEIGHT_NORMAL,
  URL_TRANSACTION,
  COLOR_SECONDARY_BRIGHT,
  COLOR_WHITE_OPACITY_TEN,
  COLOR_INFO,
  COLOR_INFO_BRIGHT,
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

const DataRow = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <Stack
      spacing={2}
      p={2}
      bgcolor={COLOR_SECONDARY}
      borderRadius={1}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        {/* Collections */}
        <Stack width="25%" direction="row" spacing={2} alignItems="center">
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
          <Avatar
            src={row.image}
            sx={{
              border: `2px solid ${row.pl >= 0 ? COLOR_SUCCESS : COLOR_ERROR}`,
              width: 60,
              height: 60
            }}
          />
          <Typography
            fontSize={FONT_SIZE_BODY1_DESKTOP}
            color={COLOR_SECONDARY_BRIGHT}
            component="a"
            href={`${URL_TRANSACTION}/${row.hash}`}
            target="_blank"
            sx={{ textDecoration: 'none' }}
          >
            {row.count > 1 ? `${row.name} x${row.count}` : row.name}
          </Typography>
        </Stack>

        {/* Action */}
        <Stack width="10%" direction="row" spacing={1} alignItems="center">
          {
            row.action === 'SELL' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_SUCCESS_SECONDARY,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="fa-solid:hand-holding-usd" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_SUCCESS_SECONDARY}
                textTransform="capitalize"
              >Sell</Typography>
            </>
          }
          {
            row.action === 'BUY' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_INFO,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="clarity:shopping-cart-solid" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_INFO}
                textTransform="capitalize"
              >Buy</Typography>
            </>
          }
          {
            row.action === 'TRANSFER' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_INFO_BRIGHT,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="oi:transfer" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_INFO_BRIGHT}
                textTransform="capitalize"
              >Transfer</Typography>
            </>
          }
          {
            row.action === 'SELL(Bid Won)' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_SUCCESS_SECONDARY,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="fa-solid:hand-holding-usd" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_SUCCESS_SECONDARY}
                textTransform="capitalize"
              >Sell(Bid won)</Typography>
            </>
          }
          {
            row.action === 'BUY(Bid Won)' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_INFO,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="clarity:shopping-cart-solid" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_INFO}
                textTransform="capitalize"
              >Buy(Bid Won)</Typography>
            </>
          }
          {
            row.action === 'MINT' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_SUCCESS,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="file-icons:mint" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_SUCCESS}
                textTransform="capitalize"
              >Mint</Typography>
            </>
          }
          {
            row.action === 'AIRDROP' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_INFO_BRIGHT,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="fa6-solid:hand-holding-droplet" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_INFO_BRIGHT}
                textTransform="capitalize"
              >Airdrop</Typography>
            </>
          }
          {
            row.action === 'LIST' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_INFO_BRIGHT,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="bi:list-check" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_INFO_BRIGHT}
                textTransform="capitalize"
              >List</Typography>
            </>
          }
          {
            row.action === 'CANCELLED LIST' &&
            <>
              <Stack
                width={30}
                height={30}
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                bgcolor={COLOR_WHITE_OPACITY_TEN}
              >
                <MuiIcon
                  sx={{
                    color: COLOR_ERROR,
                    fontSize: FONT_SIZE_BODY1_DESKTOP
                  }}
                >
                  <Icon icon="fluent:text-bullet-list-dismiss-20-filled" />
                </MuiIcon>
              </Stack>
              <Typography
                fontSize={FONT_SIZE_BODY1_DESKTOP}
                color={COLOR_ERROR}
                textTransform="capitalize"
              >Cancelled list</Typography>
            </>
          }
        </Stack>

        {/* From */}
        <Stack width="7.5%" direction="row" spacing={1} alignItems="center">
          <Box
            component="img"
            src="assets/images/wallet.png"
            alt={row.from}
            width={35}
            height={35}
            borderRadius="50%"
          />
        </Stack>

        {/* To */}
        <Stack width="7.5%" direction="row" spacing={1} alignItems="center">
          <Box
            component="img"
            src="assets/images/wallet.png"
            alt={row.to}
            width={35}
            height={35}
            borderRadius="50%"
          />
        </Stack>

        {/* Date */}
        <Stack width="10%" direction="row" spacing={1} alignItems="center">
          <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
            {row.date}
          </Typography>
        </Stack>

        {/* Tx Value */}
        <Stack width="10%" direction="row" alignItems="center">
          <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
            <Icon icon="logos:ethereum" />
          </MuiIcon>
          <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
            {`${row.value} ETH`}
          </Typography>
        </Stack>

        {/* Total Fee */}
        <Stack width="10%" direction="row" alignItems="center">
          <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
            <Icon icon="logos:ethereum" />
          </MuiIcon>
          <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
            {`${row.totalFee} ETH`}
          </Typography>
        </Stack>

        {/* Net */}
        <Stack width="10%" direction="row" alignItems="center">
          <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
            <Icon icon="logos:ethereum" />
          </MuiIcon>
          <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
            {`${row.net} ETH`}
          </Typography>
        </Stack>

        {/* P/L */}
        <Stack width="10%" direction="row" spacing={1} alignItems="center">
          {
            row.action === 'SELL' || row.action === 'SELL(Bid Won)' ? (
              <Stack
                bgcolor={COLOR_WHITE_OPACITY_TEN}
                p={1.5}
                borderRadius={1}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  fontSize={FONT_SIZE_BODY1_DESKTOP}
                  textAlign="center"
                  color={row.pl >= 0 ? COLOR_SUCCESS : COLOR_ERROR}
                >{`${row.pl} eth`}</Typography>
              </Stack>
            ) : <></>
          }
        </Stack>
      </Stack>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <Stack spacing={2}>
          {
            row.collapse.length > 1 && row.collapse.map((item, index) => (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
                key={index}
              >
                {/* Collections */}
                <Stack width="25%" direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={item.image}
                    sx={{
                      border: `2px solid ${row.pl >= 0 ? COLOR_SUCCESS : COLOR_ERROR}`,
                      width: 60,
                      height: 60
                    }}
                  />
                  <Typography
                    fontSize={FONT_SIZE_BODY1_DESKTOP}
                    color={COLOR_SECONDARY_BRIGHT}
                  >
                    {item.name}
                  </Typography>
                </Stack>

                {/* Action */}
                <Stack width="10%" direction="row" spacing={1} alignItems="center" />

                {/* From */}
                <Stack width="7.5%" direction="row" spacing={1} alignItems="center" />

                {/* To */}
                <Stack width="7.5%" direction="row" spacing={1} alignItems="center" />

                {/* Date */}
                <Stack width="10%" direction="row" spacing={1} alignItems="center" />

                {/* Tx Value */}
                <Stack width="10%" direction="row" alignItems="center">
                  <MuiIcon sx={{ fontSize: FONT_SIZE_H3_DESKTOP }}>
                    <Icon icon="logos:ethereum" />
                  </MuiIcon>
                  <Typography fontSize={FONT_SIZE_BODY1_DESKTOP} color={COLOR_SECONDARY_BRIGHT}>
                    {`${item.value} ETH`}
                  </Typography>
                </Stack>

                {/* Total Fee */}
                <Stack width="10%" direction="row" alignItems="center" />

                {/* Net */}
                <Stack width="10%" direction="row" alignItems="center" />

                {/* P/L */}
                <Stack width="10%" direction="row" spacing={1} alignItems="center" />
              </Stack>
            ))
          }
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default function TransactionTable({ transactions }) {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    setFilteredTransactions([...transactions]);
  }, [transactions]);

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
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >Action</Typography>
        </Box>
        <Box width="7.5%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >From</Typography>
        </Box>
        <Box width="7.5%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >To</Typography>
        </Box>
        <Box width="10%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >Date</Typography>
        </Box>
        <Box width="10%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >Tx Value</Typography>
        </Box>
        <Box width="10%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >Total Fee</Typography>
        </Box>
        <Box width="10%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >Net</Typography>
        </Box>
        <Box width="10%">
          <Typography
            fontWeight={FONT_WEIGHT_NORMAL}
            fontSize={FONT_SIZE_BODY1_DESKTOP}
          >P/L</Typography>
        </Box>
      </Stack>

      {
        filteredTransactions?.length > 0 && filteredTransactions.map((row, index) => (
          <DataRow key={index} row={row} />
        ))
      }
    </Stack>
  );
}