# Pipeline de uma Calculadora (JavaScript)

Aplicação de calculadora em JavaScript, com interface web, testes automatizados (Jest) e uma pipeline de Integração Contínua (CI) configurada no GitHub Actions.

Versão em JavaScript do trabalho da disciplina "Integração e Entrega Contínua" — reimplementação do projeto original feito em Python.

## Funcionalidades

A calculadora suporta as quatro operações básicas, aceitando **dois ou mais números** de uma vez:

- Soma
- Subtração
- Multiplicação
- Divisão (com tratamento de divisão por zero)

## Estrutura do projeto

```
pipeline-calculadora-js/
├── .github/
│   └── workflows/
│       └── tests.yml          # Workflow do GitHub Actions
├── calculadora.js              # Lógica da calculadora (usada nos testes e na interface)
├── index.html                  # Estrutura da interface web
├── style.css                   # Estilo da interface web
├── script.js                   # Interação da interface com os botões
├── tests/
│   ├── soma.test.js
│   ├── subtracao.test.js
│   ├── multiplicacao.test.js
│   └── divisao.test.js
├── package.json
└── README.md
```

## Como executar localmente

Requer [Node.js](https://nodejs.org/) 18+.

**Interface web:**

Basta abrir o arquivo `index.html` no navegador (duplo clique, ou clique direito → Abrir com → seu navegador).

## Como rodar os testes

Instale as dependências e execute:

```bash
npm install
npm test
```

## Pipeline de CI (GitHub Actions)

A cada `push` na branch `main`, o workflow definido em `.github/workflows/tests.yml` executa os testes em **jobs separados por operação**, encadeados na ordem soma → subtração → multiplicação → divisão. Cada job só começa se o anterior passar (`needs`):

- `test_soma`
- `test_sub` (needs: `test_soma`)
- `test_mult` (needs: `test_sub`)
- `test_div` (needs: `test_mult`)

Cada job faz: checkout do código, configuração do Node.js 20, instalação das dependências (`npm install`) e execução do arquivo de teste correspondente.

O status pode ser acompanhado na aba **Actions** do repositório no GitHub.
