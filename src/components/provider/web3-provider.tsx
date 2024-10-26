import { MeshProvider } from "@meshsdk/react";

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MeshProvider>{children}</MeshProvider>;
}
