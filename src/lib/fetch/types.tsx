export type DepositCardano = {
  endpoint: string;
  variables: {
    address: string;
    hash: string;
    amount: number;
  };
  body: {
    id: number;
    address: string;
    points: number;
    utxos: { hash: string; amount: number }[];
  };
};

export type WithdrawCardano = {
  endpoint: string;
  variables: {
    address: string;
    hash: string;
  };
  body: {
    id: number;
    address: string;
    points: number;
    utxos: { hash: string; amount: number }[];
  };
};

export type GetUser = {
  endpoint: string;
  query: string;
  body: {
    id: number;
    address: string;
    points: number;
    utxos: { hash: string; amount: number }[];
  };
};
