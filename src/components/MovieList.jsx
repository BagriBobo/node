import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetch("/videos.json")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Erro ao carregar os filmes:", error));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
  });

  return (
    <>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar filme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="desc">Ordenar por nota (Maior primeiro)</option>
          <option value="asc">Ordenar por nota (Menor primeiro)</option>
        </select>
      </div>

      <div className="movie-list">
        {sortedMovies.length > 0 ? (
          sortedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              description={movie.description}
              poster={movie.poster}
              rating={movie.rating}
            />
          ))
        ) : (
          <p>Nenhum filme encontrado</p>
        )}
      </div>
    </>
  );
};

export default MovieList;
