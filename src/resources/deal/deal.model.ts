import { Schema, model, Types } from 'mongoose';
import { Deal } from '@/resources/deal/deal.interface';

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
    requied: true,
  },
  tickers: [TickerSchema],
});

// 로그인된 유저id를 찾을 수가 없네...middleware를 만들자
// DealSchema.pre(
//   'deleteOne',
//   { document: true },
//   async function (next): Promise<void> {
//     try {
//       const user = await UserModel.findOne({
//         styles: { $in: this.style },
//       });
//       console.log(user);
//     } catch (e) {}
//   }
// );

export default model<Deal>('Deal', DealSchema);
