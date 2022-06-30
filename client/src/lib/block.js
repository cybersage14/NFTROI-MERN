/* eslint-disable */
import Web3 from "web3";
import axios from "axios";
import { ethers } from "ethers";
import { add } from "lodash";
import { sleep } from './utils'
import { TrySharp } from "@mui/icons-material";

import api from '../utils/api'

const mainnet = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const rinkebynet =
  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const eth_provider = new ethers.providers.JsonRpcProvider(mainnet);
const web3 = new Web3(mainnet);

const ETHSCAN_API_KEY = "IJ7YB5TG9DNUS7FKRSH6ZHHJHSCESF5PXE";
const ALCHEMY_API_KEY = "g49Snl5f0M3c0FwDCcFaepwctgv1W-UZ";
const MORALIS_API_KEY =
  "x29qh1Ff7AhQjVSBkcIQfLfdX3K8CbI4fLx3LRmECWyp38iaeAodJtPfcujskFO6";
const CRYPTO_API_KEY =
  "08881311aee8c5185058a0c6e36eb660290707f496e676fe1a1c786a0bde488f";
const BLOCKDAEMON_API_KEY = 'Bearer bd1bsGtR43n0NFm9XZdjjxv9JeZBBRvMA8groDJXcYETcQP'

const OPENSTORE_TOKEN = '0x495f947276749ce646f68ac8c248420045cb7b5e'

const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

const ListInputData =
  "0xa22cb465000000000000000000000000326c1e1be5397d7180959372c6b24273295bd7a00000000000000000000000000000000000000000000000000000000000000001";
const ListCancelInputData =
  "0xa22cb465000000000000000000000000326c1e1be5397d7180959372c6b24273295bd7a00000000000000000000000000000000000000000000000000000000000000000";
const OpenseaWyvernExchange = ['0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b', '0x7f268357A8c2552623316e2562D90e642bB538E5']
const OpenseaWallet = '0x5b3256965e7c3cf26e11fcaf296dfc8807c01073'
const LooksExchange = '0x59728544b08ab483533076417fbbb2fd0b17ce3a'
const LooksWallet = '0x5924a28caaf1cc016617874a2f0c3710d881f3c1'

const OPENSEA_FEE = 0.025
const LOOKS_FEE = 0.02

export const getEthBalance = async (account) => {
  try {
    let balance = await web3.eth.getBalance(account);
    return web3.utils.fromWei(balance);
  } catch (err) {
    console.log(err.message);
    return "0";
  }
};

export const isBigger = (x, y) => {
  x = x || "0";
  y = y || "0";
  if (x.length > y.length) y = "0".repeat(x.length - y.length) + y;
  else if (y.length > x.length) x = "0".repeat(y.length - x.length) + x;

  for (let i = 0; i < x.length; i++) {
    if (x[i] < y[i]) return -1;
    if (x[i] > y[i]) return 1;
  }
  return 0;
};

export const shortAddress = (address) => {
  if (address) {
    let lowCase = address.toLowerCase();
    return (
      "0x" +
      lowCase.charAt(2).toUpperCase() +
      lowCase.substr(3, 3) +
      "..." +
      lowCase.substr(-4)
    );
  }
  return address;
};

export const shortBalance = (val) => {
  let num = parseFloat(val).toFixed(4);
  return num;
};

export const getStat = async (address) => {
  console.log("wallet", address);
  let balance = await getEthBalance(address);
  console.log("balance", balance);
  ///////     ERC721 transactions
  let txDatas = (
    await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=${ETHSCAN_API_KEY}`
    )
  ).data.result;
  console.log(txDatas);
  let totalSell = 0;
  let totalBuy = 0;
  let totalGas = 0;
  let sellCount = 0;
  let buyCount = 0;
  for (let i = 0; i < txDatas.length; i++) {
    // console.log(address)
    if (txDatas[i].from.toLowerCase() === address.toLowerCase()) {
      let value = await getValueFromTx(txDatas[i].hash, address, "sell");
      if (value > 0) {
        sellCount++;
        totalSell += value;
      }
    }
    if (txDatas[i].to.toLowerCase() === address.toLowerCase()) {
      let value = await getValueFromTx(txDatas[i].hash, address, "buy");
      if (value) {
        buyCount++;
        totalBuy += value;
      }
    }
    totalGas += Number(txDatas[i].gasPrice) * Number(txDatas[i].gasUsed);
  }
  ///////     ERC1155 transactions
  // Buy ERC1155 transaction
  var buy_data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0x0",
        toBlock: "latest",
        toAddress: address,
        maxCount: "0x3e8",
        excludeZeroValue: true,
        category: ["erc1155"],
      },
    ],
  });

  var buy_config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: buy_data,
  };
  txDatas = (await axios(buy_config)).data.result.transfers;
  console.log("buy_erc1155", txDatas);
  for (let i = 0; i < txDatas.length; i++) {
    let data = await getGasAndValue(txDatas[i].hash);
    // console.log(`buy ${i}:`, data)
    if (data.value > 0) {
      buyCount++;
      totalBuy += data.value;
    }
    totalGas += data.gas;
  }

  // Sell ERC1155 transaction
  var sell_data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0x0",
        toBlock: "latest",
        fromAddress: address,
        maxCount: "0x3e8",
        excludeZeroValue: true,
        category: ["erc1155"],
      },
    ],
  });

  var sell_config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: sell_data,
  };
  txDatas = (await axios(sell_config)).data.result.transfers;
  console.log("sell_erc1155", txDatas);
  for (let i = 0; i < txDatas.length; i++) {
    let data = await getGasAndValue(txDatas[i].hash);
    // console.log(`sell ${i}:`, data)
    if (data.value > 0) {
      sellCount++;
      totalSell += data.value;
    }
    totalGas += data.gas;
  }

  let PL = totalSell - totalBuy - totalGas;
  // console.log('totalSell', web3.utils.fromWei(totalSell.toString(), 'ether'))
  // console.log('totalBuy', web3.utils.fromWei(totalBuy.toString(), 'ether'))
  // console.log('totalGas', web3.utils.fromWei(totalGas.toString(), 'ether'))
  // console.log('P/L', web3.utils.fromWei(PL.toString(), 'ether'))
  return {
    balance: parseFloat(balance).toFixed(3),
    totalSell,
    totalBuy,
    totalGas,
    PL,
    sellCount,
    buyCount,
  };
};

const getValueFromTx = async (txHash, address, type) => {
  try {
    let data = await web3.eth.getTransaction(txHash);
    if (Number(data.value) === 0) {
      let erc20Tx = (
        await axios.get(
          `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=${data.blockNumber}&endblock=${data.blockNumber}&sort=asc&apikey=${ETHSCAN_API_KEY}`
        )
      ).data.result;
      // console.log(erc20Tx)
      let total = 0;
      for (let i = 0; i < erc20Tx.length; i++) {
        // sell nft
        if (type === "sell") {
          if (erc20Tx[i].to.toLowerCase() === address.toLowerCase()) {
            let value = parseFloat(web3.utils.fromWei(erc20Tx[i].value));
            if (
              erc20Tx[i].tokenSymbol === "WETH" ||
              erc20Tx[i].tokenSymbol === "ETH"
            ) {
              total += value;
            } else {
              let tokenPrice = await getTokenEthPrice(
                erc20Tx[i].tokenSymbol,
                data.blockHash
              );
              total += value * tokenPrice;
            }
          }
        } else if (type === "buy") {
          if (erc20Tx[i].from.toLowerCase() === address.toLowerCase()) {
            let value = parseFloat(web3.utils.fromWei(erc20Tx[i].value));
            if (
              erc20Tx[i].tokenSymbol === "WETH" ||
              erc20Tx[i].tokenSymbol === "ETH"
            ) {
              total += value;
            } else {
              let tokenPrice = await getTokenEthPrice(
                erc20Tx[i].tokenSymbol,
                data.blockHash
              );
              total += value * tokenPrice;
            }
          }
        }
      }
      return total;
    }
    // console.log(data)
    return parseFloat(web3.utils.fromWei(data.value));
  } catch (err) {
    console.log(err.message);
  }
};

const getGasAndValue = async (hash) => {
  let gasUsed = Number((await web3.eth.getTransactionReceipt(hash)).gasUsed);
  let txData = await web3.eth.getTransaction(hash);
  let gas = gasUsed * parseFloat(web3.utils.fromWei(txData.gasPrice));
  let value = parseFloat(web3.utils.fromWei(txData.value));
  return { gas, value };
};

const getFromMoralis = async (url) => {
  let txDatas = [];
  let cursor = ''
  do {
    let res;
    try {
      if (cursor) {
        res = (
          await axios(
            `${url}&cursor=${cursor}`,
            { headers: { "X-API-Key": MORALIS_API_KEY } }
          )
        ).data
      } else {
        res = (
          await axios(
            url,
            { headers: { "X-API-Key": MORALIS_API_KEY } }
          )
        ).data
      }
    } catch (err) {
      console.log(err.message)
      break
    }
    cursor = res.cursor
    txDatas = [...txDatas, ...res.result];
    //await sleep(500)
  } while (cursor !== '')

  return txDatas
}

const getFromBlockdaemon = async (url) => {
  let txDatas = [];
  let page_token = ''
  do {
    let res;
    try {
      if (page_token) {
        res = (
          await axios(
            `${url}&page_token=${page_token}`,
            { headers: { "Authorization": BLOCKDAEMON_API_KEY } }
          )
        ).data
      } else {
        res = (
          await axios(
            url,
            { headers: { "Authorization": BLOCKDAEMON_API_KEY } }
          )
        ).data
      }
    } catch (err) {
      console.log(err.message)
      break
    }
    page_token = res.meta.paging.next_page_token
    txDatas = [...txDatas, ...res.data];
    //await sleep(500)
  } while (page_token)

  return txDatas
}

export const getNFTs = async (address) => {
  // try {
  //   const res = await api.get('/wallet/nfts', { params: {address} })
  //   return res.data
  // } catch (err) {
  //   console.log(err.message)
  // }
  let nfts, totalEstimatedPL = 0,
    totalHoldingValue = 0;
  nfts = await getFromMoralis(`https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`)

  console.log("nfts", nfts);

  for (let i = 0; i < nfts.length; i++) {
    // console.log('nft:', i)
    try {
      let asset = (
        await axios.get(
          `https://api.opensea.io/api/v1/asset/${nfts[i].token_address}/${nfts[i].token_id}/?include_orders=false`
        )
      ).data;
      // console.log('asset', asset)
      nfts[i].valid = true;
      nfts[i].name = `${asset.collection.name}#${nfts[i].token_id}`;
      if (nfts[i].name.length > 40) {
        nfts[i].name = `${nfts[i].name.slice(0, 40)}...`
      }
      nfts[i].image = asset.image_thumbnail_url;
    } catch (err) {
      console.log(nfts[i].token_address)
      console.log(err.message);
      nfts[i].valid = false;
      continue;
    }

    /// Get bought price
    let { buyPrice, avgPrice } = await getBuyPrevAvgPrice(
      nfts[i].block_number_minted,
      nfts[i].token_address,
      nfts[i].token_id
    );
    nfts[i].price = buyPrice;
    nfts[i].prevAvg = avgPrice;
    console.log(i, nfts[i].price, nfts[i].prevAvg)
    nfts[i].curAvg = await getCurAvgPrice(nfts[i].token_address);
    let today = new Date()
    let timeStamp =
      Number((await web3.eth.getBlock(Number(nfts[i].block_number_minted))).timestamp) * 1000;
    let mintDate = new Date(timeStamp)
    while (nfts[i].curAvg === 0 && today.getTime() >= mintDate.getTime()) {
      today.setDate(today.getDate() - 1)
      nfts[i].curAvg = await getAvgPrice(nfts[i].token_address, today)
      // console.log(today.toString())
    }
    let floor = Number((await getFloorPrice(nfts[i].token_address)).toFixed(3))
    console.log(i, nfts[i].curAvg, floor)

    /// check if it is transfered from
    let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/block/${nfts[i].block_number}/nft/transfers?chain=eth`)
    let txData = txDatas.find(tx => tx.to_address.toLowerCase() === address.toLowerCase() && tx.token_address === nfts[i].token_address && tx.token_id === nfts[i].token_id)

    if (txData) {
      if (await isTransferTo(txData, address)) {
        nfts[i].price = 0
      }
    }

    ///   Calculate estimate value & PL
    if (nfts[i].prevAvg > 0) {
      nfts[i].estimateValue = Number(
        ((nfts[i].curAvg / nfts[i].prevAvg) * nfts[i].price).toFixed(3)
      );
    } else {
      nfts[i].estimateValue = Number(nfts[i].curAvg.toFixed(3));
    }
    if (nfts[i].estimateValue < floor) {
      nfts[i].estimateValue = floor
    }
    nfts[i].estimatePL = nfts[i].estimateValue - nfts[i].price
    if (nfts[i].estimateValue >= nfts[i].price) {
      if (nfts[i].price > 0) {
        nfts[i].estimatePL_percent = `${(nfts[i].estimateValue - nfts[i].price).toFixed(3)} ETH(${(nfts[i].estimateValue / nfts[i].price * 100).toFixed(0)}%)`;
      } else {
        nfts[i].estimatePL_percent = `${nfts[i].estimateValue} ETH`;
      }
    } else {
      if (nfts[i].price > 0) {
        nfts[i].estimatePL_percent = `${(nfts[i].estimateValue - nfts[i].price).toFixed(3)} ETH(${(nfts[i].estimateValue / nfts[i].price * 100 - 100).toFixed(0)}%)`;
      } else {
        nfts[i].estimatePL_percent = `${nfts[i].estimateValue} ETH`;
      }
    }
    nfts[i].price = Number(nfts[i].price.toFixed(3));
    nfts[i].prevAvg = Number(nfts[i].prevAvg.toFixed(3));
    nfts[i].curAvg = Number(nfts[i].curAvg.toFixed(3));
    totalHoldingValue += nfts[i].estimateValue;
    totalEstimatedPL += nfts[i].estimatePL
  }
  totalHoldingValue = Number(totalHoldingValue.toFixed(3));
  totalEstimatedPL = Number(totalEstimatedPL.toFixed(3));
  nfts = nfts.filter((nft) => nft.valid);
  return { nfts, totalHoldingValue, totalEstimatedPL };
};

export const getOpenPL = async (transactions, date) => {
  let closePL = transactions.reduce((prev, cur) => prev + cur.pl, 0)
  let totalEstimatedPL = 0
  let address
  //////  Get NFTs owner
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i]
    if (transaction.action === 'BUY' || transaction.action === 'BUY(Bid Won)' || transaction.action === 'TRANSFER' || transaction.action === 'MINT' || transaction.action === 'AIRDROP') {
      address = transaction.to
      break
    } else {
      address = transaction.from
      break
    }
  }
  ///////////////////////     Get NFTs
  let nfts = []
  transactions = transactions.reverse()
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].to === address) {
      let contract = transactions[i].contract
      let tokenId = transactions[i].tokenId
      let j = i + 1
      for (j = i + 1; j < transactions.length; j++) {
        if (transactions[j].from === address && transactions[j].contract === contract && transactions[j].tokenId === tokenId) {
          break
        }
      }
      if (j === transactions.length) {
        nfts.push({ contract, tokenId })
      }
    }
  }
  //////////////////////    Calculate estimate PL
  for (let i = 0; i < nfts.length; i++) {
    let contract = nfts[i].contract
    let tokenId = nfts[i].tokenId
    let today = new Date(date.getTime())
    let mintBlock = ''

    try {
      let res = (
        await axios(
          `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}?chain=eth&format=decimal`,
          { headers: { "X-API-Key": MORALIS_API_KEY } }
        )
      ).data;
      mintBlock = res.block_number_minted
    } catch (err) {
      console.log(err.message)
    }

    let timeStamp =
      Number((await web3.eth.getBlock(Number(mintBlock))).timestamp) * 1000;
    let mintDate = new Date(timeStamp)
    let curAvg = await getAvgPrice(contract, date)

    while (curAvg === 0 && today.getTime() >= mintDate.getTime() && mintBlock) {
      today.setDate(today.getDate() - 1)
      curAvg = await getAvgPrice(contract, today)
    }

    let buyPrice = 0
    let prevAvg = 0
    let getTrans = transactions.find(tx => tx.action !== 'SELL' && tx.action !== 'SELL(Bid Won)' && tx.action !== 'LIST' && tx.action !== 'CANCELLED LIST' && tx.contract === contract && tx.tokenId === tokenId)

    if (getTrans.action === 'BUY' || getTrans.action === 'BUY(Bid Won)' || getTrans.action === 'MINT' || getTrans.action === 'AIRDROP') {
      buyPrice = getTrans.value
      prevAvg = await getAvgPrice(contract, getTrans.block)
    } else {
      let { value, block } = await getLastBuyValueBefore(contract, tokenId, date)
      buyPrice = value
      prevAvg = await getAvgPrice(contract, block)
    }

    let estimateValue
    if (prevAvg > 0) {
      estimateValue = (curAvg / prevAvg) * buyPrice
    } else {
      estimateValue = curAvg
    }
    totalEstimatedPL += estimateValue - buyPrice
  }

  return closePL + totalEstimatedPL
}

const isImage = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.headers["content-type"].indexOf("image") >= 0) {
      return "image";
    } else if (response.headers["content-type"].indexOf("video") >= 0) {
      return "video";
    } else {
      return "none";
    }
  } catch (err) {
    console.log(err.message);
    return "none";
  }
};

// const getBuyPrevAvgPrice = async (owner, contract, tokenId, type) => {
//   var data = JSON.stringify({
//     jsonrpc: "2.0",
//     id: 0,
//     method: "alchemy_getAssetTransfers",
//     params: [
//       {
//         fromBlock: "0x0",
//         toBlock: "latest",
//         toAddress: owner,
//         contractAddresses: [contract],
//         maxCount: "0x3e8",
//         excludeZeroValue: true,
//         category: ["erc721", "erc1155"],
//       },
//     ],
//   });

//   var config = {
//     method: "post",
//     url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };
//   try {
//     let txDatas = (await axios(config)).data.result.transfers;
//     // console.log('txBought', txDatas)
//     let txHash;
//     for (let i = txDatas.length - 1; i >= 0; i--) {
//       if (type === "ERC1155") {
//         if (Number(txDatas[i].erc1155Metadata[0].tokenId) === Number(tokenId)) {
//           // console.log('erc1155 hash', txDatas[i].hash)
//           let avgPrice = await getAvgPrice(contract, txDatas[i].blockNum);
//           let buyPrice = await getLastSalePrice(contract, tokenId);
//           return { buyPrice, avgPrice };
//         }
//       } else {
//         if (Number(txDatas[i].erc721TokenId) === Number(tokenId)) {
//           // console.log('erc721 hash', txDatas[i].hash)
//           let avgPrice = await getAvgPrice(contract, txDatas[i].blockNum);
//           let buyPrice = await getLastSalePrice(contract, tokenId);
//           return { buyPrice, avgPrice };
//         }
//       }
//     }
//   } catch (err) {
//     console.log(err.message)
//   }
//   return { buyPrice: 0, avgPrice: 0 };
// };

const getBuyPrevAvgPrice = async (mintBlock, contract, tokenId) => {
  let avgPrice
  let saleData = await getLastSalePrice(contract, tokenId);
  // console.log('lastsale', saleData)
  let buyPrice
  if (saleData === null) {
    buyPrice = await getMintValue(mintBlock, contract, tokenId)
    // console.log('mintValue', buyPrice)
    avgPrice = await getAvgPrice(contract, mintBlock, tokenId);
  } else {
    buyPrice = saleData.salePrice
    avgPrice = await getAvgPrice(contract, saleData.saleDate, tokenId);
  }
  return { buyPrice, avgPrice };
};

const getMintValue = async (mintBlock, contract, tokenId) => {
  let txDatas
  // console.log('mintBlock', mintBlock)
  txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/block/${mintBlock}/nft/transfers?chain=eth`)
  // console.log('mintTxs', txDatas)
  try {
    let { transaction_hash } = txDatas.filter(item => item.token_address === contract && item.token_id === tokenId)[0]
    txDatas = txDatas.filter(item => item.token_address === contract && item.transaction_hash === transaction_hash)
    if (txDatas.length > 0) {
      return Number((parseFloat(web3.utils.fromWei(txDatas[0].value)) / txDatas.length).toFixed(3))
    } else {
      return 0
    }
  } catch (err) {
    console.log(err.message)
    console.log(mintBlock, contract, tokenId)
    return 0
  }
}

const getLastSalePrice = async (contract, tokenId) => {
  // console.log(contract, tokenId);
  let lastSale = (
    await axios.get(
      `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/?include_orders=false`
    )
  ).data.last_sale;
  if (lastSale) {
    let saleDate = new Date(lastSale.event_timestamp)
    let token = lastSale.payment_token.symbol;
    if (token !== "ETH" && token !== "WETH") {
      let tokenPrice = await getTokenEthPrice(
        token,
        lastSale.transaction.block_hash
      );
      return {
        salePrice: Number(
          (
            parseFloat(web3.utils.fromWei(lastSale.total_price)) * tokenPrice
          ).toFixed(3)
        ), saleDate
      }
    } else {
      return {
        salePrice: Number(
          parseFloat(web3.utils.fromWei(lastSale.total_price)).toFixed(3)
        ), saleDate
      }
    }
  } else {
    return null;
  }
};

const getTokenEthPrice = async (token, blockOrHash) => {
  let timeStamp = Number((await web3.eth.getBlock(blockOrHash)).timestamp);
  console.log('token', token, blockOrHash)
  let tokenPrice = (
    await axios.get(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${token}&tsym=ETH&limit=1&aggregate=1&toTs=${timeStamp}&api_key=${CRYPTO_API_KEY}`
    )
  ).data.Data?.Data[0];
  return (tokenPrice.high + tokenPrice.low) / 2;
};

export const getEthCurrencyPrice = async (currency) => {
  let tokenPrice = (
    await axios.get(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=${currency}&limit=1&aggregate=1&api_key=${CRYPTO_API_KEY}`
    )
  ).data.Data?.Data[1];
  return tokenPrice.close
}

const getAvgPrice = async (contract, blockNumberOrDate, tokenId) => {
  // return 1
  let fromDate, toDate;
  if (blockNumberOrDate instanceof Date) {
    fromDate = blockNumberOrDate
  } else if (blockNumberOrDate) {
    let timeStamp =
      Number((await web3.eth.getBlock(Number(blockNumberOrDate))).timestamp) * 1000;
    fromDate = new Date(timeStamp);
  } else {
    fromDate = new Date();
  }
  toDate = new Date(fromDate.getTime());
  toDate.setDate(toDate.getDate() + 1);
  let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${contract}/trades?chain=eth&from_date=${fromDate.getUTCFullYear()}-${fromDate.getUTCMonth() + 1}-${fromDate.getUTCDate()}&to_date=${toDate.getUTCFullYear()}-${toDate.getUTCMonth() + 1}-${toDate.getUTCDate()}&marketplace=opensea`)

  // if (contract === OPENSTORE_TOKEN) {
  //   try{
  //     let asset = (await axios.get(`https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/?include_orders=false`)
  //     ).data;
  //     let slug = asset.collection.slug
  //     txDatas = txDatas.filter(async tx => {
  //       for (let i = 0; i < tx.token_ids.length; i++) {
  //         try{
  //           let asset = (await axios.get(`https://api.opensea.io/api/v1/asset/${contract}/${tx.token_ids[i]}/?include_orders=false`)).data;
  //           if (asset.collection.slug === slug) {
  //             return true
  //           }
  //         }catch(err){
  //           console.log(err.message)
  //         }
  //       }
  //       return false
  //     })
  //   }catch(err){
  //     console.log(err.message)      
  //   }
  // }

  let totalAmount = 0,
    totalPrice = 0;
  for (let i = 0; i < txDatas.length; i++) {
    totalAmount += txDatas[i].token_ids.length;
    totalPrice += parseFloat(web3.utils.fromWei(txDatas[i].price));
  }
  if (totalAmount > 0) {
    // console.log(contract, fromDate.toUTCString(), totalPrice / totalAmount)
    return totalPrice / totalAmount;
  } else {
    // console.log(contract, fromDate.toUTCString(), 0)
    return 0;
  }
};

const getFloorPrice = async (contract) => {
  try {
    let slug = (
      await axios.get(
        `https://api.opensea.io/api/v1/asset_contract/${contract}`
      )
    ).data.collection.slug;
    // console.log(slug)
    return (
      await axios.get(`https://api.opensea.io/api/v1/collection/${slug}/stats`)
    ).data.stats.floor_price || 0;
  } catch (err) {
    console.log(err.message);
    return 0
  }
};

const getCurAvgPrice = async (contract) => {
  try {
    let slug = (
      await axios.get(
        `https://api.opensea.io/api/v1/asset_contract/${contract}`
      )
    ).data.collection.slug;
    // console.log(slug)
    return (
      await axios.get(`https://api.opensea.io/api/v1/collection/${slug}/stats`)
    ).data.stats.one_day_average_price;
  } catch (err) {
    console.log("cur avg", err.message);
    return 0
  }
};

export const getTransaction = async (address) => {
  console.log(address);
  let stats = {
    balance: 0,
    totalBuy: 0,
    totalSell: 0,
    totalMint: 0,
    totalFee: { total: 0, gas: 0, creator: 0, market: 0, listing: 0 },
    closePL: 0,
    closePL_noFee: 0,
    buyCount: 0,
    sellCount: 0,
    mintCount: 0,
    biggestFlip: { contract: '', tokenId: '', value: 0, name: '', image: '' },
    biggestFlop: { contract: '', tokenId: '', value: 0, name: '', image: '' },
    topRank: { contract: '', tokenId: '', rank: 0, name: '', image: '' },
  };
  let transactions = [];
  // try {
  ///////         NFT
  let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/${address}/nft/transfers?chain=eth&format=decimal&direction=both`)

  // console.log('buy transaction', contract, tokenId, tokenType)
  for (let i = 0; i < txDatas.length; i++) {
    // console.log('transaction', i)
    let transaction = {
      action: "",
      name: "",
      image: "",
      count: 1,
      value: 0,
      totalFee: 0,
      gasFee: 0,
      creatorFee: 0,
      marketFee: 0,
      net: 0,
      pl: 0,
      hash: "",
      block: 0,
      date: "",
      timeStamp: 0,
      from: '',
      to: '',
      contract: "",
      tokenId: "",
      collapse: []
    };
    transaction.contract = txDatas[i].token_address;
    transaction.tokenId = txDatas[i].token_id;
    transaction.date = new Date(txDatas[i].block_timestamp).yyyymmdd();
    transaction.timeStamp = (new Date(txDatas[i].block_timestamp)).getTime()
    transaction.type = txDatas[i].contract_type
    transaction.from = txDatas[i].from_address
    transaction.to = txDatas[i].to_address
    ////        Get name and image of NFT
    try {
      let asset = (
        await axios.get(
          `https://api.opensea.io/api/v1/asset/${txDatas[i].token_address}/${txDatas[i].token_id}/?include_orders=false`
        )
      ).data;
      transaction.name = `${asset.asset_contract.name}#${txDatas[i].token_id}`;
      if (transaction.name.length > 40) {
        transaction.name = `${transaction.name.slice(0, 40)}...`
      }
      transaction.image = asset.image_thumbnail_url;
    } catch (err) {
      console.log(err.message);
    }
    transaction.collapse.push({ name: transaction.name, image: transaction.image, value: 0, tokenId: txDatas[i].token_id, type: txDatas[i].contract_type, from: txDatas[i].from_address, to: txDatas[i].to_address })
    if (transactions.length > 0) {
      if (transactions[transactions.length - 1].hash === txDatas[i].transaction_hash && transactions[transactions.length - 1].contract === txDatas[i].token_address) {
        // transactions[transactions.length - 1].name.push(transaction.name[0])
        // transactions[transactions.length - 1].image.push(transaction.image[0])
        transactions[transactions.length - 1].collapse.push({ name: transaction.name, image: transaction.image, value: 0, tokenId: txDatas[i].token_id, type: txDatas[i].contract_type, from: txDatas[i].from_address, to: txDatas[i].to_address })
        transactions[transactions.length - 1].count++
        continue
      }
    }
    /////       Set value and fee
    transaction.hash = txDatas[i].transaction_hash;
    transaction.block = Number(txDatas[i].block_number);
    let value_gas = await getGasAndValue(txDatas[i].transaction_hash);
    transaction.value = parseFloat(web3.utils.fromWei(txDatas[i].value));
    transaction.gasFee = value_gas.gas;
    ////    Set Action and Sell fee
    if (txDatas[i].from_address === "0x0000000000000000000000000000000000000000") {
      let res = (
        await axios(
          `https://deep-index.moralis.io/api/v2/transaction/${transaction.hash}?chain=eth`,
          { headers: { "X-API-Key": MORALIS_API_KEY } }
        )
      ).data;
      if (res.from_address.toLowerCase() === address.toLowerCase()) {
        transaction.action = "MINT"
      } else {
        transaction.action = "AIRDROP";
        transaction.gasFee = 0
        transaction.value = 0
      }
    } else if (txDatas[i].from_address.toLowerCase() === address.toLowerCase()) {
      let value_fee = await getBidSellValueFee(
        address,
        txDatas[i].block_number,
        txDatas[i].transaction_hash
      );
      if (transaction.value > 0) {
        // if (await isBatchNFTTransaction(
        //   txDatas[i].block_number,
        //   txDatas[i].transaction_hash
        // ) > 1) {
        //   transaction.value = await getSellNet(
        //     address,
        //     txDatas[i].block_number,
        //     txDatas[i].transaction_hash
        //   );
        //   transaction.fee = 0;
        // } else {
        //   transaction.fee = await getSellFee(
        //     address,
        //     txDatas[i].block_number,
        //     txDatas[i].transaction_hash
        //   );
        // }

        let { sellValue, buyValue } = await getSaleValue(
          transaction.block,
          transaction.hash,
          transaction.contract,
          transaction.tokenId,
          transaction.type,
          transaction.from,
          transaction.to
        );
        transaction.value = buyValue
        transaction.gasFee = 0;
        transaction.marketFee = transaction.value * OPENSEA_FEE
        transaction.creatorFee = transaction.value - sellValue - transaction.marketFee
        transaction.action = "SELL";
      } else if (value_fee) {
        transaction.value = value_fee.value;
        transaction.marketFee = transaction.value * OPENSEA_FEE
        transaction.creatorFee = value_fee.fee - transaction.marketFee
        transaction.action = "SELL(Bid Won)";
      } else {
        transaction.action = "TRANSFER";
      }
    } else if (txDatas[i].to_address.toLowerCase() === address.toLowerCase()) {
      let bidValue = await getBidBuyValue(address, txDatas[i].block_number,
        txDatas[i].transaction_hash)
      if (transaction.value > 0) {
        // try{
        let { buyValue } = await getSaleValue(
          transaction.block,
          transaction.hash,
          transaction.contract,
          transaction.tokenId,
          transaction.type,
          transaction.from,
          transaction.to
        );
        transaction.value = buyValue
        transaction.action = "BUY";
        // }catch(err){
        //   console.log('getsaleerror',err.message)
        //   console.log(transaction.block,
        //     transaction.hash,
        //     transaction.contract,
        //     transaction.tokenId,
        //     transaction.type,
        //     transaction.from,
        //     transaction.to)
        // }
      } else if (bidValue) {
        transaction.action = 'BUY(Bid Won)'
        transaction.value = bidValue
        transaction.gasFee = 0
      } else {
        transaction.action = "TRANSFER";
        transaction.gasFee = 0
      }
    }
    transaction.totalFee = transaction.gasFee + transaction.marketFee + transaction.creatorFee
    ////    Set Net
    if (
      transaction.action === "SELL" ||
      transaction.action === "SELL(Bid Won)"
    ) {
      transaction.net = Number(
        (transaction.value - transaction.totalFee).toFixed(3)
      );
    } else {
      transaction.net = Number(
        (transaction.value + transaction.totalFee).toFixed(3)
      );
    }
    transaction.value = Number(transaction.value.toFixed(3));
    transaction.totalFee = Number(transaction.totalFee.toFixed(3));
    transactions.push(transaction);
  }

  /////////     Set Collapse value
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].collapse.length > 1) {
      if (transactions[i].action === 'MINT') {
        let value = transactions[i].value / transactions[i].collapse.length
        for (let j = 0; j < transactions[i].collapse.length; j++) {
          transactions[i].collapse[j].value = value
        }
      } else if (transactions[i].action === 'BUY') {
        // let values = await getCollapseValues(OpenseaWyvernExchange, transactions[i].block, transactions[i].hash)
        // if (values.length === 1) {
        //   for (let j = 0; j < transactions[i].collapse.length; j++) {
        //     transactions[i].collapse[j].value = values[0] / transactions[i].collapse.length
        //   }
        // } else {
        //   for (let j = 0; j < transactions[i].collapse.length; j++) {
        //     transactions[i].collapse[j].value = values[j]
        //   }
        // }
        transactions[i].value = 0
        for (let j = 0; j < transactions[i].collapse.length; j++) {
          let { buyValue } = await getSaleValue(transactions[i].block, transactions[i].hash, transactions[i].contract, transactions[i].collapse[j].tokenId, transactions[i].collapse[j].type, transactions[i].collapse[j].from, transactions[i].collapse[j].to)
          transactions[i].collapse[j].value = buyValue
          transactions[i].value += buyValue
        }
        transactions[i].net = Number((transactions[i].value + transactions[i].totalFee).toFixed(3))
        transactions[i].value = Number(transactions[i].value.toFixed(3))
      } else if (transactions[i].action === 'SELL') {
        // let values = await getCollapseValues(address, transactions[i].block, transactions[i].hash)
        // if (values.length === 1) {
        //   for (let j = 0; j < transactions[i].collapse.length; j++) {
        //     transactions[i].collapse[j].value = values[0] / transactions[i].collapse.length
        //   }
        // } else {
        //   for (let j = 0; j < transactions[i].collapse.length; j++) {
        //     transactions[i].collapse[j].value = values[j]
        //   }
        // }
        transactions[i].value = transactions[i].totalFee = transactions[i].gasFee = transactions[i].creatorFee = transactions[i].marketFee = 0
        for (let j = 0; j < transactions[i].collapse.length; j++) {
          let { buyValue, sellValue } = await getSaleValue(transactions[i].block, transactions[i].hash, transactions[i].contract, transactions[i].collapse[j].tokenId, transactions[i].collapse[j].type, transactions[i].collapse[j].from, transactions[i].collapse[j].to)
          transactions[i].collapse[j].value = buyValue
          transactions[i].value += buyValue
          transactions[i].marketFee += buyValue * OPENSEA_FEE
          transactions[i].creatorFee += buyValue - sellValue - transactions[i].marketFee
        }
        transactions[i].value = Number(transactions[i].value.toFixed(3))
        transactions[i].totalFee = Number((transactions[i].marketFee + transactions[i].creatorFee).toFixed(3))
        transactions[i].net = Number((transactions[i].value - transactions[i].totalFee).toFixed(3))
      }
    }
  }

  ////////        list transaction
  txDatas = (
    await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHSCAN_API_KEY}`
    )
  ).data.result;
  txDatas = txDatas.filter(
    (tx) => tx.input === ListInputData || tx.input === ListCancelInputData
  );
  for (let i = 0; i < txDatas.length; i++) {
    let transaction = {
      action: "",
      name: "",
      image: "",
      count: 1,
      value: 0,
      totalFee: 0,
      gasFee: 0,
      marketFee: 0,
      creatorFee: 0,
      net: 0,
      pl: 0,
      hash: "",
      date: "",
      from: '',
      to: '',
      contract: "",
      tokenId: "",
      collapse: []
    };
    transaction.from = address
    transaction.hash = txDatas[i].hash;
    transaction.block = Number(txDatas[i].blockNumber);
    transaction.date = new Date(txDatas[i].timeStamp * 1000).yyyymmdd();
    transaction.contract = txDatas[i].to;
    /////      Set  List or cancel List
    if (txDatas[i].input === ListInputData) {
      transaction.action = "LIST";
    } else {
      transaction.action = "CANCELLED LIST";
    }
    try {
      let asset = (
        await axios.get(
          `https://api.opensea.io/api/v1/asset_contract/${txDatas[i].to}`
        )
      ).data;
      transaction.name = asset.name;
      transaction.image = asset.image_url;
    } catch (err) {
      console.log(err.message);
    }
    transaction.gasFee = Number(
      parseFloat(
        web3.utils.fromWei(
          (Number(txDatas[i].gasPrice) * Number(txDatas[i].gasUsed)).toString()
        )
      ).toFixed(3)
    );
    transaction.totalFee = transaction.gasFee
    transaction.net = transaction.totalFee;

    transactions.push(transaction);
  }

  transactions.sort((a, b) => b.block - a.block);
  /// calculate P/L
  for (let i = 0; i < transactions.length; i++) {
    if (
      transactions[i].action === "SELL" ||
      transactions[i].action === "SELL(Bid Won)"
    ) {
      transactions[i].pl = transactions[i].net;
      // console.log(i, transactions[i].action)
      for (let j = i + 1; j < transactions.length; j++) {
        /// LIST, CANCELLED LIST
        if (
          (transactions[j].action === "LIST" ||
            transactions[j].action === "CANCELLED LIST") &&
          transactions[j].contract === transactions[i].contract
        ) {
          transactions[i].pl -= transactions[j].net;
          // console.log(transactions[j].action, transactions[j].net)
        }
        /// BUY, MINT, TRANSFER
        if (
          transactions[j].contract === transactions[i].contract &&
          transactions[j].tokenId === transactions[i].tokenId
        ) {
          transactions[i].pl -= transactions[j].net;
          transactions[i].pl = Number(transactions[i].pl.toFixed(3));
          // console.log(transactions[j].action, transactions[j].net)
          break;
        }
      }
    }
  }

  ////////////        Calculate Stats
  stats.balance = Number(parseFloat(await getEthBalance(address)).toFixed(3));
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    // console.log('transaction', transaction)
    if (
      transaction.action === "SELL" || transaction.action === "SELL(Bid Won)") {
      stats.sellCount++;
      stats.totalSell += parseFloat(transaction.value);
    } else if (transaction.action === "BUY" || transaction.action === 'BUY(Bid Won)') {
      stats.buyCount++;
      stats.totalBuy += parseFloat(transaction.value);
    } else if (
      transaction.action === "MINT" || transaction.action === "AIRDROP") {
      stats.mintCount++;
      stats.totalMint += parseFloat(transaction.value);
    } else if (transaction.action === 'TRANSFER') {
      transactions.find(tx => (tx.action.includes('BUY') || tx.action === 'MINT') && tx.value > 0 && tx.contract === transaction.contract)
      if (transaction.from.toLowerCase() === address.toLowerCase() && transactions.find(tx => tx.action.includes('BUY') && tx.contract === transaction.contract)) {
        let res = await getLastBuyValueBefore(transaction.contract, transaction.tokenId, new Date(transaction.timeStamp))
        stats.closePL -= res.value
      }
    }

    if (transaction.action === 'LIST' || transaction.action === 'CANCELLED LIST') {
      stats.totalFee.listing += transaction.gasFee
    } else {
      stats.totalFee.gas += transaction.gasFee
    }

    stats.totalFee.market += transaction.marketFee
    stats.totalFee.creator += transaction.creatorFee

    stats.closePL += parseFloat(transaction.pl)
  }
  stats.totalBuy = Number(stats.totalBuy.toFixed(3));
  stats.totalSell = Number(stats.totalSell.toFixed(3));
  stats.totalMint = Number(stats.totalMint.toFixed(3));
  stats.totalFee.total = Number((stats.totalFee.gas + stats.totalFee.creator + stats.totalFee.market + stats.totalFee.listing).toFixed(3))
  stats.totalFee.gas = Number(stats.totalFee.gas.toFixed(3))
  stats.totalFee.market = Number(stats.totalFee.market.toFixed(3))
  stats.totalFee.creator = Number(stats.totalFee.creator.toFixed(3))
  stats.totalFee.listing = Number(stats.totalFee.listing.toFixed(3))
  stats.closePL = Number(stats.closePL.toFixed(3))
  // stats.PL = Number(
  //   (stats.totalSell - stats.totalBuy - stats.totalFee).toFixed(3)
  // );
  stats.closePL_noFee = Number((stats.closePL + stats.totalFee.total).toFixed(3));

  //  Top rarity
  // let rarityRanks = new Map()
  // let topRank = 100000000000000, topRankTransId = 0
  // for (let i = 0; i < transactions.length; i++) {
  //   let transaction = transactions[i]
  //   if (rarityRanks.get(transaction.contract)) {
  //     let rank = rarityRanks.get(transaction.contract).indexOf(transaction.tokenId)
  //     console.log('rank', transaction.contract, transaction.tokenId, rank)
  //     if (rank >= 0 && topRank > rank) {
  //       topRank = rank
  //       topRankTransId = i
  //     }
  //   } else {
  //     let rarityData = await getRarityRank(transaction.contract)
  //     if (rarityData) {
  //       rarityRanks.set(transaction.contract, rarityData)
  //       let rank = rarityRanks.get(transaction.contract).indexOf(transaction.tokenId)
  //       console.log('rank', transaction.contract, transaction.tokenId, rank)
  //       if (rank >= 0 && rank < topRank) {
  //         topRank = rank
  //         topRankTransId = i
  //       }
  //     }
  //   }
  // }
  // stats.topRank = { contract: transactions[topRankTransId].contract, tokenId: transactions[topRankTransId].tokenId, rank: topRank + 1, name: transactions[topRankTransId].name, image: transactions[topRankTransId].image }

  //  Biggest Flip, Flop
  transactions.sort((a, b) => b.pl - a.pl);
  if (transactions.length) {
    stats.biggestFlip = { contract: transactions[0].contract, tokenId: transactions[0].tokenId, value: transactions[0].pl, name: transactions[0].name, image: transactions[0].image }
    stats.biggestFlop = { contract: transactions[transactions.length - 1].contract, tokenId: transactions[transactions.length - 1].tokenId, value: transactions[transactions.length - 1].pl, name: transactions[transactions.length - 1].name, image: transactions[transactions.length - 1].image };
  }
  transactions.sort((a, b) => b.block - a.block);

  return { stats, transactions };
};

export const isTransferTo = async (txData, address) => {
  let txValue = parseFloat(web3.utils.fromWei(txData.value))
  let bidValue = await getBidBuyValue(address, txData.block_number,
    txData.transaction_hash)
  if (txValue === 0 || bidValue === 0) {
    return true
  }
  return false
}

export const getCompareInfo = async (address) => {
  let stats = {
    balance: 0,
    totalBuy: 0,
    totalSell: 0,
    totalMint: 0,
    totalFee: 0,
    PL: 0,
    biggestFlip: 0,
    worstFlip: 0,
  };
  let transactions = [];
  // try {
  ///////         NFT
  let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/${address}/nft/transfers?chain=eth&format=decimal&direction=both`)

  console.log("nft transactions", txDatas);
  // console.log('buy transaction', contract, tokenId, tokenType)
  for (let i = 0; i < txDatas.length; i++) {
    let transaction = {
      action: "",
      name: "",
      image: "",
      count: 1,
      value: 0,
      fee: 0,
      net: 0,
      pl: 0,
      hash: "",
      block: 0,
      date: "",
      contract: "",
      tokenId: "",
    };
    transaction.contract = txDatas[i].token_address;
    transaction.tokenId = txDatas[i].token_id;
    if (transactions.length > 0) {
      if (
        transactions[transactions.length - 1].hash ===
        txDatas[i].transaction_hash
      ) {
        // transactions[transactions.length - 1].name.push(transaction.name[0])
        // transactions[transactions.length - 1].image.push(transaction.image[0])
        transactions[transactions.length - 1].count++;
        continue;
      }
    }
    /////       Set value and fee
    transaction.hash = txDatas[i].transaction_hash;
    transaction.block = Number(txDatas[i].block_number);
    let value_gas = await getGasAndValue(txDatas[i].transaction_hash);
    transaction.value = parseFloat(web3.utils.fromWei(txDatas[i].value));
    transaction.fee = value_gas.gas;
    ////    Set Action and Sell fee
    if (
      txDatas[i].from_address === "0x0000000000000000000000000000000000000000"
    ) {
      if (txDatas[i].value > 0) {
        transaction.action = "MINT";
      } else {
        transaction.action = "AIRDROP";
      }
    } else if (
      txDatas[i].from_address.toLowerCase() === address.toLowerCase()
    ) {
      let value_fee = await getBidSellValueFee(
        address,
        txDatas[i].block_number,
        txDatas[i].transaction_hash
      );
      if (transaction.value > 0) {
        if (
          await isBatchNFTTransaction(
            txDatas[i].block_number,
            txDatas[i].transaction_hash
          ) > 1
        ) {
          transaction.value = await getSellNet(
            address,
            txDatas[i].block_number,
            txDatas[i].transaction_hash
          );
          transaction.fee = 0;
        } else {
          transaction.fee = await getSellFee(
            address,
            txDatas[i].block_number,
            txDatas[i].transaction_hash
          );
        }
        transaction.action = "SELL";
      } else if (value_fee) {
        transaction.fee += value_fee.fee;
        transaction.value = value_fee.value;
        transaction.action = "SELL(Bid Won)";
      } else {
        transaction.action = "TRANSFER";
      }
    } else if (txDatas[i].to_address.toLowerCase() === address.toLowerCase()) {
      if (transaction.value > 0) {
        transaction.action = "BUY";
      } else {
        continue;
      }
    }
    ////    Set Net
    if (
      transaction.action === "SELL" ||
      transaction.action === "SELL(Bid Won)"
    ) {
      transaction.net = Number(
        (transaction.value - transaction.fee).toFixed(3)
      );
    } else {
      transaction.net = Number(
        (transaction.value + transaction.fee).toFixed(3)
      );
    }
    transaction.value = Number(transaction.value.toFixed(3));
    transaction.fee = Number(transaction.fee.toFixed(3));
    transactions.push(transaction);
  }

  ////////        list transaction
  txDatas = (
    await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHSCAN_API_KEY}`
    )
  ).data.result;
  txDatas = txDatas.filter(
    (tx) => tx.input === ListInputData || tx.input === ListCancelInputData
  );
  for (let i = 0; i < txDatas.length; i++) {
    let transaction = {
      action: "",
      name: "",
      image: "",
      count: 1,
      value: 0,
      fee: 0,
      net: 0,
      pl: 0,
      hash: "",
      date: "",
      contract: "",
      tokenId: "",
    };
    transaction.hash = txDatas[i].hash;
    transaction.block = Number(txDatas[i].blockNumber);
    transaction.date = new Date(txDatas[i].timeStamp * 1000).yyyymmdd();
    transaction.contract = txDatas[i].to;
    /////      Set  List or cancel List
    if (txDatas[i].input === ListInputData) {
      transaction.action = "LIST";
    } else {
      transaction.action = "CANCELLED LIST";
    }
    transaction.fee = Number(
      Number(
        web3.utils.fromWei(
          (Number(txDatas[i].gasPrice) * Number(txDatas[i].gasUsed)).toString()
        )
      ).toFixed(3)
    );
    transaction.net = transaction.fee;

    transactions.push(transaction);
  }

  transactions.sort((a, b) => b.block - a.block);
  /// calculate P/L
  for (let i = 0; i < transactions.length; i++) {
    if (
      transactions[i].action === "SELL" ||
      transactions[i].action === "SELL(Bid Won)"
    ) {
      transactions[i].pl = transactions[i].net;
      // console.log(i, transactions[i].action)
      for (let j = i + 1; j < transactions.length; j++) {
        /// LIST, CANCELLED LIST
        if (
          (transactions[j].action === "LIST" ||
            transactions[j].action === "CANCELLED LIST") &&
          transactions[j].contract === transactions[i].contract
        ) {
          transactions[i].pl -= transactions[j].net;
          // console.log(transactions[j].action, transactions[j].net)
        }
        /// BUY, MINT, TRANSFER
        if (
          transactions[j].contract === transactions[i].contract &&
          transactions[j].tokenId === transactions[i].tokenId
        ) {
          transactions[i].pl -= transactions[j].net;
          transactions[i].pl = Number(transactions[i].pl.toFixed(3));
          // console.log(transactions[j].action, transactions[j].net)
          break;
        }
      }
    }
  }

  ////////////        Calculate Stats
  stats.balance = Number(parseFloat(await getEthBalance(address)).toFixed(3));
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    // console.log('transaction', transaction)
    if (
      transaction.action === "SELL" ||
      transaction.action === "SELL(Bid Won)"
    ) {
      stats.totalSell += parseFloat(transaction.value);
    } else if (transaction.action === "BUY") {
      stats.totalBuy += parseFloat(transaction.value);
    } else if (transaction.action === "MINT") {
      stats.totalMint += parseFloat(transaction.value);
    }
    stats.totalFee += parseFloat(transaction.fee);
    stats.PL += parseFloat(transaction.pl)
  }
  stats.totalBuy = Number(stats.totalBuy.toFixed(3));
  stats.totalSell = Number(stats.totalSell.toFixed(3));
  stats.totalFee = Number(stats.totalFee.toFixed(3));
  // stats.PL = Number(
  //   (stats.totalSell - stats.totalBuy - stats.totalFee).toFixed(3)
  // );
  transactions.sort((a, b) => b.pl - a.pl);
  if (transactions.length) {
    stats.biggestFlip = transactions[0].pl;
    stats.worstFlip = transactions[transactions.length - 1].pl;
  }
  // } catch (err) {
  //     console.log(err.message)
  // }
  return stats;
};

const getSellFee = async (address, blockNumber, hash) => {
  blockNumber = `0x${Number(blockNumber).toString(16)}`;
  var data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: blockNumber,
        toBlock: blockNumber,
        maxCount: "0x3e8",
        excludeZeroValue: false,
        category: ["erc20", "internal"],
      },
    ],
  });

  var config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let txDatas = (await axios(config)).data.result.transfers;
  txDatas = txDatas.filter(
    (tx) =>
      tx.hash.toLowerCase() === hash.toLowerCase() &&
      tx.to.toLowerCase() !== address.toLowerCase() &&
      tx.to !== WETH_ADDRESS
  );
  let totalFee = 0;
  for (let i = 0; i < txDatas.length; i++) {
    if (txDatas[i].asset !== "ETH" && txDatas[i].asset !== "WETH") {
      let tokenPrice = await getTokenEthPrice(
        txDatas[i].asset,
        Number(blockNumber)
      );
      totalFee += txDatas[i].value * tokenPrice;
    } else {
      totalFee += txDatas[i].value || 0;
    }
  }

  return totalFee;
};

const getSellNet = async (address, blockNumber, hash) => {
  blockNumber = `0x${Number(blockNumber).toString(16)}`;
  var data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: blockNumber,
        toBlock: blockNumber,
        maxCount: "0x3e8",
        excludeZeroValue: false,
        category: ["erc20", "internal"],
      },
    ],
  });

  var config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let txDatas = (await axios(config)).data.result.transfers;
  txDatas = txDatas.filter(
    (tx) =>
      tx.hash.toLowerCase() === hash.toLowerCase() &&
      tx.to.toLowerCase() === address.toLowerCase()
  );
  let totalFee = 0;
  for (let i = 0; i < txDatas.length; i++) {
    if (txDatas[i].asset !== "ETH" && txDatas[i].asset !== "WETH") {
      let tokenPrice = await getTokenEthPrice(
        txDatas[i].asset,
        Number(blockNumber)
      );
      totalFee += txDatas[i].value * tokenPrice;
    } else {
      totalFee += txDatas[i].value || 0;
    }
  }

  return totalFee;
};

const getBidSellValueFee = async (address, blockNumber, hash) => {
  blockNumber = `0x${Number(blockNumber).toString(16)}`;
  var data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: blockNumber,
        toBlock: blockNumber,
        maxCount: "0x3e8",
        excludeZeroValue: false,
        category: ["erc20"],
      },
    ],
  });

  var config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let txDatas = (await axios(config)).data.result.transfers;
  txDatas = txDatas.filter(
    (tx) => tx.hash.toLowerCase() === hash.toLowerCase()
  );
  if (txDatas.length === 0) {
    return null;
  }

  let fee = 0,
    value = 0;
  for (let i = 0; i < txDatas.length; i++) {
    if (txDatas[i].from.toLowerCase() === address.toLowerCase()) {
      if (txDatas[i].asset !== "ETH" && txDatas[i].asset !== "WETH") {
        let tokenPrice = await getTokenEthPrice(
          txDatas[i].asset,
          Number(blockNumber)
        );
        fee += txDatas[i].value * tokenPrice;
      } else {
        fee += txDatas[i].value || 0;
      }
    } else if (txDatas[i].to.toLowerCase() === address.toLowerCase()) {
      if (txDatas[i].asset !== "ETH" && txDatas[i].asset !== "WETH") {
        let tokenPrice = await getTokenEthPrice(
          txDatas[i].asset,
          Number(blockNumber)
        );
        value += txDatas[i].value * tokenPrice;
      } else {
        value += txDatas[i].value || 0;
      }
    }
  }

  return { fee, value };
};

const getBidBuyValue = async (address, blockNumber, hash) => {
  blockNumber = `0x${Number(blockNumber).toString(16)}`;
  var data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: blockNumber,
        toBlock: blockNumber,
        maxCount: "0x3e8",
        excludeZeroValue: false,
        category: ["erc20"],
      },
    ],
  });

  var config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let txDatas = (await axios(config)).data.result.transfers;
  txDatas = txDatas.filter(
    (tx) => tx.hash.toLowerCase() === hash.toLowerCase()
  );
  if (txDatas.length === 0) {
    return null;
  }

  let value = 0;
  for (let i = 0; i < txDatas.length; i++) {
    if (txDatas[i].from.toLowerCase() === address.toLowerCase()) {
      if (txDatas[i].asset !== "ETH" && txDatas[i].asset !== "WETH") {
        let tokenPrice = await getTokenEthPrice(
          txDatas[i].asset,
          Number(blockNumber)
        );
        value += txDatas[i].value * tokenPrice;
      } else {
        value += txDatas[i].value || 0;
      }
    }
  }

  return value;
}

const getCollapseValues = async (toAddress, blockNumber, hash) => {
  let values = []
  blockNumber = `0x${Number(blockNumber).toString(16)}`;
  var data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: blockNumber,
        toBlock: blockNumber,
        maxCount: "0x3e8",
        excludeZeroValue: false,
        category: ["erc20", "internal"],
      },
    ],
  });

  var config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let txDatas = (await axios(config)).data.result.transfers;
  txDatas = txDatas.filter(
    (tx) =>
      tx.hash.toLowerCase() === hash.toLowerCase() &&
      tx.to.toLowerCase() === toAddress.toLowerCase()
  );
  for (let i = 0; i < txDatas.length; i++) {
    if (txDatas[i].asset !== "ETH" && txDatas[i].asset !== "WETH") {
      let tokenPrice = await getTokenEthPrice(
        txDatas[i].asset,
        Number(blockNumber)
      );
      values.push(txDatas[i].value * tokenPrice);
    } else {
      values.push(txDatas[i].value || 0);
    }
  }

  return values.reverse();
}

const isBatchNFTTransaction = async (blockNumber, hash) => {
  blockNumber = `0x${Number(blockNumber).toString(16)}`;
  var data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: blockNumber,
        toBlock: blockNumber,
        maxCount: "0x3e8",
        excludeZeroValue: false,
        category: ["erc721", "erc1155"],
      },
    ],
  });

  var config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let txDatas = (await axios(config)).data.result.transfers;
  txDatas = txDatas.filter(
    (tx) =>
      tx.hash.toLowerCase() === hash.toLowerCase()
  );
  return txDatas.length
};

export const getEns = async (address) => {
  try {
    return await eth_provider.lookupAddress(address);
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    (dd > 9 ? "" : "0") + dd,
    (mm > 9 ? "" : "0") + mm,
    this.getFullYear(),
  ].join("/");
};

export const getAddressType = async (address) => {
  try {
    let code = await web3.eth.getCode(address)
    // console.log('code', code)
    return code !== '0x' ? 'contract' : 'account'
  } catch (err) {
    return 'invalid'
  }
}

export const getCollectionData = async (address) => {
  let collection = { name: '', bannerImage: '', avatarImage: '', items: 0, owners: 0, volume: 0, floor: 0, royalty: 0, profitableSales: 0, biggestFlip: 0, mostItems: 0, highestValue: 0, twitterUrl: '', instagramUrl: '', discordUrl: '' }
  try {
    let slug = (
      await axios.get(
        `https://api.opensea.io/api/v1/asset_contract/${address}`
      )
    ).data.collection.slug;
    // console.log(slug)
    let res = (await axios.get(`https://api.opensea.io/api/v1/collection/${slug}`)).data.collection
    collection.name = res.name
    collection.bannerImage = res.banner_image_url
    collection.avatarImage = res.image_url
    collection.items = getValueK(res.stats.total_supply)
    collection.owners = getValueK(res.stats.num_owners)
    collection.volume = getValueK(res.stats.total_volume)
    collection.floor = res.stats.floor_price
    collection.twitterUrl = res.twitter_username ? `https://twitter.com/${res.twitter_username}` : null
    collection.instagramUrl = res.instagram_username ? `https://instagram.com/${res.instagram_username}` : null
    collection.discordUrl = res.discord_url
    collection.royalty = Number(res.dev_seller_fee_basis_points) / 100

    // let { profitableSales, biggestFlip } = await getProfitSalesBiggestFlip(address)
    // collection.profitableSales = profitableSales
    // collection.biggestFlip = biggestFlip

    // let { mostItems, highestValue } = await getMostItemsHighestValue(address)
    // collection.mostItems = mostItems
    // collection.highestValue = highestValue    
  } catch (err) {
    console.log(err.message);
  }

  return collection
}

export const getProfitSalesBiggestFlip = async (address) => {
  let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${address}/trades?chain=eth&marketplace=opensea`)

  ///   Calculate profitable sales  
  let profitSales = 0
  let biggestFlip = 0
  for (let i = 0; i < txDatas.length; i++) {
    let tokenIds = txDatas[i].token_ids
    let seller = txDatas[i].seller_address
    let sellPrice = parseFloat(web3.utils.fromWei(txDatas[i].price))
    let buyPrice = 0
    for (let tk = 0; tk < tokenIds.length; tk++) {
      for (let j = i + 1; j < txDatas.length; j++) {
        if (txDatas[j].token_ids.indexOf(tokenIds[tk]) >= 0 && txDatas[j].buyer_address === seller) {
          buyPrice += parseFloat(web3.utils.fromWei(txDatas[j].price)) / txDatas[j].token_ids.length
          break
        }
      }
    }
    if (sellPrice > buyPrice) {
      profitSales++
      let flip = (sellPrice - buyPrice) / tokenIds.length
      if (flip > biggestFlip) {
        biggestFlip = flip
      }
    }
  }

  let profitableSales = (profitSales / txDatas.length * 100).toFixed(0)
  biggestFlip = biggestFlip.toFixed(3)
  return { profitableSales, biggestFlip }
}

export const getMostItemsHighestValue = async (address) => {
  let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${address}/owners?chain=eth&format=decimal`)

  ////////      Get most items
  let items = new Map()
  for (let i = 0; i < txDatas.length; i++) {
    let count = items.get(txDatas[i].owner_of)
    if (count) {
      items.set(txDatas[i].owner_of, count + 1)
    } else {
      items.set(txDatas[i].owner_of, 1)
    }
  }
  let mostItems = 0
  let mostWallet
  items.forEach((value, key) => {
    if (mostItems < value) {
      mostItems = value
      mostWallet = key
    }
  })

  ////////      Get highest value  
  let highestValues = new Map()

  let trades = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${address}/trades?chain=eth&marketplace=opensea`)

  let curAvg = await getCurAvgPrice(address);
  let floor = Number((await getFloorPrice(address)).toFixed(3))
  for (let i = 0; i < txDatas.length; i++) {
    let estimate = await getEstimatePL(txDatas[i].owner_of, address, txDatas[i].token_id, trades, curAvg, floor)
    // console.log(i, txDatas[i].owner_of, estimate)
    let highestValue = highestValues.get(txDatas[i].owner_of)
    if (highestValue >= 0) {
      highestValues.set(txDatas[i].owner_of, highestValue + estimate)
    } else {
      highestValues.set(txDatas[i].owner_of, estimate)
    }
  }
  let highestValue = 0
  let highestWallet
  highestValues.forEach((value, key) => {
    if (highestValue < value) {
      highestValue = value
      highestWallet = key
    }
  })
  highestValue = highestValue.toFixed(3)

  return { mostItems, mostWallet, highestValue, highestWallet }
}

export const getTokenIds = async (contract) => {
  let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${contract}?chain=eth&format=decimal`)
  return txDatas.map(tx => ({ tokenId: tx.token_id, mintBlock: tx.block_number_minted }))
}

export const getNFT = async (contract, tokenId, mintBlock) => {
  let nft = { name: '', image: '', lastBuy: 0, buyDate: '' }
  try {
    let asset = (
      await axios.get(
        `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/?include_orders=false`
      )
    ).data;
    // console.log(res)
    nft.name = `${asset.asset_contract.name}#${tokenId}`;
    if (nft.name.length > 20) {
      nft.name = `${nft.name.slice(0, 20)}...`
    }
    nft.image = asset.image_preview_url;

    let saleData = await getLastSalePrice(contract, tokenId);
    if (saleData === null) {
      nft.lastBuy = await getMintValue(mintBlock, contract, tokenId)
      let timeStamp =
        Number((await web3.eth.getBlock(Number(mintBlock))).timestamp) * 1000;
      nft.buyDate = new Date(timeStamp).yyyymmdd()
    } else {
      nft.buyDate = saleData.saleDate.yyyymmdd()
      nft.lastBuy = saleData.salePrice
    }
  } catch (err) {
    console.log(err.message);
  }

  return nft
}

const getEstimatePL = async (owner, contract, tokenId, txDatas, curAvg, floor) => {
  /// Get bought price
  let estimate = 0

  let prevAvg = 0, buyPrice = 0
  for (let i = 0; i < txDatas.length; i++) {
    if (txDatas[i].token_ids.indexOf(tokenId) >= 0 && txDatas[i].buyer_address === owner) {
      prevAvg = await getAvgPrice(contract, txDatas[i].block_number);
      buyPrice = parseFloat(web3.utils.fromWei(txDatas[i].price)) / txDatas[i].token_ids.length
      break
    }
  }
  // nfts[i].curAvg = Number(parseFloat(await getFloorPrice(contract)).toFixed(3)) || 0
  if (prevAvg > 0) {
    estimate = Number(
      ((curAvg / prevAvg) * buyPrice).toFixed(3)
    );
  } else {
    estimate = curAvg;
  }
  if (estimate < floor) {
    estimate = floor
  }
  return estimate
}

const getValueK = (val) => {
  return Math.floor(val / 100) / 10.0 + "k";
}

export const getAssetInfo = async (contract, tokenId) => {
  let asset = { image: '', name: '', tokenId: '', owner: '', lastSale: 0, highestTraitFloor: 0, highestTraitLastSale: 0 }
  try {
    let res = (
      await axios.get(
        `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/?include_orders=false`
      )
    ).data;
    // console.log(res)
    asset.image = res.image_url
    asset.name = res.asset_contract.name
    asset.tokenId = res.token_id
    asset.owner = res.top_ownerships[0].owner.address

    if (res.last_sale) {
      let token = res.last_sale?.payment_token.symbol;
      if (token !== "ETH" && token !== "WETH") {
        let tokenPrice = await getTokenEthPrice(
          token,
          res.last_sale.transaction.block_hash
        );
        asset.lastSale = Number(
          (
            parseFloat(web3.utils.fromWei(res.last_sale.total_price)) * tokenPrice
          ).toFixed(3)
        );
      } else {
        asset.lastSale = Number(
          parseFloat(web3.utils.fromWei(res.last_sale.total_price)).toFixed(3)
        );
      }
    } else {
      try {
        let res = (
          await axios(
            `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}?chain=eth&format=decimal`,
            { headers: { "X-API-Key": MORALIS_API_KEY } }
          )
        ).data;
        asset.lastSale = await getMintValue(res.block_number_minted, contract, tokenId)
      } catch (err) {
        console.log(err.message)
        return null
      }
    }
    return asset
  } catch (err) {
    console.log(err.message);
    return null
  }
}

const getTotalOfTraitType = (traits, type) => {
  return Object.values(traits[type]).reduce((prev, cur) => prev + cur)
}

export const getRarityRankData = async (contract, tokenId) => {
  let nfts = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${contract}?chain=eth&format=decimal`)
  let total = nfts.length
  // console.log(nfts)
  let traits = await getContractTraits(contract)
  let traitsTypes = Object.keys(traits)
  // console.log('traits', traits)
  let rarities = new Map()
  let countsOfTypes = new Map()
  for (let i = 0; i < nfts.length; i++) {
    let attributes
    if (nfts[i].metadata) {
      attributes = JSON.parse(nfts[i].metadata)?.attributes
    } else {
      attributes = await getAssetTraits(contract, nfts[i].token_id)
      if (!attributes) {
        continue
      }
    }
    countsOfTypes.set(attributes.length, (countsOfTypes.get(attributes.length) || 0) + 1)
  }
  for (let i = 0; i < nfts.length; i++) {
    // try {
    let rarity = 0
    let attributes
    if (nfts[i].metadata) {
      attributes = JSON.parse(nfts[i].metadata)?.attributes
    } else {
      attributes = await getAssetTraits(contract, nfts[i].token_id)
      if (!attributes) {
        continue
      }
    }
    // console.log(attributes)
    for (let j = 0; j < attributes.length; j++) {
      // console.log(attributes[j].trait_type, attributes[j].value)
      // console.log(traits[attributes[j].trait_type][attributes[j].value.toLowerCase()])
      rarity += total / traits[attributes[j].trait_type][attributes[j].value.toLowerCase()]
    }
    for (let j = 0; j < traitsTypes.length; j++) {
      if (!attributes.find(item => item.trait_type === traitsTypes[j])) {
        rarity += total / (total - getTotalOfTraitType(traits, traitsTypes[j]))
      }
    }
    rarity += total / countsOfTypes.get(attributes.length)
    // console.log(tokenIds[i], Math.round(rarity))
    rarities.set(nfts[i].token_id, rarity)
    // } catch (err) {
    //   console.log(i)
    //   console.log(err.message)
    // }
  }
  // console.log('rarities', rarities)

  rarities[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
  }

  rarities = [...rarities]
  // console.log('sort rarities', rarities)
  let ranks = rarities.map(item => item[0])
  let curRank = ranks.indexOf(tokenId)

  let prevTokenId = '', nextTokenId = ''
  if (curRank > 0) {
    prevTokenId = ranks[curRank - 1]
  }
  if (curRank < ranks.length - 1) {
    nextTokenId = ranks[curRank + 1]
  }

  let prevSold, nextSold
  if (prevTokenId) {
    let saleData = await getLastSalePrice(contract, prevTokenId)
    if (!saleData) {
      let mintBlock = nfts.find(nft => nft.token_id === prevTokenId)?.block_number_minted
      prevSold = await getMintValue(mintBlock, contract, prevTokenId)
    } else {
      prevSold = saleData.salePrice
    }
  }
  if (nextTokenId) {
    let saleData = await getLastSalePrice(contract, nextTokenId)
    if (!saleData) {
      let mintBlock = nfts.find(nft => nft.token_id === nextTokenId)?.block_number_minted
      nextSold = await getMintValue(mintBlock, contract, nextTokenId)
    } else {
      nextSold = saleData.salePrice
    }
  }

  return { rarity: curRank + 1, prevTokenId, prevSold, nextTokenId, nextSold }
}

export const getRarityRank = async (contract) => {
  let nfts = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${contract}?chain=eth&format=decimal`)
  let total = nfts.length
  // console.log(nfts)
  let traits = await getContractTraits(contract)
  if (!traits || Object.keys(traits).length === 0) {
    return null
  }
  let traitsTypes = Object.keys(traits)
  // console.log('traits', traits)
  let rarities = new Map()
  let countsOfTypes = new Map()
  for (let i = 0; i < nfts.length; i++) {
    let attributes
    if (nfts[i].metadata) {
      attributes = JSON.parse(nfts[i].metadata)?.attributes
    } else {
      attributes = await getAssetTraits(contract, nfts[i].token_id)
    }
    if (!attributes || attributes.length === 0) {
      continue
    }
    countsOfTypes.set(attributes.length, (countsOfTypes.get(attributes.length) || 0) + 1)
  }
  for (let i = 0; i < nfts.length; i++) {
    // try {
    let rarity = 0
    let attributes
    // if (nfts[i].metadata) {
    //   attributes = JSON.parse(nfts[i].metadata)?.attributes
    // } else {
    attributes = await getAssetTraits(contract, nfts[i].token_id)
    // }
    if (!attributes || attributes.length === 0) {
      continue
    }
    // console.log(attributes)
    for (let j = 0; j < attributes.length; j++) {
      // console.log(attributes[j].trait_type, attributes[j].value)
      // console.log(traits[attributes[j].trait_type][attributes[j].value.toLowerCase()])
      try {
        rarity += total / traits[attributes[j].trait_type][attributes[j].value.toString().toLowerCase()]
      } catch (err) {
        console.log(err.message)
        console.log('rarity', contract, nfts[i].token_id)
        console.log('attributes', j, attributes[j].value)
      }
    }
    for (let j = 0; j < traitsTypes.length; j++) {
      if (!attributes.find(item => item.trait_type === traitsTypes[j])) {
        rarity += total / (total - getTotalOfTraitType(traits, traitsTypes[j]))
      }
    }
    rarity += total / countsOfTypes.get(attributes.length)
    // console.log(tokenIds[i], Math.round(rarity))
    rarities.set(nfts[i].token_id, rarity)
    // } catch (err) {
    //   console.log(i)
    //   console.log(err.message)
    // }
  }
  // console.log('rarities', rarities)

  rarities[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
  }

  rarities = [...rarities]
  // console.log('sort rarities', rarities)
  let ranks = rarities.map(item => item[0])

  return ranks
}

const getAssetTraits = async (contract, tokenId) => {
  try {
    let asset = (
      await axios.get(
        `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/?include_orders=false`
      )
    ).data;
    return asset.traits
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

const getContractTraits = async (contract) => {
  try {
    let slug = (
      await axios.get(
        `https://api.opensea.io/api/v1/asset_contract/${contract}`
      )
    ).data.collection.slug;
    // console.log(slug)
    return (
      await axios.get(`https://api.opensea.io/api/v1/collection/${slug}`)
    ).data.collection.traits;
  } catch (err) {
    console.log(err.message);
    return null
  }
}

export const getActivities = async (contract, tokenId) => {
  let transactions = [];
  // try {
  ///////         NFT
  let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}/transfers?chain=eth&format=decimal`)

  for (let i = 0; i < txDatas.length; i++) {
    let transaction = {
      action: "",
      from: '',
      to: '',
      value: 0,
      fee: 0,
      net: 0,
      pl: 0,
      hash: "",
      block: 0,
      date: "",
      timeStamp: 0
    };
    transaction.from = txDatas[i].from_address
    transaction.to = txDatas[i].to_address
    transaction.date = new Date(txDatas[i].block_timestamp).yyyymmdd()
    transaction.timeStamp = (new Date(txDatas[i].block_timestamp)).getTime()

    /////       Set value and fee
    transaction.hash = txDatas[i].transaction_hash;
    transaction.block = Number(txDatas[i].block_number);
    let value_gas = await getGasAndValue(txDatas[i].transaction_hash);
    transaction.value = parseFloat(web3.utils.fromWei(txDatas[i].value));
    transaction.fee = value_gas.gas;
    ////    Set Action and Sell fee
    if (txDatas[i].from_address === "0x0000000000000000000000000000000000000000") {
      transaction.action = "MINT"
      transaction.from = contract
      let batchCount = await isBatchNFTTransaction(txDatas[i].block_number, txDatas[i].transaction_hash)
      transaction.value = transaction.value / batchCount
    } else {
      // let batchCount = await isBatchNFTTransaction(txDatas[i].block_number, txDatas[i].transaction_hash)
      // if (batchCount > 1) {
      //   let value = await getSaleValue(txDatas[i].block_number, txDatas[i].transaction_hash, contract, tokenId, txDatas[i].contract_type)
      //   if (value === null) {
      //     transaction.value = transaction.value / batchCount
      //   } else {
      //     transaction.value = value
      //   }
      // }
      let { buyValue } = await getSaleValue(txDatas[i].block_number, txDatas[i].transaction_hash, contract, tokenId, txDatas[i].contract_type, txDatas[i].from_address, txDatas[i].to_address)
      transaction.value = buyValue
      if (transaction.value) {
        transaction.action = "SALE";
      } else {
        transaction.action = "TRANSFER";
      }
    }
    transaction.value = Number(transaction.value.toFixed(3))
    transaction.fee = Number(transaction.fee.toFixed(3))
    transactions.push(transaction)
  }

  return transactions
}

const getSaleValue = async (blockNumber, txHash, contract, tokenId, type, seller, buyer) => {
  // console.log('getSaleValue', blockNumber, txHash, contract, tokenId, type, seller, buyer)
  let sellValue = 0, buyValue = 0
  blockNumber = `0x${Number(blockNumber).toString(16)}`;
  var data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: blockNumber,
        toBlock: blockNumber,
        maxCount: "0x3e8",
        excludeZeroValue: false,
        category: [type, "erc20", "internal"],
      },
    ],
  });
  var config = {
    method: "post",
    url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let txDatas = (await axios(config)).data.result.transfers;

  let nftTxs = txDatas.filter(tx => tx.hash.toLowerCase() === txHash.toLowerCase() && tx.rawContract.address?.toLowerCase() === contract.toLowerCase())

  let res = (
    await axios(
      `https://deep-index.moralis.io/api/v2/transaction/${txHash}?chain=eth`,
      { headers: { "X-API-Key": MORALIS_API_KEY } }
    )
  ).data;
  /////     Bid Sale
  if (res.from_address.toLowerCase() === seller.toLowerCase()) {
    ////  Buy value
    let buyTokenTx = txDatas.filter(tx => tx.hash.toLowerCase() === txHash.toLowerCase() && tx.from.toLowerCase() === buyer.toLowerCase() && (tx.category === 'internal' || tx.category === 'erc20'))
    if (buyTokenTx.length > 0) {
      if (buyTokenTx[0].asset !== "ETH" && buyTokenTx[0].asset !== "WETH") {
        let tokenPrice = await getTokenEthPrice(
          buyTokenTx[0].asset,
          Number(blockNumber)
        );
        buyValue = (buyTokenTx[0].value * tokenPrice);
      } else {
        buyValue = (buyTokenTx[0].value || 0);
      }
    }
    ////    Sell value
    let sellTokenTx = txDatas.filter(tx => tx.hash.toLowerCase() === txHash.toLowerCase() && tx.from.toLowerCase() === seller.toLowerCase() && (tx.category === 'internal' || tx.category === 'erc20'))
    if (sellTokenTx.length > 0) {
      if (sellTokenTx[0].asset !== "ETH" && sellTokenTx[0].asset !== "WETH") {
        let tokenPrice = await getTokenEthPrice(
          sellTokenTx[0].asset,
          Number(blockNumber)
        );
        sellValue = buyValue - (sellTokenTx[0].value * tokenPrice);
      } else {
        sellValue = buyValue - (sellTokenTx[0].value || 0);
      }
    }
    /////   Normal Sale
  } else {
    /// Sell value
    let sellTxs = txDatas.filter(tx => tx.hash.toLowerCase() === txHash.toLowerCase() && tx.to.toLowerCase() === seller.toLowerCase() && (tx.category === 'internal' || tx.category === 'erc20'))
    // let sellTxs = txDatas.filter(tx => tx.hash.toLowerCase() === txHash.toLowerCase() && (tx.category === 'internal' || tx.category === 'erc20'))
    if (sellTxs.length > 0) {
      if (sellTxs.length === 1) {
        if (sellTxs[0].asset !== "ETH" && sellTxs[0].asset !== "WETH") {
          let tokenPrice = await getTokenEthPrice(
            sellTxs[0].asset,
            Number(blockNumber)
          );
          sellValue = (sellTxs[0].value * tokenPrice) / nftTxs.length;
        } else {
          sellValue = (sellTxs[0].value || 0) / nftTxs.length;
        }
      } else {
        let index = 0
        for (index = 0; index < nftTxs.length; index++) {
          if (type === 'ERC721') {
            if (Number(nftTxs[index].erc721TokenId) === Number(tokenId)) {
              break
            }
          } else {
            if (Number(nftTxs[index].erc1155Metadata[0].tokenId) === Number(tokenId)) {
              break
            }
          }
        }
        // console.log('getsalevalue', index, sellTxs, nftTxs)
        if (sellTxs[index].asset !== "ETH" && sellTxs[index].asset !== "WETH") {
          let tokenPrice = await getTokenEthPrice(
            sellTxs[index].asset,
            Number(blockNumber)
          );
          sellValue = (sellTxs[index].value * tokenPrice);
        } else {
          sellValue = (sellTxs[index].value || 0);
        }
      }
    }
    /////   Buy value
    let buyTxs = txDatas.filter(tx => tx.hash.toLowerCase() === txHash.toLowerCase() && (tx.category === 'internal' || tx.category === 'erc20'))
    let openseaTxs = buyTxs.filter(tx => tx.to.toLowerCase() === OpenseaWallet.toLowerCase())
    let looksTxs = buyTxs.filter(tx => tx.to.toLowerCase() === LooksWallet.toLocaleLowerCase())
    let txCountsPerNFT
    if (openseaTxs.length > 0) {
      buyTxs = buyTxs.filter(tx => OpenseaWyvernExchange.map(item => item.toLowerCase()).indexOf(tx.from.toLowerCase()) >= 0)
      txCountsPerNFT = buyTxs.length / openseaTxs.length
    } else if (looksTxs.length > 0) {
      buyTxs = buyTxs.filter(tx => tx.to.toLowerCase() !== LooksExchange.toLowerCase() && tx.to.toLowerCase() !== WETH_ADDRESS.toLowerCase())
      txCountsPerNFT = buyTxs.length / looksTxs.length
    }
    if (buyTxs.length > 0) {
      if (buyTxs.length === txCountsPerNFT) {
        for (let i = 0; i < txCountsPerNFT; i++) {
          if (buyTxs[i].asset !== "ETH" && buyTxs[i].asset !== "WETH") {
            let tokenPrice = await getTokenEthPrice(
              buyTxs[i].asset,
              Number(blockNumber)
            );
            buyValue += (buyTxs[i].value * tokenPrice) / nftTxs.length;
          } else {
            buyValue += (buyTxs[i].value || 0) / nftTxs.length;
          }
        }
        console.log('buyValue-single', buyValue)
        console.log(nftTxs)
        console.log(buyTxs)
        console.log(txCountsPerNFT, blockNumber, txHash, contract, tokenId, type, seller, buyer)
      } else {
        let index = 0
        for (index = 0; index < nftTxs.length; index++) {
          if (type === 'ERC721') {
            if (Number(nftTxs[index].erc721TokenId) === Number(tokenId)) {
              break
            }
          } else {
            if (Number(nftTxs[index].erc1155Metadata[0].tokenId) === Number(tokenId)) {
              break
            }
          }
        }
        for (let i = 0; i < txCountsPerNFT; i++) {
          if (buyTxs[index * txCountsPerNFT + i].asset !== "ETH" && buyTxs[index * txCountsPerNFT + i].asset !== "WETH") {
            let tokenPrice = await getTokenEthPrice(
              buyTxs[index * txCountsPerNFT + i].asset,
              Number(blockNumber)
            );
            buyValue += (buyTxs[index * txCountsPerNFT + i].value * tokenPrice) / nftTxs.length;
          } else {
            buyValue += (buyTxs[index * txCountsPerNFT + i].value || 0) / nftTxs.length;
          }
        }
        // console.log('buyValue-multi', buyValue)
        // console.log(nftTxs)
        // console.log(buyTxs)
        // console.log(index, txCountsPerNFT, blockNumber, txHash, contract, tokenId, type, seller, buyer)
      }
    }
  }

  return { buyValue, sellValue }
}

const getLastBuyValueBefore = async (contract, tokenId, date) => {
  ///////         NFT
  let txDatas = await getFromMoralis(`https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}/transfers?chain=eth&format=decimal`)
  txDatas = txDatas.filter(tx => new Date(tx.block_timestamp).getTime() <= date.getTime())

  for (let i = 0; i < txDatas.length; i++) {
    /////       Set value and fee
    let value = parseFloat(web3.utils.fromWei(txDatas[i].value));
    ////    Set Action and Sell fee
    if (txDatas[i].from_address === "0x0000000000000000000000000000000000000000") {
      let batchCount = await isBatchNFTTransaction(txDatas[i].block_number, txDatas[i].transaction_hash)
      return {
        value: value / batchCount,
        block: txDatas[i].block_number
      }
    } else {
      // let batchCount = await isBatchNFTTransaction(txDatas[i].block_number, txDatas[i].transaction_hash)
      // if (batchCount > 1) {
      //   let value = await getSaleValue(txDatas[i].block_number, txDatas[i].transaction_hash, contract, tokenId, txDatas[i].contract_type)
      //   if (value === null) {
      //     transaction.value = transaction.value / batchCount
      //   } else {
      //     transaction.value = value
      //   }
      // }
      let { buyValue } = await getSaleValue(txDatas[i].block_number, txDatas[i].transaction_hash, contract, tokenId, txDatas[i].contract_type, txDatas[i].from_address, txDatas[i].to_address)
      if (buyValue) {
        return { value: buyValue, block: txDatas[i].block_number }
      }
    }
  }
  return { value: 0, block: '' }
}

export const getCollections = async () => {
  let collections = []
  let txDatas = await getFromBlockdaemon('https://ubiquity.api.blockdaemon.com/v1/nft/ethereum/mainnet/collections?')
  console.log(txDatas)
  for (let i = 0; i < txDatas.length; i++) {
    if (!txDatas[i].meta) {
      continue
    }
    if (i > 100) {
      break
    }
    let collection = {
      image: '',
      name: '',
      verified: false,
      marketCap: 0,
      oneDayVolume: 0,
      oneDayChange: 0,
      sevenDayVolume: 0,
      sevenDayChange: 0,
      thirtyDayVolume: 0,
      thirtyDayChange: 0,
      floorPrice: 0,
    }
    try {
      let slug = (
        await axios.get(
          `https://api.opensea.io/api/v1/asset_contract/${txDatas[i].contracts[0].address}`
        )
      ).data.collection.slug;
      console.log(i, slug)
      let res = (await axios.get(`https://api.opensea.io/api/v1/collection/${slug}`)).data.collection
      if (res.stats.total_volume < 500) {
        continue
      }
      let ethPrice = res.payment_tokens[0].usd_price
      collection.name = res.name
      collection.image = res.image_url
      collection.verified = res.safelist_request_status === 'verified'
      collection.floorPrice = Number(res.stats.floor_price.toFixed(3))
      collection.marketCap = Number((res.stats.market_cap * ethPrice).toFixed(2))
      collection.oneDayVolume = Number((res.stats.one_day_volume * ethPrice).toFixed(2))
      collection.oneDayChange = Number((res.stats.one_day_change * ethPrice).toFixed(2))
      collection.sevenDayVolume = Number((res.stats.seven_day_volume * ethPrice).toFixed(2))
      collection.sevenDayChange = Number((res.stats.seven_day_change * ethPrice).toFixed(2))
      collection.thirtyDayVolume = Number((res.stats.thirty_day_volume * ethPrice).toFixed(2))
      collection.thirtyDayChange = Number((res.stats.thirty_day_change * ethPrice).toFixed(2))

      collections.push(collection)
    } catch (err) {
      console.log(err.message);
    }
  }

  return collections
}

export const getCollectionNames = async () => {
  let txDatas = await getFromBlockdaemon('https://ubiquity.api.blockdaemon.com/v1/nft/ethereum/mainnet/collections?')
  console.log(txDatas)
  return txDatas.filter(item => item.logo && item.contracts[0]).map(item => ({ label: item.name, address: item.contracts[0], image:item.logo }))
}

export const getConvertData = async (contract, tokenId, currency) => {
  let asset = { image: '', name: '', tokenId: '', lastSaleEth: 0, lastSaleCurrency: 0, estimateValueEth: 0, estimateValueCurrency: 0 }
  try {
    let res = (
      await axios.get(
        `https://api.opensea.io/api/v1/asset/${contract}/${tokenId}/?include_orders=false`
      )
    ).data;
    // console.log(res)
    asset.image = res.image_url
    asset.name = res.asset_contract.name
    asset.tokenId = res.token_id

    if (res.last_sale) {
      let token = res.last_sale?.payment_token.symbol;
      if (token !== "ETH" && token !== "WETH") {
        let tokenPrice = await getTokenEthPrice(
          token,
          res.last_sale.transaction.block_hash
        );
        asset.lastSaleEth = Number(
          (
            parseFloat(web3.utils.fromWei(res.last_sale.total_price)) * tokenPrice
          ).toFixed(3)
        );
      } else {
        asset.lastSaleEth = Number(
          parseFloat(web3.utils.fromWei(res.last_sale.total_price)).toFixed(3)
        );
      }
    } else {
      try {
        let res = (
          await axios(
            `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}?chain=eth&format=decimal`,
            { headers: { "X-API-Key": MORALIS_API_KEY } }
          )
        ).data;
        asset.lastSaleEth = await getMintValue(res.block_number_minted, contract, tokenId)
      } catch (err) {
        console.log(err.message)
      }
    }
    let ethPrice = await getEthCurrencyPrice(currency)
    if (ethPrice > 0) {
      asset.lastSaleCurrency = ethPrice * asset.lastSaleEth
    }
    ///   get estimated price
    let mintBlock = 0
    try {
      let res = (
        await axios(
          `https://deep-index.moralis.io/api/v2/nft/${contract}/${tokenId}?chain=eth&format=decimal`,
          { headers: { "X-API-Key": MORALIS_API_KEY } }
        )
      ).data;
      mintBlock = res.block_number_minted
    } catch (err) {
      console.log(err.message)
    }
    let { buyPrice, avgPrice } = await getBuyPrevAvgPrice(
      mintBlock,
      contract,
      tokenId
    );
    // nfts[i].price = buyPrice;
    // nfts[i].prevAvg = avgPrice;
    console.log(buyPrice, avgPrice)
    let curAvg = await getCurAvgPrice(contract);
    let today = new Date()
    let timeStamp =
      Number((await web3.eth.getBlock(Number(mintBlock))).timestamp) * 1000;
    let mintDate = new Date(timeStamp)
    while (curAvg === 0 && today.getTime() >= mintDate.getTime()) {
      today.setDate(today.getDate() - 1)
      curAvg = await getAvgPrice(contract, today)
      // console.log(today.toString())
    }
    let floor = Number((await getFloorPrice(contract)).toFixed(3))
    console.log(curAvg, floor)

    if (avgPrice > 0) {
      asset.estimateValueEth = Number(
        ((curAvg / avgPrice) * buyPrice).toFixed(3)
      );
    } else {
      asset.estimateValueEth = Number(curAvg.toFixed(3));
    }
    if (asset.estimateValueEth < floor) {
      asset.estimateValueEth = floor
    }
    asset.estimateValueCurrency = ethPrice * asset.estimateValueEth
  } catch (err) {
    console.log(err.message)
  }
  return asset
}

