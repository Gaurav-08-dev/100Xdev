"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnrampTransaction } from "../lib/actions/createOnrampTransactions";
const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [selectedBank, setSelectedBank] = useState(SUPPORTED_BANKS[0]);
  const [amount, setAmount] = useState(0);

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setAmount(Number(val));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          title="Banks"
          onSelect={(value) => {
            setSelectedBank(SUPPORTED_BANKS.find((x) => x.name === value));
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () =>
              await createOnrampTransaction(selectedBank?.name || '', amount)
            }
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
