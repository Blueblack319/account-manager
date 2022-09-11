import StyleModel from '@/resources/style/style.model';
import UserModel from '@/resources/user/user.model';
import { Style, Ticker } from '@/resources/style/style.interface';
import { Types } from 'mongoose';
import { User } from '@/resources/user/user.interface';

class StyleService {
  private style = StyleModel;
  private user = UserModel;

  /**
   * Create a new style
   */
  public async create(
    name: string,
    tickers: Ticker[],
    userId: Types.ObjectId
  ): Promise<Style> {
    try {
      // name이 같은 style은 못 만들게 하자!
      const style = await this.style.create({ name, tickers });
      await this.user
        .findByIdAndUpdate(userId, {
          $push: { styles: style._id },
        })
        .exec();
      return style;
    } catch (e) {
      throw new Error('Unable to create a style.');
    }
  }

  /**
   * Find all styles in user
   */
  public async findAll(userId: Types.ObjectId): Promise<Style[] | void> {
    try {
      const user = await this.user
        .findById(userId)
        .populate({ path: 'styles' })
        .select('styles');
      if (!user) {
        throw new Error('User not found');
      }
      return user.styles;
    } catch (e) {
      throw new Error('Cannot find all styles');
    }
  }

  /**
   * Find style by id
   */

  /**
   * Find style by title
   */

  /**
   * Edit style
   */

  /**
   * Delete style
   */
}

export default StyleService;
