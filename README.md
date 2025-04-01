# Comparação de Implementações SPA: JavaScript Puro vs React

Este repositório demonstra a implementação de Single Page Applications (SPAs) usando duas abordagens diferentes: JavaScript puro e React. Cada abordagem é usada para resolver dois problemas comuns em aplicações web: exibição de dados e adição de dados.

## Estrutura do Projeto

```
/node
├── mostrar_dados/            # Exemplo de exibição de dados
│   ├── spa_puro/             # Implementação em JavaScript puro
│   │   ├── index.html
│   │   └── index.js
│   └── react/                # Implementação em React
│       ├── src/
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── index.html
│       └── vite.config.js
├── adicionar_dados/          # Exemplo de adição de dados
│   ├── spa_puro/             # Implementação em JavaScript puro
│   │   ├── index.html
│   │   └── index.js
│   └── react/                # Implementação em React
│       ├── src/
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── index.html
│       └── vite.config.js
```

## Funcionalidades Demonstradas

### 1. Exibição de Dados (mostrar_dados)
- Listagem de itens
- Toggle para mostrar/ocultar a lista

### 2. Adição de Dados (adicionar_dados)
- Listagem de itens
- Toggle para mostrar/ocultar a lista
- Adição de novos itens à lista

## Comparação das Abordagens

### JavaScript Puro (SPA Puro)

**Vantagens:**
- Não requer bibliotecas externas
- Carregamento potencialmente mais rápido para aplicações simples
- Controle direto sobre o DOM

**Implementação:**
- Manipulação direta do DOM usando JavaScript
- Gerenciamento manual do estado da aplicação
- Atualizações explícitas da interface do usuário

### React

**Vantagens:**
- Gerenciamento de estado simplificado com hooks (useState)
- Renderização declarativa da interface
- Componentização facilitando a manutenção e reuso
- Atualização automática da interface quando o estado muda

**Implementação:**
- Componentes funcionais com hooks
- Estado gerenciado pelo React
- Renderização baseada em estado

## Executando os Projetos

### SPA Puro

Basta abrir os arquivos HTML em um navegador:

```bash
# Exemplo para mostrar_dados
open mostrar_dados/spa_puro/index.html

# Exemplo para adicionar_dados
open adicionar_dados/spa_puro/index.html
```

### React

Cada projeto React requer instalação de dependências e execução em um servidor de desenvolvimento:

```bash
# Para mostrar_dados em React
cd mostrar_dados/react
npm install
npm run dev

# Para adicionar_dados em React
cd adicionar_dados/react
npm install
npm run dev
```

## Conclusão

Estes projetos demonstram a diferença entre abordagens imperativa (JavaScript puro) e declarativa (React) para construção de SPAs. Enquanto JavaScript puro oferece controle direto sobre o DOM, React simplifica o desenvolvimento abstraindo a manipulação do DOM e oferecendo um modelo baseado em componentes e estado.

O JavaScript puro exige que o desenvolvedor defina explicitamente como manipular o DOM para refletir mudanças de estado, enquanto o React permite que o desenvolvedor declare como a interface deve se parecer para um determinado estado, com o framework gerenciando automaticamente as atualizações do DOM.
