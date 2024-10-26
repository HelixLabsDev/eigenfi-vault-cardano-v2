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

export async function mainUnlock(wallet: BrowserWallet, hash: string) {
  const message = "EigenFi - Vault";

  const utxo = await getUtxoByTxHash(hash);

  if (utxo === undefined) throw new Error("UTxO not found");

  const unsignedTx = await unlockAsset(utxo, message, wallet);
  const signedTx = await wallet.signTx(unsignedTx, true);
  const txHash = await wallet.submitTx(signedTx);

  return txHash;
}
