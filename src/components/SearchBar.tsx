import React from "react";
import { Search, Slash } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const SearchBar = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            tabIndex={0}
            className="w-full flex flex-row items-center bg-customSearchColor rounded-md px-4 focus-within:border-blue-500 border border-customSearchColor"
          >
            <Search className="h-4 w-4 flex-shrink-0 text-white" />
            <div className="w-full">
              <Input
                list="crypto"
                placeholder="Search market"
                type="text"
                className="outline-none border-none focus-visible:ring-0 w-full"
              />
            </div>

            <div className="rounded-lg border border-gray-400 px-2">
              <Slash className="h-w w-4 flex-shrink-0 text-gray-400" />
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-slate-950/10 w-[27rem] outline-none text-white border border-gray-600">
          <DropdownMenuGroup className="">
            <DropdownMenuItem className="hover:bg-customSearchColor rounded-sm p-3 outline-none">
              BTC
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-customSearchColor rounded-sm p-3 outline-none">
              BTC
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-customSearchColor rounded-sm p-3 outline-none">
              BTC
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SearchBar;
