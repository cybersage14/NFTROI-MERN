import * as types from "../actions/types";

const initialState = {
  isAuth: false,
  status: "",
  wallet: "",
  search: "",
  modalText: "",
  modalOpen: false,
  balance: "",
  stats: null,
  nfts: null,
  transactions: null,
};

function managerReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_AUTH:
      return {
        ...state,
        isAuth: payload,
      };
    case types.SET_STATUS:
      return {
        ...state,
        status: payload,
      };
    case types.SET_WALLET:
      return {
        ...state,
        wallet: payload,
      };
    case types.SET_SEARCH:
      return {
        ...state,
        search: payload,
      };
    case types.SET_MODAL:
      return {
        ...state,
        ...payload,
      };
    case types.SET_BALANCE:
      return {
        ...state,
        balance: payload,
      };
    case types.SET_STATS:
      return {
        ...state,
        stats: payload,
      };
    case types.SET_NFTS:
      return {
        ...state,
        nfts: payload,
      };
    case types.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
      };
    default:
      return state;
  }
}

export default managerReducer;
