"use client";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function CardWithStack() {
  const [stake, setStake] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<string>("stake");

  return (
    <Card className="max-w-[464px] w-full rounded-3xl">
      <CardHeader>
        <CardTitle className="text-sm">Stake</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div>
          <Tabs
            defaultValue="stake"
            className="max-w-[400px] w-full"
            onValueChange={setTab}
          >
            <TabsList className="justify-between w-full md:w-[400px]">
              <TabsTrigger value="stake">Stake</TabsTrigger>
              <TabsTrigger value="mint">Mint</TabsTrigger>
              <TabsTrigger value="unstake">UnStake</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="stake" className="">
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2 relative">
                      <div className="relative">
                        <div className="absolute top-2 left-2 text-sm text-muted-foreground/50">
                          Amount
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
                            <SelectItem value="ada">ADA</SelectItem>
                            <SelectItem value="hstAda">hstADA</SelectItem>
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
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="mint" className="sm:w-[400px] w-full">
                <div className="flex justify-between items-center">
                  <div>Record</div>
                  <Select defaultValue="mintable">
                    <SelectTrigger id="framework" className="w-22">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="mintable">Mintable</SelectItem>
                      <SelectItem value="minted">Minted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-20 text-center flex justify-center items-center">
                  No Data
                </div>
              </TabsContent>
              <TabsContent value="unstake" className="">
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-2 relative">
                      <div className="relative">
                        <div className="absolute top-2 left-2 text-sm text-muted-foreground/50">
                          Amount
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
                            <SelectItem value="ada">ADA</SelectItem>
                            <SelectItem value="hstAda">hstADA</SelectItem>
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
                    </div>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="withdraw" className="sm:w-[400px] w-full">
                <div className="flex justify-between items-center">
                  <div>Record</div>
                  <Select defaultValue="withdrawable">
                    <SelectTrigger id="framework" className="w-22">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="withdrawable">Withdrawable</SelectItem>
                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-20 text-center flex justify-center items-center">
                  No Data
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter
        className={cn(tab !== "stake" && tab !== "unstake" && "hidden")}
      >
        <Button
          className="w-full mx-0 md:mx-2"
          onClick={() => {
            // action here
          }}
        >
          Stake
        </Button>
      </CardFooter>
    </Card>
  );
}
