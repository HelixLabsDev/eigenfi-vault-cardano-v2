import {
  BlockfrostProvider,
  BrowserWallet,
  MeshTxBuilder,
  serializePlutusScript,
  UTxO,
} from "@meshsdk/core";
import { applyParamsToScript } from "@meshsdk/core-csl";

export const blockfrost_api_key =
  process.env.BLOCKFROST_API_KEY || "preprodZezmt75yRNhTLacmA5drlIWZUzxNPfCl";

const blockchainProvider = new BlockfrostProvider(blockfrost_api_key);

export async function getWalletInfoForTx(wallet: BrowserWallet) {
  const utxos = await wallet.getUtxos();
  const collateral = (await wallet.getCollateral())[0];
  const walletAddress = await wallet.getChangeAddress();

  if (!utxos || utxos?.length === 0) {
    throw new Error("No utxos found");
  }
  if (!collateral) {
    throw new Error("No collateral found");
  }
  if (!walletAddress) {
    throw new Error("No wallet address found");
  }
  return { utxos, walletAddress, collateral };
}

export function getScript(
  blueprintCompiledCode: string,
  params: string[] = [],
  version: "V1" | "V2" | "V3" = "V3"
) {
  const scriptCbor = applyParamsToScript(blueprintCompiledCode, params);

  const scriptAddr = serializePlutusScript(
    { code: scriptCbor, version: version },
    undefined,
    0
  ).address;

  return { scriptCbor, scriptAddr };
}

export function getTxBuilder() {
  return new MeshTxBuilder({
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
  });
}

export async function getUtxoByTxHash(txHash: string): Promise<UTxO> {
  const utxos = await blockchainProvider.fetchUTxOs(txHash);
  if (utxos.length === 0) {
    throw new Error("UTxO not found");
  }
  return utxos[0];
}
