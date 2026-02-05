# Simulador FGTS - Frontend

Aplicação web React para simular o valor disponível para saque-aniversário do FGTS. Interface para calcular valores baseados no saldo FGTS e gerenciar simulações.

## Aplicação em Produção (Deploy)

Observação: como o projeto utiliza serviços gratuitos de hospedagem (Railway, Render e Netlify), o backend pode apresentar cold start. Nos testes realizados, a primeira requisição pode levar até 5 minutos para responder. Após esse período inicial, a aplicação funciona normalmente, sem impactos no desempenho. A versão completa da aplicação (Frontend integrado ao Backend) está disponível em produção:

🔗 **https://fgtssimulator.netlify.app/**
## Sobre o Projeto

Sistema frontend desenvolvido em React.js que permite aos usuários:

- Simular valores disponíveis para saque-aniversário do FGTS
- Criar e salvar simulações com nome, saldo FGTS e mês de aniversário
- Editar simulações existentes
- Excluir simulações
- Visualizar lista de todas as simulações cadastradas
- Calcular automaticamente a alíquota e valor disponível conforme faixa do saldo

## Tecnologias Utilizadas

- **React** 19.2.4
- **React Router DOM** 7.13.0 - Navegação entre páginas
- **Axios** 1.13.4 - Requisições HTTP para a API
- **React Scripts** 5.0.1 - Configuração e build
- **Testing Library** - Testes unitários
- **Web Vitals** - Métricas de performance

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 14 ou superior
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Backend rodando em `http://localhost:8080`

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/ClaudirFantuci/crud-simulador_fgts-Front.git
cd crud-simulador_fgts-Front
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

### 4. Execute a aplicação

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
crud-simulador_fgts-Front/
├── public/                          # Arquivos públicos
├── src/
│   ├── components/                  # Componentes reutilizáveis
│   │   └── navBar/
│   │       ├── NavBar.jsx
│   │       └── NavBar.css
│   ├── pages/                       # Páginas da aplicação
│   │   ├── FormSaqueAniversario/
│   │   │   ├── FormSaqueAniversario.jsx
│   │   │   └── FormSaqueAniversario.css
│   │   └── ListaSimulacoes/
│   │       ├── ListaSimulacoes.jsx
│   │       └── ListaSimulacoes.css
│   ├── service/                     # Serviços de API
│   │   ├── SaqueAniversarioService.js
│   │   └── baseService.js
│   ├── config/                      # Configurações
│   │   └── api.js
│   ├── App.js                       # Componente principal
│   ├── App.css
│   ├── index.js                     # Ponto de entrada
│   └── index.css
├── package.json
├── env.example
└── README.md
```

## Funcionalidades

### 1. Formulário de Simulação (`FormSaqueAniversario`)

Permite criar nova simulação ou editar simulação existente:

**Campos:**
- Nome do usuário
- Mês de aniversário (Janeiro a Dezembro)
- Saldo do FGTS

**Ações:**
- Calcular/Criar simulação
- Atualizar simulação (modo edição)
- Cancelar edição

**Resultado exibido:**
- Nome
- Saldo FGTS
- Alíquota aplicada
- Valor disponível para saque
- Período de saque disponível

## Integração com Backend

### Serviço: `SaqueAniversarioService`

Endpoint base: `/api/SaqueAniversario`

**Métodos disponíveis:**

```javascript
// Criar nova simulação
create(data)
// POST /api/SaqueAniversario

// Listar todas simulações
listAll()
// GET /api/SaqueAniversario

// Atualizar simulação
update(id, data)
// PUT /api/SaqueAniversario/{id}

// Excluir simulação
delete(id)
// DELETE /api/SaqueAniversario/{id}
```


## 🔗 Dependências Principais

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| react | 19.2.4 | Biblioteca principal |
| react-router-dom | 7.13.0 | Roteamento |
| axios | 1.13.4 | Cliente HTTP |
| @testing-library/react | 16.3.2 | Testes |


## Licença

Este projeto está sob a licença MIT.

## 🔗 Links Relacionados

- [Backend do Projeto](https://github.com/ClaudirFantuci/crud-simulador_fgts-Back)
- [Documentação React](https://react.dev/)
- [Documentação React Router](https://reactrouter.com/)
- [Documentação Axios](https://axios-http.com/)



