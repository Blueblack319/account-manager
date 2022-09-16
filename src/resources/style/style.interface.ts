import { Deal } from '@/resources/deal/deal.interface';
import { Types } from 'mongoose';

interface Style {
  owner: Types.ObjectId;
  name: string;
  description: string;
  totalBuyingPrice: number;
  deals?: Deal[];
}

interface NameQuery {
  name: string;
}

interface CreateStyleInput {
  name: string;
  description: string;
}

interface EditStyleInput {
  name?: string;
  description?: string;
}

export { Style, NameQuery, CreateStyleInput, EditStyleInput };
