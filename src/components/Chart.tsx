"use client";
import React, { useEffect, useRef, memo } from "react";

const TradingViewWidget: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: "BTC",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        hide_legend: true,
        allow_symbol_change: true,
        calendar: false,
        support_host: "https://www.tradingview.com",
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};

export default memo(TradingViewWidget);
