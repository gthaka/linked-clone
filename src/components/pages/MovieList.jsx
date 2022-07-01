// import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React from "react";
import {adMovies as MovieHead} from "../../config/rapidApi";

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
    const gen = await fetch(`${movieURL}?with_genres=${genre}&page=${page===0?1:page}`, options);
    if (!gen.ok) {
      throw Error("Failed");
    }
    const res = await gen.json();
    setMovies(res.results);
    setTotalPages(res.total_pages)
    setTotalResults(res.total_results);
    console.log(res.total_results)
    setIsLoading(false);
  };

  const [genres, setGenres] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [genre, setGenre] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [pages, setPages] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(0);
  const [totalResults, setTotalResults] = React.useState(0);

  React.useEffect(() => {
    getGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Movies Based on Selected Genre
  React.useEffect(() => {
    console.log(page+'<<<<')
    genre!== 0 && getMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre,page]);

  // Fetch Movies Based on Selected Genre
  // React.useEffect(() => {
  //   movies.length && setTotalPages(movies.total_pages);
  //   movies.length && setTotalResults(movies.total_results);
  //   // return [];
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [movies]);

  React.useMemo(()=>{
    const range = [...Array(totalPages - 0 + 1).keys()].map(x => x + 0);
    // console.log(range);
    setPages(range);
  },[totalPages])
  // React.useEffect(() => {
  //   // console.log(totalPages)
    
  //   // setPages(range);
  //   // return [];
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [genre]);
  
  const handleSelectedGenre = (e) => {
    // console.log(e.target.value);
    setGenre(e.target.value);
    return [];
  };
  
  const handleSelectedPage = (e) => {
    // console.log(e.target.value);
    setPage(e.target.value);
    console.log(page)
  };

  return (
    <>
      <div>
        <p>Page #{page} ------- Genre {genre} ------- Total Results {totalResults}</p>
      </div>
      <div className="mx-6">
        <section>
          <select
            name="movieGenres"
            id="movGem"
            className="w-auto h-auto mx-20"
            disabled={isLoading} defaultValue={0}
            onChange={handleSelectedGenre}
          >
            <option disabled={true} value={0}>
              ---Select a Genre ---
            </option>
            {genres.length &&
              genres.map((gen) => (
                <option key={gen.id} value={gen.id}>
                  {gen.name}
                </option>
              ))}
          </select>
          -----
          <select
            name="moviePages"
            id="movPg"
            className="w-auto h-auto mx-20"
            disabled={isLoading} defaultValue={1}
            onChange={handleSelectedPage}
          >
            {pages.length &&
              pages.map((pg) => (
                <option key={pg} value={pg}>
                  {pg}
                </option>
              ))}
          </select>
        </section>
        <section>
          <div className="text-3xl">
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
