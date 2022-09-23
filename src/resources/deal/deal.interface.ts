import { Types } from 'mongoose';

interface Ticker {
  ticker: string;
  isBuying: boolean;
  count: number;
  price: number;
}

interface Deal {
  style: Types.ObjectId;
  description: string;
  totalPrice: number;
  tickers: Ticker[];
}

interface CreateDealInput {
  description: string;
  tickers: Ticker[];
}

export { Ticker, Deal, CreateDealInput };
