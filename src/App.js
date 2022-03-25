import "./App.css";

// import Sidebar from './components/Sidebar';

/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from "react";
import Dashboard from "./components/pages/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter as BRouter, Routes, Route } from "react-router-dom";
import Team from "./components/pages/Team";
import MainBody from "./components/MainBody";
function App() {
  return (
    <>
      <div className="min-h-full">
        <BRouter>
          <React.Fragment>
            <Navbar />
            <MainBody>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="team" element={<Team />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </MainBody>
          </React.Fragment>
        </BRouter>
      </div>
    </>
  );
}

export default App;
