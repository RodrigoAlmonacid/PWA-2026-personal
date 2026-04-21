import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mars from "./Pages/Mars/Mars";
import Home from "./Pages/Home/Home";
import Asteroids from "./Pages/Asteroids/Asteroids";
import Favorites from "./Pages/Favorites/Favorites";
import Navbar from "./components/Navbar/Navbar";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white bg-fixed bg-cover bg-center">
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mars" element={<Mars />} />
            <Route path="/asteroids" element={<Asteroids />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

/* recetasApi2026 -> https://spoonacular.com/food-api/console#Profile */
