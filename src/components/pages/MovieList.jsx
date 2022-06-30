// import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React from "react";
import MovieHead from "../../config/adv-movies-search.json";

export default function MovieList() {
  const url = "https://advanced-movie-search.p.rapidapi.com/genre/movie/list";
  const movieURL =
    "https://advanced-movie-search.p.rapidapi.com/discover/movie";
  

  const getGenres = async () => {
    setIsLoading(true);
    const options = {
      method: "GET",
      headers: MovieHead,
    };
    const gen = await fetch(url, options);
    if (!gen.ok) {
      throw Error("Failed");
    }
    const res = await gen.json();
    setGenres(res.genres);
    setIsLoading(false);
  };

  const getMovies = async () => {
    setIsLoading(true);
    const options = {
      method: "GET",
      headers: MovieHead,
      // params: {with_genres: genre, page: '1'},
    };
    const gen = await fetch(`${movieURL}?with_genres=${genre}&page=${page}`, options);
    if (!gen.ok) {
      throw Error("Failed");
    }
    const res = await gen.json();
    setMovies(res.results);
    setIsLoading(false);
  };

  const [genres, setGenres] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [genre, setGenre] = React.useState(0);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    getGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Movies Based on Selected Genre
  React.useEffect(() => {
    genre!== 0 && getMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);
  
  const handleSelectedGenre = (e) => {
    console.log(e.target.value);
    setGenre(e.target.value);
  };

  return (
    <>
      <div className="mx-6">
        <section>
          <select
            name="movieGenres"
            id="movGem"
            className="w-auto h-auto mx-20"
            disabled={isLoading}
            onChange={handleSelectedGenre}
          >
            <option disabled={true} defaultValue>
              ---Select a Genre ---
            </option>
            {genres.length &&
              genres.map((gen) => (
                <option key={gen.id} value={gen.id}>
                  {gen.name}
                </option>
              ))}
          </select>
        </section>
        <section>
          <div className="bg-indigo-300">
            <ul>
            {movies.length && movies.map((movie) => (
              // `${JSON.stringify(movie)} <br/>`
              <li key={movie.id}>{movie.title}</li>
            ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
