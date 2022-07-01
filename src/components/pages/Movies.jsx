import React, { Fragment, useEffect, useState } from "react";
import {} from "react-router-dom";
// import Titlebar from "../Titlebar";
import {adMovies as MovieHead} from "../../config/rapidApi";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  EyeOffIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const anchor = (e) => {
  e.preventDefault();
};

export default function Movies() {
  const url = "https://advanced-movie-search.p.rapidapi.com/genre/movie/list";
  const movieURL =
    "https://advanced-movie-search.p.rapidapi.com/discover/movie";
  const options = {
    method: "GET",
    headers: MovieHead,
  };

  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [gId, setGId] = useState(0);
  const [movies, setMovies] = useState({});
  const [selected, setSelected] = useState({
    id: "-1",
    name: "-- Select Movie Genre --",
  });
  const [isLoading, setIsLoading] = useState(false);

  const getGenres = async () => {
    setIsLoading(true);
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("An Error Occured");
    }
    const data = await res.json();
    setIsLoading(false);
    setGenres(data.genres);
  };

  const getGId = async (id) => {
    console.log(id);
    setGId(id);
  };

  useEffect(() => {
    getGenres();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   getGId();
  // }, [genres]);

  useEffect(() => {
    console.log(`Page Now is ${page}`);
  }, [page]);

  // const getSelected = async () => {
  //   await getGenres();
  //   setSelected();
  // };

  const getMovies = async (id) => {
    setIsLoading(true);
    console.log(`Page No ${page}`);
    // console.log({ ...options, with_genres: id, page: 1 });
    const res = await fetch(
      `${movieURL}?with_genres=${id}&page=${page}`,
      options
    );
    if (!res.ok) {
      throw new Error("An Error Occured");
    }
    const data = await res.json();
    setIsLoading(false);
    setMovies(data);
  };

  const handleSelected = (data) => {
    setSelected(data);
    getGId(data.id);
    getMovies(gId);
  };

  // useEffect(() => {
  //   handleSelected();
  // }, [page]);

  return (
    <>
      <Listbox value={selected} onChange={handleSelected} disabled={isLoading}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              Movie Genre List
            </Listbox.Label>
            <div className="mt-1 relative w-60">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <VideoCameraIcon
                    as="img"
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                  <span className="ml-3 block truncate">
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-l-2 border-white-900 rounded-full animate-spin"></div>
                        &nbsp; Loading ...
                      </div>
                    ) : (
                      selected && selected.name
                    )}
                  </span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {genres.map((genre) => (
                    <Listbox.Option
                      key={genre.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={genre}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {selected ? (
                              <EyeOffIcon
                                as="img"
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                            ) : (
                              <EyeIcon
                                as="img"
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                            )}
                            <span
                              className={classNames(
                                selected ? "font-bold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {genre.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-900",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {movies.results && <MovieRoll movies={movies.results} />}
      {/* {movies.results && <Pagination moviesInfo={movies} setPage={setPage} page={page}/>} */}

      {movies.results && (
        <>
          {/* Pagination Function imekataa. Moved Code Up */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPage(-1)}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <a
                href={anchor}
                onClick={() => setPage(+1)}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{movies.page * 10 - 9}</span> to{" "}
                  <span className="font-medium">{movies.page * 10}</span> of{" "}
                  <span className="font-medium">{movies.total_results}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setPage(-1)}
                    disabled={page <= 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                  <button disabled={page===movies.page}
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {movies.page}
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    {movies.page + 1}
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                    {movies.page + 2}
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                    {movies.page + 7}
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    {movies.page + 8}
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    {movies.page + 9}
                  </button>
                  <button
                    onClick={() => currPage => page+1}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function MovieRoll({ movies }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {movies &&
        movies.map((movie) => (
          <div key={movie.id} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-auto lg:aspect-none">
              <img
                src={movie.poster_path}
                alt={movie.original_title}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={anchor}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {movie.title}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {movie.vote_average}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {movie.vote_count}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
/*
function Pagination({ moviesInfo, setPage, page }) {
  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(()=>{
  //   setPage(currentPage)
  // },[currentPage])

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href={anchor}
          onClick={() => setPage(-1)}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href={anchor}
          onClick={() => setPage(+1)}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{moviesInfo.page * 10 - 9}</span> to{" "}
            <span className="font-medium">{moviesInfo.page * 10}</span> of{" "}
            <span className="font-medium">{moviesInfo.total_results}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href={anchor}
              onClick={() => setPage(-1)}
              disabled={page === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" * /}
            <a
              href="!#"
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {moviesInfo.page}
            </a>
            <a
              href="!#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {moviesInfo.page + 1}
            </a>
            <a
              href="!#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              {moviesInfo.page + 2}
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="!#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              {moviesInfo.page + 7}
            </a>
            <a
              href="!#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {moviesInfo.page + 8}
            </a>
            <a
              href="!#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {moviesInfo.page + 9}
            </a>
            <a
              href="#!"
              onClick={() => setPage(+1)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
*/