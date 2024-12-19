import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import MaxwidthWrapper from "./MaxwidthWrapper";

const Navbar = () => {
  return (
    <MaxwidthWrapper className="relative top-0 w-full">
      <div className="bg-customNav text-white">
        <div className="flex flex-row justify-between items-center py-2 max-w-3xl gap-10">
          <div className="flex flex-row gap-6">
            <Link href={"/"}>
              <span className="sm:text-xl text-lg font-semibold">
                CryptoStream
              </span>
            </Link>

            <Link href={"/trade/BTC"} className="hidden md:flex">
              <span className="text-lg font-semibold">Markets</span>
            </Link>
          </div>

          <SearchBar />
        </div>
      </div>
    </MaxwidthWrapper>
  );
};

export default Navbar;
