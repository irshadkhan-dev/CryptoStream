import Carousel from "@/components/Carousel";

import CardSection from "@/components/CardSection";
import TableSection from "@/components/TableSection";

export default async function Home() {
  return (
    <>
      <Carousel />

      <CardSection />
      <TableSection />
    </>
  );
}
