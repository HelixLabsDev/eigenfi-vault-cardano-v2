import {
  Address,
  PPubKeyHash,
  PScriptContext,
  PaymentCredentials,
  Script,
  bool,
  bs,
  compile,
  makeValidator,
  pfn,
} from "@harmoniclabs/plu-ts";

const helloPluts = pfn(
  [PPubKeyHash.type, bs, PScriptContext.type],
  bool
)((owner, message, ctx) => {
  const isBeingPolite = message.eq("EigenFi - Cardano");
  const signedByOwner = ctx.tx.signatories.some(owner.eq);
  return isBeingPolite.and(signedByOwner);
});

///////////////////////////////////////////////////////////////////
// ------------------------------------------------------------- //
// ------------------------- utilities ------------------------- //
// ------------------------------------------------------------- //
///////////////////////////////////////////////////////////////////

export const untypedValidator = makeValidator(helloPluts);

export const compiledContract = compile(untypedValidator);

export const script = new Script("PlutusScriptV2", compiledContract);

// export const stakeWallet = Address.fromString(
//   "addr_test1qrhdwczd50mtpgsgpfcw44v3jjnn0hqj98sjy3297m80lf0y0c3hpql0kfvv5ft4eavqyywvn9jl0m7s020k49gphpasg90m0m"
// );

// export const scriptTestnetAddrWithStake = new Address(
//   "testnet",
//   PaymentCredentials.script(script.hash),
//   stakeWallet.stakeCreds
// );

export const scriptTestnetAddr = new Address(
  "testnet",
  PaymentCredentials.script(script.hash)
);
