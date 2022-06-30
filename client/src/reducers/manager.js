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
  transactions: [
    {
      action: "SELL",
      block: 14457094,
      collapse: [
        {
          from: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
          image: "https://lh3.googleusercontent.com/JnuVC76owh2sD__99-CRj9yNNJyVVNWgNkob5mra5yCGTx9pnL3RXA4jdYIJX2XuDsMqF5KET0kziwOs3oigBuUEKDnlPqHU9P3Edw=s128",
          name: "adidas Originals: Into the Metaverse#0",
          to: "0xef2df96351ab41fac136a3f4b4984adf03bd0c81",
          tokenId: "0",
          type: "ERC1155",
          value: 0
        }
      ],
      contract: "0x28472a58a490c5e09a238847f66a68a47cc76f0f",
      count: 1,
      creatorFee: 0.16400000000000006,
      date: "26/03/2022",
      from: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      gasFee: 0,
      hash: "0x8d6c29df36887a22a822625e1c2d9b9ce76be4d40401c78ebfdbb12f72de099f",
      image: "https://lh3.googleusercontent.com/JnuVC76owh2sD__99-CRj9yNNJyVVNWgNkob5mra5yCGTx9pnL3RXA4jdYIJX2XuDsMqF5KET0kziwOs3oigBuUEKDnlPqHU9P3Edw=s128",
      marketFee: 0.04100000000000001,
      name: "adidas Originals: Into the Metaverse#0",
      net: 1.435,
      pl: 1.435,
      timeStamp: 1648233676000,
      to: "0xef2df96351ab41fac136a3f4b4984adf03bd0c81",
      tokenId: "0",
      totalFee: 0.205,
      type: "ERC1155",
      value: 1.64
    },
    {
      action: "AIRDROP",
      block: 14431891,
      collapse: [
        {
          from: "0x0000000000000000000000000000000000000000",
          image: "https://lh3.googleusercontent.com/wwZ40Z3zURcaetLNdWBa-ud0dwzGiBxzISEPTu7tBUg0Gw30wpf52EhdLbXKroRJYWSJHE-CEmepeQ_jkSaUIhgnFNvH00wwLE2iy8A=s128",
          name: "HAPEBADGE#7034",
          to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
          tokenId: "7034",
          type: "ERC721",
          value: 0
        }
      ],
      contract: "0x6fa9f4b50e2950a8137a76649193816fb29dad2c",
      count: 1,
      creatorFee: 0,
      date: "22/03/2022",
      from: "0x0000000000000000000000000000000000000000",
      gasFee: 0,
      hash: "0xe2de1f179cc93d72fad07941c2505855e1a8f194072a688d9164b7f3deb570ee",
      image: "https://lh3.googleusercontent.com/wwZ40Z3zURcaetLNdWBa-ud0dwzGiBxzISEPTu7tBUg0Gw30wpf52EhdLbXKroRJYWSJHE-CEmepeQ_jkSaUIhgnFNvH00wwLE2iy8A=s128",
      marketFee: 0,
      name: "HAPEBADGE#7034",
      net: 0,
      pl: 0,
      timeStamp: 1647895223000,
      to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      tokenId: "7034",
      totalFee: 0,
      type: "ERC721",
      value: 0
    },
    {
      action: "AIRDROP",
      block: 14427502,
      collapse: [
        {
          from: "0x0000000000000000000000000000000000000000",
          image: "https://lh3.googleusercontent.com/S7WAZxtjbFPSCvv-Pscb1tZaUpGFGzPatsXwlyTcRFfwNNkwHo8fB3OBVjko6-3pbyajDRznZ61RwYcAA6MnVhVgOP9P-mhKUEfi7aM=s128",
          name: "HAPEBADGE#418",
          to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
          tokenId: "418",
          type: "ERC721",
          value: 0
        }
      ],
      contract: "0x6fa9f4b50e2950a8137a76649193816fb29dad2c",
      count: 1,
      creatorFee: 0,
      date: "21/03/2022",
      from: "0x0000000000000000000000000000000000000000",
      gasFee: 0,
      hash: "0x8eac81b9a6d2f333ceba99ad2db03350c073c3291e77cba5a690e2f731fcd198",
      image: "https://lh3.googleusercontent.com/S7WAZxtjbFPSCvv-Pscb1tZaUpGFGzPatsXwlyTcRFfwNNkwHo8fB3OBVjko6-3pbyajDRznZ61RwYcAA6MnVhVgOP9P-mhKUEfi7aM=s128",
      marketFee: 0,
      name: "HAPEBADGE#418",
      net: 0,
      pl: 0,
      timeStamp: 1647835873000,
      to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      tokenId: "418",
      totalFee: 0,
      type: "ERC721",
      value: 0
    },
    {
      action: "TRANSFER",
      block: 14132359,
      collapse: [
        {
          from: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
          image: "https://lh3.googleusercontent.com/9u2Mwxt6rBYgVO7AA1JAO4-J1is_0uaEZvEzCXHBifFymOKWZQypW1pV1b49cqeeRRPZoEb6dsBrQpszA6baKcOCPCfUQvUwG0r-0X0=s128",
          name: "doodlefrens#9519",
          to: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
          tokenId: "9519",
          type: "ERC721",
          value: 0
        }
      ],
      contract: "0x1657e2200216ebacb92475b69d6bc0fdad48b068",
      count: 1,
      creatorFee: 0,
      date: "03/02/2022",
      from: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      gasFee: 0.008992091238563813,
      hash: "0x4287ca00cad96867c331fa063986b4adcfd56876d2e864df6c8c003de538a175",
      image: "https://lh3.googleusercontent.com/9u2Mwxt6rBYgVO7AA1JAO4-J1is_0uaEZvEzCXHBifFymOKWZQypW1pV1b49cqeeRRPZoEb6dsBrQpszA6baKcOCPCfUQvUwG0r-0X0=s128",
      marketFee: 0,
      name: "doodlefrens#9519",
      net: 0.009,
      pl: 0,
      timeStamp: 1643882976000,
      to: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
      tokenId: "9519",
      totalFee: 0.009,
      type: "ERC721",
      value: 0
    },
    {
      action: "TRANSFER",
      block: 14127551,
      collapse: [
        {
          from: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
          image: "https://lh3.googleusercontent.com/eg_P3APDyI_-W0sw9lNcq-wBhj_lG5iaEmUBmyv048ZM0ulRPnlBvCFD2ERdAvb9Aqk8t8uuGVE3RqaHnqa4CJYhINvkZVpYq3tkCw=s128",
          name: "HAPE PRIME#6218",
          to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
          tokenId: "6218",
          type: "ERC721",
          value: 0
        },
        {
          from: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
          image: "https://lh3.googleusercontent.com/sC_PLwZkGGjEiHzrBIHLrARh7HxqgxsO5vmKSkrrgnDej8EQhImK0Oh6-zH3DreYD4m5anAYxDXbDbH1z6gjmqxGwguxFRwhp3N4=s128",
          name: "HAPE PRIME#1909",
          to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
          tokenId: "1909",
          type: "ERC721",
          value: 0
        }
      ],
      contract: "0x4db1f25d3d98600140dfc18deb7515be5bd293af",
      count: 2,
      creatorFee: 0,
      date: "03/02/2022",
      from: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
      gasFee: 0,
      hash: "0x1d1348f8c420025d2202ea7d220d6622b7610c710edb1349699e66d781cbb6b9",
      image: "https://lh3.googleusercontent.com/eg_P3APDyI_-W0sw9lNcq-wBhj_lG5iaEmUBmyv048ZM0ulRPnlBvCFD2ERdAvb9Aqk8t8uuGVE3RqaHnqa4CJYhINvkZVpYq3tkCw=s128",
      marketFee: 0,
      name: "HAPE PRIME#6218",
      net: 0,
      pl: 0,
      timeStamp: 1643817339000,
      to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      tokenId: "6218",
      totalFee: 0,
      type: "ERC721",
      value: 0
    },
    {
      action: "TRANSFER",
      block: 14127551,
      collapse: [
        {
          from: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
          image: "https://lh3.googleusercontent.com/JnuVC76owh2sD__99-CRj9yNNJyVVNWgNkob5mra5yCGTx9pnL3RXA4jdYIJX2XuDsMqF5KET0kziwOs3oigBuUEKDnlPqHU9P3Edw=s128",
          name: "adidas Originals: Into the Metaverse#0",
          to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
          tokenId: "0",
          type: "ERC1155",
          value: 0
        }
      ],
      contract: "0x28472a58a490c5e09a238847f66a68a47cc76f0f",
      count: 1,
      creatorFee: 0,
      date: "03/02/2022",
      from: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
      gasFee: 0,
      hash: "0x1d1348f8c420025d2202ea7d220d6622b7610c710edb1349699e66d781cbb6b9",
      image: "https://lh3.googleusercontent.com/JnuVC76owh2sD__99-CRj9yNNJyVVNWgNkob5mra5yCGTx9pnL3RXA4jdYIJX2XuDsMqF5KET0kziwOs3oigBuUEKDnlPqHU9P3Edw=s128",
      marketFee: 0,
      name: "adidas Originals: Into the Metaverse#0",
      net: 0,
      pl: 0,
      timeStamp: 1643817339000,
      to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      tokenId: "0",
      totalFee: 0,
      type: "ERC1155",
      value: 0
    },
    {
      action: "TRANSFER",
      block: 14127447,
      collapse: [
        {
          from: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
          image: "https://lh3.googleusercontent.com/9u2Mwxt6rBYgVO7AA1JAO4-J1is_0uaEZvEzCXHBifFymOKWZQypW1pV1b49cqeeRRPZoEb6dsBrQpszA6baKcOCPCfUQvUwG0r-0X0=s128",
          name: "doodlefrens#9519",
          to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
          tokenId: "9519",
          type: "ERC721",
          value: 0
        }
      ],
      contract: "0x1657e2200216ebacb92475b69d6bc0fdad48b068",
      count: 1,
      creatorFee: 0,
      date: "03/02/2022",
      from: "0xa424cdc396a30090b2053d297b9e09a34f67ed11",
      gasFee: 0,
      hash: "0x414e82c4bcf4dfbf35559653048d7ec42f0c3542ee130ed97ac4cf079d9c49c9",
      image: "https://lh3.googleusercontent.com/9u2Mwxt6rBYgVO7AA1JAO4-J1is_0uaEZvEzCXHBifFymOKWZQypW1pV1b49cqeeRRPZoEb6dsBrQpszA6baKcOCPCfUQvUwG0r-0X0=s128",
      marketFee: 0,
      name: "doodlefrens#9519",
      net: 0,
      pl: 0,
      timeStamp: 1643815902000,
      to: "0xa85c179b586eb153f89628a8a83cb56a2bcb484d",
      tokenId: "9519",
      totalFee: 0,
      type: "ERC721",
      value: 0
    }
  ],
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
      console.log('# transactions => ', payload);
      return {
        ...state,
        transactions: payload,
      };
    default:
      return state;
  }
}

export default managerReducer;
