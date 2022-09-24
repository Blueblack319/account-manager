import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import { Types } from 'mongoose';
import {
  EditUserInput,
  SigninInput,
  SigninOutput,
  SignupInput,
  SignupOutput,
  User,
} from './user.interface';

class UserService {
  private user = UserModel;

  /**
   * Register a new user
   */
  public async signup(
    registerInput: SignupInput
  ): Promise<SignupOutput | undefined> {
    try {
      const user = await this.user.create({ ...registerInput });
      const accessToken = token.createToken(user._id);
      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        token: accessToken,
      };
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to signup');
      }
    }
  }

  /**
   * Login user
   */
  public async signin(signinInput: SigninInput): Promise<SigninOutput | void> {
    try {
      const { email, password } = signinInput;
      const user = await this.user.findOne({ email });
      if (!user) {
        throw new Error('User not found with that email');
      }

      if (await user.isValidPassword(password)) {
        const accessToken = token.createToken(user._id);
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          token: accessToken,
        };
      } else {
        throw new Error('Wrong password');
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to signin');
      }
    }
  }

  /**
   * Find logged in user
   */
  public async getLoggedInUser(id: Types.ObjectId): Promise<User | void> {
    try {
      const user = await this.user.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to get logged in user');
      }
    }
  }

  /**
   * Find all users whose isShared is true
   */
  public async findAll(): Promise<User[] | void> {
    try {
      const users = await this.user.find({ isShared: true });
      return users;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  /**
   * Find a user by id
   */
  public async findById(id: string): Promise<User | void> {
    try {
      // TODO: isAnonym 확인
      const user = await this.user.findOne({ _id: id, isShared: true });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to find a user by id');
      }
    }
  }

  /**
   * Delete a logged in user
   */
  public async deleteLoggedInUser(id: Types.ObjectId): Promise<void> {
    try {
      const user = await this.user.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.deleteOne();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  /**
   * Update a logged in user
   */
  public async editUser(
    id: Types.ObjectId,
    editUserInput: EditUserInput
  ): Promise<User | void> {
    try {
      await this.user.findByIdAndUpdate(id, {
        ...editUserInput,
      });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }

  /**
   * Update a logged in user's password
   */
  public async editUserPassword(
    id: Types.ObjectId,
    password: string
  ): Promise<User | void> {
    try {
      const user = await this.user.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      user.password = password;
      await user.save();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
}

export default UserService;
