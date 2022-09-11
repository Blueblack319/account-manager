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
}

export default StyleService;
