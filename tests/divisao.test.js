const { dividir } = require("../calculadora");

test("divide dois números", () => {
  expect(dividir([10, 2])).toBe(5);
});

test("divide vários números", () => {
  expect(dividir([100, 5, 2])).toBe(10);
});

test("dividir por zero lança erro", () => {
  expect(() => dividir([10, 0])).toThrow("Não é possível dividir por zero!");
});
