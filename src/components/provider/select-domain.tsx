import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEthereum, FaBtc } from "react-icons/fa6";
import { SiBinance, SiCardano } from "react-icons/si";

export default function SelectDomain() {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    const selectedDomain = domains
      .flatMap((category) => category.items)
      .find((item) => item.name === value);
    if (selectedDomain?.link) {
      router.push(selectedDomain.link);
    }
  };

  return (
    <div>
      <Select defaultValue="Cardano" onValueChange={handleValueChange}>
        <SelectTrigger className="w-[150px] focus-visible:ring-0 flex">
          <SelectValue placeholder="Select a domain" />
        </SelectTrigger>
        <SelectContent>
          {domains.map((domain) => (
            <SelectGroup key={domain.category}>
              <SelectLabel>{domain.category}</SelectLabel>
              {domain.items.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  <div className="flex items-center gap-1.5">
                    {item.icon} {item.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

const domains = [
  {
    category: "EVM",
    items: [
      {
        id: 1,
        name: "Ethereum",
        link: "https://ethereum.eigenfi.io",
        icon: <FaEthereum />,
      },
      {
        id: 3,
        name: "BNB Chain",
        link: "https://bnb.eigenfi.io",
        icon: <SiBinance className="w-4 h-4" />,
      },
      {
        id: 4,
        name: "BitLayer",
        link: "https://bitlayer.eigenfi.io/",
        icon: <FaBtc className="w-4 h-4" />,
      },
    ],
  },
  {
    category: "Non EVM",
    items: [
      {
        id: 2,
        name: "Cardano",
        link: "https://cardano.eigenfi.io",
        icon: <SiCardano className="w-4 h-4" />,
      },
    ],
  },
];
