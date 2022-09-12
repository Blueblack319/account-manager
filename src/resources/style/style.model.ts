import { Schema, model } from 'mongoose';
import { Style } from '@/resources/style/style.interface';
import DealSchema from '@/resources/deal/deal.model';

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
  tickers: [DealSchema],
});

// const Style = model<Style>('Style', StyleSchema);
// Style.createIndexes({ name: 'text' });

export default model<Style>('Style', StyleSchema);
