import { helixFetch } from "@/lib/fetch";
import { DepositCardano, WithdrawCardano } from "../types";

export const depositCardano = async ({
  address,
  hash,
  amount,
}: {
  address: string;
  hash: string;
  amount: number;
}) => {
  const res = await helixFetch<DepositCardano>({
    endpoint: "deposit",
    variables: {
      address,
      hash,
      amount,
    },
    cache: "no-store",
  });

  return { data: res.body, error: res.error, status: res.status };
};

export const withdrawCardano = async ({
  address,
  hash,
}: {
  address: string;
  hash: string;
}) => {
  const res = await helixFetch<WithdrawCardano>({
    endpoint: "withdraw",
    variables: {
      address,
      hash,
    },
    cache: "no-store",
  });

  return { data: res.body, error: res.error, status: res.status };
};
