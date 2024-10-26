import { helixFetch } from "@/lib/fetch";
import { DepositCardano } from "../types";

export const getUsers = async () => {
  try {
    const res = await helixFetch<DepositCardano>({
      method: "GET",
      endpoint: "",
      tags: ["users"],
    });

    return { data: res.body || { data: [] } };
  } catch (error) {
    console.error("Error in getUsers:", error);
    throw error;
  }
};

export const getUser = async ({ address }: { address: string }) => {
  try {
    const res = await helixFetch<DepositCardano>({
      method: "GET",
      endpoint: "",
      tags: ["user"],
      query: address,
    });

    return {
      data: res.body || { data: [] },
      status: res.status,
      error: res.error,
    };
  } catch (error) {
    console.error("Error in getUsers:", error);
    throw error;
  }
};
