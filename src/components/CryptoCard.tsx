"use client";

import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const CryptoCard = ({
  title,
  data,
}: {
  title: string;
  data: {
    id: number;
    symbol: string;
    logoUrl: string;
    last24hourChange: number;
    priceUsd: number;
  }[];
}) => {
  return (
    <div className="text-white rounded-md bg-gray-950/[0.8] sm:w-96 px-6 py-6">
      <h1 className="text-base text-zinc-200 font-semibold">{title}</h1>
      <div className="flex flex-col space-y-5 mt-4">
        {data.map((item, index) => {
          if (index > 4) return null;
          return (
            <Link key={item?.id} href={"/"}>
              <div className="flex flex-row justify-between gap-4 items-center">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src={item?.logoUrl}
                    alt="crypto logo"
                    width={30}
                    height={30}
                    className="rounded-full flex-shrink-0"
                  />
                  <span className="text-base text-zinc-200 font-medium">
                    {item?.symbol}
                  </span>
                </div>

                <span className="text-base text-zinc-200">
                  ${Math.floor(item.priceUsd * 1000) / 100 || "-"}
                </span>
                <span
                  className={cn("text-base", {
                    "text-red-500": item.last24hourChange < 0,

                    "text-green-500": item.last24hourChange > 0,
                  })}
                >
                  {Math.floor(item.last24hourChange * 1000) / 1000 || "-"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoCard;
