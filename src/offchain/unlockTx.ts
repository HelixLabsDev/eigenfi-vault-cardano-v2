import { Address, isData, DataB, Tx, UTxO, Value } from "@harmoniclabs/plu-ts";
import { fromAscii, uint8ArrayEq } from "@harmoniclabs/uint8array-utils";
import { BlockfrostPluts } from "@harmoniclabs/blockfrost-pluts";
import { BrowserWallet } from "@meshsdk/core";
import { script, scriptTestnetAddr } from "../contracts/helloPluts";
import { toPlutsUtxo } from "./mesh-utils";
import getTxBuilder from "./getTxBuilder";

async function getUnlockTx(
  wallet: BrowserWallet,
  Blockfrost: BlockfrostPluts
): Promise<Tx> {
  const txBuilder = await getTxBuilder(Blockfrost);
  const myAddrs = (await wallet.getUsedAddresses()).map(Address.fromString);
  const myUTxOs = (await wallet.getUtxos()).map(toPlutsUtxo);

  let myAddr!: Address;

  const utxosFromBlockfrost = await Blockfrost.addressUtxos(
    scriptTestnetAddr.toJson()
  );

  const utxoToSpend = utxosFromBlockfrost.find((utxo: any) => {
    const datum = utxo.resolved.datum;

    if (isData(datum) && datum instanceof DataB) {
      const pkh = datum.bytes.toBuffer();
      const myPkhIdx = myAddrs.findIndex((addr) =>
        uint8ArrayEq(pkh, addr.paymentCreds.hash.toBuffer())
      );

      if (myPkhIdx < 0) return false;

      myAddr = myAddrs[myPkhIdx];
      return true;
    }

    return false;
  });

  if (utxoToSpend === undefined) {
    throw new Error(
      "Oops, are you sure your tx had enough time to get to the blockchain?"
    );
  }

  const txHash = utxoToSpend.utxoRef.id.toString(); // Assuming id is a Hash32 or similar type
  const index = utxoToSpend.utxoRef.index;

  if (!txHash || typeof txHash !== "string" || txHash.length !== 64) {
    throw new Error("Invalid transaction hash provided.");
  }
  if (typeof index !== "number" || index < 0) {
    throw new Error("Invalid index provided.");
  }

  return txBuilder.buildSync({
    inputs: [
      {
        utxo: utxoToSpend as UTxO,
        inputScript: {
          script,
          datum: "inline",
          redeemer: new DataB(fromAscii("Hello plu-ts")),
        },
      },
    ],
    requiredSigners: [myAddr.paymentCreds.hash],
    collaterals: [myUTxOs[0]],
    changeAddress: myAddr,
  });
}

export async function unlockTx(
  wallet: BrowserWallet,
  projectId: string
): Promise<string> {
  const Blockfrost = new BlockfrostPluts({ projectId });

  const unsignedTx = await getUnlockTx(wallet, Blockfrost);

  const txStr = await wallet.signTx(unsignedTx.toCbor().toString(), true);

  return await Blockfrost.submitTx(txStr);
}
