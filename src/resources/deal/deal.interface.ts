interface Ticker {
  ticker: string;
  buying: boolean;
  count: number;
  price: number;
}

interface Deal {
  description: string;
  tickers: Ticker[];
}

export { Ticker, Deal };
