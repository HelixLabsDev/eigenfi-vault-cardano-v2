import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown } from "lucide-react";

export function CardWithBridge() {
  return (
    <Card className="max-w-[464px] w-full rounded-3xl">
      <CardHeader>
        <CardTitle className="text-sm">Swap</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2 relative">
              <div className="relative">
                <div className="absolute top-2 left-2 text-sm text-muted-foreground/50">
                  You pay
                </div>
                <Input
                  id="pay"
                  placeholder="0"
                  className="bg-white/5 border-0 focus-visible:ring-offset-0 focus-visible:ring-[0.2px] h-[120px] py-[40px] text-[32px] pe-[80px]"
                />
                <Select defaultValue="ada">
                  <SelectTrigger
                    id="framework"
                    className="absolute top-1/4 w-22 right-2"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="ada">ADA</SelectItem>
                    <SelectItem value="xrp">XRP</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute bottom-3 left-2 text-sm text-muted-foreground">
                  $123123123
                </div>
                <div className="absolute bottom-3 right-3 text-sm text-muted-foreground flex gap-2">
                  <Button size={"xs"} disabled>
                    1/4
                  </Button>
                  <Button size={"xs"} disabled>
                    1/2
                  </Button>
                  <Button size={"xs"} disabled>
                    max
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-center bg-black w-8 h-8 items-center rounded-sm absolute -top-4 left-[48%]">
                  <ArrowDown className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="absolute top-2 left-2 text-sm text-muted-foreground/50">
                  You recieve
                </div>
                <Input
                  id="pay"
                  placeholder="0"
                  className="bg-white/5 border-0 focus-visible:ring-offset-0 focus-visible:ring-[0.2px] h-[120px] py-[40px] text-[32px] pe-[80px]"
                />
                <Select defaultValue="">
                  <SelectTrigger
                    id="framework"
                    className="absolute top-1/3 w-22 right-2"
                  >
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="arb">ARB</SelectItem>
                    <SelectItem value="weth">WETH</SelectItem>
                    <SelectItem value="1inch">1nch</SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute bottom-3 left-2 text-sm text-muted-foreground">
                  $12312
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="">
        <Button className="w-full" variant={"gradient"}>
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
}
