import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/videos.json")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Erro ao carregar os filmes:", error));
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          description={movie.description}
          poster={movie.poster}
          rating={movie.rating}
        />
      ))}
    </div>
  );
};

export default MovieList;
