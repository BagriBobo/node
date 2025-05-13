# Demonstração de Context API em React

Este projeto demonstra como usar o Context API do React para compartilhar estado entre componentes sem a necessidade de passar props manualmente pela árvore de componentes.

## Funcionalidades

1. **Tema Claro/Escuro**: Demonstração de um contexto que controla o tema da aplicação.
2. **Contador Compartilhado**: Demonstração de um contador cujo estado é compartilhado entre componentes.

## Estrutura do projeto

```
src/
├── App.jsx            #Componente principal da aplicação
├── main.jsx           #Ponto de entrada da aplicação
├── index.css          #Estilos globais
├── components/        #Componentes da aplicação
│   ├── Header.jsx     #Componente de cabeçalho com toggle de tema
|   ├── Main.jsx       #Componente do main com funcionarlidades do contator
│   ├── CounterDisplay.jsx #Exibe o valor atual do contador
│   └── CounterControls.jsx #Controles para manipular o contador
└── context/           #Contextos da aplicação
    ├── ThemeContext.jsx #Contexto para gerenciar o tema
    └── CounterContext.jsx #Contexto para gerenciar o contador
```

## Conceitos demonstrados

1. **Context API**: Criação e uso de contextos em React.
2. **Custom Hooks**: Hooks personalizados para facilitar o uso dos contextos.
3. **Prop Drilling Avoidance**: Como evitar passar props por vários níveis de componentes.
4. **Theme Switching**: Troca de tema claro/escuro usando contexto.

## Como executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`