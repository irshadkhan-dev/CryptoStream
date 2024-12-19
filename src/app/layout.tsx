import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getNewCrypto, GetTopCryptoList } from "@/actions/actions";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoStream",
  description: "Created By Irshad",
  icons: { icon: "/bitcoin.png" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en" className="bg-customNav">
      <body className={recursive.className}>
        <Providers>
          <main className="h-screen w-full bg-customNav">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Navbar />
              {children}
            </HydrationBoundary>
          </main>
        </Providers>
      </body>
    </html>
  );
}
