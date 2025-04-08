# Catálogo de Filmes - Aplicação Node.js e React

Este projeto consiste em uma aplicação web para visualização de um catálogo de filmes, construída com Node.js no backend e React no frontend.

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

```
/backend        # API Node.js com banco de dados SQLite
/react          # Frontend desenvolvido com React
```

## Backend

### Principais Funcionalidades

O backend é construído usando Node.js puro, sem frameworks adicionais. Ele fornece uma API para acesso aos dados de filmes armazenados em um banco de dados SQLite.

#### Endpoints Disponíveis

- `GET /api/movies` - Retorna todos os filmes disponíveis no catálogo
- `GET /api/movies/:id` - Retorna detalhes de um filme específico por ID

### Conexão com o Banco de Dados SQLite

O backend utiliza SQLite como banco de dados, sem necessidade de servidor de banco de dados separado. A conexão é gerenciada através do módulo `sqlite-connection.js`.

#### Como Funciona a Conexão com o Banco de Dados:

1. **Inicialização do Banco de Dados**:
   - O arquivo `sqlite-connection.js` contém duas funções principais:
     - `setupDb()`: Inicializa o banco de dados, cria a tabela `movies` se não existir e popula com dados iniciais do arquivo `videos.json`
     - `getDb()`: Retorna a conexão com o banco de dados, inicializando-a se necessário

2. **Estrutura da Tabela de Filmes**:
   ```sql
   CREATE TABLE IF NOT EXISTS movies (
     id INTEGER PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     poster TEXT,
     year INTEGER,
     rating REAL
   )
   ```

3. **Tratamento de Dados Iniciais**:
   - O sistema verifica se a tabela está vazia
   - Se estiver vazia, carrega dados do arquivo `videos.json`
   - Se o arquivo não for encontrado, insere dados de exemplo

4. **Transações e Preparação de Consultas**:
   - Utiliza transações SQLite para inserção de múltiplos registros
   - Implementa consultas preparadas para evitar injeção de SQL

## Modelo de Dados

O arquivo `movie.js` define o modelo para interação com os dados de filmes, oferecendo as seguintes funções:

- `getAllMovies()`: Retorna todos os filmes do banco de dados
- `getMovieById(id)`: Busca um filme específico pelo ID

Estas funções encapsulam as consultas SQL e retornam Promises, facilitando o uso assíncrono nos controladores.

## API e Tratamento de Requisições

O arquivo `index.js` configura o servidor HTTP e define as rotas da API:

1. **Configuração de CORS**:
   - Permite requisições de qualquer origem, facilitando o desenvolvimento local
   - Suporta métodos HTTP: GET, POST e OPTIONS

2. **Roteamento**:
   - Análise da URL e método HTTP para determinar a ação a ser executada
   - Tratamento adequado de erros com respostas HTTP apropriadas

3. **Formato das Respostas**:
   - Todas as respostas são em formato JSON
   - Inclui códigos de status HTTP apropriados para cada situação

## Frontend React

### Como o React se Comunica com o Backend

O frontend React se comunica com o backend através de chamadas fetch para a API. Essa comunicação é encapsulada no arquivo `api.js` dentro da pasta `services`.

#### Serviços de API:

- `getMovies()`: Faz uma requisição para `GET /api/movies` e retorna todos os filmes
- `getMovieById(id)`: Faz uma requisição para `GET /api/movies/:id` e retorna um filme específico

#### Fluxo de Dados:

1. Os componentes React chamam funções do serviço API ao serem montados ou quando ocorrem interações do usuário
2. As funções do serviço API fazem requisições HTTP para o backend
3. O backend processa as requisições, consulta o banco de dados SQLite e retorna os resultados
4. O frontend recebe os dados JSON e atualiza o estado dos componentes React
5. A interface é renderizada com os novos dados

### Componentes Principais

- **MovieList**: Gerencia o estado dos filmes, incluindo filtragem, ordenação e paginação
- **MovieCard**: Apresenta os detalhes de um filme individual
- **Filter**: Permite ao usuário filtrar filmes por título e ordenar por avaliação
- **Pagination**: Implementa a navegação entre páginas de resultados

## Execução do Projeto

### Backend

```bash
cd backend
npm install
node index.js
```

O servidor estará rodando na porta 3000.

### Frontend

```bash
cd react
npm install
npm run dev
```

O frontend estará disponível no endereço indicado no terminal

## Exercício Final

**Implementação da Visão de Detalhes do Produto**

Como exercício final, você deve implementar a funcionalidade de visualização detalhada de um produto:

1. Ao clicar em um filme no `MovieCard`, o usuário deve ser redirecionado para uma página de detalhes
2. Na página de detalhes, exibir informações completas sobre o filme selecionado
3. A implementação deve:
   - Utilizar o serviço `getMovieById(id)` já disponível em `api.js`
   - Criar um novo componente `MovieDetail.jsx` para exibir os detalhes completos
   - Implementar navegação entre a lista de filmes e os detalhes de um filme específico

Esta funcionalidade permitirá que os usuários explorem informações detalhadas sobre cada filme do catálogo.
Aqui está um exemplo básico:

#### 1. Modificar o App.jsx para controlar a visualização

```jsx
import { useState } from "react";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelectMovie = (movieId) => {
    setSelectedMovie(movieId);
  };

  const handleBackToList = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h1>Catálogo de Filmes</h1>
      {selectedMovie ? (
        <MovieDetail 
          movieId={selectedMovie} 
          onBack={handleBackToList} 
        />
      ) : (
        <MovieList onSelectMovie={handleSelectMovie} />
      )}
    </div>
  );
};

export default App;
```

#### 2. Atualizar o MovieCard para permitir seleção do filme

```jsx
const MovieCard = ({ id, title, description, poster, rating, year, onSelectMovie }) => {
  return (
    <div className="movie-card" onClick={() => onSelectMovie(id)}>
      <img src={poster} alt={title} />
      <h3>{title} {year && `(${year})`}</h3>
      <p>{description}</p>
      <p>⭐ {rating}</p>
    </div>
  );
};
```

#### 3. Criar o componente MovieDetail.jsx

```jsx
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";

const MovieDetail = ({ movieId, onBack }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (err) {
        console.error("Erro ao carregar detalhes do filme:", err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if(!movie) {
    return <p>Carregando detalhes do filme...</p>;
  }

  return (
    <div className="movie-detail">
      <button onClick={onBack}>← Voltar para a lista</button>
      
      <div className="movie-content">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="movie-poster-large" 
        />
        
        <div className="movie-info">
          <h2>{movie.title} {movie.year && `(${movie.year})`}</h2>
          <p className="movie-rating">⭐ {movie.rating}/10</p>
          <h3>Sinopse</h3>
          <p className="movie-description">{movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
```

#### 4. Adicionar estilos CSS para o MovieDetail

Você pode adicionar estes estilos ao seu arquivo CSS para melhorar a aparência da página de detalhes:

```css
.movie-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.movie-detail button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 20px;
}

.movie-detail button:hover {
  background-color: #e0e0e0;
}

.movie-content {
  display: flex;
  gap: 30px;
}

.movie-poster-large {
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-info {
  flex: 1;
}

.movie-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.movie-rating {
  font-size: 18px;
  color: #f5c518;
  margin-bottom: 20px;
}

.movie-description {
  line-height: 1.6;
  font-size: 16px;
}

```

Esta abordagem permite que você alterne entre a lista de filmes e os detalhes de um filme específico apenas com o gerenciamento de estado, sem necessidade de implementar rotas.