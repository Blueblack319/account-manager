import { Schema, model, Types } from 'mongoose';
import { Deal } from '@/resources/deal/deal.interface';
import StyleModel from '@/resources/style/style.model';

const TickerSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    isBuying: {
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
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  tickers: [TickerSchema],
});

// TODO: totalPrice가 바뀌었다면 style의 totalBuyingPrice 변화주기
// 기존 값 빼주기
DealSchema.pre(
  ['updateOne', 'save', 'deleteOne'],
  { document: true },
  async function (next): Promise<void> {
    try {
      // console.log(this.totalPrice)
    } catch (e) {}
  }
);

// 새로운 값 더해주기
DealSchema.post(
  ['updateOne', 'save'],
  { document: true },
  async function (next): Promise<void> {
    try {
      // style을 찾아서 totalBuyingPrice를 바꿔주자

      const style = await StyleModel.findById(this.style);
      console.log(style);
    } catch (e) {}
  }
);

export default model<Deal>('Deal', DealSchema);
