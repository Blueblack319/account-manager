import { Schema, model, Types, Query } from 'mongoose';
import { Style } from '@/resources/style/style.interface';

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
  isShared: {
    trype: Boolean,
    required: true,
  },
  isAnonym: {
    type: Boolean,
    required: true,
  },
  totalBuyingPrice: {
    type: Number,
    required: true,
  },
  deals: [
    {
      type: Types.ObjectId,
      ref: 'Deal',
    },
  ],
});

// StyleSchema.pre('deleteOne', async function (next): Promise<void> {
//   try {
//     await Deal.deleteMany({ style: this._id });
//     // 왜 안되지??
// 아마도 pull을 잘못쓴듯..
//     const user = await User.findById(this.owner);
//     console.log(user);
//     next();
//   } catch (e) {
//     console.log(e);
//   }
// });

export default model<Style>('Style', StyleSchema);
