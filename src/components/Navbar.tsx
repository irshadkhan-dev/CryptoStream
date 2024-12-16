import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import MaxwidthWrapper from "./MaxwidthWrapper";

const Navbar = () => {
  const NavItems = [
    {
      title: "Markets",
      link: "/",
    },
    {
      title: "Spot",
      link: "/trade/BTC_USDC",
    },
  ];
  return (
    <MaxwidthWrapper className="relative top-0  w-full">
      <div className="bg-gradient-to-r from-[#0e0f15] to-[#0e0f15]  text-white">
        <div className="flex flex-col justify-center items-center h-14">
          <div className="md:grid grid-cols-1 md:grid-cols-3 w-full gap-10">
            <div className="flex flex-row gap-10 items-center text-center col-span-1 max-md:hidden">
              <Link href={"/"} className="flex flex-row">
                <span className="font-semibold text-xl text-zinc-200 hover:text-zinc-100">
                  CryptoStream
                </span>
              </Link>
              {NavItems.map((item) => (
                <Link href={item.link} key={item.title}>
                  <span className="font-semibold text-base text-zinc-200 hover:text-zinc-100">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>

            <SearchBar />
          </div>
        </div>
      </div>
    </MaxwidthWrapper>
  );
};

export default Navbar;
