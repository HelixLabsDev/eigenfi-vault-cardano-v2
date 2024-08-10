import CardWithAbout from "@/components/common/about-card";
import { CardWithStack } from "@/components/common/stack-card";
import { useState } from "react";

export default function Bridge() {
  const [refetch, setRefetch] = useState(false);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-8 animate-in-reverse">
      <CardWithStack setRefetch={setRefetch} />
      <CardWithAbout refetch={refetch} />
    </div>
  );
}
