"use client";
import React from "react";
import MaxwidthWrapper from "./MaxwidthWrapper";
import { DataTable } from "./ToplistTable/data-table";
import { columns } from "./ToplistTable/columns";
import { useQuery } from "@tanstack/react-query";
import { GetTopCryptoList } from "@/actions/actions";

const TableSection = () => {
  const { data } = useQuery({
    queryKey: ["TopCryptoList"],
    queryFn: GetTopCryptoList,
  });
  return (
    <MaxwidthWrapper className="mt-10">
      <DataTable columns={columns} data={data || []}></DataTable>
    </MaxwidthWrapper>
  );
};

export default TableSection;
