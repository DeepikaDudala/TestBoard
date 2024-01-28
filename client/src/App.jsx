// import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Tests from "./pages/Tests";
import Results from "./pages/Results";
import ResultCard from "./components/ResultCard";
import Test from "./pages/Test";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results/:id" element={<ResultCard />} />
          <Route path="/tests/:id" element={<Test />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
