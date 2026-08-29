const { somar } = require("../calculadora");

test("soma dois números", () => {
  expect(somar([2, 3])).toBe(5);
});

test("soma vários números", () => {
  expect(somar([1, 2, 3, 4])).toBe(10);
});

test("soma lista vazia", () => {
  expect(somar([])).toBe(0);
});
