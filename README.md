# Manage your account seperately by investment style

투자스타일별로 따로 관리할 수 있는 어플리케이션

- 평균 매입단가, 언제 샀는지
- 샀을 때 왜 샀는지 근거를 적을 수 있게 하기
- 나중에 계좌와 연동할 수 있으면 좋고
- 타인의 투자스타일을 볼 수 도 있게?
- 투자동아리에 맞는 어플리케이션 제작?
- 수익률이 높은 스타일에서 낮은 스타일로 내림차순 보이기

시나리오

1. 유저가 로그인
2. 자신의 투자스타일별로 블록 보임
3. 평균현재가 보임(평균매입가보다 낮으면 파랑, 높으면 빨강)
4. 어떤 주식들을 샀는지 보여줌(종목, 수, 현재평균가, 매입평균가)

DB

- user -> style[]
- 종목들을 array에 담아서 realtime으로 가격을 받아와서 계산하기로?
- tickers: [
  {
  ticker: "삼성전자의 티커",
  count: 4,
  price: 60000
  },
  ...
  ]
- 매입한 날짜별로 나눌까? => 나중에 업데이트하자. 우선 만들기부터
- deal이라는 collection을 만들까?
- users -> styles -> deal
- deal
  - title
  - description
  - tickers
- tickers 대신 deals
- deals 안에 tickers를 넣자
- style을 만들 때는 deal을 받지 말자

유저가 가지고 있는 정보

4. 투자스타일
   - 언제 어떤 주식을 샀는지 & 왜 샀는지 텍스트
   - When에 따라 평균 매입단가와 현재가
   - 전체적으로 평균 매입단가와 현재가
   - 여기서 실시간 데이터는 현재가뿐

- [x] global.d.ts에 대해 공부하기
- [ ] Style CRUD
- [x] user와 style 연결하기(one-to-many)
