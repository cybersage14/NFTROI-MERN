const axios = require('axios')

const MORALIS_API_KEY =
    "x29qh1Ff7AhQjVSBkcIQfLfdX3K8CbI4fLx3LRmECWyp38iaeAodJtPfcujskFO6";
const CRYPTO_API_KEY =
    "08881311aee8c5185058a0c6e36eb660290707f496e676fe1a1c786a0bde488f";
const BLOCKDAEMON_API_KEY = 'Bearer bd1bsGtR43n0NFm9XZdjjxv9JeZBBRvMA8groDJXcYETcQP'

exports.getFromMoralis = async (url) => {
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

exports.getFromBlockdaemon = async (url) => {
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

exports.getTokenEthPrice = async (token, blockOrHash) => {
    let timeStamp = Number((await web3.eth.getBlock(blockOrHash)).timestamp);
    console.log('token', token, blockOrHash)
    let tokenPrice = (
      await axios.get(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${token}&tsym=ETH&limit=1&aggregate=1&toTs=${timeStamp}&api_key=${CRYPTO_API_KEY}`
      )
    ).data.Data?.Data[0];
    return (tokenPrice.high + tokenPrice.low) / 2;
  };