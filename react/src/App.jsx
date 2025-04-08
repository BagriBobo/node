import MovieList from "./components/MovieList";
import MovieCard from "./components/MovieCard";
import { useState } from "react";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movieId) => {
    setSelectedMovie(movieId);
  }

  const handleBacktoList = () => {
    setSelectedMovie(null);
  }

  if (selectedMovie) {
    return (
      <div>
        <h1>Catálogo de Filmes</h1>
        <MovieCard movieId={selectedMovie} onBack={handleBacktoList} />
      </div>
    );
  }
  return (
    <div>
      <h1>Catálogo de Filmes</h1>
      <MovieList />
    </div>
  );
};

export default App;