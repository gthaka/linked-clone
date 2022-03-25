import { useEffect, useState } from "react";
import Titlebar from "../Titlebar";

const usersUrl = "https://api.github.com/users";

export default function GithubUsers() {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState({});
  // const [count, setCount] = useState(0);

  const getUsers = async () => {
    const response = await fetch(usersUrl);
    if (!response.ok) {
      throw new Error("Failed");
    }
    setUsers(await response.json());
  };

  const getMe = async () => {
    const response = await fetch(`${usersUrl}/gthaka`);
    if (!response.ok) {
      throw new Error("Failed");
    }
    setMe(await response.json());
  };


  // const getCount = async (link) => {
  //   const response = await fetch(link);
  //   if (!response.ok) {
  //     throw new Error("Failed");
  //   }
  //   const cnt = await response.json().length;
  //   // setCount (link);
  //   setCount(cnt);
  //   // return cnt;
  // };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getMe();
  }, []);

  // const mimi = () => {
    // getMe();
  // }
  let all = [me,...users];
  const list = all/*.slice(0, 1)*/.map((user) => {
    const { id, login, avatar_url, html_url } = user;
    
    return (
      <div key={id} className="group relative">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={avatar_url}
            alt={login}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 flex justify-between pb-[20px] mb-[5px] border-b-2 border-dashed border-black-200">
          <div>
            <h3 className="text-sm font-large text-red-500 text-gray-700 pb-0">
              <a href={html_url} target="_blank" rel="noreferrer">
                <span aria-hidden="true" className="absolute inset-0" />
                {login}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500"></p>
          </div>
          {/* <p className="text-sm font-small text-gray-900">Followers(0)</p> */}
          {/* <p className="text-sm font-small text-gray-900">Stars(0)</p> */}
        </div>
      </div>
    );
  });

  return (
    <div>
      <Titlebar title={"GitHub Users"} />
      <div className="bg-gray pt-5">
        <div className="max-w-2xl mx-auto py-0 px-4 sm:py-0 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-0 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {list}
          </div>
        </div>
      </div>
    </div>
  );
}
