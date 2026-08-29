function somar(numeros) {
  return numeros.reduce((total, numero) => total + numero, 0);
}

function subtrair(numeros) {
  return numeros.slice(1).reduce((resultado, numero) => resultado - numero, numeros[0]);
}

function multiplicar(numeros) {
  return numeros.reduce((resultado, numero) => resultado * numero, 1);
}

function dividir(numeros) {
  return numeros.slice(1).reduce((resultado, numero) => {
    if (numero === 0) {
      throw new Error("Não é possível dividir por zero!");
    }
    return resultado / numero;
  }, numeros[0]);
}

// Compatível com Node.js (usado nos testes com Jest) e com o navegador (usado pela interface web)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { somar, subtrair, multiplicar, dividir };
}
