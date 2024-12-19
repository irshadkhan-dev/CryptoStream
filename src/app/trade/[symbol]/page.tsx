import TradingView from "@/components/Chart";

import React from "react";

const page = async ({ params }: { params: Promise<{ symbol: string }> }) => {
  const SYMBOL = (await params).symbol;

  return (
    <div className="w-full px-4 md:px-8 mt-2">
      <div className=" bg-customDark h-[80vh] p-4 rounded-md">
        <TradingView symbol={SYMBOL} />
      </div>
    </div>
  );
};

export default page;
