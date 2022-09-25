import { Schema, model, Types, Query } from 'mongoose';
import { Style } from '@/resources/style/style.interface';
import DealModel from '@/resources/deal/deal.model';

const tickerInfo = new Schema({
  ticker: String,
  name: String,
  count: Number,
});

const StyleSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalBuyingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  isShared: {
    type: Boolean,
    required: true,
  },
  isAnonym: {
    type: Boolean,
    required: true,
  },
  overview: [tickerInfo],
  deals: [
    {
      type: Types.ObjectId,
      ref: 'Deal',
    },
  ],
});

StyleSchema.post(
  'deleteOne',
  { document: true },
  async function (next): Promise<void> {
    try {
      await DealModel.deleteMany({ style: this._id });
    } catch (e) {
      // TODO: 에러처리 어떻게?
      console.log(e);
    }
  }
);

export default model<Style>('Style', StyleSchema);
