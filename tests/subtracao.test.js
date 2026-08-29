const { subtrair } = require("../calculadora");

test("subtrai dois números", () => {
  expect(subtrair([10, 3])).toBe(7);
});

test("subtrai vários números", () => {
  expect(subtrair([10, 3, 2])).toBe(5);
});
