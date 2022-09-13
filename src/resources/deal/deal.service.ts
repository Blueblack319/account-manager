import { Deal, Ticker } from '@/resources/deal/deal.interface';
import DealModel from '@/resources/deal/deal.model';
import StyleModel from '@/resources/style/style.model';

class DealService {
  private deal = DealModel;
  private style = StyleModel;

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
      const deal = await this.deal.create({ description, tickers });
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
  //   public async delete();
}

export default DealService;
