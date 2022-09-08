import { Schema } from 'mongoose';

interface Token extends Object {
  id: Schema.Types.ObjectId;
  expiredIn: number;
}

export default Token;
