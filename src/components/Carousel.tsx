"use client";
import React, { useEffect, useState } from "react";
import MaxwidthWrapper from "./MaxwidthWrapper";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Carousel = () => {
  const [curNum, setCurNum] = useState<number>(1);
  const [img, setImg] = useState(`/home-banner-${curNum}.png`);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsFading(true);
    const fadeTimer = setInterval(() => {
      setImg(`/home-banner-${curNum}.png`);
      setIsFading(false);
    }, 500);

    return () => clearInterval(fadeTimer);
  }, [curNum]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurNum((cur) => (cur >= 2 ? cur - 1 : cur + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [curNum]);

  return (
    <MaxwidthWrapper className="relative">
      <div className="relative w-full overflow-hidden z-50">
        <Image
          src={img}
          alt="img"
          width={1500}
          height={1500}
          className={cn("rounded-lg transition duration-500", {
            "translate-x-6": isFading,
          })}
        />
      </div>
      <div className="absolute text-white z-[999] top-[40%] sm:top-[60%] left-10 md:left-20 max-w-xs md:max-w-md lg:max-w-2xl">
        <h1 className="font-semibold text-xl md:text-3xl lg:text-5xl text-zinc-200 ">
          CryptoStream: Stay in Sync with Real-Time Crypto Prices
        </h1>
      </div>
    </MaxwidthWrapper>
  );
};

export default Carousel;
