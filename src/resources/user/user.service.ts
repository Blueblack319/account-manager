import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  /**
   * Login user
   */
  public async login(email: string, password: string): Promise<string | Error> {
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
      throw new Error('Unable to login');
    }
  }
}

export default UserService;
