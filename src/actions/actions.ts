"use server";

export const getNewCrypto = async (
  sortBy: string
): Promise<
  Array<{
    id: number;
    symbol: string;
    logoUrl: string;
    priceUsd: number;
    last24hourChange: number;
  }>
> => {
  const baseUrl = "https://data-api.ccdata.io/asset/v1/top/list";
  const params = {
    page: 1,
    sort_by: `${sortBy}`,
    sort_direction: "DESC",
    groups: "ID,BASIC,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK",
    toplist_quote_asset: "USD",
    asset_type: "BLOCKCHAIN",
    page_size: 10,
    api_key: process.env.API_KEY as string,
  };

  const queryParams = Object.entries(params).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: typeof value === "number" ? value.toString() : value,
    }),
    {}
  );

  const url = new URL(baseUrl);
  url.search = new URLSearchParams(queryParams).toString();

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the data");
  }

  const data = await response.json();
  const dataArray = data.Data.LIST as Array<any>;

  return dataArray.map((curItem) => ({
    id: curItem.ID,
    symbol: curItem.SYMBOL,
    logoUrl: curItem.LOGO_URL,
    priceUsd: curItem.PRICE_USD,
    last24hourChange: curItem.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
  }));
};

export const GetTopCryptoList = async (): Promise<
  Array<{
    id: number;
    name: string;
    symbol: string;
    price: number;
    logoUrl: string;
    marketCap: number;
    hr24change: number;
    hr24PercenChange: number;
    day7change: number;
    day7PercenChange: number;
    day30change: number;
    day30PercentChange: number;
    link: string;
  }>
> => {
  const baseUrl = "https://data-api.ccdata.io/asset/v1/top/list";

  const params = {
    page: 1,
    sort_by: "CIRCULATING_MKT_CAP_USD",
    sort_direction: "DESC",
    groups: "ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK",
    toplist_quote_asset: "USD",
    page_size: 50,
    asset_type: "BLOCKCHAIN",
    api_key: process.env.API_KEY as string,
  };

  const queryParams = Object.entries(params).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: typeof value === "number" ? value.toString() : value,
    }),
    {}
  );

  const url = new URL(baseUrl);
  url.search = new URLSearchParams(queryParams).toString();

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the data");
  }
  const data = await response.json();
  const dataArray = data.Data.LIST as Array<any>;

  return dataArray.map((item) => ({
    id: item.ID,
    name: item.NAME,
    link: `/trade/${item.SYMBOL}`,
    symbol: item.SYMBOL,
    price: item.PRICE_USD,
    logoUrl: item.LOGO_URL,
    marketCap: item.TOTAL_MKT_CAP_USD,
    hr24change: item.SPOT_MOVING_24_HOUR_CHANGE_USD,
    hr24PercenChange: item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD,
    day7change: item.SPOT_MOVING_7_DAY_CHANGE_USD,
    day7PercenChange: item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD,
    day30change: item.SPOT_MOVING_30_DAY_CHANGE_USD,
    day30PercentChange: item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD,
  }));
};
