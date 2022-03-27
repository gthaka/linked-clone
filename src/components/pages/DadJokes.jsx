import React from "react";
import Titlebar from "../Titlebar";
import DadConfig from "../../config/dadjokes.json";

export default function DadJokes() {
  const jokesURL = "https://dad-jokes.p.rapidapi.com/random/joke";

  const options = {
    method: "GET",
    headers: DadConfig,
  };

  const [joke, setJoke] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // const jokedata = {
  //   success: true,
  //   body: [
  //     {
  //       _id: "60dd360c2e6a3cb9974f30b4",
  //       setup: "A Greek goes to his tailor with ripped pants",
  //       punchline: "The tailor: Euripides?The customer: Eumenides?",
  //       type: "customer",
  //       likes: [],
  //       author: { name: "unknown", id: null },
  //       approved: true,
  //       date: 1618108661,
  //       NSFW: false,
  //     },
  //   ],
  // };

  const getJoke = async () => {
    setIsLoading(true);
    const res = await fetch(jokesURL, options);
    if (!res.ok) {
      throw new Error(`Could contact server! -> ${res.statusText}`);
    }
    setJoke(await res.json());
    setIsLoading(false);
  };
  // const getJoke = async () => {
  //   setIsLoading(true);
  //   const res = await jokedata;
  //   // if (!res.ok) {
  //   //   throw new Error(`Could contact server! -> ${res.statusText}`);
  //   // }
  //   // console.log(jokedata)
  //   setInterval(() => {
  //     setIsLoading(false);
  //     return setJoke(res);
  //   }, 2000);
  // };

  React.useEffect(() => {
    setJoke();
  }, []);

  // const fetchJoke = getJoke();

  const jokeButton = (
    <button
      onClick={getJoke} disabled={isLoading}
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
    const { _id, setup, punchline,author,type } = joke.body[0];
    // console.log(joke.body[0]);
    result = (
      <div
        key={_id}
        className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto"
      >
        <div className="flex space-x-5">
          <div className="rounded-full bg-indigo-400 h-20 w-20"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 text-blue-400 text-bold rounded w-40">Joke Type: <span className="capitalize">{type}</span></div>
            <div className="space-y-2">
              <div className="text-2xl h-6 w-3/4 text-blue-900">{setup}</div>
              <div className="animate-tadaa text-2xl h-[32px] text-indigo-600 overflow-hidden whitespace-nowrap	m-0">{punchline}</div>
            </div>
          </div>
        </div>
        <div className="italic text-center space-x-4 w-20">{author.name}</div>
      </div>
    );
  }
  return result;
}

function LoadingAnimation() {
  return (
    <>
      <div className="border border-blue-300 shadow rounded-md p-5 w-full mx-auto">
        <div className="flex space-x-5">
          <div className="rounded-full bg-indigo-400 h-20 w-20"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-6 text-blue-400 rounded w-40 bg-indigo-400"></div>
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-indigo-400"></div>
              <div className="h-6 bg-indigo-400"></div>
            </div>
          </div>
        </div>
        <div className="space-x-4 w-20 h-6 bg-indigo-400 rounded-md"></div>
      </div>
    </>
  );
}
