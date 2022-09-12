interface Ticker {
  ticker: string;
  count: number;
  buyingPrice: number;
}

interface Deal {
  description: string;
  tickers: Ticker[];
}

export { Ticker, Deal };
