import { Schema, model, Types } from 'mongoose';
import { Deal } from '@/resources/deal/deal.interface';

const TickerSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    buying: {
      type: Boolean,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const DealSchema = new Schema({
  style: {
    type: Types.ObjectId,
    required: true,
    ref: 'Style',
  },
  description: {
    type: String,
    requied: true,
  },
  tickers: [TickerSchema],
});

export default model<Deal>('Deal', DealSchema);
