const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { ethers } = require('ethers')
const axios = require('axios')
const fetch = require('node-fetch')

const { getFromMoralis, getFromBlockdaemon } = require('./fetch')

const User = require('../../models/Wallet');

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
const OpenseaWyvernExchange = '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b'
const OpenseaWallet = '0x5b3256965e7c3cf26e11fcaf296dfc8807c01073'
const LooksExchange = '0x59728544b08ab483533076417fbbb2fd0b17ce3a'
const LooksWallet = '0x5924a28caaf1cc016617874a2f0c3710d881f3c1'

const OPENSEA_FEE = 0.025
const LOOKS_FEE = 0.02

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/nfts', async (req, res) => {
    let address = req.query.address
    console.log('address', address)
    try {
        let nfts, totalEstimatedPL = 0,
            totalHoldingValue = 0;
        nfts = await getFromMoralis(`https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`)

        console.log("nfts", nfts);

        for (let i = 0; i < nfts.length; i++) {
            console.log('nft:', i)
            try {
                // let asset = ( 
                //     await axios.get(
                //         `https://api.opensea.io/api/v1/asset/${nfts[i].token_address}/${nfts[i].token_id}/?include_orders=false`
                //     )
                // ).data;
                // console.log(res)
                // let response = await fetch(`https://api.opensea.io/api/v1/asset/${nfts[i].token_address}/${nfts[i].token_id}/?include_orders=false`)
                // let asset = await response.text()
                let asset = await (await fetch(`https://api.opensea.io/api/v1/asset/${nfts[i].token_address}/${nfts[i].token_id}/?include_orders=false`)).text()
                console.log('asset',asset)
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
        return res.json({ nfts, totalHoldingValue, totalEstimatedPL });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;