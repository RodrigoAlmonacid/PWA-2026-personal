import { useEffect, useState } from "react";
import { getAPOD } from "../../service/nasaApi";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAPOD().then(setData);
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

      {data.media_type === "image" ? (
        <div
          className="bg-fixed bg-cover bg-center h-screen w-full"
          style={{ backgroundImage: `url(${data.url})` }}
        >
          <p className="inline-block align-baseline">{data.explanation}</p>
        </div>
      ) : (
        //<img src={data.url} alt={data.title} className="aspect-auto object-cover" />
        <iframe src={data.url} title="video" />
      )}

      
    </div>
  );
}
export default Home;
