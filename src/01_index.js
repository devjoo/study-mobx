import { observable, reaction, computed, autorun } from "mobx";

const calculator = observable({
  a: 1,
  b: 2
});

reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`a 값이 ${value} 로 바뀌었네요!`);
  }
);

reaction(
  () => calculator.b,
  value => {
    console.log(`b 값이 ${value} 로 바뀌었네요!`);
  }
);

const sum = computed(() => {
  console.log("계산중이예요!");
  return calculator.a + calculator.b;
});

sum.observe(() => calculator.a);
sum.observe(() => calculator.b);

console.log(sum.value);
console.log(sum.value);

// 내부의 값이 바뀌면 다시 호출 함
calculator.a = 28;
console.log(sum.value);

calculator.a++;
calculator.b++;

console.log(sum.value);
console.log(sum.value);
console.log(sum.value);
