import { Deal } from '@/resources/deal/deal.interface';

interface Style {
  // 투자스타일 이름
  name: string;
  description: string;

  // 종목과 수만 저장하고 나중에 realtime으로 가격을 받아오자
  //   totalAvgCurPrice: number;
  //   totalAvgPurPrice: number;

  // 이 투자스타일로 매입한 종목정보
  deals?: Deal[];
}

interface NameQuery {
  name: string;
}

export { Style, NameQuery };
