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

export const scriptTestnetAddr = new Address(
  "mainnet",
  PaymentCredentials.script(script.hash)
);
