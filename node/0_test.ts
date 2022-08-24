import { CosmWasmClient, SigningCosmWasmClient, Secp256k1HdWallet, GasPrice } from "cosmwasm";

import * as fs from 'fs';
import axios from 'axios';


const rpcEndpoint = "https://rpc.uni.juno.deuslabs.fi";

const config = {
    chainId: "uni-3",
    rpcEndpoint: rpcEndpoint,
    prefix: "juno",
};

const whitelist_wasm = fs.readFileSync("../artifacts/cw1_whitelist.wasm");
const nft_wasm = fs.readFileSync("../artifacts/nft.wasm");

const mnemonic =
    "test peanut elevator motor proud globe obtain gasp sad balance nature ladder";

describe("Cosmwasm Template Tests", () => {
    xit("Generate Wallet", async () => {
        let wallet = await Secp256k1HdWallet.generate(12);
        console.log(wallet.mnemonic);
    });

    xit("Get Testnet Tokens", async () => {
        let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'juno' });
        //console.log(await wallet.getAccounts());
        try {
            let res = await axios.post("https://faucet.uni.juno.deuslabs.fi/credit", { "denom": "ujunox", "address": "juno10c3slrqx3369mfsr9670au22zvq082jaej8ve4" });
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }).timeout(10000);

    xit("Send Testnet Tokens", async() => {

    }).timeout(50000);

    //same as
    //junod tx wasm store artifacts/cw1_whitelist.wasm --from wallet --node https://rpc.uni.juno.deuslabs.fi --chain_id=uni-3 --gas-price=0.025ujunox --gas auto
    xit("Upload code to testnet", async () => {
        let gas = GasPrice.fromString("0.025ujunox");
        let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'juno' });
        let client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {gasPrice:gas});
        let res = await client.upload("juno10c3slrqx3369mfsr9670au22zvq082jaej8ve4", whitelist_wasm, "auto");
        //calculateFee()
        //console.log(JSON.stringify(res.logs[0].events));
    }).timeout(50000);

    xit("Instantiate code on testnet", async() => {
        let gas = GasPrice.fromString("0.025ujunox");
        let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'juno' });
        let client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {gasPrice:gas});
        let res = await client.instantiate("juno10c3slrqx3369mfsr9670au22zvq082jaej8ve4", 3019, {admins:["juno10c3slrqx3369mfsr9670au22zvq082jaej8ve4"], mutable:false}, "whitelist", "auto");
        console.log(res);
        ///client.execute("juno10c3slrqx3369mfsr9670au22zvq082jaej8ve4", "", )
    }).timeout(20000);

    xit("Instantiate NFT contract", async() => {

    }).timeout(50000);

    xit("Execute a mint on testnet", async() => {
        let gas = GasPrice.fromString("0.025ujunox");
        let wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'juno' });
        let client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {gasPrice:gas});
        let res = await client.execute("juno10c3slrqx3369mfsr9670au22zvq082jaej8ve4", "juno10c3slrqx3369mfsr9670au22zvq082jaej8ve4",
            {}, "auto");
    });



});