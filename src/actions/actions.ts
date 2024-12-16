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
  console.log(process.env.API_KEY);
  const baseUrl = "https://data-api.ccdata.io/asset/v1/top/list";
  const params = {
    page: 1,
    sort_by: `${sortBy}`,
    sort_direction: "DESC",
    groups: "ID,BASIC,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK",
    toplist_quote_asset: "USD",
    asset_type: "BLOCKCHAIN",
    page_size: 50,
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
