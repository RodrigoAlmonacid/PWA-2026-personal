import { useState, useEffect } from "react";

function Home() {
  // 1. Creamos un estado para guardar las recetas. Arranca como un array vacío.
  const [recipes, setRecipes] = useState([]);

  // 2. Usamos useEffect para que esto se ejecute solo una vez al abrir la página.
  useEffect(() => {
    // 3. Hacemos el "fetch" (la llamada) a nuestro archivo simulado
    fetch("/mock-recipes.json")
      .then((respuesta) => respuesta.json()) // Lo convertimos a formato JSON
      .then((data) => {
        // Spoonacular devuelve los resultados dentro de un array llamado "results"
        setRecipes(data.results);
      })
      .catch((error) => console.error("Uy, algo falló:", error));
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Recetas de Pasta</h1>

      {/* 4. Renderizamos las Cards iterando sobre el array con .map() */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {recipe.title}
              </h2>
              {/* Acá después le vas a meter el botón de Favoritos y Tailwind a lo loco */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
