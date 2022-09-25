import { Schema, model, Types } from 'mongoose';
import { Deal } from '@/resources/deal/deal.interface';
import StyleModel from '@/resources/style/style.model';

const TickerSchema = new Schema({
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
});

export const DealSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

// TODO: totalPrice가 바뀌었다면 style의 totalBuyingPrice 변화주기
// 기존 값 빼주기
// pre가 작동안함...
// DealSchema.pre(
//   ['deleteOne'],
//   { document: true, query: false },
//   async function (next): Promise<void> {}
// );

// 새로운 값 더해주기
DealSchema.post(
  ['save'],
  { document: true },
  async function (next): Promise<void> {
    try {
      // style을 찾아서 totalBuyingPrice를 바꿔주자
      const style = await StyleModel.findById(this.style);
      if (!style) {
        throw new Error('Style not found');
      }
      style.totalBuyingPrice += this.totalPrice;
      style.save();
    } catch (e) {
      console.log(e);
    }
  }
);

DealSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function (next): Promise<void> {
    try {
      const style = await StyleModel.findById(this.style);
      if (!style) {
        throw new Error('Style not found');
      }
      style.totalBuyingPrice -= this.totalPrice;
      style.save();
    } catch (e) {
      console.log(e);
      // if (e instanceof Error) {
      //   next(
      //     new HttpException(
      //       400,
      //       e.message ? e.message : 'Unable to calculate totalBuyingPrice'
      //     )
      //   );
      // }
    }
  }
);

export default model<Deal>('Deal', DealSchema);
