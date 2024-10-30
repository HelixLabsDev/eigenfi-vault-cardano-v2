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
  return (
    <div>
      <Select
        defaultValue="Cardano"
        onValueChange={(value) =>
          domains.find((domain) => domain.name === value)?.link &&
          router.push(
            domains.find((domain) => domain.name === value)?.link ?? ""
          )
        }
      >
        <SelectTrigger className="w-[150px] focus-visible:ring-0 flex">
          <SelectValue placeholder="Select a domain" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Domains</SelectLabel>
            {domains.map((domain) => (
              <SelectItem key={domain.id} value={domain.name}>
                <div className="flex items-center gap-1.5">
                  {domain.icon} {domain.name}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

const domains = [
  {
    id: 1,
    name: "Ethereum",
    link: "https://eth.eigenfi.io",
    icon: <FaEthereum />,
  },
  {
    id: 2,
    name: "Cardano",
    link: "https://ada.eigenfi.io",
    icon: <SiCardano className="w-4 h-4" />,
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
    link: "https://btc.eigenfi.io",
    icon: <FaBtc className="w-4 h-4" />,
  },
];
