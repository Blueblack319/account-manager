import { Schema, model } from 'mongoose';
import { User } from '@/resources/user/user.interface';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    isShared: {
      type: Boolean,
      required: true,
    },
    isAnonym: {
      type: Boolean,
      required: true,
    },
    styles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Style',
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});

// Cascade
UserSchema.post('deleteOne', { document: true }, async function (next) {
  console.log(this.styles);
});

// arrow function은 후순위로 생김
// 그래서 arrow function을 쓰면 에러가 발생하나?
UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
