import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import { Types } from 'mongoose';
import { User } from './user.interface';

class UserService {
  private user = UserModel;

  /**
   * Register a new user
   */
  public async register(
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<string | undefined> {
    try {
      const user = await this.user.create({ email, name, password, role });
      const accessToken = token.createToken(user._id);
      return accessToken;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to register');
      }
    }
  }

  /**
   * Login user
   */
  public async login(email: string, password: string): Promise<string | void> {
    try {
      const user = await this.user.findOne({ email });
      if (!user) {
        throw new Error('User not found with that email');
      }

      if (await user.isValidPassword(password)) {
        return token.createToken(user._id);
      } else {
        throw new Error('Wrong password');
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to login');
      }
    }
  }

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
}

export default UserService;
