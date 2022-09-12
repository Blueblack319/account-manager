import { Schema, model, Types } from 'mongoose';
import { Style } from '@/resources/style/style.interface';
import { DealSchema } from '@/resources/deal/deal.model';

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
  deals: [
    {
      type: Types.ObjectId,
      ref: 'Deal',
    },
  ],
});

// const Style = model<Style>('Style', StyleSchema);
// Style.createIndexes({ name: 'text' });

export default model<Style>('Style', StyleSchema);
