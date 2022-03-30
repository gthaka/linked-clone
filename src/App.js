import "./App.css";

// import Sidebar from './components/Sidebar';

/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from "react";
import Dashboard from "./components/pages/Dashboard";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Team from "./components/pages/Movies";
import GithubUsers from "./components/pages/GithubUsers";
import DadJokes from "./components/pages/DadJokes";
import Movies from "./components/pages/Movies";
function App() {
  return (
    <>
      <div className="min-h-full">
        <React.Fragment>
          <Navbar />
          <main>
            <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto pb-7">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="team" element={<Team />} />
                    <Route path="/github-users" element={<GithubUsers />} />
                    <Route path="/dad-jokes" element={<DadJokes />} />
                    <Route path="/movies" element={<Movies />} />
                  </Routes>
                </div>
              </div>
            </div>
          </main>
        </React.Fragment>
      </div>
    </>
  );
}

export default App;
