import {
  Asset,
  BrowserWallet,
  deserializeAddress,
  mConStr0,
} from "@meshsdk/core";
import { getScript, getTxBuilder, getWalletInfoForTx } from "./common";
import blueprint from "@/aiken-workspace/plutus.json";

export async function lockAsset(
  assets: Asset[],
  wallet: BrowserWallet
): Promise<string> {
  const { utxos, walletAddress } = await getWalletInfoForTx(wallet);
  const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);

  const signerHash = deserializeAddress(walletAddress).pubKeyHash;

  const txBuilder = getTxBuilder();
  await txBuilder
    .txOut(scriptAddr, assets)
    .txOutDatumHashValue(mConStr0([signerHash]))
    .changeAddress(walletAddress)
    .selectUtxosFrom(utxos)
    .complete();
  return txBuilder.txHex;
}

export async function mainLock(wallet: BrowserWallet, amount: string) {
  const assets: Asset[] = [
    {
      unit: "lovelace",
      quantity: amount,
    },
  ];

  const unsignedTx = await lockAsset(assets, wallet);
  const signedTx = await wallet.signTx(unsignedTx);
  const txHash = await wallet.submitTx(signedTx);

  return txHash;
}
