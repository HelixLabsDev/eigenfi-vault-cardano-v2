import { depositCardano, withdrawCardano } from "@/lib/fetch/mutations";
import type { NextApiRequest, NextApiResponse } from "next";
import { revalidateTag } from "next/cache";

interface DepositRequestBody {
  data: {
    address: string;
    hash: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { data } = req.body as DepositRequestBody;
      const response = await withdrawCardano({ ...data });

      if (response.status === 200 || response.status === 201) {
        res.status(200).json({ message: "Withdraw successful" });
        revalidateTag("/");
      } else {
        res
          .status(response.status ?? 500)
          .json({ message: response.error ?? "Error depositing" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
