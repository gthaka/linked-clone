import "./App.css";
/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import GithubUsers from "./components/pages/GithubUsers";
import DadJokes from "./components/pages/DadJokes";
import Movies from "./components/pages/Movies";
function App() {
  const location = useLocation();
  return (
    <div className="min-h-full">
      <Content path={location.pathname} />
    </div>
  );
}

function Content({ path }) {
  let base = (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
  if (path !== "/") {
    base = (
      <>
        <Navbar />
        <main>
          <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto pb-7">
                <Routes>
                  <Route path="/github-users" element={<GithubUsers />} />
                  <Route path="/dad-jokes" element={<DadJokes />} />
                  <Route path="/movies" element={<Movies />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
  return base;
}

export default App;
