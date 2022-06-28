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
  nfts: [
    {
      amount: "1",
      block_number: "14431891",
      block_number_minted: "14431891",
      contract_type: "ERC721",
      curAvg: 0.005,
      estimatePL: 0.005,
      estimatePL_percent: "0.005 ETH",
      estimateValue: 0.005,
      image: "https://lh3.googleusercontent.com/wwZ40Z3zURcaetLNdWBa-ud0dwzGiBxzISEPTu7tBUg0Gw30wpf52EhdLbXKroRJYWSJHE-CEmepeQ_jkSaUIhgnFNvH00wwLE2iy8A=s128",
      last_metadata_sync: "2022-05-20T12:55:20.295Z",
      last_token_uri_sync: "2022-05-20T12:54:41.707Z",
      metadata: "{\"name\":\"HAPE Holder Badge (Rare)\",\"description\":\"Show your loyalty. A HAPEBADGE gives you early access to merchandise, events and more. Hold it close and stay HAPE.\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmQAR8VYdy7wzxr2QDGFtVkRfTheLTEw7g7evjUhC3xhMM/hape_badge_holder_rare.png\",\"animation_url\":\"https://gateway.pinata.cloud/ipfs/QmWyJXC5ocbGNGFvGzL4cVZwNuW4XF9bxgXnHtCAqe7bta/hape_badge_holder_rare.mp4\",\"attributes\":[{\"trait_type\":\"Type\",\"value\":\"HAPE Holder Badge (Rare)\"}]}",
      name: "HAPEBADGE#7034",
      owner_of: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      prevAvg: 0.182,
      price: 0,
      symbol: "HAPEBADGE",
      synced_at: "2022-05-20T12:55:20.295Z",
      token_address: "0x6fa9f4b50e2950a8137a76649193816fb29dad2c",
      token_hash: "53c2aaf776d28187b1f8977f517ef08a",
      token_id: "7034",
      token_uri: "https://ipfs.moralis.io:2053/ipfs/QmW4JYextyzTrs6WuRYAXmJHuba3N5JUS7EmerfiuuhteE/hape_badge_holder_rare.json",
      valid: true
    },
    {
      amount: "1",
      block_number: "14431891",
      block_number_minted: "14431891",
      contract_type: "ERC721",
      curAvg: 0.005,
      estimatePL: 0.005,
      estimatePL_percent: "0.005 ETH",
      estimateValue: 0.005,
      image: "https://lh3.googleusercontent.com/wwZ40Z3zURcaetLNdWBa-ud0dwzGiBxzISEPTu7tBUg0Gw30wpf52EhdLbXKroRJYWSJHE-CEmepeQ_jkSaUIhgnFNvH00wwLE2iy8A=s128",
      last_metadata_sync: "2022-05-20T12:55:20.295Z",
      last_token_uri_sync: "2022-05-20T12:54:41.707Z",
      metadata: "{\"name\":\"HAPE Holder Badge (Rare)\",\"description\":\"Show your loyalty. A HAPEBADGE gives you early access to merchandise, events and more. Hold it close and stay HAPE.\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmQAR8VYdy7wzxr2QDGFtVkRfTheLTEw7g7evjUhC3xhMM/hape_badge_holder_rare.png\",\"animation_url\":\"https://gateway.pinata.cloud/ipfs/QmWyJXC5ocbGNGFvGzL4cVZwNuW4XF9bxgXnHtCAqe7bta/hape_badge_holder_rare.mp4\",\"attributes\":[{\"trait_type\":\"Type\",\"value\":\"HAPE Holder Badge (Rare)\"}]}",
      name: "HAPEBADGE#7034",
      owner_of: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      prevAvg: 0.182,
      price: 0,
      symbol: "HAPEBADGE",
      synced_at: "2022-05-20T12:55:20.295Z",
      token_address: "0x6fa9f4b50e2950a8137a76649193816fb29dad2c",
      token_hash: "53c2aaf776d28187b1f8977f517ef08a",
      token_id: "7034",
      token_uri: "https://ipfs.moralis.io:2053/ipfs/QmW4JYextyzTrs6WuRYAXmJHuba3N5JUS7EmerfiuuhteE/hape_badge_holder_rare.json",
      valid: true
    },
    {
      amount: "1",
      block_number: "14431891",
      block_number_minted: "14431891",
      contract_type: "ERC721",
      curAvg: 0.005,
      estimatePL: 0.005,
      estimatePL_percent: "0.005 ETH",
      estimateValue: 0.005,
      image: "https://lh3.googleusercontent.com/wwZ40Z3zURcaetLNdWBa-ud0dwzGiBxzISEPTu7tBUg0Gw30wpf52EhdLbXKroRJYWSJHE-CEmepeQ_jkSaUIhgnFNvH00wwLE2iy8A=s128",
      last_metadata_sync: "2022-05-20T12:55:20.295Z",
      last_token_uri_sync: "2022-05-20T12:54:41.707Z",
      metadata: "{\"name\":\"HAPE Holder Badge (Rare)\",\"description\":\"Show your loyalty. A HAPEBADGE gives you early access to merchandise, events and more. Hold it close and stay HAPE.\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmQAR8VYdy7wzxr2QDGFtVkRfTheLTEw7g7evjUhC3xhMM/hape_badge_holder_rare.png\",\"animation_url\":\"https://gateway.pinata.cloud/ipfs/QmWyJXC5ocbGNGFvGzL4cVZwNuW4XF9bxgXnHtCAqe7bta/hape_badge_holder_rare.mp4\",\"attributes\":[{\"trait_type\":\"Type\",\"value\":\"HAPE Holder Badge (Rare)\"}]}",
      name: "HAPEBADGE#7034",
      owner_of: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      prevAvg: 0.182,
      price: 0,
      symbol: "HAPEBADGE",
      synced_at: "2022-05-20T12:55:20.295Z",
      token_address: "0x6fa9f4b50e2950a8137a76649193816fb29dad2c",
      token_hash: "53c2aaf776d28187b1f8977f517ef08a",
      token_id: "7034",
      token_uri: "https://ipfs.moralis.io:2053/ipfs/QmW4JYextyzTrs6WuRYAXmJHuba3N5JUS7EmerfiuuhteE/hape_badge_holder_rare.json",
      valid: true
    },
    {
      amount: "1",
      block_number: "14431891",
      block_number_minted: "14431891",
      contract_type: "ERC721",
      curAvg: 0.005,
      estimatePL: 0.005,
      estimatePL_percent: "0.005 ETH",
      estimateValue: 0.005,
      image: "https://lh3.googleusercontent.com/wwZ40Z3zURcaetLNdWBa-ud0dwzGiBxzISEPTu7tBUg0Gw30wpf52EhdLbXKroRJYWSJHE-CEmepeQ_jkSaUIhgnFNvH00wwLE2iy8A=s128",
      last_metadata_sync: "2022-05-20T12:55:20.295Z",
      last_token_uri_sync: "2022-05-20T12:54:41.707Z",
      metadata: "{\"name\":\"HAPE Holder Badge (Rare)\",\"description\":\"Show your loyalty. A HAPEBADGE gives you early access to merchandise, events and more. Hold it close and stay HAPE.\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmQAR8VYdy7wzxr2QDGFtVkRfTheLTEw7g7evjUhC3xhMM/hape_badge_holder_rare.png\",\"animation_url\":\"https://gateway.pinata.cloud/ipfs/QmWyJXC5ocbGNGFvGzL4cVZwNuW4XF9bxgXnHtCAqe7bta/hape_badge_holder_rare.mp4\",\"attributes\":[{\"trait_type\":\"Type\",\"value\":\"HAPE Holder Badge (Rare)\"}]}",
      name: "HAPEBADGE#7034",
      owner_of: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      prevAvg: 0.182,
      price: 0,
      symbol: "HAPEBADGE",
      synced_at: "2022-05-20T12:55:20.295Z",
      token_address: "0x6fa9f4b50e2950a8137a76649193816fb29dad2c",
      token_hash: "53c2aaf776d28187b1f8977f517ef08a",
      token_id: "7034",
      token_uri: "https://ipfs.moralis.io:2053/ipfs/QmW4JYextyzTrs6WuRYAXmJHuba3N5JUS7EmerfiuuhteE/hape_badge_holder_rare.json",
      valid: true
    },
    {
      amount: "1",
      block_number: "14431891",
      block_number_minted: "14431891",
      contract_type: "ERC721",
      curAvg: 0.005,
      estimatePL: 0.005,
      estimatePL_percent: "0.005 ETH",
      estimateValue: 0.005,
      image: "https://lh3.googleusercontent.com/wwZ40Z3zURcaetLNdWBa-ud0dwzGiBxzISEPTu7tBUg0Gw30wpf52EhdLbXKroRJYWSJHE-CEmepeQ_jkSaUIhgnFNvH00wwLE2iy8A=s128",
      last_metadata_sync: "2022-05-20T12:55:20.295Z",
      last_token_uri_sync: "2022-05-20T12:54:41.707Z",
      metadata: "{\"name\":\"HAPE Holder Badge (Rare)\",\"description\":\"Show your loyalty. A HAPEBADGE gives you early access to merchandise, events and more. Hold it close and stay HAPE.\",\"image\":\"https://gateway.pinata.cloud/ipfs/QmQAR8VYdy7wzxr2QDGFtVkRfTheLTEw7g7evjUhC3xhMM/hape_badge_holder_rare.png\",\"animation_url\":\"https://gateway.pinata.cloud/ipfs/QmWyJXC5ocbGNGFvGzL4cVZwNuW4XF9bxgXnHtCAqe7bta/hape_badge_holder_rare.mp4\",\"attributes\":[{\"trait_type\":\"Type\",\"value\":\"HAPE Holder Badge (Rare)\"}]}",
      name: "HAPEBADGE#7034",
      owner_of: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      prevAvg: 0.182,
      price: 0,
      symbol: "HAPEBADGE",
      synced_at: "2022-05-20T12:55:20.295Z",
      token_address: "0x6fa9f4b50e2950a8137a76649193816fb29dad2c",
      token_hash: "53c2aaf776d28187b1f8977f517ef08a",
      token_id: "7034",
      token_uri: "https://ipfs.moralis.io:2053/ipfs/QmW4JYextyzTrs6WuRYAXmJHuba3N5JUS7EmerfiuuhteE/hape_badge_holder_rare.json",
      valid: true
    }
  ],
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
