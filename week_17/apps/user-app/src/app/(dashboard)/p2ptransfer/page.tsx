import React from "react";
import { SendCard } from "@repo/ui/sendcard";
import { p2pTransfer } from "@/app/lib/actions/p2pTransfer";
const P2ptransfer = () => {
  return <div className="w-full flex justify-center">
    <SendCard action={p2pTransfer}/>
  </div>;
};

export default P2ptransfer;
