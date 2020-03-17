import {
  observable,
  computed,
  autorun,
  decorate,
  action,
  transaction
} from "mobx";

class GS25 {
  constructor() {
    this.basket = [];
  }

  get total() {
    console.log("계산중입니다..!");
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  select(name, price) {
    this.basket.push({ name, price });
  }
}

// decorate를 통해서 각 값에 MobX 함수 적용
decorate(GS25, {
  basket: observable,
  total: computed,
  select: action
});

const gs25 = new GS25();
autorun(() => gs25.total);
// 새 데이터 추가 될 때 알림
autorun(() => {
  if (gs25.basket.length > 0) {
    console.log(gs25.basket[gs25.basket.length - 1]);
  }
});

transaction(() => {
  gs25.select("물", 7);
  gs25.select("물", 100);
  gs25.select("과1", 100);
});

console.log(gs25.total);
