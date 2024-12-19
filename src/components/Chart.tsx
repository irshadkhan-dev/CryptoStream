"use client";

import React, { useEffect, useRef } from "react";

function TradingViewWidget({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = "";

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: symbol,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        hide_legend: "true",
        withdateranges: true,
        hide_side_toolbar: false,
        details: true,
        hotlist: true,
        allow_symbol_change: true,
        calendar: false,

        support_host: "https://www.tradingview.com",
      });

      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div
      ref={container}
      style={{ height: "100%", width: "100%" }}
      className="tradingview-widget-container"
    />
  );
}

export default TradingViewWidget;
