import { useEffect, useState } from "react";
import { getAPOD } from "../../service/nasaApi";


export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAPOD().then(setData);
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

      {data.media_type === "image" ? (
        <img src={data.url} alt={data.title} className="rounded-xl" />
      ) : (
        <iframe src={data.url} title="video" />
      )}

      <p className="mt-4">{data.explanation}</p>
    </div>
  );
}