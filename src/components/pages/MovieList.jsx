import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React from "react";
import MovieHead from "../../config/adv-movies-search.json";

export default function MovieList() {
  const url = "https://advanced-movie-search.p.rapidapi.com/genre/movie/list";
  const movieURL =
    "https://advanced-movie-search.p.rapidapi.com/discover/movie";
  const options = {
    method: "GET",
    headers: MovieHead,
  };

  const getGenres = async () => {
    setIsLoading(true);
    const gen = await fetch(url, options);
    if (!gen.ok) {
      throw Error("Failed");
    }
    const res = await gen.json();
    setGenres(res.genres);
    setIsLoading(false);
  };

  const [genres, setGenres] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
//   React.useMemo(() => {
//     getGenres();
//   },[]);

  const handleSelectedGenre = (e) => {
      console.log( e.target.value);
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
      <option disabled={true} selected>
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
            {movies.length && movies.map((movie)=>(
                `${movie.name} <br/>`
            ))}
          </div>
      </section>
      </div>
    </>
  );
}
