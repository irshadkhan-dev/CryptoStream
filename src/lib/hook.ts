"use client";
import { getNewCryptoCurrency } from "@/actions/actions";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
export const useNewCryptoData = () => {
  return useQuery({
    queryKey: ["newCrypto"],
    queryFn: getNewCryptoCurrency,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
