import {
  Value,
  DataB,
  Address,
  Tx,
  StakeCredentials,
  Hash28,
} from "@harmoniclabs/plu-ts";
import { BlockfrostPluts } from "@harmoniclabs/blockfrost-pluts";
import { BrowserWallet } from "@meshsdk/core";
// import { scriptTestnetAddrWithStake } from "../contracts/helloPluts";
import { toPlutsUtxo } from "./mesh-utils";
import getTxBuilder from "./getTxBuilder";
import { scriptTestnetAddr } from "@/contracts/helloPluts";

async function getLockTx(
  wallet: BrowserWallet,
  Blockfrost: BlockfrostPluts,
  amount: number
): Promise<Tx> {
  // creates an address form the bech32 form
  const myAddr = Address.fromString(await wallet.getChangeAddress());

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
        address: scriptTestnetAddr,
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

  // const poolId = "poolimhww3q6d7qssj5j2add05r7cyx7znyswe2g6vd23anpx5sh6z8d";
  // const tx = new Transaction({ initiator: wallet });
  // tx.delegateStake(
  //   "stakeladzmavfdnxsn4a3hd57x435madswynt4hqw8n7f2pdq05g4995re",
  //   poolId
  // );

  const unsingedTx = await getLockTx(wallet, Blockfrost, amount);

  const txStr = await wallet.signTx(unsingedTx.toCbor().toString());

  return await Blockfrost.submitTx(txStr);
}

// function makeDelegationWithMyValidator() {
//   txBuilder.setCertificate(
//     makeDelegationCertificate(
//       "2a05c534817a0b97ce0c5a2354b6e35a067c52408fa70c77e0b5e378", // pool to delegate to

//       blockfrostQueryier // BlockchainQuerier to use to get data such as protocol-parameters
//     )
//   );

//   txBuilder.useStakeValidator(
//     new StakeValidator("cafebeef") // will take the validator serialized code as input
//   );

//   txBuilder.setRedeemer({
//     bytes: "2a05c534817a0b97ce0c5a2354b6e35a067c52408fa70c77e0b5e378",
//   });

//   return txBuilder.buildTransaction();
// }
