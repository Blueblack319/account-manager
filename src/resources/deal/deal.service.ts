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
      tickers.forEach((tickerInfo) => {
        const idx = style.overview.findIndex(
          (overviewInfo) => overviewInfo.ticker === tickerInfo.ticker
        );
        if (tickerInfo.isBuying) {
          totalPrice += tickerInfo.price * tickerInfo.count;
          if (idx === -1) {
            style.overview?.push({
              ticker: tickerInfo.ticker,
              count: tickerInfo.count,
              name: 'Something here in next',
            });
          } else {
            style.overview[idx].count += tickerInfo.count;
          }
        } else {
          if (tickerInfo.count > style.overview[idx].count) {
            throw new Error('You cannot sign a deal with this count of stocks');
          }
          totalPrice -= tickerInfo.price * tickerInfo.count;
          style.overview[idx].count -= tickerInfo.count;
        }
      });
      const deal = await this.deal.create({
        style: styleId,
        description,
        tickers,
        totalPrice,
      });

      style.totalBuyingPrice += totalPrice;
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
      const style = await this.style.findById(deal.style);
      if (!user) {
        throw new Error('User not found');
      }
      if (!userId.equals(user._id)) {
        throw new Error('This style of deal is not yours');
      }
      if (!style) {
        throw new Error('Style not found');
      }
      deal.tickers.forEach((tickerInfo) => {
        const idx = style.overview.findIndex(
          (overviewInfo) => overviewInfo.ticker === tickerInfo.ticker
        );
        if (tickerInfo.isBuying) {
          // 산 거였으면 빼주기
          style.overview[idx].count -= tickerInfo.count;
        } else {
          style.overview[idx].count += tickerInfo.count;
        }
      });
      await this.style.findByIdAndUpdate(
        { _id: deal.style },
        { $pull: { deals: dealId } }
      );

      await style.save();
      await deal.deleteOne();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message ? e.message : 'Unable to remove a deal');
      }
    }
  }
}

export default DealService;
