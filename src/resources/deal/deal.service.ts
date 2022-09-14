import { Deal, Ticker } from '@/resources/deal/deal.interface';
import { Types } from 'mongoose';
import DealModel from '@/resources/deal/deal.model';
import StyleModel from '@/resources/style/style.model';
import UserModel from '@/resources/user/user.model';

class DealService {
  private deal = DealModel;
  private style = StyleModel;
  private user = UserModel;

  /**
   * Create a new deal
   */
  public async create(
    styleId: string,
    userId: string,
    description: string,
    tickers: Ticker[]
  ): Promise<Deal | void> {
    try {
      const style = await this.style.findOne({ owner: userId, _id: styleId });
      if (!style) {
        throw new Error('This style is not yours');
      }
      const deal = await this.deal.create({
        style: styleId,
        description,
        tickers,
      });
      style.deals?.push(deal);
      style.save();

      return deal;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to create a deal');
      }
    }
  }

  /**
   * Remove a deal
   */
  public async delete(userId: Types.ObjectId, dealId: string): Promise<void> {
    // 1. deal을 가지고 있는 style 찾기
    // 2. 그 style을 가지고 있는 유저 찾기
    // 3. 그 유저와 로그인된 유저 비교하기
    try {
      const deal = await this.deal.findOne({ _id: dealId });
      if (!deal) {
        throw new Error('Deal not found');
      }
      const user = await this.user
        .findOne({ styles: { $in: deal.style } })
        .select('_id');
      if (!user) {
        throw new Error('User not found');
      }
      if (!userId.equals(user._id)) {
        throw new Error('This style of deal is not yours');
      }
      await this.style.findByIdAndUpdate(
        { _id: deal.style },
        { $pull: { deals: dealId } }
      );
      await this.deal.deleteOne({ _id: dealId });
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to remove a deal');
      }
    }
  }
}

export default DealService;
