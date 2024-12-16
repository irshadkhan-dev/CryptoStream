"use client";
import React from "react";
import MaxwidthWrapper from "./MaxwidthWrapper";
import CryptoCard from "./CryptoCard";
import { useQuery } from "@tanstack/react-query";
import { getNewCrypto } from "@/actions/actions";

const CardSection = () => {
  const { data: newCryptoData } = useQuery({
    queryKey: ["newCrypto"],
    queryFn: async () => await getNewCrypto("LAUNCH_DATE"),
  });

  const { data: topGainCryptoData } = useQuery({
    queryKey: ["TopGainCrypto"],
    queryFn: async () =>
      getNewCrypto("SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD"),
  });

  return (
    <MaxwidthWrapper className="md:flex items-center justify-center mt-6">
      <div className="flex flex-col sm:flex-row gap-10">
        <CryptoCard title="NEW" data={newCryptoData || []} />
        <CryptoCard title="TOP GAINERS" data={topGainCryptoData || []} />
      </div>
    </MaxwidthWrapper>
  );
};

export default CardSection;
