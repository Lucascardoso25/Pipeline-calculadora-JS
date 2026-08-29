const { multiplicar } = require("../calculadora");

test("multiplica dois números", () => {
  expect(multiplicar([4, 5])).toBe(20);
});

test("multiplica vários números", () => {
  expect(multiplicar([2, 3, 4])).toBe(24);
});
