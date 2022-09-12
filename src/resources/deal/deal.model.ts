import { Schema, model } from 'mongoose';
import { Deal } from '@/resources/deal/deal.interface';

const TickerSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    buyingPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const DealSchema = new Schema({
  description: {
    type: String,
    requied: true,
  },
  tickers: [TickerSchema],
});

export default model<Deal>('Deal', DealSchema);
