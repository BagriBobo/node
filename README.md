# Catálogo de Filmes React

Este projeto implementa uma aplicação de catálogo de filmes com React, demonstrando funcionalidades de filtragem, ordenação e paginação.

## Criação do Projeto

Para criar um novo projeto com Vite:

```bash
#Crie um novo projeto usando Vite
npm create vite@latest nome-do-projeto

#Selecione React como framework
#Selecione JavaScript como variante

#Navegue para a pasta do projeto
cd nome-do-projeto
```

## Instalação e Execução

```bash
#Instale as dependências
npm install

#Execute o servidor de desenvolvimento
npm run dev

#Para construir o projeto para produção
npm run build

#Para visualizar a versão de produção localmente
npm run preview
```

## Estrutura dos Filmes

```javascript
{
  id: number,
  title: string,
  description: string, 
  poster: string,
  year: number,
  rating: number
}
```

## Estrutura do Projeto

```
/node
├── public/
│   ├── videos.json    #Dados dos filmes
│   └── styles.css
├── src/
│   ├── components/
│   │   ├── MovieList.jsx      #Lista de filmes com paginação
│   │   ├── MovieCard.jsx      #Card individual de filme
│   │   ├── Filter.jsx         #Componente de filtros e ordenação
│   │   └── Pagination.jsx     #Controles de paginação
│   ├── App.jsx                #Componente principal
│   └── main.jsx               #Ponto de entrada da aplicação
└── index.html                 #HTML principal
```

## Funcionalidades Implementadas

### 1. Exibição de Filmes

-  Cards individuais contendo poster, título, descrição e avaliação

### 2. Busca e Filtragem

- Busca por título
- Ordenação por avaliação (maior para menor ou menor para maior)

### 3. Paginação

- Controle de páginas (Anterior/Próximo)
- Exibição do número de páginas com destaque da página atual
- Limitação de filmes por página

## Exemplos de Uso

### Filtragem por título

```javascript
const filteredMovies = movies.filter((movie) =>
  movie.title.toLowerCase().includes(search.toLowerCase())
);
```

### Ordenação por avaliação

```javascript
const sortedMovies = [...filteredMovies].sort((a, b) => {
  return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
});
```

# Exercício: Implementação de Filtro por Ano

## Objetivo

Adicionar funcionalidade para filtrar filmes por ano de lançamento, permitindo que o usuário selecione um intervalo de anos específico.

## Descrição do Exercício

Implementar um filtro que permita ao usuário:
- Definir ano mínimo e máximo para filtragem
- Atualizar dinamicamente a lista de filmes com base neste filtro
- Combinar esta filtragem com os filtros existentes (busca e ordenação)

### Funcionalidades Requeridas

1. **Interface de Seleção de Anos:**

   - Adicionar campos para seleção de ano mínimo e máximo no componente Filter
   - Implementar validação para garantir que o ano mínimo não seja maior que o máximo
   - Fornecer valores padrão baseados nos anos dos filmes disponíveis

2. **Lógica de Filtragem:**

   - Implementar a função de filtragem por intervalo de anos
   - Integrar com os filtros existentes (título e ordenação)
   - Garantir que a paginação funcione corretamente com os novos filtros

3. **Informações Visuais:**

   - Mostrar contador de filmes que correspondem aos critérios de filtragem
   - Opção para limpar filtros e restaurar a exibição original

## Dicas de Implementação

### 1. Adição de Estados para os Filtros de Ano

```javascript
const [yearRange, setYearRange] = useState({
  min: 1950,
  max: new Date().getFullYear()
});
```

### 2. Função de Filtragem por Ano

```javascript
const filterByYear = (movies) => {
  return movies.filter(
    (movie) => movie.year >= yearRange.min && movie.year <= yearRange.max
  );
};
```

### 3. Integração com Filtros Existentes

```javascript
const filteredByTitle = movies.filter((movie) =>
  movie.title.toLowerCase().includes(search.toLowerCase())
);
const filteredByYear = filterByYear(filteredByTitle);
const sortedMovies = [...filteredByYear].sort((a, b) => {
  return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
});
```

### 4. Componente para Seleção de Anos

```jsx
<div className="year-filter">
  <label>Ano: </label>
  <input
    type="number"
    min="1900"
    max={yearRange.max}
    value={yearRange.min}
    onChange={(e) => setYearRange({...yearRange, min: parseInt(e.target.value)})}
  />
  <span> até </span>
  <input
    type="number"
    min={yearRange.min}
    max="2030"
    value={yearRange.max}
    onChange={(e) => setYearRange({...yearRange, max: parseInt(e.target.value)})}
  />
</div>
```

## Como Avaliar Sua Solução

- [ ] Filtro por ano funciona corretamente?
- [ ] Combinação de filtros (ano + título + ordenação) funciona?
- [ ] Paginação atualiza corretamente conforme os filtros?
- [ ] Código é organizado e mantém a estrutura do projeto?