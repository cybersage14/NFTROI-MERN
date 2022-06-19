import {
  SET_AUTH,
  SET_STATUS,
  SET_WALLET,
  SET_MODAL,
  SET_BALANCE,
  SET_STATS,
  SET_NFTS,
  SET_TRANSACTIONS,
  SET_SEARCH,
} from "./types";

import { getEthBalance } from "../lib/block";

export const setAuthenticated = (isAuth) => (dispatch) => {
  dispatch({
    type: SET_AUTH,
    payload: isAuth
  })
}

export const setStatus = (status) => (dispatch) => {
  dispatch({
    type: SET_STATUS,
    payload: status,
  });
};

export const setWallet = (wallet) => (dispatch) => {
  dispatch({
    type: SET_WALLET,
    payload: wallet,
  });
};

export const setModal = (open, text) => (dispatch) => {
  dispatch({
    type: SET_MODAL,
    payload: { modalOpen: open, modalText: text },
  });
};

export const getBalance = (wallet) => async (dispatch) => {
  let balance = await getEthBalance(wallet);
  dispatch({
    type: SET_BALANCE,
    payload: balance,
  });
};

export const setStats = (stats) => (dispatch) => {
  dispatch({
    type: SET_STATS,
    payload: stats,
  });
};

export const setNFTs = (nfts) => (dispatch) => {
  dispatch({
    type: SET_NFTS,
    payload: nfts,
  });
};

export const setTransactions = (transactions) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTIONS,
    payload: transactions,
  });
};

export const setSearch = (address) => (dispatch) => {
  dispatch({
    type: SET_SEARCH,
    payload: address,
  });
};
