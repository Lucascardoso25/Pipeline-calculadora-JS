const OPERACOES = {
  "+": somar,
  "-": subtrair,
  "×": multiplicar,
  "÷": dividir,
};

const visor = document.getElementById("visor");

let valorAcumulado = null;
let operacaoPendente = null;
let comecandoNovoNumero = true;

function atualizarVisor(texto) {
  visor.textContent = texto;
}

function digitar(digito) {
  const atual = visor.textContent;

  if (comecandoNovoNumero || atual === "0" || atual === "Erro") {
    atualizarVisor(digito === "." ? "0." : digito);
    comecandoNovoNumero = false;
    return;
  }

  if (digito === "." && atual.includes(".")) {
    return; // evita ponto decimal duplicado
  }

  atualizarVisor(atual + digito);
}

function apagar() {
  const atual = visor.textContent;
  if (comecandoNovoNumero || atual.length <= 1) {
    atualizarVisor("0");
    comecandoNovoNumero = true;
    return;
  }
  atualizarVisor(atual.slice(0, -1));
}

function aplicarOperacaoPendente() {
  const numeroAtual = parseFloat(visor.textContent);

  if (valorAcumulado === null) {
    valorAcumulado = numeroAtual;
  } else if (operacaoPendente !== null) {
    const funcao = OPERACOES[operacaoPendente];
    valorAcumulado = funcao([valorAcumulado, numeroAtual]);
  }

  return valorAcumulado;
}

function escolherOperacao(simbolo) {
  try {
    const resultado = aplicarOperacaoPendente();
    atualizarVisor(String(resultado));
    operacaoPendente = simbolo;
    comecandoNovoNumero = true;
  } catch (erro) {
    atualizarVisor("Erro");
    reiniciar(false);
  }
}

function calcularIgual() {
  try {
    const resultado = aplicarOperacaoPendente();
    atualizarVisor(String(resultado));
  } catch (erro) {
    atualizarVisor("Erro");
    reiniciar(false);
    return;
  }

  operacaoPendente = null;
  valorAcumulado = null;
  comecandoNovoNumero = true;
}

function reiniciar(limparVisor = true) {
  valorAcumulado = null;
  operacaoPendente = null;
  comecandoNovoNumero = true;
  if (limparVisor) {
    atualizarVisor("0");
  }
}

document.querySelectorAll("button[data-num]").forEach((botao) => {
  botao.addEventListener("click", () => digitar(botao.dataset.num));
});

document.querySelectorAll("button[data-op]").forEach((botao) => {
  botao.addEventListener("click", () => escolherOperacao(botao.dataset.op));
});

document.querySelector('[data-acao="igual"]').addEventListener("click", calcularIgual);
document.querySelector('[data-acao="limpar"]').addEventListener("click", () => reiniciar(true));
document.querySelector('[data-acao="apagar"]').addEventListener("click", apagar);

document.addEventListener("keydown", (evento) => {
  if (evento.key >= "0" && evento.key <= "9") digitar(evento.key);
  else if (evento.key === ".") digitar(".");
  else if (evento.key === "+") escolherOperacao("+");
  else if (evento.key === "-") escolherOperacao("-");
  else if (evento.key === "*") escolherOperacao("×");
  else if (evento.key === "/") {
    evento.preventDefault();
    escolherOperacao("÷");
  } else if (evento.key === "Enter" || evento.key === "=") calcularIgual();
  else if (evento.key === "Backspace") apagar();
  else if (evento.key === "Escape") reiniciar(true);
});
