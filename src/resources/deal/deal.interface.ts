import { Types } from 'mongoose';

interface Ticker {
  ticker: string;
  buying: boolean;
  count: number;
  price: number;
}

interface Deal {
  style: Types.ObjectId;
  description: string;
  tickers: Ticker[];
}

export { Ticker, Deal };
