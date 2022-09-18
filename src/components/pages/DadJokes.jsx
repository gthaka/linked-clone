import React from "react";
import Titlebar from "../Titlebar";
import { dadJokes as DadConfig } from "../../config/rapidApi";
import { UserIcon } from "@heroicons/react/24/outline";

export default function DadJokes() {
  const jokesURL = "https://dad-jokes.p.rapidapi.com/random/joke";

  const options = {
    method: "GET",
    headers: DadConfig,
  };

  const [joke, setJoke] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getJoke = async () => {
    setIsLoading(true);
    const res = await fetch(jokesURL, options);
    if (!res.ok) {
      throw new Error(`Could contact server! -> ${res.statusText}`);
    }
    setJoke(await res.json());
    setIsLoading(false);
  };

  React.useEffect(() => {
    setJoke();
  }, []);

  const jokeButton = (
    <button
      onClick={getJoke}
      disabled={isLoading}
      className="inline-flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 float-right"
    >
      Get Random Joke
    </button>
  );

  return (
    <>
      <Titlebar title={"Dad Jokes"} others={{ button: jokeButton }} />
      {isLoading ? <LoadingAnimation /> : <JokePlate joke={joke} />}
    </>
  );
}

function JokePlate({ joke }) {
  let result = (
    <>
      <div className="text-2xl font-bold text-gray-900 text-center p-20">
        Click the button above to fetch a Random Joke
      </div>
    </>
  );

  if (joke && joke.success) {
    const { _id, setup, punchline, author, type } = joke.body[0];
    // console.log(joke.body[0]);
    result = (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shadow rounded-md p-5 w-full mx-auto">
            <div className="place-content-center">
              <div className="w-[30%] my-0 mx-auto text-basetext-indigo-600 font-semibold tracking-wide uppercase">
                {type}
              </div>
            </div>
            <dl className="space-y-12 md:space-y-0 md:grid md:grid-cols-1">
              <div key={_id} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-24 w-24 rounded-md bg-indigo-500 text-white">
                    <UserIcon className="h-24 w-24" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="mt-2 ml-28 w-3/4 font-semibold tracking-wide">
                  {setup}
                </dd>
                <dd className="mt-2 ml-28 w-4/5 text-indigo-600 font-semibold tracking-wide animate-[bounce_5s_ease-in-out_2] pr-32">
                  {punchline}
                </dd>
                <dd className="mt-2 ml-28 tracking-wide w-4/5">
                  &nbsp;
                </dd>
                <dd className="mt-4 w-[100px] uppercase font-semibold tracking-wide ">
                  {author.name}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  }
  return result;
}

function LoadingAnimation() {
  return (
    <>
      <div className="animate-pulse py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shadow rounded-md p-5 w-full mx-auto">
            <div className="place-content-center">
              <div className="w-[30%] my-0 mx-auto bg-indigo-400">
                &nbsp;
              </div>
            </div>
            <dl className="space-y-12 md:space-y-0 md:grid md:grid-cols-1">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-24 w-24 rounded-md bg-indigo-400">
                    &nbsp;
                  </div>
                </dt>
                <dd className="mt-2 ml-28 bg-indigo-400 w-3/4 rounded">
                  &nbsp;
                </dd>
                <dd className="mt-2 ml-28 bg-indigo-400 w-4/5 rounded">
                  &nbsp;
                </dd>
                <dd className="mt-2 ml-28 tracking-wide bg-indigo-400 w-4/5 rounded">
                  &nbsp;
                </dd>
                <dd className="mt-4 bg-indigo-400 w-[100px] rounded">
                  &nbsp;
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
