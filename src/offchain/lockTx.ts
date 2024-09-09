import {
  Value,
  DataB,
  Address,
  Tx,
  StakeCredentials,
  Hash28,
} from "@harmoniclabs/plu-ts";
import { BlockfrostPluts } from "@harmoniclabs/blockfrost-pluts";
import { BrowserWallet, checkSignature, generateNonce } from "@meshsdk/core";
import { scriptTestnetAddrWithStake } from "../contracts/helloPluts";
import { toPlutsUtxo } from "./mesh-utils";
import getTxBuilder from "./getTxBuilder";

async function getLockTx(
  wallet: BrowserWallet,
  Blockfrost: BlockfrostPluts,
  amount: number
): Promise<Tx> {
  // creates an address form the bech32 form
  const myAddr = Address.fromString(await wallet.getChangeAddress());
  console.log("myAddr: ", myAddr);

  // const scriptHash = Address.fromString(
  //   "addr_test1wzsqtkns0vgjvr34fx0fpszxj2957w0tq6gd4842ls56mqcjyyxzu"
  // ).paymentCreds.hash;

  // const frankenAddress = new Address(
  //   myAddr.network,
  //   myAddr.paymentCreds,
  //   new StakeCredentials("script", new Hash28(scriptHash))
  // );

  const txBuilder = await getTxBuilder(Blockfrost);
  const myUTxOs = (await wallet.getUtxos()).map(toPlutsUtxo);

  if (myUTxOs.length === 0) {
    throw new Error("have you requested founds from the faucet?");
  }

  const utxo = myUTxOs.find((u) => u.resolved.value.lovelaces > 15_000_000);

  if (utxo === undefined) {
    throw new Error("not enough ada");
  }

  return txBuilder.buildSync({
    inputs: [{ utxo }],
    outputs: [
      {
        // output holding the founds that we'll spend later
        address: scriptTestnetAddrWithStake,
        value: Value.lovelaces(amount * 1e6),
        // remeber to include a datum
        datum: new DataB(myAddr.paymentCreds.hash.toBuffer()),
      },
    ],
    changeAddress: myAddr,
  });
}

export async function lockTx(
  wallet: BrowserWallet,
  projectId: string,
  amount: number
): Promise<string> {
  const Blockfrost = new BlockfrostPluts({ projectId });
  const unsingedTx = await getLockTx(wallet, Blockfrost, amount);

  const txStr = await wallet.signTx(unsingedTx.toCbor().toString());

  return await Blockfrost.submitTx(txStr);
}
