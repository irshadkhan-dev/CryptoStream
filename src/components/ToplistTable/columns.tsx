"use client";

import { cn, formatLargeNumber } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

export type CryptoDatatype = {
  id: number;
  name: string;
  price: number;
  logoUrl: string;
  symbol: string;
  marketCap: number;
  hr24change: number;
  hr24PercenChange: number;
  day7change: number;
  day7PercenChange: number;
  day30change: number;
  day30PercentChange: number;
  link: string;
};

export const columns: ColumnDef<CryptoDatatype>[] = [
  {
    accessorKey: "name",
    header: () => {
      return <div className="flex flex-row py-3">Name</div>;
    },
    cell: ({ row }) => {
      const { logoUrl, symbol, name } = row.original;
      return (
        <Link href={`/trade/${symbol}`}>
          <div className="flex flex-row gap-1 items-end py-2.5">
            <Image
              src={logoUrl}
              alt="logo"
              height={50}
              width={50}
              className="rounded-full flex-shrink-0"
            />

            <div className="flex flex-col">
              <span className="font-semibold text-base">{name}</span>
              <span className="text-gray-400 text-xs">{symbol}</span>
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <button
          className="flex flex-row justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="w-4 h-4 flex-shrink-0" />
        </button>
      );
    },
    cell: ({ row }) => {
      const { price, symbol } = row.original;

      return (
        <Link href={`/trade/${symbol}`}>
          <div className="text-white flex flex-row font-semibold text-base">
            ${Math.floor(price * 100) / 100}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "marketCap",
    header: ({ column }) => {
      return (
        <button
          className="flex flex-row justify-center items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Market Cap
          <ArrowUpDown className="h-w w-4 flex-shrink-0" />
        </button>
      );
    },
    cell: ({ row }) => {
      const { marketCap, symbol } = row.original;

      return (
        <Link href={`/trade/${symbol}`}>
          <div className="text-white flex flex-row items-center justify-center font-bold text-base">
            {formatLargeNumber(marketCap)}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "hr24",
    header: () => {
      return <div className="flex flex-row justify-center">24-Hour Change</div>;
    },
    cell: ({ row }) => {
      const { hr24change, hr24PercenChange, symbol } = row.original;
      return (
        <Link href={`/trade/${symbol}`}>
          <div
            className={cn(
              "text-white flex flex-row items-center justify-center font-semibold text-base",
              {
                "text-green-500": hr24PercenChange > 0,
                "text-red-500": hr24PercenChange < 0,
                "text-white": hr24PercenChange === 0,
              }
            )}
          >
            {`$${Math.floor(hr24change * 100) / 100}(${
              Math.floor(hr24PercenChange * 100) / 100
            }%)`}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "day7",
    header: () => {
      return <div className="flex flex-row justify-center">7-Day Change</div>;
    },
    cell: ({ row }) => {
      const { day7change, day7PercenChange, symbol } = row.original;
      return (
        <Link href={`/trade/${symbol}`}>
          <div
            className={cn(
              "text-white flex flex-row items-center justify-center font-semibold text-base",
              {
                "text-green-500": day7PercenChange > 0,
                "text-red-500": day7PercenChange < 0,
                "text-white": day7PercenChange === 0,
              }
            )}
          >
            {`$${Math.floor(day7change * 100) / 100}(${
              Math.floor(day7PercenChange * 100) / 100
            }%)`}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "day30",
    header: () => {
      return <div className="flex flex-row justify-center">30-Day Change</div>;
    },
    cell: ({ row }) => {
      const { day30change, day30PercentChange, symbol } = row.original;
      return (
        <Link href={`/trade/${symbol}`}>
          <div
            className={cn(
              "text-white flex flex-row items-center justify-center font-semibold text-base",
              {
                "text-green-500": day30PercentChange > 0,
                "text-red-500": day30PercentChange < 0,
                "text-white": day30PercentChange === 0,
              }
            )}
          >
            {`$${Math.floor(day30change * 100) / 100}(${
              Math.floor(day30PercentChange * 100) / 100
            }%)`}
          </div>
        </Link>
      );
    },
  },
];
