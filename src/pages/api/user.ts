import { depositCardano } from "@/lib/fetch/mutations";
import { getUser } from "@/lib/fetch/queries";
import type { NextApiRequest, NextApiResponse } from "next";

interface DepositRequestBody {
  address: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { address } = req.body as DepositRequestBody;
      const response = await getUser({ address });

      if (response.status === 200 || response.status === 201) {
        res.status(200).json({ data: response.data });
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
