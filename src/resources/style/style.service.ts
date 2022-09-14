import { Style } from '@/resources/style/style.interface';
import { Types } from 'mongoose';
import StyleModel from '@/resources/style/style.model';
import UserModel from '@/resources/user/user.model';
import DealModel from '@/resources/deal/deal.model';

class StyleService {
  private style = StyleModel;
  private user = UserModel;
  private deal = DealModel;
  /**
   * Create a new style
   */
  public async create(
    name: string,
    description: string,
    owner: Types.ObjectId
  ): Promise<Style | void> {
    try {
      const existed = await this.style.findOne({ name }).select('_id');
      if (existed) {
        throw new Error('Already exist');
      }
      const style = await this.style.create({ owner, name, description });
      await this.user
        .findByIdAndUpdate(owner, {
          $push: { styles: style._id },
        })
        .exec();
      return style;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to create a new style');
      }
    }
  }

  /**
   * Find all styles
   */
  public async findAll(): Promise<Style[]> {
    try {
      const styles = await this.style.find({});
      return styles;
    } catch (e) {
      throw new Error('Unable to find styles');
    }
  }

  /**
   * Find all styles in user
   */
  public async findAllInUser(userId: Types.ObjectId): Promise<Style[] | void> {
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
  public async findById(
    styleId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<Style | void> {
    try {
      // check user has this styleId
      const user = await this.user
        .findOne({ styles: { $in: [styleId] } })
        .select('id')
        .exec();

      if (!user) {
        throw new Error('User not found');
      }
      if (!userId.equals(user._id)) {
        throw new Error('This is not your style');
      }
      const style = await this.style.findById(styleId);
      if (!style) {
        throw new Error('Style not found');
      }
      return style;
    } catch (e) {
      throw new Error('Something wrong in finding by ID');
    }
  }

  /**
   * Find styles by name part
   */
  public async findByName(name: string): Promise<Style[] | void> {
    try {
      const styles = await this.style.find({
        $text: { $search: name },
      });
      if (!styles) {
        throw new Error('Styles not found');
      }
      return styles;
    } catch (e) {
      throw new Error('Something wrong in finding by name');
    }
  }

  /**
   * Edit style
   */
  // public async edit()

  /**
   * Delete style
   */
  // TODO: checkStyleOwnerMiddle가 잘 작동하는지 error 확인하기
  // TODO: update and delete의 error catch는 어떻게 하는지 알아보기
  // TODO: catch부분 바꾸기
  public async delete(styleId: string, userId: Types.ObjectId): Promise<void> {
    try {
      await this.user.findByIdAndUpdate(userId, {
        $pull: { styles: styleId },
      });
      await this.deal.deleteMany({ style: styleId });
      await this.style.deleteOne({ _id: styleId });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          e.message ? e.message : 'Something wrong in deleting by ID'
        );
      }
    }
  }
}

export default StyleService;
