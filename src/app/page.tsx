import { getNewCrypto, GetTopCryptoList } from "@/actions/actions";
import Carousel from "@/components/Carousel";

import TradingViewWidget from "@/components/Chart";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CardSection from "@/components/CardSection";
import TableSection from "@/components/TableSection";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["newCrypto"],
    queryFn: async () => await getNewCrypto("LAUNCH_DATE"),
  });

  await queryClient.prefetchQuery({
    queryKey: ["TopGainCrypto"],
    queryFn: async () =>
      getNewCrypto("SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD"),
  });

  await queryClient.prefetchQuery({
    queryKey: ["TopCryptoList"],
    queryFn: GetTopCryptoList,
  });

  return (
    <>
      <Carousel />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CardSection />
        <TableSection />
      </HydrationBoundary>
    </>
  );
}
