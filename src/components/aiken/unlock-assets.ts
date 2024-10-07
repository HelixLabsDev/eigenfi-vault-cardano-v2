"use client";
import {
  deserializeAddress,
  mConStr0,
  UTxO,
  stringToHex,
  BrowserWallet,
} from "@meshsdk/core";
import {
  getScript,
  getTxBuilder,
  getUtxoByTxHash,
  getWalletInfoForTx,
} from "./common";
import blueprint from "@/aiken-workspace/plutus.json";

export async function unlockAsset(
  scriptUtxo: UTxO,
  message: string,
  wallet: BrowserWallet
): Promise<string> {
  const { utxos, walletAddress, collateral } = await getWalletInfoForTx(wallet);
  const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
  const signerHash = deserializeAddress(walletAddress).pubKeyHash;

  const txBuilder = getTxBuilder();
  await txBuilder
    .spendingPlutusScript("V3")
    .txIn(
      scriptUtxo.input.txHash,
      scriptUtxo.input.outputIndex,
      scriptUtxo.output.amount,
      scriptUtxo.output.address
    )
    .txInScript(scriptCbor)
    .txInRedeemerValue(mConStr0([stringToHex(message)]))
    .txInDatumValue(mConStr0([signerHash]))
    .requiredSignerHash(signerHash)
    .changeAddress(walletAddress)
    .txInCollateral(
      collateral.input.txHash,
      collateral.input.outputIndex,
      collateral.output.amount,
      collateral.output.address
    )
    .selectUtxosFrom(utxos)
    .complete();
  return txBuilder.txHex;
}

export async function mainUnlock(wallet: BrowserWallet, depoHash: string) {
  const message = "Hello, World!";

  const utxo = await getUtxoByTxHash(depoHash);

  console.log("utxos", await wallet.getUtxos());

  if (utxo === undefined) throw new Error("UTxO not found");

  const unsignedTx = await unlockAsset(utxo, message, wallet);

  const signedTx = await wallet.signTx(unsignedTx);
  const txHash = await wallet.submitTx(signedTx);
  console.log("txHash", txHash);

  return txHash;
}
