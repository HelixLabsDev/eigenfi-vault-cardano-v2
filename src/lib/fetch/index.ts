import { ensureStartsWith } from "../utils";

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

const domain = process.env.HELIX_VAULT
  ? ensureStartsWith(process.env.HELIX_VAULT, "https://")
  : "https://helix-vault-abd3a5593d90.herokuapp.com/cardano/";

if (!domain) {
  throw new Error("HELIX_VAULT is not set or invalid");
}

console.log("domain", domain);

export async function helixFetch<T>({
  method = "POST",
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
  endpoint,
}: {
  method?: string;
  cache?: RequestCache;
  headers?: HeadersInit;
  query?: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
  endpoint: string;
}): Promise<{ status: number; body: T | null; error: string | null }> {
  try {
    const response = await fetch(
      `${domain}${endpoint}${query ? (endpoint ? `/${query}` : `${query}`) : ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: variables ? JSON.stringify(variables) : undefined,
        cache,
        ...(tags ? { next: { tags } } : {}),
      }
    );

    const responseBody = await response.json();

    if (!response.ok) {
      return {
        error: responseBody?.error || "Unknown error",
        body: responseBody.message,
        status: response.status,
      };
    }

    if (responseBody.error) {
      return {
        error: responseBody.error[0]?.message || "Unknown error",
        status: response.status,
        body: responseBody.message,
      };
    }

    return {
      status: response.status,
      body: responseBody,
      error: null,
    };
  } catch (error) {
    console.log("error", error);
    console.error("Error during fetch:", error);

    throw new Error(`Fetch error in helixFetch: ${error}`);
  }
}
