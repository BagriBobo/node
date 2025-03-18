import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

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

  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const selectedMovies = sortedMovies.slice(startIndex, startIndex + moviesPerPage);

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
        {selectedMovies.length > 0 ? (
          selectedMovies.map((movie) => (
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

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Próximo
        </button>
      </div>
    </>
  );
};

export default MovieList;
