// Test de soma simples. Se passar, o ambiente de testes está configurado corretamente.
const sum = (a, b) => a + b;

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});