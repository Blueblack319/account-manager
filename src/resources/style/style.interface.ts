import { Deal } from '@/resources/deal/deal.interface';
import { Types } from 'mongoose';

interface TickerInfo {
  ticker: string;
  name: string;
  count: number;
}

interface Style {
  owner: Types.ObjectId;
  name: string;
  description: string;
  totalBuyingPrice: number;
  isShared: boolean;
  isAnonym: boolean;
  overview: TickerInfo[];
  deals?: Deal[];
}

interface NameQuery {
  name: string;
}

interface CreateStyleInput {
  name: string;
  description: string;
  isShared: boolean;
  isAnonym: boolean;
}

interface EditStyleInput {
  name?: string;
  description?: string;
  isShared?: boolean;
  isAnonym?: boolean;
}

export { Style, NameQuery, CreateStyleInput, EditStyleInput };
