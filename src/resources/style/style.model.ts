import { Schema, model } from 'mongoose';
import { Style } from '@/resources/style/style.interface';

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

const StyleSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  tickers: [TickerSchema],
});

// const Style = model<Style>('Style', StyleSchema);
// Style.createIndexes({ name: 'text' });

export default model<Style>('Style', StyleSchema);
