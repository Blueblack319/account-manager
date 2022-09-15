import { CreateDealInput, Deal, Ticker } from '@/resources/deal/deal.interface';
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
    createDealInput: CreateDealInput
  ): Promise<Deal | void> {
    try {
      const style = await this.style.findOne({ owner: userId, _id: styleId });
      let totalPrice = 0;
      const { description, tickers } = createDealInput;
      if (!style) {
        throw new Error('This style is not yours');
      }
      tickers.forEach((ticker) => {
        if (ticker.isBuying) {
          totalPrice += ticker.price;
        } else {
          totalPrice -= ticker.price;
        }
      });
      const deal = await this.deal.create({
        style: styleId,
        description,
        tickers,
        totalPrice,
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
