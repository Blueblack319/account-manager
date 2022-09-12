import { Deal, Ticker } from '@/resources/deal/deal.interface';
import DealModel from '@/resources/deal/deal.model';
import StyleModel from '@/resources/style/style.model';
import UserModel from '@/resources/user/user.model';
import { Types } from 'mongoose';

class DealService {
  private deal = DealModel;
  //   private user = UserModel; Do not need?
  private style = StyleModel;

  public async create(
    styleId: string,
    description: string,
    tickers: Ticker[]
  ): Promise<Deal> {
    try {
      const deal = await this.deal.create({ description, tickers });
      await this.style.findByIdAndUpdate(styleId, {
        $push: { deals: deal._id },
      });

      return deal;
    } catch (e) {
      throw new Error('Unable to create a deal');
    }
  }
}

export default DealService;
