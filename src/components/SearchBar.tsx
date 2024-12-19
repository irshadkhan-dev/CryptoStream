"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search, Slash } from "lucide-react";
import { Input } from "./ui/input";

import { cn, debounce } from "@/lib/utils";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetTopCryptoList } from "@/actions/actions";
import Link from "next/link";

const SearchBar = () => {
  const [activeSearchList, setActiveSearchList] = useState<boolean>(false);
  const searchListRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery({
    queryKey: ["TopCryptoList"],
    queryFn: GetTopCryptoList,
  });

  const [searchedCrypto, setSearchedCrypto] = useState(data ? data : []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const querySymbol = e.target.value.toUpperCase();
    const filteredData = data!.filter((item) =>
      item.symbol.includes(querySymbol)
    );
    setSearchedCrypto(filteredData);
  };

  const debounceInputHandleChange = useCallback(
    debounce(handleInputChange, 400),
    []
  );

  const handleOnclick = () => {
    setActiveSearchList(true);
  };

  const onHandleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        searchListRef.current &&
        !searchListRef.current.contains(event.target as Node)
      ) {
        setActiveSearchList(false);
      }
    },
    [setActiveSearchList]
  );

  useEffect(() => {
    document.addEventListener("mousedown", onHandleClickOutside);
    return () => {
      document.removeEventListener("mousedown", onHandleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center">
        <button
          className="flex flex-row items-center rounded-md px-4 focus-within:border-blue-500 border border-customSearchColor md:w-96"
          onClick={handleOnclick}
        >
          <Search className="h-4 w-4 flex-shrink-0 text-white" />
          <div className="w-full">
            <Input
              placeholder="Search market"
              type="text"
              className="outline-none border-none focus-visible:ring-0 w-full text-white"
              onChange={debounceInputHandleChange}
            />
          </div>

          <div className="rounded-lg border border-gray-400 px-2">
            <Slash className="h-w w-4 flex-shrink-0 text-gray-400" />
          </div>
        </button>

        {activeSearchList && (
          <div
            className={cn(
              `-z-10  rounded-xl flex  h-96 w-[12rem] sm:w-64 md:w-96 bg-customDark border border-gray-600 overflow-y-scroll scrollbar scrollbar-track-gray-700`,
              {
                "z-[999999] absolute top-12": activeSearchList,
                "-z-40": !activeSearchList,
              }
            )}
            ref={searchListRef}
          >
            <div className="flex flex-col space-y-4 w-full py-4">
              {searchedCrypto.map((item) => (
                <Link href={item.link} key={item.id} className="z-[999999]">
                  <div className="flex flex-row justify-between w-full hover:bg-gray-700 rounded-md px-4">
                    <div className="flex flex-row gap-2 items-center">
                      <Image
                        alt="logo"
                        src={item.logoUrl}
                        width={40}
                        height={40}
                        className="flex-shrink-0 rounded-full"
                      />
                      <span className="text-base text-zinc-200 font-semibold">
                        {item.symbol}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="sm:text-lg text-xs font-medium text-zinc-200 flex items-start">
                        {Math.floor(item.price * 100) / 100}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium flex justify-end w-full",
                          {
                            "text-red-500": item.hr24PercenChange < 0,
                            "text-green-500": item.hr24PercenChange > 0,
                          }
                        )}
                      >
                        {Math.floor(item.hr24PercenChange * 1000) / 1000}%
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
